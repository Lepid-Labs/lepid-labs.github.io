# Project Documentation 1.1.0

The Project Documentation specification is a convention for documenting a software project so that users, contributors,
and agents alike have a standard, approachable access to the knowledge they need.

## Summary

Every project has four required documents, each written for a different reader:

- `README.md` is for someone who has never seen the project.
- `docs/PURPOSE.md` is for someone deciding whether the project is useful to them.
- `docs/requirements/` is for someone building the project or checking what it must do.
- `LICENSE` is for someone concerned with whether and how they may use it.

Everything else is created only when it is needed: detail directories under `docs/` for features, use cases, research,
decisions, designs, runbooks, and guides, each indexed by a summary document beside it. One rule holds it together:
documents record what the code cannot. Anything a reader or a tool can derive from the source stays out.

The key words "MUST", "MUST NOT", "SHOULD", "SHOULD NOT", and "MAY" in this document are to be interpreted as described
in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

This convention dovetails with [Conventional Commits](https://www.conventionalcommits.org/) to provide consistent
change history and standards to build tooling on top of. Two specifications build on it:
[Project Details](/spec/project-details/v1.0.0/) standardizes the top of the README, and
[Project Operations](/spec/project-operations/v1.0.0/) standardizes how the repository is hosted and checked on GitHub.

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
6. The required documents serve different readers and MUST NOT be merged.
7. Each kind of knowledge MUST be recorded in its home:

| Knowledge | Home |
|-----------|------|
| Why the project exists, and for whom | `docs/PURPOSE.md` |
| How to install and run it, and what each environment variable means | `README.md` |
| What it must do, including business rules and thresholds | `docs/requirements/` |
| Decisions, made or still open | `docs/decisions/` |
| External contracts, interfaces, data models | `docs/design/` |
| Deployment topology and operations | `docs/runbooks/` |
| Why a piece of code is the way it is | A comment in that code |

8. A project SHOULD NOT have a catch-all context document such as `CONTEXT.md`. Everything it would hold has a home
   above, and a second copy drifts from the first.

### 2. README.md (required)

1. Every project MUST have a `README.md` at its root.
2. It MUST open with the project name as the H1.
3. It MUST contain a description of one or two sentences.
4. It MUST list prerequisites where there are any: runtime versions, and every required environment variable with
   what it means.
5. It MUST give the commands to install and run the project, where there are any.
6. It MUST link to `docs/PURPOSE.md`.
7. It MUST contain a license line that names the license, or states that the project is proprietary, and links to
   `LICENSE`.

### 3. LICENSE (required)

1. Every project MUST have a `LICENSE` file at its root.
2. It MUST hold the full text of the license the project is distributed under.
3. A proprietary project's `LICENSE` MUST name the copyright owner and state that all rights are reserved.
4. Parts of the project under different terms MUST be named in `LICENSE`, with their license.

### 4. docs/PURPOSE.md (required)

1. Every project MUST have a `docs/PURPOSE.md`.
2. It MUST describe the problem being solved in one to two sentences.
3. It MUST name the intended audience in a section headed `Audience`.

### 5. docs/requirements/ (required)

1. Every project MUST have a `docs/requirements/` directory holding at least one area file, with its summary document
   `docs/requirements.md` (section 8).
2. Requirements MUST cover what the project must do or guarantee: functional and non-functional requirements,
   business rules and thresholds, constraints, and acceptance criteria.
3. Each area file MUST be named `<area>.md` and hold one area, such as `authentication.md` or `performance.md`.
4. Each requirement MUST carry a stable identifier (section 9).

### 6. Project details

This specification sets no rules for badges or for classifying a project by type. The
[Project Details](/spec/project-details/v1.0.0/) specification builds on this one and defines both.

### 7. Detail directories

1. A project SHOULD create each detail directory when its trigger applies, and MUST NOT create one before it has a file
   to hold.

| Directory | Holds | Create when | File naming |
|-----------|-------|-------------|-------------|
| `docs/requirements/` | Functional and non-functional requirements, business rules, constraints, acceptance criteria | Always (section 5) | `<area>.md`, one area per file |
| `docs/features/` | One user-facing feature per file: behaviour, scope, out of scope, the requirements and use cases it satisfies | Feature behaviour must be agreed before or after building | `<feature>.md` |
| `docs/use-cases/` | Actor–goal interactions: preconditions, primary flow, alternate flows, postconditions | User interactions need to be spelled out step by step | `<actor-goal>.md` |
| `docs/research/` | Spikes, evaluations, benchmarks, prior-art surveys, with findings and recommendations | An investigation produces findings worth keeping | `<topic>.md`, dated in the first lines |
| `docs/decisions/` | Decision records, open or settled: context, options, decision, consequences, status | A decision is made, or one needs making, that a future reader will question | `NNNN-<title>.md` |
| `docs/design/` | Designs and technical specifications: approach, alternatives, data model, interfaces, external contracts | A change is large enough to need a design before implementation | `<title>.md` |
| `docs/runbooks/` | Deployment topology and operational procedures: deploy, rollback, incident response, maintenance | The project is deployed anywhere | `<procedure>.md` |
| `docs/guides/` | How to use, configure, or extend the product, one topic per file | Users need more than the README | `<topic>.md` |

2. A detail file MUST link to the files it derives from or satisfies. Research informs decisions; requirements and use
   cases define what a feature must do; a design says how it is built; runbooks say how it is operated; guides say how
   to use what was built.
3. A research document feeds a decision. It MUST NOT make one.
4. A decision record is the place to discuss a question until it is settled. Once accepted, it MUST NOT be edited
   except to mark it superseded; a changed decision is a new record.
5. A guide MUST describe the product as built. It MUST NOT restate a feature or design document.
6. Exported UI mockups are assets, not detail files. They MUST live in `docs/design/mockups/<name>/`, MUST NOT have a
   summary entry of their own, and MUST be linked from the design or feature document that uses them. A mockup that
   nothing links to MUST be removed.

### 8. Summary documents

1. Every detail directory `docs/<area>/` MUST have a summary document `docs/<area>.md` beside it, created in the same
   change as the first detail file.
2. A summary MUST open with one paragraph on what the directory covers and how it is organized, followed by one entry
   per detail file.
3. Each entry MUST give the file's title, a one-sentence summary, a relative link, and its status where the type has
   one. Longer commentary belongs in the detail file.
4. Status values are `draft`, `agreed`, or `retired` for requirements; `open`, `proposed`, `accepted`, or
   `superseded by NNNN` for decisions; and `open` or `concluded` for research. An `open` decision is a question with no
   proposed answer yet.
5. A summary MUST list every file in its directory, and every entry MUST link to a file that exists.
6. A summary MUST be updated in the same change that adds, supersedes, or retires a detail file.

### 9. Stable identifiers

1. Requirements MUST carry IDs of the form `RQ-nnn`, and use cases `UC-nnn`: three digits, zero-padded, one sequence of
   each per project. A monorepo keeps a single sequence of each at the root.
2. An ID MUST NOT be changed or reused.
3. A requirement is an H2 in its area file, `## RQ-014 <title>`, with its status on the next line. A use case's H1 is
   `# UC-007 <actor goal>`.
4. Summaries, features, and other cross-references SHOULD cite the ID, so a renamed file or heading does not break the
   reference.

### 10. Optional documents

1. `CHANGELOG.md` SHOULD exist when the project publishes versioned releases. Otherwise the repository's change history
   serves.
2. `CONTRIBUTING.md` SHOULD exist when the project accepts outside contributions. Otherwise a Contributing section in
   the README is enough.
3. `docs/open-questions.md` MAY exist beside `docs/decisions.md`, listing questions not yet worth a decision record, one
   line each. When a question gets a decision record, its line MUST be removed.

### 11. Monorepos

1. The root describes the product. Each package describes only itself. To place a document, ask: if this package were
   deleted, would the document still be true? If yes, it belongs at the root.
2. The root README MUST be a map of the repository: the product's description, repository-wide
   prerequisites, the workspace-level install and run commands, a table of packages (name, one-line purpose, link to its
   README), and the license line. It MUST NOT carry package-specific instructions.
3. The root `docs/PURPOSE.md` covers the product as a whole.
4. `docs/decisions/` MUST exist only at the root, so that decision numbers are unique. A decision scoped to one package
   names the package in its title.
5. `docs/requirements/`, `docs/use-cases/`, and `docs/research/` MUST stay at the root unless a package is independently
   published.
6. Every package MUST have a `README.md` stating what the package is, how it fits the product (one sentence, linking to
   the root README), its own prerequisites, and how to run its tasks.
7. A package MUST NOT have its own `docs/PURPOSE.md`, `CHANGELOG.md`, or `LICENSE` unless it is independently published.
8. A package MAY have `docs/features/`, `docs/design/`, `docs/runbooks/`, and `docs/guides/` for items scoped to it
   alone, each with its summary. An item that touches two packages belongs in the root directory of the same name.
9. Package summaries MAY link to root detail files. Root summaries MUST NOT link into package directories; only the
   root README's package table links to packages.

### 12. Formatting

1. Every document MUST be Markdown, open with a single H1 that states its purpose, and use only H2 and H3 below it.
2. Root documents MUST be named in upper case (`README.md`, `LICENSE`, `CHANGELOG.md`). Files under `docs/` MUST be
   kebab-case, except `PURPOSE.md`.
3. Decision records MUST be named `NNNN-<title>.md`: four digits, zero-padded, starting at `0001`.
4. Links between documents in the same repository MUST be relative paths.
5. Documents MUST NOT contain credentials, internal hostnames or URLs, or personal information. Write every document as
   if the repository were public.

### 13. Prohibited

A conforming project MUST NOT contain:

1. A `docs/` subdirectory created before there is a file to put in it.
2. Generated API reference committed to the repository. Generate it in CI or on demand.
3. A copy of the README under `docs/`.
4. README files inside a single project's source tree, such as `src/parser/README.md`. Use a comment at the top of the
   code.

## Examples

### Single project

```text
.
├── README.md
├── LICENSE
├── CHANGELOG.md            # optional
├── CONTRIBUTING.md         # optional
└── docs/
    ├── PURPOSE.md
    ├── requirements.md     # summary
    ├── requirements/       # detail
    │   ├── authentication.md
    │   └── performance.md
    ├── decisions.md
    ├── decisions/
    │   ├── 0001-use-postgres.md
    │   └── 0002-choose-a-job-queue.md
    └── open-questions.md   # optional
```

### Monorepo

```text
.
├── README.md               # map of the repository
├── LICENSE                 # covers every package
├── docs/
│   ├── PURPOSE.md          # the product as a whole
│   ├── requirements.md, requirements/  # product-level requirements
│   └── decisions.md, decisions/        # the only decision sequence
├── apps/web/
│   ├── README.md           # required in every package
│   └── docs/
│       └── guides.md, guides/
└── packages/parser/
    └── README.md
```

### Summary document

```markdown
# Decisions

Decision records for the project, one per file, numbered in the order they
were opened. An open record is where its question is discussed; once
accepted it is never edited, and a changed decision supersedes it.

| Decision | Summary | Status |
|----------|---------|--------|
| [0001 Use PostgreSQL](decisions/0001-use-postgres.md) | One relational store for all services. | accepted |
| [0002 Choose a job queue](decisions/0002-choose-a-job-queue.md) | Whether background work needs a dedicated queue. | open |
```

## Declaring conformance

A project MAY declare conformance with a badge in its README:

```markdown
[![Docs: project-documentation 1.1.0](https://img.shields.io/badge/docs-project--documentation_1.1.0-blueviolet)](https://lepid-labs.github.io/spec/project-documentation/v1.1.0/)
```

## FAQ

### Where do agent instructions, task runners, and CI configuration go?

They are outside this specification, which covers the documents people read to understand a project. CI
configuration and repository settings are covered by [Project Operations](/spec/project-operations/v1.0.0/). An agent
instructions file such as `AGENTS.md` works best when it links to these documents instead of restating them.

### Why is there no CONTEXT.md?

A catch-all context file collects decisions, rules, topology, and open questions in one place, and each of those
already has a better home: a decision record can carry a status and a discussion, a requirement can carry an ID, and a
runbook can be followed step by step. A bullet in a context file can do none of that, and it becomes a second copy
that drifts.

### Does every project need every detail directory?

No. Every project has requirements; most need one or two more directories. A directory appears when its trigger
applies and not before, which is why an empty `docs/` subdirectory is prohibited.

### Why keep derivable content out?

It is always out of date. A file tree or a dependency list in a document is correct on the day it is written, and a
reader who finds one stale entry stops trusting the rest. Tooling answers those questions from the source, correctly,
every time.

### Why four required documents instead of one README?

They have different readers who want different things. A newcomer wants to run the project, an evaluator wants to know
whether it is for them, a builder wants to know what it must do, and a lawyer wants the terms. One file serving all four
serves none of them well.

### How is this specification versioned?

With [Semantic Versioning](https://semver.org). A patch release fixes wording without changing what conforms. A minor
release adds optional documents or relaxes a rule. A major release can make a conforming project non-conforming.
Published versions are never edited; each lives at its own address.

## License

This specification is licensed under [Creative Commons Attribution 4.0
International](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0). You may copy, adapt, and redistribute it,
including commercially, provided you credit Lepid Labs and link to the license.
