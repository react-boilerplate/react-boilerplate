# Setting up IDE
*this document mainly focus on WebStorm IDE from JetBrain*

## Debugger Tool
WebStorm is a powerful IDE, and why not also use it as debugger tool? Here is the steps

1.  [Install JetBrain Chrome Extension](https://chrome.google.com/webstore/detail/jetbrains-ide-support/hmhgeddbohgjknpmjagkdomcpobmllji)
2.  [Setting up the PORT](https://www.jetbrains.com/help/webstorm/2016.1/using-jetbrains-chrome-extension.html)
3.  Change WebPack devtool config to `source-map` [(This line)](https://github.com/mxstbr/react-boilerplate/blob/56eb5a0ec4aa691169ef427f3a0122fde5a5aa24/internals/webpack/webpack.dev.babel.js#L65)
4.  Run web server (`npm run start`)
5.  Create Run Configuration (Run > Edit Configurations)
6.  Add new `JavaScript Debug`
7.  Setting up URL
8.  Start Debug (Click the green bug button)
9.  Edit Run Configuration Again
10.  Mapping Url as below picture
    * Map your `root` directory with `webpack://.` (please note the last dot)
    * Map your `build` directory with your root path (e.g. `http://localhost:3000`)
11.  Hit OK and restart debugging session

![How to debug using WebStorm](ide-debug.png)

#### Troubleshooting
1. You miss the last `.` (dot) in `webpack://.`
2. The port debugger is listening tool and the JetBrain extension is mismatch.

## ESLint
ESLint help making all developer follow the same coding format. Please also setting up in your IDE, otherwise, you will fail ESLint test.
1. Go to WebStorm Preference
2. Search for `ESLint`
3. Click `Enable`

![Setting up ESLint](ide-eslint.png)

### References
1. [https://blog.jetbrains.com/webstorm/2015/10/working-with-reactjs-in-webstorm-coding-assistance/](https://blog.jetbrains.com/webstorm/2015/10/working-with-reactjs-in-webstorm-coding-assistance/)
