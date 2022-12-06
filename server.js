require('dotenv').config()

const express = require ('express')
const app = express()
const mongoose = require ('mongoose')
const cors = require('cors')



mongoose.connect('mongodb://0.0.0.0:27017/reactapp',{useNewUrlParser:true})
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())
app.use(cors())


const postsRouter = require('./routes/posts') 
const usersRouter = require('./routes/users.js')

app.use('/posts',postsRouter)
app.use('/users',usersRouter)



app.listen(5000, () => console.log("Server has started on port  5000"))