const userHelper = require('../helpers/users.helper');

const jwt = require('jsonwebtoken');

exports.authenticate = (req,res,next)=>{
    if(req.cookies['token']){
        //var token = "eyJhbGciOiJIUzI1NiIsInR5cC6IkpXVCJ9.eyJlbWFpbCI6ImFzdGFAeWFob28uY29tIiwidXNlcm5hbWUiOiJBc3RhcHJhc2FkIERhcyIsImlhdCI6MTYzMDQ5NDI5NiwiZXhwIjoxNjMwNDk3ODk2fQ.tMRjeMP3Pohz6kIMf59J2gBqO0oaxMWhvR_8jZ0ndg8"
        jwt.verify(req.cookies['token'],process.env.SECRET_KEY,(err,decode)=>{
            if(err){
                return userHelper.errorResponse(res,"Invalid Token",err);
            }else{
                req.user = decode;
                next();
            }
            
        })
    }
    else{
        return userHelper.errorResponse(res,'Token Not Found');
    }


    
    //next();
}