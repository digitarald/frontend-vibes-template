---
tools: ['runCommands', 'runTasks', 'edit', 'search', 'perplexity/*', 'microsoft/playwright-mcp/*', 'executePrompt', 'usages', 'problems', 'changes', 'openSimpleBrowser', 'todos']
description: For doing quick mockups
---

Your goal is to mock up an implementation.

First gather background to scope the idea in more detail using #perplexity/perplexity_ask tool, closing any gaps in the given task.

Then, plan (research via #executePrompt , capture plan #todos) and mock out the idea in the codebase. Focus ONLY on the details that matter for goal of the mockup.