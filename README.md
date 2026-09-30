# lepid-labs.github.io

![Type: web app](https://img.shields.io/badge/type-web_app-blueviolet) ![Status: in progress](https://img.shields.io/badge/status-in_progress-orange) [![License: proprietary](https://img.shields.io/badge/license-proprietary-lightgrey)](LICENSE)

Corporate website for Lepid Labs, published with GitHub Pages at the organisation root.

Static HTML in the [luminous-precision](https://github.com/nazuraki/ui-std-lib) style. The FAQ and Documentation pages
are [Weft](https://github.com/Lepid-Labs/weft) in embedded form, and `/spec/` publishes versioned specifications. See
[docs/PURPOSE.md](docs/PURPOSE.md) for why the site exists.

## Prerequisites

- Node.js >= 24, pnpm, git, [just](https://github.com/casey/just)
- python3 for the local preview server
- No environment variables.

## Quickstart

```sh
just build       # clone + build Weft into _build/, assemble _site/
just serve       # http://localhost:8087
just lint        # build, then verify every internal link resolves
```

With a Weft checkout next door that is already built, `just dev` skips the clone and the Weft build.

## Documentation

- [Requirements](docs/requirements.md): what the site must do and guarantee
- [Decisions](docs/decisions.md): why it is built the way it is, and what is still open
- [Runbooks](docs/runbooks.md): deploying, updating Weft, publishing a spec version

## License

Proprietary: © Lepid Labs, all rights reserved (see [LICENSE](LICENSE)). The exception is the specifications under
[`site/spec/`](site/spec), which are [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Weft is MIT licensed in
its own repository.
