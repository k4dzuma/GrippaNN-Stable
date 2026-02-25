# План пушей — Backend-3

| Дата | Что делать | Ветка | Коммит |
|------|-----------|-------|--------|
| 24.02 | Модель User (CustomUser, роли admin/hr_manager) + миграции | `feat/user-model` | `feat: модель пользователя с ролями admin/hr_manager` |
| 25.02 | Permissions (IsAdmin, IsAdminOrHrManager) + mixins (SoftDelete, ChangeHistory) | `feat/permissions-mixins` | `feat: permissions и mixins для soft-delete и истории` |
| 25.02 | JWT авторизация: LoginView, RegisterView, MeView | `feat/jwt-auth` | `feat: JWT авторизация — login, register, me endpoints` |
| 26.02 | Модели HrOperation, ChangeHistory + миграции | `feat/hr-history-models` | `feat: модели кадровых операций и истории изменений` |
| 27.02 | Сериализаторы и ViewSet для HrOperation | `feat/crud-hr-operations` | `feat: CRUD API для кадровых операций` |
| 28.02 | ViewSet для ChangeHistory (read-only) + UserViewSet | `feat/history-users-api` | `feat: API истории изменений и управления пользователями` |
| 01.03 | Тестирование JWT + ролей, исправления | `fix/auth-fixes` | `fix: доработка JWT авторизации и ролевой модели` |
| 02.03 | Финальные исправления по ревью | `fix/backend3-final` | `fix: финальные исправления backend-3` |
