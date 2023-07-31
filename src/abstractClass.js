class AbstractScrapingClass {
  constructor() {
    this.username;
    this.password;
    this.userId;
    this.apiCrumb;
    this.cookies = {};
    this.wishList = [];
    this.genres = [];
    this.artists = [];
    this.reliability = 0;
  }

  async login(user, password) {
    this.username = user;
    this.password = password;

    try {
      this.cookies = await this.getLoginCookies();
      this.apiCrumb = await this.getCrumbs();
      await this.process();
    } catch (error) {
      console.error('Error occurred during login:', error);
      throw error;
    }
  }

  async process() {
    try {
      this.wishList = await this.getWishList();
      this.genres = await this.getGenres();
      this.artists = await this.getArtists();
      this.reliability = this.calculateReliability();
      this.saveData();
    } catch (error) {
      console.error('Error occurred during processing:', error);
      throw error;
    }
  }
}

export default AbstractScrapingClass;