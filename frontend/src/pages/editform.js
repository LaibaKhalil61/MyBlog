import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import useFetchBlogData from '../data/fetchBlogData';
import { formats,modules } from '../utils';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context';
const Editform = () => {

    const blogId = useParams().id;
    const [loading,setLoading] = useState(true);
    const [title,setTitle] = useState("")
    const [summary,setSummary] = useState("")
    const [content,setContent] = useState("")
    const [file,setFile] = useState();
    const navigate = useNavigate();
    const blogData = useFetchBlogData();
    const {setIsLoggedIn} = useContext(AuthContext)

    // Setting the initial form data
    useEffect(()=>{
        setTitle(blogData.title);
        setSummary(blogData.summary)
        setContent(blogData.content)
        setLoading(false);
    },[blogData])

    // Handling post updation
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("title",title);
        formData.append("summary",summary);
        formData.append("content",content);
        if(file){
            formData.append("file",file);
        }
        else{
            formData.append("existingImgPath",blogData.imgPath);
        }
        try{
            const result = await axios.patch(`http://localhost:3004/api/blog/${blogId}`,formData,{
                headers:{"Content-Type":'multipart/form-data'},
                withCredentials:true
            })
            if(result.status === 200){
                alert("Post updated successfully")
                navigate(`/blog/${blogId}`)
            }
        }catch(err){
            if(err.response && err.response.status === 401){
                setIsLoggedIn(false);
                localStorage.removeItem("isLoggedIn");
                alert("Your session has expired.Login again")
                navigate("/login")
                }
                else{
                alert(err.response ? err.response.message : err.message)
                }
        }
    }

    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        const validTypes = ["image/jpeg","image/png","image/gif","image/webp"];
        if(file){
            if(validTypes.includes(file.type)){
                setFile(file);
            }
            else{
                alert("please give image with format [JPEG , GIF , PNG ]");
            }
        }
    }
  return (
    <div className='px-5 lg:px-16 xl:px-32 2xl:px-52'>
        {!loading  &&  
            <form className='flex flex-col' onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" 
            placeholder='Title'
            maxLength={50}
            className='mb-5 py-2 px-3 rounded-sm'
            style={{border:"1px solid #D1D5DB"}}
            required
            value={title}
            onChange={(e)=>setTitle(e.target.value)} />

            <input type="text"
            placeholder="Summary"
            maxLength={150}
            className='mb-5 py-2 px-3 rounded-sm'
            style={{border:"1px solid #D1D5DB"}}
            required
            value={summary}
            onChange={(e)=>setSummary(e.target.value)}/>

            <input 
            type='file' 
            name="imgFile"
            className='mb-5 py-2 px-3 rounded-sm' 
            onChange={(e)=>handleFileChange(e)}
            style={{border:"1px solid #D1D5DB"}}/>

            <ReactQuill 
            theme="snow" 
            value={content} 
            formats={formats}
            modules={modules}
            required
            className='mb-5'
            onChange={setContent}/>

            <button type='submit'
            className='py-2 rounded-sm text-white' 
            style={{backgroundColor:"#374151",cursor:"pointer"}}>Update the Post</button>
            </form>}
        
    </div>
  )
}

export default Editform