# Backend-1 (Kamilla) — Зона ответственности

## Роль
Backend-разработчик: Организации, Отделы, Должности.

## Задачи

1. **Модели** — Organization, Department, Position (с soft-delete)
2. **Сериализаторы** — OrganizationSerializer, DepartmentSerializer, PositionSerializer
3. **Views** — CRUD ViewSet для каждой модели с фильтрацией и поиском
4. **URLs** — Регистрация роутеров для организаций, отделов, должностей
5. **История** — Использование ChangeHistoryMixin для записи истории

## Файлы, за которые отвечаю

```
api/core/models/organization.py
api/core/models/department.py
api/core/models/position.py
api/core/serializers/organization.py
api/core/serializers/department.py
api/core/serializers/position.py
api/core/views/organization.py
api/core/views/department.py
api/core/views/position.py
```

## Куда копировать ready-code

Файлы из `ready-code/` копируются в соответствующие папки проекта:
- `models/` → `api/core/models/`
- `serializers/` → `api/core/serializers/`
- `views/` → `api/core/views/`
