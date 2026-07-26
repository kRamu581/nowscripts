---
title: Project Structure & Fluent
duration: 8 min read
difficulty: Intermediate
category: Core Workflow & Context
order: 1
---

# Project Structure

When you initialize a ServiceNow SDK project, a specific directory structure is generated to manage your custom application code and configurations.

## The Anatomy of an SDK Project

- `src/fluent/`: This is the most important directory. It contains `.now.ts` files where you define your application's metadata (tables, business rules, client scripts, etc.) using **Fluent**. Fluent is ServiceNow's TypeScript-based metadata language.
- `now.config.json`: The core project configuration file. It stores essential application details like the app scope, name, and scope ID.
- `package.json`: A standard Node.js file used to manage dependencies, SDK versions, and custom scripts.
