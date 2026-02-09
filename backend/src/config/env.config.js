import dotenv from "dotenv";
dotenv.config({ quiet: true });

export const config = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",

  dbUri: process.env.MONGO_URI,

  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",

  allowedOrigins: [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:5137",
    "http://localhost:3000",
  ].filter(Boolean),

  frontendUrl: process.env.FRONTEND_URL,

  puppeteerExecutablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
};
