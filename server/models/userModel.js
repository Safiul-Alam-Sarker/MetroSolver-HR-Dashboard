import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNo: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        default: ""
    },
    profileFileId: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    Designatin: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: "",
        maxlength: 500 // Optional: limit bio length
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;