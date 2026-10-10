# Build requirements

Constraints on how the site is built, styled, and checked.

## RQ-006 The site installs nothing

Status: agreed

Pages are plain HTML and CSS with no framework and no npm dependencies. The only build work is Weft, which is cloned
and built at a pinned commit (see [0003](../decisions/0003-vendor-weft-at-build-time.md)). New dependencies need the
owner's approval.

## RQ-007 All styling comes from ui-std-lib

Status: agreed

Every page sets `data-nb-style="luminous-precision"` on `<html>`. `site/assets/site.css` holds layout only and uses
`nb-*` classes and `--nb-*` tokens, never literal colours or fonts. A missing component is added upstream in
ui-std-lib, not here.

## RQ-008 Every internal link resolves

Status: agreed

`just lint` MUST pass: every root-relative and relative link in the built site resolves to a file.

## RQ-009 Embedded Weft matches the page

Status: agreed

Embedded Weft is fixed to `style: "luminous-precision"`, so the reader matches the page and its theme toggle stays
hidden.

## RQ-010 Embedded pages are never empty

Status: agreed

Crawlers, link previews, and readers without JavaScript or with a failed bundle load MUST see content on the FAQ and
Docs pages (see [0005](../decisions/0005-static-intro-on-embedded-pages.md)).

## RQ-011 The site never claims /weft/

Status: agreed

`lepid-labs.github.io/weft/` belongs to Weft's own Pages deployment on the same origin. The site MUST NOT contain a
`site/weft/` directory.

## RQ-012 Pages stay small

Status: agreed

Each hand-written page stays under 200 lines.

## RQ-013 Published specification versions are frozen

Status: agreed

A published spec version is never edited. Any change, even a wording fix, is a new version, and old versions stay up so
links keep their meaning. A version MAY first be merged as a draft and edited in place until it is published. A draft's
H1 ends in `(draft)`, a notice after its opening paragraph says it may change, and neither the spec index nor the
spec's unversioned address points at it. The steps are in the [publishing runbook](../runbooks/publish-spec-version.md).
