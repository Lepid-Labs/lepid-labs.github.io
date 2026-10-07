# 0012 Recommend detail-file shapes in Project Documentation 1.2.0

Status: accepted

## Context

Project Documentation 1.1.0 described each kind of detail file in one table row, so two projects could follow it and
still lay out their decision records, runbooks, and guides differently. `CONTRIBUTING.md` had a trigger but no
contents. 1.1.0 also froze accepted decisions, so new evidence meant a second record largely repeating the first, and
two records on one question drift apart. Tooling, such as the project-docs audit, cites the spec by section and clause
number, so renumbering has a cost.

## Decision

Publish Project Documentation 1.2.0 with:

1. A shape for each kind of detail file (clauses 7.7 to 7.15): its H1, what follows the H1, and its H2 sections in
   order.
2. Contents for `CONTRIBUTING.md` in clause 10.2, a row for it in the knowledge table (clause 1.7), and one
   `CONTRIBUTING.md` per monorepo (clause 11.10).
3. Decision records and research documents revised in place when new evidence arrives (clauses 7.4 and 7.11), with
   an optional `## History` section of one line per earlier version. `superseded by NNNN` remains for a question
   folded into another record.
4. A rewritten opening paragraph and Summary.

The new rules are SHOULDs, and clause 7.4 is relaxed from a MUST NOT, so no project that conforms to 1.1.0 stops
conforming, and the release is minor. New clauses are appended, so every 1.1.0 section and clause number keeps its
meaning.

## Consequences

No other spec needs a new version, since none depends on a version of this one
([0010](0010-publish-project-specifications-independently.md)). An audit can report a departure from a shape as a
warning, not a failure. Making shapes binding would be a 2.0.0.
