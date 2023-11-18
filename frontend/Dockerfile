FROM node:20.9.0-alpine3.18 AS build

WORKDIR /app

COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend ./
RUN npm run build
EXPOSE 80

FROM socialengine/nginx-spa:latest
WORKDIR /app
COPY --from=build /app/build .