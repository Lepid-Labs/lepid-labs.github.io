# 0002 Take all styling from ui-std-lib

Status: accepted

## Context

Lepid Labs products share one visual language, luminous-precision, published from ui-std-lib as
`@nazuraki/styles`.

## Decision

Pages load the theme from jsDelivr, pinned to a version, and set `data-nb-style` on `<html>`. `site/assets/site.css`
holds only this site's layout, written against `--nb-*` tokens.

## Consequences

The site always matches the products. Anything that looks like a new component goes upstream to ui-std-lib instead
of into this repository. Bumping the theme is a version change in every page's `<link>`.
