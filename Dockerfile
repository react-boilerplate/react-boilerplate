FROM node:carbon-alpine

WORKDIR /app

EXPOSE 3000

COPY package.json package.json

RUN npm install

COPY . .

CMD [ "npm", "run", "start"]



