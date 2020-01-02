FROM node:alpine AS build
COPY src /build/src
COPY public /build/public/
COPY yarn.lock package.json docker/.env.production /build/

WORKDIR /build
RUN yarn install && yarn build


FROM nginx:alpine
COPY --from=build /build/build/* /usr/share/nginx/html/
COPY --from=build /build/build/static /usr/share/nginx/html/static/
COPY docker/default.conf /etc/nginx/conf.d/
