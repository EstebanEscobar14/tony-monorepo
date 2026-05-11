FROM node:22-alpine AS build
WORKDIR /app

ARG MFE_PAYMENTS_URL
ARG MFE_TREASURY_URL
ARG MFE_AUTH_URL
ARG MFE_COMPLIANCE_URL
ARG MFE_ONBOARDING_URL
ARG MFE_ADMIN_URL
ARG ANALYTICS_ELEMENT_URL

ENV MFE_PAYMENTS_URL=$MFE_PAYMENTS_URL
ENV MFE_TREASURY_URL=$MFE_TREASURY_URL
ENV MFE_AUTH_URL=$MFE_AUTH_URL
ENV MFE_COMPLIANCE_URL=$MFE_COMPLIANCE_URL
ENV MFE_ONBOARDING_URL=$MFE_ONBOARDING_URL
ENV MFE_ADMIN_URL=$MFE_ADMIN_URL
ENV ANALYTICS_ELEMENT_URL=$ANALYTICS_ELEMENT_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN if [ -n "$ANALYTICS_ELEMENT_URL" ]; then \
      sed -i "s|https://analytics.capitalflow.example/analytics-element.js|$ANALYTICS_ELEMENT_URL|g" shell/src/environments/environment.prod.ts; \
    fi
RUN npx nx build shell --configuration production --skip-nx-cache

FROM nginx:1.27-alpine
COPY deploy/nginx/spa.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/shell /usr/share/nginx/html
