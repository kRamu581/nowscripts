---
title: Automated Pipeline Example
duration: 10 min read
difficulty: Expert
category: Custom Tooling & Orchestration
order: 3
---

# Automated Pipeline Example

Here is an example of an end-to-end orchestrated pipeline using custom workflow commands to automate development:

1. **`/find-issues`**: 
   Runs parallel sub-agents to audit the codebase for bugs, performance issues, and UI/accessibility problems, then automatically files rough GitHub issues.
2. **`/issue-interview`**: 
   Iterates over rough issues and conducts a Q&A to generate a detailed spec, eventually labeling them as `ready`.
3. **`/git-issues-start`**: 
   Groups `ready` issues by file overlap, spins up parallel Git worktrees, and implements the solutions simultaneously without committing.
4. **`/git-issues-end`**: 
   A review gate where the user inspects the diffs, maps changes to issue numbers, creates clean per-issue commits, pushes, and closes the GitHub issues automatically.
