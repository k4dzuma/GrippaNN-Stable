# GrippaNN-3 — HRM-система (Учёт сотрудников и кадровых операций)

## Описание проекта

Веб-приложение для специалиста по кадрам, позволяющее вести учёт сотрудников в организации: управление организациями, отделами, должностями, карточками сотрудников, кадровыми операциями (приём, увольнение, перевод, изменение зарплаты) и историей изменений.

## Стек технологий

| Слой | Технология |
|------|-----------|
| Backend | Python 3.11+ / Django 5.1 / Django REST Framework |
| Frontend | React 18 / TypeScript / Vite / Tailwind CSS / shadcn/ui |
| База данных | SQLite3 |
| Авторизация | JWT (access + refresh) — djangorestframework-simplejwt |
| Хеширование паролей | Argon2 (Argon2PasswordHasher) |
| HTTP-клиент | Axios |
| Маршрутизация (frontend) | React Router v6 |

## Структура проекта

```
GrippaNN-3/
├── api/                  # Django backend
│   ├── manage.py
│   ├── api/              # Настройки Django
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── core/             # Основное приложение
│   │   ├── models/
│   │   ├── serializers/
│   │   ├── views/
│   │   ├── urls.py
│   │   └── admin.py
│   └── requirements.txt
├── app/                  # React frontend (Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── docs/
│   └── api-contract.md
├── .gitignore
├── .env.example
└── README.md
```

## Запуск проекта локально

### Предварительные требования

- Python 3.11+
- Node.js 18+
- npm 9+

### Backend (Django)

```bash
# 1. Перейти в папку backend
cd api

# 2. Создать виртуальное окружение
python -m venv venv

# 3. Активировать виртуальное окружение
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 4. Установить зависимости
pip install -r requirements.txt

# 5. Скопировать файл окружения и настроить
cp .env.example .env

# 6. Применить миграции
python manage.py migrate

# 7. Создать суперпользователя (администратора)
python manage.py createsuperuser

# 8. Запустить сервер
python manage.py runserver
```

Backend будет доступен по адресу: `http://localhost:8000`

### Frontend (React)

```bash
# 1. Перейти в папку frontend
cd app

# 2. Установить зависимости
npm install

# 3. Запустить dev-сервер
npm run dev
```

Frontend будет доступен по адресу: `http://localhost:5173`

## Ролевая модель

| Роль | Права |
|------|-------|
| Администратор (`admin`) | Управление пользователями, все кадровые операции, полный доступ к справочникам |
| Менеджер по персоналу (`hr_manager`) | Кадровые операции, управление справочниками, просмотр сотрудников |

## API Endpoints

Базовый URL: `http://localhost:8000/api/v1/`

Полное описание API — в файле [docs/api-contract.md](docs/api-contract.md).

## Git Policy (Регламент разработки)

### Ветвление

- Ветка `main` защищена — прямые коммиты запрещены
- Для каждой задачи создаётся отдельная ветка от `main`
- Формат именования веток: `feat/<описание>`, `fix/<описание>`, `docs/<описание>`
- Пример: `feat/crud-organizations`, `fix/jwt-refresh-error`

### Коммиты (Conventional Commits)

```
feat: добавлен CRUD для организаций
fix: исправлена валидация паспортных данных
docs: обновлено описание API эндпоинтов
refactor: вынесена логика soft-delete в миксин
```

### Pull Requests

1. Разработчик создаёт PR из своей ветки в `main`
2. Team Lead проводит Code Review
3. После одобрения — squash merge в `main`
4. Ветка удаляется после слияния

### Правила Code Review

- Проверка соответствия ТЗ
- Проверка стиля кода (нет закомментированного кода, console.log)
- Проверка безопасности (нет паролей в коде, используется .env)
- Проверка обработки ошибок

## Команда

| Роль | Зона ответственности |
|------|---------------------|
| Team Lead | Ревью кода, мерж PR, координация |
| DevOps / Тестировщик | CI, тестирование, Docker |
| Backend-1 (Kamilla) | Организации, Отделы, Должности |
| Backend-2 | Сотрудники, Файлы |
| Backend-3 | Кадровые операции, История, Пользователи, JWT |
| Frontend-1 | Справочники (Организации, Отделы, Должности) |
| Frontend-2 | Сотрудники, Кадровые операции, История |

## Основные Git-команды

```bash
# Клонировать репозиторий
git clone https://github.com/Bread7Team/GrippaNN-3.git

# Создать новую ветку
git checkout -b feat/my-feature

# Добавить изменения
git add .

# Создать коммит
git commit -m "feat: описание изменений"

# Отправить ветку в удалённый репозиторий
git push origin feat/my-feature

# Обновить локальную main
git checkout main
git pull origin main

# Обновить свою ветку из main
git checkout feat/my-feature
git merge main
```
