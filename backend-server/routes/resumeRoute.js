import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { createResume, deleteResume, getResume, updateResume } from "../controller/resumeController.js"

const router = express.Router()


router.post("/create", protect, createResume )
router.get("/allresume", protect, getResume)

router.get("/getresume/:id", protect,getResume)
router.put("/update/:id", protect,updateResume)
router.delete("/delete/:id", protect, deleteResume)


export default router