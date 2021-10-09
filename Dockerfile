FROM node:alpine as compile-tailwindcss
WORKDIR /app
COPY /src .
RUN yarn install && yarn build-css \ 
    && apk --no-cache add build-base \
    && gcc public/shell/inc/c/demo-shell.c -o public/shell/inc/c/demo-shell

FROM haidousm/php-nginx:1.0.0
LABEL Maintainer="Moussa Haidous <moussa@haidousm.com>"
LABEL Description="my portfolio build on Alpine Linux"
LABEL version="1.0.0"
COPY --from=compile-tailwindcss --chown=nobody /app/public /var/www/html
USER root
RUN chown -R root /var/www/html/shell/inc/php/demo-folder
USER nobody