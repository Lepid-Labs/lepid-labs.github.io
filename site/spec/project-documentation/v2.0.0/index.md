# Project Documentation 2.0.0 (draft)

The Project Documentation specification defines the documents a software project carries, what each one holds, and
where it lives, so that users, contributors, and agents each know where to look and what they will find there.

> **Draft.** This version is still being written and may change before it is published. The latest published
> version is at [/spec/project-documentation/](/spec/project-documentation/).

## Summary

Every project carries four required documents, each written for a different reader:

- `README.md` is for someone who has never seen the project.
- `docs/PURPOSE.md` is for someone deciding whether the project is useful to them.
- `docs/requirements/` is for someone building the project or checking what it must do.
- `LICENSE` is for someone concerned with whether and how they may use it.

Two more root documents appear when the project needs them: `CHANGELOG.md` for someone tracking what changed between
releases, and `CONTRIBUTING.md` for someone about to change the project. Everything else lives in detail directories
under `docs/`: features, use cases, research, decisions, designs, runbooks, and guides. Each directory is created only
when it has a file to hold, is indexed by a summary document beside it, and holds files of a recommended shape.
Decision records are kept for the questions that shape the design, answered with research, not for every choice in
the code.

One rule holds it together: documents record what the code cannot. Anything a reader or a tool can derive from the
source stays out.

The key words "MUST", "MUST NOT", "SHOULD", "SHOULD NOT", and "MAY" in this document are to be interpreted as described
in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

