const jwt = require('jsonwebtoken')

const VerifyToken=async(req, res, next)=>{
    let token = req.header('auth-token')


    if(!token){
        res.json("Access Denied")
    }else{
        try{
            let decoded = await jwt.verify(token, 'secret')
            req.user = decoded
            next()
        }catch(err){
            if(err) return res.json({invalid_token: true})
        }
    }
}


module.exports = VerifyToken