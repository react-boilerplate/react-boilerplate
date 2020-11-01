# Deployment

## Heroku

### Easy 3-Step Deployment Process

_Step 1:_ Create a _Procfile_ with the following line: `web: npm run start:prod`. We do this because Heroku runs `npm run start` by default, so we need this setting to override the default run command.

_Step 2:_ Install the Node.js buildpack for your Heroku app by running the following command: `heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v133 -a [your app name]`. Make sure to replace `#v133` with whatever the latest buildpack is, which you can [find here](https://github.com/heroku/heroku-buildpack-nodejs/releases).

_Step 3:_ Follow the standard Heroku deploy process:

1.  `git add .`
2.  `git commit -m 'Made some epic changes as per usual'`
3.  `git push heroku master`

## AWS S3 - Cloudfront

### Deploying to S3 with 7 steps

_Step 1:_ Run `npm install` to install dependencies, then `npm run build` to create the `./build` folder.

_Step 2:_ Navigate to [AWS S3](https://aws.amazon.com/s3) and login (or sign up if you don't have an account). Click on `Services` followed by `S3` in the dropdown.

_Step 3:_ Click on `Create Bucket` and fill out both your `Bucket Name` and `Region` (for the USA we recommend `US Standard`). Click `Next` till the `Set Permissions` section and remove the tick from `Block all public access` (in order to make objects public). Click `Create` to create your bucket.

_Step 4:_ To make the bucket objects publicly viewable, go into the bucket, then `Permissions` (on the top bar) -> `Bucket Policy`. Copy paste this (change `[BUCKET_NAME]` with your own bucket name)

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::[BUCKET_NAME]/*"
        }
    ]
}
```

_Step 5:_ Go to `Properties`. Click on the `Static Website Hosting` accordion where you should see the URL (or _endpoint_) of your website (ie. example.s3-website-us-east-1.amazonaws.com). Click `Enable website hosting` and fill in both the `Index document` and `Error document` input fields with `index.html`. Click `Save`.

_Step 6:_ Click on your new S3 bucket on the left to open the bucket. Click `Upload` and select all the files within your `./build` folder. Click `Start Upload`. You can easily automate the deployment with a single [helper script](https://gist.github.com/Can-Sahin/d7de7e2ff5c1a39b82ced2d9bd7c60ae) that uses `aws-cli`. Running the shell script with necessary permissions on `AWS` will take care of all the issues mentioned in `IMPORTANT ⚠️` below

_Step 7:_ Click on the `Properties` tab, open `Static Website Hosting`, and click on the _Endpoint_ link. The app should be running on that URL.

> IMPORTANT ⚠️
>
> S3 objects' `Cache-Control` metadata can cause problems on deployments, such like not serving the new `index.html` file but returning the cached one. This might result in users not getting the recently deployed web app. Since the `index.html` and `sw.js` files are the initially loaded files (all the js bundles and chunks comes later depending on these two files) adjusting the `Cache-Control` metadata is suggested after deployments for these two files. To do so, go to the file, then `Properties` -> `Metadata`. Add `max-age=0,no-cache,no-store,must-revalidate` to the key `Cache-Control`

### Cloudfront for HTTPS and GZIP

_HTTPS_: `S3` serves only `HTTP`, so for `HTTPS` you can use `Cloudfront`. Setting up `Cloudfront` is a bit longer than `S3 Static Website Hosting`. Therefore follow [AWS Instructions](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-serve-static-website/) - follow the second configuration steps (Using a website endpoint as the origin with anonymous (public) access allowed) -
to set a `Cloudfront` distribution using your `S3 Website`.

> Note: SPA applications handles routing inside the client, so, pages like `/about` is unknown to the `Cloudfront` (its configured as always returning `index.html` file in `S3 Bucket`). To prevent `404 Not Found` responses, after setting up your Cloudfront Distribution, go to the `Error Pages` then `Create Custom Error Response` which you will map `404` code to `200`.

_GZIP Compression_: Enabling gzip can reduce chunk sizes dramatically and improve loading performance greatly. To enable gzip with `Cloudfront` navigate to your distribution then `Behaviors` -> `Edit` -> `Compress Objects Automatically`. Mark `Yes`. This alone **isn't enough**. You must update your `S3 Bucket CORS Configuration` to send `Content-Length` header by adding `<AllowedHeader>Content-Length</AllowedHeader>` in a [CORSRule](https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html).

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

If you need to set up multiple environments, remove the `NodeCommand` entry and
manually configure it per environment in the web console: _Configuration > Software > Node command_.

_Step 3:_ Create a `.npmrc` file:

```
# Check https://github.com/react-boilerplate/react-boilerplate/issues/2566 for details
unsafe-perm=true
```

_Step 4:_ Commit your changes and deploy via EB CLI:

```sh
eb deploy {target environment name}
```

## Azure

### Easy 3-Step Deployment Process

_Step 1:_ Within Azure Portal, add a 'Web App' resource to your resource group. Select the appropriate version of Node (i.e. 10.14) and verify that the operating system is set to Linux to ensure that Node is being run natively and not via IIS (iisnode). Note that several of the quick start guides (such as https://docs.microsoft.com/en-us/azure/app-service/app-service-web-get-started-nodejs) result in a Windows + IIS Node configuration that is incompatible with react-boilerplate.

_Step 2:_ When the resource has finished deploying, go to its deployment center and select Local Git (other methods will work as well but the rest of these steps assume this approach) and 'App Service' for the build provider. Note the Git Clone Uri that is presented when the wizard is finished.

_Step 3:_ Within the root of your react-boilerplate source folder, execute the following commands to publish to Azure:

1.  `git remote add azure https://YOUR_RESOURCE_NAME.scm.azurewebsites.net:443/YOUR_RESOURCE_NAME.git`
2.  `git add .`
3.  `git commit -m 'Made some epic changes as per usual'`
4.  `git push azure master`

## Netlify

Netlify is a static site host that deploys from Git repos. To deploy a `react-boilerplate` app from Netlify, you can leverage their continuous deployment feature. All you have to do is push to your repo and Netlify will [run your production build script](https://docs.netlify.com/configure-builds/get-started/).

_Step 1:_ Follow react-boilerplate's [quick start instructions](https://github.com/react-boilerplate/react-boilerplate#quick-start)

_Step 2:_ Create a Git repo for your project on one of the supported hosts (i.e. GitHub)

_Step 3:_ Create a new project on Netlify by logging in via your Git host and selecting the repo you just made

_Step 4:_ In your local repo, change the remote from `react-boilerplate`'s to your own (i.e. `git remote set-url origin https://github.com/USERNAME/REPOSITORY.git`)

_Step 5:_ Go to the **Build & deploy** section of the project settings. For "Build command," enter `npm run build`. For "Publish directory," enter `build`.

_Step 6:_ Commit and push. Netlify detects the push, builds the project, and deploys the results.
