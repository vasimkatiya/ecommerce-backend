// const { UploadStream } = require("cloudinary");
const productModel = require("../models/product.models");
const { uploadFile } = require("../utils/cloudinary");


exports.addProductController = async (req,res)=>{
    try {
        const {name,price,stock,desc,cat_id} = req.body;
        const user_id = req?.user?.id;



        const files = req.files;

        if(!name || !price || !stock || !user_id){
            return res.status(400).json({
                message:"all fields are required."
            })
        }

        if(!files)
        {
            return res.status(400).json({
                message:'image is required.'
            });
        }

    const imageUrls = [] ;

        for (const file of files) {
            const results = await uploadFile(file.buffer);
            imageUrls.push(results.secure_url);
        }

        const newProduct = await productModel.create({
            product_name:name,
            user_id:user_id,
            price,
            stock,
            desc,
            cat_id,
            images:imageUrls
        });

        res.status(200).json({
            message:'product created. ',
            product:newProduct
        });

    } catch (err) {
        return res.status(500).json({
            message:"internal server error."
        })
    }
}

exports.getProductsController = async (req,res)=>{
    try {
        
        const page = parseInt(req.query?.page) || 1;
        const limit = 10;
        const offset = (page-1) * limit;

        const products = await productModel.find().limit(limit).skip(offset).populate("cat_id");

        if(!products){
            return res.status(404).json({
                message:'products not found.'
            })
        }

        res.status(200).json({
            message:'product fetched',
            products
        })

    } catch (err) {
        return res.status(500).json({
            message:"internal server error."
        })
    }
}

exports.singleProductController = async (req,res) => {
    try {
      
        const id = req?.params?.id;
        
        const product = await productModel.findOne({_id:id}).populate("cat_id");

        if(product == 0)
        {
            return res.status(404).json({
                message:'product not found'
            })
        }

        res.status(200).json({
            message:'product displayed',
            product
        });

    } catch (err) {
        return res.status(500).json({
            message:'internal server error'
        });
    };
}

exports.deleteProductController = async (req,res)=>{
    try {
        const id = req?.params?.id;

        const checkProduct = await productModel.findOne({_id:id});

        if(checkProduct == 0)
        {
            return res.status(400).json({
                message:'product id is invalid'
            });
        }

        const user_id = checkProduct.user_id;
        const deleteProduct = await productModel.deleteOne({
            _id:id,
            user_id:user_id,
        });

        res.status(200).json({
            message:'product deleted.',
        });

    } catch (err) {
        return res.status(500).json({
            message:'internal server error'
        })
    }
}

exports.adminCreateProducts = async (req,res)=>{
    try {
        
        const userId = req.user?.id;

        const products = await productModel.find({
            user_id : userId
        });

        res.status(200).json({
            message:'all added products',
            products
        })

    } catch (err) {
        res.status(500).json({
            message:'internal server error'
        })
    }
}