### 8. docs/use-cases/

1. `docs/use-cases/` holds actor–goal interactions, one per file, named `<actor-goal>.md`, such as
   `customer-places-order.md`. A use case is written for those who need an interaction spelled out step by step:
   designers, testers, and the people who build each step. A project SHOULD create the directory when user interactions
   need that level of detail.
2. **Shape.** The H1 is `# UC-nnn <actor goal>` (section 15.3), followed by a sentence naming the primary actor, their
   goal, and what starts the interaction, then:
   - `## Preconditions`: what is true before it starts;
   - `## Primary flow`: numbered steps of the path where nothing goes wrong, each one action by the actor or the
     system, described by intent rather than by interface ("submits the order", not "clicks Submit");
   - `## Alternate flows`: each branch labelled with the step it leaves from, such as `3a`, and ending where it rejoins
     the primary flow or ends the use case;
   - `## Postconditions`: what is true after success, and what still holds after a failure.
3. **Leave out.** A use case SHOULD NOT contain:
   - interface detail, such as screens, controls, and field layouts, which belongs in a feature and its mockups;
   - steps inside the system that the actor cannot observe, which belong in a design;
   - a second goal. A second goal is a second use case, which the first MAY link to.
4. **Writing.** Each step SHOULD name who acts and SHOULD move the actor closer to the goal. Every failure the actor
   can meet SHOULD appear as an alternate flow.
