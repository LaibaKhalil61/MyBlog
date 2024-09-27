import React, { useContext} from 'react'
import { useNavigate} from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
import { AuthContext } from '../context';
import { formatDate } from '../utils';
import useFetchBlogData from '../data/fetchBlogData';
const Blog = () => {
    const {userInfo} = useContext(AuthContext)
    const navigate = useNavigate();
    const blogData = useFetchBlogData();
  return (
    <div className='px-5 lg:px-16 xl:px-32 2xl:px-52'>
    <div className=' flex flex-col items-center'>
        <h2 className='font-bold text-2xl lg:text-3xl 2xl:text-4xl mb-6'>{blogData.title}</h2>
        <p className="text-sm" style={{color:"#D1D5DB"}}>{formatDate(blogData.createdAt)}</p>
        <p className='text-base xl:text-lg font-bold my-3'>by @{blogData.author_name}</p>
        { blogData.authorId === userInfo?._id &&  
        <button 
        className='py-2 w-1/4 rounded-lg text-white my-4 flex items-center justify-center' 
        style={{backgroundColor:"#374151",cursor:"pointer"}}
        onClick={()=>navigate(`/editblog/${blogData._id}`)}
        >
        <FaRegEdit className='mr-3'/>Edit this post</button>}
       
        <img src={`http://localhost:3004/${blogData.imgPath}`} alt='Blog related' className='object-cover object-center w-full h-96 mb-6'/>
    </div>
        <p dangerouslySetInnerHTML={{__html:blogData.content}}></p>
    </div>
  )
}

export default Blog