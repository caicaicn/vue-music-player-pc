FROM nginx:latest

CMD ["npm", "run", "build"]

COPY mkdir /dist /webfile/vue-music-player-pc

WORKDIR /webfile/vue-music-player-pc
