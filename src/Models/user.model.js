import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName:{
            type: String,
            require: true
        },
        phone:{
            type: Number,
            type: true
        },
        email:{
            type: String,
        },
        password:{
            type: String,
            require: true
        },
        DOB:{
            type: String
        },
        address:{
            type: String,
            // require: true
        },
    }, { timestamps : true }
);

export const User = mongoose.model("User", userSchema)