import Task from "../models/task.js";
import imagekit from "../config/imagekit.js";
import fs from "fs";

// Create Task
export const createTask = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const {
            title,
            description,
            members,
            labels,
            dueDate,
            dueTime,
            group,
            priority
        } = req.body;

        if (!title || !dueDate) {
            return res.status(400).json({
                success: false,
                message: "Title and due date are required"
            });
        }

        const taskData = {
            title,
            description: description || "",
            members: Array.isArray(members) ? members : [],
            labels: Array.isArray(labels) ? labels : [],
            dueDate: new Date(dueDate),
            dueTime: dueTime || "",
            group: group || "",
            priority: priority || "medium",
            createdBy: userId
        };

        // Handle file uploads
        if (req.files && req.files.length > 0) {
            taskData.uploadedFiles = await Promise.all(
                req.files.map(async (file) => {
                    const buffer = fs.readFileSync(file.path);
                    const response = await imagekit.upload({
                        file: buffer,
                        fileName: file.originalname,
                        folder: "tasks"
                    });

                    // Remove temporary file
                    fs.unlinkSync(file.path);

                    return {
                        fileName: file.originalname,
                        fileUrl: response.url,
                        fileId: response.fileId
                    };
                })
            );
        }

        const task = await Task.create(taskData);
        await task.populate('members', 'firstName lastName email profileImageUrl');
        await task.populate('createdBy', 'firstName lastName email profileImageUrl');

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Tasks for User
export const getUserTasks = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { status } = req.query;

        let query = {
            $or: [
                { createdBy: userId },
                { members: userId }
            ]
        };

        if (status) {
            query.status = status;
        }

        const tasks = await Task.find(query)
            .populate('members', 'firstName lastName email profileImageUrl')
            .populate('createdBy', 'firstName lastName email profileImageUrl')
            .sort({ dueDate: 1, createdAt: -1 });

        res.json({
            success: true,
            tasks
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Task
export const updateTask = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { taskId } = req.params;
        const updateData = req.body;

        const task = await Task.findOne({
            _id: taskId,
            $or: [
                { createdBy: userId },
                { members: userId }
            ]
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or access denied"
            });
        }

        // Handle file uploads
        if (req.files && req.files.length > 0) {
            const newFiles = await Promise.all(
                req.files.map(async (file) => {
                    const buffer = fs.readFileSync(file.path);
                    const response = await imagekit.upload({
                        file: buffer,
                        fileName: file.originalname,
                        folder: "tasks"
                    });

                    fs.unlinkSync(file.path);

                    return {
                        fileName: file.originalname,
                        fileUrl: response.url,
                        fileId: response.fileId
                    };
                })
            );

            updateData.uploadedFiles = [...task.uploadedFiles, ...newFiles];
        }

        // Convert dueDate to Date object if provided
        if (updateData.dueDate) {
            updateData.dueDate = new Date(updateData.dueDate);
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            updateData,
            { new: true }
        )
            .populate('members', 'firstName lastName email profileImageUrl')
            .populate('createdBy', 'firstName lastName email profileImageUrl');

        res.json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Task
export const deleteTask = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { taskId } = req.params;

        const task = await Task.findOne({
            _id: taskId,
            createdBy: userId
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or access denied"
            });
        }

        // Delete uploaded files from ImageKit
        if (task.uploadedFiles.length > 0) {
            await Promise.all(
                task.uploadedFiles.map(async (file) => {
                    try {
                        await imagekit.deleteFile(file.fileId);
                    } catch (error) {
                        console.log("Error deleting file:", error.message);
                    }
                })
            );
        }

        await Task.findByIdAndDelete(taskId);

        res.json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};