const mongoose = require('mongoose');

const DB1 = "mongodb+srv://astaprasad:Hargram3950@cluster0.dqabi.mongodb.net/spakassignment?retryWrites=true&w=majority"
const DB = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.2"
    mongoose.connect(DB,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:false

    }).then(()=>{
        console.log('Connection Success');
    }).catch(err=>{
        console.log('Connections Faild  Error:  '+err);
    })
