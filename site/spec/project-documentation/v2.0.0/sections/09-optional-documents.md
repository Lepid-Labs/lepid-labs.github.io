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
