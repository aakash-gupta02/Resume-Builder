// puppeteerRoute.js
import express from "express";
import { conditionalAuth } from "../middleware/authMiddleware.js";
import { launchBrowser } from "../puppeteer-config.js"; // Import from config

const router = express.Router();

router.post("/generate-pdf/:id", conditionalAuth, async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1] || null;
  let browser = null;

  try {
    // Option 1: If you want to navigate to a URL
    browser = await launchBrowser();
    const page = await browser.newPage();

    if (token) {
      await page.setExtraHTTPHeaders({
        Authorization: `Bearer ${token}`,
      });
    }

    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL 
      : "http://localhost:5173";
    
    const previewUrl = `${baseUrl}/resume/puppeteer/${id}`;
    console.log(`Generating PDF from: ${previewUrl}`);

    await page.goto(previewUrl, { 
      waitUntil: "networkidle0",
      timeout: 60000
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0.5in",
        right: "0.5in",
        bottom: "0.5in",
        left: "0.5in"
      }
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="resume-${id}.pdf"`,
    });
    res.send(pdfBuffer);

  } catch (error) {
    console.error("PDF Generation Error:", error);
    if (browser) {
      await browser.close();
    }
  }
});


export default router;