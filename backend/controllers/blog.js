import Blog from "../models/blog.js";

export const getAllBlogs = async(req,res)=>{
        try{
            const blogs = await Blog.find({})
            if(blogs){
                return res.status(200).json(blogs)
            }
            else{
                return res.status(200).end("no blogs found")
            }
        }
        catch(err){
            return res.status(500).end(err.message)
        }
}
const handleMissingFields = (title,summary,content,file,postRequest)=>{
    let missingFields = [];
    if(!title)missingFields.push("title")
    if(!summary)missingFields.push("summary")
    if(!content)missingFields.push("content")
    if(!file && postRequest)missingFields.push("Image File")
    return missingFields;
}
export const createBlog = async(req,res)=>{
        const {title,summary,content} = req.body;
        const missingFields = handleMissingFields(title,summary,content,req.file,true);
        if(missingFields.length > 0){
            return res.status(400).end(`Error : Missing Fields ${missingFields.join(",")}`)
        }
        try{
            const result = await Blog.create({
                imgPath:req.file? req.file.path : null,
                authorId:req.user._id,
                author_name:req.user.username,
                title,
                content,
                summary
            })
            if(result){
                return res.status(200).end("made a new blog")
            }
            return res.status(400).end("error : making a new blog")
        }
        catch(err){
            return res.status(500).end(err.message)
        }
}
export const updateBlog = async(req,res)=>{
        const blogId = req.params.id;
        const {title,summary,content} = req.body;
        const missingFields = handleMissingFields(title,summary,content,req.file,false);
        if(missingFields.length > 0){
            return res.status(400).end(`Error : Missing Fields ${missingFields.join(",")}`)
        }
        try{
            const result = await Blog.findByIdAndUpdate(blogId,{
                imgPath:req.file? req.file.path : req.body.existingImgPath,
                title,
                content,
                summary
            })
            if(result){
                return res.status(200).end("updated the blog successfully")
            }
            return res.status(400).end("Error updating the blog")
        }catch(err){
            return res.status(500).end(err.message)
        }
}
export const getBlogById = async(req,res)=>{
        const blog = await Blog.findById({_id:req.params.id})
        if(!blog){
            return res.status(404).end("Blog Not found")
        }else{
            return res.status(200).json(blog)
        }
}