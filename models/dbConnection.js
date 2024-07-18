import mongoose from "mongoose";

async function mongodb(){
    await mongoose.connect(process.env.MONGO_URL)
    console.log('database is connected');
}

export default mongodb