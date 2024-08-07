# Мы используем официальный образ Node.js версии 20 для сборки нашего приложения. Этот образ содержит все необходимое для работы с Node.js.
FROM node:22 as build

# Эта команда создает директорию `/app` внутри контейнера и делает ее текущей рабочей директорией. Это как сказать: "В этой папке мы будем работать с нашим кодом".
WORKDIR /app

# Эта команда копирует файлы `package.json` и `package-lock.json` из текущей директории компьютера в рабочую директорию контейнера (`/app`). Эти файлы содержат информацию о зависимостях нашего проекта. `./` означает "текущая директория".
COPY package*.json ./

# Эта команда устанавливает все зависимости, указанные в `package.json`. Это как если бы мы запускали `npm install` на своем компьютере.
RUN npm install

# Эта команда копирует все файлы нашего проекта в рабочую директорию контейнера.
COPY . .

# Запускаем команду `npm run build`, которая собирает наше приложение для продакшена, оптимизируя его для быстрого запуска и минимизируя размеры файлов.
RUN npm run build

# Мы используем легковесный образ Nginx для сервировки статических файлов нашего фронтенд-приложения.
FROM nginx:alpine

# Эта команда копирует собранные файлы из предыдущего контейнера в директорию Nginx, где они будут доступны для сервировки.
COPY --from=build /app/dist /usr/share/nginx/html

# Эта команда копирует наш собственный конфигурационный файл Nginx в контейнер.
COPY nginx.conf /etc/nginx/nginx.conf

# Эта команда указывает, что контейнер будет слушать запросы на порту 80. Это стандартный порт для веб
EXPOSE 80