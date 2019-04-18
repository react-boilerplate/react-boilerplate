# Deployment

## Heroku

### Easy 3-Step Deployment Process

_Step 1:_ Create a _Procfile_ with the following line: `web: npm run start:prod`. We do this because Heroku runs `npm run start` by default, so we need this setting to override the default run command.

_Step 2:_ Install the Node.js buildpack for your Heroku app by running the following command: `heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v133 -a [your app name]`. Make sure to replace `#v133` with whatever the latest buildpack is, which you can [find here](https://github.com/heroku/heroku-buildpack-nodejs/releases).

_Step 3:_ Follow the standard Heroku deploy process:

1.  `git add .`
2.  `git commit -m 'Made some epic changes as per usual'`
3.  `git push heroku master`

## AWS S3

### Easy 7-Step Deployment Process

_Step 1:_ Run `npm install` to install dependencies, then `npm run build` to create the `./build` folder.

_Step 2:_ Navigate to [AWS S3](https://aws.amazon.com/s3) and login (or sign up if you don't have an account). Click on `Services` followed by `S3` in the dropdown.

_Step 3:_ Click on `Create Bucket` and fill out both your `Bucket Name` and `Region` (for the USA we recommend `US Standard`). Click `Create` to create your bucket.

_Step 4:_ Open the `Permissions` accordion on the right (under the `Properties` tab) after selecting your new bucket. Click `Add more permissions`, set the `Grantee` to `Everyone` (or whoever you want to be able to access the website), and give them `View Permissions`. Click `Save`.

_Step 5:_ Click on the `Static Website Hosting` accordion where you should see the URL (or _endpoint_) of your website (ie. example.s3-website-us-east-1.amazonaws.com). Click `Enable website hosting` and fill in both the `Index document` and `Error document` input fields with `index.html`. Click `Save`.

_Step 6:_ Click on your new S3 bucket on the left to open the bucket. Click `Upload` and select all the files within your `./build` folder. Click `Start Upload`. Once the files are done, select all of the files, right-click on the selected files (or click on the `Actions` button) and select `Make Public`.

_Step 7:_ Click on the `Properties` tab, open `Static Website Hosting`, and click on the _Endpoint_ link. The app should be running on that URL.

## Deploying in a subfolder of an existing server

Suppose you want users to access the app on `https://<host>/web-app`

_Step 1:_ Configure webpack to inject necessary environment variables into the app

- Changes below are made to `internals/webpack/webpack.base.babel.js` file.

```diff
+ const BUILD_FOLDER_PATH = process.env.BUILD_FOLDER_PATH || 'build';
+ const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';
```

```diff
- path: path.resolve(process.cwd(), 'build'),
- publicPath: '/',
+ path: path.resolve(process.cwd(), BUILD_FOLDER_PATH),
+ publicPath: PUBLIC_PATH,
```

```diff
# inside EnvironmentPlugin
+    PUBLIC_PATH: '/',
```

_Step 2:_ add `basename` to the history

- Changes below are made to `app/utils/history.js` file.

```diff
- const history = createHistory();
+ const basename = process.env.PUBLIC_PATH;
+ const history = createHistory({ basename });
```

_Step 3:_ Run `PUBLIC_PATH='/web-app/' BUILD_FOLDER_PATH='build/web-app' npm run build`, to save production build inside `./build/web-app` folder.

_Step 4:_ Upload/Place the created `web-app` folder in your server's web-root folder

_Endpoint_ The app should be accessible on `https://<host>/web-app`.

_NOTE_ that this has been tested on both APACHE and NGINX servers.

## AWS Elastic Beanstalk

Please refer to to issue [#2566](https://github.com/react-boilerplate/react-boilerplate/issues/2566) for more explanation.

### Pre-requisites

1. Create an account on [AWS console](https://console.aws.amazon.com/)
2. Install EB CLI ([AWS documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html?icmpid=docs_elasticbeanstalk_console#eb-cli3-install.cli-only))
3. Create your [AWS EB profile](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-configuration.html#eb-cli3-profile).
   In case you are using a continous deployment tool, you can create another user
   for your CD tool as well.
4. Create your Elastic Beanstalk [application](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications.html) and [environment](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.html) (either via CLI or web console)
5. [Configure your EB CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-configuration.html). You should have a `.elasticbeanstalk/config.yml` if properly configured

### Configuration

_Step 1:_ Add AWS EB start scripts in _package.json_: `"aws-eb:prod": "npm run build && npm run start:prod"`

_Step 2:_ Create a `.ebextensions/aws.config` file:

```yaml
# Check https://github.com/react-boilerplate/react-boilerplate/issues/2566 for details
option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeCommand: 'npm run aws-eb:prod'
  aws:elasticbeanstalk:application:environment:
    NPM_USE_PRODUCTION: false
```

In the likely case of multiple environment, remove the `NodeCommand` entry and
manually configure it per environment in the web console: _Configuration > Software > Node command_.

_Step 3:_ Create a `.npmrc` file:

```
# Check https://github.com/react-boilerplate/react-boilerplate/issues/2566 for details
unsafe-perm=true
```

_Step 4:_ commit your changes and deploy via EB CLI:

```sh
eb deploy {target environment name}
```
