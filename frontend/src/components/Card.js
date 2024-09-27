import React from 'react'
import { formatDate } from '../utils'
const Card = ({blog,onClick}) => {
  return (
     <div className='flex mb-7' style={{cursor:"pointer"}} onClick={onClick}>
     <img src={`http://localhost:3004/${blog.imgPath}`} alt='Blog Related' className='w-1/3 h-56 lg:h-80 2xl:h-96 object-cover'/>
     <div className='flex flex-col w-3/5 ml-8 2xl:p-3'>
     <h2 className='font-bold text-2xl lg:text-3xl 2xl:text-4xl mb-3 md:mb-5 lg:mb-6'>{blog.title}</h2>
     <div className='flex mb-3 md:mb-5 lg:mb-7'>
         <p className='text-base xl:text-lg font-bold mr-2'>{blog.author_name}</p>
         <p className='text-base xl:text-lg'>{formatDate(blog.createdAt)}</p>
     </div>
     <p className='text-lg lg:text-xl 2xl:text-2xl line-clamp-3 lg:line-clamp-6 2xl:line-clamp-none'>{blog.summary}</p>
     </div>
     
 </div>
  )
}

export default Card