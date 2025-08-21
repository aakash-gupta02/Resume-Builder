// install-puppeteer.js - SIMPLER VERSION
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

console.log('Running Puppeteer setup for Render...');

if (process.env.NODE_ENV === 'production') {
  console.log('Setting up Puppeteer cache directory...');
  
  // Just ensure the cache directory exists
  const cacheDir = '/opt/render/.cache/puppeteer';
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
    console.log('Created cache directory for Puppeteer');
  }
  
  console.log('Puppeteer will download Chrome on first run if needed');
} else {
  console.log('Development environment - no special setup needed');
}

console.log('Puppeteer setup completed');