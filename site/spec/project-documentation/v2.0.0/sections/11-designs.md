### 11. docs/design/

1. `docs/design/` holds designs and technical specifications, one change or component per file, named `<title>.md`.
   A design is written for those who build and review the change, and for those who later work on what it built. A
   project SHOULD create the directory when a change is large enough to need a design before implementation.
2. **Shape.** The H1 names the change or component being designed, followed by a paragraph on what is being built and
   the requirements or feature it serves, then:
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
3. Exported UI mockups are assets, not detail files. They MUST live in `docs/design/mockups/<name>/`, MUST NOT have a
   summary entry of their own, and MUST be linked from the design or feature document that uses them. A mockup that
   nothing links to MUST be removed.
4. **Leave out.** A design SHOULD NOT contain:
   - the requirements it serves, restated rather than cited by ID;
   - the full debate over a contested choice, which belongs in a decision record that the Alternatives link to;
   - code, schemas, or reference material the repository already holds or can generate (section 1.2).
5. **Writing.** A design SHOULD say what it leaves out as well as what it covers. It SHOULD describe each interface
   by what a consumer may rely on, not by how it is implemented.
