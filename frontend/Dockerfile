FROM node:20.9.0-alpine3.18 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY ./frontend ./
RUN npm run build
EXPOSE 80

FROM socialengine/nginx-spa:latest
COPY --from=build /app/build /usr/share/nginx/html