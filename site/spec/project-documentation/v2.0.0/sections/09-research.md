### 9. docs/research/

1. `docs/research/` holds spikes, evaluations, benchmarks, and prior-art surveys, one question per file, named
   `<topic>.md`. Research is written for whoever makes the decision it serves, and for whoever later asks why. A
   project SHOULD create the directory when an investigation produces findings worth keeping. Findings a decision
   relies on SHOULD be recorded here, not left in notes, chat threads, or review comments.
2. A research document feeds a decision. It MUST NOT make one.
3. **Shape.** The H1 is the topic, followed by `Status: <value>` on the next line and `Date: YYYY-MM-DD`, the day the
   current findings were recorded, on the line after that, then:
   - `## Question`: what the investigation set out to answer, the hypothesis it tested if it had one, the decision or
     requirement it serves, and the time or depth it was limited to;
   - `## Method`: what was read, built, or measured, under what conditions and at what versions, so that someone else
     could repeat it;
   - `## Findings`: what was found, with sources linked;
   - `## Recommendation`: what the findings suggest, such as go or no-go on an option, and a link to the decision
     record that takes it up (clause 2).

   Research redone on the same question SHOULD revise the same document rather than start a new one. Its status
   returns to `open` while the work is under way, and its method, findings, recommendation, and date are brought up to
   date before it is concluded again. A `## History` section MAY keep one line per earlier round, giving its date and
   conclusion. If the recommendation changes, the decision that relies on it is reopened (section 10.2). A different
   question is a new document.
4. Findings SHOULD give measurements as numbers with units, with the conditions they were taken under. They SHOULD
   record the options that failed or were rejected, and why, as fully as the one recommended, so that a dead end is
   not explored twice.
5. **Leave out.** A research document SHOULD NOT contain:
   - a claim about performance, reliability, or maturity with no source and no measurement that could be repeated;
   - code written to answer the question, beyond a short excerpt. That code is disposable: it is linked, marked as not
     fit for production, and rewritten before any of it is used;
   - the decision itself (clause 2).
6. **Writing.** A research document SHOULD answer its question and stop. When the time or depth limit is reached
   without an answer, it SHOULD conclude with what was learned and what is still unknown, rather than grow.
