# lepid-labs.github.io — agent instructions

Read [CONTEXT.md](CONTEXT.md) before changing anything; update it as the last step of every implementation task.

## Commands

- `just build` (clones and builds Weft at `weft.ref`, assembles `_site/`), `just serve`, `just lint`
- `just dev` when a built Weft checkout sits at `../weft`
- `just weft-bump` to move `weft.ref` to Weft's main

## Conventions

- Plain HTML and CSS under `site/`. No framework, no npm dependencies, no build step for the site itself.
- Styling: `data-nb-style="luminous-precision"` on `<html>`, `nb-*` classes and `--nb-*` tokens only. No literal colours or fonts in `site/assets/site.css`. Missing components go upstream to ui-std-lib.
- FAQ content is Markdown in `site/faq/`; list new documents in `weft.config.yaml` `docOrder`.
- Public repository: no filesystem paths, hostnames, emails, or credentials in code or docs.
- Do not add dependencies without asking.
