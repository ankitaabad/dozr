FROM node:20.9.0-alpine3.18 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 80
FROM nginx:mainline-alpine3.18-slim
COPY --from=build /app/build /usr/share/nginx/html