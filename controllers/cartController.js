const cartModel = require("../models/cart.model");

exports.addToCartController = async (req,res) =>{
    try {
     
        const product_id = req.params?.id;
        const userId = req.user?.id;

        if(!product_id || !userId)
        {
            return res.status(400).json({
                message:'product_id or user_id is required.'
            })
        }

        const newCart = await cartModel.create({
            product_id:product_id,
            user_id:userId
        });

        res.status(201).json({
            message:'item added sucessfully',
            newCart
        })
        
    } catch (err) {
        return res.status(500).json({
            message:'internal server error.',
        });
    }
}

exports.removeFromCartController = async (req,res)=>{
    try {

        const product_id = req.params?.id;
        const user_id = req.user?.id;
        
        const removeCart = await cartModel.deleteOne({
            product_id:product_id,
            user_id:user_id
        });

        res.status(200).json({
            message:'item removed successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message:'internal server error'
        })
    }
}


exports.getCartItemsController = async (req,res) =>{
    try {
        
        const userId = req.user?.id;

        const carts = await cartModel.find({
            user_id:userId
        });

        if(carts == 0)
        {
            return res.status(400).json({
                message:'empty cart',
                carts : []
            })
        }

        res.status(200).json({
            message:'item get sucessfully',
            carts
        })

    } catch (err) {
        return res.status(500).json({
            message:'internal server error'
        })
    }
}