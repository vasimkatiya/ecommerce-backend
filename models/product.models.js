const { default: mongoose } = require("mongoose");


const productSchema  = new mongoose.Schema({
    product_name:{
        typr:String,
        required:true,
    },
    cat_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"category"
    },
    price:{
        type:String,
        required:true,
    },
    stock:{
        type:String,
        required:true
   },
   desc:{
    type:String,
    required:true
   }
},{timestamps:true});

const productModel = mongoose.model("product",productSchema)