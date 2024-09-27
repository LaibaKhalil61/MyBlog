import React, { useState,useContext } from 'react'
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { formats,modules } from '../utils';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';
const Blogform = () => {
    const [title,setTitle] = useState("")
    const [summary,setSummary] = useState("")
    const [content,setContent] = useState("")
    const [file,setFile] = useState();
    const {setIsLoggedIn} = useContext(AuthContext)
    const navigate = useNavigate();
// To handle new post creation
    const handleSubmit = async(e)=>{
      e.preventDefault();
      const formData = new FormData();
      formData.append("title",title);
      formData.append("summary",summary);
      formData.append("content",content);
      formData.append("file",file);
      try{
        const result = await axios.post("http://localhost:3004/api/blog",formData,{
            headers:{"Content-Type":'multipart/form-data'},
            withCredentials:true
        })
        if(result.status === 200){
            alert("New post created successfully")
            navigate("/")
        }
      }
      catch(err){
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
  // To handle Image file format
    const handleFileChange = (e)=>{
      const file = e.target.files[0];
      const validTypes = ["image/jpeg","image/png","image/gif","image/webp","image/avif"];
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
        <form className='flex flex-col' onSubmit={(e)=>handleSubmit(e)}>
        <input type="text" 
        placeholder='Title'
        maxLength={100}
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
        required
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
        style={{backgroundColor:"#374151",cursor:"pointer"}}>Create a new Post</button>
        </form>
    </div>
  )
}

export default Blogform