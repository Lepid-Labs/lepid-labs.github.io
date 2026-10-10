### 7. Summary documents

1. Every detail directory `docs/<area>/` MUST have a summary document `docs/<area>.md` beside it, created in the same
   change as the first detail file.
2. A summary MUST open with one paragraph on what the directory covers and how it is organized, followed by one entry
   per detail file.
3. Each entry MUST give the file's title, a one-sentence summary, a relative link, and its status where the type has
   one. Longer commentary belongs in the detail file.
4. Status values are `draft`, `agreed`, or `retired` for requirements; `open`, `proposed`, `accepted`, or
   `superseded by NNNN` for decisions; and `open` or `concluded` for research. An `open` decision is a question with no
   proposed answer yet.
5. A summary MUST list every file in its directory, and every entry MUST link to a file that exists.
6. A summary MUST be updated in the same change that adds, supersedes, or retires a detail file.
