# Publish a specification version

Add a new version of a specification. Published versions are frozen ([RQ-013](../requirements/build.md)), so every
change, even a wording fix, goes through these steps.

1. Copy `site/spec/<name>/v<old>/index.md` to `site/spec/<name>/v<new>/index.md`, choosing the version by the rules in
   the spec's own FAQ. Never edit the old file.
2. Edit the new file, including the version in its H1 and in its conformance badge.
3. In `site/spec/index.html`, point the spec's card at the new version.
4. In `site/spec/<name>/index.html`, change both the refresh URL and the canonical URL to the new version.
5. Run `just lint`, then `just serve` and check the new page and the redirect.
6. The other specs link to this one's unversioned address, which the redirect from step 4 now points at the new
   version. Check that every section they cite by number still says what they rely on; if one does not, give that
   spec a new version with these same steps ([0010](../decisions/0010-publish-project-specifications-independently.md)).
7. Open a pull request. The version is published when it merges ([deploy](deploy.md)).

For a new specification, create `site/spec/<name>/v1.0.0/index.md`, add a card to `site/spec/index.html`, and copy an
existing `site/spec/<name>/index.html` redirect. The file must open with an H1 followed by a paragraph; they become the
page's title and description. A spec links the others by their unversioned address, such as `/spec/project-details/`,
never by a version.
