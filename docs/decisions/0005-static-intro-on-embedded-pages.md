# 0005 Static intro on embedded pages

Status: accepted

## Context

The FAQ and Docs pages are rendered by JavaScript. Crawlers, link previews, and readers whose bundle fails to load
would otherwise see an empty page.

## Decision

Each embedded page renders a short `.embed-fallback` section before the Weft mount point, linking to the same
Markdown on GitHub. The mount script hides it once `mountWeft` returns. The intro is a sibling of the container, not
its content, because Weft appends into its container rather than replacing it.

## Consequences

The pages always have content ([RQ-010](../requirements/build.md)). The intro's links must be kept in step with
the corpus.
