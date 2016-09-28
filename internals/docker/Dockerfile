FROM node:6-slim

ENV KARMA_BROWSER PhantomJS
RUN apt-get update && apt-get install libpng12-0

WORKDIR /reactapp

ADD package.json package.json
RUN npm install
ADD . .

VOLUME /reactapp

EXPOSE 3000

CMD ["npm", "run", "start:production"]
