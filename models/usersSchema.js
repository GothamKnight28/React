const mongoose = require ('mongoose')
const bcrypt = require ('bcrypt')

const usersSchema = new mongoose.Schema({
    username: {
        type:String,
        required : true
    },
    gmail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }

})

usersSchema.pre('save',async function (next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model("User",usersSchema)