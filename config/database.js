const mongoose = require('mongoose');


try{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
        },
        (err,result)=>{
            if(!err){
                console.log('Database Connected');
            }
    });
}catch(err){
    console.log('Database not connected')
}
