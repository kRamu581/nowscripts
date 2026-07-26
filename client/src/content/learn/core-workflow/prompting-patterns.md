---
title: Prompting Patterns & Execution
duration: 10 min read
difficulty: Intermediate
category: Core Workflow & Context
order: 3
---

# Prompting Patterns & Execution

To effectively pair-program with Claude Code on ServiceNow SDK projects, adopt the following prompting patterns.

## Best Practices

1. **Be Specific**: Detail the exact fields, data types, and naming conventions you want. Do not leave architectural decisions up to the AI if you have a preference.
2. **Explain the "Why"**: Give the agent the intent behind a request. Explaining *why* a business rule is needed helps the AI handle edge cases and design better logic.
3. **Break it Down**: Work iteratively. Do not ask for the entire application at once. Ask it to build a table, then review, then ask it to build the business rule, etc.
4. **Define "Done"**: Give the agent a clear target so it can verify its own work against your requirements.

## Plan Mode

For complex architectural tasks, use Claude's plan mode:
- Command: `/model opusplan` (or `Shift+Tab`)
- This leverages the stronger "Opus" model to formulate a comprehensive plan. 
- The plan is then executed by the faster, more cost-effective "Sonnet" model to perform the file edits.
- This hybrid approach saves costs while ensuring architectural soundness.
