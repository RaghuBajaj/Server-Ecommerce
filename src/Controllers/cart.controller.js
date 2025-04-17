import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Cart } from "../Models/cart.model.js";

const addToCart = asyncHandler( async( req, res) => {
    const { userId } = req.query;
    const { /*products, totalPrice,*/ productId } = req.body;

    if( !userId || !productId ){
        throw new ApiError(400, "userId and productId are required!");
    }

    const cart = await Cart.findOne({ userId });
    if( !cart ){

        const newCart = await Cart.create({
            userId,
            products:[{productId,quantity:1}],
            totalPrice: 0,
        })

        if( !newCart ){
            throw new ApiError(500, "Some error occured while creating the cart!")
        }

        return res.status(201).json(
            new ApiResponse(201, newCart, "Cart created,and product added!")
        );
    }

    const product = cart.products.find((item) => item.productId.toString() === productId ); 
    if( !product ){
        const addedProduct = cart.products.push({
            productId,
            quantity: 1
        })
        if( !addedProduct ){
            throw new ApiError(500, "Some error occured while creating new product in the list!")
        }
    }
    else{
        product.quantity += 1 ;
    }
    // cart.totalPrice = totalPrice;
    await cart.save();

    return res.status(200).json(
        new ApiResponse(200, cart, "Cart updated successfully!")
    )
});

const removeFromCart = asyncHandler( async(req, res) => {
    const { userId } = req.query;
    const { /*products, totalPrice,*/ productId } = req.body;

    if( !userId || !productId ){
        throw new ApiError(400, "userId and productId are required!");
    }

    const cart = await Cart.findOne({ userId })
    if( !cart ){
        throw new ApiError(404, "User's cart not fount!")
    }

    const product = cart.products.find((item)=> item.productId.toString() === productId ); 
    if( !product ){
        throw new ApiError(404, "Product not found in cart!")
    }

    if( product.quantity > 1 ){
        product.quantity -= 1 ;
    }else{
        cart.products = cart.products.filter((item)=> item.productId.toString() !== productId );
    }
    // cart.totalPrice = totalPrice;
    await cart.save();

    return res.status(200).json(
        new ApiResponse(200, cart, "Product quantity updated / removed!")
    )
});

const deleteItemFromCart = asyncHandler( async( req, res) => {
    const { userId } = req.params;
    const { /*products, totalPrice,*/ productId } = req.body;

    if( !userId || !productId ){
        throw new ApiError(400, "userId and productId are required!");
    }

    const cart = await Cart.findOne({ userId })
    if( !cart ){
        throw new ApiError(404, "User's cart not found!");
    }

    const product = cart.products.find((item)=> item.productId.toString() === productId ); 
    if( !product ){
        throw new ApiError(404, "Product not found in cart!");
    }

    cart.products = cart.products.filter((item) => item.productId.toString() !== productId );
    // cart.totalPrice = totalPrice;
    await cart.save();

    return res.status(200).json(
        new ApiResponse(200, cart, "Product removed from cart successfully!")
    )
}); 

const getCartByUserId = asyncHandler( async(req, res) => {
    const { userId } = req.query;
    if( !userId?.trim() ){
        throw new ApiError(400, "userId is required!")
    }

    const cart = await Cart.findOne({ userId });
    if( !cart ){
        throw new ApiError(404, "User Cart is not found!");
    }

    res.status(200).json(
        new ApiResponse(200, cart, "Cart fetched successfully!")
    )
});

const getAllCart = asyncHandler( async(req, res) => {
    const cart = await Cart.find();
    if( !cart.length ){
        throw new ApiError(404, "No cart found!");
    }
    
    res.status(200).json(
        new ApiResponse(200, cart, "All carts fetched successfully!")
    )
});

export { addToCart, removeFromCart, deleteItemFromCart, getCartByUserId, getAllCart }