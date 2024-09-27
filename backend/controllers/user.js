import User from "../models/user.js"
import bcrypt from "bcrypt"
import {getToken} from "../services/authentication.js"

const hashPassword = async(password)=>{
    try{
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(password,salt)
    }catch(err){
        console.log("error while hashing the password")
        throw new Error("Hashing failed")
    }
}
export const addNewUser = async(req,res)=>{
    const {email,username,password} = req.body;
    if(!username)return res.status(400).end("Enter username")
    if(!password || password.length<8)return res.status(400).end("Enter Password min length is >=8")
    const registeredUser = await User.find({email:email})
    if(registeredUser.length > 0){
        return res.status(400).end("Email already in use")
    }
    try{
        const hashedPassword =await hashPassword(password);
        const result = await User.create({
            username:username,
            email:email,
            password:hashedPassword
        })
        if(result)
            return res.status(200).end("Sign up successful")
        else
        return res.status(400).end("Could not register you ")
    }catch(err){
        return res.status(500).end(err.message || "Internal Server Error")
    }
}
export const authenticateUser = async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).end("Email not registered")
        }
        const checkPassword = await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(400).end("Incorrect Password")
        }
        const token = getToken(user)
        try{
            res.cookie("uuid",token,{
                httpOnly:true,
                sameSite:"None",
                expires:new Date(Date.now()+120000),
            })
            return res.status(200).end("Logged in successfully")
        }catch(err){
            return res.status(400).end("You are not registered")
        }
    }catch(err){
        return res.status(400).end(err.message)
    }
}
export const removeToken = (req,res)=>{
    res.clearCookie("uuid");
    return res.status(200).end("Logged out successfully");
}
