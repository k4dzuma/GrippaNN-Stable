# Backend-2 — Зона ответственности

## Роль
Backend-разработчик: Сотрудники и Файлы.

## Задачи

1. **Модели** — Employee, File (с soft-delete, upload_to)
2. **Сериализаторы** — EmployeeSerializer, FileSerializer
3. **Views** — CRUD ViewSet для сотрудников + загрузка файлов (MultiPartParser)
4. **URLs** — Регистрация роутеров для сотрудников и файлов
5. **История** — Использование ChangeHistoryMixin для записи истории сотрудников

## Файлы, за которые отвечаю

```
api/core/models/employee.py
api/core/models/file.py
api/core/serializers/employee.py
api/core/serializers/file.py
api/core/views/employee.py
api/core/views/file.py
```

## Куда копировать ready-code

```
ready-code/models/employee.py     →  api/core/models/employee.py
ready-code/models/file.py         →  api/core/models/file.py
ready-code/serializers/employee.py →  api/core/serializers/employee.py
ready-code/serializers/file.py     →  api/core/serializers/file.py
ready-code/views/employee.py       →  api/core/views/employee.py
ready-code/views/file.py           →  api/core/views/file.py
```
