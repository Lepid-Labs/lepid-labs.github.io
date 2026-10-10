### 12. docs/runbooks/

1. `docs/runbooks/` holds deployment topology and operational procedures, one procedure per file, named
   `<procedure>.md`, such as deploying, rolling back, responding to an incident, or rotating a secret. A runbook is
   written for whoever operates the project, possibly under pressure and without its author to ask. A project SHOULD
   create the directory when the project is deployed anywhere.
2. **Shape.** The H1 names the procedure in the imperative, such as `# Roll back a release`, followed by a sentence on
   when to run it and what it achieves, then:
   - `## Prerequisites`: the access, tools, and approvals needed before the first step, naming secrets and roles but
     never their values (section 18.5);
   - `## Steps`: numbered, one action each, with the exact command and what the reader sees when it worked;
   - `## Verify`: how to confirm that the whole procedure succeeded;
   - `## Recovery`: what to do when a step fails, or a link to the runbook that undoes it.

   Deployment topology, meaning the environments, where each runs, and what each depends on, SHOULD be described in
   one runbook and linked from the others.
3. **Leave out.** A runbook MUST NOT contain secret values, credentials, or internal hostnames (section 18.5); it says
   where to find them. It SHOULD NOT contain:
   - why the system is built as it is, which belongs in a design or decision record;
   - a step that relies on knowledge the reader may not have, such as "restart the usual service".
4. **Writing.** Each step SHOULD be possible to run exactly as written, and SHOULD say what the reader sees when it
   worked, so that a failure is noticed at the step that caused it. A runbook SHOULD be updated in the same change
   that alters the procedure.
