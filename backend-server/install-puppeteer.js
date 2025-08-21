import { exec } from 'child_process';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

console.log('Running Puppeteer installation script for Render...');

// Only run in production on Render
if (process.env.NODE_ENV === 'production') {
  console.log('Setting up Chrome for production environment...');
  
  // Create cache directory if it doesn't exist
  const cacheDir = '/opt/render/.cache/puppeteer';
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
    console.log('Created cache directory:', cacheDir);
  }

  // Set environment variable for Puppeteer
  process.env.PUPPETEER_CACHE_DIR = cacheDir;
  
  console.log('Installing Chrome browser...');
  exec('npx puppeteer browsers install chrome', 
    { timeout: 120000 }, // 2 minute timeout
    (error, stdout, stderr) => {
      if (error) {
        console.error('Error during Chrome installation:', error.message);
        console.log('This may not be fatal if Chrome is already available');
        return;
      }
      console.log('Chrome installation completed successfully');
      if (stdout) console.log('Output:', stdout);
      if (stderr) console.log('Notes:', stderr);
    }
  );
} else {
  console.log('Development environment - skipping Chrome installation');
}