import express from "express"
import {
  createCategory,
  getCategory,
} from "../controllers/categoryControllers.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").post(createCategory, admin, protect).get(getCategory)

export default router
