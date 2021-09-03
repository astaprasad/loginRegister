const mongoose = require('mongoose');
const userSchema =  mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    onCreation:{
        type:String,
        default:Date.now()
    }

})

module.exports = mongoose.model('users',userSchema);