FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx nx build docs --configuration production --skip-nx-cache

FROM nginx:1.27-alpine
COPY deploy/nginx/spa.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/docs/browser /usr/share/nginx/html
