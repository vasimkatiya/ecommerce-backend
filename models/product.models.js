const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: {
    type: String, 
    required: true,
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  },
  cat_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "category",
  },
  price: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },

  images: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length >= 1 && value.length <= 4;
      },
      message: "You must upload between 1 and 4 images",
    },
  },

}, { timestamps: true });

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;