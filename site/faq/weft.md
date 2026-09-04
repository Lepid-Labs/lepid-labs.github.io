# About Weft

## What is Weft?

A documentation graph browser that lives in the repository alongside the code. Design docs, architecture diagrams, API specs, schemas, and slide decks are nodes in a navigable graph with typed, anchor-level relationships between them. Any document can be the entry point, and navigation is a first-class interaction rather than an afterthought.

The full guide is on the [Documentation](/docs/) page, rendered by Weft itself.

## What problem does it solve?

A folder of Markdown files hides the relationships that matter: which spec a design implements, which operation a paragraph refers to, which decision changed a diagram. Weft extracts those relationships from ordinary links and frontmatter, resolves them down to a heading, a slide, or an operation ID, and lets you follow them in both directions. Broken references show up as broken instead of silently pointing at nothing.

## How do I run it?

As a CLI over a local checkout. With Node.js 24 or later and pnpm installed:

```sh
git clone https://github.com/Lepid-Labs/weft.git
cd weft
just install
just dev
```

`weft serve` builds the graph manifest for the configured docs directory (default `docs/`) and opens the browser UI. `weft index` rebuilds the manifest without serving, and `weft check` validates the graph in CI.

## How do I embed it?

`@weft/embed` mounts the browser into any page. Point it at a public GitHub repository or at a base URL that serves the docs and their manifest:

```js
Weft.mountWeft('#docs', { repo: 'acme/project', branch: 'main' });
```

A host that already has its own header, search, and routing can mount just the reader with `mountDoc` and keep control of navigation. This site's FAQ and Docs pages are `mountWeft` over corpora served from the same origin; see [About this site](this-site.md#how-are-the-faq-and-docs-pages-built).

## Is it on npm?

Not yet. Neither `@weft/cli` nor `@weft/embed` is published, so embedding today means building the bundle from a checkout at a commit you choose. This site pins one and rebuilds on deploy. Publishing is planned; watch the repository for a release.

## Which document types does it understand?

Markdown, with headings as anchors slugged exactly as GitHub does, and OpenAPI in YAML or JSON, with operation IDs and schema names as anchors. Generated artifacts such as PDFs can be tracked and checked as nodes without being rendered. Additional extensions can be mapped onto the Markdown or OpenAPI parsers in configuration.

## How is it themed?

Weft renders in a [ui-std-lib](https://github.com/nazuraki/ui-std-lib) theme, either a single fixed theme or a dark and light pair with a toggle. The default pair is `luminous-precision` and `summer-cloud`. An embedded Weft keeps its styling inside its own container, so a host page is never restyled by it.

## How is Weft licensed?

MIT. The licence text is in the [repository](https://github.com/Lepid-Labs/weft/blob/main/LICENSE).

## What is the project's status?

Actively developed and used in earnest on our own repositories, including this one. The CLI, the browser UI, and the embed are working; the package is pre-1.0 and the configuration surface may still change between commits. Read the design decisions on the Documentation page before building on an internal detail.
