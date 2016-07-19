FROM node:5-slim

RUN apt-get update
RUN apt-get install libpng12-0

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /reactapp && cp -a /tmp/node_modules /reactapp

ADD . /reactapp

WORKDIR /reactapp

RUN npm run build:dll

EXPOSE 3000

VOLUME /reactapp

CMD ["npm", "run", "start"]