FROM nginx:latest

RUN mkdir -p /webfile/vue-music-player-pc

WORKDIR /webfile/vue-music-player-pc/

COPY ./dist/ /webfile/vue-music-player-pc/

RUN mkdir -p nginx

COPY nginx/nginx.conf /etc/nginx/nginx.conf