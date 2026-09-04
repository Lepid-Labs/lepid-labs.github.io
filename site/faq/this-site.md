# About this site

## How are the FAQ and Docs pages built?

Both pages are [Weft](weft.md#what-is-weft) in embedded form. The page you are reading now is a small Markdown corpus in the site's repository; the [Documentation](/docs/) page is Weft's own `docs/` directory, taken from the same Weft commit the embed bundle was built from.

On every deploy a build script clones Weft at a pinned commit, builds `@weft/embed`, generates a graph manifest for each corpus with `@weft/core`, and copies the results into the static site. The pages then call `Weft.mountWeft` with a `baseUrl` on this origin. Nothing is fetched from a third party at runtime except webfonts and the stylesheet.

## Why not just write the FAQ as a page?

Because the product's claim is that documentation is better as a graph, and a FAQ is a good test of that claim. Every answer here that depends on another links to it at the heading level, which is what makes the search, the linked-items panel, and the back-references work. Using Weft for our own text is also the fastest way to notice when it falls short.

## Why does everything look like this?

The site uses `luminous-precision`, a theme from the [ui-std-lib](https://github.com/nazuraki/ui-std-lib) design system: a deep obsidian foundation, glass surfaces with a lit top edge, orchid as the primary voice, and electric teal for active paths, with Sora headlines over a JetBrains Mono body. The stylesheet is loaded from a pinned release on jsDelivr, and the site's own CSS is layout only, written against the theme's tokens. The embedded Weft is fixed to the same theme so the reader and the page match.

## Where is the source?

The site repository is [github.com/Lepid-Labs/lepid-labs.github.io](https://github.com/Lepid-Labs/lepid-labs.github.io). Corrections to these answers are welcome as pull requests.
