import axios from 'axios';
import config from '../config.js';

export const getArtists = async (userId) => {
  let token = `${Math.floor(Date.now() / 1000)}::a::`;
  const artists = [];

  while (true) {
    console.log('Fetching followed artists');
    const { data } = await axios.post(config.artistsApiUrl, {
      'fan_id': userId,
      'older_than_token': token,
      'count': 10,
    }, {
      headers: config.artistsHeaders,
    });
    artists.push(...data.followeers);
    token = data.last_token;

    if (!data.more_available) {
      break;
    }
  }
  return artists;
}
