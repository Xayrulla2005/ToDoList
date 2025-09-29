import { v4 } from "uuid"
import dotenv from "dotenv"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { read_file, write_file } from "../utils/file_meneger.js"
import { message } from "telegraf/filters"



///// REGISTER
const register = async (req, res) => {
    try {
        const data = read_file("auth.json")
        const { username, email, password } = req.body
        const founded = data.find((item) => item.email === email)

        if (founded) {
            res.status(401).json({
                message: "User alredy exsist"
            })
        }

        const hashPasword = await bcryptjs.hash(password, 12)

        data.push({
            id: v4(),
            username,
            email,
            role: "user",
            password: hashPasword
        })

        write_file("auth.json", data)
        res.status(201).json({
            message: "User registred"
        })

    } catch (error) {
        console.log(error.message);

    }
}



///// LOGIN
const login = async (req, res) => {
    try {
        const data = read_file("auth.json")
        const { email, password } = req.body
        const founded = data.find((item) => item.email === email)

        if (!founded) {
            res.status(401).json({
                message: "User not found"
            })
        }

        const decode = await bcryptjs.compare(password, founded.password)

        if (decode) {
            const payload = { id: founded.id, email: founded.email, role: founded.role }
            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" })
            res.status(200).json({
                message: "Succes",
                token
            })
        } else {
            res.status(401).json({
                message: "Invailed password"
            })
        }



    } catch (error) {
        console.log(error.message);

    }
}


export {
    register,
    login
}