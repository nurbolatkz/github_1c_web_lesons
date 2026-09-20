const lessons = [
  {
    id: "project-overview",
    group: "Overview",
    number: "OV",
    title: "Project overview",
    subtitle: "От AI-прототипа до рабочего портала на React, FastAPI и 1C.",
    minutes: "12 min",
    level: "Overview",
    complete: true,
    need: ["Опыт разработки в 1C", "Понимание бизнес-документов", "Готовность работать через Git"],
    goal: "вы поймёте цель курса, учебный бизнес-сценарий, архитектуру и критерий выпуска ученика.",
    steps: [
      {
        title: "Цель курса",
        text: "Научить разработчика 1C создавать и сопровождать production веб-приложение с помощью AI coding agent, сохраняя бизнес-данные и бизнес-правила в 1C.",
        info: [
          "Курс ведётся на русском языке.",
          "Основная архитектура: React + TypeScript -> FastAPI -> HTTP-сервис 1C.",
          "Разработка выполняется в Windows, production React и FastAPI размещаются на Linux.",
          "Docker и Docker Compose пока не входят в базовый курс.",
        ],
      },
      {
        title: "Как преподавать разработчикам 1C",
        text: "Новые веб-понятия вводятся через знакомые 1C-задачи: документы, справочники, формы, права, транзакции и журнал регистрации.",
        code: `Форма списка        -> React list page
Форма объекта       -> Detail page и Create/Edit form
Форма выбора        -> ReferencePicker
Ссылка на объект    -> стабильный ID в API
Права доступа       -> permission + scope + состояние документа
Журнал регистрации  -> logs + request_id + бизнес-история`,
      },
      {
        title: "Учебный проект",
        text: "Вместо абстрактного каталога товаров используется бизнес-сценарий портала заявок на транспортировку.",
        code: `Заявка на транспортировку
  -> черновик
  -> отправка
  -> согласование или возврат
  -> исправление
  -> повторная отправка`,
      },
      {
        title: "Архитектурная граница",
        text: "React отвечает за интерфейс, FastAPI за контролируемый API и адаптацию, 1C за бизнес-данные, права и бизнес-правила.",
        code: `React SPA
  -> HTTPS /api
FastAPI bridge
  -> доверенный контекст и сервисный доступ
HTTP-сервис 1C
  -> документы, профили, роли, файлы, история`,
      },
      {
        title: "План курса",
        text: "Обновлённая программа расширяет курс до 24 коротких уроков в 6 блоках, чтобы production-навыки не оказались в одной перегруженной финальной главе.",
        info: [
          "I. Инструменты и командная работа",
          "II. Веб-основа, архитектура и первая интеграция",
          "III. Предметный интерфейс с AI",
          "IV. API, 1C и доступ",
          "V. Надёжный бизнес-сценарий",
          "VI. Проверка, production и самостоятельность",
        ],
      },
      {
        title: "Критерий выпуска ученика",
        text: "Ученик должен поставить AI-агенту ограниченную задачу, понять изменения, проверить их локально, провести через ветку и Pull Request, обновить production на Linux и подтвердить результат.",
        ai: "Составь план урока для разработчика 1C: один бизнес-сценарий, одна GitHub-задача, одна ветка, один проверяемый результат.",
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
    title: "Course overview",
    subtitle: "Understand the course goal, stack, project rules, and delivery order.",
    minutes: "8 min",
    level: "Beginner",
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
    number: "01",
    title: "Accounts & registration",
    subtitle: "Prepare the accounts needed for GitHub, AI coding tools, and project hosting.",
    minutes: "10 min",
    level: "Beginner",
    complete: true,
    need: ["GitHub account", "OpenAI account", "Anthropic account"],
    goal: "you will have the accounts required for repository work and AI-assisted coding.",
    steps: [
      {
        title: "Create or verify GitHub account",
        text: "GitHub stores the source code, pull requests, and GitHub Pages lesson site.",
        code: "https://github.com",
      },
      {
        title: "Prepare OpenAI access",
        text: "Codex CLI uses your OpenAI or ChatGPT sign-in to work from the terminal.",
        code: "codex --login",
      },
      {
        title: "Prepare Anthropic access",
        text: "Claude Code uses your Anthropic account or organization login.",
        code: "claude",
      },
    ],
  },
  {
    id: "lesson-02",
    group: "Getting started",
    number: "02",
    title: "Tools & terminal",
    subtitle: "Install Git, GitHub CLI, Node.js, Python, Codex CLI, and Claude Code.",
    minutes: "20 min",
    level: "Beginner",
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
    title: "First GitHub repository",
    subtitle: "Create a repository, save your work, and push your first commit.",
    minutes: "15 min",
    level: "Beginner",
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
    title: "Publish with GitHub Pages",
    subtitle: "Turn the lesson repository into a public documentation website.",
    minutes: "12 min",
    level: "Beginner",
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
    title: "Project structure",
    subtitle: "Create the repeatable folders used in every React + Python + 1C project.",
    minutes: "18 min",
    level: "Beginner",
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
    title: "AI coding workflow",
    subtitle: "Use Codex CLI and Claude Code with branches, reviews, and focused prompts.",
    minutes: "16 min",
    level: "Beginner",
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
    title: "Create the frontend",
    subtitle: "Scaffold a React frontend with a clean API service layer.",
    minutes: "25 min",
    level: "Intermediate",
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
    title: "Edit the frontend",
    subtitle: "Build predictable pages, forms, loading states, and API error states.",
    minutes: "22 min",
    level: "Intermediate",
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
    title: "Python bridge API",
    subtitle: "Create a FastAPI service that normalizes requests between React and 1C.",
    minutes: "30 min",
    level: "Intermediate",
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
    title: "1C HTTP service",
    subtitle: "Expose controlled 1C endpoints for the Python bridge service.",
    minutes: "28 min",
    level: "Intermediate",
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
    id: "lesson-11",
    group: "Connect to 1C",
    number: "11",
    title: "Connect & release",
    subtitle: "Wire React, Python, and 1C together, then prepare the first release.",
    minutes: "35 min",
    level: "Intermediate",
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
  query: "",
};

const nav = document.querySelector("#lesson-nav");
const article = document.querySelector("#lesson-article");
const tocNav = document.querySelector("#toc-nav");
const needList = document.querySelector("#need-list");
const completedCount = document.querySelector("#completed-count");
const totalCount = document.querySelector("#total-count");
const progressFill = document.querySelector("#progress-fill");
const searchInput = document.querySelector("#lesson-search");
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
  const filtered = lessons.filter((lesson) => {
    const haystack = `${lesson.group} ${lesson.number} ${lesson.title} ${lesson.subtitle}`.toLowerCase();
    return haystack.includes(state.query.toLowerCase());
  });
  return filtered.reduce((groups, lesson) => {
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
    nav.innerHTML = '<p class="empty-state">No lessons match your search.</p>';
    return;
  }

  Object.entries(groups).forEach(([group, groupLessons]) => {
    const section = document.createElement("section");
    section.className = "nav-group";
    section.innerHTML = `<h2 class="nav-group-title">${group}</h2>`;

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
  const progress = getCompleted();
  const completed = lessons.filter((lesson) => progress[lesson.id]).length;
  completedCount.textContent = completed;
  totalCount.textContent = lessons.length;
  progressFill.style.width = `${(completed / lessons.length) * 100}%`;
}

function renderArticle() {
  const lesson = currentLesson();
  const lessonIndex = lessons.findIndex((item) => item.id === lesson.id);
  const previous = lessons[lessonIndex - 1];
  const next = lessons[lessonIndex + 1];
  const progress = getCompleted();
  const sectionLinks = lesson.steps
    .map((step, index) => `<a href="#${lesson.id}-step-${index + 1}">${step.title}</a>`)
    .join("");

  article.innerHTML = `
    <div class="breadcrumb">
      <span>${lesson.group}</span>
      <span>/</span>
      <span>Lesson ${lesson.number}</span>
    </div>

    <div class="meta-row">
      <span class="pill">${icons.clock}${lesson.minutes}</span>
      <span class="pill">${icons.level}${lesson.level}</span>
    </div>

    <h1 class="lesson-title-main">${lesson.title}</h1>
    <p class="lesson-subtitle">${lesson.subtitle}</p>

    <div class="goal-banner">
      <div class="goal-icon">${icons.target}</div>
      <p><strong>By the end:</strong> ${lesson.goal}</p>
    </div>

    <section class="step-list">
      ${lesson.steps.map(renderStep(lesson)).join("")}
    </section>

    <footer class="lesson-footer">
      ${
        previous
          ? `<button class="plain-link" type="button" data-lesson="${previous.id}">${icons.arrowLeft} Previous lesson</button>`
          : `<span></span>`
      }
      <button class="primary-action" id="complete-button" type="button">
        ${progress[lesson.id] ? "Marked complete" : "Mark complete"} ${icons.arrowRight}
      </button>
      ${
        next
          ? `<button class="plain-link" type="button" data-lesson="${next.id}">Next lesson ${icons.arrowRight}</button>`
          : ""
      }
    </footer>
  `;

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
    <a class="doc-link" href="${escapeAttribute(link.href)}">
      <span>${escapeHtml(link.label)}</span>
      ${icons.arrowRight}
    </a>
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

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderNav();
});

window.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});

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
