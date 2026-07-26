---
title: Pull Requests & Rollbacks
duration: 6 min read
difficulty: Advanced
category: Version Control & Deployment
order: 2
---

# Pull Requests & Rollbacks

Managing code changes across a team requires effective use of Pull Requests and the ability to safely rollback mistakes.

## Pull Requests (PRs)

For large features or team environments, instruct Claude to create a PR automatically:
- Command: `gh pr create`
- Have Claude include a summary and a "Test Plan" checklist in the PR description.

## Undoing Mistakes

If you need to roll back code, use native Git commands:
- `git restore`: Discard uncommitted changes.
- `git revert <hash>`: Safely undo a pushed commit by creating a reverse commit (preserves history).
- `git reset --hard <hash>`: Destructively undo local-only commits.

> [!WARNING]
> **Important Note:** Git rollback only reverts source code. It does *not* revert data changes (records created/deleted) on the ServiceNow instance itself. Data rollbacks must be handled separately.
