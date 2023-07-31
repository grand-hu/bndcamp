import AbstractScrapingClass from './abstractClass.js';
import { getLoginCookies } from './helpers/cookies.js';
import { getCrumbs } from './helpers/crumbs.js';
import { getWishList } from './helpers/wishlist.js';
import { getGenres } from './helpers/genres.js';
import { getArtists } from './helpers/artists.js';
import { calculateReliability } from './helpers/reliability.js';
import { saveData } from './helpers/saveResult.js';

class ScrapingClass extends AbstractScrapingClass {
  async getLoginCookies() {
    return await getLoginCookies(this.username, this.password);
  }

  async getCrumbs() {
    return await getCrumbs(this.cookies, this.username);
  }

  async getWishList() {
    return await getWishList(this.cookies, this.username);
  }

  async getGenres() {
    return await getGenres(this.cookies, this.apiCrumb, this.username);
  }

  async getArtists() {
    return await getArtists(this.cookies.fan_id);
  }

  calculateReliability() {
    return calculateReliability(this.wishList, this.genres);
  }

  saveData() {
    return saveData(this.username, this.reliability, this.wishList, this.artists, this.genres);
  }
}

export default ScrapingClass;
