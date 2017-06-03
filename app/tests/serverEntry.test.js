/* eslint-disable import/first */
jest.mock('react-dom/server');
jest.mock('react-router');
jest.mock('react-helmet');
jest.mock('setup/syncHistoryWithStore');
jest.mock('components/HtmlDocument');

import { match } from 'react-router';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import Helmet from 'react-helmet';
import StyleSheet from 'styled-components/lib/models/StyleSheet';

import AppRoot from 'containers/AppRoot';

import syncHistoryWithStore from 'setup/syncHistoryWithStore';

import { renderAppToStringAtLocation } from '../serverEntry';

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

  beforeEach(() => {
    StyleSheet.reset(true);
  });

  afterEach(() => {
    StyleSheet.reset(false);
  });

  it('should resolve route for the given url', () => {
    renderAppToStringAtLocation(url, options, callback);
    expect(match).toHaveBeenCalledTimes(1);
    const args = match.mock.calls[0];
    expect(args[0].location).toEqual(url);
  });

  it('should sync the router state', () => {
    renderAppToStringAtLocation(url, options, callback);
    expect(syncHistoryWithStore).toHaveBeenCalledTimes(1);
  });

  describe('match callback', () => {
    let matchCallback;

    beforeEach(() => {
      renderAppToStringAtLocation(url, options, callback);
      const args = match.mock.calls[0];
      matchCallback = args[1];
    });

    describe('error', () => {
      it('should call the callback with the error', () => {
        const err = 'The Error';
        matchCallback(err);
        expect(callback).toHaveBeenCalledWith({ error: err });
      });

      describe('unknown error', () => {
        it('should call the callback with the error', () => {
          matchCallback(undefined, undefined, undefined);
          expect(callback).toHaveBeenCalled();
          const args = callback.mock.calls[0];
          expect(args[0].error).toBeDefined();
        });
      });
    });

    describe('redirect', () => {
      it('should call the callback with the redirect location', () => {
        const redirectLocation = {
          pathname: 'xxx',
          search: 'yyy',
        };
        matchCallback(null, redirectLocation);
        expect(callback).toHaveBeenCalledWith({ redirectLocation: 'xxxyyy' });
      });
    });

    describe('match found', () => {
      const dummyHtml = '<html>TADAM!</html>';
      const expectedHtml = `<!DOCTYPE html>\n${dummyHtml}`;

      beforeEach(() => {
        renderToString.mockReturnValue('<div></div>');
        renderToStaticMarkup.mockReturnValue(dummyHtml);
        Helmet.rewind.mockReturnValue({});
      });

      describe('error while rendering', () => {
        beforeEach(() => {
          renderToString.mockImplementation(() => { throw new Error('grrr!'); });
        });
        it('should call the callback with the error', () => {
          matchCallback(null, null, {});
          return waitFor(() => callback.mock.calls.length > 0)
            .then(() => {
              const args = callback.mock.calls[0];
              expect(args[0].error.message).toMatch('grrr!');
            });
        });
      });

      describe('error 404', () => {
        it('should call the callback with null as html', () => {
          const renderProps = {
            routes: [
              { name: 'aaa' },
              { name: 'notfound' },
              { name: 'bbb' },
            ],
          };
          matchCallback(null, null, renderProps);
          return waitFor(() => callback.mock.calls.length > 0)
            .then(() => {
              expect(callback).toHaveBeenCalledWith({ notFound: true, html: expectedHtml });
            });
        });
      });

      describe('happy path', () => {
        const renderProps = {
          routes: [],
        };

        it('should call the callback with the rendered page', () => {
          matchCallback(null, null, renderProps);
          return waitFor(() => callback.mock.calls.length > 0)
            .then(() => {
              expect(callback).toHaveBeenCalledWith({ notFound: false, html: expectedHtml });
            });
        });

        describe('rendering css', () => {
          beforeEach(() => {
            // this is very hacky - I'm not sure what's the right way of testing
            // the styled components' server side rendering.
            const sheet = StyleSheet.create(true);
            sheet.toReactElements = () => ['css1', 'css2'];

            StyleSheet.clone = () => sheet;
          });

          it('should inject the css', () => {
            matchCallback(null, null, renderProps);
            return waitFor(() => callback.mock.calls.length > 0)
              .then(() => {
                expect(renderToStaticMarkup).toHaveBeenCalled();
                const args = renderToStaticMarkup.mock.calls[0];
                const component = args[0];
                expect(component.props.css).toEqual(['css1', 'css2']);
              });
          });
        });

        it('should render the AppRoot', () => {
          matchCallback(null, null, renderProps);
          return waitFor(() => callback.mock.calls.length > 0)
            .then(() => {
              expect(renderToString).toHaveBeenCalled();
              const args = renderToString.mock.calls[0];
              expect(args[0].type).toEqual(AppRoot);
            });
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
