---
title: Project Creation and Credentials
duration: 5 min read
difficulty: Beginner
category: Getting Started with SDK
order: 3
---

# Project Creation and Credentials

You have two primary ways to begin a new ServiceNow SDK project: utilizing the Build Agent or starting from scratch.

## Build Agent vs. Scratch

- **Build Agent**: A natural-language AI located inside ServiceNow Studio. It can quickly scaffold complex elements like tables, roles, and relationships for your data models before you even touch code.
- **Scratch**: Use the SDK command `now-sdk init` (or `now-sdk create`) in your terminal. This provides a clean, empty project skeleton for you to start building upon using code.

## Authentication

When you attempt to interact with your instance (e.g., using `now-sdk deploy` or `now-sdk install`), the SDK will prompt you for your:
1. Instance URL
2. Username
3. Password

These credentials are saved locally for future interactions. 

> [!NOTE]
> You do **not** need GitHub personal access tokens or instance credential records for this CLI authentication unless you are explicitly using the Studio's built-in Source Control feature.
