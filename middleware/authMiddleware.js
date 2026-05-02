const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authHandler = (req,res,next)=>{
    try {
        
        const token = req.cookie.token;

        if(!token){
            return res.status(403).json({
                message:'unauthorize'
            })
        }

        const decoded = jwt.verify(token,process.env.JWT);

        req.user = decoded;

        next();

    } catch (err) {
        return res.status(500).json({
            message:'internal server error'
        })
    }
}

