import express from "express";
import { conditionalAuth } from "../middleware/authMiddleware.js";
import puppeteer from "puppeteer";

const router = express.Router();

router.post("/generate-pdf/:id", conditionalAuth, async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1] || null;

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    if (token) {
      await page.setExtraHTTPHeaders({
        Authorization: `Bearer ${token}`,
      });
    }

    const previewUrl = `http://localhost:5173/resume/puppeteer/${id}`;
    await page.goto(previewUrl, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="resume-${id}.pdf"`,
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
});

export default router;
