---
title: Development Environment Setup
duration: 10 min read
difficulty: Beginner
category: Getting Started with SDK
order: 2
---

# Development Environment Setup

To build ServiceNow applications efficiently with the SDK and AI agents, you need to set up your local development environment with the necessary tools.

## Required Tools

1. **Node.js (v20+)**: The required runtime environment for executing the ServiceNow SDK. Make sure you install version 20 or higher.
2. **ServiceNow SDK**: The core command-line interface. Install it globally using npm:
   ```bash
   npm install -g @servicenow/sdk
   ```
3. **Claude Code**: The AI coding agent. It should be installed natively via your terminal.
4. **ServiceNow SDK Plugin for Claude Code**: This equips the AI agent with specific domain knowledge of ServiceNow development. Add it to Claude Code by running:
   ```bash
   /plugin marketplace add servicenow/sdk
   /plugin install fluent
   ```
5. **Code Editor**: A modern IDE such as Visual Studio Code (VS Code) is recommended for editing your Fluent `.now.ts` files.
