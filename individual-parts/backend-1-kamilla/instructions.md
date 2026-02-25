# Пошаговая инструкция — Backend-1 (Kamilla)

## 1. Клонировать репозиторий

```bash
git clone https://github.com/Bread7Team/GrippaNN-3.git
cd GrippaNN-3
```

## 2. Настроить окружение

```bash
cd api
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Linux/Mac

pip install -r requirements.txt
cp .env.example .env
```

## 3. Создать ветку

```bash
git checkout main
git pull origin main
git checkout -b feat/org-dept-pos-models
```

## 4. Скопировать готовый код

Из папки `ready-code/` скопировать файлы:

```
ready-code/models/organization.py  →  api/core/models/organization.py
ready-code/models/department.py    →  api/core/models/department.py
ready-code/models/position.py      →  api/core/models/position.py
```

**Важно:** Убедиться, что в `api/core/models/__init__.py` импортированы все три модели.

## 5. Создать миграции

```bash
cd api
python manage.py makemigrations core
python manage.py migrate
```

## 6. Закоммитить и запушить

```bash
git add api/core/models/organization.py api/core/models/department.py api/core/models/position.py
git add api/core/migrations/
git commit -m "feat: модели организаций, отделов и должностей с soft-delete"
git push origin feat/org-dept-pos-models
```

## 7. Создать Pull Request

1. Зайти на GitHub
2. "Pull requests" → "New pull request"
3. Base: `main` ← Compare: `feat/org-dept-pos-models`
4. Описание: что было сделано, какие модели добавлены
5. Дождаться ревью от Team Lead

## 8. Следующие шаги (по дням)

### 25.02 — Сериализаторы и ViewSet для организаций
```bash
git checkout main && git pull origin main
git checkout -b feat/crud-organizations

# Скопировать:
# ready-code/serializers/organization.py → api/core/serializers/organization.py
# ready-code/views/organization.py → api/core/views/organization.py

git add .
git commit -m "feat: CRUD API для организаций с историей изменений"
git push origin feat/crud-organizations
# Создать PR
```

### 26.02 — CRUD для отделов и должностей
```bash
git checkout main && git pull origin main
git checkout -b feat/crud-departments

# Скопировать serializers + views для departments и positions
git add .
git commit -m "feat: CRUD API для отделов с вложенной структурой"
git push origin feat/crud-departments
# Создать PR
```

## 9. Проверка своего кода

После каждого пуша проверяй:
```bash
python manage.py runserver

# Организации
curl -X POST http://localhost:8000/api/v1/organizations/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Тест","comment":"Тестовая организация"}'

# Отделы
curl -X POST http://localhost:8000/api/v1/departments/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"organization":1,"name":"IT отдел","comment":""}'
```
