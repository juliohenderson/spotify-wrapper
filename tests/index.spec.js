import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('SpotifyWrapper Library', function () {
  it('should create an instance of SpotifyWrapper', function () {
    const spotify = new SpotifyWrapper({});

    expect(spotify).to.be.an.instanceOf(SpotifyWrapper);
  });

  it('should receive apiURL as an option', function () {
    const spotify = new SpotifyWrapper({
      apiURL: 'blablabla',
    });

    expect(spotify.apiURL).to.be.equal('blablabla');
  });

  it('should use the default apiURL if not provided', function () {
    const spotify = new SpotifyWrapper({});

    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should receive token as an option', function () {
    const spotify = new SpotifyWrapper({
      token: 'foo',
    });

    expect(spotify.token).to.be.equal('foo');
  });

  describe('request method', function () {
    let stubedFetch;
    beforeEach(function () {
      stubedFetch = sinon.stub(global, 'fetch');
      stubedFetch.resolves({ json: () => ({ album: 'name' }) });
    });

    afterEach(function () {
      stubedFetch.restore();
    });

    it('should have request method', function () {
      const spotify = new SpotifyWrapper({});
      expect(spotify.request).to.exist;
    });

    it('should call fetch when request', function () {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });

      spotify.request('url');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct url passed', function () {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });

      spotify.request('url');
      expect(stubedFetch).to.have.been.calledWith('url');
    });

    it('should call fetch with right headers passed', function () {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });
      const headers = {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer foo',
        },
      };
      spotify.request('url');
      expect(stubedFetch).to.have.been.calledWith('url', headers);
    });
  });
});
