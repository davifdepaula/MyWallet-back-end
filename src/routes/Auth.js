import express from 'express'
import { loginController } from '../controllers/authControllers.js'
import { loginValidation } from '../middlewares/authValidation.js'

const authRoutes = express.Router()

authRoutes.post('/', loginValidation, loginController)

export default authRoutes