### 5. Detail directories

1. Each detail directory holds one kind of document, described in its own section: what its files hold and for whom,
   when the directory is created, how its files are named, the shape they take, what they leave out, and how to write
   them.

| Directory | Holds | Section |
|-----------|-------|---------|
| `docs/requirements/` | Functional and non-functional requirements, business rules, constraints, acceptance criteria | 6 |
| `docs/features/` | One user-facing feature per file: behaviour, scope, acceptance criteria | 7 |
| `docs/use-cases/` | Actor–goal interactions, step by step | 8 |
| `docs/research/` | Spikes, evaluations, benchmarks, and prior-art surveys, with findings and recommendations | 9 |
| `docs/decisions/` | Decision records for design questions, open or settled | 10 |
| `docs/design/` | Designs and technical specifications, including interfaces and external contracts | 11 |
| `docs/runbooks/` | Deployment topology and operational procedures | 12 |
| `docs/guides/` | How to use, configure, or extend the product | 13 |

2. A project SHOULD create a detail directory when the trigger in its section applies, and MUST NOT create one before
   it has a file to hold.
3. A detail file MUST link to the files it derives from or satisfies. Research informs decisions; requirements and use
   cases define what a feature must do; a design says how it is built; runbooks say how it is operated; guides say how
   to use what was built.
4. Each detail file SHOULD follow the shape for its kind. A file MAY leave out a listed section that does not apply to
   it, and MAY add sections of its own after the listed ones. A short file MAY cover its sections in order as plain
   paragraphs, without headings.
5. Each detail file SHOULD hold only what its kind is for. What a kind's section says to leave out has a home in
   another document, which the file links to instead (section 1.3).
