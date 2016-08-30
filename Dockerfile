FROM node:6-slim

RUN apt-get update && apt-get install libpng12-0

WORKDIR /reactapp

COPY package.json .
RUN npm install
COPY . .

RUN npm run build:dll

EXPOSE 3000

VOLUME /reactapp

CMD ["npm", "start"]
