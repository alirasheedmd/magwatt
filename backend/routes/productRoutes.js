import express from "express"
const router = express.Router()
import {
  deleteProduct,
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  createReview,
  getTopProducts,
  createSku,
  deleteSku,
} from "../controllers/productControllers.js"
import { admin, protect } from "../middleware/authMiddleware.js"

router.route("/").get(getProducts).post(protect, admin, createProduct)
router.route("/:id/review").post(protect, createReview)
router
  .route("/:id/skus")
  .post(protect, admin, createSku)
  .delete(protect, admin, deleteSku)
router.route("/topratedproducts").get(getTopProducts)
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
