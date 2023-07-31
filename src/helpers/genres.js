import axios from 'axios';
import config from '../config.js';

export const getGenres = async (cookies, crumb, user) => {
  const headers = {
    ...config.genresHeaders,
    cookie: `client_id=${cookies.client_id}; BACKENDID3=${cookies.backendid3}; identity=${cookies.identity}; js_logged_in=1; logout=%7B%22username%22%3A%22${user}%22%7D`,
  };

  console.log('Fetching followed genres');
  const { data } = await axios.post(config.genresApiUrl, {
    fan_id: cookies.fan_id,
    crumb,
  }, { headers });

  const genres = data.result.followed_genres;
  return genres;
}
