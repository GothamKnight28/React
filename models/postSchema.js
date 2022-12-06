const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Posts",postSchema)


