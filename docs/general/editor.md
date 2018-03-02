# Setting Up Your Editor

You can edit React Boilerplate using any editor or IDE, but there are a few extra steps that you can take to make sure your coding experience is as good as it can be.

## VS Code 
To get the best editing experience with [VS Code](https://code.visualstudio.com), create a [`jsconfig.json`](https://code.visualstudio.com/Docs/languages/javascript#_javascript-project-jsconfigjson) file at the root of your project:

```json
{
  "compilerOptions": {
    "baseUrl": "app",
    "module": "commonjs",
    "target": "es2016",
    "jsx": "react"
  },
  "exclude": [
    "node_modules",
    "**/node_modules/*"
  ]
}
```

This `jsconfig.json` file tells VS Code to treat all JS file as part of the same project, improving IntelliSense, code navigation, and refactoring. You can configure project wide settings in using the `jsconfig.json`, such as only allowing functions from the ES5 standard library, or even enable [more advanced type checking for JS files](https://code.visualstudio.com/docs/languages/javascript#_type-checking-and-quick-fixes-for-javascript-files)