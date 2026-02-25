# Frontend-1 — Зона ответственности

## Роль
Frontend-разработчик: Справочники (Организации, Отделы, Должности), настройка React, авторизация.

## Задачи

1. **Настройка проекта** — Vite, Tailwind CSS, TypeScript, React Router, Axios
2. **Авторизация** — LoginPage, AuthContext, JWT interceptors
3. **Layout** — Sidebar навигация, общий Layout с Outlet
4. **Организации** — OrganizationsPage: таблица, форма создания/редактирования, удаление
5. **Отделы** — DepartmentsPage: таблица, выбор организации и родителя, CRUD
6. **Должности** — PositionsPage: таблица, CRUD
7. **Главная** — DashboardPage (приветствие)

## Файлы, за которые отвечаю

```
app/package.json
app/vite.config.ts
app/tsconfig.json
app/tailwind.config.js
app/postcss.config.js
app/index.html
app/src/main.tsx
app/src/App.tsx
app/src/index.css
app/src/types/index.ts
app/src/lib/utils.ts
app/src/api/axios.ts
app/src/api/auth.ts
app/src/api/organizations.ts
app/src/api/departments.ts
app/src/api/positions.ts
app/src/contexts/AuthContext.tsx
app/src/components/layout/Sidebar.tsx
app/src/components/layout/Layout.tsx
app/src/pages/LoginPage.tsx
app/src/pages/DashboardPage.tsx
app/src/pages/OrganizationsPage.tsx
app/src/pages/DepartmentsPage.tsx
app/src/pages/PositionsPage.tsx
```
