import React, { useContext, useEffect } from 'react'
import axios from "axios"
import useFetchData from '../data/fetchAllBlogsData.js'
import Card from "../components/Card.js"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context.js'
const Home = () => {
    const navigate = useNavigate();

    // Hook to fetch all blogs from database
    const {data,loading} = useFetchData("http://localhost:3004/api/blog")
    const {isLoggedIn,setUserInfo,setIsLoggedIn} = useContext(AuthContext)

    // TO GET THE CURRENT USER FROM THE DATABASE
    useEffect(()=>{
        const getUser = async()=>{
            try{
                const result= await axios.get("http://localhost:3004/api/current-user",{withCredentials:true});
                if(result.status === 200){
                    setUserInfo(result.data.user);
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
        if(isLoggedIn){
            getUser();
        }
    },[isLoggedIn,setUserInfo,navigate,setIsLoggedIn])

  return (
    <div className='px-5 lg:px-16 xl:px-32 2xl:px-52 text-black'>
        <div>
            {loading ? 
            <>Loading....</> : 
            <div>
            {data.map((blog)=>{
                return(
                    <Card blog={blog} key={blog._id} onClick={()=>navigate(`/blog/${blog._id}`)}/>
                )
            })}
            </div>}
        </div>
    </div>
  )
}

export default Home