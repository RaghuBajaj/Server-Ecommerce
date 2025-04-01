import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            require: true,
        },
        products: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            },
        ],
        // image:{},
    },{ timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
