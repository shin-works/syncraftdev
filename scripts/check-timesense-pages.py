"""Check preserved SEO/copy and local media for all TimeSense landing pages.
Run from any directory: python3 scripts/check-timesense-pages.py
The fixture preserves the original SEO copy, with only the explicitly approved
theme heading and free/premium voice descriptions updated on 2026-09-23.
"""
from html.parser import HTMLParser
from pathlib import Path
import json
import re
from urllib.parse import urlparse, unquote

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

class Node:
    def __init__(self, tag='', attrs=(), parent=None):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs), parent, []
    def text(self):
        return ''.join(c if isinstance(c, str) else c.text() for c in self.children)
    def all(self, pred):
        return ([self] if pred(self) else []) + [n for c in self.children if isinstance(c, Node) for n in c.all(pred)]
    def has(self, cls):
        return cls in self.attrs.get('class', '').split()

class Parser(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.root = Node()
        self.current = self.root
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.current)
        self.current.children.append(n)
        if tag not in VOID:
            self.current = n
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)
    def handle_endtag(self, tag):
        cursor = self.current
        while cursor.parent:
            if cursor.tag == tag:
                self.current = cursor.parent
                break
            cursor = cursor.parent
    def handle_data(self, data):
        self.current.children.append(data)

def norm(s):
    return re.sub(r'\s+', ' ', s).strip()
def compact(s):
    return re.sub(r'\s+', '', s)

def main():
    fixture = json.loads((ROOT / 'scripts/fixtures/timesense-preserved-copy.json').read_text())
    failures = []
    for locale, expected in fixture.items():
        page = PUBLIC / 'timesense' / ('' if locale == 'ja' else locale) / 'index.html'
        root = Parser(page.read_text()).root
        nodes = root.all(lambda n: bool(n.tag))
        def require(condition, label):
            if not condition:
                failures.append(f'{locale}: {label}')
        first = lambda pred: next(n for n in nodes if pred(n))
        h1 = [n for n in nodes if n.tag == 'h1']
        require(len(h1) == 1, 'exactly one H1')
        require(compact(h1[0].text()) == compact(expected['h1']), 'H1 copy unchanged')
        require(compact(first(lambda n:n.has('hero-subtitle')).text()) == compact(expected['subtitle']), 'subtitle unchanged')
        require(norm(first(lambda n:n.tag == 'title').text()) == expected['title'], 'title unchanged')
        require([n.attrs for n in nodes if n.tag == 'meta'] == expected['metadata'], 'metadata unchanged')
        require([n.attrs for n in nodes if n.tag == 'link' and n.attrs.get('rel') in ('alternate','canonical')] == expected['alternates'], 'canonical and hreflang unchanged')
        headings = [compact(n.text()) for n in nodes if re.fullmatch('h[1-4]',n.tag)]
        require(sorted(headings) == sorted(map(compact,expected['headings'])), 'approved headings preserved')
        paragraphs = [compact(n.text()) for n in nodes if n.tag == 'p']
        require(sorted(filter(None,paragraphs)) == sorted(map(compact,expected['paragraphs'])), 'approved paragraphs preserved')
        require([norm(n.text()) for n in nodes if n.has('faq-answer')] == expected['faq'], 'all FAQ answers preserved')
        require([n.attrs.get('src') for n in nodes if n.tag == 'source'] == expected['audio'], 'audio sources unchanged')
        roster = first(lambda n:n.has('character-roster'))
        require([n.attrs.get('data-character') for n in roster.all(lambda n:n.tag == 'li')] == ['luma','pico','milo','toto'], 'all four free characters shown')
        premium = first(lambda n:n.has('voice-group-premium'))
        require([n.attrs.get('src') for n in premium.all(lambda n:n.tag == 'img')] == ['/timesense/icon_2_Milo.png','/timesense/icon_3_Toto.png'], 'premium samples use scene-specific icons')
        require(len([n for n in nodes if n.has('theme-item')]) == 6, 'all six color themes shown')
        links = {n.attrs.get('href') for n in nodes if n.tag == 'a'}
        require(set(expected['stores']) <= links, 'store destinations preserved')
        ids = [n.attrs['id'] for n in nodes if 'id' in n.attrs]
        require(len(ids) == len(set(ids)), 'unique IDs')
        for ident in ['hero','about','problem','features','use-cases','voice-samples','get-started','developer','faq']:
            require(ident in ids, f'anchor {ident} preserved')
        require(len([n for n in nodes if n.tag == 'details' and n.has('faq-item')]) == len(expected['faq']), 'FAQ available without JS')
        for n in nodes:
            ref = n.attrs.get('src') if n.tag in ('img','script','source') else n.attrs.get('href') if n.tag == 'link' and n.attrs.get('rel') == 'stylesheet' else None
            if ref and not urlparse(ref).scheme and not ref.startswith('//'):
                path = unquote(urlparse(ref).path)
                target = PUBLIC / path.lstrip('/') if path.startswith('/') else page.parent / path
                require(target.is_file(), f'missing asset: {ref}')
            if n.tag == 'a' and n.attrs.get('href','').startswith('#'):
                require(n.attrs['href'][1:] in ids, f'broken anchor {n.attrs["href"]}')
        print(f'{locale}: copy, SEO, FAQ, links and assets checked')
    if failures:
        raise SystemExit('\n'.join(failures))
    print(f'PASS: {len(fixture)} locales; all protected copy, metadata, FAQ and local media preserved.')

if __name__ == '__main__':
    main()
