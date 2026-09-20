const GROUP_LABELS = {
  Overview: "Обзор",
  "Getting started": "Начало",
  "Build with AI": "Работа с AI",
  "Connect to 1C": "Интеграция с 1C",
};

const lessons = [
  {
    id: "project-overview",
    group: "Overview",
    number: "OV",
    title: "Обзор проекта",
    subtitle: "Простой CRUD от 1C до production: React, FastAPI, SQL-сессии и Linux.",
    minutes: "12 мин",
    level: "Обзор",
    complete: true,
    need: ["Опыт разработки в 1C", "Git и GitHub", "Windows для разработки", "Linux для production"],
    goal: "вы поймёте основной маршрут курса: 1C HTTP-сервис, FastAPI, SQL-сессии, React CRUD и выпуск на Linux.",
    steps: [
      {
        title: "Цель и границы курса",
        text: "Практический курс для разработчиков 1C: создать простой справочник и документ, опубликовать HTTP-сервис базы, настроить FastAPI и SQL, собрать React-интерфейс с AI-агентом и выпустить приложение на Linux.",
        info: [
          "1C хранит учебный справочник и документ.",
          "FastAPI хранит пользователей и серверные сессии в собственной SQL-базе.",
          "React + TypeScript работает через /api на одном домене.",
          "Production: Linux, nginx, systemd и HTTPS.",
          "Docker, SSO, Keycloak и сложные scopes не входят в базовый курс.",
        ],
      },
      {
        title: "Сквозная практика",
        text: "Учебный результат: пользователь входит на сайт, создаёт товар, выбирает его в заявке, сохраняет изменения и видит тот же результат в 1C.",
        code: `Форма списка        -> React list page
Форма объекта       -> Detail page и Create/Edit form
Форма выбора        -> ReferencePicker
Ссылка на объект    -> стабильный ID в API
Проверка заполнения -> React + FastAPI + бизнес-правила 1C
Журнал регистрации  -> Network, логи, SQL и 1C`,
      },
      {
        title: "Учебный проект",
        text: "Базовый проект состоит из простого справочника товаров и документа заявки. Удаление в уроках означает пометку удаления, а не физическое удаление данных.",
        code: `Справочник: Товары
  -> список
  -> просмотр
  -> создание
  -> изменение
  -> пометка удаления

Документ: Заявка
  -> шапка
  -> строки товаров
  -> сохранение
  -> проверка результата в 1C`,
      },
      {
        title: "Архитектура приложения",
        text: "React не обращается к 1C напрямую. FastAPI проверяет пользователя и сессию, нормализует ошибки, вызывает опубликованный HTTP-сервис 1C и возвращает frontend-friendly JSON.",
        code: `React: товары и заявки
  -> HTTPS /api и cookie сессии
FastAPI
  -> SQL: users, sessions
  -> служебная учётная запись
HTTP-сервис 1C
  -> товары и заявки в 1C
DB Browser
  -> просмотр учебной SQL-базы`,
      },
      {
        title: "Рекомендуемая авторизация",
        text: "Для одного React-приложения и FastAPI на одном домене выбран простой маршрут: логин/пароль, случайный токен в защищённой cookie и серверная сессия в SQL.",
        code: `Браузер
  -> cookie HttpOnly, Secure, SameSite=Lax
SQL users
  -> пользователь, хеш пароля, роль, активность
SQL sessions
  -> хеш токена, user_id, created_at, expires_at, revoked_at
React
  -> данные текущего пользователя; секретный токен JavaScript не читает`,
        info: [
          "Стартовая политика: максимум 8 часов и 30 минут бездействия.",
          "Пароли хешируются через Argon2id.",
          "Изменяющие запросы требуют CSRF-защиты и проверки Origin.",
          "Logout отзывает сессию в SQL; следующий запрос больше не проходит.",
          "OAuth2 и access/refresh JWT для первого приложения не обязательны.",
        ],
      },
      {
        title: "План курса",
        text: "Программа ведёт от инструментов и публикации HTTP-сервиса 1C к .env, SQL, серверной сессии, CRUD-интерфейсу, проверке и выпуску на Linux.",
        info: [
          "Инструменты, GitHub, ветки и review.",
          "HTTP-сервис и CRUD в 1C.",
          "Конфигурация .env и запуск FastAPI.",
          "SQL-база, users, sessions и DB Browser.",
          "Вход, срок действия, бездействие и logout.",
          "React CRUD товара и заявки.",
          "Проверка после изменений и выпуск Windows -> Linux.",
        ],
      },
      {
        title: "Критерий выпуска ученика",
        text: "Ученик показывает опубликованный HTTP-сервис, параметры .env без секретов, таблицы users/sessions, вход и появление сессии, CRUD товара и заявки, logout/истечение сессии, свой PR и обновлённую версию на Linux.",
        ai: "Составь урок для разработчика 1C: создать серверную сессию в FastAPI, увидеть её в SQL через DB Browser, проверить logout и истечение срока.",
        link: {
          label: "Open full project-overview.md",
          href: "project-overview.md",
        },
      },
    ],
  },
  {
    id: "lesson-00",
    group: "Getting started",
    number: "00",
    title: "Обзор курса",
    subtitle: "Understand the course goal, stack, project rules, and delivery order.",
    minutes: "8 мин",
    level: "Начальный",
    complete: true,
    need: ["GitHub account", "Windows terminal", "Basic web project knowledge"],
    goal: "you will understand the complete React + Python + 1C learning path.",
    steps: [
      {
        title: "Learn the target architecture",
        text: "Every project uses the same split between frontend, bridge API, and 1C business backend.",
        code: `React frontend
    |
    | HTTP API
    v
Python bridge backend
    |
    | HTTP / OData / COM / file exchange / queue
    v
1C backend`,
      },
      {
        title: "Review the lesson roadmap",
        text: "The course starts with tools and repository setup, then moves into React, Python bridge services, 1C integration, optimization, and deployment.",
        info: ["Tool installation", "Standard architecture", "Frontend setup", "Python bridge setup", "1C integration", "Release workflow"],
      },
      {
        title: "Follow the project rules",
        text: "Use branches, document decisions, keep credentials out of the browser, and let the Python bridge normalize data from 1C.",
      },
    ],
  },
  {
    id: "lesson-01",
    group: "Getting started",
    groupLabel: "Начало",
    number: "01",
    title: "Аккаунты и подписки",
    subtitle: "Подготовьте GitHub и аккаунт выбранного AI-инструмента перед установкой CLI.",
    minutes: "10 мин",
    level: "Начальный",
    complete: true,
    need: ["Аккаунт GitHub", "Аккаунт ChatGPT или Claude", "Выбранный маршрут: Codex CLI или Claude Code"],
    goal: "ученик создал GitHub-аккаунт и подготовил аккаунт выбранного AI-инструмента для дальнейшей установки CLI.",
    ui: {
      lang: "ru",
      courseTitle: "Уроки курса",
      progress: (completed, total) => `${completed} из ${total} завершено`,
      breadcrumbLesson: "Урок",
      byTheEnd: "Результат урока:",
      tocTitle: "На этой странице",
      needsTitle: "Понадобится",
      previous: "Предыдущий урок",
      next: "Следующий урок",
      markComplete: "Отметить завершённым",
      markedComplete: "Завершено",
    },
    steps: [
      {
        title: "Создайте аккаунт GitHub",
        text: "GitHub будет хранить код проекта, задачи, ветки и Pull Request. Зарегистрируйтесь или войдите в существующий аккаунт.",
        links: [
          {
            label: "Открыть GitHub",
            href: "https://github.com/",
          },
        ],
      },
      {
        title: "Подготовьте ChatGPT для работы с Codex CLI",
        text: "Зарегистрируйтесь или войдите в ChatGPT. Для подписочного маршрута курса можно использовать ChatGPT Plus или Pro. После установки Codex CLI нужно войти тем же аккаунтом ChatGPT.",
        links: [
          {
            label: "Открыть ChatGPT",
            href: "https://chatgpt.com/",
          },
          {
            label: "Условия подписок и лимиты",
            href: "https://learn.chatgpt.com/docs/pricing",
          },
        ],
      },
      {
        title: "Подготовьте Claude для работы с Claude Code",
        text: "Зарегистрируйтесь или войдите в Claude. Индивидуальные подписки Pro и Max поддерживают Claude Code. После установки CLI используется тот же аккаунт Claude.",
        links: [
          {
            label: "Открыть Claude",
            href: "https://claude.ai/",
          },
          {
            label: "Официальная инструкция",
            href: "https://code.claude.com/docs/en/authentication",
          },
        ],
      },
      {
        title: "Выберите один AI-инструмент",
        text: "Для прохождения курса достаточно выбрать один инструмент: Codex CLI или Claude Code. Покупать обе подписки не требуется. Подписка имеет лимиты использования; доступ через API оплачивается отдельно.",
      },
    ],
  },
  {
    id: "lesson-02",
    group: "Getting started",
    number: "02",
    title: "Инструменты и терминал",
    subtitle: "Install Git, GitHub CLI, Node.js, Python, Codex CLI, and Claude Code.",
    minutes: "20 мин",
    level: "Начальный",
    complete: true,
    need: ["PowerShell", "Internet connection", "Administrator install permission"],
    goal: "your machine will be ready for React, Python, GitHub, Codex, and Claude workflows.",
    steps: [
      {
        title: "Install Git and GitHub CLI",
        text: "Git manages local history. GitHub CLI creates repositories, opens pull requests, and authenticates from the terminal.",
        code: `winget install --id Git.Git --source winget
winget install --id GitHub.cli --source winget
gh auth login`,
      },
      {
        title: "Install Node.js and Python",
        text: "Node powers the React frontend. Python powers the bridge service between React and 1C.",
        code: `winget install --id OpenJS.NodeJS.LTS --source winget
winget install --id Python.Python.3.12 --source winget`,
      },
      {
        title: "Install AI coding CLIs",
        text: "Use Codex and Claude from the project root so each tool can inspect the same architecture.",
        code: `npm install -g @openai/codex
npm install -g @anthropic-ai/claude-code
codex --login
claude doctor`,
      },
    ],
  },
  {
    id: "lesson-03",
    group: "Getting started",
    number: "03",
    title: "Первый репозиторий GitHub",
    subtitle: "Create a repository, save your work, and push your first commit.",
    minutes: "15 мин",
    level: "Начальный",
    complete: false,
    need: ["Git installed", "GitHub account", "GitHub CLI"],
    goal: "your project will be on GitHub.",
    steps: [
      {
        title: "Sign in to GitHub",
        text: "Open your terminal and sign in with your browser.",
        code: "gh auth login",
      },
      {
        title: "Create your repository",
        text: "Create a public repository and push the current folder.",
        code: "gh repo create github_1c_web_lesons --public --source . --remote origin --push",
        ai: "Create a README for a React frontend, Python bridge, and 1C backend project.",
      },
      {
        title: "Save your first commit",
        text: "Stage all files, create a commit, and push it to the main branch.",
        code: `git add .
git commit -m "Add initial 1C React lesson site"
git push -u origin main`,
      },
      {
        title: "Check your result",
        text: "Open the repository and confirm the files are visible.",
        code: "gh repo view --web",
      },
    ],
  },
  {
    id: "lesson-04",
    group: "Getting started",
    number: "04",
    title: "Публикация на GitHub Pages",
    subtitle: "Turn the lesson repository into a public documentation website.",
    minutes: "12 мин",
    level: "Начальный",
    complete: false,
    need: ["GitHub repository", "Main branch", "Pages permission"],
    goal: "your lessons will be accessible from a public GitHub Pages URL.",
    steps: [
      {
        title: "Enable Pages",
        text: "Use GitHub CLI to enable Pages from the main branch root.",
        code: `gh api --method POST repos/<user>/<repo>/pages -f "source[branch]=main" -f "source[path]=/"`,
      },
      {
        title: "Open the site",
        text: "The first build may take a few minutes.",
        code: "https://<github-user>.github.io/<repository-name>/",
      },
      {
        title: "Update lessons through Git",
        text: "Every pushed change to the main branch rebuilds the GitHub Pages site.",
      },
    ],
  },
  {
    id: "lesson-05",
    group: "Build with AI",
    number: "05",
    title: "Структура проекта",
    subtitle: "Create the repeatable folders used in every React + Python + 1C project.",
    minutes: "18 мин",
    level: "Начальный",
    complete: false,
    need: ["Git branch", "Project folder", "Terminal"],
    goal: "your repository will have the standard architecture for all future projects.",
    steps: [
      {
        title: "Create folders",
        text: "Keep frontend, bridge, 1C, docs, and automation clearly separated.",
        code: `mkdir frontend
mkdir bridge
mkdir onec
mkdir docs
mkdir scripts
mkdir .github
mkdir .github\\workflows`,
      },
      {
        title: "Add environment templates",
        text: "Templates document required settings without storing real secrets.",
        code: `New-Item .env.example
New-Item frontend\\.env.example
New-Item bridge\\.env.example`,
      },
      {
        title: "Ask an AI agent to review structure",
        text: "Use AI for critique before application code exists.",
        ai: "Review this repository structure for a React frontend, Python bridge API, and 1C backend. Find missing folders or documentation.",
      },
    ],
  },
  {
    id: "lesson-06",
    group: "Build with AI",
    number: "06",
    title: "Работа с AI в коде",
    subtitle: "Use Codex CLI and Claude Code with branches, reviews, and focused prompts.",
    minutes: "16 мин",
    level: "Начальный",
    complete: false,
    need: ["Codex CLI", "Claude Code", "Clean Git status"],
    goal: "you will use AI tools without losing control of the repository.",
    steps: [
      {
        title: "Start from a branch",
        text: "Give AI tools a clean branch and a narrow task.",
        code: "git checkout -b feature/python-bridge-health-check",
      },
      {
        title: "Run Codex for implementation",
        text: "Codex can inspect files, edit code, and run checks from the repository root.",
        code: "codex",
      },
      {
        title: "Run Claude for review",
        text: "Claude is useful for second-pass architecture review and missing documentation checks.",
        code: "claude",
      },
    ],
  },
  {
    id: "lesson-07",
    group: "Build with AI",
    number: "07",
    title: "Создание фронтенда",
    subtitle: "Scaffold a React frontend with a clean API service layer.",
    minutes: "25 мин",
    level: "Средний",
    complete: false,
    need: ["Node.js", "npm", "Project structure"],
    goal: "your React app will be ready to call the Python bridge API.",
    steps: [
      {
        title: "Scaffold React",
        text: "Use Vite for fast local development.",
        code: `npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev`,
      },
      {
        title: "Add API base URL",
        text: "React should call the Python bridge, not 1C directly.",
        code: "VITE_API_BASE_URL=http://localhost:8000",
      },
      {
        title: "Create service functions",
        text: "Keep API calls out of page components so contracts are easy to test.",
      },
    ],
  },
  {
    id: "lesson-08",
    group: "Build with AI",
    number: "08",
    title: "Доработка фронтенда",
    subtitle: "Build predictable pages, forms, loading states, and API error states.",
    minutes: "22 мин",
    level: "Средний",
    complete: false,
    need: ["React app", "API contract", "Design conventions"],
    goal: "your frontend will be structured for real business workflows.",
    steps: [
      {
        title: "Create page layout",
        text: "Use routes for workflows and reusable components for repeated controls.",
      },
      {
        title: "Handle API states",
        text: "Every page that calls the bridge must handle loading, empty, success, and error states.",
      },
      {
        title: "Commit frontend work",
        text: "Keep frontend commits focused and reviewable.",
        code: `git add frontend
git commit -m "Add React frontend shell"`,
      },
    ],
  },
  {
    id: "lesson-09",
    group: "Connect to 1C",
    number: "09",
    title: "API Python-моста",
    subtitle: "Create a FastAPI service that normalizes requests between React and 1C.",
    minutes: "30 мин",
    level: "Средний",
    complete: false,
    need: ["Python", "Virtual environment", "FastAPI"],
    goal: "your bridge API will have a health endpoint and clear app settings.",
    steps: [
      {
        title: "Create virtual environment",
        text: "Keep Python dependencies local to the bridge folder.",
        code: `cd bridge
python -m venv .venv
.\\.venv\\Scripts\\Activate.ps1`,
      },
      {
        title: "Install FastAPI",
        text: "FastAPI provides typed endpoints and generated API docs.",
        code: "pip install fastapi uvicorn pydantic-settings",
      },
      {
        title: "Run the bridge",
        text: "Start the development server on port 8000.",
        code: "python -m uvicorn app.main:app --reload",
      },
    ],
  },
  {
    id: "lesson-10",
    group: "Connect to 1C",
    number: "10",
    title: "Серверные сессии",
    subtitle: "Implement login with a protected cookie and SQL-backed sessions.",
    minutes: "24 мин",
    level: "Средний",
    complete: false,
    need: ["FastAPI app", "SQL database", "DB Browser for SQLite", "HTTPS plan"],
    goal: "you will understand where the session token lives, how expiry works, and how logout revokes access.",
    steps: [
      {
        title: "Choose the session model",
        text: "For React and FastAPI on one domain, use login/password, a random opaque session token in a protected cookie, and a server-side session row in SQL.",
        code: `Browser
  -> random token in HttpOnly Secure SameSite=Lax cookie
FastAPI
  -> checks password, session, expiry, revocation and role
SQL users
  -> user, password hash, role, active flag
SQL sessions
  -> token hash, user, created_at, expires_at, revoked_at`,
      },
      {
        title: "Create login flow",
        text: "FastAPI verifies the password, creates a new session, stores only a token hash in SQL, and sends the original token only as a cookie.",
        code: `POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout`,
      },
      {
        title: "Set session policy",
        text: "Use an absolute maximum and an idle timeout so students can observe expiry and revocation in DB Browser.",
        code: `SESSION_ABSOLUTE_TTL_SECONDS=28800
SESSION_IDLE_TTL_SECONDS=1800
COOKIE_SECURE=true`,
      },
      {
        title: "Add security controls",
        text: "Use HTTPS, login rate limits, Argon2id password hashing, CSRF protection for changing requests, and safe error messages.",
        info: [
          "JavaScript does not read the secret token.",
          "Logout sets revoked_at and clears the cookie.",
          "Blocked users and password changes revoke existing sessions.",
          "OAuth2 and access/refresh JWT are not required for the first application.",
        ],
      },
      {
        title: "Verify in SQL",
        text: "Use DB Browser for SQLite in the training environment to inspect users, sessions, expiry, last activity and revocation.",
        ai: "Create a FastAPI lesson that demonstrates login, SQL-backed sessions, logout, idle timeout and DB Browser verification.",
      },
    ],
  },
  {
    id: "lesson-11",
    group: "Connect to 1C",
    number: "11",
    title: "HTTP-сервис 1C",
    subtitle: "Expose controlled 1C endpoints for the Python bridge service.",
    minutes: "28 мин",
    level: "Средний",
    complete: false,
    need: ["1C platform", "Test database", "Published HTTP service"],
    goal: "1C will expose a controlled integration endpoint for the bridge.",
    steps: [
      {
        title: "Choose the integration method",
        text: "Use HTTP services or OData first. Use COM or file exchange only when the project requires it.",
      },
      {
        title: "Define request and response shape",
        text: "The bridge expects stable JSON-like contracts, even if 1C internally uses different names.",
      },
      {
        title: "Store credentials in the bridge",
        text: "Do not store 1C credentials in frontend code.",
        code: `ONEC_BASE_URL=http://localhost:8080
ONEC_USERNAME=
ONEC_PASSWORD=`,
      },
    ],
  },
  {
    id: "lesson-12",
    group: "Connect to 1C",
    number: "12",
    title: "Интеграция и релиз",
    subtitle: "Wire React, Python, and 1C together, then prepare the first release.",
    minutes: "35 мин",
    level: "Средний",
    complete: false,
    need: ["Frontend build", "Bridge server", "1C endpoint"],
    goal: "the full stack will run end to end with documented release steps.",
    steps: [
      {
        title: "Test the full request path",
        text: "Confirm a browser action reaches React, the Python bridge, and the 1C service.",
      },
      {
        title: "Add logs and trace IDs",
        text: "A trace ID makes it easier to find the same request in frontend, bridge, and 1C logs.",
      },
      {
        title: "Create release documentation",
        text: "Write the commands needed to build, run, deploy, and rollback.",
      },
    ],
  },
];

