import axios from 'axios';
import config from '../config.js';

export const getWishList = async (cookies, user) => {
  const wishList = [];
  const headers = {
    ...config.genresHeaders,
    cookie: `client_id=${cookies.client_id}; BACKENDID3=${cookies.backendid3}; identity=${cookies.identity}; js_logged_in=1; logout=%7B%22username%22%3A%22${user}%22%7D`,
  };
  let token = `${Math.floor(Date.now() / 1000)}::a::`;

  while (true) {
    console.log('Fetching wishlist elements');
    const { data: { items, last_token, more_available } } = await axios.post(
      config.wishlistUrl,
      {
        'fan_id': cookies.fan_id,
        'older_than_token': token,
        'count': 20,
      },
      { headers }
    );

    wishList.push(...items);
    token = last_token;

    if (!more_available) {
      break;
    }
  }
  return wishList;
};
