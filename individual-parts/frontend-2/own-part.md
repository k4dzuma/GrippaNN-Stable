# Frontend-2 — Зона ответственности

## Роль
Frontend-разработчик: Сотрудники, Кадровые операции, История изменений, Пользователи.

## Задачи

1. **Сотрудники** — EmployeesPage: таблица, форма (все поля ТЗ), карточка с файлами
2. **Загрузка файлов** — Upload файлов в карточке сотрудника
3. **Кадровые операции** — HrOperationsPage: таблица, форма создания
4. **История** — HistoryPage: список изменений с diff (старые/новые значения)
5. **Пользователи** — UsersPage: таблица, форма создания (только admin)

## Файлы, за которые отвечаю

```
app/src/api/employees.ts
app/src/api/files.ts
app/src/api/hrOperations.ts
app/src/api/changeHistory.ts
app/src/api/users.ts
app/src/pages/EmployeesPage.tsx
app/src/pages/HrOperationsPage.tsx
app/src/pages/HistoryPage.tsx
app/src/pages/UsersPage.tsx
```
