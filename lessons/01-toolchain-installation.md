---
layout: page
title: Toolchain Installation
---

# Toolchain Installation

This lesson prepares a Windows development machine for React + Python + 1C projects using Codex CLI, Claude Code, GitHub CLI, Node.js, Python, and Git.

Use PowerShell unless a command says otherwise.

## 1. Install Git

Check if Git is installed:

```powershell
git --version
```

If Git is missing, install it:

```powershell
winget install --id Git.Git --source winget
```

Close and reopen PowerShell after installation.

## 2. Install GitHub CLI

Install:

```powershell
winget install --id GitHub.cli --source winget
```

Verify:

```powershell
gh --version
```

Sign in:

```powershell
gh auth login
```

Recommended answers:

```text
GitHub.com
HTTPS
Login with a web browser
```

## 3. Install Node.js

React, Codex CLI, and Claude Code can use Node.js tooling.

Check:

```powershell
node --version
npm --version
```

Install Node.js LTS if missing:

```powershell
winget install --id OpenJS.NodeJS.LTS --source winget
```

Close and reopen PowerShell after installation.

## 4. Install Python

Check:

```powershell
python --version
pip --version
```

Install Python if missing:

```powershell
winget install --id Python.Python.3.12 --source winget
```

Close and reopen PowerShell after installation.

## 5. Install Codex CLI

Current official options include the Windows installer or npm package.

Windows installer:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```

Alternative npm install:

```powershell
npm install -g @openai/codex
```

Verify:

```powershell
codex --version
```

Sign in:

```powershell
codex --login
```

Start Codex in a project:

```powershell
cd C:\Projects\my-1c-react-project
codex
```

## 6. Install Claude Code

Current official options include the Windows PowerShell installer or npm package.

PowerShell installer:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Alternative npm install:

```powershell
npm install -g @anthropic-ai/claude-code
```

Verify:

```powershell
claude --version
```

Run health check:

```powershell
claude doctor
```

Start Claude Code in a project:

```powershell
cd C:\Projects\my-1c-react-project
claude
```

## 7. Verify Complete Toolchain

Run:

```powershell
git --version
gh --version
node --version
npm --version
python --version
pip --version
codex --version
claude --version
```

## 8. Recommended Project Folder

Use one clean folder for all projects:

```powershell
mkdir C:\Projects
cd C:\Projects
```

## 9. Official References

- Codex CLI npm package: <https://www.npmjs.com/package/@openai/codex>
- Codex CLI sign-in: <https://help.openai.com/en/articles/11381614-api-codex-cli-and-sign-in-with-chatgpt>
- Claude Code setup: <https://docs.anthropic.com/en/docs/claude-code/getting-started>
- Claude Code day-one setup: <https://support.claude.com/en/articles/14552382-your-first-day-in-claude-code>
- GitHub CLI Windows install: <https://github.com/cli/cli/blob/trunk/docs/install_windows.md>

