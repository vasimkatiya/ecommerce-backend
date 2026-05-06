

exports.isAdmin = (req,res,next)=>{
    try {
        
        if(req?.user?.role == "admin"){
            return next();
        }

        return res.status(403).json({
            message:'only admin can access this route'
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message:"internal server error"
        })
    }
}