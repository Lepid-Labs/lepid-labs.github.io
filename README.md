# lepid-labs.github.io

![Status: in progress](https://img.shields.io/badge/status-in_progress-orange)

Corporate website for Lepid Labs, published with GitHub Pages at the organisation root.

Static HTML in the [luminous-precision](https://github.com/nazuraki/ui-std-lib) style. The FAQ and Documentation pages are [Weft](https://github.com/Lepid-Labs/weft) in embedded form: the FAQ is a Markdown corpus in this repository, and the Documentation page renders Weft's own docs from the pinned checkout.

| Path | Purpose |
|------|---------|
| [`site/`](site) | The pages as deployed: home, about, FAQ, docs, 404, shared CSS |
| [`site/faq/*.md`](site/faq) | FAQ corpus, indexed by Weft (`weft.config.yaml`) |
| [`config/weft-docs.config.yaml`](config/weft-docs.config.yaml) | Weft config used to index Weft's own docs for `/docs/` |
| [`scripts/build.sh`](scripts/build.sh) | Clones and builds Weft at `weft.ref`, generates both manifests, assembles `_site/` |
| [`weft.ref`](weft.ref) | The Weft commit the site is built against |

See [docs/PURPOSE.md](docs/PURPOSE.md) for goals and non-goals, and [CONTEXT.md](CONTEXT.md) before changing things.

## Prerequisites

- Node.js >= 24, pnpm, git, [just](https://github.com/casey/just)
- python3 for the local preview server

## Quickstart

```sh
just build       # clone + build Weft into _build/, assemble _site/
just serve       # http://localhost:8087
just lint        # build, then verify every internal link resolves
```

With a Weft checkout next door that is already built, `just dev` skips the clone and the Weft build.

## Updating Weft

`just weft-bump` points `weft.ref` at the tip of Weft's main. Rebuild and check the FAQ and Documentation pages before merging.

## Deployment

Merging to main runs the `pages` workflow: build, link check, deploy. Pages must be configured to deploy from GitHub Actions.

## License

Site content and design are © Lepid Labs, all rights reserved. Weft is MIT licensed in its own repository.
