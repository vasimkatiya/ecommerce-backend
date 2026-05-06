const { default: mongoose, model } = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength : 4,
    },
    email : {
        type:String,
        required : true,
        unique:true,
    },
    password : {
        type:String,
        required : true,
        minlength:6,
    },
    role:{
        type:String,
        default:'user'
    }

},{timestamps : true});


const userModel = mongoose.model('user',userSchema);

module.exports = userModel;