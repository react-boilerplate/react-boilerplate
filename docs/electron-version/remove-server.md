## Why remove server folder?
The current boilerplate provides a nice express nodejs server to host our react application on the fly which is nice as you can run the production command simply as a service with any process manager for e.g. [Forever](https://github.com/foreverjs/forever) or [PM2](http://pm2.keymetrics.io/).

But for electron application, we don't require the express server and its middlewares anymore because the entire source code is going to be packaged in electron binary at end of the story and we will load the generated ```index.html``` in electron renderer window through file protocol.

## Why load index.html as file protocol instead of http?
There is a strong reason behind this. We are going to install all the native and electron specific dependencies with a separate ```package.json``` which will reside in our ```app folder``` and the generated node_modules will be directly copied with app source code while packing the application as binary. We will never let our webpack setup to touch this ```node_modules``` folder in app and all of its dependencies will be marked as externals in webpack configuration. If you don't know about external dependencies, [refer this](https://webpack.js.org/configuration/externals/). External deps are excluded from the webpack bundle and are resolved at runtime from available ```node_modules``` folder.

So when the ```index.html``` file is loaded in electron renderer, it will try to resolve all the external dependencies from its nearest ```node_modules``` folder. But but but... module resolution in NodeJS is made based on file system not on http. So if we load the index.html file with http protocol, all the external deps will not be resolved.

Now you've got the idea and you can delete the server folder.

**Note:** There is ```logger.error``` function defined in server folder, which has also been used in webpack dev config, so we will remove that ```logger.error(...)``` call from webpack file as well to avoid the undefined error.
