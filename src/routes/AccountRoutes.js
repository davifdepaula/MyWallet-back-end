import express from 'express'
import { deposit } from '../controllers/accountControllers.js'
import { depositValidation, tokenValidation } from '../middlewares/accountValidation.js'

const accountRoutes = express.Router()

accountRoutes.post("/nova-entrada", tokenValidation, depositValidation, deposit)

export default accountRoutes