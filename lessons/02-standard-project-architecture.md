---
layout: page
title: Standard Project Architecture
---

# Standard Project Architecture

Every project should use the same structure so developers, AI tools, and deployment scripts can work predictably.

## Folder Layout

```text
project-name/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   ├── .env.example
│   └── package.json
├── bridge/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── services/
│   │   └── main.py
│   ├── tests/
│   ├── .env.example
│   └── pyproject.toml
├── onec/
│   ├── README.md
│   ├── http-services/
│   ├── exchange-formats/
│   └── examples/
├── docs/
│   ├── architecture.md
│   ├── api-contracts.md
│   └── operations.md
├── scripts/
├── .github/
│   └── workflows/
├── .env.example
└── README.md
```

## Responsibility Split

| Layer | Responsibility |
| --- | --- |
| React frontend | User interface, browser routing, form validation, API calls to Python bridge. |
| Python bridge | API normalization, authentication, caching, batching, validation, logs, 1C integration. |
| 1C backend | Business rules, reference data, documents, registers, accounting logic. |
| GitHub Pages | Lessons, architecture decisions, setup instructions, project documentation. |

## Data Flow

```text
User
  -> React page
  -> frontend service function
  -> Python bridge endpoint
  -> 1C integration adapter
  -> 1C backend
```

Return path:

```text
1C backend
  -> Python adapter converts 1C response
  -> Python API returns frontend-friendly JSON
  -> React renders data
```

## Why Python Bridge Exists

The bridge service protects the frontend from 1C-specific complexity.

Use it for:

- Converting 1C field names into frontend-friendly JSON.
- Combining several 1C calls into one frontend endpoint.
- Caching slow reference data.
- Adding pagination and filtering.
- Validating inputs before they reach 1C.
- Handling retry and timeout logic.
- Adding logs and trace IDs.
- Keeping credentials away from the browser.

## Environment Variables

Root `.env.example`:

```text
APP_ENV=local
APP_NAME=my-1c-react-project
```

Frontend `frontend/.env.example`:

```text
VITE_API_BASE_URL=http://localhost:8000
```

Bridge `bridge/.env.example`:

```text
APP_ENV=local
API_HOST=127.0.0.1
API_PORT=8000
ONEC_BASE_URL=http://localhost:8080
ONEC_USERNAME=
ONEC_PASSWORD=
```

## Standard Commands

Use these names in every project README.

Frontend:

```powershell
cd frontend
npm install
npm run dev
npm run build
npm run test
```

Python bridge:

```powershell
cd bridge
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
pytest
```

GitHub:

```powershell
git status
git checkout -b feature/task-name
git add .
git commit -m "Describe change"
git push -u origin feature/task-name
gh pr create --fill
```

AI CLI:

```powershell
codex
claude
```

Use AI tools from the repository root so they can inspect the whole project structure.

