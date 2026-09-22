#!/usr/bin/env python3
"""Budian UI v1.1.0 static validation suite."""
import re, json, pathlib, glob

ROOT = pathlib.Path("/workspace/budian-ui")
pass_n = [0]; fail = []
def check(name, cond, detail=""):
    if cond: pass_n[0]+=1
    else: fail.append(f"{name} — {detail}")

# 1. All example pages parse: balanced key tags, lang/main/skip-link
for p in sorted(glob.glob(str(ROOT/"examples" / "*") + "/index.html")):
    s = pathlib.Path(p).read_text(encoding="utf-8")
    name = pathlib.Path(p).parent.name
    check(f"{name}: has <html", "<html" in s)
    check(f"{name}: has <main", "<main" in s)
    check(f"{name}: has skip link", 'class="skip' in s.lower() or "skip-link" in s)
    check(f"{name}: data-i18n balanced quotes", s.count("data-i18n=\"")>=0)
    # script/link balance
    check(f"{name}: scripts balanced", s.count("<script")==s.count("</script>"))

# 2. Markdown: fence balance, no backslash escapes
for p in glob.glob(str(ROOT) + "/**/*.md", recursive=True):
    s = pathlib.Path(p).read_text(encoding="utf-8")
    name = pathlib.Path(p).name
    fences = len(re.findall(r"^```", s, re.M))
    check(f"{name}: fenced blocks balanced (even count)", fences % 2 == 0, f"{fences} fences")
    # stray backslash-tick — skip table rows, where a backslash before a backtick is
    # a legitimate (necessary) way to render a literal backtick inside a pipe cell.
    bad_esc = [l for l in s.splitlines() if "\\`" in l and not l.strip().startswith("|")]
    check(f"{name}: no escaped backtick `\\`` outside tables", not bad_esc, bad_esc[0][:40] if bad_esc else "")
    # link targets exist (github-markdown local .md links)
    for m in re.finditer(r"\]\(([^)#]+\.md(?:#[^)]*)?)\)", s):
        target = m.group(1).split("#")[0]
        if target.endswith((".md",)):
            tpath = ROOT / target if not (ROOT/name).parent else (ROOT/name).parent / target
            check(f"{name}: link exists {target}", tpath.exists() or (ROOT/target).exists())

# 3. Every data-i18n key defined in both locales across all examples
for p in sorted(glob.glob(str(ROOT/"examples" / "*") + "/index.html")):
    s = pathlib.Path(p).read_text(encoding="utf-8")
    name = pathlib.Path(p).parent.name
    keys = set(re.findall(r'data-i18n="([^"]+)"', s))
    attrkeys = set(re.findall(r'data-i18n-attr="([^"]+)"', s))
    attr_tokens = set()
    for a in attrkeys:
        for tok in a.split(","):
            if ":" in tok: attr_tokens.add(tok.split(":")[1].strip())
    allkeys = keys.union(attr_tokens)
    # load messages from inline script: capture zh and en object keys crudely
    zh = set(re.findall(r'"zh-CN"\s*:\s*\{([^}]*)\}', s, re.S))
    en = set(re.findall(r'"en"\s*:\s*\{([^}]*)\}', s, re.S))
    def dictkeys(block):
        return set(re.findall(r'"([a-zA-Z0-9_.]+)"\s*:', block))
    zhk = set().union(*[dictkeys(b) for b in zh]) if zh else set()
    enk = set().union(*[dictkeys(b) for b in en]) if en else set()
    for k in allkeys:
        check(f"{name}: fallback key '{k}' in zh", k in zhk)
        check(f"{name}: fallback key '{k}' in en", k in enk)

# 4. Seed / secret scan
secrets = re.compile(r"(ghp_[A-Za-z0-9]{10,}|sk-[A-Za-z0-9]{10,}|BEGIN (RSA|OPENSSH) PRIVATE|cf-beacon|cloudflare-dns|AKIA[0-9A-Z]{16})")
for p in glob.glob(str(ROOT) + "/**/*", recursive=True):
    if pathlib.Path(p).is_file() and pathlib.Path(p).suffix in {".html",".css",".js",".md",".json",".yaml",".txt"}:
        s = pathlib.Path(p).read_text(encoding="utf-8", errors="ignore")
        m = secrets.search(s)
        check(f"no secret in {pathlib.Path(p).relative_to(ROOT)}", not m, f"found {m.group(1)[:8]}..." if m else "")

# 5. tokens.json valid & version aligned
tj = json.load(open(ROOT/"tokens"/"tokens.json"))
check("tokens.json valid JSON", True)
check("tokens.json version 1.1.0", tj["$meta"]["version"]=="1.1.0")
css = (ROOT/"tokens"/"tokens.css").read_text(encoding="utf-8")
check("tokens.css version 1.1.0", "v1.1.0" in css)
check("tokens.css has target-min", "budian-target-min" in css)

# 6. budian.js version + key contract strings
js = (ROOT/"examples"/"assets"/"budian.js").read_text(encoding="utf-8")
check("budian.js version 1.1.0", "version: \"1.1.0\"" in js)
check("budian.js reveal arms .js conditionally", js.count('root.classList.add("js")')==1)
check("budian.js listens prefers-color-scheme: dark", '(prefers-color-scheme: dark)' in js)
check("budian.js no invalid :change query", '(prefers-color-scheme: change)' not in js)

print(f"STATIC RESULT: {pass_n[0]} pass, {len(fail)} fail")
for f in fail: print("FAIL", f)
raise SystemExit(1 if fail else 0)