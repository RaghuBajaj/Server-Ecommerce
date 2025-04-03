import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponce } from "../Utils/ApiResponce.js";
import { User } from "../Models/user.model.js";

const registerUser = asyncHandler( async( req, res) => {
    const { userName, phone, password } = req.body;

    if([ userName, phone, password ].some(field => field.trim() == "")){
        throw new ApiError(401, "All fields are required!")
    }

    const existedUser = await User.findOne({
        $and:[ { userName }, { phone }]
    })

    if( existedUser ){
        throw new ApiError(402, "User already exists!")
    }

    const createUser = await User.Create({
        userName,
        phone,
        password
    })

    const newUser = await User.findById( createUser._id )

    if( !newUser ){
        throw new ApiError(501, "Some error occured while registering the user!")
    }

    return res.status(200).json(
        new ApiResponce(201, newUser, "User Registered Successfully!")
    )
});

const loginUser = asyncHandler( async( req, res) => {
    const { phone, password } = req.body;

    if([ phone, password ].some(field => field.trim() == "")){
        throw new ApiError(401, "All fields are required!")
    }

    const existedUser = await User.findOne({
        $and: [ { phone }, { password }]
    })

    if( !existedUser ){
        throw new ApiError(402, "No such user exist!")
    }

    return res.status(200).json(
        new ApiResponce(201, existedUser, "User Loged In Successfully!")
    )
});

const getUserProfile = asyncHandler( async( req, res ) => {
    const { userId } = req.body;
    
    if( !userId ){
        throw new ApiError(401, "userId is not provided!")
    }
    
    const existedUser = await User.findOne({ userId })
    
    if( !existedUser ){
        throw new ApiError(402, "user not exists!")
    }
    
    return res.status(200).json(
        new ApiResponce(201, existedUser, "User profile sent successfully!")
    )
});

const getAllUsers = asyncHandler( async( req, res ) => {
    const allUsers = await User.find()

    if( !allUsers ){
        throw new ApiError(402, "No user found!")
    }

    return res.status(200).json(
        new ApiResponce(201, "All users sent successfully!")
    )
});

const logoutUser = asyncHandler( async( req, res ) => {});
const updateUserProfile = asyncHandler( async( req, res ) => {});
const changePassword = asyncHandler( async( req, res ) => {});
const forgotPassword = asyncHandler( async( req, res ) => {});
const resetPassword = asyncHandler( async( req, res ) => {});

export { registerUser, loginUser, getUserProfile, getAllUsers }