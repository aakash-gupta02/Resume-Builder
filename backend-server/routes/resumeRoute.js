import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { createResume, getResume, updateResume } from "../controller/resumeController.js"

const router = express.Router()


router.post("/create", protect, createResume )
router.get("/allresume", protect, getResume)

router.post("/update/:id", protect,updateResume)

export default router