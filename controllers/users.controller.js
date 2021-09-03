const {body,validationResult, matchedData} = require('express-validator');
const helper = require('../helpers/users.helper');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users.models');
var cookies = require("cookie-parser");

//Register user code
exports.registerUser = [
    //Assign Validation Rules
    body('name').not().isEmpty().trim().escape(),
    body('gender').not().isEmpty().trim().escape(),
    body('contact').not().isEmpty().trim().escape(),
    body('address').not().isEmpty().trim().escape(),
    body('country').not().isEmpty().trim().escape(),
    body('email').not().isEmpty().trim().escape().isEmail(),
    body('password').not().isEmpty().trim().escape(),

     async (req,res)=>{
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const users = ({
            name: req.body.name,
            gender: req.body.gender,
            address: req.body.address,
            country: req.body.country,
            contact: req.body.contact,
            email: req.body.email,
            userType:req.body.userType,
            password: hashPassword 
        });
        const error = validationResult(req);
        //Validation checking code
        if(!error.isEmpty()){
            return helper.errorResponse(res,"Validation Error",error);
        }else{
            userModel.create(users,(err,result)=>{
                if(err){
                    return helper.errorResponse(res,"Data Not Inserted",err);
                }
                else{
                    return helper.successResponse(res,"Data inserted",users)
                }

            });
        }
        
    }
];

//Login function

exports.loginUser = [
    //Initialize validation rules
    body('email').not().isEmpty().trim().escape().isEmail(),
    body('password').not().isEmpty().trim().escape(), 

    (req,res)=>{
        const error = validationResult(req);
        //Checking form validation
        if(!error.isEmpty()){
            return helper.errorResponse(res,"Validation Error",error);
        }else{
        //If form validation success
                userModel.find({email:req.body.email},(error,result)=> {
                    if(result.length == 1){
                        bcrypt.compare(req.body.password,result[0].password,(err,isMatched)=>{
                           if(isMatched){
                               const user = {
                                   email:result[0].email,
                                   username:result[0].username
                               }
                               const token = jwt.sign(user,process.env.SECRET_KEY,{expiresIn:3600});
                               res.cookie('token',token);
                               return helper.successResponse(res,"Login Success",result);
                           } else{
                               return helper.errorResponse(res,"Password not matched",error);
                           }
                        });
                        
                    }else{
                        return helper.errorResponse(res,'User Not Found',error);
                    }
                })
        }
        
}]

// View Alluser list
exports.getAllUsers = (req,res)=>{

    
    userModel.find((error,result)=>{
        if(error){
            return helper.errorResponse(res,"Something Went wrong",error);
        }else{
            console.log(result.length);
            return helper.successResponse(res,"User List",result);
        }
        
    });
    

}

// Search user by name || contact
exports.searchUser = (req,res)=>{
    var key = req.body;
    if(JSON.stringify(key)== '{}'){
        return helper.errorResponse(res,"Key not found");
    }else{
        userModel.find(key,(error,result)=>{
            if(error){
                return helper.errorResponse(res,"Something Went wrong",error);
            }else{
                if(result.length>0){
                    return helper.successResponse(res,"User List",result);
                }else{
                    return helper.errorResponse(res,"Data Not Found");
                } 
            }
        });
    }
        
}

//Logout function
exports.logout = (req,res)=>{
    try{
        res.clearCookie('token');
        return helper.successResponse(res,"Logout Successfully",req.user);
    }catch(err){
        return helper.errorResponse(res,"Something went wrong",err);
    }
}


 