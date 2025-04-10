require("dotenv").config({path:"./env"})
import { app } from "./app";
import connectDB from "./db/database";

connectDB()
.then(
    app.listen( process.env.PORT || 7000 , () => {
        console.log(`Server is listening at port : ${process.env.PORT}`)
    })
)
.catch((error) => {
    console.log("MongoDB connection failed !!", error)
})