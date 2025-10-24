import express from "express";
import {
    registerUser,
    loginUser,
    getUserData,
    updateUserProfile,
    getAllUsers
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/data", protect, getUserData);
userRoutes.put("/update", protect, upload.single("profileImage"), updateUserProfile);
userRoutes.get("/all", protect, getAllUsers);

export default userRoutes;