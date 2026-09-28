# Update Weft

Move the site to a newer Weft build ([0003](../decisions/0003-vendor-weft-at-build-time.md)).

1. On a new branch, run `just weft-bump`. It sets `weft.ref` to the tip of Weft's main.
2. Run `just lint`. It clones or updates the checkout in `_build/weft`, builds it, assembles `_site/`, and checks links.
   A failure in `render-specs.mjs` means Weft moved or dropped a Markdown package the spec renderer uses
   ([0006](../decisions/0006-render-specs-from-markdown.md)).
3. Run `just serve` and check the FAQ, Docs, and a spec page: the reader mounts, the static intro hides, and search
   works.
4. Open a pull request with the `weft.ref` change.
