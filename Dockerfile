FROM nginx:latest

# CMD ["npm", "build"]
RUN yarn build
# run mkdir /webfile/vue-music-player-pc/

WORKDIR /webfile/vue-music-player-pc/

COPY dist/ /webfile/vue-music-player-pc/


