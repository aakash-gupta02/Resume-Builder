import { exec } from 'child_process';

console.log('Installing Puppeteer dependencies for Render...');

// Set the cache directory for Render
process.env.PUPPETEER_CACHE_DIR = '/opt/render/.cache/puppeteer';

// Install Chrome in the correct location for Render
exec('npx puppeteer browsers install chrome', 
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing Chrome: ${error}`);
      // Don't fail the build if installation fails
      return;
    }
    console.log(`Chrome installation completed`);
    if (stderr) {
      console.error(`Chrome installation warnings: ${stderr}`);
    }
  }
);