import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routers/userRoutes.js";
import taskRoutes from "./routers/taskRoutes.js";
import meetingRoutes from "./routers/meetingRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// connect db
connectDB();

app.get("", (req, res) => {
    res.send("Backend Server is Running");
});

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/meeting", meetingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});