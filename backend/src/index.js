import express from "express"
import router from "./routes/index.js"

const app = express()


app.use("/",router)

app.use("/test", (req, res) => {
   res.send("Hello from ticket booking app") 
})

app.listen(8000, () => {
    console.log("Connected to server 8000")
})
