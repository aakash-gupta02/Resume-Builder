import puppeteer from 'puppeteer';

export const launchBrowser = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--single-process'
      ]
    });
    console.log('Browser launched successfully');
    return browser;
  } catch (error) {
    console.error('Failed to launch browser:', error);
    throw error;
  }
};
