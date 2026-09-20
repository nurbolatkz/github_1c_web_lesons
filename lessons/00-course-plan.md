---
layout: page
title: Course Plan
---

# Course Plan

This course teaches a repeatable way to build projects where React is the user interface, Python is the bridge API, and 1C is the business backend.

## Main Result

By the end of the lessons, every project should have this shape:

```text
project-name/
├── frontend/              # React application
├── bridge/                # Python API service between React and 1C
├── onec/                  # 1C configuration notes, exports, scripts, examples
├── docs/                  # Project-specific documentation
├── .github/workflows/     # CI, checks, deploy automation
├── .env.example           # Shared environment variable template
└── README.md              # Project commands and architecture summary
```

## Lesson Roadmap

| Lesson | Topic | Result |
| --- | --- | --- |
| 01 | Toolchain installation | Developer machine can run Codex, Claude, GitHub CLI, Node, Python, and Git. |
| 02 | Standard project architecture | Every project uses the same folders and responsibilities. |
| 03 | First project workflow | Create a GitHub repo, scaffold folders, and publish lessons with GitHub Pages. |
| 04 | React frontend base | Create a React app with API service layer, routing, and environment config. |
| 05 | Python bridge base | Create a FastAPI bridge service with health checks and typed settings. |
| 06 | 1C connection strategy | Choose HTTP service, OData, COM, scheduled exchange, or file exchange. |
| 07 | Authentication and roles | Define user login, tokens, 1C user mapping, and frontend route guards. |
| 08 | Data contracts | Define request and response models shared by React, Python, and 1C. |
| 09 | Error handling and logs | Add consistent API errors, logging, trace IDs, and debugging workflow. |
| 10 | Performance optimization | Add caching, pagination, batching, and background jobs in Python. |
| 11 | AI-assisted development | Use Codex CLI and Claude Code safely with Git branches and reviews. |
| 12 | Deployment | Build frontend, run bridge backend, configure 1C endpoint access, and publish docs. |

## Working Rules

1. Start every change from a Git branch.
2. Keep React, Python, and 1C responsibilities separate.
3. Put all external configuration in environment variables.
4. Do not let React call 1C directly unless the project has a deliberate reason.
5. Use Python bridge services to normalize 1C data for frontend use.
6. Use Codex CLI or Claude Code for implementation help, but commit only reviewed changes.
7. Keep the GitHub Pages lesson site updated with project decisions.

## Naming Rules

Use the same naming style in all projects:

```text
frontend/     React app
bridge/       Python bridge API
onec/         1C artifacts and instructions
docs/         Project documentation
scripts/      Local automation scripts
```

Environment files:

```text
.env.example
frontend/.env.example
bridge/.env.example
```

Branches:

```text
feature/<short-task-name>
fix/<short-bug-name>
docs/<short-doc-name>
```

