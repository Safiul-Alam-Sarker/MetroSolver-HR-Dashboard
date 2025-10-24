import express from "express";
import {
    createTask,
    getUserTasks,
    updateTask,
    deleteTask
} from "../controllers/taskController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const taskRoutes = express.Router();

taskRoutes.post("/create", protect, upload.array("files", 5), createTask);
taskRoutes.get("/all", protect, getUserTasks);
taskRoutes.put("/update/:taskId", protect, upload.array("files", 5), updateTask);
taskRoutes.delete("/delete/:taskId", protect, deleteTask);

export default taskRoutes;