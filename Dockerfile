FROM node:alpine as compile-tailwindcss
WORKDIR /app
COPY . .
RUN yarn install && yarn build-css

FROM nginx:alpine
COPY --from=compile-tailwindcss /app/public /usr/share/nginx/html
