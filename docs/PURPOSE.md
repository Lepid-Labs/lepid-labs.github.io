# Purpose

## Problem being solved

Lepid Labs needs a public front door: a place that says what the company is, points at what it has released, and hosts the material a prospective user reads before opening a repository. Today that is scattered across repository READMEs and a per-project Pages site.

This site is that front door. It is deliberately small: a home page, an about page, and two pages that are Weft doing its job. The FAQ is a documentation graph and so is the product documentation, both rendered by the embedded reader, so the site demonstrates the one visible product by using it rather than describing it.

## Non-goals

- **Not a blog or a content platform.** No posts, no CMS, no build pipeline beyond assembling static files.
- **Not a product host.** Weft's own project site stays in Weft's repository; this site links to it and embeds its bundle.
- **Not a design system.** Every visual decision comes from ui-std-lib's luminous-precision theme; this repository adds layout only.
- **Not a catalogue of private work.** Only released, public products appear here.

## Audience

Prospective users of Lepid Labs products and anyone who arrives at the organisation's root domain.
