# Deploy and roll back

How the site reaches `lepid-labs.github.io`, and how to undo a bad release.

## Topology

- GitHub Pages serves this repository at the organisation root. Pages is set to deploy from GitHub Actions; nothing is
  served from a branch.
- `lepid-labs.github.io/weft/` is served by the Weft repository's own Pages deployment under the same origin
  ([RQ-011](../requirements/build.md)).
- The theme loads from jsDelivr and the fonts from Google Fonts at view time. Weft is built into the site at deploy
  time ([0003](../decisions/0003-vendor-weft-at-build-time.md)).

## Deploy

1. Open a pull request. The `ci` workflow builds the site and checks links.
2. Merge to main. The `pages` workflow builds, checks links, uploads `_site/`, and deploys it. The merge is the publish
   step.
3. Watch the `pages` run in the repository's Actions tab until the deploy job finishes.
4. Load the home, FAQ, Docs, and Specs pages and confirm they render.

## Roll back

1. Revert the offending pull request on GitHub and merge the revert. The `pages` workflow redeploys the previous state.
2. If main cannot be built, re-run the last good `pages` run from the Actions tab.
