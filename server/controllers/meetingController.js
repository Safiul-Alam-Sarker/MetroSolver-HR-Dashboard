import Meeting from "../models/meeting.js";

// Create Meeting
export const createMeeting = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const {
            title,
            members,
            dueDate,
            startTime,
            endTime,
            conversationType,
            platform,
            meetingLink,
            description
        } = req.body;

        if (!title || !dueDate || !startTime || !endTime || !platform) {
            return res.status(400).json({
                success: false,
                message: "Title, date, time, and platform are required"
            });
        }

        const meeting = await Meeting.create({
            title,
            organizer: userId,
            members: Array.isArray(members) ? members : [],
            dueDate: new Date(dueDate),
            startTime,
            endTime,
            conversationType: conversationType || "video",
            platform,
            meetingLink: meetingLink || "",
            description: description || ""
        });

        await meeting.populate('organizer', 'firstName lastName email profileImageUrl');
        await meeting.populate('members', 'firstName lastName email profileImageUrl');

        res.status(201).json({
            success: true,
            message: "Meeting scheduled successfully",
            meeting
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get User Meetings
export const getUserMeetings = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { status } = req.query;

        let query = {
            $or: [
                { organizer: userId },
                { members: userId }
            ]
        };

        if (status) {
            query.status = status;
        }

        const meetings = await Meeting.find(query)
            .populate('organizer', 'firstName lastName email profileImageUrl')
            .populate('members', 'firstName lastName email profileImageUrl')
            .sort({ dueDate: 1, startTime: 1 });

        res.json({
            success: true,
            meetings
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Meeting
export const updateMeeting = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { meetingId } = req.params;
        const updateData = req.body;

        const meeting = await Meeting.findOne({
            _id: meetingId,
            organizer: userId
        });

        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: "Meeting not found or access denied"
            });
        }

        if (updateData.dueDate) {
            updateData.dueDate = new Date(updateData.dueDate);
        }

        const updatedMeeting = await Meeting.findByIdAndUpdate(
            meetingId,
            updateData,
            { new: true }
        )
            .populate('organizer', 'firstName lastName email profileImageUrl')
            .populate('members', 'firstName lastName email profileImageUrl');

        res.json({
            success: true,
            message: "Meeting updated successfully",
            meeting: updatedMeeting
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Meeting
export const deleteMeeting = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { meetingId } = req.params;

        const meeting = await Meeting.findOne({
            _id: meetingId,
            organizer: userId
        });

        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: "Meeting not found or access denied"
            });
        }

        await Meeting.findByIdAndDelete(meetingId);

        res.json({
            success: true,
            message: "Meeting deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};