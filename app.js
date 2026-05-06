const express = require('express');
const connectDB = require('./db/connection');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const productRouter = require('./routes/product.routes');
const categoryRouter = require('./routes/category.routes');
const cartRouter = require('./routes/cart.routes');
require('dotenv').config();

const port = process.env.PORT || 3000 ;
const app = express();

//all required middleware

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.get('/',(req,res)=>res.send('<h1>server is running...</h1>'));

app.use('/api/auth',authRouter);
app.use('/api/product',productRouter);
app.use('/api/category',categoryRouter);
app.use('/api/cart',cartRouter)
connectDB();
app.listen(port,()=>{
    console.log('server runnning...');
});
