## FAQ

### Where do agent instructions, task runners, and CI configuration go?

They are outside this specification, which covers the documents people read to understand a project. CI
configuration and repository settings are covered by [Project Operations](/spec/project-operations/). An agent
instructions file such as `AGENTS.md` works best when it links to these documents, `CONTRIBUTING.md` above all,
instead of restating them.

### Why is there no CONTEXT.md?

A catch-all context file collects decisions, rules, topology, and open questions in one place, and each of those
already has a better home: a decision record can carry a status and a discussion, a requirement can carry an ID, and a
runbook can be followed step by step. A bullet in a context file can do none of that, and it becomes a second copy
that drifts.

### What deserves a decision record?

A question whose answer changes the shape of the project. Ask: had it been answered the other way, would the
architecture, the data model, an external contract, or the project's dependencies be different? If only the code
inside one module would differ, the reasoning belongs in a comment in that module. If the answer was dictated by a
requirement, a standard, or another project's decision, link that instead.

A record opened when the question is asked, backed by research, shows the options as they were weighed. One written
afterwards from commits shows what was built and guesses at the rest, and a directory full of them buries the few
records that matter. A project adopting this specification late can still record a past pivot when the research or
discussion of the time survives to support it.

### Does every project need every detail directory?

No. Every project has requirements; most need one or two more directories. A directory appears when its trigger
applies and not before, which is why an empty `docs/` subdirectory is prohibited.

### Why are detail-file shapes recommendations rather than rules?

Some files have good reason to differ. The shapes are what a reader can expect by default: every decision record puts
its choice under the same heading, and every runbook says how to tell that it worked. An audit can report a departure
as a warning rather than a failure.

### Why keep derivable content out?

It is always out of date. A file tree or a dependency list in a document is correct on the day it is written, and a
reader who finds one stale entry stops trusting the rest. Tooling answers those questions from the source, correctly,
every time.

### Why four required documents instead of one README?

They have different readers who want different things. A newcomer wants to run the project, an evaluator wants to know
whether it is for them, a builder wants to know what it must do, and a lawyer wants the terms. One file serving all four
serves none of them well.

### How is this specification versioned?

With [Semantic Versioning](https://semver.org). A patch release fixes wording without changing what conforms. A minor
release adds optional documents or recommendations, or relaxes a rule. A major release can make a conforming project
non-conforming. Published versions are never edited; each lives at its own address. A version still being written is
marked as a draft and may change until it is published.
