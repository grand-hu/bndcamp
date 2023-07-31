# Bndcmp Scraper

Given a username and a password, scraper collects data (wishlist, followings) from the user's profile and calculates a reliability percentage based on: Number of items in the wishlist with at least one label of those that appear in the list of followed genres / Number of total items. 

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

`CAPTCHA_API_KEY`: 2Captcha API key

`USER`: bndcmp username

`PASSWORD`: bndcmp password for the above username


## Run Locally

Clone the project

```bash
  git clone https://github.com/grand-hu/bndcamp.git
```

Go to the project directory

```bash
  npm start
```

Install dependencies

```bash
  npm install
```

Start scraping

```bash
  node index.js
```


## Usage/Examples

```javascript
import ScrapingClass from './ScraperClass.js';

const startScraping = async () => {
  const scrapingInstance = new ScrapingClass();
  try {
    await scrapingInstance.login(process.env.USER, process.env.PASSWORD);
  } catch (error) {
    console.error('Scraping failed:', error);
  }
}

startScraping();

```

# Technical decisions

Upon analyzing the website, I identified several API endpoints that could be utilized to complete the task. Some of these APIs are not protected, allowing data access without authentication. However, most of them require specific authorization headers to retrieve the desired data, necessitating a login.

Captcha posed another concern. During several test runs with puppeteer, I noticed that after 4-5 attempts per IP address on average, reCAPTCHA would activate upon clicking the login button, whether in headless or headful mode. Headless mode generally had a lower average, sometimes triggering the captcha even on the first try. This situation led to a decision:

  - Using puppeteer with rotating proxies and captcha solving service
or
  - Utilizing API calls (possibly with rotating proxies) and a captcha-solving service.

Considering the potential extra costs associated with puppeteer (higher CPU usage, memory, storage), and the possibility of running multiple instances in the cloud, I opted for the API version. This approach reduces traffic (Puppeteer averaged around 8-10 MB for the login alone) and results in lower CPU, memory, and storage usage, thus minimizing expenses.

## Identified APIs/endpoints

### Login page
```http
  GET /login
```
No special headers/params needed. This fetch returns 
```javascript
  `client_id`
  `BACKENDID3`
```
values in set-cookie headers.

### Login
```http
  POST /login_cb
```
| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Cookie` | `string` | **Required**. ```client_id=...; BACKENDID3=...;``` |

| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user.name` | `string` | **Required**.|
| `login.password` | `string` | **Required**.|
| `login.twofactor` | `null` | **Required**.|
| `login.twofactor_remember` | `null` | **Required**.|
| `login.from` | `null` | **Required**.|
| `login.captcha_response` | `string` | **Required**. Response payload from captcha solving service|

This call returns the
```javascript
  `identity`
```
value in set-cookie header. 

### UserId
```http
  POST /api/fan/2/collection_summary
```
| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Cookie` | `string` | **Required**. ```client_id=...; BACKENDID3=...; identity=...; js_logged_in=1; logout=%7B%22username%22%3A%22${user}%22%7D``` |

The response contains the userId: ```fan_id```.

### Crumbs
```http
  GET /${user}
```
| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Cookie` | `string` | **Required**. ```client_id=...; BACKENDID3=...; identity=...; js_logged_in=1; logout=%7B%22username%22%3A%22${user}%22%7D``` |

Response returns multiple crumbs for API calls, from those, we only need ```api/genrepreferences/1/open_genre_preferences``` which will be used to collect followed genres. 

### Wishlist
```http
  POST /api/fancollection/1/wishlist_items
```
| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Cookie` | `string` | **Required**. ```client_id=...; BACKENDID3=...; identity=...; js_logged_in=1; logout=%7B%22username%22%3A%22${user}%22%7D``` |

| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fan_id` | `string` | **Required**. Obtained upon fetching /api/fan/2/collection_summary |
| `older_than_token` | `string` | **Required**. Init is in this form: ```UnixTimeStamp(now)::a::```, needs to be replaced upon the API's response ```last_token```  |
| `count` | `number` | **Required**. Can be varied, 20 is default on this endpoint  |

### Genres
```http
  POST /api/genrepreferences/1/open_genre_preferences
```
| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Cookie` | `string` | **Required**. ```client_id=...; BACKENDID3=...; identity=...; js_logged_in=1; logout=%7B%22username%22%3A%22${user}%22%7D``` |

| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fan_id` | `string` | **Required**.|
| `crumb` | `string` | **Required**. Obtained from Crumbs endpoint|

This returns the followed genres. 

### Artists/Labels
```http
  POST /api/fancollection/1/following_bands
```
No special headers are needed. 

| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fan_id` | `string` | **Required**.|
| `older_than_token` | `string` | **Required**. Init is in this form: ```UnixTimeStamp(now)::a::```, needs to be replaced upon the API's response ```last_token```  |
| `count` | `number` | **Required**. Can be varied, 10 is default on this endpoint  |

This returns the followed artists/labels. 

# Reliability
Value is calculated:
  - filtering out duplicate ```genre_id```s from followed genres
  - counting elements from the ```wishList``` matching with ```genre_id```s
  - ```reliability = (itemsWithMatchingGenreCount / totalItems) * 100```
The returned reliability number is fixed to 2 decimals. 

# Result output
The output follows this structure: 

```json
{
  "username": "xyz",
  "reliability": 97.87,
  "wishlist": [
    {
      "fan_id": 9559639,
      "item_id": 4216501319,
      "item_type": "album",
      "band_id": 1041046483,
      "added": "10 May 2023 08:44:38 GMT",
      "updated": "10 May 2023 08:44:38 GMT",
      "purchased": null,
      "sale_item_id": null,
      "sale_item_type": null,
      "tralbum_id": 4216501319,
      "tralbum_type": "a",
      "featured_track": 4217068776,
      "why": null,
      "hidden": null,
      "index": null,
      "also_collected_count": 99,
      "url_hints": {
        "subdomain": "dudal",
        "custom_domain": null,
        "custom_domain_verified": null,
        "slug": "santeboutique",
        "item_type": "a"
      },
      "item_title": "santeboutique",
      "item_url": "https://dudal.bandcamp.com/album/santeboutique",
      "item_art_id": 394874881,
      "item_art_url": "https://f4.bcbits.com/img/a0394874881_9.jpg",
      "item_art": {
        "url": "https://f4.bcbits.com/img/a0394874881_9.jpg",
        "thumb_url": "https://f4.bcbits.com/img/a0394874881_3.jpg",
        "art_id": 394874881
      },
      "band_name": "dudal",
      "band_url": "https://dudal.bandcamp.com",
      "genre_id": 3,
      "featured_track_title": "moustache blanche",
      "featured_track_number": 1,
      "featured_track_is_custom": false,
      "featured_track_duration": 54,
      "featured_track_url": null,
      "featured_track_encodings_id": 3442184974,
      "package_details": null,
      "num_streamable_tracks": 9,
      "is_purchasable": true,
      "is_private": false,
      "is_preorder": false,
      "is_giftable": true,
      "is_subscriber_only": false,
      "is_subscription_item": false,
      "service_name": null,
      "service_url_fragment": null,
      "gift_sender_name": null,
      "gift_sender_note": null,
      "gift_id": null,
      "gift_recipient_name": null,
      "album_id": 4216501319,
      "album_title": "santeboutique",
      "listen_in_app_url": null,
      "band_location": null,
      "band_image_id": null,
      "release_count": null,
      "message_count": null,
      "is_set_price": false,
      "price": 5,
      "has_digital_download": null,
      "merch_ids": [
        2820342154
      ],
      "merch_sold_out": true,
      "currency": "EUR",
      "label": null,
      "label_id": null,
      "require_email": null,
      "item_art_ids": null,
      "releases": null,
      "discount": null,
      "token": "1683708278:4216501319:a::",
      "variant_id": null,
      "merch_snapshot": null,
      "featured_track_license_id": null,
      "licensed_item": null,
      "download_available": true
    },
  ],
  "followedArtists": [
    {
      "band_id": 1880537795,
      "image_id": 19662375,
      "art_id": 2262348297,
      "url_hints": {
        "subdomain": "hoopyfrood",
        "custom_domain": null
      },
      "name": "Hoopy Frood",
      "is_following": false,
      "is_subscribed": null,
      "location": "Reading, UK",
      "date_followed": "02 May 2023 22:38:53 GMT",
      "token": "1683067133:1880537795"
    }
  ],
  "followedGenres": [
    {
      "genre_id": 23,
      "tag_id": 0,
      "discover_id": 3,
      "name": "Rock",
      "norm_name": "rock",
      "geoname_id": 0,
      "geoname_name": null,
      "format": "all"
    }
  ]
}
```
The output file, named ```${username}.json```, is stored in the ```./results folder```. I chose this format because it conserves storage space while encompassing all essential data (username, reliability, wishList, followedArtist, followedGenres). Additionally, using JSON format ensures ease of data processing in the future if required.

# Known issues / Missing features
 - Proxy Support: During my test runs, I didn't encounter rate limits on the APIs. Nevertheless, to enhance reliability, it is advisable to incorporate rotating proxy support in the future.
 - Error Handling/Retry Mechanisms: These aspects need improvement and should be added later to ensure smoother operation.
 - Tests: Although I highly value writing robust tests, due to time constraints, I couldn't include them in the current deliverable. It's worth noting that throughout the development process, I prioritized testability, maintainability, and readability of the program to ensure a solid foundation for future testing efforts.
 - User credentials: Presently, the username and password are fetched from the .env file. However, in a production environment with potentially thousands of users, this approach is not ideal and lacks convenience. 