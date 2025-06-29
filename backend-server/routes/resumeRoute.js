// import express from "express"
// import { protect } from "../middleware/authMiddleware.js"
// import { createResume, deleteResume, getResume, oneResume, updateResume } from "../controller/resumeController.js"

// const router = express.Router()

// router.post("/create", protect, createResume )
// router.get("/allresume", protect, getResume)

// router.get("/getresume/:id", protect,oneResume)

// router.put("/update/:id", protect,updateResume)
// router.delete("/delete/:id", protect, deleteResume)

// export default router

import express from "express";
import {
  createResume,
  updateResume,
  deleteResume,
  getAllResumes,
  getSingleResume,
} from "../controller/resumeController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createResume);
router.get("/all", protect, getAllResumes);



router.put("/update/:id", protect, updateResume);
router.delete("/delete/:id", protect, deleteResume);

router.get("/get/:id", protect, getSingleResume);

export default router;
