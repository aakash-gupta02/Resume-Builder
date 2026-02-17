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

  return {
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-gpu",
    ],
    executablePath: isProduction
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : puppeteer.executablePath(),
    headless: "new",
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

    browser = await puppeteer.launch(getPuppeteerOptions());
    const page = await browser.newPage();

    // Set authorization header if token provided
    if (token) {
      await page.setExtraHTTPHeaders({
        Authorization: `Bearer ${token}`,
      });
    }

    // Construct preview URL
    const baseUrl = "http://localhost:3000";
    const previewUrl = `${baseUrl}/resume/puppeteer/${resumeId}`;

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
    logger.error(`Error: ${error}`);
    logger.error(`PDF generation failed for resume ${resumeId}: ${error.message}`);
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to generate PDF. Please try again later."
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
