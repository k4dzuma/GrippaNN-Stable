# Пошаговая инструкция — DevOps / Тестировщик

## 1. Клонировать репозиторий

```bash
git clone https://github.com/Bread7Team/GrippaNN-3.git
cd GrippaNN-3
```

## 2. Настроить backend

```bash
cd api
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py create_admin
python manage.py runserver
```

## 3. Настроить frontend

```bash
cd app
npm install
npm run dev
```

## 4. Создать ветку для своей работы

```bash
git checkout main
git pull origin main
git checkout -b feat/dev-setup
```

## 5. Работа и коммиты

```bash
# После внесения изменений
git add .
git commit -m "feat: описание изменений"
git push origin feat/dev-setup
```

## 6. Создать Pull Request

1. Зайти на GitHub → вкладка "Pull requests"
2. Нажать "New pull request"
3. Base: `main` ← Compare: `feat/dev-setup`
4. Написать описание
5. Нажать "Create pull request"
6. Дождаться ревью от Team Lead

## 7. Тестирование API (через Postman / curl)

### Авторизация
```bash
# Получить токен
curl -X POST http://localhost:8000/api/v1/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Использовать токен
curl http://localhost:8000/api/v1/organizations/ \
  -H "Authorization: Bearer <access_token>"
```

### Создание организации
```bash
curl -X POST http://localhost:8000/api/v1/organizations/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"ООО Ромашка","comment":"Тестовая организация"}'
```

### Soft-delete
```bash
curl -X DELETE http://localhost:8000/api/v1/organizations/1/ \
  -H "Authorization: Bearer <token>"

# Проверить, что запись помечена как удалённая
curl "http://localhost:8000/api/v1/organizations/?show_deleted=true" \
  -H "Authorization: Bearer <token>"
```
