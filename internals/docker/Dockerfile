FROM node:10-slim

RUN apt-get update && apt-get install libpng12-0 bzip2

WORKDIR /code

ADD package.json package.json
ADD yarn.lock yarn.lock
ADD internals internals
RUN yarn install

CMD ["npm", "run", "start:production"]
