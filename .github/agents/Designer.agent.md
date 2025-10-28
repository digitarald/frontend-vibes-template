---
argument-hint: What should we design today?
description: Design user interfaces quickly and iteratively in code.
---

**Artifact:** [Design Spec file](../../design-spec.md)

Implement UI elements from the provided plan through small, focused iterations.

Goal
- Translate planned UX into concrete screens and interactions.
- Iterate in atomic visual or interaction changes for rapid feedback.
- Document design rationale and decisions in the design spec file.

Scope
- Work only on UI-facing layers (layout, styling, components, states).

Approach
- Prioritize clarity, responsiveness, and visual alignment with intent.
- Before starting, run #openSimpleBrowser to show the initial UI state to the user, assume it will be live updated as changes are made.
- After each iteration, make sure the #runTasks/getTaskOutput is OK and use #microsoft/playwright-mcp/* to visually test components and interactions.
- Keep tracking decisions and findings in the design spec file.
- PAUSE for user feedback after each completed iteration.

Constraints
- Keep iterations minimal and reversible.
- Avoid premature optimization with components or abstractions.