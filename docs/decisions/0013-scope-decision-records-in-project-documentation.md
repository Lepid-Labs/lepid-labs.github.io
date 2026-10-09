# 0013 Scope decision records in Project Documentation 1.3.0

Status: accepted

## Context

Project Documentation 1.2.0 said to create a decision record when "a decision is made, or one needs making, that a
future reader will question." Almost any choice passes that test. Migrating a project to 1.2.0 with the project-docs
audit produced six records written from the code and its pull request history: the authentication mechanism, the
worker transport, where TLS ends, first-run setup, storage, and the UI library. None had research behind it, their
options were inferred from the result, and the maintainer rejected all six as not being design decisions.

Two of those topics, how users authenticate and how data is stored, are exactly the questions a decision record is
for. What made the records wrong was how they were made, not their subject: written after the fact, with no question
weighed and no research.

## Options

- Leave 1.2.0 as is and rely on audit tooling to hold back. The rule stays ambiguous for anyone reading the spec.
- Narrow decision records by topic, listing the kinds of question that qualify. Lists by topic miss cases and
  wrongly admit after-the-fact records on qualifying topics.
- Define a decision record by its role: a design question at a pivot point, opened when asked, resting on research,
  with an explicit list of what does not qualify.

## Decision

Publish Project Documentation 1.3.0 with:

1. Clause 6.4 opening with what a decision record answers: one design question whose answer shapes the architecture,
   the data model, an external contract, or the project's dependencies. A record SHOULD be opened when the question
   is asked and SHOULD rest on research linked from its Context. A project SHOULD NOT open one for an after-the-fact
   reconstruction, a choice local to one piece of code, a choice dictated by a requirement, standard, or another
   project's decision, or a convention, tool setting, or implementation detail.
2. The `docs/decisions/` trigger in clause 6.1 rewritten to match, and the knowledge table in section 1.8 naming
   design decisions.
3. The decision record's Context (clause 6.12) linking its research, and the example record doing so.
4. A sentence in the Summary and an FAQ entry, "What deserves a decision record?", with the test to apply and room for
   a late-adopting project to record a past pivot whose research survives.

The new text is SHOULD and SHOULD NOT inside existing clauses, so no section is renumbered, no project that conforms to
1.2.0 stops conforming, and the release is minor.

## Consequences

The project-docs audit can warn on a decision record that cites no research or records an implementation detail, and
must stop proposing records reconstructed from history. This site's own records predate the rule; some, such as 0011,
record tool configuration, and may be reviewed against it. Making research mandatory for every record would be a
2.0.0.
