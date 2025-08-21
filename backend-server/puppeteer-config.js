// puppeteer-config.js (simplified)
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

export const launchBrowser = async () => {
  const launchOptions = {
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process'
    ],
    timeout: 30000
  };

  // Set cache directory for production
  if (process.env.NODE_ENV === 'production') {
    process.env.PUPPETEER_CACHE_DIR = '/opt/render/.cache/puppeteer';
    console.log('Production: Using Render cache directory for Puppeteer');
  }

  try {
    const browser = await puppeteer.launch(launchOptions);
    console.log('Browser launched successfully');
    return browser;
  } catch (error) {
    console.error('Failed to launch browser:', error);
    throw error;
  }
};