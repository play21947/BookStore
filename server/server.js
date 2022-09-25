const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const users = require('./users.json')
const book = require('./books.json')
const VerifyToken = require('./VerifyToken')

app.use(cors())
app.use(express.json())


app.post("/api/login", async(req, res)=>{
    let username = req.body.username
    let password = req.body.password

    // console.log(username)
    // console.log(password)


    let finduser = users.filter((user)=>{
        return user.username == username && user.password == password
    })

    // console.log(finduser)

    if(finduser.length > 0){
        let token = await jwt.sign({user_id: finduser[0].id}, 'secret', {expiresIn: '30min'})
        res.json({token: token})
    }else{
        res.json({token: null})
    }
})

app.get("/api/books", VerifyToken ,(req, res)=>{
    res.json(book)
})

app.get("/api/user", VerifyToken, (req, res)=>{
    let user = users.filter((user)=>{
        return user.id == req.user.user_id
    })

    if(!user){
        res.status(404)
    }else{
        res.json(user)
    }
})


app.listen(3001, (req, res)=>{
    console.log("Server is running on port 3001")
})