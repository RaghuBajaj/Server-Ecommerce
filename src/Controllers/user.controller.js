import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../Models/user.model.js";

const registerUser = asyncHandler(async(req, res) => {
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
        throw new ApiError(500, "Some error occured while registering the user!")
    }

    return res.status(201).json(
        new ApiResponse(201, newUser, "User Registered Successfully!")
    )
});

const loginUser = asyncHandler(async(req, res) => {
    const { phone, password } = req.body;

    if([ phone, password ].some(field => field.trim() == "")){
        throw new ApiError(400, "All fields are required!")
    }

    const existedUser = await User.findOne({ phone })
    if( !existedUser ){
        throw new ApiError(401, "Invalid phone number!")
    }

    const passwordCheck = await existedUser.isPasswordCorrect( password );
    if( !passwordCheck ){
        throw new ApiError(400, "Invalid password!")
    }

    return res.status(200).json(
        new ApiResponse(200, existedUser, "User Logged In Successfully!")
    )
});

const getUserProfile = asyncHandler(async(req, res) => {
    const { userId } = req.params;
    
    if( !userId ){
        throw new ApiError(400, "userId is not provided!")
    }
    
    const existedUser = await User.findById( userId ).lean()
    if( !existedUser ){
        throw new ApiError(404, "user not found!")
    }
    
    return res.status(200).json(
        new ApiResponse(200, existedUser, "User profile sent successfully!")
    )
});

const getAllUsers = asyncHandler(async(req, res) => {
    const allUsers = await User.find().lean()

    if( !allUsers || allUsers.length === 0 ){   
        throw new ApiError(409, "No user found!")
    }

    return res.status(200).json(
        new ApiResponse(200, allUsers, "All users sent successfully!")
    )
});


const updateUserProfile = asyncHandler(async(req, res) => {
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

const changePassword = asyncHandler(async(req, res) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;
    
    if( !userId || !oldPassword || !newPassword ){
        throw new ApiError(400, "All fields are required!")
    }

    const existedUser = await User.findById( userId )
    if( !existedUser ){
        throw new ApiError(404, "User not found!")
    }

    const passwordCheck = await existedUser.isPasswordCorrect( oldPassword );
    if( !passwordCheck ){
        throw new ApiError(404, "Incorrect Password!")
    }
    
    existedUser.password = newPassword;
    await existedUser.save();
    
    return res.status(200).json(
        new ApiResponse(200, existedUser, "Password changed successfully!")
    )
});

const logoutUser = asyncHandler(async(req, res) => {
    throw new ApiError(501, "This feature is under construction")
});
const forgotPassword = asyncHandler(async(req, res) => {
    throw new ApiError(501, "This feature is under construction")
});
const resetPassword = asyncHandler(async(req, res) => {
    throw new ApiError(501, "This feature is under construction")
});

export { registerUser, loginUser, getUserProfile, getAllUsers, updateUserProfile, changePassword }