import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGOURL = process.env.MONGO_URL;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,                       // 🔒 Required for Atlas
  serverSelectionTimeoutMS: 15000, // ⏳ avoid hanging logs forever
};

mongoose.connect(MONGOURL, options)
  .then(() => {
    console.log("✅ DB CONNECTED");
  })
  .catch((err) => {
    console.error("❌ DB CONNECTION ERROR:", err.message);
    process.exit(1); // crash container if DB fails (Render will restart)
  });
