import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Product } from "../Models/product.model.js";

const createProduct = asyncHandler(async(req, res) => {

    const { name, price, category } = req.body;
    if(!name?.trim() || price === undefined ||!category?.trim() ){
        throw new ApiError(400, "All fields are required!")
    }

    const existedProduct = await Product.findOne({
        $and:[ { name }, { category }]
    })
    if( existedProduct ){
        throw new ApiError(409, "Product already exists!")
    }

    const newProduct = await Product.create({
        name, price, category
    })

    const createdProduct = await Product.findById( newProduct._id )
    if( !createdProduct ){
        throw new ApiError(500, "Some error occured while creating the product!")
    }

    return res.status(201).json(
        new ApiResponse(201, createdProduct, "Product created successfully!")
    )
});

const getProductById = asyncHandler(async(req, res) => {

    const { productId } = req.params;
    if( !productId?.trim() ){
        throw new ApiError(400, "ProductId is not provided!")
    }
    
    const existedProduct = await Product.findById( productId ).lean()
    if( !existedProduct ){
        throw new ApiError(404, "Product not found!")
    }
    
    return res.status(200).json(                                                                    
        new ApiResponse(200, existedProduct, "Product sent successfully!")
    )
});

const getProductByCategory = asyncHandler(async(req, res) => {

    const { category } = req.query;
    if( !category?.trim() ){
        throw new ApiError(400, "Category name is required!")
    }

    const existedProduct = await Product.find({ category })
    if( !existedProduct.length ){
        throw new ApiError(404, "No product found!")
    }

    return res.status(200).json(
        new ApiResponse(200, existedProduct, "Products sent successfully!")
    )
});

const updateProduct = asyncHandler(async(req, res) => {
    const { productId } = req.params; 
    const { name, price, category } = req.body;

    if( !productId?.trim() ){
        throw new ApiError(400, "ProductId is required!")
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: { name, price, category }},
        { new: true }
    )
    if( !updatedProduct ){
        throw new ApiError(500, "Error occured while updating the product!")
    }

    return res.status(200).json(
        new ApiResponse(200, updatedProduct, "Product updated successfully!")
    )
});

const deleteProduct = asyncHandler(async(req, res) => {

    const { productId } = req.params;
    if( !productId?.trim() ){
        throw new ApiError(400, "ProductId is required!")
    }

    const isDeleted = await Product.findByIdAndDelete( productId )
    if( !isDeleted ){
        throw new ApiError(500, "Some error occured while deleting the product!")
    }
    
    return res.status(200).json(
        new ApiResponse(200, isDeleted, "Product deleted successfully!")
    )
});

export { createProduct, getProductById, getProductByCategory, updateProduct, deleteProduct } 