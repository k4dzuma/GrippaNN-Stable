# Пошаговая инструкция — Backend-2

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
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py create_admin
```

## 3. Создать ветку

```bash
git checkout main
git pull origin main
git checkout -b feat/employee-file-models
```

## 4. Скопировать готовый код

Из папки `ready-code/` скопировать файлы в проект:
```
ready-code/models/employee.py  →  api/core/models/employee.py
ready-code/models/file.py      →  api/core/models/file.py
```

**Важно:** Проверить что в `api/core/models/__init__.py` есть импорты Employee и File.

## 5. Создать миграции

```bash
python manage.py makemigrations core
python manage.py migrate
```

## 6. Закоммитить

```bash
git add api/core/models/employee.py api/core/models/file.py api/core/migrations/
git commit -m "feat: модели сотрудников и файлов с soft-delete"
git push origin feat/employee-file-models
```

## 7. Создать PR на GitHub

1. Base: `main` ← Compare: `feat/employee-file-models`
2. Описание: добавлены модели Employee (все паспортные и адресные поля) и File
3. Дождаться ревью Team Lead

## 8. Тестирование загрузки файлов

```bash
# Создать сотрудника
curl -X POST http://localhost:8000/api/v1/employees/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"last_name":"Иванов","first_name":"Иван"}'

# Загрузить файл
curl -X POST http://localhost:8000/api/v1/files/ \
  -H "Authorization: Bearer <token>" \
  -F "employee=1" \
  -F "title=Скан паспорта" \
  -F "file=@/path/to/passport.pdf"
```
