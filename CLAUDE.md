# lepid-labs.github.io — agent instructions

Documentation follows the [Project Documentation spec](site/spec/project-documentation/v1.2.0/index.md). Read
[docs/requirements.md](docs/requirements.md) and [docs/decisions.md](docs/decisions.md) before changing anything. In the
same change, record new or changed requirements and decisions there, and update any runbook whose steps changed.

## Commands

- `just build` (clones and builds Weft at `weft.ref`, assembles `_site/`), `just serve`, `just lint`
- `just check` runs `lint`, `typecheck`, and `test`, the recipes behind CI's required checks
  ([0011](docs/decisions/0011-map-required-checks-onto-the-build.md))
- `just dev` when a built Weft checkout sits at `../weft`
- `just weft-bump` to move `weft.ref` to Weft's main

## Conventions

- Plain HTML and CSS under `site/`. No framework, no npm dependencies, no build step for the site itself.
- Styling: `data-nb-style="luminous-precision"` on `<html>`, `nb-*` classes and `--nb-*` tokens only. No literal colours
  or fonts in `site/assets/site.css`. Missing components go upstream to ui-std-lib.
- FAQ content is Markdown in `site/faq/`; list new documents in `weft.config.yaml` `docOrder`.
- Specs are Markdown at `site/spec/<name>/v<semver>/index.md`, rendered at build time. Never edit a published version;
  add a new version and list it in `site/spec/index.html`, and point `site/spec/<name>/index.html` at it. A version
  whose H1 ends in `(draft)` is unpublished and may be edited until it is published
  ([runbook](docs/runbooks/publish-spec-version.md#drafts)).
- Public repository: no filesystem paths, hostnames, emails, or credentials in code or docs.
- Do not add dependencies without asking.
