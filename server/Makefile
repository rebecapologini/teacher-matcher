.PHONY: update-code build build-prod clean migrate migrate-undo migrate-undo-all seed seed-prod cub bc cub-prod bc-prod

# Обновление кода из репозитория
update-code:
	git pull

# Пересборка и перезапуск контейнеров для dev окружения. Добавьте -d в конец команды для запуска в фоне
build:
	docker compose -f docker-compose.dev.yml up --build

# Пересборка и перезапуск контейнеров для prod окружения. Добавьте -d в конец команды для запуска в фоне
build-prod:
	docker compose -f docker-compose.prod.yml up --build

# Очистка неиспользуемых данных (без удаления томов)
clean:
	docker system prune -f

# Миграция базы данных с условием для dev окружения
migrate:
	@if [ -z "$(MIGRATION_NAMES)" ]; then \
		echo "Запуск всех миграций"; \
		docker compose -f docker-compose.dev.yml exec app npx sequelize db:migrate; \
	else \
		echo "Запуск указанных миграций"; \
		for migration in $(MIGRATION_NAMES); do \
			echo "Запуск миграции: $$migration"; \
			docker compose -f docker-compose.dev.yml exec app npx sequelize db:migrate --name $$migration; \
		done; \
	fi

# Миграция базы данных с условием для prod окружения
migrate-prod:
	@if [ -z "$(MIGRATION_NAMES)" ]; then \
		echo "Запуск всех миграций"; \
		docker compose -f docker-compose.prod.yml exec app npx sequelize db:migrate; \
	else \
		echo "Запуск указанных миграций"; \
		for migration in $(MIGRATION_NAMES); do \
			echo "Запуск миграции: $$migration"; \
			docker compose -f docker-compose.prod.yml exec app npx sequelize db:migrate --name $$migration; \
		done; \
	fi

# Отмена последней миграции для dev окружения
migrate-undo:
	@if [ -z "$(MIGRATION_NAME)" ]; then \
		echo "Отмена последней миграции"; \
		docker compose -f docker-compose.dev.yml exec app npx sequelize-cli db:migrate:undo; \
	else \
		echo "Отмена миграции: $(MIGRATION_NAME)"; \
		docker compose -f docker-compose.dev.yml exec app npx sequelize-cli db:migrate:undo --name $(MIGRATION_NAME); \
	fi

# Отмена последней миграции для prod окружения
migrate-undo-prod:
	@if [ -z "$(MIGRATION_NAME)" ]; then \
		echo "Отмена последней миграции"; \
		docker compose -f docker-compose.prod.yml exec app npx sequelize-cli db:migrate:undo; \
	else \
		echo "Отмена миграции: $(MIGRATION_NAME)"; \
		docker compose -f docker-compose.prod.yml exec app npx sequelize-cli db:migrate:undo --name $(MIGRATION_NAME); \
	fi

# Отмена всех миграций для dev окружения
migrate-undo-all:
	@if [ -z "$(MIGRATION_NAME)" ]; then \
		echo "Отмена всех миграций"; \
		docker compose -f docker-compose.dev.yml exec app npx sequelize-cli db:migrate:undo:all; \
	else \
		echo "Отмена всех миграций до: $(MIGRATION_NAME)"; \
		docker compose -f docker-compose.dev.yml exec app npx sequelize-cli db:migrate:undo:all --name $(MIGRATION_NAME); \
	fi

# Отмена всех миграций для prod окружения
migrate-undo-all-prod:
	@if [ -z "$(MIGRATION_NAME)" ]; then \
		echo "Отмена всех миграций"; \
		docker compose -f docker-compose.prod.yml exec app npx sequelize-cli db:migrate:undo:all; \
	else \
		echo "Отмена всех миграций до: $(MIGRATION_NAME)"; \
		docker compose -f docker-compose.prod.yml exec app npx sequelize-cli db:migrate:undo:all --name $(MIGRATION_NAME); \
	fi

# Сидинг базы данных для dev окружения
seed:
	docker compose -f docker-compose.dev.yml exec app npx sequelize-cli db:seed:all

# Сидинг базы данных для prod окружения
seed-prod:
	docker compose -f docker-compose.prod.yml exec app npx sequelize-cli db:seed:all

# Полный процесс для dev окружения: обновление кода, пересборка и безопасная очистка (CleanUpdateBuild)
cub: update-code build clean

# Полный процесс для dev окружения: пересборка, безопасная очистка. Когда не нужно обновлять код
bc: build clean

# Полный процесс для prod окружения: обновление кода, пересборка и безопасная очистка (CleanUpdateBuild)
cub-prod: update-code build-prod clean

# Полный процесс для prod окружения: пересборка, безопасная очистка. Когда не нужно обновлять код
bc-prod: build-prod clean
