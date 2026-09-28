# Render the social preview image

Regenerate `site/assets/og.png` after changing `scripts/og-card.html` or the theme
([0007](../decisions/0007-render-social-image-from-html.md)).

1. Run `just og-image`. It uses Chrome at its default macOS location; pass another binary as
   `just og-image <path>`.
2. Open `site/assets/og.png` and check it is 1200 × 630 and fully rendered, including fonts.
3. Commit the PNG. The build does not regenerate it.
