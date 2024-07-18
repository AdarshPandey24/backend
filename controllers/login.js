import User from "../models/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
async function login(req,res){
    const {email,password} = req.body;
    if(email && password) {
        const user = await User.findOne({email});
        
        if(user){

            
                const isMatched = await bcrypt.compare(password,user.password);
                if(isMatched)
                {
                    const token = jwt.sign({ UserID: user._id },process.env.JWT_SECRET_KEY)
                    console.log(token);
                    res.send({ 
                        "status": "success",
                        "message": "Login Successful",
                        "token": token 
                        })
                }
                else {
                    res.send({ 
                        "status": "failed", 
                        "message": "Invalid Password or Email" 
                    })
                }     
        }
        else{
            res.send({
                "status":"failed",
                "message":"User Not Found"
            })
        }
    }
    else{
        res.send({
            "status":"failed",
            "message":"All fields are required"
        })
    }
}

export default login