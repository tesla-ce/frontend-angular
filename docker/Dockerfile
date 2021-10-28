### STAGE 1: Build ###
FROM node:16.13.0-alpine3.14 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN sed -nE 's/^\s*"version": "(.*?)",$/\1/p' /usr/src/app/package.json > /usr/src/app/frontend_version
RUN npm run build:prod

### STAGE 2: Run ###
FROM nginx:alpine
WORKDIR /usr/src/app
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html/ui
COPY --from=build /usr/src/app/frontend_version /usr/share/nginx/html/ui/frontend_version
COPY docker/50-envsubst-on-env.sh /docker-entrypoint.d
RUN chmod +x /docker-entrypoint.d/50-envsubst-on-env.sh
#COPY docker/nginx-default.conf.template /etc/nginx/templates/default.conf.template
RUN mkdir -p /tmp
COPY docker/env.template.js /tmp/
