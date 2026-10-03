# 0011 Map the required checks onto the build

Status: accepted

## Context

Project Operations 1.0.0 requires the checks `lint`, `test`, and `pr-title`, with `lint` and `test` as CI jobs that
run the Justfile recipes of the same names. The site has no TypeScript, no unit tests, and installs nothing
([RQ-006](../requirements/build.md)). Its only verification was a CI job named `build` that built the site and
checked links. Adding a linter or test runner would add a dependency.

## Decision

Use the tooling the site already has:

- `just lint` builds the site, then runs `scripts/check-links.mjs`, so every internal link resolves
  ([RQ-008](../requirements/build.md)). CI's `lint` job then runs `just typecheck`, which is a no-op.
- `just test` is the build. It fails when Weft does not build at `weft.ref`, a manifest cannot be generated, or a
  spec page cannot be rendered.
- `just check` runs all three, as CI does.

## Consequences

`lint` covers everything `test` does, plus links, so the two jobs overlap. Each builds the site on its own runner,
which costs about half a minute. A real test suite, if one is added later, replaces the body of `test` without
changing the required checks.
