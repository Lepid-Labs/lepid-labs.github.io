# Publish a specification version

Add a new version of a specification. Published versions are frozen ([RQ-013](../requirements/build.md)), so every
change, even a wording fix, goes through these steps.

1. Copy `site/spec/<name>/v<old>/index.md` to `site/spec/<name>/v<new>/index.md`, choosing the version by the rules in
   the spec's own FAQ. Never edit the old file.
2. Edit the new file, including the version in its H1 and in its conformance badge.
3. In `site/spec/index.html`, point the spec's card at the new version.
4. In `site/spec/<name>/index.html`, change both the refresh URL and the canonical URL to the new version.
5. Run `just lint`, then `just serve` and check the new page and the redirect.
6. Specs that build on this one keep linking to the base version they name. Decide whether each needs a new version
   of its own to adopt the new base; if so, publish it with these same steps
   ([0010](../decisions/0010-layer-project-specifications.md)).
7. Open a pull request. The version is published when it merges ([deploy](deploy.md)).

For a new specification, create `site/spec/<name>/v1.0.0/index.md`, add a card to `site/spec/index.html`, and copy an
existing `site/spec/<name>/index.html` redirect. The file must open with an H1 followed by a paragraph; they become the
page's title and description. A spec that builds on another names and links the exact base version in its Summary.
