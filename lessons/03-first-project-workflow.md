---
layout: page
title: First Project Workflow
---

# First Project Workflow

This lesson creates the first repository and publishes the lesson site with GitHub Pages.

## 1. Create Local Project Folder

```powershell
cd C:\Projects
mkdir my-1c-react-project
cd my-1c-react-project
git init
```

## 2. Create Standard Folders

```powershell
mkdir frontend
mkdir bridge
mkdir onec
mkdir docs
mkdir scripts
mkdir .github
mkdir .github\workflows
```

## 3. Add Basic Documentation Files

```powershell
New-Item README.md
New-Item .env.example
New-Item onec\README.md
New-Item docs\architecture.md
New-Item docs\api-contracts.md
New-Item docs\operations.md
```

## 4. Create GitHub Repository

Use GitHub CLI:

```powershell
gh repo create my-1c-react-project --public --source . --remote origin --push
```

For a private repository:

```powershell
gh repo create my-1c-react-project --private --source . --remote origin --push
```

## 5. Create First Branch

```powershell
git checkout -b docs/initial-architecture
```

## 6. Use Codex CLI

Start from the repository root:

```powershell
codex
```

Example prompt:

```text
Create initial documentation for a React frontend, Python bridge API, and 1C backend project.
Use the standard folder structure from docs/architecture.md.
Do not create application code yet.
```

## 7. Use Claude Code

Start from the repository root:

```powershell
claude
```

Example prompt:

```text
Review this repository structure for a React + Python bridge + 1C backend project.
Find missing setup documentation and propose improvements before we start coding.
```

## 8. Commit Work

```powershell
git status
git add .
git commit -m "Add initial project architecture documentation"
git push -u origin docs/initial-architecture
```

## 9. Create Pull Request

```powershell
gh pr create --fill
```

## 10. Publish Lessons With GitHub Pages

If this repository is the lesson site:

1. Push the site files to GitHub.
2. Open repository settings.
3. Go to `Pages`.
4. Select `Deploy from a branch`.
5. Select `main` and `/root`.
6. Save.

The site URL will be:

```text
https://<github-user>.github.io/<repository-name>/
```

## 11. Definition of Done

The first project is ready when:

- Repository exists on GitHub.
- Standard folders exist.
- README explains the architecture.
- GitHub Pages is enabled.
- Developers can run `codex`, `claude`, and `gh`.
- Future lessons can add React, Python, and 1C implementation step by step.

