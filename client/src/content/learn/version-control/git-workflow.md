---
title: Git Workflow & Branching
duration: 8 min read
difficulty: Advanced
category: Version Control & Deployment
order: 1
---

# Git Workflow & Branching

The ServiceNow SDK shifts development towards a git-native workflow, allowing developers to use industry-standard version control.

## Identity & Authentication

Before starting, configure your git identity and authenticate with GitHub so both you and the AI agent can interact with remote repositories seamlessly:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
gh auth login
```

## Committing Code

- **Agent Commits**: You can tell Claude to "Commit my changes with a message...".
- **Review**: Always review changes using `git diff --staged` before pushing.
- **Frequency**: Make small, frequent commits to maintain a clean history.

## Branching Strategies

For major features or risky refactors, isolate your work on branches:
```bash
git switch -c feature-name
```

**Git Worktrees**: Use `git worktree add` when you need to switch tasks (e.g., jump to a hotfix) without disturbing your current uncommitted work environment.
