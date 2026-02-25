# Пошаговая инструкция — Team Lead

## 1. Создание и инициализация репозитория

```bash
# Создать репозиторий на GitHub (если ещё не создан)
# Имя: GrippaNN-3
# Видимость: Public

# Клонировать
git clone https://github.com/Bread7Team/GrippaNN-3.git
cd GrippaNN-3

# Скопировать все файлы из ready-code/ (и общие файлы проекта) в корень
# Структура должна быть:
# GrippaNN-3/
# ├── api/
# ├── app/
# ├── docs/
# ├── .gitignore
# ├── .env.example
# └── README.md

# Первый коммит
git add .
git commit -m "feat: инициализация проекта — структура, README, .gitignore"
git push origin main
```

## 2. Защита ветки main

На GitHub:
1. Settings → Branches → Add branch protection rule
2. Branch name pattern: `main`
3. Включить:
   - Require a pull request before merging
   - Require approvals: 1
   - Do not allow bypassing the above settings (опционально)
4. Save changes

## 3. Работа с ветками (пример)

```bash
# Создать ветку для настройки проекта
git checkout -b feat/project-setup

# Добавить файлы settings.py, manage.py и т.д.
git add api/
git commit -m "feat: настройка Django проекта — settings, requirements, CORS, JWT"
git push origin feat/project-setup

# Создать PR на GitHub: feat/project-setup → main
# Можно замержить самому (как TL)
```

## 4. Как ревьюить PR

1. Перейти в PR на GitHub
2. Вкладка "Files changed" — просмотреть все изменения
3. Оставить комментарии к конкретным строкам (если есть замечания)
4. Если всё ок → "Review changes" → "Approve"
5. Merge: использовать **Squash and merge**
6. Удалить ветку после мержа

## 5. Разрешение конфликтов

Если при мерже возникает конфликт:
```bash
# Участник должен обновить свою ветку
git checkout feat/my-feature
git pull origin main
# Разрешить конфликты вручную
git add .
git commit -m "fix: разрешены конфликты с main"
git push origin feat/my-feature
```

## 6. Ежедневный чеклист

- [ ] Проверить открытые PR
- [ ] Провести code review
- [ ] Замержить одобренные PR
- [ ] Убедиться, что main не сломан
- [ ] Связаться с участниками, если кто-то отстаёт
