const mongoose = require('mongoose');

const DB1 = "mongodb+srv://astaprasad:Hargram3950@cluster0.dqabi.mongodb.net/spakassignment?retryWrites=true&w=majority"
const DB = "mongodb+srv://admin:admin@cluster0.xkcjuue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
