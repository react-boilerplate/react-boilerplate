FROM node:5-slim

RUN apt-get update && apt-get install libpng12-0

WORKDIR /reactapp

RUN mkdir -p /reactapp
ADD package.json /reactapp/package.json
RUN npm install
ADD . /reactapp

RUN npm run build:dll

EXPOSE 3000

VOLUME /reactapp

CMD ["npm", "start"]