import React, { useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context'
const Navbar = () => {
    const navigate = useNavigate()
    const handleNavigate = (page) => {
        navigate(page)
    }
    const {isLoggedIn,setIsLoggedIn,userInfo} = useContext(AuthContext);
    const handleLogOut = async()=>{
        const result = await axios.post("http://localhost:3004/api/user/logout",{withCredentials:true});
        if(result.status === 200){
            setIsLoggedIn(false)
            localStorage.removeItem("isLoggedIn")
            handleNavigate("/login")
        }
    }
    useEffect(()=>{
        const valuePresent = localStorage.getItem("isLoggedIn");
        if(valuePresent)
        setIsLoggedIn(valuePresent);
    },[setIsLoggedIn])
    return (
        <div className='flex py-16 px-5 lg:px-16 xl:px-32 2xl:px-52 justify-between'>
            <h2 className='font-bold text-xl lg:text-2xl' onClick={()=>handleNavigate("/")} style={{cursor:"pointer"}}>MyBlog</h2>
            <ul className='flex text-lg lg:text-xl justify-around'>
            {!isLoggedIn? <>
            <li onClick={() => handleNavigate("/login")} style={{cursor:"pointer"}} className='mr-5'>Login</li>
                <li onClick={() => handleNavigate("/signup")} style={{cursor:"pointer"}}>Register</li>
            </>:
                <>
                <li onClick={() => handleNavigate("/newblog")} style={{cursor:"pointer"}} className='mr-5'>Create New Post</li>
                <li onClick={handleLogOut} style={{cursor:"pointer"}}>Logout <sub className='font-bold'>({userInfo?.username})</sub></li></>}
                
            </ul>
        </div>
    )
}

export default Navbar