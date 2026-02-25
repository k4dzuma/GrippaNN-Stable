# Backend-3 — Зона ответственности

## Роль
Backend-разработчик: Кадровые операции, История изменений, Пользователи, JWT-авторизация.

## Задачи

1. **Модели** — HrOperation, ChangeHistory, User (CustomUser с ролями)
2. **Сериализаторы** — HrOperationSerializer, ChangeHistorySerializer, UserSerializer, LoginSerializer
3. **Views** — CRUD для операций, Read-only для истории, CRUD пользователей (admin), JWT login/register/me
4. **JWT** — Настройка SimpleJWT, login endpoint, refresh endpoint, permissions
5. **Permissions** — IsAdmin, IsAdminOrHrManager
6. **Mixins** — ChangeHistoryMixin, SoftDeleteMixin

## Файлы, за которые отвечаю

```
api/core/models/hr_operation.py
api/core/models/change_history.py
api/core/models/user.py
api/core/serializers/hr_operation.py
api/core/serializers/change_history.py
api/core/serializers/user.py
api/core/views/hr_operation.py
api/core/views/change_history.py
api/core/views/user.py
api/core/views/auth.py
api/core/permissions.py
api/core/mixins.py
```
