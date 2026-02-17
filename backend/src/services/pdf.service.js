import puppeteer from "puppeteer";
import { config } from "../config/env.config.js";
import logger from "../config/logger.config.js";
import ApiError from "../utils/ApiError.js";
import { StatusCodes } from "http-status-codes";

/**
 * PDF generation configuration
 */
const PDF_CONFIG = {
  format: "A4",
  printBackground: true,
  margin: {
    top: "0.5in",
    right: "0.5in",
    bottom: "0.5in",
    left: "0.5in",
  },
};

/**
 * Get Puppeteer launch options based on environment
 * @returns {Object} Puppeteer launch options
 */
const getPuppeteerOptions = () => {
  const isProduction = config.nodeEnv === "production";

  const args = [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-accelerated-2d-canvas",
    "--no-first-run",
    "--no-zygote",
    "--disable-gpu",
    "--disable-software-rasterizer",
    "--disable-extensions",
    "--disable-background-networking",
    "--disable-default-apps",
    "--disable-sync",
    "--disable-translate",
    "--hide-scrollbars",
    "--metrics-recording-only",
    "--mute-audio",
    "--no-first-run",
    "--safebrowsing-disable-auto-update",
  ];

  // Only use single-process in specific environments (can cause crashes)
  if (process.env.PUPPETEER_SINGLE_PROCESS === "true") {
    args.push("--single-process");
  }

  return {
    args,
    executablePath: isProduction
      ? process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/google-chrome-stable"
      : puppeteer.executablePath(),
    headless: "new",
    // Increase timeout for slow environments
    timeout: 60000,
  };
};

/**
 * Generate PDF from a resume preview URL
 * @param {string} resumeId - The resume ID
 * @param {string|null} token - JWT token for authentication (optional)
 * @returns {Promise<Buffer>} PDF buffer
 */
export const generateResumePDF = async (resumeId, token = null) => {
  let browser = null;

  try {
    logger.info(`Starting PDF generation for resume: ${resumeId}`);

    const puppeteerOptions = getPuppeteerOptions();
    logger.info(`Puppeteer options: ${JSON.stringify(puppeteerOptions)}`);

    browser = await puppeteer.launch(puppeteerOptions);
    const page = await browser.newPage();

    // Set authorization header if token provided
    if (token) {
      await page.setExtraHTTPHeaders({
        Authorization: `Bearer ${token}`,
      });
    }

    // Construct preview URL - use frontend URL from config for deployment
    const baseUrl = config.frontendUrl || "http://localhost:3000";
    const previewUrl = `${baseUrl}/puppeteer/${resumeId}`;

    logger.info(`Navigating to: ${previewUrl}`);

    // Navigate to the preview page
    await page.goto(previewUrl, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // Wait for content to be ready (optional: wait for specific selector)
    await page.waitForSelector("body", { timeout: 30000 });

    // Wait for any remaining network activity
    await page.waitForNavigation({ waitUntil: "networkidle2" }).catch(() => {});

    // Generate PDF
    const pdfBuffer = await page.pdf(PDF_CONFIG);

    await page.close();

    logger.info(`PDF generated successfully for resume: ${resumeId}`);

    return pdfBuffer;
  } catch (error) {
    logger.error(`PDF Generation Error: ${error.message}`);
    logger.error(`Stack trace: ${error.stack}`);
    
    // Provide more specific error messages for common Puppeteer issues
    let errorMessage = "Failed to generate PDF. Please try again later.";
    
    if (error.message.includes("Failed to launch the browser process")) {
      logger.error("Browser launch failed - check Puppeteer executable path and Chrome dependencies");
      errorMessage = "PDF service temporarily unavailable. Browser initialization failed.";
    } else if (error.message.includes("Navigation timeout")) {
      logger.error("Page navigation timeout - frontend may be unreachable");
      errorMessage = "PDF generation timed out. Please try again.";
    } else if (error.message.includes("net::ERR_CONNECTION_REFUSED")) {
      logger.error("Connection refused - check FRONTEND_URL configuration");
      errorMessage = "PDF service configuration error.";
    }
    
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      errorMessage
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

/**
 * Generate PDF with custom HTML content
 * @param {string} htmlContent - HTML content to convert to PDF
 * @returns {Promise<Buffer>} PDF buffer
 */
export const generatePDFFromHTML = async (htmlContent) => {
  let browser = null;

  try {
    browser = await puppeteer.launch(getPuppeteerOptions());
    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf(PDF_CONFIG);

    return pdfBuffer;
  } catch (error) {
    logger.error(`PDF generation from HTML failed: ${error.message}`);
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to generate PDF"
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
