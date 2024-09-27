import express from "express"
import blogRouter from "./routes/blog.js"
import staticRouter from "./routes/static.js"
import connect from "./connection.js"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { getCurrentUser } from "./middlewares/authAccess.js"
dotenv.config();

const app = express();
// connecting with db
connect(process.env.MONGO_URI)

// middlewares
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true 
  }))
app.use('/uploads',express.static('uploads'))
app.use(express.json());

//routes
// authenticates access to home page
app.get("/api/current-user",getCurrentUser,(req,res)=>{
  const user = req.user;
  if(!user){
    return res.status(400).end("user not found")
  }
  console.log(user);
  return res.status(200).json({user});
})
app.use("/",staticRouter)
app.use("/api/blog",blogRouter)

app.listen(3004,()=>console.log("Server started"))