The convention pairs with [Conventional Commits](https://www.conventionalcommits.org/) for change history,
[Project Details](/spec/project-details/) for more opinionated docs conventions, and
[Project Operations](/spec/project-operations/) for GitHub repository configuration.

## Terminology

- **Project**: a repository and everything it delivers.
- **Monorepo**: a project delivered as several packages (applications, libraries, services) from one repository.
- **Package**: one deliverable unit inside a monorepo.
- **Detail directory**: a directory under `docs/` that holds one kind of document, such as `docs/decisions/`.
- **Detail file**: one document inside a detail directory.
- **Shape**: the recommended outline of a detail file: its H1, what follows the H1, and its H2 sections in order.
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
5. Versioning provides history. Duplication breeds confusion.
6. A document SHOULD stay under about 200 lines. A longer one SHOULD be split or cleared of derivable content.
7. The required documents serve different readers and MUST NOT be merged.
8. Each kind of knowledge MUST be recorded in its home:

| Knowledge | Home |
|-----------|------|
| Why the project exists, and for whom | `docs/PURPOSE.md` |
| How to install and run it, and what each environment variable means | `README.md` |
| How to develop it and submit a change | `CONTRIBUTING.md`, or a section of the README (section 9) |
| What it must do, including business rules and thresholds | `docs/requirements/` |
| Design decisions, made or still open | `docs/decisions/` |
| External contracts, interfaces, data models | `docs/design/` |
| Deployment topology and operations | `docs/runbooks/` |
| Why a piece of code is the way it is | A comment in that code |

9. A project SHOULD NOT have a catch-all context document such as `CONTEXT.md`. Everything it would hold has a home
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
   `docs/requirements.md` (section 7).
2. Requirements MUST cover what the project must do or guarantee: functional and non-functional requirements,
   business rules and thresholds, constraints, and acceptance criteria.
3. Each area file MUST be named `<area>.md` and hold one area, such as `authentication.md` or `performance.md`.
4. Each requirement MUST carry a stable identifier (section 8).

### 6. Detail directories

1. A project SHOULD create each detail directory when its trigger applies, and MUST NOT create one before it has a file
   to hold.

| Directory | Holds | Create when | File naming |
|-----------|-------|-------------|-------------|
| `docs/requirements/` | Functional and non-functional requirements, business rules, constraints, acceptance criteria | Always (section 5) | `<area>.md`, one area per file |
| `docs/features/` | One user-facing feature per file: behaviour, scope, out of scope, the requirements and use cases it satisfies | Feature behaviour must be agreed before or after building | `<feature>.md` |
| `docs/use-cases/` | Actor–goal interactions: preconditions, primary flow, alternate flows, postconditions | User interactions need to be spelled out step by step | `<actor-goal>.md` |
| `docs/research/` | Spikes, evaluations, benchmarks, prior-art surveys, with findings and recommendations | An investigation produces findings worth keeping | `<topic>.md`, dated in the first lines |
| `docs/decisions/` | Decision records, open or settled: context, options, decision, consequences, status | A design question with real alternatives needs answering, such as how data is stored or how users authenticate (clause 4) | `NNNN-<title>.md` |
| `docs/design/` | Designs and technical specifications: approach, alternatives, data model, interfaces, external contracts | A change is large enough to need a design before implementation | `<title>.md` |
| `docs/runbooks/` | Deployment topology and operational procedures: deploy, rollback, incident response, maintenance | The project is deployed anywhere | `<procedure>.md` |
| `docs/guides/` | How to use, configure, or extend the product, one topic per file | Users need more than the README | `<topic>.md` |

2. A detail file MUST link to the files it derives from or satisfies. Research informs decisions; requirements and use
   cases define what a feature must do; a design says how it is built; runbooks say how it is operated; guides say how
   to use what was built.
3. A research document feeds a decision. It MUST NOT make one.
4. A decision record answers one design question at a pivot point: one whose answer shapes the architecture, the data
   model, an external contract, or what the project depends on, so that a different answer would make a materially
   different project. "How is user data stored?" and "How do users authenticate?" are such questions. A decision
   record SHOULD be opened when the question is asked, before or while the choice is made, and SHOULD rest on research
   that weighed the options (clause 3), linked from its Context. A project SHOULD NOT open a decision record for:
   - a choice reconstructed after the fact from the code or its history, whose options can no longer be stated as
     they were weighed;
   - a choice local to one piece of code, whose reasoning belongs in a comment there (section 1.8);
   - a choice that follows from a requirement, from a standard the project adopts, or from another project's
     decision, which is linked where it applies instead;
   - a convention, a tool setting, or an implementation detail that could change without changing the design.

   A decision record is the place to discuss a question, both before it is settled and whenever new evidence reopens
   it. A changed decision SHOULD be revised in its own record rather than replaced by a new one: its status returns to
   `open` or `proposed` while it is reconsidered, and its sections are rewritten to the decision now in force. A
   record MAY be marked `superseded by NNNN` when its question is folded into another record.
5. A guide MUST describe the product as built. It MUST NOT restate a feature or design document.
6. Exported UI mockups are assets, not detail files. They MUST live in `docs/design/mockups/<name>/`, MUST NOT have a
   summary entry of their own, and MUST be linked from the design or feature document that uses them. A mockup that
   nothing links to MUST be removed.
7. Each detail file SHOULD follow the shape for its kind in clauses 8 to 15. A file MAY leave out a listed section that
   does not apply to it, and MAY add sections of its own after the listed ones. A short file MAY cover its sections in
   order as plain paragraphs, without headings.
8. **Requirement area file**, `docs/requirements/<area>.md`. The H1 is `# <Area> requirements`, followed by one
   sentence on what the area covers, then one H2 per requirement (section 8.3). Each requirement:
   - states one obligation that can be checked, with any threshold given as a number and a unit;
   - lists its acceptance criteria where one sentence cannot carry them;
   - links the decision that set it, where one did.

   A retired requirement SHOULD stay in its file with status `retired` and a line naming its replacement, if any, so
   that its ID still resolves.
9. **Feature**, `docs/features/<feature>.md`. The H1 is the feature's name, followed by a paragraph on what it lets a
   user do and for whom, then:
   - `## Behaviour`: what the user sees and does, including limits and error states;
   - `## Scope`: what the feature includes;
   - `## Out of scope`: what it deliberately leaves out, linking the decision where one excluded it;
   - `## Satisfies`: the IDs of the requirements and use cases it satisfies (section 8.4).

   A feature SHOULD link the design that builds it and any mockups it uses.
10. **Use case**, `docs/use-cases/<actor-goal>.md`. The H1 is `# UC-nnn <actor goal>` (section 8.3), followed by a
    sentence naming the primary actor, their goal, and what starts the interaction, then:
    - `## Preconditions`: what is true before it starts;
    - `## Primary flow`: numbered steps of the path where nothing goes wrong, each one action by the actor or the
      system, described by intent rather than by interface ("submits the order", not "clicks Submit");
    - `## Alternate flows`: each branch labelled with the step it leaves from, such as `3a`, and ending where it
      rejoins the primary flow or ends the use case;
    - `## Postconditions`: what is true after success, and what still holds after a failure.
11. **Research document**, `docs/research/<topic>.md`. The H1 is the topic, followed by `Status: <value>` on the next
    line and `Date: YYYY-MM-DD`, the day the current findings were recorded, on the line after that, then:
    - `## Question`: what the investigation set out to answer, and the decision or requirement it serves;
    - `## Method`: what was read, built, or measured, under what conditions and at what versions, so that someone else
      could repeat it;
    - `## Findings`: what was found, with sources linked;
    - `## Recommendation`: what the findings suggest, and a link to the decision record that takes it up (clause 3).

    Research redone on the same question SHOULD revise the same document rather than start a new one. Its status
    returns to `open` while the work is under way, and its method, findings, recommendation, and date are brought up to
    date before it is concluded again. A `## History` section MAY keep one line per earlier round, giving its date
    and conclusion. If the recommendation changes, the decision that relies on it is reopened (clause 4). A different
    question is a new document.
12. **Decision record**, `docs/decisions/NNNN-<title>.md`. The H1 is `# NNNN <Title>`, the title naming the choice or
    the question it settles, followed by `Status: <value>` on the next line, then:
    - `## Context`: the question, the forces that make it one, and a link to the research it relies on (clause 4);
    - `## Options`: the alternatives weighed, with what favours and what counts against each, which MAY be left out
      when only one option was seriously considered;
    - `## Decision`: the choice, stated so that it can be followed, or, while the record is open, a statement that no
      choice is made yet;
    - `## Consequences`: what follows, good and bad: the work it creates, what it rules out, and what it makes harder.

    A `## History` section MAY keep one line per earlier decision, giving its date and what it decided. A record that
    takes over another's question SHOULD link to it from its Context.
13. **Design**, `docs/design/<title>.md`. The H1 names the change or component being designed, followed by a paragraph
    on what is being built and the requirements or feature it serves, then:
    - `## Approach`: how it works: the parts, what each is responsible for, and how they interact;
    - `## Alternatives`: approaches not taken, and why, with a link to the decision record for any choice a future
      reader will question;
    - `## Interfaces`: the interfaces, data models, and external contracts the design defines or changes: what each
      field or operation means and what a consumer may rely on. Where code or a schema file defines the contract, the
      design links to it rather than copying it (section 1.2);
    - `## Risks`: what could go wrong, and the questions still open, each linked to its decision record once it has
      one.

    A design SHOULD be kept true to what was built. When the implementation departs from it, the design SHOULD be
    updated in the same change.
14. **Runbook**, `docs/runbooks/<procedure>.md`. The H1 names the procedure in the imperative, such as
    `# Roll back a release`, followed by a sentence on when to run it and what it achieves, then:
    - `## Prerequisites`: the access, tools, and approvals needed before the first step, naming secrets and roles but
      never their values (section 11.5);
    - `## Steps`: numbered, one action each, with the exact command and what the reader sees when it worked;
    - `## Verify`: how to confirm that the whole procedure succeeded;
    - `## Recovery`: what to do when a step fails, or a link to the runbook that undoes it.

    Deployment topology, meaning the environments, where each runs, and what each depends on, SHOULD be described in
    one runbook and linked from the others.
15. **Guide**, `docs/guides/<topic>.md`. The H1 names the task or topic as a user would, such as
    `# Configure single sign-on`, followed by a paragraph on who the guide is for and what they can do once they have
    followed it, then:
    - `## Prerequisites`: anything needed beyond the README's prerequisites;
    - the task itself, in sections of the guide's own, as numbered steps or explanation as the topic needs, with
      examples that work against the current release.

    A guide SHOULD be updated in the same change that alters the behaviour it describes.

### 7. Summary documents

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

### 8. Stable identifiers

1. Requirements MUST carry IDs of the form `RQ-nnn`, and use cases `UC-nnn`: three digits, zero-padded, one sequence of
   each per project. A monorepo keeps a single sequence of each at the root.
2. An ID MUST NOT be changed or reused.
3. A requirement is an H2 in its area file, `## RQ-014 <title>`, with its status on the next line. A use case's H1 is
   `# UC-007 <actor goal>`.
4. Summaries, features, and other cross-references SHOULD cite the ID, so a renamed file or heading does not break the
   reference.

### 9. Optional documents

1. `CHANGELOG.md` SHOULD exist when the project publishes versioned releases. Otherwise the repository's change history
   serves.
2. `CONTRIBUTING.md` SHOULD exist when the project accepts outside contributions. Otherwise a Contributing section in
   the README is enough. It is written for someone about to change the project, whether a person or an agent. Its H1
   SHOULD be `# Contributing`, followed by a paragraph on which contributions the project welcomes and which it does
   not, then:
   - `## Development setup`: what a contributor needs beyond the README's prerequisites and install commands, which
     it links to rather than restates;
   - `## Checks`: the commands that lint, type-check, and test the project, the same ones CI runs, and which of them
     must pass before a change is submitted;
   - `## Making a change`: how to branch, the convention for commit messages or pull request titles, and what a change
     must include, such as tests and updates to the documents it affects (sections 6 and 7) in the same change;
   - `## Reporting issues`: where to report bugs and request features, and the private channel for security issues;
   - `## License`: the terms contributions are accepted under, and any sign-off or agreement they need.
3. `docs/open-questions.md` MAY exist beside `docs/decisions.md`, listing questions not yet worth a decision record, one
   line each. When a question gets a decision record, its line MUST be removed.

### 10. Monorepos

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
10. A monorepo SHOULD have one `CONTRIBUTING.md`, at the root, unless a package is independently published and takes
    contributions of its own. Package-specific commands stay in the package README (clause 6).

### 11. Formatting

1. Every document MUST be Markdown, open with a single H1 that states its purpose, and use only H2 and H3 below it.
2. Root documents MUST be named in upper case (`README.md`, `LICENSE`, `CHANGELOG.md`). Files under `docs/` MUST be
   kebab-case, except `PURPOSE.md`.
3. Decision records MUST be named `NNNN-<title>.md`: four digits, zero-padded, starting at `0001`.
4. Links between documents in the same repository MUST be relative paths.
5. Documents MUST NOT contain credentials, internal hostnames or URLs, or personal information. Write every document as
   if the repository were public.

### 12. Prohibited

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
├── CONTRIBUTING.md         # one for the whole repository
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
were opened. A record is where its question is discussed, and it is
reopened and revised in place when new evidence changes the decision.

| Decision | Summary | Status |
|----------|---------|--------|
| [0001 Use PostgreSQL](decisions/0001-use-postgres.md) | One relational store for all services. | accepted |
| [0002 Choose a job queue](decisions/0002-choose-a-job-queue.md) | Whether background work needs a dedicated queue. | proposed |
```

### Detail file

```markdown
# 0002 Choose a job queue

Status: proposed

## Context

Report generation runs inside web requests and times out for large
accounts. Moving it to the background needs somewhere to queue the work.
[Job queue options](../research/job-queues.md) compares the candidates.

## Options

- A table in PostgreSQL, polled by a worker: no new service, but retries
  are ours to build.
- A dedicated broker: retries and scheduling built in, at the cost of
  another service to deploy and monitor.

## Decision

Queue work in a PostgreSQL table until one worker can no longer clear
the queue within a minute.

## Consequences

No new service to run. Retry handling is ours to write and test, and
RQ-021 gains a queue-depth alert.
```

## Declaring conformance

A project MAY declare conformance with a badge in its README:

```markdown
[![Docs: project-documentation 2.0.0](https://img.shields.io/badge/docs-project--documentation_2.0.0-blueviolet)](https://lepid-labs.github.io/spec/project-documentation/v2.0.0/)
```

## FAQ

### Where do agent instructions, task runners, and CI configuration go?

They are outside this specification, which covers the documents people read to understand a project. CI
configuration and repository settings are covered by [Project Operations](/spec/project-operations/). An agent
instructions file such as `AGENTS.md` works best when it links to these documents, `CONTRIBUTING.md` above all,
instead of restating them.

### Why is there no CONTEXT.md?

A catch-all context file collects decisions, rules, topology, and open questions in one place, and each of those
already has a better home: a decision record can carry a status and a discussion, a requirement can carry an ID, and a
runbook can be followed step by step. A bullet in a context file can do none of that, and it becomes a second copy
that drifts.

### What deserves a decision record?

A question whose answer changes the shape of the project. Ask: had it been answered the other way, would the
architecture, the data model, an external contract, or the project's dependencies be different? If only the code
inside one module would differ, the reasoning belongs in a comment in that module. If the answer was dictated by a
requirement, a standard, or another project's decision, link that instead.

A record opened when the question is asked, backed by research, shows the options as they were weighed. One written
afterwards from commits shows what was built and guesses at the rest, and a directory full of them buries the few
records that matter. A project adopting this specification late can still record a past pivot when the research or
discussion of the time survives to support it.

### Does every project need every detail directory?

No. Every project has requirements; most need one or two more directories. A directory appears when its trigger
applies and not before, which is why an empty `docs/` subdirectory is prohibited.

### Why are detail-file shapes recommendations rather than rules?

Some files have good reason to differ. The shapes are what a reader can expect by default: every decision record puts
its choice under the same heading, and every runbook says how to tell that it worked. An audit can report a departure
as a warning rather than a failure.

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
release adds optional documents or recommendations, or relaxes a rule. A major release can make a conforming project
non-conforming. Published versions are never edited; each lives at its own address. A version still being written is
marked as a draft and may change until it is published.

## License

This specification is licensed under [Creative Commons Attribution 4.0
International](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0). You may copy, adapt, and redistribute it,
including commercially, provided you credit Lepid Labs and link to the license.
