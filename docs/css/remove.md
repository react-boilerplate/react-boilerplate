## Removing `sanitize.css`

To remove `sanitize.css` you will need to remove it from both:

- [`app.js`](../../app/app.js)

```diff
import history from 'utils/history';
-import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';
```

- [`package.json`](../../package.json)!

```diff
"dependencies": {
  ...
  "redux-saga": "1.1.1",
  "reselect": "4.0.0",
- "sanitize.css": "11.0.0",
  "styled-components": "4.4.0"
  ...
},
```
