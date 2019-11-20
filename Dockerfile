FROM nginx:latest

CMD ["npm", "run", "build"]

COPY dist /webfile/vue-music-player-pc

WORKDIR /webfile/vue-music-player-pc
