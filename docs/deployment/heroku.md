# Deploy to Heroku

### Easy 3-Step Deployment Process

_Step 1:_ Create a _Procfile_ with the following line: `web: npm run start:prod`. We do this because Heroku runs `npm run start` by default, so we need this setting to override the default run command.

_Step 2:_ Install the Node.js buildpack for your Heroku app by running the following command: `heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v133 -a [your app name]`. Make sure to replace `#v133` with whatever the latest buildpack is, which you can [find here](https://github.com/heroku/heroku-buildpack-nodejs/releases).

_Step 3:_ Follow the standard Heroku deploy process:

1.  `git add .`
2.  `git commit -m 'Made some epic changes as per usual'`
3.  `git push heroku master`
