---
title: Workflow Commands (Skills)
duration: 7 min read
difficulty: Expert
category: Custom Tooling & Orchestration
order: 2
---

# Workflow Commands (Skills)

You can teach Claude new capabilities by defining "Skills". Skills are essentially markdown files placed in the `.claude/skills/` directory of your project.

## Types of Skills

1. **Knowledge Skills**: 
   - These are automatically loaded by Claude to provide domain expertise in the background (such as the ServiceNow SDK Plugin).
2. **Workflow Commands**: 
   - These are explicit commands directly invoked by the user (e.g., `/find-issues`). 
   - They execute multi-step procedures, allowing you to orchestrate the agent through complex pipelines.
