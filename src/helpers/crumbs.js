import cheerio from 'cheerio';
import axios from 'axios';
import config from '../config.js';

export const getCrumbs = async (cookies, user) => {
  const breadCrumbs = await axios.get(`https://bandcamp.com/${user}`, {
    headers: {
      ...config.profileHeaders,
      'cookie': `client_id=${cookies.client_id}; BACKENDID3=${cookies.backendid3}; identity=${cookies.identity}; js_logged_in=1; logout=%7B%22username%22%3A%22${user}%22%7D`,
    },
  });
  const $ = cheerio.load(breadCrumbs.data);
  const dataCrumbs = $('#js-crumbs-data').attr('data-crumbs');
  const crumbs = JSON.parse(dataCrumbs);

  return crumbs['api/genrepreferences/1/open_genre_preferences'];

};
