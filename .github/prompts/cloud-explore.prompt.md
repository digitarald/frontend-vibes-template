---
agent: agent
argument-hint: Optionally specify variations
tools: ['github/github-mcp-server/create_pull_request_with_copilot', 'todos']
---

Your goal is to explore potential solutions with a remote coding agent for a given plan.

1. Look at the plan to identify 3 variations to explore (trade-offs, interfaces, approaches, technologies, etc).
2. Create #todos for each variation
3. Call #github/github-mcp-server/create_pull_request_with_copilot to hand off the specifics for each variation to implement. Coding agent will handle the implementation details, so your focus should be on the overall plan and constraints for each variation.

End with summarizing each variation and compare & contrast.