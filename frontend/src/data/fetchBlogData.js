import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const useFetchBlogData = ()=>{
    const blogId = useParams().id;
    const navigate = useNavigate();
    const [blogData,setBlogData] = useState({});
    useEffect(()=>{
        const fetchBlogData = async()=>{
            try{
                const result = await axios.get(`http://localhost:3004/api/blog/${blogId}`)
                if(result.status === 200){
                    console.log(result.data)
                    setBlogData(result.data)
                }
            }catch(err){
                if(err.response){
                    alert(`Server Error : ${err.response.data}`)
                }
                else{
                    alert(`Network Error : ${err.message}`)
                }
                navigate("/")
            }
        }
        fetchBlogData();
    },[blogId,navigate])
    return blogData
}
export default useFetchBlogData