const icons = {
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
  copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  level: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10m8 10V4m8 16v-7"/></svg>',
  target: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="1.8"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Zm7 13 .9 2.6 2.6.9-2.6.9L19 23l-.9-2.6-2.6-.9 2.6-.9L19 15ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z"/></svg>',
  arrowLeft: '<span aria-hidden="true">←</span>',
  arrowRight: '<span aria-hidden="true">→</span>',
};

const state = {
  lessonId: location.hash?.replace("#", "") || "project-overview",
};

const nav = document.querySelector("#lesson-nav");
const article = document.querySelector("#lesson-article");
const tocNav = document.querySelector("#toc-nav");
const needList = document.querySelector("#need-list");
const courseTitle = document.querySelector("#course-title");
const progressLabel = document.querySelector("#progress-label");
const tocTitle = document.querySelector("#toc-title");
const needsTitle = document.querySelector("#needs-title");
const progressFill = document.querySelector("#progress-fill");
const themeToggle = document.querySelector("#theme-toggle");

const savedTheme = localStorage.getItem("lesson-theme");
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
}

function getCompleted() {
  const stored = JSON.parse(localStorage.getItem("lesson-progress") || "{}");
  return Object.fromEntries(lessons.map((lesson) => [lesson.id, stored[lesson.id] ?? lesson.complete]));
}

