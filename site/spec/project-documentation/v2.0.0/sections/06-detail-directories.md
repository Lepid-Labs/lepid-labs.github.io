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
