//Initialization code
require('dotenv').config({ path: './config/.env'});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routes/users.routes');
const database = require('./config/database');
var cookieParser = require('cookie-parser')
const app = express();

const port = process.env.PORT || 5000;



//Middleware code
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//route code

app.use('/users',userRouter);









//Server creation code
app.listen(port,(err)=>{
    if(err){
        console.log('Something went wrong')
    }
    console.log("Server is started at port "+port);
});