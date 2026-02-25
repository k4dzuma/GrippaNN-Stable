# План пушей — Backend-2

| Дата | Что делать | Ветка | Коммит |
|------|-----------|-------|--------|
| 24.02 | Модели Employee и File + миграции | `feat/employee-file-models` | `feat: модели сотрудников и файлов с soft-delete` |
| 25.02 | Сериализатор Employee (все поля ТЗ, computed full_name) | `feat/employee-serializer` | `feat: сериализатор сотрудников с computed full_name` |
| 26.02 | ViewSet Employee (CRUD + поиск по ФИО + история) | `feat/crud-employees` | `feat: CRUD API для сотрудников с поиском и историей` |
| 27.02 | Сериализатор + ViewSet File (multipart upload) | `feat/file-upload` | `feat: загрузка и soft-delete файлов сотрудников` |
| 28.02 | Фильтрация файлов по employee, тестирование | `feat/file-filters` | `feat: фильтрация файлов по сотруднику` |
| 01.03 | Исправления по результатам code review | `fix/employee-file-fixes` | `fix: исправления по ревью — валидация, обработка ошибок` |
