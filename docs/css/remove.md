## Removing `sanitize.css`

To remove `sanitize.css` you will need to remove it from both:

- [`app.js`](../../app/app.js)

```diff
import FontFaceObserver from 'fontfaceobserver';
import { useScroll } from 'react-router-scroll';
-import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';
```

- [`package.json`](../../package.json)!

```diff
"dllPlugin": {
  "path": "node_modules/react-boilerplate-dlls",
  "exclude": [
    ...
    "ip",
    "minimist",
-   "sanitize.css"
  ],
},
...
"dependencies": {
  ...
  "redux-saga": "0.14.3",
  "reselect": "2.5.4",
- "sanitize.css": "4.1.0",
  "styled-components": "1.4.3",
  ...
},
```
