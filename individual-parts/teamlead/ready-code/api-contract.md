# API Contract — HRM-система

Базовый URL: `http://localhost:8000/api/v1/`

Все запросы (кроме auth/login) требуют заголовка:
```
Authorization: Bearer <access_token>
```

## Аутентификация

| Метод | Endpoint | Описание | Доступ |
|-------|----------|----------|--------|
| POST | `/auth/login/` | Вход (возвращает access + refresh) | Все |
| POST | `/auth/refresh/` | Обновление access-токена | Все |
| POST | `/auth/register/` | Регистрация пользователя | admin |
| GET | `/auth/me/` | Текущий пользователь | Авторизованные |

### POST /auth/login/
```json
// Request
{ "username": "admin", "password": "admin123" }

// Response 200
{
  "access": "eyJ...",
  "refresh": "eyJ...",
  "user": { "id": 1, "username": "admin", "role": "admin", ... }
}
```

## Организации

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/organizations/` | Список организаций |
| POST | `/organizations/` | Создать организацию |
| GET | `/organizations/{id}/` | Получить организацию |
| PUT | `/organizations/{id}/` | Обновить организацию |
| DELETE | `/organizations/{id}/` | Soft-delete организации |

### Поля
```json
{ "name": "string", "comment": "string" }
```

## Отделы

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/departments/` | Список отделов |
| POST | `/departments/` | Создать отдел |
| GET | `/departments/{id}/` | Получить отдел |
| PUT | `/departments/{id}/` | Обновить отдел |
| DELETE | `/departments/{id}/` | Soft-delete отдела |

### Поля
```json
{ "organization": 1, "name": "string", "parent": null, "comment": "string" }
```

Query-параметры: `?organization=1`

## Должности

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/positions/` | Список должностей |
| POST | `/positions/` | Создать должность |
| GET | `/positions/{id}/` | Получить должность |
| PUT | `/positions/{id}/` | Обновить должность |
| DELETE | `/positions/{id}/` | Soft-delete должности |

### Поля
```json
{ "name": "string", "comment": "string" }
```

## Сотрудники

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/employees/` | Список сотрудников |
| POST | `/employees/` | Создать сотрудника |
| GET | `/employees/{id}/` | Получить сотрудника |
| PUT | `/employees/{id}/` | Обновить сотрудника |
| DELETE | `/employees/{id}/` | Soft-delete сотрудника |

### Поля
```json
{
  "last_name": "string",
  "first_name": "string",
  "middle_name": "string",
  "birth_date": "2000-01-01",
  "passport_series": "1234",
  "passport_number": "567890",
  "passport_issue_date": "2020-01-01",
  "passport_issued_by": "string",
  "passport_code": "123-456",
  "address_region": "string",
  "address_city": "string",
  "address_street": "string",
  "address_house": "string",
  "address_building": "string",
  "address_flat": "string"
}
```

## Файлы

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/files/` | Список файлов |
| POST | `/files/` | Загрузить файл (multipart/form-data) |
| DELETE | `/files/{id}/` | Soft-delete файла |

### Загрузка (multipart/form-data)
```
employee: 1
title: "Скан паспорта"
file: <binary>
```

Query-параметры: `?employee=1`

## Кадровые операции

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/hr-operations/` | Список операций |
| POST | `/hr-operations/` | Создать операцию |
| GET | `/hr-operations/{id}/` | Получить операцию |
| PUT | `/hr-operations/{id}/` | Обновить операцию |
| DELETE | `/hr-operations/{id}/` | Soft-delete операции |

### Поля
```json
{
  "employee": 1,
  "operation_type": "hire | salary_change | department_change | dismissal",
  "department": 1,
  "position": 1,
  "salary": "50000.00",
  "effective_date": "2026-02-24"
}
```

### Типы операций
- `hire` — Принятие на работу
- `salary_change` — Изменение зарплаты
- `department_change` — Изменение отдела
- `dismissal` — Увольнение

## История изменений

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/change-history/` | Список записей (только чтение) |
| GET | `/change-history/{id}/` | Получить запись |

Query-параметры: `?object_type=organization&object_id=1&user=1`

## Пользователи (только admin)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/users/` | Список пользователей |
| GET | `/users/{id}/` | Получить пользователя |
| PUT | `/users/{id}/` | Обновить пользователя |
| DELETE | `/users/{id}/` | Soft-delete пользователя |

## Общие параметры

Все списковые эндпоинты поддерживают:
- `?page=1` — пагинация (по 20 записей)
- `?search=текст` — поиск
- `?ordering=name` / `?ordering=-name` — сортировка
- `?show_deleted=true` — показать удалённые записи

## Коды ответов

| Код | Описание |
|-----|----------|
| 200 | Успех |
| 201 | Создано |
| 204 | Удалено (soft-delete) |
| 400 | Ошибка валидации |
| 401 | Не авторизован |
| 403 | Нет прав доступа |
| 404 | Не найдено |
| 500 | Ошибка сервера |
