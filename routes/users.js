const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const {restart} = require ('nodemon')
const User = require ('../models/usersSchema')
const jwt = require("jsonwebtoken")
const { json } = require('express')
const JWT_SECRET = "askjlah]23[a2][f]2a[fk]a2[kf]aksd"
const bcrypt = require('bcrypt')

//Getting all method
router.get('/', async (req,res)=> {
    try{
        const user = await User.find()
        res.json(user)
    }catch(err){
        res.status(500),json({err:err.message})
    }
})

// Get with ID
router.get('/:id',getUsers,(req,res)=> {
    res.send(res.user.name)
})

const userInfo = mongoose.model("User")
//Post method
router.post('/', async (req,res)=> { 
    const user = new User({
        username : req.body.username,
        gmail: req.body.gmail,
        password : req.body.password,
        status:req.body.status
    })
    try{
        //Checks if user already exists
        const email = req.body.gmail
        const oldUserCheck = await User.findOne({gmail:email})
        console.log(oldUserCheck)
        if(oldUserCheck){
            return res.json({error:"User exists return"})    
        }
        //
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch(err) {
        res.status(400).json({message:err})
    }
})

router.post('/login', async (req,res)=> {
    const user = new User({
        gmail: req.body.gmail,
        password : req.body.password
    })
    try{
        const bodyEmail = req.body.gmail 
        const bodyPassword = req.body.password

        const oldUserCheck = await User.findOne({gmail:bodyEmail})
        //console.log(oldUserCheck.username)

        if(!oldUserCheck){
            return res.json({error:"User not found"})
        }
        const compare = await bcrypt.compare(bodyPassword,oldUserCheck.password)
        //console.log(compare)
        if(compare){

            const token = jwt.sign({oldUserCheck},JWT_SECRET)
            console.log(token)
            if(res.status(201)){
                return res.json({status:"ok",data:token})
            }else{
                return res.json({message:"error"})
            }
        }
    } catch(err) {
        res.status(400).json({message:"Invalid password"})
    }
})

async function getUsers(req,res,next){
    let user
try{
    user = await User.findById(req.params.id)
    if(user == null){
        return res.status(404).json({message: "No users found"})
    }
} catch(err){
   return res.status(500).json({message: err.message})
}
res.user = user
next()
}

module.exports = router

