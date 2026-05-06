const categoryModel = require("../models/category.models");


exports.createCategoryController = async (req,res) =>{
    try {
        
        const {name} = req?.body;

        if(!name)
        {
            return res.status(400).json({
                message:'name is required.'
            })
        }

        const newCategory = await categoryModel.create({
            name
        });

        res.status(201).json({
            message:'category created.',
            newCategory
        });

    } catch (err) {
        return res.status(500).json({
            message:'internal server error.'
        })
    }
}


exports.getCategoryController = async (req,res) =>{
    try {

        const categorys = await categoryModel.find();
        
        if(!category)
        {
            return res.status(404).json({
                message:'categories not found.',
            });
        }

        res.status(200).json({
            message:'categories fetched.',
            categorys,
        })
        
    } catch (err) {
        return res.status(500).json({
            message:'internal server error.'
        })
    }
}