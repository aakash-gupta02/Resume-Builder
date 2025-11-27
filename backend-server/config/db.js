import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
  .then(() => {
    console.log("✅ DB CONNECTED");
  })
  .catch((err) => {
    console.error("❌ DB CONNECTION ERROR:", err.message);
    process.exit(1); // crash container if DB fails (Render will restart)
  });
