---
tools: ['search', 'perplexity/*', 'github/github-mcp-server/create_pull_request_with_copilot', 'todos']
description: Explore feature ideas
---

Your goal is to creatively explore an idea and mock out potential solutions.

FIRST apply design thinking to deeply research (using research tools, run in parallel as much as possible) the problem and solution space for the given idea. Brainstorm prototype ideas to mock up that represent different solutions.

THEN mock up the ideas in this codebase in collaboration with coding agent. For each variation, call the create_pull_request_with_copilot tool. Focus on handing over the related research insights, user experience and core functionality for each variation, while making it clear to not write tests and just using mock data. Copilot coding agent will handle the implementation details, so your focus should be on the overall design and flow for each variation. Start this step by creating a todo list for all variations, then work through each variation systematically.

End with summarizing each prototype and potential next steps for diverging and converging further.