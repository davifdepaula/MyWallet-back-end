import app from "./src/app.js"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT
console.log(PORT)
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})