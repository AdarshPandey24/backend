import express from "express";
import 'dotenv/config';
import morgan from "morgan";
import user from "./Routes/userRoutes.js"
import mongodb from "./models/dbConnection.js"


const app = express();
app.use(express.json())
app.use(morgan('dev'))
mongodb()
app.use('/api/users',user)
app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
})