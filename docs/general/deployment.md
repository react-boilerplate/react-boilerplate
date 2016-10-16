# Deployment

## Heroku

### Easy 5-Step Deployment Process

*Step 1:* Create a Procfile with the following line: `web: npm run start:prod`. We are doing this because heroku runs `npm run start` by default, so we need this setting to override the default run command. 

*Step 2:* Install heroku's buildpack on your heroku app by running the following command: `heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v90 -a [your app name]`. Make sure to replace `#v90` with whatever the latest buildpack is which you can [find here](https://github.com/heroku/heroku-buildpack-nodejs/releases).

*Step 3:* Add this line to your Package.json file in the scripts area: `"postinstall": "npm run build:clean",`. This is because Heroku runs this as part of their build process (more of which you can [read about here](https://devcenter.heroku.com/articles/nodejs-support#build-behavior)).

*Step 4:* Run `heroku config:set NPM_CONFIG_PRODUCTION=false` so that Heroku can compile the NPM Modules included in your devDependencies (since many of these packages are required for the build process).

*Step 5:* Follow the standard Heroku deploy process at this point:

1. `git add .`
2. `git commit -m 'Made some epic changes as per usual'`
3. `git push heroku master`

## Docker Container
### Requirement
* To deploy using docker container, you need to have an account in Docker Registry. You can set up one for free at https://hub.docker.com
* After finish setup your account, run `docker login` in ur command line and put your credential. It should then show `LOGIN SUCCEED` and you can proceed the deployment steps below.

### Step to deploy using docker container in production
1. Make sure you are stand on the project root directory.
2. `mv internals/docker/.dockerignore ./`
3. `docker build -t {DOCKERHUB_USERNAME}/{REACT_PROJECT_NAME} -f internals/docker/Dockerfile .`
4. `docker push {DOCKERHUB_USERNAME}/{REACT_PROJECT_NAME}` to push the docker image to docker registry.
5. `ssh` to your server instance, and run `docker run -p 80:3000 -d {DOCKERHUB_USERNAME}/{REACT_PROJECT_NAME}`
6. You can now access your react application by your server's public ip.
7. To stop the docker container, run `docker ps` and `docker stop <APPLICAITON_NAME>`

**Note:** Make sure you replace `{DOCKERHUB_USERNAME}` and `{REACT_PROJECT_NAME}` as your value.