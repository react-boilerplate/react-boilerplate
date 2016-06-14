# Deployment

## Heroku

### Setup

Heroku by default runs `npm start` once you deploy your code to its servers, which in our case is the development command. However, by defining a `Procfile` in the root directory, you can change what is run on deployment. For example, you might want to define a Procfile like this:

```
web: npm run build && npm run start:prod
```

This builds your application and starts it in production mode based on `webpack.base.babel.js` and `webpack.prod.babel.js` in `internals/webpack/`. You'll also have to change the `publicPath` in `webpack.base.babel.js` to match your path:

```Javascript
output: Object.assign({
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/', // CHANGE THIS TO YOUR PATH
  }, options.output)
```

### Process

The general process to deploy code is the same.

1. `git add .`
2. `git commit -m 'Heroku test'`
3. `heroku create`
4. `git push heroku master`
