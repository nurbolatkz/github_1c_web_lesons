const GROUP_LABELS = {
  Overview: "Обзор",
  "Getting started": "Начало и командная работа",
  "1C Objects": "1С и HTTP-сервис",
  "FastAPI SQL": "FastAPI и SQL",
  "React CRUD": "React и CRUD-интерфейс",
  Release: "Проверка и production",
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
    title: "Структура проекта и целевая архитектура",
    subtitle: "Создайте единую структуру для React, FastAPI, документации HTTP-сервисов 1С и автоматизации.",
    minutes: "20 мин",
    level: "Начальный",
    complete: true,
    need: ["Git", "PowerShell", "Node.js", "Python", "AI coding agent"],
    goal: "репозиторий будет иметь единую целевую архитектуру для всех будущих уроков.",
    steps: [
      {
        title: "Понять целевую архитектуру",
        text: "React не обращается к 1С напрямую. Все запросы проходят через FastAPI bridge.",
        code: `React frontend
    |
    | HTTP API
    v
FastAPI bridge
    |
    | HTTP-сервис 1С
    v
1C backend

Роли компонентов:

frontend/
- интерфейс пользователя;
- React-компоненты;
- запросы только к FastAPI.

bridge/
- FastAPI API;
- авторизация и сессии;
- проксирование запросов в 1С;
- нормализация ответов и ошибок.

onec/
- только Markdown-документация HTTP-сервисов 1С;
- контракты запросов и ответов;
- список маршрутов;
- правила авторизации.

1С-база и конфигурация не хранятся в этом репозитории.`,
      },
      {
        title: "Создать стандартные папки",
        text: "Одинаковая структура упрощает работу команды и AI-агента во всех следующих уроках.",
        code: `mkdir frontend
mkdir bridge
mkdir onec
mkdir onec\\http-services
mkdir docs
mkdir scripts
mkdir .github
mkdir .github\\workflows`,
      },
      {
        title: "Добавить шаблоны окружения",
        text: "Файлы .env.example описывают необходимые настройки, но не содержат реальные пароли и токены.",
        code: `New-Item .env.example
New-Item frontend\\.env.example
New-Item bridge\\.env.example

Пример корневого .env.example:

PROJECT_NAME=onec-integration-course
APP_ENV=local

Пример frontend\\.env.example:

VITE_API_BASE_URL=http://localhost:8000

Пример bridge\\.env.example:

ONEC_BASE_URL=http://localhost/onec-demo/hs/api
ONEC_LOGIN_PATH=/login
DATABASE_URL=sqlite+aiosqlite:///./data/bridge.db`,
      },
      {
        title: "Создать документацию HTTP-сервисов 1С",
        text: "Папка onec содержит только Markdown-файлы. Каждый HTTP-сервис описывается отдельным файлом.",
        code: `onec/
├── README.md
└── http-services/
    ├── authentication.md
    ├── products.md
    └── requests.md

Правило:

- один HTTP-сервис — один .md-файл;
- не добавлять .cf;
- не добавлять .dt;
- не добавлять .epf;
- не добавлять исходный код 1С;
- не добавлять выгрузку конфигурации;
- не добавлять пароли и токены.

Примеры назначения файлов:

authentication.md
- вход пользователя;
- получение access token;
- срок действия токена.

products.md
- CRUD товаров;
- маршруты;
- JSON-контракты.

requests.md
- работа с заявками;
- табличная часть;
- статусы и ошибки.`,
      },
      {
        title: "Создать индекс HTTP-сервисов",
        text: "Файл onec/README.md показывает, какие сервисы описаны в репозитории и где находится их документация.",
        code: `onec/README.md

# HTTP-сервисы 1С

Эта папка содержит только документацию и контракты
HTTP-сервисов опубликованной базы 1С.

## Сервисы

| Сервис | Файл | Назначение |
|---|---|---|
| Authentication | http-services/authentication.md | Авторизация и access token |
| Products | http-services/products.md | Работа с товарами |
| Requests | http-services/requests.md | Работа с заявками |

## Архитектура

React → FastAPI → HTTP-сервис 1С

## Важно

FastAPI и React не должны обращаться к 1С по произвольному URL.
Все маршруты должны быть заранее описаны и разрешены в контракте.`,
      },
      {
        title: "Использовать единый шаблон HTTP-сервиса",
        text: "Все Markdown-файлы HTTP-сервисов должны иметь одинаковую структуру.",
        code: `Шаблон файла:

# Название HTTP-сервиса

## Назначение

Кратко опишите, для чего нужен сервис.

## Базовый URL

Пример:

http://localhost/onec-demo/hs/api

## Авторизация

Опишите:

- тип авторизации;
- название заголовка;
- формат access token;
- кто определяет права пользователя.

## Маршруты

| Метод | Путь | Назначение |
|---|---|---|
| GET | /products | Список товаров |

## Запрос

Покажите только JSON-контракт без секретов.

## Ответ

Покажите успешный JSON-ответ.

## Ошибки

| HTTP-код | Значение |
|---|---|
| 400 | Неверные данные |
| 401 | Необходима авторизация |
| 403 | Недостаточно прав |
| 404 | Объект не найден |
| 500 | Ошибка 1С |

## Ограничения

Опишите ограничения, права и правила удаления.

## Проверка

Укажите порядок проверки через Postman или FastAPI.`,
      },
      {
        title: "Добавить правила Git",
        text: "Секреты, локальные базы и временные файлы не должны попадать в репозиторий.",
        code: `.gitignore

.env
.env.*
!.env.example

.venv/
__pycache__/
*.pyc

data/
*.db

node_modules/
dist/

*.log

# Локальные файлы 1С
*.cf
*.dt
*.epf
*.erf`,
      },
      {
        title: "Попросить AI-агента проверить структуру",
        text: "AI-агент должен проверять архитектуру и документацию, но не создавать исходный код конфигурации 1С.",
        code: `Проверьте:

- все ли обязательные папки существуют;
- есть ли .env.example;
- есть ли README в onec;
- каждый ли HTTP-сервис описан отдельным .md-файлом;
- нет ли секретов в Markdown;
- нет ли исходного кода 1С в репозитории;
- не обращается ли frontend напрямую к 1С;
- не смешаны ли бизнес-данные 1С с FastAPI SQL-моделями.`,
      },
      {
        title: "Prompt для Codex или Claude Code",
        text: "Передайте AI-агенту эту задачу, чтобы создать структуру и документацию за один проход.",
        content: [
          { type: "command", label: "Запустить Codex в корне репозитория", code: "codex" },
          { type: "command", label: "Или запустить Claude Code", code: "claude" },
          {
            type: "snippet",
            label: "Prompt для создания структуры и документации",
            body: `Ты работаешь в текущей папке репозитория.

Сначала изучи существующие файлы и структуру проекта.
Не изменяй файлы за пределами текущего репозитория.

Целевая архитектура:

React frontend → FastAPI bridge → HTTP-сервис 1С

React не должен обращаться к 1С напрямую.

Создай или проверь следующие папки:

frontend/
bridge/
onec/
onec/http-services/
docs/
scripts/
.github/
.github/workflows/

Создай следующие шаблоны:

.env.example
frontend/.env.example
bridge/.env.example

Создай или обнови:

onec/README.md

В папке onec/http-services создай отдельный Markdown-файл для каждого HTTP-сервиса:

onec/http-services/authentication.md
onec/http-services/products.md
onec/http-services/requests.md

Правила для папки onec:

1. Папка onec должна содержать только документацию HTTP-сервисов 1С.
2. Каждый HTTP-сервис описывается отдельным .md-файлом.
3. Не создавай и не добавляй:
   - код 1С;
   - конфигурацию .cf;
   - выгрузку .dt;
   - внешние обработки .epf;
   - внешние отчёты .erf;
   - секреты;
   - реальные токены;
   - пароли.
4. Не создавай бизнес-таблицы 1С в FastAPI.
5. Не добавляй прямые вызовы 1С из React.

Стандартная структура каждого Markdown-файла:

# Название HTTP-сервиса

## Назначение

## Базовый URL

## Авторизация

## Маршруты

## Формат запроса

## Формат успешного ответа

## Ошибки

## Ограничения

## Проверка через Postman

Не выдумывай маршруты и поля.
Если точный контракт неизвестен, добавь TODO и явно укажи, какие данные нужно получить от разработчика 1С.

Для authentication.md опиши:

- login endpoint;
- username и password;
- ответ success/message/token;
- срок действия access token;
- повторную авторизацию после истечения токена;
- запрет хранения пароля;
- формат передачи access token в FastAPI.

Для products.md опиши:

- GET списка товаров;
- GET одного товара;
- POST;
- PATCH;
- DELETE как пометку удаления;
- JSON-поля товара;
- ошибки 400, 401, 403, 404 и 500.

Для requests.md опиши:

- GET списка заявок;
- GET одной заявки;
- POST;
- PATCH;
- DELETE как пометку удаления;
- табличную часть товаров;
- обязательные поля;
- ошибки и ограничения.

Создай onec/README.md с таблицей:

| Сервис | Файл | Назначение |
|---|---|---|
| Authentication | http-services/authentication.md | Авторизация и access token |
| Products | http-services/products.md | Работа с товарами |
| Requests | http-services/requests.md | Работа с заявками |

Проверь:

1. frontend не содержит URL 1С.
2. bridge содержит только настройки подключения и API-код.
3. onec содержит только Markdown-документацию.
4. В репозитории нет паролей и access token.
5. Каждый сервис имеет отдельный .md-файл.
6. .env добавлен в .gitignore.
7. .env.example не содержит секретов.

После работы верни:

- итоговую структуру папок;
- список созданных файлов;
- список изменённых файлов;
- список найденных нарушений;
- какие HTTP-контракты требуют уточнения у разработчика 1С.

Не показывай реальные секреты, пароли или токены.`,
          },
          {
            type: "note",
            text: "Результат урока: репозиторий имеет единую архитектуру React → FastAPI → 1С, а папка onec/ содержит только Markdown-документацию HTTP-сервисов.",
          },
        ],
      },
    ],
  },
  {
    id: "lesson-01",
    group: "Getting started",
    number: "01",
    title: "Установка и CLI в Windows",
    subtitle: "Подготовьте аккаунты и установите Git, GitHub CLI, Node.js, Python, Codex CLI и Claude Code.",
    minutes: "40 мин",
    level: "Начальный",
    complete: true,
    need: ["Windows", "PowerShell", "Права администратора для установки"],
    goal: "у вас готовы аккаунты GitHub и AI-инструмента, а также установлены все CLI для React, Python, GitHub, Codex и Claude Code.",
    ui: {
      lang: "ru",
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
      {
        title: "Установите Git и GitHub CLI",
        text: "Git хранит историю изменений проекта. GitHub CLI позволяет работать с репозиториями, Pull Request и авторизацией прямо из PowerShell.",
        content: [
          { type: "command", label: "Установить Git", code: "winget install --id Git.Git --source winget" },
          { type: "command", label: "Установить GitHub CLI", code: "winget install --id GitHub.cli --source winget" },
          { type: "command", label: "Проверить Git", code: "git --version" },
          { type: "command", label: "Проверить GitHub CLI", code: "gh --version" },
          {
            type: "command",
            label: "Войти в GitHub CLI",
            code: "gh auth login",
            note: "Выберите GitHub.com, HTTPS и вход через браузер. После завершения проверьте, что авторизация прошла успешно.",
          },
          { type: "command", label: "Проверить авторизацию GitHub", code: "gh auth status" },
        ],
      },
      {
        title: "Установите Node.js и Python",
        text: "Node.js нужен для React-фронтенда. Python нужен для FastAPI bridge между React и 1С.",
        content: [
          { type: "command", label: "Установить Node.js LTS", code: "winget install --id OpenJS.NodeJS.LTS --source winget" },
          { type: "command", label: "Установить Python", code: "winget install --id Python.Python.3.12 --source winget" },
          { type: "command", label: "Проверить Node.js", code: "node --version" },
          { type: "command", label: "Проверить npm", code: "npm --version" },
          { type: "command", label: "Проверить Python", code: "python --version" },
          { type: "command", label: "Проверить Python через py", code: "py --version" },
          {
            type: "note",
            text: "После установки Node.js или Python перезапустите PowerShell, если команда ещё не распознаётся.",
          },
        ],
      },
      {
        title: "Установите Codex CLI",
        text: "Codex CLI помогает анализировать проект, изменять код, запускать проверки и работать с Git из корня репозитория.",
        content: [
          { type: "command", label: "Установить Codex CLI", code: "npm install -g @openai/codex" },
          { type: "command", label: "Войти в Codex через ChatGPT", code: "codex login" },
          { type: "command", label: "Проверить авторизацию Codex", code: "codex login status" },
          { type: "links", links: [{ label: "Официальная авторизация Codex", href: "https://chatgpt.com/" }] },
          {
            type: "note",
            text: "Для входа через подписку откройте ChatGPT в браузере и используйте тот же аккаунт при авторизации Codex CLI. API-ключи и API-биллинг относятся к отдельному способу доступа.",
          },
        ],
      },
      {
        title: "Установите Claude Code",
        text: "Claude Code — альтернативный AI coding agent для анализа проекта, написания кода и проверки изменений.",
        content: [
          { type: "command", label: "Установить Claude Code", code: "npm install -g @anthropic-ai/claude-code" },
          {
            type: "command",
            label: "Запустить вход в Claude Code",
            code: "claude",
            note: "При первом запуске Claude Code откроет браузер. Войдите через аккаунт Claude и вернитесь в PowerShell.",
          },
          { type: "links", links: [{ label: "Открыть Claude", href: "https://claude.ai/" }] },
          { type: "command", label: "Проверить установку Claude Code", code: "claude doctor" },
          { type: "links", links: [{ label: "Официальная инструкция Claude Code", href: "https://code.claude.com/docs/en/authentication" }] },
        ],
      },
      {
        title: "Проверьте установку",
        content: [
          { type: "command", label: "Проверить Git", code: "git --version" },
          { type: "command", label: "Проверить GitHub CLI", code: "gh --version" },
          { type: "command", label: "Проверить Node.js", code: "node --version" },
          { type: "command", label: "Проверить Python", code: "python --version" },
          { type: "command", label: "Проверить Codex CLI", code: "codex --version" },
          { type: "command", label: "Проверить Claude Code", code: "claude --version" },
          {
            type: "note",
            text: "Если все команды выполнились без ошибки, компьютер готов к созданию первого проекта. В следующем уроке мы создадим репозиторий и настроим ветку задачи.",
          },
        ],
      },
    ],
  },
  {
    id: "lesson-02",
    group: "Getting started",
    number: "02",
    title: "Репозиторий и ветка задачи",
    subtitle: "Создайте первый репозиторий GitHub и отдельную ветку для новой задачи.",
    minutes: "25 мин",
    level: "Начальный",
    complete: true,
    need: ["Установленный Git", "Аккаунт GitHub", "GitHub CLI"],
    goal: "ваш проект будет опубликован на GitHub, а для новой задачи создана отдельная ветка.",
    steps: [
      {
        title: "Войдите в GitHub",
        text: "Откройте PowerShell и войдите в GitHub через браузер.",
        content: [
          {
            type: "video",
            id: "JfpCicDUMKc",
            title: "Изучение GitHub в одном видео уроке за 15 минут!",
            label: "Видео: как пользоваться GitHub за 15 минут",
          },
          { type: "command", label: "Войти в GitHub CLI", code: "gh auth login" },
        ],
      },
      {
        title: "Создайте репозиторий",
        text: "Создайте публичный репозиторий и отправьте в него текущую папку.",
        content: [
          {
            type: "video",
            id: "IxyInsSqdGk",
            title: "Создание репозитория на GitHub",
            label: "Видео: как создать репозиторий",
          },
          { type: "command", label: "Создать репозиторий и отправить код", code: "gh repo create github_1c_web_lesons --public --source . --remote origin --push" },
          { type: "ai", prompt: "Создай README для проекта с React-фронтендом, Python-мостом и 1C-бэкендом." },
        ],
      },
      {
        title: "Сохраните первый коммит",
        text: "Добавьте все файлы, создайте коммит и отправьте его в ветку main.",
        content: [
          {
            type: "video",
            id: "ykjj1bLft3M",
            title: "Как сделать первый коммит и push в Git",
            label: "Видео: как сохранить первый коммит",
          },
          { type: "command", label: "Добавить все файлы", code: "git add ." },
          { type: "command", label: "Создать коммит", code: `git commit -m "Add initial 1C React lesson site"` },
          { type: "command", label: "Отправить в main", code: "git push -u origin main" },
        ],
      },
      {
        title: "Проверьте результат",
        text: "Откройте репозиторий и убедитесь, что файлы видны.",
        code: "gh repo view --web",
      },
      {
        title: "Создайте ветку задачи",
        text: "Одна задача должна иметь одну рабочую ветку. Используйте понятный префикс в названии ветки.",
        content: [
          {
            type: "video",
            id: "SZARWakrCro",
            title: "Как открыть и правильно закрыть issues",
            label: "Видео: зачем нужны Issues и как их правильно закрывать",
          },
          { type: "command", label: "Создать ветку задачи", code: "git switch -c feat/product-search" },
          {
            type: "snippet",
            label: "Правило именования веток",
            body: `Используйте формат:
feat/название-функции
fix/название-ошибки
docs/название-документации`,
          },
          {
            type: "snippet",
            label: "Примеры названий веток",
            body: `feat/product-search
fix/login-error
docs/setup-guide`,
          },
        ],
      },
    ],
  },
  {
    id: "lesson-03",
    group: "Getting started",
    number: "03",
    title: "Командная работа и AI",
    subtitle: "Научитесь выполнять задачу через Issue, Pull Request, ревью, безопасное объединение изменений и AI-агентов.",
    minutes: "35 мин",
    level: "Начальный",
    complete: true,
    need: ["Git и GitHub CLI", "Настроенный репозиторий", "Codex CLI или Claude Code"],
    goal: "вы сможете взять задачу, отправить изменения в GitHub, открыть Pull Request, пройти ревью, выполнить merge, безопасно отменить ошибочный коммит и использовать AI-агента в рамках задачи.",
    steps: [
      {
        title: "Начните с актуальной ветки main",
        text: "Перед каждой новой задачей обновите локальную ветку main. Не начинайте работу со старой версии проекта.",
        content: [
          {
            type: "video",
            id: "YVl8JUqR5JA",
            title: "Git — как совместно вести разработку одного проекта",
            label: "Видео: как команда совместно работает в Git",
          },
          { type: "command", label: "Перейти в папку проекта", code: "cd путь\\к\\проекту" },
          { type: "command", label: "Проверить состояние проекта", code: "git status" },
          { type: "command", label: "Перейти в main", code: "git switch main" },
          {
            type: "command",
            label: "Получить изменения из GitHub",
            code: "git pull --ff-only origin main",
            note: "Если в рабочей папке есть незаписанные изменения, сначала сохраните их в предыдущей ветке или временно уберите в stash. Не удаляйте изменения другой задачи.",
          },
        ],
      },
      {
        title: "Создайте Issue",
        text: "Одна задача должна иметь одну Issue и один Pull Request. Ветка main используется для согласованного состояния проекта.",
        content: [
          {
            type: "video",
            id: "wR3gXOiRm10",
            title: "Git branch — работа с ветками",
            label: "Видео: работа с ветками Git",
          },
          {
            type: "snippet",
            label: "Пример Issue",
            body: `Название: Добавить поиск товаров

Что нужно сделать:
- добавить поле поиска в реестр товаров;
- передавать поисковую строку в API;
- показать пустой результат;
- сохранить текущий стиль интерфейса.

Критерий готовности:
- поиск работает на desktop и mobile;
- существующие сценарии не сломались;
- проверка описана в Pull Request.`,
          },
        ],
      },
      {
        title: "Проверьте изменения перед коммитом",
        content: [
          { type: "command", label: "Проверить изменённые файлы", code: "git status" },
          { type: "command", label: "Посмотреть изменения", code: "git diff" },
          { type: "command", label: "Добавить выбранный файл", code: "git add путь\\к\\файлу" },
          { type: "command", label: "Проверить подготовленные изменения", code: "git diff --staged" },
          { type: "command", label: "Создать коммит", code: `git commit -m "feat: add product search"` },
          {
            type: "note",
            text: "Коммит должен описывать одно логическое изменение. Не добавляйте в него секреты, рабочие .env-файлы, node_modules, виртуальное окружение Python и случайные изменения других задач.",
          },
        ],
      },
      {
        title: "Отправьте ветку в удалённый репозиторий",
        content: [
          { type: "command", label: "Отправить новую ветку", code: "git push -u origin feat/product-search" },
          { type: "command", label: "Проверить ветку на GitHub", code: "gh browse" },
          {
            type: "note",
            text: "После push ветка появляется в GitHub. Ветка main ещё не изменена — изменения попадут туда только после Pull Request и merge.",
          },
        ],
      },
      {
        title: "Создайте Pull Request через GitHub",
        content: [
          {
            type: "steps",
            items: [
              "Откройте репозиторий GitHub.",
              "Перейдите во вкладку Pull requests.",
              "Нажмите New pull request.",
              "В качестве base выберите main.",
              "В качестве compare выберите свою ветку.",
              "Проверьте список изменённых файлов.",
              "Заполните описание: что требовалось, что изменилось, как проверялось локально и какие ограничения остались.",
              "Свяжите Pull Request с Issue.",
              "Нажмите Create pull request.",
            ],
          },
          {
            type: "snippet",
            label: "Шаблон описания Pull Request",
            body: `## Что сделано

-

## Как проверено

-

## Связанная задача

Closes #

## Что не проверено

- `,
          },
          {
            type: "command",
            label: "Создать Pull Request через GitHub CLI",
            code: "gh pr create --base main --head feat/product-search --web",
          },
        ],
      },
      {
        title: "Проверьте Pull Request",
        text: "Автор задачи проверяет, что интерфейс и API работают. Другой участник команды проверяет diff, границы изменения, обработку ошибок и соответствие Issue.",
        content: [
          {
            type: "steps",
            items: [
              "Откройте вкладку Files changed.",
              "Проверьте, что нет случайных файлов.",
              "Проверьте ошибки и пустые состояния.",
              "Проверьте, что секреты не попали в коммит.",
              "Проверьте desktop и mobile.",
              "Оставьте комментарий к конкретной строке.",
              "Нажмите Approve или Request changes.",
            ],
          },
          { type: "command", label: "Посмотреть список Pull Request", code: "gh pr list" },
          { type: "command", label: "Посмотреть изменения Pull Request", code: "gh pr diff" },
          { type: "command", label: "Проверить статус Pull Request", code: "gh pr checks" },
          { type: "command", label: "Открыть Pull Request в браузере", code: "gh pr view --web" },
          {
            type: "note",
            text: "Автор не должен самостоятельно подтверждать собственный Pull Request, если в проекте есть другой участник для ревью.",
          },
        ],
      },
      {
        title: "Исправьте замечания и объедините изменения",
        text: "Если ревьюер оставил замечания, исправьте их в той же ветке. Новый push автоматически обновит существующий Pull Request.",
        content: [
          { type: "command", label: "Отправить исправления", code: "git push" },
          {
            type: "note",
            text: "После одобрения Pull Request объединяется через сайт GitHub. В учебном проекте используйте Squash and merge.",
          },
          {
            type: "command",
            label: "Объединить одобренный Pull Request через CLI",
            code: "gh pr merge --squash --delete-branch",
          },
          {
            type: "note",
            text: "После merge обновите локальную main и только затем начинайте следующую задачу.",
          },
          { type: "command", label: "Перейти в main", code: "git switch main" },
          { type: "command", label: "Получить объединённые изменения", code: "git pull --ff-only origin main" },
        ],
      },
      {
        title: "Откатите ошибочный коммит",
        text: "Для уже опубликованного коммита используйте git revert. Он создаёт новый коммит, отменяющий ошибочное изменение, и сохраняет историю проекта.",
        content: [
          { type: "command", label: "Посмотреть историю", code: "git log --oneline" },
          { type: "command", label: "Создать коммит отмены", code: "git revert <commit-hash>" },
          { type: "command", label: "Отправить откат в GitHub", code: "git push origin main" },
          {
            type: "note",
            text: "Не используйте git reset --hard и git push --force для общей ветки main в рамках этого урока. Они могут удалить историю и изменения других участников.",
          },
          {
            type: "steps",
            items: [
              "Создать Issue «Откатить ошибочное изменение».",
              "Создать ветку fix/revert-product-search.",
              "Выполнить git revert.",
              "Отправить ветку.",
              "Открыть Pull Request.",
              "Провести ревью.",
              "Выполнить merge.",
            ],
          },
        ],
      },
      {
        title: "Разрешите конфликт слияния",
        text: "Конфликт возникает, когда две ветки изменили один и тот же фрагмент. Нельзя автоматически выбирать всю свою или всю чужую версию — итог нужно согласовать по смыслу задачи.",
        content: [
          { type: "command", label: "Получить сведения об удалённых ветках", code: "git fetch origin" },
          { type: "command", label: "Объединить актуальную main в свою ветку", code: "git merge origin/main" },
          {
            type: "steps",
            items: [
              "Откройте файл с маркерами конфликта.",
              "Сохраните правильный итоговый вариант.",
              "Удалите маркеры <<<<<<<, =======, >>>>>>>.",
              "Проверьте результат через git diff.",
              "Запустите локальные проверки.",
              "Добавьте исправленный файл.",
              "Создайте коммит merge.",
              "Отправьте ветку через git push.",
            ],
          },
          { type: "command", label: "Добавить исправленный файл", code: "git add путь\\к\\файлу" },
          { type: "command", label: "Завершить merge-коммит", code: `git commit -m "fix: resolve merge conflict"` },
          { type: "command", label: "Отправить разрешённый конфликт", code: "git push" },
          { type: "command", label: "Отменить незавершённый merge", code: "git merge --abort" },
        ],
      },
      {
        title: "Используйте AI в командной работе",
        text: "Давайте AI-инструментам чистую ветку и узкую задачу, чтобы результат было легко проверить в Pull Request.",
        content: [
          { type: "command", label: "Начать с чистой ветки", code: "git switch -c feature/python-bridge-health-check" },
          { type: "command", label: "Запустить Codex для реализации", code: "codex" },
          { type: "command", label: "Запустить Claude для ревью", code: "claude" },
        ],
      },
      {
        title: "Итоговый чек-лист",
        content: [
          {
            type: "checklist",
            items: [
              "Я создал Issue.",
              "Я создал отдельную ветку от актуальной main.",
              "Я проверил git diff перед коммитом.",
              "Я отправил ветку в GitHub.",
              "Я открыл Pull Request через сайт или GitHub CLI.",
              "Другой участник проверил изменения.",
              "Я исправил замечания в той же ветке.",
              "Pull Request объединён через Squash and merge.",
              "Я умею обновить локальную main.",
              "Я умею отменить ошибочный коммит через git revert.",
              "Я понимаю, как разрешается merge conflict.",
              "Я использовал AI-агента в рамках задачи.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "lesson-04",
    group: "1C Objects",
    number: "04",
    title: "Учебные объекты 1С",
    subtitle: "Создайте справочник «Товары» и документ «Заявка» для учебного CRUD.",
    minutes: "25 мин",
    level: "Начальный",
    complete: false,
    need: ["Учебная база 1С", "Конфигуратор 1С", "Права на изменение конфигурации"],
    goal: "в 1С будут созданы справочник и документ с понятной структурой, которые будут использоваться в HTTP-сервисе и React-интерфейсе.",
    steps: [
      {
        title: "Создать справочник «Товары»",
        text: "В Конфигураторе создайте справочник для хранения товаров. Стандартные поля «Код» и «Наименование» оставьте включёнными.",
        code: `Справочник: Товары

Стандартные поля:
- Код
- Наименование

Реквизит:
- ЕдиницаИзмерения — Строка, 20 символов`,
      },
      {
        title: "Создать документ «Заявка»",
        text: "Документ будет содержать стандартные номер и дату, а также комментарий пользователя.",
        code: `Документ: Заявка

Стандартные поля:
- Номер
- Дата

Реквизит:
- Комментарий — Строка, 200 символов`,
      },
      {
        title: "Добавить табличную часть",
        text: "В документе создайте табличную часть «Товары» для выбора товаров и указания количества.",
        code: `Табличная часть: Товары

Колонки:
- Товар — СправочникСсылка.Товары
- Количество — Число, 15.3`,
      },
      {
        title: "Добавить базовую проверку",
        text: "Перед сохранением заявки проверьте заполнение обязательных полей и корректность количества.",
        code: `Правила проверки:

- Наименование товара не пустое
- В заявке есть хотя бы одна строка
- Товар выбран из справочника
- Количество больше нуля
- Товар с пометкой удаления нельзя выбирать для новой заявки`,
      },
      {
        title: "Проверить объекты в 1С",
        text: "Создайте тестовые данные и убедитесь, что объекты корректно открываются, изменяются и сохраняются.",
        code: `Проверка:

1. Создать два товара.
2. Создать заявку с двумя строками.
3. Изменить количество и комментарий.
4. Сохранить и открыть заявку повторно.
5. Проверить данные в списке и форме объекта.`,
      },
      {
        title: "Использовать пометку удаления",
        text: "Физически не удаляйте записи. Для удаления товара или заявки используйте пометку удаления, чтобы сохранить историю и ссылочную целостность.",
        code: `Удаление в учебном проекте:

- использовать «Пометить на удаление»;
- не удалять данные физически;
- не помечать товар, если это нарушает проверяемый сценарий;
- проверить, как помеченный товар отображается в списке.`,
      },
      {
        title: "Зафиксировать контракт для API",
        text: "До создания HTTP-сервиса зафиксируйте имена объектов и полей. Эти названия будут использоваться в FastAPI и React.",
        code: `API-контракт:

Товары:
- id
- code
- name
- unit

Заявка:
- id
- number
- date
- comment
- items[].product_id
- items[].quantity`,
      },
    ],
  },
  {
    id: "lesson-05",
    group: "1C Objects",
    number: "05",
    title: "HTTP-сервис и CRUD в 1С",
    subtitle: "Создайте HTTP-сервис 1С для работы Python-моста с товарами и заявками.",
    minutes: "25 мин",
    level: "Средний",
    complete: false,
    need: ["Объекты из урока 04", "Конфигуратор 1С", "Понимание HTTP и JSON"],
    goal: "HTTP-сервис 1С будет готов принимать CRUD-запросы для справочника «Товары» и документа «Заявка».",
    steps: [
      {
        title: "Создать HTTP-сервис",
        text: "В конфигурации 1С создайте HTTP-сервис с базовым именем api. В этом уроке используется только HTTP-сервис 1С.",
        code: `HTTP-сервис: api

Логические маршруты:
- products
- products/{id}
- requests
- requests/{id}

Публикация базы выполняется в уроке 06.`,
      },
      {
        title: "Определить формат товара",
        text: "Зафиксируйте единый JSON-контракт для справочника «Товары». Идентификатор передаётся строкой.",
        code: `Товар:

{
  "id": "uuid",
  "code": "000001",
  "name": "Кабель",
  "unit": "шт",
  "marked_for_deletion": false
}`,
      },
      {
        title: "Создать CRUD для товаров",
        text: "Добавьте отдельные обработчики HTTP-методов для чтения, создания, изменения и пометки удаления товаров.",
        code: `GET    /products
GET    /products/{id}
POST   /products
PATCH  /products/{id}
DELETE /products/{id}

DELETE выполняет пометку удаления,
а не физическое удаление записи.`,
      },
      {
        title: "Определить формат заявки",
        text: "Документ «Заявка» возвращается вместе с табличной частью товаров.",
        code: `Заявка:

{
  "id": "uuid",
  "number": "000000001",
  "date": "2026-09-20",
  "comment": "Учебная заявка",
  "items": [
    {
      "product_id": "uuid",
      "product_name": "Кабель",
      "quantity": 2
    }
  ]
}`,
      },
      {
        title: "Создать CRUD для заявок",
        text: "Добавьте HTTP-обработчики для списка, просмотра, создания, изменения и пометки удаления документа.",
        code: `GET    /requests
GET    /requests/{id}
POST   /requests
PATCH  /requests/{id}
DELETE /requests/{id}`,
      },
      {
        title: "Проверять запросы и ошибки",
        text: "Каждый обработчик должен проверять JSON, обязательные поля, идентификатор и количество строк в заявке.",
        code: `Успешные ответы:

200 OK       чтение и изменение
201 Created  создание
204 No Content пометка удаления

Ошибки:

400 Bad Request  неверный JSON
404 Not Found    объект не найден
409 Conflict     нельзя выполнить операцию
500 Server Error внутренняя ошибка 1С`,
      },
      {
        title: "Зафиксировать контракт для FastAPI",
        text: "FastAPI будет использовать эти маршруты как адаптер. React не обращается к 1С напрямую.",
        code: `React → FastAPI → HTTP-сервис 1С

На этом уроке:
- создаём только HTTP-сервис 1С;
- фиксируем JSON;
- реализуем CRUD;
- не создаём FastAPI;
- не настраиваем production-публикацию.`,
      },
      {
        title: "Сгенерировать черновик модуля обработчиков через AI",
        text: "Папка onec/ в репозитории содержит только Markdown-документацию и не хранит исходный код 1С. AI-агент может подготовить черновик текста общего модуля — обычного файла .bsl, как типовые модули вроде ЗагрузкаКонвертацияВалюты.bsl, — но сохранять его нужно вне репозитория и вставлять код в Конфигураторе вручную.",
        content: [
          { type: "command", label: "Запустить Codex в корне репозитория", code: "codex" },
          { type: "command", label: "Или запустить Claude Code", code: "claude" },
          {
            type: "snippet",
            label: "Prompt для черновика ОбработкаЗапросовHTTPСервисаAPI.bsl",
            body: `Ты работаешь в текущем репозитории (frontend, bridge, onec, docs).

Папка onec/ содержит только Markdown-документацию HTTP-сервисов 1С.
Не создавай и не сохраняй файлы конфигурации 1С внутри репозитория —
ни в onec/, ни в других папках.

Подготовь только текст черновика общего модуля 1С, который разработчик
сам скопирует в Конфигуратор. Выведи код прямо в ответе, не создавая
файл в репозитории.

Название модуля:

ОбработкаЗапросовHTTPСервисаAPI

Разработчик сохранит этот текст как обычный модуль
ОбработкаЗапросовHTTPСервисаAPI.bsl внутри 1С — так же, как
типовой модуль ЗагрузкаКонвертацияВалюты.bsl.

Модуль должен экспортировать функции-обработчики для HTTP-сервиса api:

1. ПолучитьСписокТоваров(Запрос)
2. ПолучитьТовар(Запрос, Идентификатор)
3. СоздатьТовар(Запрос)
4. ИзменитьТовар(Запрос, Идентификатор)
5. ПометитьТоварНаУдаление(Запрос, Идентификатор)

6. ПолучитьСписокЗаявок(Запрос)
7. ПолучитьЗаявку(Запрос, Идентификатор)
8. СоздатьЗаявку(Запрос)
9. ИзменитьЗаявку(Запрос, Идентификатор)
10. ПометитьЗаявкуНаУдаление(Запрос, Идентификатор)

Требования:

- Каждая функция принимает HTTPЗапрос и возвращает HTTPСервисОтвет.
- Формируй тело ответа в формате JSON (используй ЗаписатьJSON/ЧтениеJSON или аналогичные штатные механизмы).
- Формат товара и заявки должен точно соответствовать контракту:
  Товар: id, code, name, unit, marked_for_deletion
  Заявка: id, number, date, comment, items[].product_id, items[].product_name, items[].quantity
- Идентификатор (id) — строковое представление UUID ссылки.
- Удаление всегда выполняется через УстановитьПометкуУдаления(Истина), физическое удаление запрещено.
- При отсутствии объекта возвращай HTTP 404 с телом { "error": { "code": "not_found", "message": "..." } }.
- При ошибке в теле запроса возвращай HTTP 400 с тем же форматом ошибки.
- Не обращайся к внешним ресурсам и не используй COM.
- Не добавляй HTTP-сервис, публикацию и настройки IIS — они уже созданы в этом и следующем уроке.
- Не переименовывай существующие объекты конфигурации.

После генерации опиши:
- список созданных экспортных функций;
- как подключить модуль к шаблонам HTTP-сервиса api (Конфигуратор → HTTP-сервисы → api → шаблоны → обработчик);
- что нужно проверить вручную перед публикацией.`,
          },
          {
            type: "note",
            text: "AI-агент не имеет доступа к конфигурации 1С и не сохраняет файлы конфигурации в репозитории. Код модуля нужно скопировать из ответа агента и вставить в Конфигураторе, а затем вручную подключить обработчик к шаблону HTTP-сервиса.",
          },
        ],
      },
    ],
  },
  {
    id: "lesson-06",
    group: "1C Objects",
    number: "06",
    title: "Публикация базы и HTTP-сервиса",
    subtitle: "Опубликуйте базу 1С и проверьте CRUD через Postman.",
    minutes: "30 мин",
    level: "Средний",
    complete: false,
    need: ["Учебная база 1С", "Созданный HTTP-сервис api", "IIS или локальный веб-сервер", "Postman"],
    goal: "база 1С и HTTP-сервис будут доступны по URL, а все CRUD-методы будут проверены через Postman.",
    steps: [
      {
        title: "Опубликовать базу 1С",
        text: "Используйте стандартную публикацию 1С на веб-сервере Windows. Для учебного проекта достаточно IIS и локального доступа.",
        code: `Параметры публикации:

Имя публикации: onec-demo
HTTP-сервис: api
Пример URL:

http://localhost/onec-demo/hs/api

После публикации 1С создаёт файл default.vrd.`,
      },
      {
        title: "Проверить базовый адрес",
        text: "Сформируйте один BASE_URL и используйте его во всех запросах Postman.",
        code: `BASE_URL =
http://localhost/onec-demo/hs/api

Проверка:

GET {{baseUrl}}/ping
или
GET {{baseUrl}}/products

Ожидаемый результат:
HTTP 200 и JSON-ответ.`,
      },
      {
        title: "Создать Postman environment",
        text: "Создайте отдельное окружение для локальной публикации. Секреты не записывайте в Git.",
        code: `Переменные Postman:

baseUrl   http://localhost/onec-demo/hs/api
productId
requestId
token

В запросах используйте:

{{baseUrl}}/products`,
      },
      {
        title: "Подготовить коллекцию через AI",
        text: "Передайте AI-агенту фактический URL, методы HTTP, примеры JSON и результат проверки. Агент должен вернуть готовый Postman Collection JSON.",
        code: `Ты создаёшь Postman Collection v2.1 для HTTP-сервиса 1С.

BASE_URL:
[вставьте опубликованный URL]

Маршруты:
[вставьте методы и пути из HTTP-сервиса]

Пример ответа:
[вставьте фактический JSON из Postman или 1С]

Требования:
1. Создай переменную baseUrl.
2. Добавь папки Health, Products и Requests.
3. Добавь GET, POST, PATCH и DELETE для доступных маршрутов.
4. DELETE должен проверять пометку удаления, а не физическое удаление.
5. Добавь Postman-тесты статуса, JSON и обязательных полей.
6. После POST сохрани id в productId или requestId.
7. Не выдумывай поля и маршруты.
8. Если данных недостаточно, добавь TODO.
9. Верни только чистый JSON Collection v2.1 без пояснений и Markdown.`,
      },
      {
        title: "Импортировать коллекцию в Postman",
        text: "Сохраните результат AI-агента в файл и импортируйте его в Postman.",
        code: `1. Сохраните ответ в файл:
   onec-api.postman_collection.json

2. Откройте Postman.
3. Нажмите Import.
4. Выберите файл коллекции.
5. Выберите окружение 1C Local.
6. Проверьте значение baseUrl.
7. Не добавляйте реальные пароли в файл коллекции.`,
      },
      {
        title: "Проверить методы визуально",
        text: "Запускайте запросы по порядку и смотрите ответ во вкладке Body → Pretty. Результаты проверок отображаются во вкладке Test Results.",
        code: `Порядок проверки:

1. GET /ping
2. GET /products
3. POST /products
4. GET /products/{id}
5. PATCH /products/{id}
6. DELETE /products/{id}
7. GET /requests
8. POST /requests
9. PATCH /requests/{id}
10. DELETE /requests/{id}

Проверяйте:
- HTTP-статус;
- JSON-структуру;
- id и номер;
- изменённые значения;
- marked_for_deletion.`,
      },
      {
        title: "Исправить типовые ошибки",
        text: "Проверьте URL публикации, имя HTTP-сервиса и доступность IIS.",
        code: `404 — неверный путь публикации или маршрут.
401/403 — ошибка доступа или авторизации.
400 — неверный JSON или обязательное поле.
409 — бизнес-конфликт.
500 — ошибка обработчика 1С.

Смотрите Postman Console и журнал регистрации 1С.`,
      },
      {
        title: "Зафиксировать результат",
        text: "Сохраните коллекцию и документацию рядом с проектом. Секреты и локальные пароли в Git не добавляйте.",
        code: `Документы проекта:

postman/
├── onec-api.postman_collection.json
└── onec-local.postman_environment.example.json

В README укажите:
- URL публикации;
- имя HTTP-сервиса;
- список маршрутов;
- порядок проверки;
- ожидаемые статусы.`,
      },
    ],
  },
  {
    id: "lesson-07",
    group: "1C Objects",
    number: "07",
    title: "Конфигурация .env",
    subtitle: "Настройте подключение FastAPI к HTTP-сервису 1С без хранения секретов в коде.",
    minutes: "15 мин",
    level: "Начальный",
    complete: false,
    need: ["Проект FastAPI", "Опубликованный HTTP-сервис 1С", "Git и PowerShell"],
    goal: "FastAPI будет получать адрес и учётные данные 1С из переменных окружения, а секреты не попадут во frontend и Git.",
    steps: [
      {
        title: "Что такое .env",
        text: "Файл .env хранит настройки приложения, которые отличаются на компьютере разработчика, тестовом сервере и production. FastAPI читает эти значения при запуске.",
        code: `.env — локальные настройки приложения.

Пример:

ONEC_BASE_URL=http://localhost/onec-demo/hs/api
ONEC_AUTH_MODE=basic
ONEC_USERNAME=
ONEC_PASSWORD=
ONEC_TIMEOUT_SECONDS=15

Файл .env не публикуется и не передаётся в браузер.`,
      },
      {
        title: "Что такое .gitignore",
        text: "Файл .gitignore сообщает Git, какие файлы нельзя добавлять в коммиты. В него нужно добавить .env и другие локальные секреты.",
        code: `.gitignore

.env
.env.*
!.env.example
__pycache__/
*.pyc
.venv/
node_modules/`,
      },
      {
        title: "Создать безопасный шаблон",
        text: "Файл .env.example хранится в репозитории, но содержит только имена параметров и пустые значения.",
        code: `.env.example

APP_ENV=local
ONEC_BASE_URL=http://localhost/onec-demo/hs/api
ONEC_AUTH_MODE=basic
ONEC_USERNAME=
ONEC_PASSWORD=
ONEC_TIMEOUT_SECONDS=15
DATABASE_URL=sqlite:///./data/app.db
SESSION_TTL_MINUTES=60`,
      },
      {
        title: "Создать локальный .env",
        text: "Скопируйте шаблон и заполните значения только на своём компьютере.",
        code: `Copy-Item .env.example .env

notepad .env

Заполните ONEC_USERNAME и ONEC_PASSWORD
локальными учётными данными технического пользователя 1С.`,
      },
      {
        title: "Проверить Git",
        text: "Убедитесь, что .env игнорируется и не отображается как новый файл.",
        code: `git check-ignore -v .env
git status --short

.env должен быть проигнорирован,
а .env.example должен отображаться в Git.`,
      },
      {
        title: "Правила безопасности",
        text: "Секреты нельзя хранить во frontend, исходном коде, Postman-коллекции, README, логах и сообщениях AI-агенту.",
        code: `Важно:

- не добавлять .env в Git;
- не вставлять пароль в React;
- не отправлять пароль в логи;
- использовать отдельного технического пользователя 1С;
- ограничить права этого пользователя;
- использовать HTTPS в production;
- менять пароль при подозрении на утечку;
- хранить production .env только на Linux-сервере.

Если .env уже попал в Git,
удалите его из истории и смените секреты.`,
      },
      {
        title: "Проверить запуск FastAPI",
        text: "После изменения .env перезапустите backend и убедитесь, что настройки загружаются без вывода секретов.",
        code: `python -m uvicorn app.main:app --reload

Проверьте:
- FastAPI запускается;
- адрес 1С читается из .env;
- пароль не отображается в терминале;
- запрос к HTTP-сервису 1С использует правильный URL.`,
      },
    ],
  },
  {
    id: "lesson-08",
    group: "FastAPI SQL",
    number: "08",
    title: "FastAPI: авторизация и сессия 1С",
    subtitle: "Создайте FastAPI-мост, который авторизует пользователя в 1С и передаёт access token в защищённых запросах.",
    minutes: "35 мин",
    level: "Средний",
    complete: false,
    need: [
      "Python 3.12",
      "Опубликованный HTTP-сервис 1С",
      "Эндпоинт авторизации 1С",
      "Файл .env",
      "SQLite или PostgreSQL",
      "Git",
    ],
    goal: "FastAPI будет создавать локальную сессию пользователя, хранить только данные авторизации и передавать access token в 1С при каждом защищённом запросе.",
    steps: [
      {
        title: "Создать виртуальное окружение",
        text: "Все Python-зависимости проекта должны находиться внутри папки bridge.",
        code: `cd bridge
python -m venv .venv
.\\.venv\\Scripts\\Activate.ps1`,
      },
      {
        title: "Установить зависимости",
        text: "FastAPI отвечает за API, SQLAlchemy — за таблицы авторизации, HTTPX — за запросы к 1С, а cryptography — за безопасное хранение токена.",
        code: `python -m pip install --upgrade pip

pip install fastapi "uvicorn[standard]" pydantic-settings httpx sqlalchemy aiosqlite cryptography

pip freeze > requirements.txt`,
      },
      {
        title: "Понять границы FastAPI",
        text: "FastAPI не хранит товары, заявки и другие бизнес-данные. Эти данные остаются в 1С.",
        code: `React → FastAPI → HTTP-сервис 1С

FastAPI хранит только:

1. auth_users
   - локальный id
   - username
   - идентификатор пользователя в 1С
   - статус пользователя

2. auth_sessions
   - хеш локального session token
   - пользователь
   - дата создания
   - срок действия
   - дата последней активности
   - revoked_at

3. onec_tokens
   - пользователь
   - зашифрованный access token
   - дата получения
   - срок действия
   - статус токена

FastAPI НЕ создаёт таблицы:

- products
- requests
- documents
- warehouses
- business_records`,
      },
      {
        title: "Настроить переменные окружения",
        text: "FastAPI получает адрес 1С и параметры сессии из .env. Пароли пользователей не хранятся в .env и базе данных.",
        code: `.env.example

ONEC_BASE_URL=http://localhost/onec-demo/hs/api
ONEC_LOGIN_PATH=/login
ONEC_TOKEN_HEADER=Authorization
ONEC_TIMEOUT_SECONDS=15

DATABASE_URL=sqlite+aiosqlite:///./data/bridge.db

SESSION_COOKIE_NAME=bridge_session
SESSION_TTL_SECONDS=28800
SESSION_IDLE_TIMEOUT_SECONDS=1800
SESSION_COOKIE_SECURE=false
SESSION_COOKIE_SAMESITE=lax

TOKEN_ENCRYPTION_KEY=change-me-in-local-env

Не добавляйте:

ONEC_USERNAME=
ONEC_PASSWORD=

Логин и пароль вводит пользователь.
FastAPI передаёт их в 1С только во время авторизации.`,
      },
      {
        title: "Создать авторизацию через 1С",
        text: "При входе React передаёт username и password в FastAPI. FastAPI отправляет их в login-эндпоинт 1С.",
        code: `POST /api/auth/login

Запрос в FastAPI:

{
  "username": "student01",
  "password": "user-password"
}

FastAPI отправляет в 1С:

POST {{ONEC_BASE_URL}}/login

{
  "username": "student01",
  "password": "user-password"
}

Пример ответа 1С:

{
  "success": true,
  "message": "Успешная авторизация",
  "token": "access-token-from-1c",
  "expires_in": 3600,
  "user_id": "123"
}

Фактические имена полей должны соответствовать контракту HTTP-сервиса 1С.`,
      },
      {
        title: "Создать локальную сессию",
        text: "После успешной авторизации FastAPI сохраняет пользователя, access token и локальную сессию.",
        code: `После успешного ответа 1С:

1. Создать или обновить запись auth_users.
2. Сохранить access token в onec_tokens.
3. Сохранить срок действия токена.
4. Создать случайный session token.
5. Сохранить только хеш session token.
6. Передать session token в HttpOnly cookie.

Ответ FastAPI:

{
  "success": true,
  "user": {
    "username": "student01",
    "onec_user_id": "123"
  },
  "session_expires_at": "2026-09-20T23:00:00Z"
}

Access token 1С не возвращается в React.`,
      },
      {
        title: "Передавать access token в 1С",
        text: "Каждый защищённый запрос сначала проверяет локальную сессию, затем FastAPI передаёт access token в HTTP-сервис 1С.",
        code: `Браузер отправляет:

Cookie: bridge_session=<local-session-token>

FastAPI отправляет в 1С:

Authorization: Bearer <onec-access-token>

1С по access token определяет:

- пользователя;
- его роли;
- доступные объекты;
- разрешённые действия;
- статус запроса.

React не обращается к 1С напрямую и не хранит access token 1С.`,
      },
      {
        title: "Обработать истечение токена",
        text: "Если access token истёк, FastAPI не должен хранить пароль пользователя для автоматического входа.",
        code: `Сценарий:

1. FastAPI проверяет срок действия токена.
2. Если токен истёк — запрос в 1С не выполняется.
3. Если 1С вернула 401 — токен помечается истёкшим.
4. FastAPI возвращает frontend:

HTTP 401

{
  "error": {
    "code": "reauth_required",
    "message": "Требуется повторная авторизация"
  }
}

5. React показывает форму входа.
6. Пользователь снова вводит только username и password.
7. FastAPI повторяет авторизацию через 1С и создаёт новый токен.

Пароль пользователя не сохраняется в SQL, логах, cookie или response.`,
      },
      {
        title: "Создать служебные маршруты",
        text: "На этом уроке создаются только маршруты авторизации, сессии и проверки защищённого запроса.",
        code: `GET    /health
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
GET    /api/onec/ping

/api/onec/ping — защищённый тестовый запрос.
Он отправляется в 1С с access token текущего пользователя.

Маршруты products и requests будут добавлены в следующем уроке.
Они также не будут иметь собственных таблиц в FastAPI.`,
      },
      {
        title: "Проверить ошибки и безопасность",
        text: "Скрывайте внутренние ошибки FastAPI и 1С от браузера.",
        code: `Ошибки:

401 Unauthorized
- неверный логин или пароль;
- отсутствует локальная сессия;
- истёк access token.

403 Forbidden
- пользователь авторизован, но у него нет права.

502 Bad Gateway
- 1С недоступна.

504 Gateway Timeout
- 1С не ответила вовремя.

Важно:

- не показывать access token в response;
- не записывать пароль и токен в логи;
- использовать HttpOnly cookie;
- хранить session token только в виде хеша;
- хранить access token зашифрованным;
- включить HTTPS в production;
- использовать SESSION_COOKIE_SECURE=true на сервере.`,
      },
      {
        title: "Запустить и проверить FastAPI",
        text: "Проверьте локальную авторизацию через Swagger или Postman.",
        code: `python -m compileall app

python -m uvicorn app.main:app --reload

Проверки:

http://127.0.0.1:8000/docs
http://127.0.0.1:8000/health

Порядок проверки:

1. POST /api/auth/login
2. GET /api/auth/me
3. GET /api/onec/ping
4. POST /api/auth/logout
5. Повторить GET /api/auth/me
6. Проверить ответ 401 после logout`,
      },
      {
        title: "Prompt для Codex или Claude Code",
        text: "Запускайте AI-агента внутри папки bridge, где находится Python-проект.",
        content: [
          { type: "command", label: "Перейти в папку bridge", code: "cd bridge" },
          { type: "command", label: "Запустить Codex", code: "codex" },
          { type: "command", label: "Или запустить Claude Code", code: "claude" },
          {
            type: "snippet",
            label: "Prompt для AI-агента",
            body: `Ты работаешь в текущей папке bridge.

Сначала изучи существующие файлы и структуру проекта.
Не изменяй frontend, конфигурацию 1С и файлы за пределами текущей папки.

Предыдущая версия урока ошибочно добавляла CRUD для products и requests.
В этой задаче FastAPI должен быть только authentication/session bridge к 1С.

Главное правило:

React → FastAPI → HTTP-сервис 1С

FastAPI не хранит бизнес-таблицы и не обращается к 1С напрямую из React.

Создай минимальный рабочий FastAPI-проект со следующими возможностями:

1. Установи зависимости:

- fastapi
- uvicorn
- pydantic-settings
- httpx
- sqlalchemy
- aiosqlite
- cryptography

2. Создай структуру:

app/
├── main.py
├── db.py
├── core/
│   ├── settings.py
│   └── security.py
├── models/
│   ├── auth_user.py
│   ├── auth_session.py
│   └── onec_token.py
├── clients/
│   ├── onec_auth_client.py
│   └── onec_client.py
├── services/
│   └── auth_service.py
├── routers/
│   ├── health.py
│   ├── auth.py
│   └── onec_proxy.py
└── schemas/
    ├── auth.py
    └── common.py

3. Настройки должны загружаться из .env:

ONEC_BASE_URL
ONEC_LOGIN_PATH
ONEC_TOKEN_HEADER
ONEC_TIMEOUT_SECONDS

DATABASE_URL

SESSION_COOKIE_NAME
SESSION_TTL_SECONDS
SESSION_IDLE_TIMEOUT_SECONDS
SESSION_COOKIE_SECURE
SESSION_COOKIE_SAMESITE

TOKEN_ENCRYPTION_KEY

Не добавляй ONEC_USERNAME и ONEC_PASSWORD.
Пароль вводит пользователь во время login и не сохраняется.

4. Создай только таблицы авторизации:

auth_users:

- id
- username
- onec_user_id
- is_active
- created_at
- updated_at

auth_sessions:

- id
- user_id
- session_token_hash
- created_at
- last_seen_at
- expires_at
- revoked_at

onec_tokens:

- id
- user_id
- encrypted_access_token
- issued_at
- expires_at
- revoked_at

Не создавай таблицы:

- products
- requests
- documents
- warehouses
- orders
- business records

Не создавай SQL-модели для данных 1С.

5. Создай POST /api/auth/login.

Request:

{
  "username": "student01",
  "password": "password"
}

FastAPI должен:

- принять username и password;
- отправить их в 1С через ONEC_LOGIN_PATH;
- не записывать пароль в базу;
- не записывать пароль в логи;
- проверить success в ответе 1С;
- получить token;
- получить expires_in, если поле существует;
- сохранить access token зашифрованным;
- создать или обновить auth_users;
- создать auth_sessions;
- установить HttpOnly cookie;
- не возвращать access token в response.

Ожидаемый контракт 1С по умолчанию:

{
  "success": true,
  "message": "Успешная авторизация",
  "token": "token-from-1c",
  "expires_in": 3600,
  "user_id": "123"
}

Не выдумывай другие поля.
Если фактический контракт 1С отличается, вынеси различие в отдельный адаптер и добавь TODO.

6. Создай маршруты:

GET  /health
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
GET  /api/onec/ping

GET /api/onec/ping должен быть защищён локальной сессией.

7. Реализуй проверку локальной сессии:

- прочитать session token из HttpOnly cookie;
- вычислить его хеш;
- найти auth_sessions;
- проверить revoked_at;
- проверить expires_at;
- проверить idle timeout;
- найти пользователя;
- найти активный onec_tokens;
- расшифровать access token только на сервере.

8. Реализуй запрос к 1С:

Для каждого защищённого запроса добавляй access token:

Authorization: Bearer <access-token>

Если ONEC_TOKEN_HEADER отличается от Authorization, используй значение из настроек.

Не передавай access token в React.
Не принимай URL 1С от браузера.
URL 1С должен приходить только из .env.

9. Обработай истечение access token:

Если локальный срок токена истёк или 1С вернула 401:

- пометь onec_tokens.revoked_at;
- не пытайся входить в 1С с сохранённым паролем;
- не делай бесконечные повторы;
- верни HTTP 401;
- верни код ошибки reauth_required;
- frontend должен повторно вызвать POST /api/auth/login.

Формат:

{
  "error": {
    "code": "reauth_required",
    "message": "Требуется повторная авторизация"
  }
}

10. Реализуй logout:

- установить revoked_at для локальной сессии;
- удалить или очистить cookie;
- не удалять пользователя из auth_users;
- не удалять бизнес-данные в 1С.

11. Реализуй GET /api/auth/me.

Пример ответа:

{
  "authenticated": true,
  "user": {
    "username": "student01",
    "onec_user_id": "123"
  },
  "session_expires_at": "2026-09-20T23:00:00Z"
}

Не возвращай:

- password;
- access token;
- encrypted_access_token;
- внутренние секреты;
- полный traceback.

12. Реализуй GET /api/onec/ping.

Этот маршрут должен:

- проверить локальную сессию;
- получить access token текущего пользователя;
- отправить запрос в заранее заданный путь 1С;
- передать access token;
- вернуть безопасный JSON-ответ;
- не возвращать токен.

Не создавай универсальный прокси с произвольным URL.
Не принимай путь 1С от клиента без allowlist.

13. Нормализуй ошибки:

401:
- неверный логин;
- отсутствует сессия;
- сессия завершена;
- access token истёк.

403:
- пользователь не имеет права.

502:
- 1С недоступна.

504:
- истёк timeout запроса к 1С.

500:
- внутренняя ошибка FastAPI.

Ошибки должны иметь вид:

{
  "error": {
    "code": "onec_unavailable",
    "message": "Сервис 1С временно недоступен",
    "request_id": "..."
  }
}

14. Безопасность:

- session token создавать через secrets.token_urlsafe;
- в базе хранить только хеш session token;
- access token хранить зашифрованным;
- не хранить пароль пользователя;
- не писать пароль и access token в логи;
- не возвращать access token в React;
- использовать HttpOnly cookie;
- использовать Secure cookie в production;
- добавить безопасный SameSite;
- не добавлять OAuth;
- не добавлять SSO;
- не добавлять Basic Auth с техническим пользователем;
- не добавлять Docker;
- не добавлять бизнес-таблицы.

15. Добавь .env.example без секретов:

ONEC_BASE_URL=http://localhost/onec-demo/hs/api
ONEC_LOGIN_PATH=/login
ONEC_TOKEN_HEADER=Authorization
ONEC_TIMEOUT_SECONDS=15

DATABASE_URL=sqlite+aiosqlite:///./data/bridge.db

SESSION_COOKIE_NAME=bridge_session
SESSION_TTL_SECONDS=28800
SESSION_IDLE_TIMEOUT_SECONDS=1800
SESSION_COOKIE_SECURE=false
SESSION_COOKIE_SAMESITE=lax

TOKEN_ENCRYPTION_KEY=replace-in-local-env

16. Проверь проект:

python -m compileall app

python -m uvicorn app.main:app --reload

Проверь:

http://127.0.0.1:8000/docs
http://127.0.0.1:8000/health

Не используй реальные пароли и токены при демонстрации результата.

Если в проекте уже существуют products.py, requests.py или бизнес-модели от старой версии, не удаляй их молча. Не подключай их к main.py, опиши их в итоговом отчёте как устаревшие или неиспользуемые.

После работы верни:

1. список созданных и изменённых файлов;
2. структуру таблиц авторизации;
3. описание login/session/token flow;
4. список маршрутов;
5. команды проверки;
6. найденные ограничения;
7. что нужно сделать в следующем уроке.

Не показывай значения паролей, токенов и ключей.`,
          },
          {
            type: "note",
            text: "Результат урока: FastAPI авторизует пользователя через 1С, создаёт локальную сессию и передаёт access token в 1С. Товары, заявки и другие бизнес-данные остаются только в 1С.",
          },
        ],
      },
    ],
  },
  {
    id: "lesson-09",
    group: "FastAPI SQL",
    number: "09",
    title: "SQL-база и DB Browser",
    subtitle: "Создайте таблицы пользователей и сессий для авторизации через 1С.",
    minutes: "25 мин",
    level: "Средний",
    complete: false,
    need: ["FastAPI-проект из урока 08", "SQLite", "DB Browser for SQLite", "Опубликованный HTTP-сервис авторизации 1С"],
    goal: "создать только таблицы users и sessions, сохранять локальную сессию пользователя и проверять её состояние через DB Browser.",
    steps: [
      {
        title: "Понять поток авторизации",
        text: "Пароль проверяет 1С. FastAPI только передаёт credentials в 1С, получает access token и создаёт локальную сессию.",
        code: `React
    |
    | username + password
    v
FastAPI
    |
    | credentials
    v
1C login HTTP-service
    |
    | access_token
    v
FastAPI создаёт HttpOnly session cookie

После входа:

React → FastAPI
FastAPI → 1C с access token текущего пользователя
1C определяет пользователя, роль и права

FastAPI не хранит бизнес-данные.
Товары и заявки остаются в 1С.`,
      },
      {
        title: "Создать таблицу users",
        text: "Таблица users хранит только локальную связь с пользователем 1С. Пароль и роль в эту таблицу не добавляются.",
        code: `Таблица: users

Поля:

- id
- username
- onec_user_id
- is_active
- created_at
- updated_at

Не хранить:

- password
- password_hash
- role
- access_token
- бизнес-данные

Пароль проверяется только в 1С.
Роли и права принадлежат 1С.`,
      },
      {
        title: "Создать таблицу sessions",
        text: "Таблица sessions связывает локальную cookie-сессию с пользователем и access token 1С.",
        code: `Таблица: sessions

Поля:

- id
- user_id
- session_token_hash
- onec_access_token_ciphertext
- onec_token_expires_at
- created_at
- last_activity_at
- expires_at
- revoked_at

session_token_hash:
- хеш случайного токена из cookie.

onec_access_token_ciphertext:
- зашифрованный access token 1С;
- не возвращается в React;
- не записывается в логи.

onec_token_expires_at:
- срок действия access token 1С.

revoked_at:
- время отзыва сессии после logout.`,
      },
      {
        title: "Настроить срок действия сессии",
        text: "Сессия должна иметь абсолютный срок действия и idle timeout.",
        code: `.env

SESSION_ABSOLUTE_TTL_SECONDS=28800
SESSION_IDLE_TTL_SECONDS=1800
SESSION_COOKIE_NAME=bridge_session
SESSION_COOKIE_SECURE=false
SESSION_COOKIE_SAMESITE=lax

Абсолютный срок:
- максимальная продолжительность сессии — 8 часов.

Idle timeout:
- если пользователь не выполнял запросы 30 минут, сессия завершается.

В production:

SESSION_COOKIE_SECURE=true

Cookie должна быть:

- HttpOnly;
- Secure;
- SameSite=Lax.`,
      },
      {
        title: "Создать сессию после входа",
        text: "После успешной авторизации в 1С FastAPI сохраняет пользователя, токен и локальную сессию.",
        code: `POST /api/auth/login

1. React отправляет username и password в FastAPI.
2. FastAPI передаёт credentials в 1С.
3. 1С возвращает access token.
4. FastAPI создаёт или обновляет users.
5. FastAPI сохраняет зашифрованный access token в sessions.
6. FastAPI создаёт случайный session token.
7. В SQL сохраняется только хеш session token.
8. Session token отправляется в HttpOnly cookie.

Пароль пользователя не сохраняется.`,
      },
      {
        title: "Проверять сессию в защищённом запросе",
        text: "Каждый запрос к 1С должен использовать access token текущего пользователя.",
        code: `1. FastAPI получает bridge_session из cookie.
2. Находит хеш токена в sessions.
3. Проверяет revoked_at.
4. Проверяет expires_at.
5. Проверяет last_activity_at.
6. Получает access token 1С.
7. Отправляет запрос в 1С:

Authorization: Bearer <onec-access-token>

Если access token истёк, FastAPI возвращает:

HTTP 401

{
  "error": {
    "code": "reauth_required",
    "message": "Требуется повторная авторизация"
  }
}

FastAPI не хранит пароль для автоматического повторного входа.`,
      },
      {
        title: "Реализовать logout",
        text: "Logout отзывает сессию в SQL и удаляет cookie браузера.",
        code: `POST /api/auth/logout

Действия FastAPI:

1. Найти текущую сессию.
2. Установить revoked_at.
3. Очистить bridge_session cookie.
4. Не удалять пользователя из users.
5. Не удалять данные в 1С.

После logout запрос:

GET /api/auth/me

должен вернуть HTTP 401.`,
      },
      {
        title: "Открыть базу в DB Browser",
        text: "Проверьте структуру таблиц и состояние сессий визуально.",
        code: `1. Запустите FastAPI и выполните login.
2. Найдите файл:

data/bridge.db

3. Откройте его в DB Browser for SQLite.
4. Откройте вкладку Database Structure.
5. Убедитесь, что существуют только:

- users
- sessions

6. Откройте Browse Data.
7. Проверьте:

users:
- username;
- onec_user_id;
- is_active;
- created_at.

sessions:
- user_id;
- created_at;
- last_activity_at;
- expires_at;
- onec_token_expires_at;
- revoked_at.

Access token должен храниться зашифрованным.
Не копируйте его в сообщения, логи или frontend.`,
      },
      {
        title: "Проверить сессии SQL-запросами",
        text: "Используйте вкладку Execute SQL в DB Browser для проверки срока действия и отзыва сессий.",
        code: `Пользователи:

SELECT
  id,
  username,
  onec_user_id,
  is_active,
  created_at
FROM users;

Активные сессии:

SELECT
  id,
  user_id,
  created_at,
  last_activity_at,
  expires_at,
  onec_token_expires_at,
  revoked_at
FROM sessions
WHERE revoked_at IS NULL;

Отозванные сессии:

SELECT
  id,
  user_id,
  revoked_at
FROM sessions
WHERE revoked_at IS NOT NULL;`,
      },
      {
        title: "Проверить безопасность",
        text: "SQL хранит только состояние авторизации. Бизнес-данные и роли остаются в 1С.",
        code: `Обязательные правила:

- не хранить пароль;
- не хранить password_hash;
- не хранить роль в users;
- не возвращать access token в React;
- не записывать token в логи;
- хранить session token только в виде хеша;
- шифровать access token 1С;
- использовать HttpOnly cookie;
- использовать HTTPS в production;
- применять rate limit для login;
- защищать изменяющие запросы от CSRF;
- отзывать сессии заблокированного пользователя.`,
      },
      {
        title: "Prompt для Codex или Claude Code",
        text: "Запускайте AI-агента внутри папки bridge, где находится Python-проект.",
        content: [
          { type: "command", label: "Перейти в папку bridge", code: "cd bridge" },
          { type: "command", label: "Запустить Codex", code: "codex" },
          { type: "command", label: "Или запустить Claude Code", code: "claude" },
          {
            type: "snippet",
            label: "Prompt для реализации users/sessions",
            body: `Ты работаешь в текущей папке bridge.

Сначала изучи существующую структуру проекта.
Не изменяй frontend, конфигурацию 1С и файлы за пределами текущей папки.

Создай урок 09 для FastAPI-проекта:

«SQL-база и DB Browser»

Архитектура:

React → FastAPI → HTTP-сервис 1С

Главное правило:

- пароль проверяет 1С;
- FastAPI не хранит пароль;
- роли и права принадлежат 1С;
- FastAPI хранит только локального пользователя и сессии;
- товары, заявки и другие бизнес-данные не хранятся в SQL FastAPI.

Используй ровно две таблицы:

1. users
2. sessions

Не создавай дополнительные таблицы:
- onec_tokens;
- products;
- requests;
- roles;
- permissions;
- documents;
- warehouses;
- business records.

Таблица users:

- id
- username
- onec_user_id
- is_active
- created_at
- updated_at

Не добавляй в users:

- password;
- password_hash;
- role;
- access_token.

Таблица sessions:

- id
- user_id;
- session_token_hash;
- onec_access_token_ciphertext;
- onec_token_expires_at;
- created_at;
- last_activity_at;
- expires_at;
- revoked_at.

Требования к login:

POST /api/auth/login

1. Получить username и password.
2. Передать credentials в HTTP-сервис авторизации 1С.
3. Получить access token.
4. Создать или обновить пользователя в users.
5. Зашифровать access token.
6. Создать запись sessions.
7. Создать случайный session token через secrets.token_urlsafe.
8. Сохранить в SQL только хеш session token.
9. Установить HttpOnly cookie.
10. Не возвращать access token в React.
11. Не хранить пароль.
12. Не писать password и token в логи.

Cookie:

- HttpOnly=true;
- Secure берётся из настроек;
- SameSite=Lax;
- имя берётся из SESSION_COOKIE_NAME.

Добавь настройки:

DATABASE_URL=sqlite+aiosqlite:///./data/bridge.db
SESSION_COOKIE_NAME=bridge_session
SESSION_ABSOLUTE_TTL_SECONDS=28800
SESSION_IDLE_TTL_SECONDS=1800
SESSION_COOKIE_SECURE=false
SESSION_COOKIE_SAMESITE=lax

Реализуй:

GET /health
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me

Проверка сессии должна:

- прочитать cookie;
- вычислить хеш;
- найти session;
- проверить revoked_at;
- проверить expires_at;
- проверить last_activity_at;
- проверить активность пользователя;
- получить access token 1С;
- передать access token в защищённый запрос к 1С.

Передача токена в 1С:

Authorization: Bearer <onec-access-token>

Если access token 1С истёк:

- вернуть HTTP 401;
- использовать код reauth_required;
- не хранить пароль;
- не выполнять бесконечные повторы;
- не создавать новую сессию автоматически без повторного login.

Logout должен:

- установить revoked_at;
- очистить cookie;
- оставить пользователя в users;
- не удалять данные в 1С.

Добавь простой idle timeout:

- SESSION_IDLE_TTL_SECONDS=1800;
- если last_activity_at слишком старый, вернуть HTTP 401;
- использовать код session_idle_timeout;
- не раскрывать внутренние детали.

Добавь миграцию или безопасное создание этих двух таблиц.
Не используй SQLAlchemy create_all как единственный способ изменения уже существующей схемы, если в проекте уже настроены миграции.

Проверь:

python -m compileall app

python -m uvicorn app.main:app --reload

Проверь login, me и logout через Swagger или Postman.

После login открой базу:

data/bridge.db

В DB Browser for SQLite проверь:

- Database Structure;
- таблицы users и sessions;
- created_at;
- last_activity_at;
- expires_at;
- onec_token_expires_at;
- revoked_at.

Access token должен быть зашифрованным.
Не показывай его в response, логах или итоговом отчёте.

Добавь безопасные ошибки:

401:
{
  "error": {
    "code": "unauthorized",
    "message": "Требуется авторизация"
  }
}

401 после истечения токена:

{
  "error": {
    "code": "reauth_required",
    "message": "Требуется повторная авторизация"
  }
}

После работы верни:

- список изменённых файлов;
- структуру users;
- структуру sessions;
- описание login flow;
- описание logout flow;
- команды проверки;
- результаты проверки DB Browser;
- найденные ограничения.

Не показывай пароли, access token, session token или ключ шифрования.`,
          },
          {
            type: "note",
            text: "Результат урока: FastAPI использует ровно две SQL-таблицы — users и sessions. Пароль проверяется в 1С, access token передаётся в 1С, а состояние локальной сессии можно проверить через DB Browser.",
          },
        ],
      },
    ],
  },
  {
    id: "lesson-10",
    group: "FastAPI SQL",
    number: "10",
    title: "Вход и серверная сессия",
    subtitle: "Реализуйте вход через 1С с защищённой cookie и серверной сессией в SQL.",
    minutes: "25 мин",
    level: "Средний",
    complete: false,
    need: [
      "FastAPI-проект из урока 09",
      "Таблицы users и sessions",
      "HTTP-сервис авторизации 1С",
      "SQLite",
      "DB Browser for SQLite",
    ],
    goal: "понять, где хранится локальный session token, как FastAPI создаёт сессию и как проверяет вход пользователя без хранения пароля.",
    steps: [
      {
        title: "Понять flow входа",
        text: "Пользователь вводит credentials в React. FastAPI передаёт их в 1С, получает access token и создаёт локальную серверную сессию.",
        code: `React
    |
    | username + password
    v
FastAPI
    |
    | credentials
    v
1C authentication service
    |
    | access_token
    v
FastAPI создаёт session cookie

После входа:

React → FastAPI
FastAPI → 1C с access token пользователя
1C определяет пользователя, роль и права

Важно:

- пароль проверяет 1С;
- FastAPI пароль не хранит;
- роль принадлежит 1С;
- React не получает access token 1С;
- бизнес-данные остаются в 1С.`,
      },
      {
        title: "Создать POST /api/auth/login",
        text: "Маршрут принимает username и password, отправляет их в 1С и создаёт локальную сессию после успешного ответа.",
        code: `POST /api/auth/login

Запрос в FastAPI:

{
  "username": "student01",
  "password": "user-password"
}

FastAPI отправляет credentials в 1С:

POST {{ONEC_BASE_URL}}/login

{
  "username": "student01",
  "password": "user-password"
}

Пример ответа 1С:

{
  "success": true,
  "message": "Успешная авторизация",
  "token": "access-token-from-1c",
  "expires_in": 3600,
  "user_id": "123"
}

После успешного ответа:

1. Создать или обновить users.
2. Создать случайный session token.
3. Сохранить в sessions только хеш session token.
4. Сохранить access token 1С зашифрованным.
5. Установить HttpOnly cookie.`,
      },
      {
        title: "Настроить защищённую cookie",
        text: "Исходный session token не попадает в SQL и не доступен JavaScript. Он хранится только в cookie браузера.",
        code: `Cookie:

Name: bridge_session
HttpOnly: true
Secure: true в production
SameSite: Lax

Локально:

SESSION_COOKIE_SECURE=false

В production:

SESSION_COOKIE_SECURE=true

FastAPI отправляет:

Set-Cookie: bridge_session=<random-token>

SQL хранит только:

hash(bridge_session)

React не должен читать cookie через document.cookie.`,
      },
      {
        title: "Проверять GET /api/auth/me",
        text: "Маршрут подтверждает, что текущая cookie связана с действующей серверной сессией.",
        code: `GET /api/auth/me

FastAPI:

1. Читает bridge_session cookie.
2. Вычисляет хеш токена.
3. Находит запись в sessions.
4. Проверяет revoked_at.
5. Проверяет expires_at.
6. Проверяет idle timeout.
7. Проверяет активность пользователя.
8. Возвращает безопасные данные пользователя.

Успешный ответ:

{
  "authenticated": true,
  "user": {
    "username": "student01",
    "onec_user_id": "123"
  },
  "session_expires_at": "2026-09-20T23:00:00Z"
}

Не возвращать:

- password;
- session token;
- access token 1С;
- encrypted token;
- внутренние SQL-поля.`,
      },
      {
        title: "Передавать access token в 1С",
        text: "Каждый защищённый запрос из FastAPI в 1С использует access token текущего пользователя.",
        code: `FastAPI находит зашифрованный access token
в текущей записи sessions и отправляет:

Authorization: Bearer <onec-access-token>

1С по токену определяет:

- пользователя;
- роль;
- доступные права;
- разрешённые действия;
- статус запроса.

React не отправляет access token напрямую в 1С.`,
      },
      {
        title: "Проверять срок действия сессии",
        text: "Сессия завершается по абсолютному сроку или после длительного бездействия.",
        code: `Параметры:

SESSION_ABSOLUTE_TTL_SECONDS=28800
SESSION_IDLE_TTL_SECONDS=1800

Абсолютный TTL:
- сессия действует не более 8 часов.

Idle timeout:
- после 30 минут без запросов сессия завершается.

Если сессия истекла:

HTTP 401

{
  "error": {
    "code": "session_expired",
    "message": "Сессия завершена"
  }
}

Если access token 1С истёк:

HTTP 401

{
  "error": {
    "code": "reauth_required",
    "message": "Требуется повторная авторизация"
  }
}

FastAPI не хранит пароль и не выполняет автоматический вход от имени пользователя.`,
      },
      {
        title: "Создать POST /api/auth/logout",
        text: "Logout отзывает серверную сессию и очищает cookie.",
        code: `POST /api/auth/logout

FastAPI:

1. Находит текущую запись sessions.
2. Устанавливает revoked_at.
3. Очищает bridge_session cookie.
4. Возвращает успешный ответ.

Ответ:

{
  "success": true
}

После logout:

GET /api/auth/me

возвращает HTTP 401.

Пользователь остаётся в таблице users.
Бизнес-данные в 1С не удаляются.`,
      },
      {
        title: "Проверить flow через DB Browser",
        text: "Сравните состояние базы до входа, после входа и после logout.",
        code: `Проверка:

1. Откройте data/bridge.db в DB Browser.
2. Выполните POST /api/auth/login.
3. Обновите таблицу users.
4. Обновите таблицу sessions.
5. Проверьте created_at и expires_at.
6. Выполните GET /api/auth/me.
7. Выполните POST /api/auth/logout.
8. Проверьте revoked_at.

В sessions должны быть видны:

- user_id;
- session_token_hash;
- created_at;
- last_activity_at;
- expires_at;
- onec_token_expires_at;
- revoked_at.

Исходный session token и пароль пользователя
не должны быть видны в базе.`,
      },
      {
        title: "Проверить безопасность",
        text: "Серверная cookie-сессия защищает токен от доступа JavaScript и не передаёт access token 1С в браузер.",
        code: `Обязательные правила:

- использовать случайный непрозрачный session token;
- хранить только хеш токена;
- использовать HttpOnly;
- использовать Secure в production;
- использовать SameSite=Lax;
- включить HTTPS в production;
- не хранить пароль;
- не использовать localStorage для session token;
- не передавать access token 1С в React;
- не записывать токены и пароли в логи;
- ограничить количество попыток login;
- добавить CSRF-защиту для изменяющих запросов;
- отзывать сессию после logout.`,
      },
      {
        title: "Prompt для Codex или Claude Code",
        text: "Запускайте AI-агента внутри папки bridge, где находится Python-проект.",
        content: [
          { type: "command", label: "Перейти в папку bridge", code: "cd bridge" },
          { type: "command", label: "Запустить Codex", code: "codex" },
          { type: "command", label: "Или запустить Claude Code", code: "claude" },
          {
            type: "snippet",
            label: "Prompt для входа и серверной сессии",
            body: `Ты работаешь в текущей папке bridge.

Сначала изучи существующий проект и таблицы users и sessions.
Не изменяй frontend, конфигурацию 1С и файлы за пределами текущей папки.

Реализуй вход и серверную сессию по архитектуре:

React → FastAPI → HTTP-сервис 1С

Важно:

- пароль проверяет 1С;
- FastAPI не проверяет пароль локально;
- FastAPI не хранит пароль;
- роли и права принадлежат 1С;
- FastAPI хранит только users и sessions;
- React не получает access token 1С;
- session token передаётся только через HttpOnly cookie.

Создай или проверь маршруты:

POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout

POST /api/auth/login:

1. Прими username и password.
2. Передай их в login endpoint 1С.
3. Получи success, token, expires_in и user_id согласно фактическому контракту 1С.
4. Не сохраняй password.
5. Создай или обнови users.
6. Создай случайный session token через secrets.token_urlsafe.
7. Сохрани в sessions только хеш session token.
8. Сохрани access token 1С зашифрованным.
9. Сохрани onec_token_expires_at.
10. Установи HttpOnly cookie bridge_session.
11. Не возвращай access token в response.

Таблица users должна содержать:

- id;
- username;
- onec_user_id;
- is_active;
- created_at;
- updated_at.

Не добавляй:

- password;
- password_hash;
- role;
- access_token.

Таблица sessions должна содержать:

- id;
- user_id;
- session_token_hash;
- onec_access_token_ciphertext;
- onec_token_expires_at;
- created_at;
- last_activity_at;
- expires_at;
- revoked_at.

GET /api/auth/me:

1. Прочитай bridge_session cookie.
2. Вычисли хеш.
3. Найди сессию.
4. Проверь revoked_at.
5. Проверь абсолютный срок expires_at.
6. Проверь idle timeout.
7. Проверь is_active пользователя.
8. Верни только безопасные данные пользователя.

Успешный ответ:

{
  "authenticated": true,
  "user": {
    "username": "student01",
    "onec_user_id": "123"
  }
}

POST /api/auth/logout:

1. Найди текущую сессию.
2. Установи revoked_at.
3. Удали или очисти bridge_session cookie.
4. Не удаляй пользователя из users.
5. Не удаляй бизнес-данные в 1С.

Настройки:

SESSION_COOKIE_NAME=bridge_session
SESSION_ABSOLUTE_TTL_SECONDS=28800
SESSION_IDLE_TTL_SECONDS=1800
SESSION_COOKIE_SECURE=false
SESSION_COOKIE_SAMESITE=lax

Cookie должна иметь:

- HttpOnly=true;
- Secure=true в production;
- SameSite=Lax.

Ошибки:

Отсутствует cookie или сессия:

HTTP 401

{
  "error": {
    "code": "unauthorized",
    "message": "Требуется авторизация"
  }
}

Истёк idle timeout:

HTTP 401

{
  "error": {
    "code": "session_idle_timeout",
    "message": "Сессия завершена из-за бездействия"
  }
}

Истёк access token 1С:

HTTP 401

{
  "error": {
    "code": "reauth_required",
    "message": "Требуется повторная авторизация"
  }
}

Проверь:

python -m compileall app
python -m uvicorn app.main:app --reload

Проверь flow:

1. POST /api/auth/login.
2. Убедись, что установлена bridge_session cookie.
3. GET /api/auth/me.
4. Проверь users и sessions в data/bridge.db через DB Browser.
5. POST /api/auth/logout.
6. Повтори GET /api/auth/me и проверь HTTP 401.
7. Проверь, что после logout в sessions заполнено revoked_at.

Никогда не показывай:

- password;
- session token;
- access token 1С;
- ключ шифрования;
- секреты из .env.

После работы верни:

- список изменённых файлов;
- описание login flow;
- описание session validation;
- описание logout flow;
- результаты проверки;
- найденные ограничения.`,
          },
          {
            type: "note",
            text: "Результат урока: пользователь входит через 1С, FastAPI создаёт локальную сессию, хранит в SQL только хеш session token, а исходный токен передаёт браузеру только через защищённую HttpOnly cookie.",
          },
        ],
      },
    ],
  },
  {
    id: "lesson-11",
    group: "FastAPI SQL",
    number: "11",
    title: "Срок действия и выход",
    subtitle: "Настройте TTL сессии, таймаут бездействия и безопасный logout.",
    minutes: "20 мин",
    level: "Средний",
    complete: false,
    need: ["Рабочий login из урока 10", "Таблицы users и sessions", "SQLite", "DB Browser for SQLite"],
    goal: "наблюдать истечение сессии, idle timeout и отзыв доступа после logout в DB Browser.",
    steps: [
      {
        title: "Настроить политику сессии",
        text: "Используйте абсолютный срок действия и таймаут бездействия.",
        code: `.env

SESSION_ABSOLUTE_TTL_SECONDS=28800
SESSION_IDLE_TTL_SECONDS=1800
SESSION_COOKIE_NAME=bridge_session
SESSION_COOKIE_SAMESITE=lax
SESSION_COOKIE_SECURE=false

Локальная разработка работает по HTTP,
поэтому SESSION_COOKIE_SECURE=false.

В production обязательно:

SESSION_COOKIE_SECURE=true

и HTTPS.`,
      },
      {
        title: "Проверять абсолютный TTL",
        text: "Абсолютный TTL ограничивает максимальное время жизни сессии, даже если пользователь постоянно активен.",
        code: `При создании сессии:

created_at = текущее время

expires_at =
created_at + SESSION_ABSOLUTE_TTL_SECONDS

Если текущее время больше expires_at:

- сессия считается истёкшей;
- FastAPI возвращает HTTP 401;
- cookie очищается;
- пользователь должен войти повторно.

Ответ:

{
  "error": {
    "code": "session_expired",
    "message": "Сессия завершена"
  }
}`,
      },
      {
        title: "Добавить idle timeout",
        text: "Idle timeout завершает сессию, если пользователь долго не выполнял запросы.",
        code: `При каждом защищённом запросе:

1. Прочитать last_activity_at.
2. Сравнить его с текущим временем.
3. Если прошло больше 1800 секунд:
   - установить revoked_at;
   - очистить cookie;
   - вернуть HTTP 401.
4. Если сессия активна:
   - обновить last_activity_at.

Ответ:

{
  "error": {
    "code": "session_idle_timeout",
    "message": "Сессия завершена из-за бездействия"
  }
}`,
      },
      {
        title: "Реализовать безопасный logout",
        text: "Logout должен отозвать сессию в SQL и удалить cookie браузера.",
        code: `POST /api/auth/logout

FastAPI:

1. Находит текущую запись sessions.
2. Устанавливает revoked_at.
3. Очищает bridge_session cookie.
4. Не удаляет пользователя из users.
5. Не удаляет данные в 1С.

После logout:

GET /api/auth/me

возвращает HTTP 401.`,
      },
      {
        title: "Обработать истечение access token 1С",
        text: "Если 1С возвращает 401, локальная сессия больше не должна считаться полностью авторизованной.",
        code: `Если onec_token_expires_at истёк
или 1С вернула HTTP 401:

- не повторять запрос бесконечно;
- пометить текущую сессию отозванной;
- очистить cookie;
- вернуть код reauth_required;
- попросить пользователя снова выполнить login через 1С.

Ответ:

{
  "error": {
    "code": "reauth_required",
    "message": "Требуется повторная авторизация"
  }
}

Пароль пользователя не сохраняется.
FastAPI не выполняет автоматический login.`,
      },
      {
        title: "Обработать блокировку пользователя",
        text: "Если пользователь заблокирован в 1С или его токен стал недействительным, доступ должен быть отозван.",
        code: `Сценарий:

1. Пользователь авторизован.
2. В 1С пользователь блокируется
   или его доступ отзывается.
3. Следующий запрос FastAPI получает 401 от 1С.
4. FastAPI устанавливает revoked_at.
5. Cookie очищается.
6. Пользователь получает сообщение
   о необходимости обратиться к администратору
   или повторно войти.

FastAPI не хранит локальную роль.
Права и блокировка определяются в 1С.`,
      },
      {
        title: "Проверить TTL в DB Browser",
        text: "Для учебной проверки можно вручную изменить даты в SQLite и наблюдать результат запроса.",
        code: `Проверить активные сессии:

SELECT
  id,
  user_id,
  created_at,
  last_activity_at,
  expires_at,
  onec_token_expires_at,
  revoked_at
FROM sessions;

Сымитировать idle timeout:

UPDATE sessions
SET last_activity_at = datetime('now', '-31 minutes')
WHERE revoked_at IS NULL;

После этого выполнить:

GET /api/auth/me

Ожидаемый результат:

HTTP 401
code: session_idle_timeout

Сымитировать истечение TTL:

UPDATE sessions
SET expires_at = datetime('now', '-1 second')
WHERE revoked_at IS NULL;

После запроса проверьте revoked_at.`,
      },
      {
        title: "Добавить меры безопасности",
        text: "Защищённая cookie-сессия должна работать только вместе с HTTPS и безопасными правилами обработки ошибок.",
        code: `Обязательные правила:

- использовать HTTPS в production;
- использовать HttpOnly cookie;
- использовать Secure cookie в production;
- использовать SameSite=Lax;
- не хранить пароль;
- не использовать localStorage для session token;
- не показывать token в response;
- не записывать token и пароль в логи;
- ограничить попытки login;
- добавить CSRF-защиту для POST, PATCH и DELETE;
- возвращать безопасные сообщения об ошибках;
- отзывать сессии после logout.

Argon2id в FastAPI не требуется,
потому что локальный пароль не хранится.
Пароль проверяется HTTP-сервисом 1С.`,
      },
      {
        title: "Prompt для Codex или Claude Code",
        text: "Запускайте AI-агента внутри папки bridge, где находится Python-проект.",
        content: [
          { type: "command", label: "Перейти в папку bridge", code: "cd bridge" },
          { type: "command", label: "Запустить Codex", code: "codex" },
          { type: "command", label: "Или запустить Claude Code", code: "claude" },
          {
            type: "snippet",
            label: "Prompt для TTL, idle timeout и logout",
            body: `Ты работаешь в текущей папке bridge.

Изучи существующие таблицы users и sessions.
Не изменяй frontend, конфигурацию 1С и файлы за пределами текущей папки.

Реализуй срок действия сессии, idle timeout и logout.

Архитектура:

React → FastAPI → HTTP-сервис 1С

Правила:

- пароль проверяется в 1С;
- FastAPI не хранит password или password_hash;
- роли принадлежат 1С;
- FastAPI использует только таблицы users и sessions;
- session token хранится в браузере только в HttpOnly cookie;
- в SQL хранится только хеш session token;
- access token 1С хранится зашифрованным в sessions.

Настройки:

SESSION_ABSOLUTE_TTL_SECONDS=28800
SESSION_IDLE_TTL_SECONDS=1800
SESSION_COOKIE_NAME=bridge_session
SESSION_COOKIE_SAMESITE=lax
SESSION_COOKIE_SECURE=false

В production SESSION_COOKIE_SECURE должен быть true
при использовании HTTPS.

Реализуй абсолютный TTL:

- использовать expires_at;
- сравнивать expires_at с текущим временем;
- после истечения возвращать HTTP 401;
- очищать cookie;
- не выполнять защищённый запрос в 1С.

Ошибка:

{
  "error": {
    "code": "session_expired",
    "message": "Сессия завершена"
  }
}

Реализуй idle timeout:

- использовать last_activity_at;
- если прошло более SESSION_IDLE_TTL_SECONDS, отозвать сессию;
- заполнить revoked_at;
- очистить cookie;
- вернуть HTTP 401.

Ошибка:

{
  "error": {
    "code": "session_idle_timeout",
    "message": "Сессия завершена из-за бездействия"
  }
}

При каждом активном защищённом запросе обновляй last_activity_at.

Реализуй logout:

POST /api/auth/logout

Действия:

1. Найти текущую сессию.
2. Установить revoked_at.
3. Очистить bridge_session cookie.
4. Вернуть безопасный JSON.
5. Не удалять пользователя из users.
6. Не удалять бизнес-данные в 1С.

Реализуй обработку 401 от 1С:

Если onec access token истёк
или HTTP-сервис 1С вернул 401:

- не делать бесконечные retry;
- установить revoked_at;
- очистить cookie;
- вернуть HTTP 401;
- использовать code reauth_required;
- потребовать повторный login через 1С.

Ошибка:

{
  "error": {
    "code": "reauth_required",
    "message": "Требуется повторная авторизация"
  }
}

Не сохраняй пароль пользователя и не выполняй автоматический login.

Проверь вручную в DB Browser:

SELECT
  id,
  user_id,
  created_at,
  last_activity_at,
  expires_at,
  onec_token_expires_at,
  revoked_at
FROM sessions;

Для проверки idle timeout можно временно выполнить:

UPDATE sessions
SET last_activity_at = datetime('now', '-31 minutes')
WHERE revoked_at IS NULL;

Для проверки абсолютного TTL:

UPDATE sessions
SET expires_at = datetime('now', '-1 second')
WHERE revoked_at IS NULL;

После каждого изменения вызови:

GET /api/auth/me

Проверь HTTP 401 и соответствующий error.code.

Проверь logout:

1. Выполнить POST /api/auth/logout.
2. Открыть sessions в DB Browser.
3. Проверить заполненное revoked_at.
4. Выполнить GET /api/auth/me.
5. Убедиться, что возвращается HTTP 401.

Безопасность:

- не использовать localStorage;
- не возвращать token в React;
- не выводить token в логах;
- использовать HttpOnly;
- использовать Secure в production;
- использовать SameSite=Lax;
- добавить rate limit login;
- добавить CSRF-защиту для изменяющих запросов;
- не добавлять Argon2id для локального пароля, потому что пароль хранится и проверяется в 1С.

Проверь:

python -m compileall app
python -m uvicorn app.main:app --reload

После работы верни:

- изменённые файлы;
- описание TTL;
- описание idle timeout;
- описание logout;
- результаты проверки через DB Browser;
- найденные ограничения.

Не показывай пароли, session token, access token и ключи шифрования.`,
          },
          {
            type: "note",
            text: "Результат урока: пользовательская сессия завершается по абсолютному TTL, idle timeout, logout или недействительности access token 1С. Все изменения можно проверить в DB Browser через поля expires_at, last_activity_at и revoked_at.",
          },
        ],
      },
    ],
  },
  {
    id: "lesson-12",
    group: "React CRUD",
    number: "12",
    title: "React-приложение и вход",
    subtitle: "Разверните React-фронтенд со слоем API и экраном входа через FastAPI.",
    minutes: "28 мин",
    level: "Средний",
    complete: false,
    need: ["Node.js 20+", "FastAPI из предыдущих уроков", "Рабочие маршруты /api/auth/login и /api/auth/me", "Папка frontend"],
    goal: "React будет обращаться только к FastAPI, выполнять вход через 1С и использовать серверную HttpOnly-сессию.",
    steps: [
      {
        title: "Развернуть React",
        text: "Создайте приложение Vite внутри уже существующей папки frontend.",
        code: `cd frontend

npm create vite@latest . -- --template react
npm install
npm run dev

Приложение будет доступно по адресу:

http://localhost:5173

Если проект frontend уже создан,
не запускайте npm create vite повторно.
Используйте существующие файлы.`,
      },
      {
        title: "Добавить адрес FastAPI",
        text: "React должен обращаться к Python-мосту, а не напрямую к HTTP-сервису 1С.",
        code: `frontend/.env.example

VITE_API_BASE_URL=http://localhost:8000

Создайте локальный файл:

frontend/.env

VITE_API_BASE_URL=http://localhost:8000

Важно:

- переменные Vite должны начинаться с VITE_;
- в frontend не должно быть паролей 1С;
- в frontend не должно быть ONEC_BASE_URL;
- .env не добавляется в Git.`,
      },
      {
        title: "Создать API-клиент",
        text: "Все HTTP-запросы вынесите из React-компонентов в отдельный сервис.",
        code: `src/services/api.js

API-клиент должен:

- использовать VITE_API_BASE_URL;
- отправлять credentials: "include";
- поддерживать JSON;
- не принимать произвольный URL;
- не добавлять access token 1С;
- обрабатывать HTTP 401;
- возвращать понятные ошибки.

Cookie-сессия передаётся браузером автоматически:

fetch(url, {
  credentials: "include"
})`,
      },
      {
        title: "Создать auth API",
        text: "Опишите отдельные функции для login, текущего пользователя и logout.",
        code: `src/services/authApi.js

Методы:

login(username, password)
  POST /api/auth/login

getCurrentUser()
  GET /api/auth/me

logout()
  POST /api/auth/logout

Пример login:

await apiFetch("/api/auth/login", {
  method: "POST",
  body: JSON.stringify({
    username,
    password
  })
})

Пароль используется только во время запроса.
Не сохраняйте его в localStorage, sessionStorage
или состоянии после завершения login.`,
      },
      {
        title: "Создать экран входа",
        text: "Форма входа отправляет credentials в FastAPI и получает безопасные данные текущего пользователя.",
        code: `src/pages/LoginPage.jsx

Поля:

- Имя пользователя;
- Пароль.

Flow:

1. Пользователь вводит username и password.
2. React вызывает POST /api/auth/login.
3. FastAPI передаёт credentials в 1С.
4. 1С возвращает access token.
5. FastAPI устанавливает HttpOnly cookie.
6. React вызывает GET /api/auth/me.
7. React сохраняет в состоянии только профиль пользователя.

React не получает:

- session token;
- access token 1С;
- пароль;
- роль в виде локального секрета.`,
      },
      {
        title: "Создать состояние авторизации",
        text: "Состояние входа хранится только в памяти приложения. Источником истины остаётся GET /api/auth/me.",
        code: `src/auth/AuthProvider.jsx

Состояния:

- loading;
- authenticated;
- unauthenticated;
- currentUser;
- error.

При запуске приложения:

1. Вызвать GET /api/auth/me.
2. Если ответ 200 — показать приложение.
3. Если ответ 401 — показать LoginPage.
4. Если ответ 500/502/504 — показать безопасную ошибку.

Не хранить session token в:

- localStorage;
- sessionStorage;
- URL;
- обычном React state.`,
      },
      {
        title: "Обработать logout и истечение сессии",
        text: "После logout или истечения TTL React должен очистить состояние пользователя и показать экран входа.",
        code: `Logout:

1. React вызывает POST /api/auth/logout.
2. FastAPI устанавливает revoked_at.
3. FastAPI очищает HttpOnly cookie.
4. React очищает currentUser.
5. React открывает LoginPage.

При HTTP 401:

- очистить currentUser;
- не повторять запрос бесконечно;
- открыть LoginPage;
- показать:
  "Сессия завершена. Войдите снова."

При code = reauth_required:

"Требуется повторная авторизация через 1С."`,
      },
      {
        title: "Настроить CORS FastAPI",
        text: "Cookie должна передаваться между frontend и FastAPI во время локальной разработки.",
        code: `FastAPI должен разрешить конкретный frontend origin:

http://localhost:5173

Требования:

- allow_credentials=True;
- разрешить только известные origins;
- не использовать allow_origins=["*"]
  вместе с credentials;
- разрешить GET, POST, PATCH и DELETE;
- разрешить Content-Type.

В production список origins должен
содержать только реальный домен frontend.`,
      },
      {
        title: "Проверить вход",
        text: "Проверьте полный сценарий через браузер и DevTools.",
        code: `Порядок проверки:

1. Запустить FastAPI.
2. Запустить React.
3. Открыть http://localhost:5173.
4. Ввести credentials.
5. Проверить POST /api/auth/login.
6. Проверить cookie bridge_session
   во вкладке Application → Cookies.
7. Проверить GET /api/auth/me.
8. Обновить страницу.
9. Убедиться, что пользователь остаётся авторизован.
10. Выполнить logout.
11. Убедиться, что GET /api/auth/me
    возвращает HTTP 401.

В Network нельзя видеть:

- пароль в URL;
- access token 1С;
- session token в JSON response.`,
      },
      {
        title: "Prompt для Codex или Claude Code",
        text: "Запускайте AI-агента внутри папки frontend, где находится React-проект.",
        content: [
          { type: "command", label: "Перейти в папку frontend", code: "cd frontend" },
          { type: "command", label: "Запустить Codex", code: "codex" },
          { type: "command", label: "Или запустить Claude Code", code: "claude" },
          {
            type: "snippet",
            label: "Prompt для API-слоя, входа и logout",
            body: `Ты работаешь в текущей папке frontend.

Сначала изучи существующие файлы.
Не изменяй bridge, onec и файлы за пределами frontend.

Создай или обнови React-приложение на Vite.

Архитектура:

React → FastAPI → HTTP-сервис 1С

React не должен обращаться к 1С напрямую.

Если frontend уже является Vite-проектом,
не создавай второй проект и не перезаписывай существующие файлы.

Создай структуру:

src/
├── services/
│   ├── api.js
│   └── authApi.js
├── auth/
│   └── AuthProvider.jsx
├── pages/
│   └── LoginPage.jsx
├── components/
│   └── ProtectedRoute.jsx
└── App.jsx

Добавь frontend/.env.example:

VITE_API_BASE_URL=http://localhost:8000

Создай API-клиент.

Требования к API-клиенту:

- использовать VITE_API_BASE_URL;
- удалять лишний slash между base URL и path;
- использовать fetch;
- отправлять credentials: "include";
- поддерживать JSON;
- не принимать URL 1С от пользователя;
- не добавлять access token 1С;
- не сохранять пароль;
- обрабатывать HTTP 401, 403, 502 и 504.

Создай authApi:

login(username, password)
POST /api/auth/login

getCurrentUser()
GET /api/auth/me

logout()
POST /api/auth/logout

Login flow:

1. Пользователь вводит username и password.
2. React вызывает FastAPI.
3. FastAPI передаёт credentials в 1С.
4. 1С возвращает access token.
5. FastAPI устанавливает HttpOnly cookie.
6. React вызывает /api/auth/me.
7. React сохраняет только профиль пользователя в памяти.

Не сохраняй в frontend:

- password;
- session token;
- access token;
- ONEC_USERNAME;
- ONEC_PASSWORD;
- ONEC_BASE_URL.

Создай AuthProvider:

Состояния:

- loading;
- authenticated;
- unauthenticated;
- currentUser;
- error.

При запуске:

- вызвать GET /api/auth/me;
- если 200 — показать приложение;
- если 401 — показать LoginPage;
- если 502/504 — показать безопасную ошибку.

Создай LoginPage:

- поле username;
- поле password;
- loading state;
- сообщение об ошибке;
- вызов login;
- после успешного входа переход в основное приложение.

Не выводи пароль в console.log.

Создай logout:

1. Вызвать POST /api/auth/logout.
2. Очистить currentUser.
3. Перейти на LoginPage.

При HTTP 401:

- не выполнять бесконечный retry;
- очистить состояние пользователя;
- показать LoginPage;
- сообщить, что сессия завершена.

Добавь ProtectedRoute.
Не показывай защищённые страницы,
если GET /api/auth/me не подтвердил сессию.

Проверь FastAPI CORS отдельно не изменяй:
frontend должен работать с cookie через:

credentials: "include"

Проверь вручную:

1. Запусти FastAPI на порту 8000.
2. Запусти React на порту 5173.
3. Выполни login.
4. Проверь GET /api/auth/me.
5. Проверь cookie bridge_session в DevTools.
6. Обнови страницу.
7. Убедись, что авторизация сохраняется.
8. Выполни logout.
9. Убедись, что пользователь возвращается на LoginPage.
10. Проверь ответ 401 после logout.

Не используй:

- localStorage для токенов;
- sessionStorage для токенов;
- JWT в frontend;
- прямые запросы к 1С;
- пароль в URL;
- access token в JSON response.

После работы верни:

- список созданных и изменённых файлов;
- описание API-слоя;
- описание login flow;
- описание logout flow;
- команды запуска;
- результаты проверки;
- найденные ограничения.`,
          },
          {
            type: "note",
            text: "Результат урока: React использует API-слой, отправляет credentials только в FastAPI и работает через защищённую серверную cookie-сессию. Прямого обращения React к 1С и хранения токенов в браузере нет.",
          },
        ],
      },
    ],
  },
  {
    id: "lesson-13",
    group: "React CRUD",
    number: "13",
    title: "CRUD-интерфейс справочника",
    subtitle: "Постройте предсказуемые страницы, формы и состояния для справочника Товары.",
    minutes: "26 мин",
    level: "Средний",
    complete: false,
    need: ["React app", "API contract", "Design conventions"],
    goal: "интерфейс справочника Товары будет структурирован для реальных рабочих сценариев.",
    steps: [
      {
        title: "Создайте макет страницы",
        text: "Используйте маршруты для сценариев и переиспользуемые компоненты для повторяющихся элементов управления.",
      },
      {
        title: "Обработайте состояния API",
        text: "Каждая страница, вызывающая мост, должна обрабатывать загрузку, пустой результат, успех и ошибку.",
      },
      {
        title: "Зафиксируйте работу фронтенда",
        text: "Держите коммиты фронтенда сфокусированными и удобными для ревью.",
        code: `git add frontend
git commit -m "Add React frontend shell"`,
      },
    ],
  },
  {
    id: "lesson-14",
    group: "React CRUD",
    number: "14",
    title: "CRUD-интерфейс документа",
    subtitle: "Соберите список, форму и сохранение документа Заявка.",
    minutes: "26 мин",
    level: "Средний",
    complete: false,
    need: ["React app", "API contract справочника", "CRUD справочника"],
    goal: "интерфейс документа Заявка позволит создать шапку, строки товаров и сохранить результат.",
    steps: [
      {
        title: "Создайте список заявок",
        text: "Форма списка показывает заявки, а форма объекта — шапку и строки товаров.",
        code: `Форма списка   -> React list page
Форма объекта  -> шапка + строки товаров`,
      },
      {
        title: "Добавьте ReferencePicker для товара",
        text: "Форма выбора товара переиспользуется в строках заявки, а ссылка на объект — это стабильный ID в API.",
      },
      {
        title: "Сохраните и проверьте результат",
        text: "После сохранения проверьте, что заявка и её строки появились в 1C.",
      },
    ],
  },
  {
    id: "lesson-15",
    group: "React CRUD",
    number: "15",
    title: "Редактирование UI с AI",
    subtitle: "Используйте AI-агента, чтобы проверить и улучшить CRUD-экраны.",
    minutes: "16 мин",
    level: "Средний",
    complete: false,
    need: ["React app", "Codex CLI или Claude Code", "Clean Git status"],
    goal: "вы сможете использовать AI-агента для точечных, проверяемых правок интерфейса.",
    steps: [
      {
        title: "Попросите AI проверить экран",
        text: "Используйте AI для критики интерфейса ещё до релиза.",
        ai: "Проверь этот CRUD-экран React на отсутствующие состояния загрузки/ошибки и соответствие текущему стилю интерфейса.",
      },
      {
        title: "Внесите точечные правки",
        text: "Просите AI вносить небольшие, проверяемые изменения в рамках одной ветки, а не переписывать экран целиком.",
      },
    ],
  },
  {
    id: "lesson-16",
    group: "Release",
    number: "16",
    title: "Проверка после изменений",
    subtitle: "Проверьте полный путь запроса и добавьте логи для диагностики.",
    minutes: "18 мин",
    level: "Средний",
    complete: false,
    need: ["Frontend build", "Bridge server", "1C endpoint"],
    goal: "вы сможете проверить полный путь запроса и найти его в логах фронтенда, моста и 1C.",
    steps: [
      {
        title: "Проверьте полный путь запроса",
        text: "Убедитесь, что действие в браузере доходит до React, Python-моста и сервиса 1C.",
      },
      {
        title: "Добавьте логи и trace ID",
        text: "Trace ID упрощает поиск одного и того же запроса в логах фронтенда, моста и 1C.",
      },
    ],
  },
  {
    id: "lesson-17",
    group: "Release",
    number: "17",
    title: "Первый выпуск на Linux",
    subtitle: "Разверните приложение на Linux с nginx, systemd и HTTPS.",
    minutes: "30 мин",
    level: "Средний",
    complete: false,
    need: ["Linux-сервер", "nginx", "systemd"],
    goal: "приложение будет развёрнуто на Linux с nginx, systemd и HTTPS.",
    steps: [
      {
        title: "Подготовьте сервер",
        text: "Установите nginx и systemd-сервис для Python-моста, соберите production-сборку React.",
        info: [
          "nginx отдаёт статику React и проксирует /api на FastAPI.",
          "systemd перезапускает FastAPI при сбое.",
          "HTTPS обязателен для cookie с флагом Secure.",
        ],
      },
      {
        title: "Что дальше",
        content: [
          {
            type: "note",
            text: "Подробная пошаговая инструкция по первому выпуску появится в одном из следующих обновлений курса.",
          },
        ],
      },
    ],
  },
  {
    id: "lesson-18",
    group: "Release",
    number: "18",
    title: "Обновление production",
    subtitle: "Задокументируйте команды сборки, запуска, деплоя и отката.",
    minutes: "16 мин",
    level: "Средний",
    complete: false,
    need: ["Первый выпуск на Linux", "Доступ к серверу", "Git-тег релиза"],
    goal: "у проекта будет документация с точными командами сборки, запуска, деплоя и отката.",
    steps: [
      {
        title: "Опишите обновление и откат",
        text: "Зафиксируйте точные команды, нужные для сборки, запуска, деплоя и отката на предыдущую версию.",
        info: [
          "Опишите точную команду сборки.",
          "Опишите точную команду запуска.",
          "Опишите точную команду деплоя.",
          "Опишите точную команду отката на предыдущую версию.",
        ],
      },
    ],
  },
  {
    id: "lesson-19",
    group: "Release",
    number: "19",
    title: "Финальная практика",
    subtitle: "Пройдите весь путь курса на одном примере: от 1C до production на Linux.",
    minutes: "40 мин",
    level: "Средний",
    complete: false,
    need: ["Все предыдущие уроки", "Рабочий стенд 1C + FastAPI + React", "Доступ к Linux-серверу"],
    goal: "вы покажете весь путь курса на одном примере: от 1C до production на Linux.",
    steps: [
      {
        title: "Пройдите итоговый критерий",
        text: "Покажите весь путь курса на одном примере: от 1C до production на Linux.",
        content: [
          {
            type: "checklist",
            items: [
              "Опубликованный HTTP-сервис 1C.",
              "Параметры .env без секретов.",
              "Таблицы users и sessions в SQL.",
              "Вход и появление сессии.",
              "CRUD товара и заявки.",
              "Logout и истечение сессии.",
              "Собственный Pull Request.",
              "Обновлённая версия на Linux.",
            ],
          },
        ],
        ai: "Составь урок для разработчика 1C: создать серверную сессию в FastAPI, увидеть её в SQL через DB Browser, проверить logout и истечение срока.",
        link: {
          label: "Open full project-overview.md",
          href: "project-overview.md",
        },
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
const tocTitle = document.querySelector("#toc-title");
const needsTitle = document.querySelector("#needs-title");
const themeToggle = document.querySelector("#theme-toggle");

const savedTheme = localStorage.getItem("lesson-theme");
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
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
      button.className = ["lesson-link", lesson.id === state.lessonId ? "active" : ""].filter(Boolean).join(" ");
      button.innerHTML = `
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
  courseTitle.textContent = lesson.ui?.courseTitle || "Уроки курса";
}

function renderArticle() {
  const lesson = currentLesson();
  const lessonIndex = lessons.findIndex((item) => item.id === lesson.id);
  const previous = lessons[lessonIndex - 1];
  const next = lessons[lessonIndex + 1];
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
      ${
        next
          ? `<button class="primary-action" type="button" data-lesson="${next.id}">${ui.next || "Следующий урок"} ${icons.arrowRight}</button>`
          : `<span></span>`
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

  article.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(button.dataset.copy);
      const oldText = button.querySelector("span").textContent;
      button.querySelector("span").textContent = "Скопировано";
      window.setTimeout(() => {
        button.querySelector("span").textContent = oldText;
      }, 1000);
    });
  });
}

function renderStep(lesson) {
  return (step, index) => {
    const stepId = `${lesson.id}-step-${index + 1}`;
    const body = step.content
      ? step.content.map(renderBlock).join("")
      : `
        ${step.code ? renderCode(step.code) : ""}
        ${step.ai ? renderAi(step.ai) : ""}
        ${step.info ? renderInfo(step.info) : ""}
        ${step.link ? renderLink(step.link) : ""}
        ${step.links ? renderLinks(step.links) : ""}
      `;
    return `
      <section class="step" id="${stepId}">
        <div class="step-number">${index + 1}</div>
        <div>
          <h2>${step.title}</h2>
          ${step.text ? `<p>${step.text}</p>` : ""}
          ${body}
        </div>
      </section>
    `;
  };
}

function renderBlock(block) {
  switch (block.type) {
    case "command":
      return renderCommand(block);
    case "snippet":
      return renderSnippet(block);
    case "note":
      return renderNote(block.text);
    case "steps":
      return renderOrderedSteps(block.items);
    case "checklist":
      return renderChecklist(block.items);
    case "links":
      return renderLinks(block.links);
    case "video":
      return renderVideo(block);
    case "ai":
      return renderAi(block.prompt);
    default:
      return "";
  }
}

function renderVideo(block) {
  return `
    ${block.label ? `<p class="command-label">${escapeHtml(block.label)}</p>` : ""}
    <div class="video-embed">
      <iframe
        src="https://www.youtube.com/embed/${escapeAttribute(block.id)}"
        title="${escapeAttribute(block.title || "YouTube video")}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  `;
}

function renderCommand(block) {
  return `
    <p class="command-label">${escapeHtml(block.label)}</p>
    ${renderCode(block.code, "PowerShell")}
    ${block.note ? `<p class="command-note">${escapeHtml(block.note)}</p>` : ""}
  `;
}

function renderSnippet(block) {
  return `
    ${block.label ? `<p class="command-label">${escapeHtml(block.label)}</p>` : ""}
    ${renderCode(block.body, "Пример")}
  `;
}

function renderNote(text) {
  return `
    <div class="note-card">
      <p>${escapeHtml(text)}</p>
    </div>
  `;
}

function renderOrderedSteps(items) {
  return `<ol class="step-instructions">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>`;
}

function renderChecklist(items) {
  return `
    <div class="info-card">
      <ul class="need-list">${items.map((item) => `<li>${icons.check}<span>${escapeHtml(item)}</span></li>`).join("")}</ul>
    </div>
  `;
}

function renderCode(code, header = "PowerShell") {
  const escaped = escapeHtml(code);
  return `
    <div class="code-card">
      <div class="code-card-header">
        <span>${escapeHtml(header)}</span>
        <button class="copy-button" type="button" data-copy="${escapeAttribute(code)}">${icons.copy}<span>Копировать</span></button>
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
      <button class="copy-button" type="button" data-copy="${escapeAttribute(prompt)}">${icons.copy}<span>Копировать</span></button>
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
