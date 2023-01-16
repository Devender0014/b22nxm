const mongoose = require("mongoose")


const connection = mongoose.connect("mongodb+srv://devender:yadavyadav@cluster0.pzyd5lc.mongodb.net/?retryWrites=true&w=majority")

module.exports={
    connection
}