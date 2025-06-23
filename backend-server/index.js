import express from "express"
import "./config/db.js"
import {protect} from "./middleware/authMiddleware.js"

import userRoute from "./routes/userRoute.js"
import resRoute from "./routes/resumeRoute.js"

const app = express()
const PORT = 3000;

app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Hello to JobFolio")
})

app.get("/protected",protect, (req,res)=>{
    // res.send("Protected", { user: req.user})


    res.status(200).json({message:"Protected" , user: req.user} )
})

app.use("/auth",userRoute)
app.use("/resume",resRoute)



app.listen(PORT, ()=>{
    console.log(`Server Running on: http://localhost:${PORT} `);
    
} )
