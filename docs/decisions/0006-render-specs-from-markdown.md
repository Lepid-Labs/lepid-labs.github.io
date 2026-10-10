# 0006 Render specifications from Markdown

Status: accepted

## Context

Specifications are long, versioned documents whose Markdown source should be published alongside the page, as
conventionalcommits.org does. Hand-written HTML would mix the text with markup and exceed the page size limit.

## Decision

A spec version is `site/spec/<name>/v<semver>/`, written as one `index.md` or, when it is long, as section files in
`sections/` that the build joins in name order into the published `index.md`. `scripts/render-specs.mjs` renders each
into an `index.html` beside it, using `scripts/spec-page.html` as the shell and the unified, remark, and rehype packages
already installed in Weft's `packages/ui`. The page title and description come from the H1 and the first paragraph
after it; numbered H3 clauses join the H2s in the contents list. `site/spec/index.html` is the landing page, and each
`site/spec/<name>/index.html` redirects to that spec's latest version.

## Consequences

The site still installs nothing ([RQ-006](../requirements/build.md)), but the renderer depends on the packages in
Weft's checkout. A Weft bump that drops or moves them breaks the build, which the build itself reports.
