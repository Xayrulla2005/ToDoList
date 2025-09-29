import {v4} from "uuid"
import { read_file,write_file } from "../utils/file_meneger.js"
import { message } from "telegraf/filters"

///// GET

const get_product= async (req,res)=>{
try{
    const product=read_file("ToDoList.json")
    res.status(200).json({
        product
    })

}catch(error){
  console.log(error.message);
}
}

///// GET_ONE
const get_one_product= async (req,res)=>{
try{
    const product=read_file("ToDoList.json")
    const { id } = req.params
    const founded=product.find((item)=> item.id===id)

    if (!founded) {
        res.status(401).json({
            message:"Text not found"
        })
    }
    res.status(200).json({
        founded
    })

}catch(error){
  console.log(error.message);
}
}

///// POST
const post_product= async (req,res)=>{
try{
    const product=read_file("ToDoList.json")
    const { ToDo, time } = req.body;
   
    product.push({
        id:v4(),
        ToDo,
        time,
        completed: false 
    })
    write_file("ToDoList.json",product)
    res.status(201).json({
        message:"Added list"
    })

}catch(error){
  console.log(error.message);
}
}

///// UPDATE
const update_product= async (req,res)=>{
try{
    const product=read_file("ToDoList.json")
    const founded=product.find((item)=> item.id===id)
    const { id } = req.params;


    if (!founded) {
        res.status(401).json({
            message:"List not found"
        })
    }
    founded.forEach((item) => {
        item.ToDo?ToDo:item.ToDo;
        item.time?time:item.time;
        item.completed=completed!==undefined?completed:item.completed
    });
    write_file("ToDoList.json",founded)
    res.status(200).json({
        product
    })

}catch(error){
  console.log(error.message);
}
}

///// DELETE
const delete_product= async (req,res)=>{
try{
    const product=read_file("ToDoList.json")
    const founded=product.find((item)=> item.id===id)
    const { id } = req.params;


    if (!founded) {
        res.status(401).json({
            message:"List not found"
        })
    }
    founded.forEach((item,idx) => {
       if (item.id===id) {
        product.splice(idx,1)
       }
    });


write_file("ToDoList.json",founded)


    res.status(200).json({
        product
    })

}catch(error){
  console.log(error.message);
}
}

///// TOGGLE COMPLETE
const toggle_complete = async (req, res) => {
  try {
    const product = read_file("ToDoList.json")
    const { id } = req.params;

    const founded = product.find((item) => item.id === id);

    if (!founded) {
      return res.status(404).json({ message: "Task not found" });
    }

    
    founded.completed = !founded.completed;

    write_file("ToDoList.json", product);

    res.status(200).json({
      message: "Task updated",
      task: founded
    });

  } catch (error) {
    console.log(error.message);
  }
}


///// REMOVE CHECKED
const remove_checked = async (req, res) => {
  try {
    const product = read_file("ToDoList.json");

    const filtered = product.filter((item) => !item.completed);

    write_file("ToDoList.json", filtered);

    res.status(200).json({
      message: "Checked tasks removed",
      product: filtered
    });

  } catch (error) {
    console.log(error.message);
  }
}




export{
    get_product,
    get_one_product,
    post_product,
    update_product,
    delete_product,
    toggle_complete,
    remove_checked
}