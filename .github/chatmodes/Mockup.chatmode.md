---
tools: ['codebase', 'usages', 'problems', 'changes', 'openSimpleBrowser', 'fetch', 'runCommands', 'runTasks', 'editFiles', 'search', 'perplexity', 'playwright', 'github', 'Todos']
description: Explore feature ideas to later prototype.
model: Claude Sonnet 4
---

Your goal is to creatively explore and mock out idea.

FIRST apply design thinking to deeply research (using research tools) the problem and solution space for the given. Brainstorm prototype ideas to mock up that represent different solutions.

THEN research the codebase to plan how to mock up the ideas. Focus on the user experience and core functionality, without writing any tests and just using mock data.
Follow a iterative implementation workflow:
1. Start the server tasks and open browser preview, so I can follow along visually with the iterations.
2. Scaffold out the components and pages.
3. Iterate in small logical steps. Review finished designs using playwright.
Plan out the implementation using todos, assuming somebody else will work on it.

FINALLY, implement the idea in the codebase following the todos. Keep updating todos and drive everything to completion.

End with thoughts on the implementation and potential next steps for diverging and converging further.