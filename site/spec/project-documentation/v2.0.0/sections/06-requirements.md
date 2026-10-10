### 6. docs/requirements/ (required)

1. Every project MUST have a `docs/requirements/` directory holding at least one area file, with its summary document
   `docs/requirements.md` (section 14). Requirements are read by everyone who builds, tests, or accepts the project,
   including readers who are not engineers.
2. Requirements MUST cover what the project must do or guarantee: functional and non-functional requirements,
   business rules and thresholds, constraints, and acceptance criteria. A measure of success, such as a response-time
   target or an adoption goal, is a requirement with a threshold.
3. Each area file MUST be named `<area>.md` and hold one area, such as `authentication.md` or `performance.md`.
4. Each requirement MUST carry a stable identifier (section 15).
5. **Shape.** The H1 is `# <Area> requirements`, followed by one sentence on what the area covers, then one H2 per
   requirement (section 15.3). Each requirement:
   - states one obligation that can be checked, with any threshold given as a number and a unit;
   - lists its acceptance criteria where one sentence cannot carry them;
   - links the decision that set it, where one did.

   A retired requirement SHOULD stay in its file with status `retired` and a line naming its replacement, if any, so
   that its ID still resolves.
6. **Leave out.** A requirement SHOULD NOT contain:
   - how it is met, such as a schema, a framework, an algorithm, or code. A choice imposed on the project from outside,
     such as a platform it must run on, is a constraint and stays;
   - layout and visual design, which belong in a feature and its mockups (section 11.3);
   - a goal with no measure, such as "fast" or "easy to use". Until a threshold is agreed, the goal is an open question
     (section 16.3);
   - why the project exists, which is in `docs/PURPOSE.md`.
7. **Writing.** A requirement SHOULD state what must be true, not how it is achieved: "an export of 10,000 rows
   completes within 5 seconds", not "exports use a streaming writer". It SHOULD use the key words MUST, SHOULD, and
   MAY as this specification does, each with one meaning throughout the project. Acceptance criteria MAY be written as
   scenarios, one per criterion: *given* a context, *when* an action occurs, *then* an outcome.
