# Пошаговая инструкция — Frontend-2

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

## 3. Создать ветку

```bash
git checkout main
git pull origin main
git checkout -b feat/frontend-api-modules
```

## 4. Скопировать готовый код

### День 1 (24.02) — API-модули
```
ready-code/api/employees.ts      →  app/src/api/employees.ts
ready-code/api/files.ts           →  app/src/api/files.ts
ready-code/api/hrOperations.ts    →  app/src/api/hrOperations.ts
ready-code/api/changeHistory.ts   →  app/src/api/changeHistory.ts
ready-code/api/users.ts           →  app/src/api/users.ts
```

```bash
git add app/src/api/
git commit -m "feat: API-модули для сотрудников, файлов, операций, истории"
git push origin feat/frontend-api-modules
# Создать PR
```

### День 2 (25.02) — Страница сотрудников
```bash
git checkout main && git pull origin main
git checkout -b feat/frontend-employees
```

Скопировать:
```
ready-code/pages/EmployeesPage.tsx  →  app/src/pages/EmployeesPage.tsx
```

### День 3 (26.02) — Карточка сотрудника с файлами
Функциональность загрузки файлов уже включена в EmployeesPage.tsx.

### День 4 (27.02) — Кадровые операции
```
ready-code/pages/HrOperationsPage.tsx  →  app/src/pages/HrOperationsPage.tsx
```

### День 5 (28.02) — История
```
ready-code/pages/HistoryPage.tsx  →  app/src/pages/HistoryPage.tsx
```

### День 6 (01.03) — Пользователи
```
ready-code/pages/UsersPage.tsx  →  app/src/pages/UsersPage.tsx
```

## 5. Проверка

1. Запустить backend: `cd api && python manage.py runserver`
2. Запустить frontend: `cd app && npm run dev`
3. Войти как admin (admin / admin123)
4. Проверить:
   - Создание сотрудника (все поля)
   - Загрузка файла к сотруднику
   - Создание кадровой операции
   - Просмотр истории изменений
   - Создание пользователя (вкладка Пользователи)
