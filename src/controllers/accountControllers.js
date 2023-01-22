import db from "../config/database.js"

const deposit = async(req, res, next) => {
    const {id} = res.locals.session
    const {value, description} = req.body
    try{
        const account = await db.collection("Accounts").findOne({_id: id})
        const cashIn = [...account.cashIn, {value, description}]
        const saldo = Number(value) + account.saldo
        await db.collection("Accounts").updateOne({_id: id}, 
            {$set: {cashIn, saldo}})
        return res.sendStatus(200)
    }catch{
        return res.sendStatus(500)
    }
}

export {
    deposit
}