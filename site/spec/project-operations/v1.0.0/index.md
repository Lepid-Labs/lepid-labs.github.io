# Project Operations 1.0.0

The Project Operations specification standardizes how a project's GitHub repository is configured, protected, checked,
and released, so that every repository merges, gates, and ships the same way.

## Summary

Project Operations builds on [Project Details 1.0.0](/spec/project-details/v1.0.0/), which in turn builds on
[Project Documentation 1.1.0](/spec/project-documentation/v1.1.0/). A project conforms to Project Operations only if it
also conforms to both. The repository type from Project Details decides how the project releases.

In short:

- Pull requests are the only way into the default branch, and they merge by squash with the PR title as the commit.
- A repository ruleset requires an approving review from a code owner and three passing checks: `lint`, `test`, and
  `pr-title`.
- CI runs the project's own task-runner recipes, so a check fails in CI exactly when it fails locally.
- PR titles follow [Conventional Commits](https://www.conventionalcommits.org/), which keeps the default branch's
  history conventional and lets releases be computed from it.
- Dependency alerts and updates are on everywhere; secret scanning is on wherever GitHub offers it.
- Each repository type has one release shape.

The key words "MUST", "MUST NOT", "SHOULD", "SHOULD NOT", and "MAY" in this document are to be interpreted as described
in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

## Terminology

Terms defined in Project Documentation and Project Details keep their meaning here.

- **Default branch**: the branch pull requests merge into, usually `main`.
- **Ruleset**: a GitHub repository ruleset, as opposed to classic branch protection.
- **Required check**: a status check the ruleset requires before a pull request can merge.
- **Task runner**: the tool that defines the project's development commands, such as `just` or `make`. Its commands are
  **recipes**.
- **Deliverable**: what a release produces: a package, a container image, an installer, or a deployed site.
- **Container image**: one image name in a registry, such as `ghcr.io/<owner>/<name>`. One image MAY cover several
  platforms, such as `linux/amd64` and `linux/arm64`, as a multi-platform image; that is still one image.

## Specification

### 1. Repository settings

1. Squash merging MUST be the only merge method. Merge commits and rebase merging MUST be disabled.
2. The squash commit title MUST be the pull request title, and the squash commit message MUST be blank.
3. Suggesting branch updates MUST be enabled, and head branches MUST be deleted on merge.
4. Auto-merge MAY be enabled. It merges only once the ruleset (section 4) is satisfied, so it cannot skip a review
   or a check.
5. The repository description MUST be set. When GitHub Pages is enabled, the homepage MUST be the Pages URL.
6. The wiki MUST be disabled; documentation lives in the repository. Discussions SHOULD be disabled unless the project
   uses them.
7. A public repository MUST have a custom social preview image.

### 2. Security

1. Dependabot alerts and Dependabot security updates MUST be enabled on every repository.
2. A public repository MUST enable secret scanning and secret scanning push protection. A private repository SHOULD
   enable both where its plan offers them.
3. Credentials used by workflows MUST come from repository or organization secrets, or from OIDC. A registry that
   supports OIDC trusted publishing MUST be published to that way, with no registry token stored as a secret.

### 3. Code owners

1. Every repository MUST have `.github/CODEOWNERS`.
2. It MUST contain a catch-all `*` rule naming the person or team who approves merges. It MUST NOT name the
   organization.
3. More specific rules MAY follow the catch-all.

### 4. Branch ruleset

1. The default branch MUST be governed by an active repository ruleset. Classic branch protection MUST NOT also be set
   on it; one source of truth.
2. The ruleset MUST:
   1. forbid deleting the branch;
   2. forbid force pushes;
   3. require a pull request with at least one approving review;
   4. require review from a code owner;
   5. dismiss approvals when new commits are pushed;
   6. require every review conversation to be resolved;
   7. allow only squash merges;
   8. require the checks `lint`, `test`, and `pr-title`, with branches up to date before merging.
3. The ruleset MAY let repository administrators bypass it. Release automation that pushes to the default branch
   (section 7) MUST use that bypass rather than a weaker ruleset.
4. A private repository whose plan does not offer rulesets is exempt from this section. A private repository that
   accepts contributors SHOULD move to a plan that offers them.

### 5. CI workflow

1. The pull request gate MUST be `.github/workflows/ci.yml`.
2. It MUST run on `pull_request` and on `push` to the default branch.
3. It MUST set a concurrency group of `${{ github.workflow }}-${{ github.ref }}` with `cancel-in-progress: true`.
4. Its top-level permissions MUST be `contents: read`. A job that needs more MUST ask for it at the job level.
5. It MUST have a job named `lint` that runs the task runner's `lint` recipe, then its `typecheck` recipe where the
   project has one, and a job named `test` that runs the `test` recipe.
6. Jobs MUST run the task runner's recipes rather than re-implement them, so that job names map one to one onto
   required checks and CI never drifts from what developers run locally.
7. A repository with a `Dockerfile` MUST have a `docker` job that builds the image through a task-runner recipe.
8. Dependencies MUST install from the committed lockfile, failing if it is out of date (for example
   `pnpm install --frozen-lockfile`, `npm ci`, `cargo build --locked`).
9. The runtime version MUST come from a committed version file (for example `node-version-file: .nvmrc`), never from a
   version written inline in the workflow.
10. Every action MUST be pinned to a major version tag or a commit SHA, never to a branch or `latest`.
11. Matrix jobs MUST be named after what varies, in terms a developer recognizes: the package in a monorepo
    (`test (core)`), the platform for a native app (`build (macos)`). A matrix over runtime versions is for a published
    library that supports several, and its name MUST also carry the package or project (`test (core, node 22)`).
12. In a monorepo, per-package tests MUST run in a matrix job named `test-package`, gated by a job named `test` that
    fails unless every matrix entry succeeded. The ruleset requires `test`, so adding a package never changes it.

### 6. Pull request titles

1. Every repository MUST have `.github/workflows/pr-guidelines.yml`, running on `pull_request` with the types
   `opened`, `edited`, `synchronize`, and `reopened`.
2. It MUST have a job named `pr-title` that fails unless the title is a Conventional Commit with one of the types
   `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, or `test`. A scope is optional.
3. The workflow MAY have further jobs that are not required checks, such as a warning when source changes arrive
   without test changes.

### 7. Releases

1. A repository MUST release deliverables of one kind only, as its type in Project Details allows:

| Type | Deliverable | Release pipeline |
|------|-------------|------------------|
| library | One or more packages; never an image or installer | `release.yml` and `publish.yml` |
| service | Exactly one container image, for as many platforms as it supports | `publish.yml` |
| web app | One UI, as one container image or one Pages site | `publish.yml` or `pages.yml` |
| native app | One application's installers, across platforms | `release.yml` |

2. A workflow that publishes two kinds of deliverable, or a service that publishes two image names, MUST NOT exist. The
   second deliverable belongs in its own repository.
3. **Library.** `release.yml` SHOULD run on push to the default branch, so every merge releases. An owner who prefers
   to batch changes into fewer releases MUST instead run it on `workflow_dispatch`; it MAY have both triggers. Either
   way the job is the same, so switching is a change to the trigger alone. It MUST compute the next version from the
   Conventional Commit titles since the last tag, commit the bump as `chore(release): v<version>`, tag it, and create
   the GitHub release. It MUST NOT run on its own bump commit, and MUST use a concurrency group that does not cancel in
   progress.
   `publish.yml` MUST run on `v*` tags and publish with provenance. A library monorepo publishes every publishable
   package at the tagged version.
4. **Native app.** `release.yml` MUST run on `workflow_dispatch`, compute the version and changelog, tag, build the
   installers on each supported platform, and attach them to the GitHub release. When the README carries a static
   version badge (item 7), it MUST first commit the bump as `chore(release): v<version>` and tag that commit.
5. **Service, and web app shipped as a container.** `publish.yml` MUST run on push to the default branch and on `v*`
   tags, push the image to the GitHub Container Registry tagged `latest` (default branch only), `sha-<short sha>`, and
   the semantic version on tags, with `packages: write` and a concurrency group per ref. There is no `release.yml`.
   An image built for several platforms MUST be published as one multi-platform image under every tag, not as
   separate image names or per-platform tags.
6. **Web app shipped as a static site.** `pages.yml` MUST build with the task runner and deploy with
   `actions/deploy-pages` through the `github-pages` environment. Pages MUST be set to deploy from a workflow. Every
   merge to the default branch is a release.
7. When the README's version badge is static (Project Details, section 5.4), the release commit MUST rewrite it to the
   new version. No other commit may change it.

### 8. Labels

1. Every repository MUST have these labels:

| Group | Labels | Use |
|-------|--------|-----|
| Change type | `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `ci`, `build`, `style`, `revert` | The Conventional Commits type the work will carry |
| Triage | `priority`, `nice to have`, `wontfix`, `question`, `invalid` | Whether and when the work happens |
| Concern | `accessibility`, `security`, `research` | Barriers for people with disabilities; data, host, or runtime security; an investigation that ends in findings, not code |
| Effort | `XS`, `S`, `M`, `L`, `XL` | The size of the change (section 8.2) |

2. Effort labels mean:

| Label | Meaning |
|-------|---------|
| `XS` | Minor update with no code impact, such as a typo or a comment |
| `S` | Small, localized change to a single file or function |
| `M` | Moderate change spanning a few files within one area |
| `L` | Large change across multiple areas or subsystems |
| `XL` | Project-wide impact, such as a tooling change, a move to a monorepo, or a major refactor |

3. A repository MAY add `blocked`, for work waiting on an outside dependency or decision, and area labels named
   `area:<kebab-name>`. Labels that tools add, such as Dependabot's, are allowed.
4. A repository MUST NOT have the labels `good first issue` or `help wanted`.

## Examples

### ci.yml

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

permissions:
  contents: read

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: extractions/setup-just@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v6
        with:
          node-version-file: .nvmrc
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: just lint
      - run: just typecheck

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: extractions/setup-just@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v6
        with:
          node-version-file: .nvmrc
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: just test
```

### pr-guidelines.yml

```yaml
name: PR guidelines

on:
  pull_request:
    types: [opened, edited, synchronize, reopened]

permissions:
  pull-requests: read

jobs:
  pr-title:
    runs-on: ubuntu-latest
    steps:
      - uses: amannn/action-semantic-pull-request@v5
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          types: |
            build
            chore
            ci
            docs
            feat
            fix
            perf
            refactor
            revert
            style
            test
          requireScope: false
```

### Ruleset

The body for `POST /repos/{owner}/{repo}/rulesets`. Actor `5` is the repository administrator role.

```json
{
  "name": "main",
  "target": "branch",
  "enforcement": "active",
  "conditions": { "ref_name": { "include": ["~DEFAULT_BRANCH"], "exclude": [] } },
  "bypass_actors": [{ "actor_id": 5, "actor_type": "RepositoryRole", "bypass_mode": "always" }],
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    {
      "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 1,
        "dismiss_stale_reviews_on_push": true,
        "require_code_owner_review": true,
        "require_last_push_approval": false,
        "required_review_thread_resolution": true,
        "allowed_merge_methods": ["squash"]
      }
    },
    {
      "type": "required_status_checks",
      "parameters": {
        "strict_required_status_checks_policy": true,
        "required_status_checks": [{ "context": "lint" }, { "context": "test" }, { "context": "pr-title" }]
      }
    }
  ]
}
```

## Declaring conformance

A project MAY declare conformance with a badge among its other badges (Project Details, section 1). Conformance to
Project Operations implies conformance to the specifications it builds on, so a project SHOULD declare only this badge:

```markdown
[![Ops: project-operations 1.0.0](https://img.shields.io/badge/ops-project--operations_1.0.0-blueviolet)](https://lepid-labs.github.io/spec/project-operations/v1.0.0/)
```

## FAQ

### Why a ruleset and not classic branch protection?

Rulesets can be layered across an organization, read through one endpoint, and bypassed by role instead of by
switching protection off. Classic protection and a ruleset can govern the same branch at once, and two sources of truth
is how a rule goes missing unnoticed, so this specification allows only the ruleset.

### Why require code-owner review when one approval is already required?

An approval count alone lets any two collaborators with write access approve each other's work. Code-owner review makes
the owner's approval the one that counts, and dismissing stale approvals stops a later push from riding an earlier one.

### Why squash merges with the PR title as the commit?

It gives the default branch one commit per pull request, titled in Conventional Commits form because the `pr-title`
check enforced it. That history is what a library's release computes its next version from.

### Why must CI run task-runner recipes?

So that a developer who runs `lint` and `test` locally gets the same answer CI will. A workflow that re-implements the
steps drifts from them, and the required checks stop meaning what their names say.

### Why can a repository release only one kind of deliverable?

Each kind has its own release cadence, versioning, and consumers. A repository that ships a service and a library ties
them together, so a fix to one forces a release of the other. The type in Project Details names the one kind.

### How is this specification versioned?

With [Semantic Versioning](https://semver.org), by the same rules as Project Documentation. Each version names the
Project Details version it builds on. Published versions are never edited; each lives at its own address.

## License

This specification is licensed under [Creative Commons Attribution 4.0
International](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0). You may copy, adapt, and redistribute it,
including commercially, provided you credit Lepid Labs and link to the license.
