import dotenv from "dotenv";
dotenv.config({ quiet: true });

export const config = {
  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",

  // Database Configuration
  dbUri: process.env.MONGODB_URI,

  // Server Configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",

  // CORS Configuration
  allowedOrigins: [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:5137",
    "http://localhost:3000",
  ].filter(Boolean),

  // Frontend URL (for PDF generation)
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",

  // Puppeteer Configuration (for production Docker)
  puppeteerExecutablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
};