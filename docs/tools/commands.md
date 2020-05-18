# CLI & Scaffolding

## Cleaning

```Shell
npm run cleanAndSetup
```

Removes the example app, replacing it with the smallest amount of boilerplate
code necessary to start writing your app! Also, it makes some necessary changes to your setup to give you a clean and working start

{% hint style="warning" %}

**Note:** This command is self-destructive, once you've run it you cannot run it again. This is for your own safety, so you can't delete portions of your project irreversibly by accident.

{% endhint %}

## Generators

```Shell
npm run generate
```

Allows you to auto-generate boilerplate code for common parts of your
application, specifically `component`s, and `container`s. You can
also run `npm run generate <part>` to skip the first selection. (e.g. `npm run generate container`)

```Shell
npm run test:generators
```

If you want to test if generators are working fine. It generates components and containers with various settings. It would be usefull if you start customizing the generators for your needs

## Production

```Shell
npm run start:prod
```

- Builds your app (see `npm run build`)
- Serves the `build` folder locally

The app is built for optimal performance: assets are
minified and served gzipped.

## Unit testing

```Shell
npm test
```

Tests your application with the unit tests specified in the `**/__tests__/*.ts` files
throughout the application.  
All the `test` commands allow an optional `-- [string]` argument to filter
the tests run by Jest. Useful if you need to run a specific test only.

```Shell
# Run only the Button component tests
npm test -- Button
```

## Linting

```Shell
npm run lint
```

Lints your Typescript and your CSS.

```Shell
npm run lint:fix
```

Lints your code and tries to fix any errors it finds.

## Typescript

```Shell
npm run checkTs
```

Checks your typescript errors
