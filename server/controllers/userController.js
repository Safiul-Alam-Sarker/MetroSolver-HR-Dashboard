import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import imagekit from "../config/imagekit.js";
import fs from "fs";

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User
export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNo, password, confirmPassword } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !phoneNo || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            });
        }

        // Create user (password will be hashed by pre-save middleware)
        const user = await User.create({
            firstName,
            lastName,
            email,
            phoneNo,
            password
        });

        const token = generateToken(user._id);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNo: user.phoneNo,
                profileImageUrl: user.profileImageUrl
            },
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user._id);

        return res.json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNo: user.phoneNo,
                profileImageUrl: user.profileImageUrl
            },
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get User Data
export const getUserData = async (req, res) => {
    try {
        res.json({
            success: true,
            user: req.user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update User Profile
// Update User Profile - BACKEND ONLY
export const updateUserProfile = async (req, res) => {
    try {
        console.log("Update profile request received:", req.body);
        console.log("Uploaded file:", req.file);

        const { _id: userId } = req.user;
        const { firstName, lastName, phoneNo, location, Designation, bio } = req.body;

        // Create update data object with only provided fields
        const updateData = {};

        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (phoneNo !== undefined) updateData.phoneNo = phoneNo;
        if (location !== undefined) updateData.location = location;
        if (Designation !== undefined) updateData.Designatin = Designation;
        if (bio !== undefined) updateData.bio = bio;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Handle profile image upload
        if (req.file) {
            console.log("Processing profile image upload...");

            // Delete old image from ImageKit if exists
            if (user.profileFileId) {
                try {
                    await imagekit.deleteFile(user.profileFileId);
                    console.log("Old profile image deleted");
                } catch (error) {
                    console.log("Error deleting old profile image:", error.message);
                }
            }

            // Upload new image to ImageKit
            const buffer = fs.readFileSync(req.file.path);
            const response = await imagekit.upload({
                file: buffer,
                fileName: req.file.originalname,
                folder: "profiles"
            });

            updateData.profileImageUrl = response.url;
            updateData.profileFileId = response.fileId;

            // Remove temporary file
            fs.unlinkSync(req.file.path);
            console.log("New profile image uploaded:", response.url);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select("-password");

        console.log("Profile updated successfully for user:", userId);

        res.json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Error in updateUserProfile:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Users (for member selection)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("firstName lastName email profileImageUrl")
            .sort({ firstName: 1 });

        res.json({
            success: true,
            users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};