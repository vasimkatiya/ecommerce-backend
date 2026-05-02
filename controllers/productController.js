

exports.addProductController = (req,res)=>{
    try {
        const {name,price,stock} = req.body;
        const file = req.file;

        if(!name || !price || !stock || stock > 0){
            return res.status(400).json({
                message:"all fields are required."
            })
        }

        if(!file)
        {
            return res.status(400).json({
                message:'image is required.'
            });
        }

    } catch (err) {
        return res.status(500).json({
            message:"internal server error."
        })
    }
}