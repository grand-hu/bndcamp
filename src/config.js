const config = {
  loginPageUrl: 'https://bandcamp.com/login',
  recaptchaPublicKey: '6Ld7hz4UAAAAANlndw60vAheGUwN0Mb-qeWD_LHr',
  loginUrl: 'https://bandcamp.com/login_cb',
  wishlistUrl: 'https://bandcamp.com/api/fancollection/1/wishlist_items',
  genresApiUrl: 'https://bandcamp.com/api/genrepreferences/1/open_genre_preferences',
  artistsApiUrl: 'https://bandcamp.com/api/fancollection/1/following_bands',
  userIdUrl: 'https://bandcamp.com/api/fan/2/collection_summary',
  loginPageHeaders: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'hu-HU,hu;q=0.9',
    'Dnt': '1',
    'Sec-Ch-Ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  },
  loginHeaders: {
    'authority': 'bandcamp.com',
    'method': 'POST',
    'path': '/login_cb',
    'scheme': 'https',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'hu-HU,hu;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Dnt': '1',
    'Origin': 'https://bandcamp.com',
    'Referer': 'https://bandcamp.com/login',
    'Sec-Ch-Ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
  },
  profileHeaders: {
    'authority': 'bandcamp.com',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'hu-HU,hu;q=0.9',
    'dnt': '1',
    'referer': 'https://bandcamp.com/login',
    'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  },
  userIdHeaders: {
    'authority': 'bandcamp.com',
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'hu-HU,hu;q=0.9',
    'dnt': '1',
    'referer': 'https://bandcamp.com/dcollect',
    'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest'
  },
  wishListHeaders: {
    'authority': 'bandcamp.com',
    'accept': '*/*',
    'accept-language': 'hu-HU,hu;q=0.9',
    'content-type': 'application/json',
    'dnt': '1',
    'origin': 'https://bandcamp.com',
    'referer': 'https://bandcamp.com/dcollect/wishlist',
    'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest'
  },
  genresHeaders: {
    'authority': 'bandcamp.com',
    'accept': '*/*',
    'accept-language': 'hu-HU,hu;q=0.9',
    'content-type': 'application/json',
    'dnt': '1',
    'origin': 'https://bandcamp.com',
    'referer': 'https://bandcamp.com/dcollect/following/genres',
    'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest'
  },
  artistsHeaders: {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  },
};

export default config;
