import jwt from "jsonwebtoken";


const verifyToken= (req,res,next)=>{
    //get token from the request headers
    const token=req.headers.authorization?.split("")[1];
    if(!token){
        return res.status(401).json({message:"Access denied, No token provided."})
    }
    try{
        const user=json.verify(token,JWT_SECRET);
        req.user=user;
        next();
    }catch(error){
        return res.status(401).json({message:"Invalid token"});
    }
}

export default verifyToken;