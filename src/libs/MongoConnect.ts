import mongoose from "mongoose"

export const connectToMongoDB= async()=>{
    if(mongoose.connection.readyState ===1)
        {
            return mongoose.connection.asPromise();
        }

    return mongoose.connect(process.env.MONGO_URI!)
}