# Deploying to Heroku

## Deployment Process

Heroku by default runs npm start once you deploy your code to its servers. However, by defining a Procfile in the root directory, you can change what is run on deployment. For example, a Procfile may define something like this: web: npm `run start:production`, which starts the command `npm run start:production` on deployment to heroku.

The `start:production` command runs `npm run prod:build && npm run start:prod`, which builds out the packages based on the webpacks webpack.base.babel.js and the webpack.prod.babel.js files. Please change the following below to match your path:

```Javascript
output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output)
```

The general process to deploy code is the same.

1. `git add .`
2. `git commit -m 'Heroku test'`
3. `heroku create`
4. `git push heroku master`