function setCompleted(lessonId, value) {
  const progress = getCompleted();
  progress[lessonId] = value;
  localStorage.setItem("lesson-progress", JSON.stringify(progress));
}

function currentLesson() {
  return lessons.find((lesson) => lesson.id === state.lessonId) || lessons[0];
}

function groupedLessons() {
  return lessons.reduce((groups, lesson) => {
    groups[lesson.group] ||= [];
    groups[lesson.group].push(lesson);
    return groups;
  }, {});
}

function renderNav() {
  const progress = getCompleted();
  const groups = groupedLessons();
  nav.innerHTML = "";

  if (!Object.keys(groups).length) {
    nav.innerHTML = '<p class="empty-state">Нет доступных уроков.</p>';
    return;
  }

  Object.entries(groups).forEach(([group, groupLessons]) => {
    const section = document.createElement("section");
    section.className = "nav-group";
    section.innerHTML = `<h2 class="nav-group-title">${GROUP_LABELS[group] || group}</h2>`;

    groupLessons.forEach((lesson) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = [
        "lesson-link",
        lesson.id === state.lessonId ? "active" : "",
        progress[lesson.id] ? "complete" : "",
      ]
        .filter(Boolean)
        .join(" ");
      button.innerHTML = `
        <span class="lesson-status">${progress[lesson.id] || lesson.id === state.lessonId ? icons.check : ""}</span>
        <span class="lesson-index">${lesson.number}</span>
        <span class="lesson-title">${lesson.title}</span>
      `;
      button.addEventListener("click", () => selectLesson(lesson.id));
      section.appendChild(button);
    });

    nav.appendChild(section);
  });
}

