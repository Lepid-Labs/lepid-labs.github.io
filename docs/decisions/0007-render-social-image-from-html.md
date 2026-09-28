# 0007 Render the social preview image from HTML

Status: accepted

## Context

Every page's `og:*` tags need one preview image that matches the site's theme.

## Decision

`site/assets/og.png` is rendered from `scripts/og-card.html`, which uses the theme tokens, by headless Chrome
(`just og-image`). The PNG is committed; the build does not regenerate it.

## Consequences

The image stays on-theme without a drawing tool. Changing it needs a local Chrome
([runbook](../runbooks/render-social-image.md)).
