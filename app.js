const express = require('express');
const connectDB = require('./db/connection');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const port = process.env.PORT || 3000 ;
const app = express();

//all required middleware

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.get('/',(req,res)=>res.send('<h1>server is running...</h1>'));

app.use('/api/auth',authRouter);

connectDB();
app.listen(port,()=>{
    console.log('server runnning...');
});
