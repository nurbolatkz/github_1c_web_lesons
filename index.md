---
layout: home
title: 1C + React Lessons
---

# 1C + React Lessons

Step-by-step lessons for teams building business applications with a React frontend, a 1C backend, and a Python bridge service for API optimization, integrations, caching, validation, and automation.

The goal is to make every project use the same predictable architecture, commands, naming rules, and development workflow.

## Lessons

0. [Project overview](project-overview.md)
1. [Course plan](lessons/00-course-plan.md)
2. [Toolchain installation: Codex CLI, Claude Code, GitHub CLI, Node, Python](lessons/01-toolchain-installation.md)
3. [Standard project architecture](lessons/02-standard-project-architecture.md)
4. [First project workflow](lessons/03-first-project-workflow.md)

## Standard Stack

```text
React frontend
    |
    | HTTP API
    v
Python bridge backend
    |
    | HTTP / OData / COM / file exchange / queue
    v
1C backend
```

## What Every Project Must Have

- One GitHub repository per project.
- Same top-level folder structure.
- Same environment file names.
- Same command style for install, run, test, build, and deploy.
- GitHub Pages documentation available from the repository.
- AI CLI workflow documented for Codex CLI and Claude Code.

## Official References

- OpenAI Codex CLI: <https://www.npmjs.com/package/@openai/codex>
- Codex CLI sign-in: <https://help.openai.com/en/articles/11381614-api-codex-cli-and-sign-in-with-chatgpt>
- Claude Code setup: <https://docs.anthropic.com/en/docs/claude-code/getting-started>
- GitHub CLI Windows install: <https://github.com/cli/cli/blob/trunk/docs/install_windows.md>
