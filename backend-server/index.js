import express from "express";
import "./config/db.js";
import cors from "cors";
import { protect } from "./middleware/authMiddleware.js";
import userRoute from "./routes/userRoute.js";
import resRoute from "./routes/resumeRoute.js";
import puppeteerRoute from "./routes/puppeterRoute.js" ;

const app = express();
const PORT = 3000;

app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://resume-builder-chi-eight.vercel.app",
  "https://jobfolioo.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow cookies/authorization headers
  })
);
app.get("/", (req, res) => {
  res.send("Hello to JobFolio");
});

app.get("/protected", protect, (req, res) => {
  // res.send("Protected", { user: req.user})

  res.status(200).json({ message: "Protected", user: req.user });
});

app.use("/auth", userRoute);
app.use("/resume", resRoute);
app.use("/puppeteer", puppeteerRoute);

app.listen(PORT, () => {
  console.log(`Server Running on: http://localhost:${PORT} `);
});


// starting the polishing of resume builder .......this is msg for adding a commit 