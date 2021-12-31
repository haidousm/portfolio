FROM node:alpine as compile-tailwindcss
WORKDIR /app
COPY /src .
RUN yarn install && yarn build-css 

FROM nginxinc/nginx-unprivileged:1.20-alpine
LABEL Maintainer="Moussa Haidous <moussa@haidousm.com>"
LABEL Description="haidousm.com's frontend"
COPY --from=compile-tailwindcss --chown=nobody /app/public /usr/share/nginx/html/
COPY --chown=nobody nginx.conf /etc/nginx/conf.d/default.conf
USER nobody
