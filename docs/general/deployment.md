# Deployment

## Heroku

### Easy 5-Step Deployment Process

**Step 1:** Create a `Procfile` with the following line: `web: npm run start:prod`. We are doing this because heroku runs `npm run start` by default, so we need this setting to override the default run command. 

**Step 2:** Install heroku's buildpack on your heroku app by running the following command: `heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v90 -a [your app name]`. Make sure to replace `#v90` with whatever the latest buildpack is which you can [find here](https://github.com/heroku/heroku-buildpack-nodejs/releases).

**Step 3:** Add this line to your Package.json file in the scripts area: `"postinstall": "npm run build:clean",`. This is because Heroku runs this as part of their build process (more of which you can [read about here](https://devcenter.heroku.com/articles/nodejs-support#build-behavior)).

**Step 4:** Run `heroku config:set NPM_CONFIG_PRODUCTION=false` so that Heroku can compile the NPM Modules included in your devDependencies (since many of these packages are required for the build process).

**Step 5:** Follow the standard Heroku deploy process at this point:

1. `git add .`
2. `git commit -m 'Made some epic changes as per usual'`
3. `git push heroku master`

## Docker

**Step 1:** Create a `.dockerignore`
```
coverage
build
node_modules
stats.json
.DS_Store
npm-debug.log
.idea
Dockerfile
```

**Step 2:** Create a `Dockerfile`
```Dockerfile
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
```

**Step 3:** Create a `docker-compose.yml`
```yml
version: '2'
services:
  app:
    build: .
    ports:
      - 3000:3000
    command: bash -c " npm start"
```

**Step 4:** Build the image

Next, you need to build your image. Make sure that you are in the root directory of the project.
Then, run the below command. You can specify the image name after `-t` (e.g. `myweb_image`)
```
docker build -t myweb_image .
```
If everything goes well, you can summon the docker image up by running below command.
```
docker run -d -p 3000:3000 --name myweb_container myweb_image
```
Now, you should be accessible to your very first time of this boilerplate by accessing `http://localhost:3000` or `your-docker-machine-ip:3000`

However, you cannot made any change in that example app yet. We need to link docker container directory
to what we have in our local machine. First, let's destroy the old container.
```
docker rm -f myweb_container
```
Then, let's run below command to create new container with a link directory to your local machine
```
docker run -it -p 3000:3000 -v {YOUR_PROJECT_ROOT_FULL_PATH}:/reactapp --name myweb_container myweb_image bash
```
Now, your prompt will looks difference, because you are now in the container!
Let's start with install all node dependencies
```
npm install
```
After finish installed, try start the app and you're now good to go!
```
npm start
```
