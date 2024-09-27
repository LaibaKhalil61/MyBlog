import express from "express"
import { upload } from "../middlewares/uploadImgFIie.js";
import { getCurrentUser } from "../middlewares/authAccess.js";
import { createBlog, getAllBlogs, updateBlog ,getBlogById} from "../controllers/blog.js";
const router = express.Router()


router.route("/")
.get(getAllBlogs)
.post(getCurrentUser,upload.single("file"),createBlog);

router.route("/:id")
.patch(getCurrentUser,upload.single("file"),updateBlog)
.get(getBlogById)

// router.delete("/:id",async(req,res)=>{
//     const blogId = req.params
//     try{
//         await Blog.findByIdAndDelete(blogId)
//         return res.end("deleted a blog")
//     }
//     catch(err){
//         return res.end("error deleting a blog")
//     }
// })
export default router