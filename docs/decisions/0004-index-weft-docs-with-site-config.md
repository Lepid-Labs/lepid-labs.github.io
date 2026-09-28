# 0004 Index Weft's docs with this site's own config

Status: accepted

## Context

The site shows two Weft corpora: its own FAQ, and Weft's documentation. Weft's own config hides the user guides from
its nav, which suits Weft's repository but not a public Docs page.

## Decision

The FAQ corpus is Markdown in `site/faq/`, indexed by the root `weft.config.yaml`; node ids are relative to that
directory, so the page mounts with `baseUrl: "/faq"`. Weft's docs are staged from the checkout into
`_build/weft-docs/` and indexed with `config/weft-docs.config.yaml`. Both manifests are written into a `.weft/`
directory that ships with the site and is gitignored.

## Consequences

The Docs page shows the user guides. Which of Weft's other documents it shows is still open
([0008](0008-documentation-page-scope.md)).
