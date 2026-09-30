# Project Details 1.0.0

The Project Details specification standardizes the top of a project's README: what kind of project it is, how mature
it is, and which version is current, in the same place and the same form in every repository.

## Summary

Project Details builds on [Project Documentation 1.1.0](/spec/project-documentation/v1.1.0/). A project conforms to
Project Details only if it also conforms to Project Documentation.

Every README opens the same way:

1. The project name as the H1.
2. The **details line**: a type badge, a status badge, and, for a project that publishes versioned releases, a version
   badge. Nothing else.
3. A description of one or two sentences.
4. Any other badges.

A reader, or a tool, can classify a project from its first three lines without reading further.

The key words "MUST", "MUST NOT", "SHOULD", "SHOULD NOT", and "MAY" in this document are to be interpreted as described
in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

## Terminology

Terms defined in Project Documentation keep their meaning here.

- **Details line**: the paragraph immediately after the README's H1, holding only the type, status, and version
  badges.
- **Type**: what the repository delivers, judged by its primary interface and distribution (section 3).
- **Status**: the project's stage of maturity (section 4).
- **Description**: the paragraph immediately after the details line.
- **Other badges**: any badge that is not on the details line, such as CI, coverage, license, or conformance badges.

## Specification

### 1. README opening

1. The README MUST open with the project name as the H1.
2. The paragraph immediately after the H1 MUST be the details line (section 2).
3. The paragraph immediately after the details line MUST be the description: one or two sentences saying what the
   project is. It MUST NOT contain badges.
4. Other badges MAY follow the description. They SHOULD sit on one line in the paragraph immediately after it.
5. No badge MAY appear between the H1 and the description except those on the details line.

### 2. Details line

1. The details line MUST hold, in this order and on one line:
   1. the type badge (section 3);
   2. the status badge (section 4);
   3. the version badge (section 5), when the project publishes versioned releases.
2. Badges on the details line MUST be separated by single spaces.
3. The details line MUST NOT contain any other badge, link, or text.

### 3. Type

1. The type MUST be exactly one of these, written with the exact Markdown shown:

| Type | Meaning | Markdown |
|------|---------|----------|
| library | Publishes packages for other code to depend on; ships no runnable deliverable of its own | `![Type: library](https://img.shields.io/badge/type-library-blueviolet)` |
| service | The primary interface is an API; it may carry a web UI for administration | `![Type: service](https://img.shields.io/badge/type-service-blueviolet)` |
| web app | The primary interface is a web UI | `![Type: web app](https://img.shields.io/badge/type-web_app-blueviolet)` |
| native app | The primary distribution is a compiled binary: desktop, mobile, or command line | `![Type: native app](https://img.shields.io/badge/type-native_app-blueviolet)` |

2. The type MUST be chosen by primary interface and distribution, not by everything the code contains. A service with
   an administration console is a service. A web app whose API exists only to serve its own UI is a web app. A library
   that ships a helper CLI is a library. A CLI that is the product is a native app.
3. A repository has exactly one type. A repository that needs two, such as a service and a library other projects
   depend on, SHOULD be split into two repositories.
4. The type is a property of the repository. In a monorepo, only the root README carries a type badge.

### 4. Status

1. The status MUST be exactly one of these stages, written with the exact Markdown shown:

| Stage | Meaning | Markdown |
|-------|---------|----------|
| research | Investigating whether and how to build it; no committed scope | `![Status: research](https://img.shields.io/badge/status-research-lightgrey)` |
| planning | Scope agreed, design underway, little or no code | `![Status: planning](https://img.shields.io/badge/status-planning-red)` |
| in progress | Actively being built; not usable end to end | `![Status: in progress](https://img.shields.io/badge/status-in_progress-orange)` |
| alpha | Usable by the team; incomplete and unstable | `![Status: alpha](https://img.shields.io/badge/status-alpha-yellow)` |
| beta | Feature complete for the intended audience; stabilizing | `![Status: beta](https://img.shields.io/badge/status-beta-blue)` |
| production | Released and supported | `![Status: production](https://img.shields.io/badge/status-production-brightgreen)` |
| archived | No longer maintained; kept for reference | `![Status: archived](https://img.shields.io/badge/status-archived-inactive)` |

