import mongoose from "mongoose"

const schema = new mongoose.Schema({
    imgPath:{
       type:String,
       required:true
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    author_name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
const Blog = mongoose.model("blog",schema)

export default Blog