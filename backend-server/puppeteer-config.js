// puppeteer-config.js
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

  // In production (Render), let Puppeteer find Chrome automatically
  // It will use the cache directory we created
  if (process.env.NODE_ENV === 'production') {
    console.log('Production: Letting Puppeteer find Chrome automatically');
  }

  try {
    const browser = await puppeteer.launch(launchOptions);
    return browser;
  } catch (error) {
    console.error('Failed to launch browser:', error);
    throw error;
  }
};