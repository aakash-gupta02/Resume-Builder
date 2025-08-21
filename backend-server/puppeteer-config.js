// puppeteer-config.js
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

// Function to get Chrome executable path based on environment
const getChromePath = () => {
  if (process.env.NODE_ENV == 'production') {
    // Development - use system Chrome or let Puppeteer download it
    return undefined;
  }
  
  // Production (Render) - use the installed Chrome path
  // Note: Render uses Linux, so the path is different from your Windows local
  return '/opt/render/.cache/puppeteer/chrome/linux-139.0.7258.68/chrome-linux64/chrome';
};

// Launch browser with proper configuration
export const launchBrowser = async () => {
  const chromePath = getChromePath();
  
  const launchOptions = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-software-rasterizer',
      '--no-zygote',
      '--single-process'
    ]
  };

  // Add executable path only if specified
  if (chromePath) {
    launchOptions.executablePath = chromePath;
    console.log('Using Chrome at:', chromePath);
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
