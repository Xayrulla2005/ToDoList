import { Router } from "express";
import { delete_product, get_one_product, get_product, post_product, update_product,toggle_complete,remove_checked } from "../controller/ToDoList.controll.js";
import authMiddleware from "../middleware/auth.middleware.js";




const ToDoListRouter=Router()

ToDoListRouter.get("/get_product",get_product)
ToDoListRouter.get("/get_one_product",get_one_product)
ToDoListRouter.post("/post_product",post_product)
ToDoListRouter.put("/update_product/:id",update_product)
ToDoListRouter.delete("/delete_product/:id",delete_product)
ToDoListRouter.patch("/toggle_complete/:id", toggle_complete); 
ToDoListRouter.delete("/remove_checked", remove_checked);

export{
    ToDoListRouter
}