function renderProgress() {
  const lesson = currentLesson();
  const progress = getCompleted();
  const completed = lessons.filter((lesson) => progress[lesson.id]).length;
  courseTitle.textContent = lesson.ui?.courseTitle || "Уроки курса";
  progressLabel.textContent = lesson.ui?.progress
    ? lesson.ui.progress(completed, lessons.length)
    : `${completed} из ${lessons.length} завершено`;
  progressFill.style.width = `${(completed / lessons.length) * 100}%`;
}

function renderArticle() {
  const lesson = currentLesson();
  const lessonIndex = lessons.findIndex((item) => item.id === lesson.id);
  const previous = lessons[lessonIndex - 1];
  const next = lessons[lessonIndex + 1];
  const progress = getCompleted();
  const ui = lesson.ui || {};
  const sectionLinks = lesson.steps
    .map((step, index) => `<a href="#${lesson.id}-step-${index + 1}">${step.title}</a>`)
    .join("");

  article.innerHTML = `
    <div class="breadcrumb">
      <span>${GROUP_LABELS[lesson.group] || lesson.group}</span>
      <span>/</span>
      <span>${ui.breadcrumbLesson || "Урок"} ${lesson.number}</span>
    </div>

    <div class="meta-row">
      <span class="pill">${icons.clock}${lesson.minutes}</span>
      <span class="pill">${icons.level}${lesson.level}</span>
    </div>

    <h1 class="lesson-title-main">${lesson.title}</h1>
    <p class="lesson-subtitle">${lesson.subtitle}</p>

    <div class="goal-banner">
      <div class="goal-icon">${icons.target}</div>
      <p><strong>${ui.byTheEnd || "Результат урока:"}</strong> ${lesson.goal}</p>
    </div>

    <section class="step-list">
      ${lesson.steps.map(renderStep(lesson)).join("")}
    </section>

    <footer class="lesson-footer">
      ${
        previous
          ? `<button class="plain-link" type="button" data-lesson="${previous.id}">${icons.arrowLeft} ${ui.previous || "Предыдущий урок"}</button>`
          : `<span></span>`
      }
      <button class="primary-action" id="complete-button" type="button">
        ${progress[lesson.id] ? ui.markedComplete || "Завершено" : ui.markComplete || "Отметить завершённым"} ${icons.arrowRight}
      </button>
      ${
        next
          ? `<button class="plain-link" type="button" data-lesson="${next.id}">${ui.next || "Следующий урок"} ${icons.arrowRight}</button>`
          : ""
      }
    </footer>
  `;

  tocTitle.textContent = ui.tocTitle || "На этой странице";
  needsTitle.textContent = ui.needsTitle || "Понадобится";
  tocNav.innerHTML = sectionLinks;
  needList.innerHTML = lesson.need.map((item) => `<li>${icons.check}<span>${item}</span></li>`).join("");

  article.querySelectorAll("[data-lesson]").forEach((button) => {
    button.addEventListener("click", () => selectLesson(button.dataset.lesson));
  });

  article.querySelector("#complete-button").addEventListener("click", () => {
    setCompleted(lesson.id, true);
    render();
    const nextLesson = lessons[lessonIndex + 1];
    if (nextLesson) {
      selectLesson(nextLesson.id);
    }
  });

  article.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(button.dataset.copy);
      const oldText = button.querySelector("span").textContent;
      button.querySelector("span").textContent = "Copied";
      window.setTimeout(() => {
        button.querySelector("span").textContent = oldText;
      }, 1000);
    });
  });
}

