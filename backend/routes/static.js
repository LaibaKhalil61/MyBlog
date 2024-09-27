import express from "express"
import {addNewUser,authenticateUser,removeToken} from "../controllers/user.js"
const router = express.Router()

router.post("/api/user/signup",addNewUser)
router.post("/api/user/login",authenticateUser)
router.post("/api/user/logout",removeToken)

export default router