import request from '../request';
import sinon from 'sinon';
import expect from 'expect';

describe('request', () => {
  beforeEach(() => {
    sinon.stub(window, 'fetch');
  });

  afterEach(() => {
    window.fetch.restore();
  });

  describe('stubbing successful response', () => {
    beforeEach(() => {
      const res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json'
        }
      });

      window.fetch.returns(Promise.resolve(res));
    });

    it('should format the response correctly', (done) => {
      request('/thisurliscorrect')
        .catch(done)
        .then((json) => {
          expect(json.data.hello).toEqual('world');
          done();
        });
    });
  });

  describe('stubbing error response', () => {
    beforeEach(() => {
      const res = new Response('', {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-type': 'application/json'
        }
      });

      window.fetch.returns(Promise.resolve(res));
    });

    it('should catch errors', (done) => {
      request('/thisdoesntexist')
        .then((json) => {
          expect(json.err.response.status).toEqual(404);
          expect(json.err.response.statusText).toEqual('Not Found');
          done();
        });
    });
  });
});
