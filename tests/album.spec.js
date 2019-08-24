// getAlbum
// getAlbums
// getAlbumTracks

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Album', function () {
  let spotify;
  let stubedFetch;
  beforeEach(function () {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    stubedFetch = sinon.stub(global, 'fetch');
    stubedFetch.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(function () {
    stubedFetch.restore();
  });

  describe('smoke tests', function () {
    it('should have spotify.album.getAlbum method', function () {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should have spotify.album.getAlbums method', function () {
      expect(spotify.album.getAlbums).to.exist;
    });

    it('should have spotify.album.getTracks method', function () {
      expect(spotify.album.getTracks).to.exist;
    });
  });

  describe('getAlbum', function () {
    // verfica se o fetch ocorre
    it('should call fetch method', function () {
      spotify.album.getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    // verifica se o fetch ocorre com a url desejada
    it('should call fetch with the correct URL', function () {
      spotify.album.getAlbum('2i6nd4FV6y7K9fln6eelmR');
      expect(stubedFetch).to.have.been
        .calledWith(
          'https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmR',
        );

      spotify.album.getAlbum('2i6nd4FV6y7K9fln6eelmk');
      expect(stubedFetch).to.have.been
        .calledWith(
          'https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmk',
        );
    });

    // verifica se o dado é recebido pela promise
    it('should return the correct data from Promise', function () {
      const album = spotify.album.getAlbum('2i6nd4FV6y7K9fln6eelmR');
      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });

  describe('getAlbums', function () {
    it('should call fetch method', function () {
      spotify.album.getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URl', function () {
      spotify.album.getAlbums(['2i6nd4FV6y7K9fln6eelmR', '2i6nd4FV6y7K9fln6eelmk']);
      expect(stubedFetch).to.have.been
        .calledWith(
          'https://api.spotify.com/v1/albums/?ids=2i6nd4FV6y7K9fln6eelmR,2i6nd4FV6y7K9fln6eelmk',
        );
    });

    it('should return the correct data from promise', function () {
      const albums = spotify.album.getAlbums(['2i6nd4FV6y7K9fln6eelmR', '2i6nd4FV6y7K9fln6eelmk']);
      albums.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });

  describe('getAlbumTracks', function () {
    it('should call fetch method', function () {
      spotify.album.getTracks('2i6nd4FV6y7K9fln6eelmR');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', function () {
      spotify.album.getTracks('2i6nd4FV6y7K9fln6eelmR');
      expect(stubedFetch).to.have.been
        .calledWith(
          'https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmR/tracks',
        );
    });

    it('should return the correct data from Promise', function () {
      const tracks = spotify.album.getTracks('2i6nd4FV6y7K9fln6eelmR');
      tracks.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });
});
