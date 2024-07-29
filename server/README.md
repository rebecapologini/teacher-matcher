# express-todo

## Для dev

### Создать .env файл

```dotenv
NODE_ENV=development

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

CLIENT_URL=http://localhost:5173
SESSION_SECRET=your_session_secret

```

### Запустить контейнеры

```bash
docker-compose -f docker-compose.dev.yml up
```

### Накатить миграции

```bash
docker compose -f docker-compose.dev.yml exec app npx sequelize db:migrate
```

### Накатить сиды

```bash
docker compose -f docker-compose.dev.yml exec app npx sequelize db:seed:all
```

#### Пояснение

`app` - имя контейнера с приложением

`docker compose up` - запускает контейнеры и создает их в фоне

`docker compose -f docker-compose.dev.yml exec app npx sequelize db:migrate` - запускает контейнер с приложением и выполняет команду на нем

## Для prod

### Установить Git

```bash
sudo apt update
sudo apt install git
```

### Установить Docker

```bash
sudo apt-get update && \
sudo apt-get install -y ca-certificates curl && \
sudo install -m 0755 -d /etc/apt/keyrings && \
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc && \
sudo chmod a+r /etc/apt/keyrings/docker.asc && \
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && \
sudo apt-get update && \
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin && \
sudo systemctl start docker && \
sudo systemctl enable docker && \
docker --version && \
docker compose version

```

### Установить Docker Compose

```bash
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

### Установить make

```bash
sudo apt-get update
sudo apt-get install make
```

### Создать app директорию

```bash
mkdir app
cd app
```

### Склонировать репозиторий

```bash
git clone https://github.com/${YOUR_USERNAME}/${PROJECT_NAME}.git
cd ${PROJECT_NAME}
```

### Добавить .env.production файл:

```dotenv
NODE_ENV=production

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

CLIENT_URL=
SESSION_SECRET=

```

### Запустить контейнеры

```bash
docker-compose -f docker-compose.prod.yml up
```

## Makefile

1. Обновление кода из репозитория:
    ```bash
    make update-code
    ```

2. Пересборка и перезапуск контейнеров для dev окружения:
    ```bash
    make build
    ```
3. Пересборка и перезапуск контейнеров для prod окружения:
    ```bash
    make build-prod
    ```

4. Очистка неиспользуемых данных (без удаления томов):
    ```bash
    make clean
    ```

5. Запуск всех миграций (для dev окружения):
    ```bash
    make migrate
    ```
6. Запуск всех миграций (для prod окружения):
    ```bash
    make migrate-prod
    ```

7. Запуск одной конкретной миграции (для dev окружения):
    ```bash
    make migrate MIGRATION_NAMES="20230101120000-create-users.js"
    ```

8. Запуск одной конкретной миграции (для prod окружения):
    ```bash
    make migrate-prod MIGRATION_NAMES="20230101120000-create-users.js"
    ```

9. Запуск нескольких конкретных миграций (для dev окружения):
    ```bash
    make migrate MIGRATION_NAMES="20230101120000-create-users.js 20230102120000-add-posts.js"
    ```
   
10. Запуск нескольких конкретных миграций (для prod окружения):
    ```bash
    make migrate-prod MIGRATION_NAMES="20230101120000-create-users.js 20230102120000-add-posts.js"
    ```

11. Отмена последней миграции (для dev окружения):
     ```bash
     make migrate-undo
     ```
12. Отмена последней миграции (для prod окружения):
     ```bash
     make migrate-undo-prod
     ```

13. Отмена конкретной миграции (для dev окружения):
     ```bash
     make migrate-undo MIGRATION_NAME="20230101120000-create-users.js"
     ```
    
14. Отмена конкретной миграции (для prod окружения):
     ```bash
     make migrate-undo-prod MIGRATION_NAME="20230101120000-create-users.js"
     ```

15. Отмена всех миграций (для dev окружения):
     ```bash
     make migrate-undo-all
     ```
16. Отмена всех миграций (для prod окружения):
     ```bash
     make migrate-undo-prod-all
     ```

17. Отмена всех миграций до конкретной (для dev окружения):
    ```bash
    make migrate-undo-all MIGRATION_NAME="20230101120000-create-users.js"
    ```
    
18. Отмена всех миграций до конкретной (для prod окружения):
    ```bash
    make migrate-undo-prod-all MIGRATION_NAME="20230101120000-create-users.js"
    ```

19. Полный процесс: обновление кода, пересборка и безопасная очистка (CleanUpdateBuild) (для dev окружения):
    ```bash
    make cub
    ```

20. Полный процесс: обновление кода, пересборка и безопасная очистка (CleanUpdateBuild) (для prod окружения):
    ```bash
    make cub-prod
    ```

21. Полный процесс: пересборка, безопасная очистка. Когда не нужно обновлять код (для dev окружения):
    ```bash
    make bc
    ```

22. Полный процесс: пересборка, безопасная очистка. Когда не нужно обновлять код (для prod окружения):
    ```bash
    make bc-prod
    ```

23. Сидинг базы данных (для dev окружения):
    ```bash
    make seed
    ```

24. Сидинг базы данных (для prod окружения):
    ```bash
    make seed-prod
    ```

## Команды Docker

### Показать список всех запущенных контейнеров

```bash
docker ps
```

### Следить за логами всех контейнеров в реальном времени

```bash
docker  logs -f
```

### Просмотреть логи только одного сервиса

```bash
docker  logs <service_name>
```

### Следить за логами сервиса frontend в режиме реального времени

```bash
docker  logs -f frontend
```

### Посмотреть логи за последние n строк (например, 100 строк)

```bash
docker  logs --tail 100
```

### Посмотреть последние 100 строк логов сервиса frontend

```bash
docker  logs --tail 100 frontend
```

## Дополнительная информация

`wait-for-it.sh` - скрипт для проверки соединения с базой данных и запуска контейнера с приложением в режиме реального
времени. Файл скачан отсюда: https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh