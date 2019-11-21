FROM nginx:latest

WORKDIR /webfile/vue-music-player-pc/

COPY ./dist/ /webfile/vue-music-player-pc/

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

