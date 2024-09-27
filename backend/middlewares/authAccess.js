import User from "../models/user.js"
import { verifyToken } from "../services/authentication.js";
export const getCurrentUser = async(req,res,next)=>{
    const token = req.cookies?.uuid;
    if(!token){
        return res.status(401).end("Access denied : No token provided")
    }
    const decoded = verifyToken(token);
    if(decoded){
        const user = await User.findOne({_id:decoded.userId});
        if(!user){
            return res.status(401).end("No User found")
        }
        req.user = user;
        next();
    }else{
        res.clearCookie("uuid");
        return res.status(401).end("User not logged in")
    }
}