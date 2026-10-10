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
