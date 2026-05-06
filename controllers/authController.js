const userModel = require("../models/uesr.models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.registerController = async (req,res)=>{
    try {

        console.log('body : : : ',req.body);
        
        const { name , email , password, role } = req.body;


        if(!name || !email || !password){
            return res.status(400).json({
                message:'all the field required.'
            });
        };

        const exists = await userModel.findOne({
            email:email
        }).select('-password');

        if(exists){
            return res.status(400).json({
                message:'email already exists.',
            });
        };

        const hashPassword = await bcrypt.hash(password,10);

        const newUser = await userModel.create({
            name:name,
            email:email,
            password:hashPassword,
            role:role
        });

        res.json({
            message:'user created successfully.',
            newUser,
        })


    } catch (err) {
        console.error(err);
        res.status(500).json({
            message:'internal server error'
        })
    }
}

exports.loginController = async (req,res)=>{
    try {

        const {email , password} = req.body;

        if(!email || !password)
        {
            return res.status(400).json({
                message:'all fields are required.',
            });
        };

        const user = await userModel.findOne({
            email
        });

        if(!user)
        {
            return res.status(404).json({
                message:'user not found'
            });
        };

        const ogPassword = await bcrypt.compare(password,user.password);

        if(!ogPassword)
        {
            return res.status(400).json({
                message:'password is incorrect.'
            });
        }
    
        const token = jwt.sign({id:user._id},process.env.JWT);

        res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
        });

        res.status(200).json({
            message:'user logged in successfully.',
            token,
            user,
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message:'internal server error'
        })
    }
}