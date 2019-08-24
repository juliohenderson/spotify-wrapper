import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);

global.fetch = require('node-fetch');


describe('Search', function () {
  let spotify;
  let fetchedStub;

  beforeEach(function () {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(function () {
    fetchedStub.restore();
  });

  describe('smoke tests', function () {
    // searchAlbums
    // searchArtists
    // searchTracks
    // searchPlaylists
    it('should exist the spotify.search.albums method', function () {
      expect(spotify.search.albums).to.exist;
    });
    it('should exist the spotify.search.artists method', function () {
      expect(spotify.search.artists).to.exist;
    });
    it('should exist the spotify.search.tracks method', function () {
      expect(spotify.search.tracks).to.exist;
    });
    it('should exist the spotify.search.playlists method', function () {
      expect(spotify.search.playlists).to.exist;
    });
  });

  describe('searchArtists', function () {
    it('should call fetch function', function () {
      spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', function () {
      spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist',
        );

      spotify.search.artists('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(
          'https://api.spotify.com/v1/search?q=Muse&type=artist',
        );
    });
  });

  describe('searchAlbums', function () {
    it('should call fetch function', function () {
      spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', function () {
      spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=album',
        );

      spotify.search.albums('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(
          'https://api.spotify.com/v1/search?q=Muse&type=album',
        );
    });
  });

  describe('searchTracks', function () {
    it('should call fetch function', function () {
      spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', function () {
      spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=track',
        );

      spotify.search.tracks('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(
          'https://api.spotify.com/v1/search?q=Muse&type=track',
        );
    });
  });

  describe('searchPlaylists', function () {
    it('should call fetch function', function () {
      spotify.search.playlists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', function () {
      spotify.search.playlists('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=playlist',
        );

      spotify.search.playlists('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(
          'https://api.spotify.com/v1/search?q=Muse&type=playlist',
        );
    });
  });
});
