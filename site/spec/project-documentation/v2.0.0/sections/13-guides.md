### 13. docs/guides/

1. `docs/guides/` holds guides on how to use, configure, or extend the product, one task or topic per file, named
   `<topic>.md`. A guide is written for the product's users, in their terms. A project SHOULD create the directory
   when users need more than the README.
2. A guide MUST describe the product as built. It MUST NOT restate a feature or design document.
3. **Shape.** The H1 names the task or topic as a user would, such as `# Configure single sign-on`, followed by a
   paragraph on who the guide is for and what they can do once they have followed it, then:
   - `## Prerequisites`: anything needed beyond the README's prerequisites;
   - the task itself, in sections of the guide's own, as numbered steps or explanation as the topic needs, with
     examples that work against the current release.

   A guide SHOULD be updated in the same change that alters the behaviour it describes.
4. **Leave out.** A guide SHOULD NOT contain:
   - behaviour that is planned but not released;
   - why the product works as it does, beyond what the reader needs to finish the task. The design or decision MAY be
     linked;
   - examples that have not been run against the current release.
5. **Writing.** A guide SHOULD be organized around what the reader is trying to do, not around how the product is
   built, and SHOULD name things as the product's interface names them.
