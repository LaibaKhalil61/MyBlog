import jwt from "jsonwebtoken"

const secretKey = process.env.SECRET_KEY || "367899gvgcvdj"
export const getToken = (user)=>{
    return jwt.sign({
        userId: user._id
    },secretKey)
}
export const verifyToken = (token)=>{
    return jwt.verify(token,secretKey);
}
