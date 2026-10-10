### 7. docs/features/

1. `docs/features/` holds one user-facing feature per file, named `<feature>.md`. A feature is written for the people
   who build, test, and accept it, so that its behaviour is agreed rather than left to whoever implements it. A project
   SHOULD create the directory when feature behaviour must be agreed, before or after it is built.
2. **Shape.** The H1 is the feature's name, followed by a paragraph on what it lets a user do and for whom, then:
   - `## Behaviour`: what the user sees and does, path by path (clause 3);
   - `## Scope`: what the feature includes;
   - `## Out of scope`: what it deliberately leaves out, linking the decision where one excluded it;
   - `## Acceptance criteria`: the scenarios that must pass for the feature to be complete (clause 4);
   - `## Satisfies`: the IDs of the requirements and use cases it satisfies (section 15.4).

   A feature SHOULD link the design that builds it and any mockups it uses.
3. Behaviour SHOULD cover the main path, the alternative paths, and every failure the user can meet, such as invalid
   input, a missing permission, a lost connection, or a limit reached. For each, it SHOULD say what the user sees and
   what state the feature is left in. The rules a user meets when entering data, such as which fields are required,
   the longest value accepted, and the formats allowed, belong here. The data contract behind them belongs in the
   design.
4. Each acceptance criterion SHOULD be one scenario that a tester can run: *given* a context, *when* an action occurs,
   *then* an outcome. A criterion that checks a requirement SHOULD cite the requirement's ID rather than restate it.
5. **Leave out.** A feature SHOULD NOT contain:
   - the case for building it, which is in `docs/PURPOSE.md` and the requirements it satisfies;
   - data models, interfaces, and external contracts, which are in its design (section 11);
   - exact layout and visual design, which are in its mockups (section 11.3).
6. **Writing.** A feature SHOULD leave no behaviour to the implementer's judgement: every change of state and every
   response the user sees is described. An edge case settled in the document costs far less than one found in
   production.
