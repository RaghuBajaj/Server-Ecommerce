import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Product } from "../Models/product.model.js";

const createProduct = asyncHandler( async( req, res ) => {
    const { name, price } = req.body;

    if([ name, price ].some(field => field.trim() == "")){
        throw new ApiError(401, "All fields are required!")
    }

    const existedProduct = await Product.findOne({
        $and:[ { name }, { price }]
    })

    if( existedProduct ){
        throw new ApiError(402, "Product already exists!")
    }

    const newProduct = await Product.create({
        name, price
    })

    const createdProduct = await Product.findById( newProduct._id )

    if( !createdProduct ){
        throw new ApiError(501, "Some error occured while creating the product!")
    }

    return res.status(200).json(
        new ApiResponse(201, createdProduct, "Product created successfully!")
    )
});

const getProductById = asyncHandler( async( req, res ) => {
    const { productId } = req.body;
    
    if( !productId ){
        throw new ApiError(401, "ProductId is not provided!")
    }
    
    const existedProduct = await Product.findById( productId )
    
    if( !existedProduct ){
        throw new ApiError(402, "Product not found!")
    }
    
    return res.status(200).json(                                                                    
        new ApiResponse(201, existedProduct, "Product sent successfully!")
    )
});

const getProductByCategory = asyncHandler( async( req, res ) => {
    const { category } = req.body;

    if( !category ){
        throw new ApiError(401, "Category name is required!")
    }

    const existedProduct = await Product.find({ category })

    if( !existedProduct.length ){
        throw new ApiError(402, "No product found!")
    }

    return res.status(200).json(
        new ApiResponse(201, existedProduct, "Products sent successfully!")
    )
});

const updateProduct = asyncHandler( async( req, res ) => {
    const { productId } = req.param; 
    const { name, price, category } = req.body;

    if( !productId ){
        throw new ApiError(401, "ProductId is required!")
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: { name, price, category }},
        { new: true }
    );

    if( !updatedProduct ){
        throw new ApiError(501, "Error occured while updating the product!")
    }

    return res.status(200).json(
        new ApiResponse(201, updatedProduct, "Product updated successfully!")
    )
})

const deleteProduct = asyncHandler( async( req, res ) => {
    const { productId } = req.params;
    
    if( !productId ){
        throw new ApiError(401, "ProductId is required!")
    }

    const isDeleted = await Product.findByIdAndDelete( productId )
    
    if( !isDeleted ){
        throw new ApiError(501, "Some error occured while deleting the product!")
    }
    
    return res.status(200).json(
        new ApiResponse(201, isDeleted, "Product deleted successfully!")
    )
});

export { createProduct, getProductById, getProductByCategory, updateProduct, deleteProduct } 