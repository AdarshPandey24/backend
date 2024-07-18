import User from "../models/User.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
async function register (req,res) {
    const {name,email,password} = req.body;
    const user = await User.findOne({email})
    if(user)
    {
        res.send({
            "status":"failed",
            "message":"email already exist"
        })
    }
    else{
        if(name && email && password)
        {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password,salt);
                const doc = new User({
                    name:name,
                    email:email,
                    password:hashPassword
                })
                const savedData = await doc.save();
                const savedUser = await User.findOne({email})
                const token = jwt.sign({UserID:savedUser._id},process.env.JWT_SECRET_KEY) 
                res.send({
                    "status":"success",
                    "message":"Registration Successfull",
                    "token":token
                })
            } catch (error) {
                res.send({
                    "status":"failed",
                    "message":error
                })
            }
        }
        else{
            res.send({
                "status":"failed",
                "message":"all fields are required"
            })
        }
    }
   
}

export default register;