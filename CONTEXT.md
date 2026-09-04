# Context

Working context for changing the Lepid Labs site. What the code cannot tell you.

## Architecture

- **No framework, no dependencies.** Every page under `site/` is hand-written HTML with one shared stylesheet. The build has nothing to install for the site itself; the only build work is Weft.
- **Style comes from ui-std-lib, not from this repo.** Pages load `@nazuraki/styles` (luminous-precision) from jsDelivr, pinned to a version, and put `data-nb-style` on `<html>`. `site/assets/site.css` holds only layout for this site's chrome and is written against `--nb-*` tokens; anything that looks like a new component belongs upstream in ui-std-lib.
- **Weft is vendored at build time, not committed.** `@weft/embed` is not on npm. `scripts/build.sh` clones `Lepid-Labs/weft` at the commit in `weft.ref`, builds the embed bundle, and copies `weft.iife.js` and `weft.css` to the site root. Bumping Weft is a one-line change to `weft.ref` plus a visual check.
- **Two Weft corpora, two configs.** The FAQ corpus is Markdown in `site/faq/` indexed by the root `weft.config.yaml`; node ids are relative to that directory, so the page mounts with `baseUrl: "/faq"`. Weft's own docs are staged from the checkout into `_build/weft-docs/` and indexed with `config/weft-docs.config.yaml` rather than Weft's own config, which hides the user guides from its nav. Both manifests are written into a `.weft/` directory that ships with the site and is gitignored here.
- **Same origin as the Weft project site.** `lepid-labs.github.io/weft/` is a separate repository's Pages deployment served under this site's origin. Do not add a `site/weft/` directory; it would collide.
- **Embedded pages carry a static intro.** Docs and FAQ render a short `.embed-fallback` section before the Weft mount point, with links to the same Markdown on GitHub. The mount script hides it once `mountWeft` returns; if the bundle fails to load or JavaScript is off it stays, so crawlers, link previews, and failed loads never see an empty page. Weft appends into its container rather than replacing it, which is why the intro is a sibling and not the container's content.
- **Social preview image is rendered, not drawn.** `site/assets/og.png` comes from `scripts/og-card.html`, which uses the theme tokens so it matches the site. `just og-image` re-renders it with headless Chrome; commit the PNG since the build does not regenerate it. Every page's `og:*` tags point at it.
- **Deploy is GitHub Actions.** The `pages` workflow builds on push to main. Nothing is served from a branch, so a merge is the publish step.

## Framing

- **Lepid Labs is a software lab, not a Weft company.** Weft is the first release of a wide portfolio (developer tooling, knowledge and agents, platform services, creative tools). The home page leads with the lab's line and method, then Weft, then the pipeline by area. Do not rewrite it as a product landing page, and do not embed Weft on the home page; the FAQ and Docs pages already demonstrate it.
- **The pipeline is listed by area, never by repository.** Projects get a name on the site when they are usable by someone other than the lab. Hobby-grade work in the GitHub organisation (bots, a torrent client) is deliberately left off.
- **The three principles live on the home page only.** About is short on purpose: why the lab exists, one plain sentence about AI-assisted development, contact.

## Rules and thresholds

- Public repository: no hostnames, IPs, emails, or personal details anywhere, including the FAQ corpus.
- `just lint` must pass: every root-relative and relative link in the built site must resolve to a file.
- Embedded Weft is fixed to `style: "luminous-precision"` so the reader matches the page and the theme toggle stays hidden.
- Keep each page under 200 lines; shared markup (nav, footer) is duplicated per page on purpose to avoid a build step. If it grows past four or five pages, add a small templating step rather than a framework.

## Open questions

- Whether the Documentation page should keep showing Weft's internal spec documents (plan, research, design decisions) or only the user guides.
- A contact channel other than the GitHub organisation.
