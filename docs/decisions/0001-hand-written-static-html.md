# 0001 Hand-written static HTML

Status: accepted

## Context

The site is a handful of pages for a small lab. A framework or static-site generator would add dependencies, a
toolchain to keep current, and a build step for content that rarely changes.

## Decision

Every page under `site/` is hand-written HTML with one shared stylesheet. Shared markup (nav, footer) is duplicated
in each page rather than templated.

## Consequences

Nothing to install for the site itself, and any page can be read and edited on its own. The cost is that a nav or
footer change touches every page; once the site outgrows four or five pages, a small templating step is preferred over
a framework ([0009](0009-share-nav-markup.md)).
