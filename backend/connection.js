import mongoose from "mongoose";
const connect = async(url)=>{
    return await mongoose
    .connect(url)
    .then(()=>console.log("Connected to DB successfully"))
    .catch(()=>console.log("Error establishing connection"))
}
export default connect