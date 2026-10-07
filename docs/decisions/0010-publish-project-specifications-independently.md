# 0010 Publish the project specifications independently

Status: accepted

## Context

Project Documentation 1.0.0 mixed two concerns: which documents a project carries, and how the README classifies the
project with badges. A third set of conventions, how a repository is configured and checked on GitHub, had no published
home at all. Folding it into the same spec would tie a documentation convention to one hosting platform.

Pinning each spec to an exact version of another made every release a question for the others: when Project
Documentation 1.2.0 relaxed a rule, a project following it could no longer claim Project Details or Project Operations
until each published a version on the new base. The three are related, but none needs another's rules to make sense.

## Decision

Publish three independent specifications:

1. **Project Documentation**: the documents. 1.1.0 removed the badge rules and lets the README description be one or
   two sentences. Section 6 stays as a pointer to Project Details so that section numbers cited elsewhere do not
   shift.
2. **Project Details**: the README opening. The details line holds the type badge, then the status badge, then a
   version badge for libraries and native apps with versioned releases, then optionally a license badge, and nothing
   else. The description follows, then any other badges. `archived` is a status, because a separate archived badge
   would break the details-line rule. A private project's version badge is static and rewritten by the release
   commit, since badge services cannot read private sources.
3. **Project Operations**: GitHub repository settings, security, code owners, the branch ruleset, CI, PR titles,
   releases by type, and labels.

Each spec links the others by their unversioned address, which redirects to the latest version. A project conforms
to each spec on its own and declares a badge for each one it follows. Project Documentation 1.2.0, Project Details
1.1.0, and Project Operations 1.1.0 are the first versions published this way.

## Consequences

A new version of one spec never forces a version of another. A cross-reference by section number, such as Project
Operations citing Project Details section 5.4, can go stale when the other spec renumbers, so publishing a version means
checking what the others cite ([runbook](../runbooks/publish-spec-version.md)). Tooling that cited Project
Documentation section 6 for badges now cites Project Details.

## History

- 2026-09-29: Layered the three specs, each naming the exact version of the one before; conformance to a spec implied
  conformance to the specs beneath it, and a project declared only the highest.
