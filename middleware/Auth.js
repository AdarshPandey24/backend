import jwt from 'jsonwebtoken'
import User from '../models/User.model.js';

async function auth(req,res,next){
    let token
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
        try {
            token = authorization.split(' ')[1]
            const {UserID} = jwt.verify(token,process.env.JWT_SECRET_KEY);
            const user = await User.findById(UserID);
            req.user = user;
        } catch (error) {
            res.status(401).send({
                error:"Please authenticate"
            })
        }
    }
    if(!token)
    {
        res.send({
            "status":"failed",
            "message":"Unauthorised token"  
        })
    }
    next()
} 

export default auth