# Publish a specification version

Add a new version of a specification. Published versions are frozen ([RQ-013](../requirements/build.md)), so every
change, even a wording fix, goes through these steps. A larger version can be merged as a draft first and edited over
several pull requests; see [Drafts](#drafts).

1. Copy the directory `site/spec/<name>/v<old>/` to `site/spec/<name>/v<new>/`, choosing the version by the rules in
   the spec's own FAQ. Never edit the old files.
2. Edit the new files, including the version in the H1 and in the conformance badge.
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

## Section files

A long spec version can be written as `sections/*.md` in place of `index.md`; a version with both, or neither, fails
the build. The build joins the files in name order, one blank line apart, into the published `index.md`, and does not
publish them. Name each file for the section it holds: `00-introduction.md` for the H1, the opening paragraph, and
everything up to the first numbered section; `NN-<title>.md` for section `NN`, such as `07-features.md`; and `9N-` for
the examples, FAQ, and other closing sections. Renumbering a section renames its file.

## Drafts

1. Do steps 1 and 2, then end the H1 with `(draft)` and add a notice after the opening paragraph:
   `> **Draft.** This version is still being written and may change before it is published.`, linking the spec's
   unversioned address for the latest published version.
2. Skip steps 3, 4, and 6: the index card and the unversioned address stay on the latest published version.
3. Run `just lint`, then open a pull request. Later pull requests edit the draft in place.
4. To publish, remove `(draft)` from the H1 and the notice, then do steps 3 to 7.
