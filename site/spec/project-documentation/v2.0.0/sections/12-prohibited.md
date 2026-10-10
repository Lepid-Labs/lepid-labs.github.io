### 12. Prohibited

A conforming project MUST NOT contain:

1. A `docs/` subdirectory created before there is a file to put in it.
2. Generated API reference committed to the repository. Generate it in CI or on demand.
3. A copy of the README under `docs/`.
4. README files inside a single project's source tree, such as `src/parser/README.md`. Use a comment at the top of the
   code.
