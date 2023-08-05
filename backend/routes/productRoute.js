import express from 'express'
import {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'

// Import the middleware
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route(`/`).get(getProducts).post(protect, admin, createProduct)
router
  .route(`/:id`)
  .get(getSingleProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)

export default router