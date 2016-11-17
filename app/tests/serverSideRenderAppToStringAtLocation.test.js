jest.mock('react-dom/server');
jest.mock('react-router');
jest.mock('styled-components/lib/models/StyleSheet');
jest.mock('react-helmet');
jest.mock('../syncHistoryWithStore');

import { match } from 'react-router';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import Helmet from 'react-helmet';

import AppContainer from 'containers/AppContainer';

import styleSheet from 'styled-components/lib/models/StyleSheet';

import syncHistoryWithStore from '../syncHistoryWithStore';

import serverSideRenderAppToStringAtLocation from '../serverSideRenderAppToStringAtLocation';

describe('rendering to string', () => {
  const url = 'http://www.example.com/user/tomazy';
  const assets = {
    main: {
      js: 'xxx',
      css: 'yyy',
    },
  };

  let options;
  let callback;

  beforeEach(() => {
    jest.resetAllMocks();
    options = {
      assets,
    };
    callback = jest.fn();
  });

  it('should resolve route for the given url', () => {
    serverSideRenderAppToStringAtLocation(url, options, callback);
    expect(match).toHaveBeenCalledTimes(1);
    const args = match.mock.calls[0];
    expect(args[0].location).toEqual(url);
  });

  it('should sync the router state', () => {
    serverSideRenderAppToStringAtLocation(url, options, callback);
    expect(syncHistoryWithStore).toHaveBeenCalledTimes(1);
  });

  describe('match callback', () => {
    let matchCallback;

    beforeEach(() => {
      serverSideRenderAppToStringAtLocation(url, options, callback);
      const args = match.mock.calls[0];
      matchCallback = args[1];
    });

    describe('error', () => {
      it('should call the callback with the error', () => {
        const err = 'The Error';
        matchCallback(err);
        expect(callback).toHaveBeenCalledWith(err);
      });
    });

    describe('redirect', () => {
      it('should call the callback with the redirect location', () => {
        const redirectLocation = 'The Redirect Location';
        matchCallback(null, redirectLocation);
        expect(callback).toHaveBeenCalledWith(null, redirectLocation);
      });
    });

    describe('match found', () => {
      const dummyHtml = '<html>TADAM!</html>';

      beforeEach(() => {
        styleSheet.rules = jest.fn().mockReturnValue([]);
        renderToString.mockReturnValue('<div></div>');
        renderToStaticMarkup.mockReturnValue(dummyHtml);
        Helmet.rewind.mockReturnValue({});
      });

      it('should call the callback with the rendered page', () => {
        matchCallback(null, null, {});
        return waitFor(() => callback.mock.calls.length > 0)
          .then(() => {
            expect(callback).toHaveBeenCalledWith(null, null, `<!DOCTYPE html>\n${dummyHtml}`);
          });
      });

      it('should render the AppContainer', () => {
        matchCallback(null, null, {});
        return waitFor(() => callback.mock.calls.length > 0)
          .then(() => {
            expect(renderToString).toHaveBeenCalled();
            const args = renderToString.mock.calls[0];
            expect(args[0].type).toEqual(AppContainer);
          });
      });
    });
  });
});

const TIMEOUT = 1000;

function waitFor(fn) {
  const start = new Date();

  return new Promise((resolve, reject) => {
    function check() {
      if (fn()) {
        resolve();
      } else if (new Date() - start > TIMEOUT) {
        reject(new Error('Time out in waitFor !!!'));
      } else {
        setTimeout(check, 3);
      }
    }

    check();
  });
}
