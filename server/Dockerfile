# Установка базового образа для сборки
FROM node:22-alpine AS base

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

# Установка образа для разработки
FROM base AS development

ENV NODE_ENV=development
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
RUN apk add --no-cache postgresql-client bash
CMD ["sh", "-c", "/wait-for-it.sh db:5432 -- npm run dev"]

# Установка образа для продакшена
FROM base AS production

ENV NODE_ENV=production
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
RUN apk add --no-cache postgresql-client bash
CMD ["sh", "-c", "/wait-for-it.sh db:5432 -- npm run migrate && npm run seed && npm start"]
