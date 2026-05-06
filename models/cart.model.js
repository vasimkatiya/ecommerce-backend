const { default: mongoose } = require("mongoose");

const cartSchema = new mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps:true});

const cartModel = mongoose.model('cart',cartSchema);

module.exports = cartModel;