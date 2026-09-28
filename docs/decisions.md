# Decisions

Decision records for the site, one per file, numbered in the order they were opened. An open record is where its
question is discussed; once accepted it is never edited, and a changed decision supersedes it with a new record.
Questions not yet worth a record are in [open-questions.md](open-questions.md).

| Decision | Summary | Status |
|----------|---------|--------|
| [0001 Hand-written static HTML](decisions/0001-hand-written-static-html.md) | Plain pages and one stylesheet, shared markup duplicated per page. | accepted |
| [0002 Take all styling from ui-std-lib](decisions/0002-style-from-ui-std-lib.md) | The luminous-precision theme from a pinned CDN version; local CSS is layout only. | accepted |
| [0003 Vendor Weft at build time](decisions/0003-vendor-weft-at-build-time.md) | Clone and build Weft at the commit in `weft.ref`; commit nothing from it. | accepted |
| [0004 Index Weft's docs with this site's own config](decisions/0004-index-weft-docs-with-site-config.md) | Two corpora, two configs, so the Docs page shows Weft's user guides. | accepted |
| [0005 Static intro on embedded pages](decisions/0005-static-intro-on-embedded-pages.md) | A fallback section keeps FAQ and Docs readable without the bundle. | accepted |
| [0006 Render specifications from Markdown](decisions/0006-render-specs-from-markdown.md) | Spec sources are Markdown, rendered at build time with Weft's installed packages. | accepted |
| [0007 Render the social preview image from HTML](decisions/0007-render-social-image-from-html.md) | `og.png` comes from a themed HTML card via headless Chrome and is committed. | accepted |
| [0008 Scope of the Documentation page](decisions/0008-documentation-page-scope.md) | Whether Docs shows Weft's internal specification documents or only its user guides. | open |
| [0009 Share nav markup through a templating step](decisions/0009-share-nav-markup.md) | Whether to replace the duplicated nav and footer with a build-time partial. | open |
