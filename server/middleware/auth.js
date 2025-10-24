import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // Verify token
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        // Find user in DB
        const user = await User.findById(decodedToken.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Attach user to request and continue
        req.user = user;
        next();

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};