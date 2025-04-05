import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Category } from "../Models/category.model.js";

const createCategory = asyncHandler( async( req, res ) => {
    const { categoryName } = req.body;

    if( !categoryName?.trim() ){
        throw new ApiError(400, "Category name is required!")
    }

    const isCategoryExists = await Category.findOne({ categoryName })

    if( isCategoryExists ){
        throw new ApiError(409, "This Category already exists!")
    }

    const newCategory = await Category.create({
        categoryName
    })

    const createdCategory = await Category.findById( newCategory._id )

    if( !createdCategory ){
        throw new ApiError(500, "Some error occured while creating a new category!")
    }

    return res.status(200).josn(
        new ApiResponse(201, createdCategory, "Category created successfully!")
    )
});

const getAllCategories = asyncHandler( async( req, res ) => {
    const allCategories = await Category.find()

    if( !allCategories || allCategories.length == 0 ){
        throw new ApiError(401, "No category found!")
    }

    return res.status(200).json(
        new ApiResponse(200, "Categories fetched successfully!")
    )
});

const updateCategory = asyncHandler( async( req, res ) => {})
const deleteCategory = asyncHandler( async( req, res ) => {
    const { categoryName } = req.body;

    if( !categoryName?.trim() ){
        throw new ApiError(400, "category name is required!")
    }

    const isDeleted = await Category.findByIdAndDelete({ categoryName })

    if( !isDeleted ){
        throw new ApiError(404, "Category not found or already deleted!")
    }

    return res.status(200).json(
        new ApiResponse(200, isDeleted, "Category deteted successfully!")
    )
});

export { createCategory, getAllCategories, deleteCategory }