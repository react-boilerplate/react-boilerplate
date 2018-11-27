import createHistory from 'history/createBrowserHistory';
const basename = process.env.PUBLIC_PATH;
const history = createHistory({ basename });
export default history;
