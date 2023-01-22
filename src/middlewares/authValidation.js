import joi from 'joi'
import { loginSchema } from '../model/authModel.js' 


const loginValidation = (req, res, next) => {
    const {email, password} = req.body
    const userValidation = loginSchema.validate({email, password})
    if(userValidation.error) return res.status(422).send(`${userValidation.error.message}`)
    next()
}


export {
    loginValidation
}