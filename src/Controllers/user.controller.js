import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../Models/user.model.js";

const registerUser = asyncHandler( async( req, res) => {
    const { userName, phone, password } = req.body;

    if([ userName, phone, password ].some(field => field.trim() == "")){
        throw new ApiError(400, "All fields are required!")
    }

    const existedUser = await User.findOne({
        $or:[ { userName }, { phone }]
    })

    if( existedUser ){
        throw new ApiError(409, "User already exists!")
    }

    const createUser = await User.create({
        userName,
        phone,
        password
    })

    const newUser = await User.findById( createUser._id )

    if( !newUser ){
        throw new ApiError(501, "Some error occured while registering the user!")
    }

    return res.status(201).json(
        new ApiResponse(201, newUser, "User Registered Successfully!")
    )
});

const loginUser = asyncHandler( async( req, res) => {
    const { phone, password } = req.body;

    if([ phone, password ].some(field => field.trim() == "")){
        throw new ApiError(400, "All fields are required!")
    }

    const existedUser = await User.findOne({
        $and: [ { phone } ]
    })

    if( !existedUser || existedUser.password !== password ){
        throw new ApiError(401, "Invalid phone or password!")
    }

    return res.status(200).json(
        new ApiResponse(200, existedUser, "User Loged In Successfully!")
    )
});

const getUserProfile = asyncHandler( async( req, res ) => {
    const { userId } = req.params;
    
    if( !userId ){
        throw new ApiError(400, "userId is not provided!")
    }
    
    const existedUser = await User.findById( userId )
    
    if( !existedUser ){
        throw new ApiError(404, "user not found!")
    }
    
    return res.status(200).json(
        new ApiResponse(200, existedUser, "User profile sent successfully!")
    )
});

const getAllUsers = asyncHandler( async( req, res ) => {
    const allUsers = await User.find()

    if( !allUsers || allUsers.length === 0 ){   
        throw new ApiError(409, "No user found!")
    }

    return res.status(200).json(
        new ApiResponse(200, "All users sent successfully!")
    )
});

const logoutUser = asyncHandler( async( req, res ) => {});

const updateUserProfile = asyncHandler( async( req, res ) => {
    const { userId } = req.params;
    const { userName, phone, email, address } = req.body;

    const updated = await User.findByIdAndUpdate(
        userId,
        { $set: { userName, phone, email, address}},
        { new: true }
    )

    if( !updated){
        throw new ApiError(404, "User not found!")
    }

    return res.status(200).json(
        new ApiResponse(200, updated, "User profile updated successfully!")
    )
});
const changePassword = asyncHandler( async( req, res ) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    if( !userId || !oldPassword || !newPassword ){
        throw new ApiError(400, "All fields are required!")
    }

    const existedUser = await User.findById( userId )

    if( !existedUser ){
        throw new ApiError(409, "User not found!")
    }

    if( existedUser.password !== oldPassword){
        throw new ApiError(404, "Incorrect Password!")
    }

    existedUser.password = newPassword;
    await existedUser.save();

    return res.status(200).json(
        new ApiResponse(200, existedUser, "Password changed successfully!")
    )
});

const forgotPassword = asyncHandler( async( req, res ) => {});
const resetPassword = asyncHandler( async( req, res ) => {});

export { registerUser, loginUser, getUserProfile, getAllUsers, updateUserProfile, changePassword }