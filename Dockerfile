FROM nginx:latest

RUN npm run build 

COPY /dist /webfile/vue-music-player-pc

WORKDIR /webfile/vue-music-player-pc
