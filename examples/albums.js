import SpotiftWrapper from '../src/index';

global.fetch = require('node-fetch');

const spotify = new SpotiftWrapper({
  token: 'BQBVu5Y3ne448nHNDMFKkROBHnmH-msAlGaTfzrQWNZLE6JllCG38wF7Z00eu1_uREGQK4IwhEoGzd2gLYK2N0Nwj-WKga_KRjODbbshGTpu0osm4HngGAbtPzWYj4Pcf7d6PjWoWGYxZP3h7WdyCVu7W10U-PYC4DV5WCBS-m27ZwBPqyckDb6avJtYlzl8LW3RvL2t6F76prxux4yqz_03137-0U59-4gzKDTExxqIE4jpyjQKcZa1R7T2qBuTin2v5j1H5qZwcgUiZQ',
});

const albums = spotify.search.albums('Avenged Sevenfold');

// eslint-disable-next-line no-console
albums.then((data) => data.albums.items.map((item) => console.log(item.name)));
