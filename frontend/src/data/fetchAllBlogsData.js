import { useEffect, useState } from "react"
import axios from "axios"
const useFetchData = (url)=>{
    const [data,setData] = useState({})
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const fetchData = async()=>{
            const result = await axios.get(url);
            // console.log(result)
            if(result.status === 200)
                {
                    console.log(result.data)
                    setData(result.data);
                    setLoading(false);
                }
            else{
                alert("ERROR : Could not fetch the blogs")
            }
        }
        fetchData();
    },[url])
    return {data,loading}
}
export default useFetchData