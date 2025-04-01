import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
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
                    require: true
                },
                price:{
                    type: Number,
                    require: true
                },
            },
        ],
        totalPrice:{
            type: String,
            require: true
        },
        deliveryAddress:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        deliveryStatus:{
            type: String,
            enum: ["Delivered", "Shipped", "Dispached", "Out for delivery", "Pending"],
            default: "Pending"
        },
        paymentStatus:{
            type: String,
            enum: ["Not Done", "Done"],
            default: "Not Done"
        },
    }, { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema)