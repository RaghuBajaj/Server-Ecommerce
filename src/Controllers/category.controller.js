import { asyncHandler } from "../Utils/asyncHandler";
import { ApiError } from "../Utils/ApiError";
import { ApiResponce } from "../Utils/ApiResponce";
import { Category } from "../Models/category.model";

const createCategory = asyncHandler( async( req, res ) => {
    const { categoryName } = req.body;

    if( !categoryName ){
        throw new ApiError(401, "Category name is required!")
    }

    const isCategoryExists = await Category.findOne({ categoryName })

    if( isCategoryExists ){
        throw new ApiError(402, "This Category already exists!")
    }

    const newCategory = await Category.create({
        categoryName
    })

    const createdCategory = await Category.findById( newCategory._id )

    if( !createdCategory ){
        throw new ApiError(501, "Some error occured while creating a new category!")
    }

    return res.status(200).josn(
        new ApiResponce(201, createdCategory, "Category created successfully!")
    )
});

const getAllCategories = asyncHandler( async( req, res ) => {
    const allCategories = await Category.find()

    if( !allCategories ){
        throw new ApiError(401, "No category found!")
    }

    return res.status(200).json(
        new ApiResponce(201, "Categories sent successfully!")
    )
});

const updateCategory = asyncHandler( async( req, res ) => {})
const deleteCategory = asyncHandler( async( req, res ) => {
    const { categoryName } = req.body;

    if( !categoryName ){
        throw new ApiError(401, "category name is required!")
    }

    const isDeleted = await Category.deleteOne({ categoryName })

    if( !isDeleted ){
        throw new ApiError(501, "Some error occured while deleting the category!")
    }

    return res.status(200).json(
        new ApiResponce(201, isDeleted, "Category deteted successfully!")
    )
});

export { createCategory, getAllCategories, deleteCategory }