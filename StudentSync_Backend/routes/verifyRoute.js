const jwt=require('jsonwebtoken');

function verifyToken(req,res,next){
    let token=req.headers.token;
    try{
        if(!token) throw 'Unauthorized access !'
        else{
            let payload=jwt.verify(token,process.env.jwt_secret_key);
            if(!payload) throw 'Unauthorized access !';
            req.user=payload; //attaching user data to the request
            next();
        }
    }catch(error){
        console.log(error)
    }
}

module.exports=verifyToken