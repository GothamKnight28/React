const express = require('express')
const {restart} = require('nodemon')
const router = express.Router()
const Posts = require('../models/postSchema')


//Getting all method
router.get('/', async (req,res)=> {
    try {
        const post = await Posts.find()
        res.json(post)
    }
    catch (error){
        res.status(500),json({message:err.message})
    }
})

// Get with ID
router.get('/:id',getPosts,(req,res)=> {
    res.send(res.post.name)
})

//Post method
router.post('/', async (req,res)=> {
    const post = new Posts({
        name : req.body.name,
        content : req.body.content,
        time : req.body.time

    })
    try{
        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch {
        res.status(400).json({message:"err.message"})
    }
})


router.delete('/:id',getPosts, async (req,res)=> {
    try{
        await res.post.remove()
        res.json({message: "Deleted"})
    }catch(err){
        res.status(500).json({message :err.message})
    }
})

async function getPosts(req,res,next){
    let post
try{
    post = await Posts.findById(req.params.id)
    if(post == null){
        return res.status(404).json({message: "No posts found"})
    }
} catch(err){
   return res.status(500).json({message: err.message})
}
res.post = post
next()
}

module.exports = router

