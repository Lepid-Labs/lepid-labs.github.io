### 10. docs/decisions/

1. `docs/decisions/` holds decision records, one design question per file, named `NNNN-<title>.md` (section 18.3). A
   record is written for those discussing the question while it is open, and for the maintainer who arrives later
   with none of that discussion in mind. A project SHOULD create the directory when a design question with real
   alternatives needs answering, such as how data is stored or how users authenticate (clause 2).
2. A decision record answers one design question at a pivot point: one whose answer shapes the architecture, the data
   model, an external contract, or what the project depends on, so that a different answer would make a materially
   different project. "How is user data stored?" and "How do users authenticate?" are such questions. A decision
   record SHOULD be opened when the question is asked, before or while the choice is made, and SHOULD rest on research
   that weighed the options (section 9), linked from its Context. A project SHOULD NOT open a decision record for:
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
3. **Shape.** The H1 is `# NNNN <Title>`, the title naming the choice or the question it settles, followed by
   `Status: <value>` on the next line, then:
   - `## Context`: the question, the forces that make it one, and a link to the research it relies on (clause 2);
   - `## Options`: the alternatives weighed, including keeping things as they are wherever that was possible, with
     what favours and what counts against each. This section MAY be left out when only one option was seriously
     considered;
   - `## Decision`: the choice, stated so that it can be followed, or, while the record is open, a statement that no
     choice is made yet;
   - `## Consequences`: what follows, good and bad: the work it creates, what it rules out, and what it makes harder.

   A `## History` section MAY keep one line per earlier decision, giving its date and what it decided. A record that
   takes over another's question SHOULD link to it from its Context.
4. **Leave out.** A decision record SHOULD NOT contain:
   - the design that follows from the decision, such as schemas, interfaces, and code, which belongs in a design
     (section 11) that the record links to;
   - reasons supplied after the fact. A revision states the evidence that changed the decision; it does not recast the
     earlier choice as if it had always been the current one, and the History keeps what was decided before.
5. **Writing.** The Context SHOULD be written for a reader who joins the project years later and knows nothing of the
   discussion. Options SHOULD each be stated at their strongest before the Decision says which was chosen. The
   Consequences SHOULD name what the decision costs as plainly as what it gains: every choice trades one quality for
   another, and a record that admits the trade is less likely to be reopened by the next person to notice it.
