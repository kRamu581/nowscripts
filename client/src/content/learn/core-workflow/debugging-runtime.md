---
title: Debugging Runtime Issues
duration: 5 min read
difficulty: Intermediate
category: Core Workflow & Context
order: 4
---

# Debugging Runtime Issues

When things go wrong during execution, use these strategies to resolve issues quickly using Claude Code.

## The Debugging Loop

1. **Describe Symptoms**: Describe the symptoms to the agent rather than guessing the cause. Let the AI analyze the context.
2. **Tight Feedback Loop**: Follow this rapid cycle:
   - Run `now-sdk build`.
   - Check the output for compilation errors or test failures.
   - Feed errors back to Claude.
   - Let Claude fix the issue.
   - Repeat.
3. **Fresh Context**: If a conversation context becomes confused during a long debug session, start a fresh conversation to clear the AI's memory of past mistakes and focus it on the current codebase state.
