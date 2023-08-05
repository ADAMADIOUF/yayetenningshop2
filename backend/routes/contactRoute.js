// backend/routes/formRoutes.js
import express from 'express'
import submitFormData from '../controllers/contactController.js'

const router = express.Router()

// Route for form submissions
router.post('/', submitFormData)

export default router
