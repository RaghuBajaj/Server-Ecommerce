import mongoose from "mongoose"
import { DB_NAME } from "../constant"
 
const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("connection instance is:", connection)
    } catch (error) {
        console.log("connection error is :", error)
    }
}

export default connectDB