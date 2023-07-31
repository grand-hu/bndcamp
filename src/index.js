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
