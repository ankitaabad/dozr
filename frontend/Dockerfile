FROM node:20.9.0-alpine3.18 AS build

WORKDIR /app

# COPY ./frontend/package.json ./
# COPY ./frontend/package-lock.json ./
COPY ./frontend .
RUN NODE_ENV=development npm install
RUN npm run build

FROM socialengine/nginx-spa:latest
WORKDIR /app
COPY --from=build /app/build .