---
title: Building and Deploying
duration: 7 min read
difficulty: Advanced
category: Version Control & Deployment
order: 3
---

# Building and Deploying

Once your code is written and versioned, you need to compile it and deploy it to your ServiceNow instances.

## Core Commands

- `now-sdk build`: Compiles your Fluent code, generates Automated Test Framework (ATF) tests, and runs a readiness scan to ensure code quality.
- `now-sdk deploy`: Pushes the compiled application metadata to the target ServiceNow instance.

## Deploy Tags

After successful deployments, it is a best practice to create annotated git tags. 

```bash
git tag -a prod/2026-05-21-hash -m "Deployed to Prod"
```

Tags track exactly which code version is running on your Dev, UAT, and Prod instances, giving you a clear deployment history tied directly to Git commits.
