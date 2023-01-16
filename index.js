const express = require("express")
const { connection } = require("./configs/db")
const {UserModel} = require("./models/User.model")
const {userRouter} = require("./routes/User.routes")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { noteRouter } = require("./routes/Note.routes")
const { authenticate } = require("./middleware/authenticate.middleware")
const cors = require("cors")
const app = express()

app.use(cors({
    origin : "*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)

// app.get("/get",async(req,res)=>{
//     const query = req.query
//     try{
//         const data = await UserModel.find(query)
//         res.send(data)

//     }catch(err){
//         res.send("error")
//     }
// })



// app.get("/about",(req,res)=>{
//     res.send("about")
// })
// app.get("/data",(req,res)=>{
    
//     const token = req.query.token
//     jwt.verify(token, 'masai', (err, decoded)=> {
//         if(err){
//             res.send("Login first")
//         }else{
//             res.send("data")
//         }
//       });
    
// })
// app.get("/cart",(req,res)=>{
//     const token = req.query.token
//     jwt.verify(token, 'masai', (err, decoded)=> {
//         if(err){
//             res.send("Login first")
//         }else{
//             res.send("cart")
//         }
//       });
// })
// app.get("/contact",(req,res)=>{
//     const token = req.headers.authorize
//     jwt.verify(token, 'masai', (err, decoded)=> {
//         if(err){
//             res.send("Login first")
//         }else{
//             res.send("contact")
//         }
//       });
// })
app.listen(8080,async()=>{
    try{
        await connection
    }catch(err){
        console.log(err)
    }
    console.log("8080")
})