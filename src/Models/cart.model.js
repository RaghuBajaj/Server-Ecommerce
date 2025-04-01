import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        products:[
            {
                productId:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                quantity:{
                    type: Number,
                    require: true,
                    default: 1
                },
                price:{
                    type: Number,
                    require: true
                }
            },
        ],
        totalPrice:{
            type: Number,
            require: true
        },
    }, { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema)