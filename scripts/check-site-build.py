"""Audit the corporate site's generated routes, metadata, and local links.

Run after Astro build: python3 scripts/check-site-build.py [output directory]
Product-specific static sites are only checked as link destinations.
"""
from functools import lru_cache
from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.parse import unquote, urlsplit


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links, self.ids = [], []
        self.canonical, self.lang, self.robots = None, None, None
        self.h1 = 0
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "html":
            self.lang = attrs.get("lang")
        if tag == "h1":
            self.h1 += 1
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href")
        if tag == "meta" and attrs.get("name") == "robots":
            self.robots = attrs.get("content", "")
        for key in ("href", "src"):
            if attrs.get(key):
                self.links.append(attrs[key])


root = Path(sys.argv[1] if len(sys.argv) > 1 else "dist").resolve()
pages = [root / "legal/index.html", root / "preview/index.html"]
languages = ["ja", "en", "es", "de", "fr", "pt", "ko", "zh-hans", "zh-hant"]
errors, checked = [], 0
for lang in languages:
    base = root if lang == "ja" else root / lang
    pages += [base / "index.html", base / "blog/index.html"]
    pages += sorted((base / "blog").glob("*/index.html"))


@lru_cache(maxsize=None)
def read_page(path):
    return Page(path.read_text())


for path in pages:
    relative = path.relative_to(root)
    if not path.exists():
        errors.append(f"Missing page: {relative}")
        continue
    page = read_page(path)
    expected_lang = relative.parts[0] if relative.parts[0] in languages else "ja"
    expected_canonical = "/" + str(relative).removesuffix("index.html")
    if relative == Path("preview/index.html"):
        expected_canonical = "/"
    if page.lang != expected_lang:
        errors.append(f"Wrong language: {relative}: {page.lang}")
    if page.h1 != 1 or len(set(page.ids)) != len(page.ids):
        errors.append(f"Invalid heading count or duplicate IDs: {relative}")
    if page.canonical != "https://syncraft.dev" + expected_canonical:
        errors.append(f"Wrong canonical: {relative}: {page.canonical}")
    if ("noindex" in (page.robots or "")) != (relative == Path("preview/index.html")):
        errors.append(f"Unexpected indexing policy: {relative}")
    for link in page.links:
        parsed = urlsplit(link)
        if parsed.scheme or parsed.netloc:
            continue
        destination = (root / unquote(parsed.path.lstrip("/")) if parsed.path.startswith("/")
                       else path.parent / unquote(parsed.path))
        if not parsed.path:
            destination = path
        if destination.is_dir():
            destination /= "index.html"
        if not destination.exists():
            errors.append(f"Missing link/asset: {relative}: {link}")
        elif parsed.fragment and destination.suffix == ".html":
            if unquote(parsed.fragment) not in read_page(destination).ids:
                errors.append(f"Missing anchor: {relative}: {link}")
        checked += 1

if "https://syncraft.dev/preview/" in (root / "sitemap-0.xml").read_text():
    errors.append("Preview leaked into the sitemap")
for error in errors:
    print(error)
print(f"Checked {len(pages)} pages and {checked} local links/assets; {len(errors)} errors.")
sys.exit(bool(errors))
