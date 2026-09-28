# 0009 Share nav markup through a templating step

Status: open

## Context

The nav and footer are duplicated in six hand-written pages plus `scripts/spec-page.html`, past the four-or-five page
threshold in [0001](0001-hand-written-static-html.md).

## Decision

Not yet made. Since the build now renders spec pages, a shared header partial filled in at build time is the natural
next step.

## Consequences

A partial removes the duplication but makes every page depend on the build to be viewable as-is.
