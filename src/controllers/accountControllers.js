import dayjs from "dayjs"
import db from "../config/database.js"

const deposit = async(req, res) => {
    const {id} = res.locals.session
    const {value, description} = req.body
    try{
        const account = await db.collection("Accounts").findOne({_id: id})
        const cashIn = [...account.cashIn, {value, description, date: dayjs(Date.now()).format("DD/MM")}]
        const saldo = Number(value) + account.saldo
        await db.collection("Accounts").updateOne({_id: id}, 
            {$set: {cashIn, saldo}})
        return res.sendStatus(200)
    }catch{
        return res.sendStatus(500)
    }
}

const withdraw = async(req, res) => {
    const {id} = res.locals.session
    const {value, description} = req.body
    try{
        const account = await db.collection("Accounts").findOne({_id: id})
        const cashOut = [...account.cashOut, {value, description, date: dayjs(Date.now()).format("DD/MM")}]
        const saldo = account.saldo - Number(value)
        await db.collection("Accounts").updateOne({_id: id}, 
            {$set: {cashOut, saldo}})
        return res.sendStatus(200)
    }catch{
        return res.sendStatus(500)
    }
}

const getInfomation = async(req, res) => {
    const {id} = res.locals.session
    const user = await db.collection("Accounts").findOne({_id: id})

    return res.send(
        {id: user._id, 
        name: user.name, 
        cashIn: user.cashIn, 
        cashOut: user.cashOut, 
        saldo: user.saldo 
    })
}

export {
    deposit,
    withdraw,
    getInfomation
}