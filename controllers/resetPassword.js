import bcrypt from 'bcrypt'
import User from '../models/User.model.js';

async function resetPassword(req,res){
    const {password}=req.body
    if(password)
    {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        const user = await User.findByIdAndUpdate({_id:req.user._id},{password:hashPassword})
        if(user)
        {
            res.send({
                "status": "success",
                "message": "Password Changed Successfully"
            })
        }
    }
    else{
        res.send({
            "status": "failed",
            "message":"All fields are required"
        })
    }
}

export default resetPassword