function renderStep(lesson) {
  return (step, index) => {
    const stepId = `${lesson.id}-step-${index + 1}`;
    return `
      <section class="step" id="${stepId}">
        <div class="step-number">${index + 1}</div>
        <div>
          <h2>${step.title}</h2>
          <p>${step.text}</p>
          ${step.code ? renderCode(step.code) : ""}
          ${step.ai ? renderAi(step.ai) : ""}
          ${step.info ? renderInfo(step.info) : ""}
          ${step.link ? renderLink(step.link) : ""}
          ${step.links ? renderLinks(step.links) : ""}
        </div>
      </section>
    `;
  };
}

function renderCode(code) {
  const escaped = escapeHtml(code);
  return `
    <div class="code-card">
      <div class="code-card-header">
        <span>Terminal</span>
        <button class="copy-button" type="button" data-copy="${escapeAttribute(code)}">${icons.copy}<span>Copy</span></button>
      </div>
      <pre><code>${escaped}</code></pre>
    </div>
  `;
}

function renderAi(prompt) {
  return `
    <div class="ai-card">
      ${icons.sparkle}
      <div>
        <h3>Try with your AI agent</h3>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <button class="copy-button" type="button" data-copy="${escapeAttribute(prompt)}">${icons.copy}<span>Copy</span></button>
    </div>
  `;
}

function renderInfo(items) {
  return `
    <div class="info-card">
      <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
  `;
}

function renderLink(link) {
  return `
    <a class="doc-link" href="${escapeAttribute(link.href)}" target="_blank" rel="noopener noreferrer">
      <span>${escapeHtml(link.label)}</span>
      ${icons.arrowRight}
    </a>
  `;
}

function renderLinks(links) {
  return `
    <div class="doc-link-row">
      ${links.map(renderLink).join("")}
    </div>
  `;
}

function selectLesson(lessonId) {
  state.lessonId = lessonId;
  history.replaceState(null, "", `#${lessonId}`);
  render();
  article.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function render() {
  document.documentElement.lang = currentLesson().ui?.lang || "ru";
  renderProgress();
  renderNav();
  renderArticle();
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("\n", "&#10;");
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "" : "dark";
  if (nextTheme) {
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("lesson-theme", nextTheme);
  } else {
    document.documentElement.removeAttribute("data-theme");
    localStorage.removeItem("lesson-theme");
  }
});

window.addEventListener("hashchange", () => {
  const hash = location.hash.replace("#", "");
  if (lessons.some((lesson) => lesson.id === hash)) {
    state.lessonId = hash;
    render();
  }
});

render();
