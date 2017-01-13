# Deployment

## Heroku

### Easy 5-Step Deployment Process

*Step 1:* Create a _Procfile_ with the following line: `web: npm run start:prod`. We do this because Heroku runs `npm run start` by default, so we need this setting to override the default run command.

*Step 2:* Install the Node.js buildpack for your Heroku app by running the following command: `heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v91 -a [your app name]`. Make sure to replace `#v91` with whatever the latest buildpack is, which you can [find here](https://github.com/heroku/heroku-buildpack-nodejs/releases).

*Step 3:* Add this line to your `package.json` file in the scripts area: `"heroku-postbuild": "npm run build",`. This is so Heroku can build your production assets when deploying (more of which you can [read about here](https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps)). Then, adjust the _prebuild_ script in your `package.json` file so it looks like this: `"prebuild": "npm run build:clean",` to avoid having Heroku attempt to run Jest tests (which are unsupported with this buildpack).

*Step 4:* Run `heroku config:set NPM_CONFIG_PRODUCTION=false` so that Heroku can compile the NPM modules included in your _devDependencies_ (since many of these packages are required for the build process).

*Step 5:* Follow the standard Heroku deploy process:

1. `git add .`
2. `git commit -m 'Made some epic changes as per usual'`
3. `git push heroku master`

## AWS S3

### Easy 7-Step Deployment Process

*Step 1:* Run `yarn` to install dependencies, then `npm run build` to create the `./build` folder.

*Step 2:* Navigate to [AWS S3](https://aws.amazon.com/s3) and login (or sign up if you don't have an account). Click on `Services` followed by `S3` in the dropdown.

*Step 3:* Click on `Create Bucket` and fill out both your `Bucket Name` and `Region` (for the USA we recommend `US Standard`). Click `Create` to create your bucket.

*Step 4:* Open the `Permissions` accordion on the right (under the `Properties` tab) after selecting your new bucket. Click `Add more permissions`, set the `Grantee` to `Everyone` (or whoever you want to be able to access the website), and give them `View Permissions`. Click `Save`.

*Step 5:* Click on the `Static Website Hosting` accordion where you should see the URL (or *endpoint*) of your website (ie. example.s3-website-us-east-1.amazonaws.com). Click `Enable website hosting` and fill in both the `Index document` and `Error document` input fields with `index.html`. Click `Save`.

*Step 6:* Click on your new S3 bucket on the left to open the bucket. Click `Upload` and select all the files within your `./build` folder. Click `Start Upload`. Once the files are done, select all of the files, right-click on the selected files (or click on the `Actions` button) and select `Make Public`.

*Step 7:* Click on the `Properties` tab, open `Static Website Hosting`, and click on the *Endpoint* link. The app should be running on that URL.
