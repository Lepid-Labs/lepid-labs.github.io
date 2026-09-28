# 0003 Vendor Weft at build time

Status: accepted

## Context

The FAQ and Docs pages embed Weft, but `@weft/embed` is not published to npm.

## Decision

`scripts/build.sh` clones `Lepid-Labs/weft` at the commit in `weft.ref`, builds the embed bundle, and copies
`weft.iife.js` and `weft.css` to the site root. Nothing from Weft is committed here.

## Consequences

Builds are reproducible from one pinned commit, and bumping Weft is a one-line change to `weft.ref` plus a visual
check ([runbook](../runbooks/update-weft.md)). The first build clones and installs Weft, which is slow.
