import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { authRouter } from "./router/auth.router.js"
import { ToDoListRouter } from "./router/ToDoList.router.js"





const app =express()
dotenv.config()


app.use(express.json())
app.use(cors())



const PORT=process.env.PORT || 3000
app.get("/", (req, res) => {
  res.send("✅ ToDoList API is working!");
});

///// ROUTER
app.use("/",authRouter)
app.use("/",ToDoListRouter)



app.listen(PORT,()=>{
    console.log("Server is running:"+PORT);
})