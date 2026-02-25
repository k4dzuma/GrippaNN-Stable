# Пошаговая инструкция — Backend-3

## 1. Клонировать и настроить

```bash
git clone https://github.com/Bread7Team/GrippaNN-3.git
cd GrippaNN-3/api
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

## 2. Создать ветку и скопировать модель User

```bash
git checkout main && git pull origin main
git checkout -b feat/user-model
```

Скопировать:
```
ready-code/models/user.py  →  api/core/models/user.py
```

Убедиться, что в `api/api/settings.py` есть:
```python
AUTH_USER_MODEL = 'core.User'
```

```bash
python manage.py makemigrations core
python manage.py migrate
python manage.py create_admin

git add .
git commit -m "feat: модель пользователя с ролями admin/hr_manager"
git push origin feat/user-model
# Создать PR
```

## 3. Permissions и Mixins

```bash
git checkout main && git pull origin main
git checkout -b feat/permissions-mixins
```

Скопировать:
```
ready-code/views/auth.py      →  api/core/views/auth.py
```

Также скопировать `permissions.py` и `mixins.py` из общих файлов проекта.

## 4. JWT авторизация

```bash
git checkout -b feat/jwt-auth
```

Скопировать:
```
ready-code/serializers/user.py  →  api/core/serializers/user.py
ready-code/views/auth.py        →  api/core/views/auth.py
ready-code/views/user.py        →  api/core/views/user.py
```

Проверить что в `api/core/urls.py` есть маршруты auth:
```python
path('auth/login/', LoginView.as_view(), name='auth-login'),
path('auth/register/', RegisterView.as_view(), name='auth-register'),
path('auth/refresh/', TokenRefreshView.as_view(), name='auth-refresh'),
path('auth/me/', MeView.as_view(), name='auth-me'),
```

## 5. Тестирование JWT

```bash
# Login
curl -X POST http://localhost:8000/api/v1/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Ответ: {"access": "eyJ...", "refresh": "eyJ...", "user": {...}}

# Me
curl http://localhost:8000/api/v1/auth/me/ \
  -H "Authorization: Bearer <access_token>"

# Refresh
curl -X POST http://localhost:8000/api/v1/auth/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh":"<refresh_token>"}'
```

## 6. Кадровые операции и история

```bash
git checkout main && git pull origin main
git checkout -b feat/hr-history-models
```

Скопировать модели, сериализаторы и views для HrOperation и ChangeHistory.

## 7. Коммиты и PR — как обычно

```bash
git add .
git commit -m "feat: описание"
git push origin feat/branch-name
# Создать PR → ждать ревью
```
