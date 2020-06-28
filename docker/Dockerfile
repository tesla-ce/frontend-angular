### STAGE 1: Build ###
FROM node:alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:prod

### STAGE 2: Run ###
FROM nginx:alpine
#COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY docker/50-envsubst-on-env.sh /docker-entrypoint.d
COPY docker/nginx-default.conf.template /etc/nginx/templates/default.conf.template
RUN mkdir -p /tmp
COPY docker/env.template.js /tmp/
