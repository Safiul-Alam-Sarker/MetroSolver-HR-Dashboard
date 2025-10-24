import express from "express";
import {
    createMeeting,
    getUserMeetings,
    updateMeeting,
    deleteMeeting
} from "../controllers/meetingController.js";
import { protect } from "../middleware/auth.js";

const meetingRoutes = express.Router();

meetingRoutes.post("/schedule", protect, createMeeting);
meetingRoutes.get("/all", protect, getUserMeetings);
meetingRoutes.put("/update/:meetingId", protect, updateMeeting);
meetingRoutes.delete("/delete/:meetingId", protect, deleteMeeting);

export default meetingRoutes;