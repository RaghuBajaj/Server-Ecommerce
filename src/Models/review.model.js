import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        ratings:{
            type: Number,
        },
        comment:{
            type: String,
        },
    }, { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema)