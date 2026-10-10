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
when it has a file to hold, is indexed by a summary document beside it, and holds files of a recommended shape. Each
kind has a section of its own saying what its files hold, what they leave out, and how to write them. Decision
records are kept for the questions that shape the design, answered with research, not for every choice in the code.

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
