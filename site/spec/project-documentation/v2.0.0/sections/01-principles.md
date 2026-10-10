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
