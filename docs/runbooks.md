# Runbooks

Procedures for operating the site: how it is deployed and how its generated and vendored parts are refreshed. Each file
is one procedure, written as steps to follow.

| Runbook | Summary |
|---------|---------|
| [Deploy and roll back](runbooks/deploy.md) | Where the site is served from, how a merge publishes it, and how to undo a release. |
| [Update Weft](runbooks/update-weft.md) | Move `weft.ref` to a newer Weft build and check the embedded pages. |
| [Publish a specification version](runbooks/publish-spec-version.md) | Add a new, frozen version of a spec and point the landing page and redirect at it. |
| [Render the social preview image](runbooks/render-social-image.md) | Regenerate and commit `og.png` after the card or theme changes. |
