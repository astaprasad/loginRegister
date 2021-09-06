const mongoose = require('mongoose');

const DB = "mongodb+srv://astaprasad:Hargram3950@cluster0.dqabi.mongodb.net/spakassignment?retryWrites=true&w=majority"

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
