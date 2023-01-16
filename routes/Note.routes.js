const express= require("express")
const {NoteModel} = require("../models/Note.model")
const noteRouter = express.Router()

noteRouter.get("/",async(req,res)=>{
    const query = req.query
    try{
        const notes = await NoteModel.find(query)
        res.send(notes)

    }catch(err){
        res.send("error")
    }
    // res.send("all the notes")
})

noteRouter.post("/create",async(req,res)=>{
    const payload = req.body
    try{
        const new_note = new NoteModel(payload)
        await new_note.save()
        res.send("created")

    }catch(err){
        console.log("err")
        res.send("err")
    }
    // res.send("created")
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const payload = req.body
    const id = req.params.id
    const note = await NoteModel.findOne({"_id":id})
    const userID_in_note = note.userId
    const userId_makingReq = req.body.userId
    try{
        if(userId_makingReq===userID_in_note){
            res.send({"msg": "you are not authorised"})
        }else{
            await NoteModel.findByIdAndUpdate({"_id" : id},payload)
            res.send("updated")
        }
        
    }catch(err){
        console.log("eerr")
        res.send("err")
    }
    // res.send("updated")
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    const note = await NoteModel.findOne({"_id":id})
    const userID_in_note = note.userId
    const userId_makingReq = req.body.userId
    try{
        if(userId_makingReq===userID_in_note){
            res.send({"msg": "you are not authorised"})
        }else{
            await NoteModel.findByIdAndDelete({"_id" : id})
            res.send("deleted")
        }
        
    }catch(err){
        console.log("eerr")
        res.send("err")
    }
})




module.exports={
    noteRouter
}