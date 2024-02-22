const jwt = require("jsonwebtoken");

exports.auth = async(req,res,next)=>{
    try {
        const token = req.cookies.token || req.body.token || req.headers.authorization.replace("Bearer ","");

        if(!token){
            return res.status(401).json({
                success : false,
                message : "Token missing",
            })
        }

        try {
            const decode = jwt.verify(token,"sha256");
            req.user = decode;
        } catch (error) {
            return res
            .status(401)
            .json({ success: false, message: "token is invalid" });
        }
        next();
        
    } catch (error) {
        return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
    }
}