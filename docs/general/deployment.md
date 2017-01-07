# Deployment

## Heroku

### Easy 5-Step Deployment Process

*Step 1:* Create a _Procfile_ with the following line: `web: npm run start:prod`. We do this because Heroku runs `npm run start` by default, so we need this setting to override the default run command.

*Step 2:* Install the Node.js buildpack for your Heroku app by running the following command: `heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v91 -a [your app name]`. Make sure to replace `#v91` with whatever the latest buildpack is, which you can [find here](https://github.com/heroku/heroku-buildpack-nodejs/releases).

*Step 3:* Add this line to your `package.json` file in the scripts area: `"heroku-postbuild": "npm run build",`. This is so Heroku can build your production assets when deploying (more of which you can [read about here](https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps)). Then, adjust the _prebuild_ script in your `package.json` file so it looks like this: `"prebuild": "npm run build:clean",` to avoid having Heroku attempt to run Karma tests (which are unsupported with this buildpack).

*Step 4:* Run `heroku config:set NPM_CONFIG_PRODUCTION=false` so that Heroku can compile the NPM modules included in your _devDependencies_ (since many of these packages are required for the build process).

*Step 5:* Follow the standard Heroku deploy process:

1. `git add .`
2. `git commit -m 'Made some epic changes as per usual'`
3. `git push heroku master`
