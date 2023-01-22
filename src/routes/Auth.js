import express from 'express'
import db from '../config/database.js'
import { loginController, signUpControler } from '../controllers/authControllers.js'
import { checkLogin, loginValidation, signUpValidate } from '../middlewares/authValidation.js'

const authRoutes = express.Router()

authRoutes.get('/', async(req, res) => {
    const users = await db.collection("Accounts").find({}).toArray()
    return res.send(users)
})
authRoutes.post('/', loginValidation, checkLogin, loginController)
authRoutes.post('/cadastro', signUpValidate, signUpControler)

export default authRoutes