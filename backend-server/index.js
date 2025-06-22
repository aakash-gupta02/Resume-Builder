import express from "express"
import "./config/db.js"

import userRoute from "./routes/userRoute.js"

const app = express()
const PORT = 3000;

app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Hello to JobFolio")
})

app.use("/auth",userRoute)



app.listen(PORT, ()=>{
    console.log(`Server Running on: http://localhost:${PORT} `);
    
} )
