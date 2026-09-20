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
    title: "Что строим",
    subtitle: "Целевая архитектура проекта и стандартная структура папок для всех будущих уроков.",
    minutes: "18 мин",
    level: "Начальный",
    complete: true,
    need: ["Прочитанный обзор проекта", "Ветка Git", "Папка проекта"],
    goal: "репозиторий будет иметь целевую архитектуру и стандартную структуру папок для всех будущих уроков.",
    steps: [
      {
        title: "Целевая архитектура",
        text: "Каждый учебный проект использует одно и то же разделение: React-фронтенд, FastAPI-мост и 1C-бэкенд.",
        code: `React frontend
    |
    | HTTP API
    v
FastAPI bridge
    |
    | HTTP-сервис / OData
    v
1C backend`,
      },
      {
        title: "Создайте папки",
        text: "Frontend, bridge, 1C, документация и автоматизация должны быть чётко разделены.",
        code: `mkdir frontend
mkdir bridge
mkdir onec
mkdir docs
mkdir scripts
mkdir .github
mkdir .github\\workflows`,
      },
      {
        title: "Добавьте шаблоны окружения",
        text: "Шаблоны документируют нужные настройки без хранения реальных секретов.",
        code: `New-Item .env.example
New-Item frontend\\.env.example
New-Item bridge\\.env.example`,
      },
      {
        title: "Попросите AI-агента проверить структуру",
        text: "Используйте AI для критики ещё до появления кода приложения.",
        ai: "Проверь структуру этого репозитория для React-фронтенда, Python bridge API и 1C-бэкенда. Найди отсутствующие папки или документацию.",
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
    title: "FastAPI как адаптер 1С",
    subtitle: "Создайте Python-мост между React и опубликованным HTTP-сервисом 1С.",
    minutes: "30 мин",
    level: "Средний",
    complete: false,
    need: ["Python 3.12", "HTTP-сервис 1С из урока 06", "Файл .env", "Git"],
    goal: "FastAPI будет принимать запросы React, обращаться к 1С, нормализовать ответы и возвращать понятные ошибки.",
    steps: [
      {
        title: "Создать виртуальное окружение",
        text: "Все Python-зависимости хранятся внутри папки bridge и не смешиваются с другими проектами.",
        code: `cd bridge
python -m venv .venv
.\\.venv\\Scripts\\Activate.ps1`,
      },
      {
        title: "Установить зависимости",
        text: "FastAPI отвечает за API, Pydantic Settings — за конфигурацию, а HTTPX — за запросы к HTTP-сервису 1С.",
        code: `python -m pip install --upgrade pip
pip install fastapi "uvicorn[standard]" pydantic-settings httpx
pip freeze > requirements.txt`,
      },
      {
        title: "Создать настройки приложения",
        text: "FastAPI читает адрес и технические учётные данные 1С из .env. React и браузер эти значения не получают.",
        code: `Настройки:

ONEC_BASE_URL=http://localhost/onec-demo/hs/api
ONEC_AUTH_MODE=basic
ONEC_USERNAME=
ONEC_PASSWORD=
ONEC_TIMEOUT_SECONDS=15

Нельзя принимать URL 1С от браузера.
URL должен приходить только из серверной конфигурации.`,
      },
      {
        title: "Создать health-эндпоинт",
        text: "Health-эндпоинт показывает, что FastAPI запущен. Он не должен раскрывать пароль, токены или внутренние настройки.",
        code: `GET /health

Пример ответа:

{
  "status": "ok",
  "service": "fastapi-bridge"
}`,
      },
      {
        title: "Создать клиент 1С",
        text: "Вынесите HTTP-запросы к 1С в отдельный модуль. Не размещайте вызовы 1С внутри каждого React-маршрута.",
        code: `FastAPI → OneCClient → HTTP-сервис 1С

Клиент должен:
- использовать ONEC_BASE_URL;
- применять тайм-аут;
- добавлять техническую авторизацию;
- обрабатывать ошибки соединения;
- не записывать пароль в логи.`,
      },
      {
        title: "Создать адаптерные маршруты",
        text: "Добавьте FastAPI-маршруты для товаров и заявок. React должен обращаться только к FastAPI.",
        code: `FastAPI:

GET    /api/products
GET    /api/products/{id}
POST   /api/products
PATCH  /api/products/{id}
DELETE /api/products/{id}

GET    /api/requests
GET    /api/requests/{id}
POST   /api/requests
PATCH  /api/requests/{id}
DELETE /api/requests/{id}`,
      },
      {
        title: "Нормализовать ошибки",
        text: "Ошибки 1С не должны возвращаться во frontend в виде внутреннего traceback.",
        code: `Правила:

Ошибка подключения 1С → 502 Bad Gateway
Тайм-аут 1С → 504 Gateway Timeout
Объект не найден → 404 Not Found
Неверные данные → 400 Bad Request

Формат ошибки:

{
  "error": {
    "code": "onec_unavailable",
    "message": "Сервис 1С временно недоступен",
    "request_id": "..."
  }
}`,
      },
      {
        title: "Запустить и проверить мост",
        text: "Проверьте FastAPI отдельно от React через Swagger и HTTP-запрос.",
        code: `python -m uvicorn app.main:app --reload

Проверки:

http://127.0.0.1:8000/docs
http://127.0.0.1:8000/health

Invoke-RestMethod http://127.0.0.1:8000/health`,
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
Не изменяй frontend, 1С-конфигурацию и файлы за пределами текущей папки.

Создай минимальный FastAPI-адаптер между React и HTTP-сервисом 1С.

Требования:

1. Используй:
   - FastAPI
   - Uvicorn
   - pydantic-settings
   - httpx

2. Создай понятную структуру:

   app/
   ├── main.py
   ├── core/
   │   └── settings.py
   ├── clients/
   │   └── onec_client.py
   ├── routers/
   │   ├── health.py
   │   ├── products.py
   │   └── requests.py
   └── schemas/

3. Загружай настройки из .env:

   ONEC_BASE_URL
   ONEC_AUTH_MODE
   ONEC_USERNAME
   ONEC_PASSWORD
   ONEC_TIMEOUT_SECONDS

4. Создай GET /health.
   Ответ:

   {
     "status": "ok",
     "service": "fastapi-bridge"
   }

5. Создай клиент OneCClient:
   - используй ONEC_BASE_URL;
   - убирай лишний символ / в URL;
   - используй timeout;
   - добавляй Basic Auth только на сервере;
   - не передавай пароль в response и логи;
   - не принимай произвольный URL от браузера.

6. Создай адаптерные маршруты:

   /api/products
   /api/products/{id}
   /api/requests
   /api/requests/{id}

   Поддержи GET, POST, PATCH и DELETE согласно HTTP-сервису 1С.

7. DELETE должен выполнять пометку удаления в 1С, а не физическое удаление.

8. Нормализуй ошибки:
   - ошибка соединения 1С → 502;
   - timeout → 504;
   - объект не найден → 404;
   - ошибка данных → 400.

9. Не добавляй:
   - SQL;
   - пользовательские сессии;
   - OAuth;
   - Docker;
   - прямые вызовы 1С из React.

10. Добавь .env.example без секретов.

11. Проверь проект командами:

   python -m compileall app
   python -m uvicorn app.main:app --reload

После работы верни:
- список созданных файлов;
- краткое описание маршрутов;
- команды проверки;
- найденные ограничения;
- что нужно сделать в следующем уроке.

Не показывай значения паролей и токенов.`,
          },
          {
            type: "note",
            text: "Результат урока: FastAPI запускается, отвечает на /health и предоставляет контролируемые маршруты для работы с HTTP-сервисом 1С.",
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
    subtitle: "Спроектируйте таблицы users и sessions и проверьте их в DB Browser.",
    minutes: "20 мин",
    level: "Средний",
    complete: false,
    need: ["FastAPI app", "SQL database", "DB Browser for SQLite"],
    goal: "вы будете понимать структуру таблиц users и sessions и уметь проверять их в DB Browser.",
    steps: [
      {
        title: "Спроектируйте таблицы",
        text: "Для входа и сессий на одном домене достаточно двух таблиц.",
        code: `Браузер
  -> случайный токен в cookie HttpOnly, Secure, SameSite=Lax
FastAPI
  -> проверяет пароль, сессию, срок действия, отзыв и роль
SQL users
  -> пользователь, хеш пароля, роль, флаг активности
SQL sessions
  -> хеш токена, пользователь, created_at, expires_at, revoked_at`,
      },
      {
        title: "Проверьте данные в DB Browser",
        text: "Используйте DB Browser for SQLite в учебном окружении, чтобы посмотреть пользователей, сессии, срок действия, последнюю активность и отзыв.",
        ai: "Создай урок FastAPI, который показывает вход, сессии в SQL, logout, простой idle timeout и проверку в DB Browser.",
      },
    ],
  },
  {
    id: "lesson-10",
    group: "FastAPI SQL",
    number: "10",
    title: "Вход и серверная сессия",
    subtitle: "Реализуйте вход с защищённой cookie и серверной сессией в SQL.",
    minutes: "22 мин",
    level: "Средний",
    complete: false,
    need: ["FastAPI app", "SQL database", "HTTPS plan"],
    goal: "вы будете понимать, где хранится токен сессии и как FastAPI подтверждает вход пользователя.",
    steps: [
      {
        title: "Создайте flow входа",
        text: "FastAPI проверяет пароль, создаёт новую сессию, хранит в SQL только хеш токена и отправляет исходный токен только в cookie.",
        code: `POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout`,
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
    need: ["FastAPI app", "SQL sessions", "DB Browser for SQLite"],
    goal: "вы сможете наблюдать истечение сессии и отзыв доступа после logout в DB Browser.",
    steps: [
      {
        title: "Настройте политику сессии",
        text: "Используйте абсолютный максимум и таймаут бездействия, чтобы можно было наблюдать истечение и отзыв в DB Browser.",
        code: `SESSION_ABSOLUTE_TTL_SECONDS=28800
SESSION_IDLE_TTL_SECONDS=1800
COOKIE_SECURE=true`,
      },
      {
        title: "Добавьте меры безопасности",
        text: "Используйте HTTPS, ограничение попыток входа, хеширование Argon2id, CSRF-защиту для изменяющих запросов и безопасные сообщения об ошибках.",
        info: [
          "JavaScript не читает секретный токен.",
          "Logout выставляет revoked_at и очищает cookie.",
          "Блокировка пользователя и смена пароля отзывают текущие сессии.",
          "OAuth2 и access/refresh JWT не обязательны для первого приложения.",
        ],
      },
    ],
  },
  {
    id: "lesson-12",
    group: "React CRUD",
    number: "12",
    title: "React-приложение и вход",
    subtitle: "Разверните React-фронтенд со слоем API и экраном входа.",
    minutes: "28 мин",
    level: "Средний",
    complete: false,
    need: ["Node.js", "npm", "FastAPI app"],
    goal: "ваше React-приложение сможет вызывать Python-мост и выполнять вход пользователя.",
    steps: [
      {
        title: "Разверните React",
        text: "Используйте Vite для быстрой локальной разработки.",
        code: `npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev`,
      },
      {
        title: "Добавьте базовый адрес API",
        text: "React должен обращаться к Python-мосту, а не напрямую к 1C.",
        code: "VITE_API_BASE_URL=http://localhost:8000",
      },
      {
        title: "Создайте сервисные функции",
        text: "Держите вызовы API вне компонентов страниц, чтобы контракты было легко тестировать.",
      },
      {
        title: "Добавьте экран входа",
        text: "Экран входа отправляет логин и пароль в FastAPI и сохраняет данные текущего пользователя из /api/auth/me.",
        code: "POST /api/auth/login",
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
