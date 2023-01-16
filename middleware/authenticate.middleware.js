const jwt = require("jsonwebtoken")


const authenticate = (req,res,next)=>{

    const token = req.headers.auth
    if(token){
        const decoded = jwt.verify(token,"masai")
        if(decoded){
            const userId = decoded.userId
            console.log(decoded)
            req.body.userId = userId
            next()
        }else{
            res.send("please login")
        }
    }else{
        res.send("please login")
    }
}

module.exports={
    authenticate
}