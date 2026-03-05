FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx nx build mfePayments --configuration production --skip-nx-cache

FROM nginx:1.27-alpine
COPY deploy/nginx/static.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/mfe-payments /usr/share/nginx/html
