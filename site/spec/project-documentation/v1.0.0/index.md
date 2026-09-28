# Project Documentation 1.0.0

## Summary

The Project Documentation specification is a convention for documenting a software project so that users, contributors,
and agents alike have a standard and approachable access to the knowledge the need. This convention dovetails with
[Conventional Commits](https://www.conventionalcommits.org/) to provide consistent change history and standards to build
tooling on top of.

Every project has three required documents, each written for a different reader:

- `README.md` is for someone who has never seen the project.
- `docs/PURPOSE.md` is for someone deciding whether the project is useful to them.
- `CONTEXT.md` is for someone about to change it.

A root `LICENSE` file states the terms under which the project may be used.

Everything else is created only when it is needed: detail directories under `docs/` for requirements, features, use
cases, research, decisions, designs, runbooks, and guides, each indexed by a summary document beside it. One rule holds
it together: documents record what the code cannot. Anything a reader or a tool can derive from the source stays out.

The key words "MUST", "MUST NOT", "SHOULD", "SHOULD NOT", and "MAY" in this document are to be interpreted as described
in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

## Terminology

- **Project**: a repository and everything it delivers.
- **Monorepo**: a project delivered as several packages (applications, libraries, services) from one repository.
- **Package**: one deliverable unit inside a monorepo.
- **Detail directory**: a directory under `docs/` that holds one kind of document, such as `docs/decisions/`.
- **Detail file**: one document inside a detail directory.
- **Summary document**: the index of a detail directory, named after it and placed beside it, such as
  `docs/decisions.md`.
- **Derivable content**: anything that can be read from the source or produced by tooling, such as file trees, route
  lists, symbol names, dependency versions, and constants.

## Specification

### 1. Principles

1. Documents MUST record what the code cannot: intent, decisions, business rules, external contracts, deployment
   topology, and open questions.
2. Documents MUST NOT contain derivable content.
3. Each fact MUST have one canonical home. A document that needs a fact held elsewhere MUST link to it rather than
   restate it.
4. Cross-cutting documents MUST live at the project root. Documents about one package MUST live in that package.
5. A document SHOULD stay under about 200 lines. A longer one SHOULD be split or cleared of derivable content.

### 2. Required documents

1. Every project MUST have `README.md`, `docs/PURPOSE.md`, `CONTEXT.md`, and a root `LICENSE` file. The first three
   serve different readers and MUST NOT be merged.
2. `README.md` MUST contain the status and type badges (section 3), the project name and a one-sentence description,
   prerequisites (runtime versions, required environment variables), the commands to install and run the project, a link
   to `docs/PURPOSE.md`, and a license line.
3. The license line MUST name the license, or state that the project is proprietary, and link to `LICENSE`.
4. `LICENSE` MUST hold the full text of the license the project is distributed under. A proprietary project's `LICENSE`
   MUST name the copyright owner and state that all rights are reserved. Parts of the project under different terms MUST
   be named in `LICENSE`, with their license.
5. `docs/PURPOSE.md` MUST describe the problem being solved in one to three paragraphs, list explicit non-goals, and
   name the intended audience.
6. `CONTEXT.md` MUST hold the working context for anyone changing the project: architectural decisions not visible in
   code, business rules and thresholds (the canonical definition, even when the code also expresses it), deployment
   topology, what each environment variable means, external contracts not yet implemented, and open questions and
   deferred decisions.
7. `CONTEXT.md` SHOULD be updated in every change that alters any of the above.
8. The open questions in `CONTEXT.md` MUST NOT be trimmed for length. A question leaves the list only when it is
   answered, and the answer is recorded elsewhere in the file.

### 3. Badges

1. The line immediately after the README's H1 MUST carry a status badge followed by a type badge. Other badges MAY
   follow those two.
2. The status MUST be exactly one of these stages, written with the exact Markdown shown, so every project renders the
   same badge for the same stage:

| Stage | Meaning | Markdown |
|-------|---------|----------|
| research | Investigating whether and how to build it; no committed scope | `![Status: research](https://img.shields.io/badge/status-research-lightgrey)` |
| planning | Scope agreed, design underway, little or no code | `![Status: planning](https://img.shields.io/badge/status-planning-red)` |
| in progress | Actively being built; not usable end to end | `![Status: in progress](https://img.shields.io/badge/status-in_progress-orange)` |
| alpha | Usable by the team; incomplete and unstable | `![Status: alpha](https://img.shields.io/badge/status-alpha-yellow)` |
| beta | Feature complete for the intended audience; stabilizing | `![Status: beta](https://img.shields.io/badge/status-beta-blue)` |
| production | Released and supported | `![Status: production](https://img.shields.io/badge/status-production-brightgreen)` |

3. A project that is no longer maintained MUST keep its stage badge and add
   `![Archived](https://img.shields.io/badge/archived-inactive)` on the same line.
4. The status badge MUST be updated in the same change that moves the project to a new stage.
5. The type MUST be exactly one of these, written with the exact Markdown shown:

| Type | Meaning | Markdown |
|------|---------|----------|
| library | Publishes packages for other code to depend on; ships no runnable deliverable of its own | `![Type: library](https://img.shields.io/badge/type-library-blueviolet)` |
| service | The primary interface is an API; it may carry a web UI for administration | `![Type: service](https://img.shields.io/badge/type-service-blueviolet)` |
| web app | The primary interface is a web UI | `![Type: web app](https://img.shields.io/badge/type-web_app-blueviolet)` |
| native app | The primary distribution is a compiled binary: desktop, mobile, or command line | `![Type: native app](https://img.shields.io/badge/type-native_app-blueviolet)` |

6. The type MUST be chosen by primary interface and distribution, not by everything the code contains. A service with an
   administration console is a service. A web app whose API exists only to serve its own UI is a web app. A library that
   ships a helper CLI is a library. A CLI that is the product is a native app.
7. In a monorepo, only the root README carries a type badge. Only the root README carries a status badge, except that an
   independently published package MAY carry its own.

### 4. Detail directories

1. A project SHOULD create each detail directory when its trigger applies, and MUST NOT create one before it has a file
   to hold.

| Directory | Holds | Create when | File naming |
|-----------|-------|-------------|-------------|
| `docs/requirements/` | Functional and non-functional requirements, constraints, acceptance criteria | Requirements come from stakeholders or span more than one issue | `<area>.md`, one area per file |
| `docs/features/` | One user-facing feature per file: behaviour, scope, out of scope, the requirements and use cases it satisfies | Feature behaviour must be agreed before or after building | `<feature>.md` |
| `docs/use-cases/` | Actor–goal interactions: preconditions, primary flow, alternate flows, postconditions | User interactions need to be spelled out step by step | `<actor-goal>.md` |
| `docs/research/` | Spikes, evaluations, benchmarks, prior-art surveys, with findings and recommendations | An investigation produces findings worth keeping | `<topic>.md`, dated in the first lines |
| `docs/decisions/` | Decision records: context, decision, consequences, status | A decision is made that a future reader will question | `NNNN-<title>.md` |
| `docs/design/` | Designs and technical specifications: approach, alternatives, data model, interfaces | A change is large enough to need a design before implementation | `<title>.md` |
| `docs/runbooks/` | Operational procedures: deploy, rollback, incident response, maintenance | The project is operated in production | `<procedure>.md` |
| `docs/guides/` | How to use, configure, or extend the product, one topic per file | Users need more than the README | `<topic>.md` |

2. A detail file MUST link to the files it derives from or satisfies. Research informs decisions; requirements and use
   cases define what a feature must do; a design says how it is built; runbooks say how it is operated; guides say how
   to use what was built.
3. A research document feeds a decision. It MUST NOT make one.
4. A decision record MUST NOT be edited after acceptance, except to mark it superseded. A changed decision is a new
   record.
5. A guide MUST describe the product as built. It MUST NOT restate a feature or design document.
6. Exported UI mockups are assets, not detail files. They MUST live in `docs/design/mockups/<name>/`, MUST NOT have a
   summary entry of their own, and MUST be linked from the design or feature document that uses them. A mockup that
   nothing links to MUST be removed.

### 5. Summary documents

1. Every detail directory `docs/<area>/` MUST have a summary document `docs/<area>.md` beside it, created in the same
   change as the first detail file.
2. A summary MUST open with one paragraph on what the directory covers and how it is organized, followed by one entry
   per detail file.
3. Each entry MUST give the file's title, a one-sentence summary, a relative link, and its status where the type has
   one. Longer commentary belongs in the detail file.
4. Status values are `draft`, `agreed`, or `retired` for requirements; `proposed`, `accepted`, or `superseded by NNNN`
   for decisions; and `open` or `concluded` for research.
5. A summary MUST list every file in its directory, and every entry MUST link to a file that exists.
6. A summary MUST be updated in the same change that adds, supersedes, or retires a detail file.

### 6. Stable identifiers

1. Requirements MUST carry IDs of the form `RQ-nnn`, and use cases `UC-nnn`: three digits, zero-padded, one sequence of
   each per project. A monorepo keeps a single sequence of each at the root.
2. An ID MUST NOT be changed or reused.
3. A requirement is an H2 in its area file, `## RQ-014 <title>`, with its status on the next line. A use case's H1 is
   `# UC-007 <actor goal>`.
4. Summaries, features, and other cross-references SHOULD cite the ID, so a renamed file or heading does not break the
   reference.

### 7. Optional documents

1. `CHANGELOG.md` SHOULD exist when the project publishes versioned releases. Otherwise the repository's change history
   serves.
2. `CONTRIBUTING.md` SHOULD exist when the project accepts outside contributions. Otherwise a Contributing section in
   the README is enough.

### 8. Monorepos

1. The root describes the product. Each package describes only itself. To place a document, ask: if this package were
   deleted, would the document still be true? If yes, it belongs at the root.
2. The root README MUST be a map of the repository: the product's one-sentence description, repository-wide
   prerequisites, the workspace-level install and run commands, a table of packages (name, one-line purpose, link to its
   README), and the license line. It MUST NOT carry package-specific instructions.
3. The root `docs/PURPOSE.md` covers the product as a whole.
4. The root `CONTEXT.md` MUST hold only what spans packages, and MUST link to any package `CONTEXT.md`.
5. `docs/decisions/` MUST exist only at the root, so that decision numbers are unique. A decision scoped to one package
   names the package in its title.
6. `docs/requirements/`, `docs/use-cases/`, and `docs/research/` MUST stay at the root unless a package is independently
   published.
7. Every package MUST have a `README.md` stating what the package is, how it fits the product (one sentence, linking to
   the root README), its own prerequisites, and how to run its tasks.
8. A package MAY have a `CONTEXT.md` for decisions, rules, or open questions the rest of the repository does not need.
9. A package MUST NOT have its own `docs/PURPOSE.md`, `CHANGELOG.md`, or `LICENSE` unless it is independently published.
10. A package MAY have `docs/features/`, `docs/design/`, `docs/runbooks/`, and `docs/guides/` for items scoped to it
    alone, each with its summary. An item that touches two packages belongs in the root directory of the same name.
11. Package summaries MAY link to root detail files. Root summaries MUST NOT link into package directories; only the
    root README's package table links to packages.

### 9. Formatting

1. Every document MUST be Markdown, open with a single H1 that states its purpose, and use only H2 and H3 below it.
2. Root documents MUST be named in upper case (`README.md`, `CONTEXT.md`, `LICENSE`). Files under `docs/` MUST be
   kebab-case, except `PURPOSE.md`.
3. Decision records MUST be named `NNNN-<title>.md`: four digits, zero-padded, starting at `0001`.
4. Links between documents in the same repository MUST be relative paths.
5. Documents MUST NOT contain credentials, internal hostnames or URLs, or personal information. Write every document as
   if the repository were public.

### 10. Prohibited

A conforming project MUST NOT contain:

1. A `docs/` subdirectory created before there is a file to put in it.
2. Generated API reference committed to the repository. Generate it in CI or on demand.
3. A copy of the README under `docs/`.
4. README files inside a single project's source tree, such as `src/parser/README.md`. Use a comment at the top of the
   code, or `CONTEXT.md`.

## Examples

### Single project

```text
.
├── README.md
├── CONTEXT.md
├── LICENSE
├── CHANGELOG.md            # optional
├── CONTRIBUTING.md         # optional
└── docs/
    ├── PURPOSE.md
    ├── decisions.md        # summary
    ├── decisions/          # detail
    │   ├── 0001-use-postgres.md
    │   └── 0002-drop-redis-cache.md
    ├── runbooks.md
    └── runbooks/
        └── deploy.md
```

### Monorepo

```text
.
├── README.md               # map of the repository
├── CONTEXT.md              # cross-cutting context only
├── LICENSE                 # covers every package
├── docs/
│   ├── PURPOSE.md          # the product as a whole
│   ├── decisions.md, decisions/        # the only decision sequence
│   └── requirements.md, requirements/  # product-level requirements
├── apps/web/
│   ├── README.md           # required in every package
│   └── docs/
│       └── guides.md, guides/
└── packages/parser/
    ├── README.md
    └── CONTEXT.md          # only what the rest of the repo needn't know
```

### Summary document

```markdown
# Decisions

Decision records for the project, one per file, numbered in the order they
were made. A record is never edited after acceptance; a changed decision
supersedes it with a new one.

| Decision | Summary | Status |
|----------|---------|--------|
| [0001 Use PostgreSQL](decisions/0001-use-postgres.md) | One relational store for all services. | accepted |
| [0002 Drop the Redis cache](decisions/0002-drop-redis-cache.md) | Query caching moves into PostgreSQL. | superseded by 0003 |
```

## Declaring conformance

A project MAY declare conformance with a badge after its status and type badges:

```markdown
[![Docs: project-documentation 1.0.0](https://img.shields.io/badge/docs-project--documentation_1.0.0-blueviolet)](https://lepid-labs.github.io/spec/project-documentation/v1.0.0/)
```

## FAQ

### Where do agent instructions, task runners, and CI configuration go?

They are outside this specification, which covers the documents people read to understand a project. An agent
instructions file such as `AGENTS.md` works best when it points at `CONTEXT.md` instead of repeating it.

### Does every project need every detail directory?

No. Most projects need two or three. A directory appears when its trigger applies and not before, which is why an empty
`docs/` subdirectory is prohibited.

### Why keep derivable content out?

It is always out of date. A file tree or a dependency list in a document is correct on the day it is written, and a
reader who finds one stale entry stops trusting the rest. Tooling answers those questions from the source, correctly,
every time.

### Why three required documents instead of one README?

They have different readers who want different things. A newcomer wants to run the project, an evaluator wants to know
why it exists, and a maintainer wants the decisions behind it. One file serving all three serves none of them well.

### How is this specification versioned?

With [Semantic Versioning](https://semver.org). A patch release fixes wording without changing what conforms. A minor
release adds optional documents or relaxes a rule. A major release can make a conforming project non-conforming.
Published versions are never edited; each lives at its own address.

## License

This specification is licensed under [Creative Commons Attribution 4.0
International](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0). You may copy, adapt, and redistribute it,
including commercially, provided you credit Lepid Labs and link to the license.
