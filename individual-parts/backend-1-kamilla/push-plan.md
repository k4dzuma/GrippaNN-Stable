# План пушей — Backend-1 (Kamilla)

| Дата | Что делать | Ветка | Коммит |
|------|-----------|-------|--------|
| 24.02 | Модели Organization, Department, Position + миграции | `feat/org-dept-pos-models` | `feat: модели организаций, отделов и должностей с soft-delete` |
| 25.02 | Сериализаторы для Organization, Department | `feat/org-dept-serializers` | `feat: сериализаторы организаций и отделов` |
| 25.02 | ViewSet для Organization (CRUD + фильтрация + история) | `feat/crud-organizations` | `feat: CRUD API для организаций с историей изменений` |
| 26.02 | ViewSet для Department (CRUD + фильтрация по организации) | `feat/crud-departments` | `feat: CRUD API для отделов с вложенной структурой` |
| 26.02 | Сериализатор и ViewSet для Position | `feat/crud-positions` | `feat: CRUD API для должностей` |
| 27.02 | Регистрация URL-маршрутов, тестирование через Postman | `feat/org-dept-pos-urls` | `feat: URL маршруты для справочников` |
| 28.02 | Исправления по результатам code review | `fix/org-dept-pos-fixes` | `fix: исправления по ревью — валидация, фильтрация` |
