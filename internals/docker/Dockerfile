FROM node:6-slim

RUN apt-get update && apt-get install libpng12-0

WORKDIR /reactapp

RUN wget -O - https://github.com/mxstbr/react-boilerplate/archive/master.tar.gz | tar xzf - --strip-components=1
RUN npm install
RUN npm run build:dll

EXPOSE 3000

VOLUME /reactapp/app
VOLUME /reactapp/server

CMD ["npm", "start"]
