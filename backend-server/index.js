import express from "express"

const app = express()
const PORT = 3000;

app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Hello to JobFolio")
})

app.listen(PORT, ()=>{
    console.log(`Server Running on: http://localhost:${PORT} `);
    
} )
