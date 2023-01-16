const express = require("express")
const {UserModel} = require("../models/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,pass,name,age} = req.body
    try{
        bcrypt.hash(pass, 5, async(err, secure_password)=> {
            if(err){
                console.log(err)
            }else{
                const user = new UserModel({email,pass : secure_password,name,age})
        await user.save()
        res.send("registered")
            }
        });
    }catch(err){
        console.log("err")
    }
    res.send("Register")
})


userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body
    try{
        const user = await UserModel.find({email})
        if(user.length > 0){
            bcrypt.compare(pass, user[0].pass, (err, result)=> {
                if(result){
                    const token = jwt.sign({userId : user[0]._id},"masai")
                    res.send({"msg" :"Login done","token":token})
                }else{
                    res.send("Wrong1")
                }
            });

        }else{
            res.send("wrong2")
        }
    }catch(err){
        res.send("login failed")
        console.log("err")
    }
})

module.exports={
    userRouter
}