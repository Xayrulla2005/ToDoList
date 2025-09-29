import { register,login } from "../controller/auth.controll.js";
import { Router } from "express";


const authRouter=Router()

authRouter.post("/register",register)
authRouter.post("/login",login)

export{
    authRouter
}