FROM node:alpine as compile-tailwindcss
WORKDIR /app
COPY /src .
RUN yarn install && yarn build-css 

FROM nginxinc/nginx-unprivileged:1.20-alpine
LABEL Maintainer="Moussa Haidous <moussa@haidousm.com>"
LABEL Description="haidousm.com frontend"
LABEL version="1.0.1"
COPY --from=compile-tailwindcss --chown=nobody /app/public /usr/share/nginx/html/
USER nobody