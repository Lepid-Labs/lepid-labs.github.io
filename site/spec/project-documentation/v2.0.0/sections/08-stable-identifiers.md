### 8. Stable identifiers

1. Requirements MUST carry IDs of the form `RQ-nnn`, and use cases `UC-nnn`: three digits, zero-padded, one sequence of
   each per project. A monorepo keeps a single sequence of each at the root.
2. An ID MUST NOT be changed or reused.
3. A requirement is an H2 in its area file, `## RQ-014 <title>`, with its status on the next line. A use case's H1 is
   `# UC-007 <actor goal>`.
4. Summaries, features, and other cross-references SHOULD cite the ID, so a renamed file or heading does not break the
   reference.
