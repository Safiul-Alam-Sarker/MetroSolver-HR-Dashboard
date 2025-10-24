"use client";

import { useState, useEffect } from "react";
import {
  Trash2,
  Video,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  Users,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import API from "../api/axios";

interface Meeting {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  startTime: string;
  endTime: string;
  conversationType: "message" | "audio" | "video";
  platform: "zoom" | "slack" | "meet" | "teams" | "other";
  meetingLink?: string;
  members: string[];
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  createdAt: string;
}

const Meeting = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingMeetingId, setDeletingMeetingId] = useState<string | null>(
    null
  );

  // Fetch meetings on component mount
  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/meeting/all");

      if (data.success) {
        setMeetings(data.meetings);
      } else {
        toast.error("Failed to load meetings");
      }
    } catch (error: any) {
      console.error("Error fetching meetings:", error);
      toast.error("Failed to load meetings");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMeeting = async (meetingId: string) => {
    if (!window.confirm("Are you sure you want to delete this meeting?")) {
      return;
    }

    try {
      setDeletingMeetingId(meetingId);

      const { data } = await API.delete(`/meeting/delete/${meetingId}`);

      if (data.success) {
        setMeetings((prev) =>
          prev.filter((meeting) => meeting._id !== meetingId)
        );
        toast.success("Meeting deleted successfully! 🗑️");
      } else {
        toast.error(data.message || "Failed to delete meeting");
      }
    } catch (error: any) {
      console.error("Error deleting meeting:", error);
      toast.error(error.response?.data?.message || "Failed to delete meeting");
    } finally {
      setDeletingMeetingId(null);
    }
  };

  const getConversationIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "audio":
        return <Phone className="w-4 h-4" />;
      case "message":
        return <MessageCircle className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "zoom":
        return "Zoom";
      case "slack":
        return "Slack";
      case "meet":
        return "Google Meet";
      case "teams":
        return "Microsoft Teams";
      case "other":
        return "Other Platform";
      default:
        return platform;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isMeetingLive = (meeting: Meeting) => {
    const now = new Date();
    const meetingDate = new Date(meeting.dueDate);
    const startTime = new Date(`${meeting.dueDate}T${meeting.startTime}`);
    const endTime = new Date(`${meeting.dueDate}T${meeting.endTime}`);

    return now >= startTime && now <= endTime && meeting.status === "scheduled";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-20">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Scheduled Meetings</h2>
        <div className="text-sm text-gray-500">
          {meetings.length} meeting{meetings.length !== 1 ? "s" : ""} scheduled
        </div>
      </div>

      {/* Meetings List */}
      {meetings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No meetings scheduled
          </h3>
          <p className="text-gray-500">
            Schedule your first meeting to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div
              key={meeting._id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 relative"
            >
              {/* Delete Button */}
              <button
                onClick={() => handleDeleteMeeting(meeting._id)}
                disabled={deletingMeetingId === meeting._id}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                title="Delete meeting"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Live Badge */}
              {isMeetingLive(meeting) && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse">
                    Live
                  </span>
                </div>
              )}

              {/* Meeting Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {meeting.title}
                  </h3>
                  {meeting.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {meeting.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Meeting Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                {/* Date & Time */}
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  <div>
                    <div>{formatDate(meeting.dueDate)}</div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTime(meeting.startTime)} -{" "}
                      {formatTime(meeting.endTime)}
                    </div>
                  </div>
                </div>

                {/* Conversation Type */}
                <div className="flex items-center text-gray-600">
                  {getConversationIcon(meeting.conversationType)}
                  <span className="ml-2 capitalize">
                    {meeting.conversationType}
                  </span>
                </div>

                {/* Platform */}
                <div className="flex items-center text-gray-600">
                  <span className="font-medium">
                    {getPlatformName(meeting.platform)}
                  </span>
                </div>

                {/* Members */}
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>
                    {meeting.members.length} participant
                    {meeting.members.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Meeting Footer */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      meeting.status
                    )}`}
                  >
                    {meeting.status.charAt(0).toUpperCase() +
                      meeting.status.slice(1)}
                  </span>
                  <span>
                    Organized by {meeting.organizer.firstName}{" "}
                    {meeting.organizer.lastName}
                  </span>
                </div>

                {/* Meeting Link */}
                {meeting.meetingLink && (
                  <a
                    href={meeting.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Join Meeting
                  </a>
                )}
              </div>

              {/* Members List */}
              {meeting.members.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1">
                    {meeting.members.slice(0, 5).map((member, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700"
                      >
                        {member}
                      </span>
                    ))}
                    {meeting.members.length > 5 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-500">
                        +{meeting.members.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Delete Loading Overlay */}
              {deletingMeetingId === meeting._id && (
                <div className="absolute inset-0 bg-white bg-opacity-75 rounded-lg flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meeting;
