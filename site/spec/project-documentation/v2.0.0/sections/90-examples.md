## Examples

### Single project

```text
.
├── README.md
├── LICENSE
├── CHANGELOG.md            # optional
├── CONTRIBUTING.md         # optional
└── docs/
    ├── PURPOSE.md
    ├── requirements.md     # summary
    ├── requirements/       # detail
    │   ├── authentication.md
    │   └── performance.md
    ├── decisions.md
    ├── decisions/
    │   ├── 0001-use-postgres.md
    │   └── 0002-choose-a-job-queue.md
    └── open-questions.md   # optional
```

### Monorepo

```text
.
├── README.md               # map of the repository
├── LICENSE                 # covers every package
├── CONTRIBUTING.md         # one for the whole repository
├── docs/
│   ├── PURPOSE.md          # the product as a whole
│   ├── requirements.md, requirements/  # product-level requirements
│   └── decisions.md, decisions/        # the only decision sequence
├── apps/web/
│   ├── README.md           # required in every package
│   └── docs/
│       └── guides.md, guides/
└── packages/parser/
    └── README.md
```

### Summary document

```markdown
# Decisions

Decision records for the project, one per file, numbered in the order they
were opened. A record is where its question is discussed, and it is
reopened and revised in place when new evidence changes the decision.

| Decision | Summary | Status |
|----------|---------|--------|
| [0001 Use PostgreSQL](decisions/0001-use-postgres.md) | One relational store for all services. | accepted |
| [0002 Choose a job queue](decisions/0002-choose-a-job-queue.md) | Whether background work needs a dedicated queue. | proposed |
```

### Detail file

```markdown
# 0002 Choose a job queue

Status: proposed

## Context

Report generation runs inside web requests and times out for large
accounts. Moving it to the background needs somewhere to queue the work.
[Job queue options](../research/job-queues.md) compares the candidates.

## Options

- A table in PostgreSQL, polled by a worker: no new service, but retries
  are ours to build.
- A dedicated broker: retries and scheduling built in, at the cost of
  another service to deploy and monitor.

## Decision

Queue work in a PostgreSQL table until one worker can no longer clear
the queue within a minute.

## Consequences

No new service to run. Retry handling is ours to write and test, and
RQ-021 gains a queue-depth alert.
```
