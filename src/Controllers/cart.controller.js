import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Cart } from "../Models/cart.model.js";

// const addToCart = asyncHandler( async( req, res) => {
//     const { userId } = req.params;
//     const { products, totalPrice } = req.body;

//     const existedCart = await Cart.findById( userId )
    
// })