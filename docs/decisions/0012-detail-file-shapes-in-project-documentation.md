# 0012 Recommend detail-file shapes in Project Documentation 1.2.0

Status: accepted

## Context

Project Documentation 1.1.0 described each kind of detail file in one table row, so two projects could follow it and
still lay out their decision records, runbooks, and guides differently. `CONTRIBUTING.md` had a trigger but no
contents. 1.1.0 also froze accepted decisions, so new evidence meant a second record largely repeating the first, and
two records on one question drift apart. Its section 6 held no rules, only a pointer to Project Details.

## Decision

Publish Project Documentation 1.2.0 with:

1. A shape for each kind of detail file (clauses 6.7 to 6.15): its H1, what follows the H1, and its H2 sections in
   order.
2. Contents for `CONTRIBUTING.md` in clause 9.2, a row for it in the knowledge table (clause 1.7), and one
   `CONTRIBUTING.md` per monorepo (clause 10.10).
3. Decision records and research documents revised in place when new evidence arrives (clauses 6.4 and 6.11), with
   an optional `## History` section of one line per earlier version. `superseded by NNNN` remains for a question
   folded into another record.
4. A rewritten opening paragraph and Summary.
5. No pointer section for Project Details, so 1.1.0 sections 7 to 13 are 6 to 12.

The new rules are SHOULDs, and clause 6.4 is relaxed from a MUST NOT, so no project that conforms to 1.1.0 stops
conforming, and the release is minor. Renumbering changes no rule.

## Consequences

No other spec needs a new version, since none depends on a version of this one
([0010](0010-publish-project-specifications-independently.md)). Tooling that cites the spec by section number, such as
the project-docs audit, needs its citations shifted when it moves to 1.2.0. An audit can report a departure from a
shape as a warning, not a failure. Making shapes binding would be a 2.0.0.
