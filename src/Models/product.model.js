import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            require: true
        },
        description:{
            type: String,
            // require: true
        },
        category:{
            type: String
        },
        price:{
            type: Number,
            require: true
        },
        ratings:{
            type: Number,
        },
        // images:{}, 
    }, { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema)