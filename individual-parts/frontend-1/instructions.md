# Пошаговая инструкция — Frontend-1

## 1. Клонировать репозиторий

```bash
git clone https://github.com/Bread7Team/GrippaNN-3.git
cd GrippaNN-3
```

## 2. Настроить frontend

```bash
cd app
npm install
npm run dev
```

Проект откроется на `http://localhost:5173`

## 3. Создать ветку

```bash
git checkout main
git pull origin main
git checkout -b feat/frontend-setup
```

## 4. Скопировать готовый код

### День 1 (24.02) — Настройка проекта
Из `ready-code/` скопировать конфиг-файлы в `app/`:
- `package.json`, `vite.config.ts`, `tsconfig.json`
- `tailwind.config.js`, `postcss.config.js`
- `index.html`, `src/main.tsx`, `src/index.css`

```bash
git add app/
git commit -m "feat: инициализация React — Vite, Tailwind, TypeScript, Router"
git push origin feat/frontend-setup
# Создать PR
```

### День 2 (25.02) — Auth
```bash
git checkout main && git pull origin main
git checkout -b feat/frontend-auth
```

Скопировать:
```
ready-code/api/axios.ts       →  app/src/api/axios.ts
ready-code/api/auth.ts        →  app/src/api/auth.ts
ready-code/pages/LoginPage.tsx →  app/src/pages/LoginPage.tsx
```

Также скопировать `AuthContext.tsx` и `types/index.ts`.

```bash
git add .
git commit -m "feat: API-клиент с JWT interceptors и AuthContext"
git push origin feat/frontend-auth
```

### День 3 (26.02) — Layout
```bash
git checkout main && git pull origin main
git checkout -b feat/layout-sidebar
```

Скопировать Layout, Sidebar, DashboardPage.

### День 4-5 (27-28.02) — Страницы справочников
Скопировать OrganizationsPage, DepartmentsPage из `ready-code/pages/`.
Скопировать соответствующие API-модули из `ready-code/api/`.

### День 6 (01.03) — Должности
Скопировать PositionsPage.

### День 7 (02.03) — Финализация
Скопировать итоговый App.tsx с полными маршрутами.

## 5. Проверка

1. Запустить backend: `cd api && python manage.py runserver`
2. Запустить frontend: `cd app && npm run dev`
3. Открыть http://localhost:5173
4. Войти: admin / admin123
5. Проверить каждую страницу: создание, редактирование, удаление
