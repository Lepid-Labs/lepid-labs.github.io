# 0010 Layer the project specifications

Status: accepted

## Context

Project Documentation 1.0.0 mixed two concerns: which documents a project carries, and how the README classifies the
project with badges. A third set of conventions, how a repository is configured and checked on GitHub, had no published
home at all. Folding it into the same spec would tie a documentation convention to one hosting platform.

## Decision

Publish three specifications, each building on the one before and naming the version it builds on:

1. **Project Documentation 1.1.0**: the documents. The badge rules are removed and the README description may be one
   or two sentences. Both only relax rules, so this is a minor release. Section 6 stays as a pointer to Project
   Details so that section numbers cited elsewhere do not shift.
2. **Project Details 1.0.0**: the README opening. The details line holds the type badge, then the status badge, then
   a version badge for projects with versioned releases, and nothing else. The description follows, then any other
   badges. `archived` becomes a status, because the old separate archived badge would break the details-line rule.
3. **Project Operations 1.0.0**: GitHub repository settings, security, code owners, the branch ruleset, CI, PR titles,
   releases by type, and labels. It builds on Project Details because the repository type decides the release shape.

Conformance to a spec implies conformance to its bases, so a project declares only the highest one.

## Consequences

A new version of a base spec does not move its dependents. They keep naming the old base until they get a version of
their own, as the [publishing runbook](../runbooks/publish-spec-version.md) says. Tooling that cited Project
Documentation section 6 for badges now needs to cite Project Details.
