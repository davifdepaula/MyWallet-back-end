import bcrypt from 'bcrypt'
import {v4 as uuidV4} from 'uuid'
import db from '../config/database.js'

const loginController = async(req, res) => {
    const { email, password } = req.body
    try{
        const checkUser = await db.collection("users").findOne({email})
        if(!checkUser || !bcrypt.compareSync(password, checkUser.password)){
            return res.status(401).send("Usuário ou senha inválidos")
        }
        const token = uuidV4()
        await db.collection("sessions").insertOne({id: checkUser._id, name: checkUser.name, token})
        return res.send(token)
    }catch(error){
        return res.sendStatus(500)
    }
}


export {
    loginController
}