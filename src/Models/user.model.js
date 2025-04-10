import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName:{
            type: String,
            require: true
        },
        phone:{
            type: Number,
            require: true
        },
        email:{
            type: String,
        },
        password:{
            type: String,
            require: true
        },
        DOB:{
            type: String
        },
        address:{
            type: String,
            // require: true
        },
    }, { timestamps : true }
);

userSchema.pre("save", async function (next){
    if( !this.isModified("password") ) return next();
    
    this.password = await bcrypt.hash(this.password, 10)
    next()
});

userSchema.methods.isPasswordCorrect = async function( password ){
    return await bcrypt.compare( password, this.password )
};

userSchema.methods.generateAccessToken = async function() {
    return jwt.sign(
        {},
        process,
        {}
    )
};

userSchema.methods.generateRefreshToken = async function() {
    return jwt.sign(
        {},
        process,
        {}
    )
};

export const User = mongoose.model("User", userSchema)