2. The status badge MUST be updated in the same change that moves the project to a new stage.
3. An archived project SHOULD say in its description, or in a line directly below it, what replaced it, if anything.
4. In a monorepo, only the root README carries a status badge, except that an independently published package MAY
   carry its own (section 6).

### 5. Version

1. A project that publishes versioned releases MUST carry a version badge. A project that does not MUST NOT.
2. The version badge MUST show the latest released version and MUST read it from where the release is published, so
   that it never needs a manual edit. Use the shields.io badge for that source, with the label set to `version`:

| Published to | Markdown |
|--------------|----------|
| GitHub releases | `![Version](https://img.shields.io/github/v/release/<owner>/<repo>?label=version)` |
| npm | `![Version](https://img.shields.io/npm/v/<package>?label=version)` |
| PyPI | `![Version](https://img.shields.io/pypi/v/<package>?label=version)` |
| crates.io | `![Version](https://img.shields.io/crates/v/<crate>?label=version)` |

3. A project published to a registry not listed MUST use that registry's shields.io version badge with
   `label=version`.
4. The version badge MAY be a link to the release it shows or to the registry page.
5. A library monorepo that publishes all its packages at one version carries one version badge at the root.

### 6. Monorepos

1. The root README carries the details line for the repository.
2. A package README MUST NOT carry a type badge.
3. An independently published package MAY open its README with a details line of its own, holding only its status
   badge followed by its version badge. Every other package README MUST NOT carry a details line.

## Examples

### Library that publishes to npm

```markdown
# parser

![Type: library](https://img.shields.io/badge/type-library-blueviolet) ![Status: beta](https://img.shields.io/badge/status-beta-blue) ![Version](https://img.shields.io/npm/v/@example/parser?label=version)

A streaming parser for configuration files. It reports every error in one pass, with line and column.

![CI](https://github.com/example/parser/actions/workflows/ci.yml/badge.svg) [![Docs: project-details 1.0.0](https://img.shields.io/badge/docs-project--details_1.0.0-blueviolet)](https://lepid-labs.github.io/spec/project-details/v1.0.0/)
```

### Service without versioned releases

```markdown
# edge-proxy

![Type: service](https://img.shields.io/badge/type-service-blueviolet) ![Status: production](https://img.shields.io/badge/status-production-brightgreen)

The reverse proxy in front of every hosted service. It terminates TLS and routes by hostname.
```

## Declaring conformance

A project MAY declare conformance with a badge among its other badges. Conformance to Project Details implies
conformance to Project Documentation, so a project SHOULD declare only this badge rather than both:

```markdown
[![Docs: project-details 1.0.0](https://img.shields.io/badge/docs-project--details_1.0.0-blueviolet)](https://lepid-labs.github.io/spec/project-details/v1.0.0/)
```

## FAQ

### Why does the type come before the status?

The type tells a reader what they are looking at; the status only makes sense once they know. It also changes least
often, so the start of the line stays fixed while the status and version move.

### Why keep other badges off the details line?

So a reader, or a script, finds the same three facts in the same place in every repository. CI, coverage, and license
badges vary from project to project; once they share the line, the line stops being scannable.

### Why is archived a status and not an extra badge?

An archived project is not in any other stage in a way that matters to a reader: it is not maintained. One badge says
so without adding a fourth item to the details line.

### Why must the version badge be dynamic?

A hand-edited version is wrong from the first release after someone forgets to update it. A badge that reads the
registry or the GitHub release is correct every time, which is the same reason Project Documentation keeps derivable
content out of documents.

### How is this specification versioned?

With [Semantic Versioning](https://semver.org), by the same rules as Project Documentation. Each version names the
Project Documentation version it builds on. Published versions are never edited; each lives at its own address.

## License

This specification is licensed under [Creative Commons Attribution 4.0
International](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0). You may copy, adapt, and redistribute it,
including commercially, provided you credit Lepid Labs and link to the license.
