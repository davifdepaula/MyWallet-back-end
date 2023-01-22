import express from 'express'
import { deposit, getInfomation, withdraw } from '../controllers/accountControllers.js'
import { withdrawValidation, financialMovementValidation, tokenValidation } from '../middlewares/accountValidation.js'

const accountRoutes = express.Router()
accountRoutes.get("/home", tokenValidation, getInfomation)
accountRoutes.post("/nova-entrada", tokenValidation, financialMovementValidation, deposit)
accountRoutes.post("/nova-saida", tokenValidation, withdrawValidation, financialMovementValidation, withdraw)

export default accountRoutes