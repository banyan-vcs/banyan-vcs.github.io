# banyan-vcs.github.io

The project website for [banyan](https://github.com/banyan-vcs/banyan) —
a git-compatible version control server. English at the root, Chinese under
`zh-cn/`.

**There is no build step, no generator, and no dependency.** Pages are plain
HTML sharing one stylesheet (`assets/style.css`). What you edit is what is
served. This matches the project's taste: the web console in the main
repository is likewise hand-rolled with zero runtime dependencies.

## Publish

1. Create a repository named `banyan-vcs.github.io` under the
   `banyan-vcs` organization.
2. Push this repo's `main` to it. GitHub Pages serves it automatically
   (Organization pages publish from `main` by default) — no settings to
   change, no Actions workflow.

A differently-named repository works too: Settings → Pages → Deploy from
branch → `main` / root. If a custom domain is added later, put it in a
`CNAME` file and update the canonical URLs in `sitemap.xml` and the
`og:url` meta tag.

## Layout

```
index.html            EN home (why / features / numbers / quick start / architecture)
docs.html             EN documentation index — deep links into the main repo's docs/
404.html              bilingual not-found page
zh-cn/                Chinese mirror of the pages above
assets/style.css      the whole design system (~300 lines, auto dark mode)
assets/avatar.png       the project avatar — favicon and brand mark
assets/lang.js          language negotiation (the zh-cn link is advisory)
assets/architecture-simple.svg      EN simplified architecture diagram
assets/architecture-simple.zh.svg   ZH copy — both vendored from docs/assets/ in the main repo
robots.txt, sitemap.xml
```

The site deliberately carries no enterprise-edition content: the license
split is documented in the repository (`LICENSE`, `enterprise/LICENSE.enterprise`),
not marketed here.

## Maintenance rules

- **Editing a page**: open the HTML, edit, push. Both languages must be
  updated together (root ↔ `zh-cn/`) — the language switcher links them
  one-to-one.
- **Numbers** (stats band, feature cards) must come from the benchmark
  harness (`docs/operations/performance.md`) or memory-constrained integration
  tests (`docs/operations/testing.md`) in the main repo — never invent one. When a
  number changes there, change it here in both languages.
- **Docs index** links to `blob/main/docs/…`. Only list documents that exist
  on the `main` branch (sub-module directories, de-numbered names — the repo's
  `docs/README.md` is the index). Add a row in both `docs.html` and `zh-cn/docs.html` when a
  document lands on `main`.
- **Architecture diagrams**: copy fresh from the main repo
  (`docs/assets/architecture-simple.svg` and its `.zh.svg` sibling)
  whenever the topology changes — both languages together, and the README
  `alt` texts in the main repo move with them.
- **Voice**: first-party design judgments only. No third-party inspiration
  attributions anywhere on the site — same rule as the repository docs.
- **No external assets**: no web fonts, no CDN scripts, no analytics. Keep
  it that way; the site should render identically offline.
