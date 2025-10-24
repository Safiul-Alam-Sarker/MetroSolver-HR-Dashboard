"use client";

import {
  X,
  MessageCircle,
  Phone,
  Video,
  User,
  Users,
  Calendar,
  Clock,
  Check,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "./api/axios"; // Import your axios instance

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: (data: any) => void;
}

const ScheduleModal = ({ isOpen, onClose, onBook }: ScheduleModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    members: "",
    description: "",
    dueDate: "",
    startTime: "",
    endTime: "",
    meetingLink: "",
  });

  const [selectedConversationType, setSelectedConversationType] =
    useState("video");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const conversationTypes = [
    { type: "message", icon: MessageCircle, label: "Message" },
    { type: "audio", icon: Phone, label: "Audio" },
    { type: "video", icon: Video, label: "Video" },
  ];

  const platforms = [
    { name: "Zoom", value: "zoom" },
    { name: "Slack", value: "slack" },
    { name: "Meet", value: "meet" },
    { name: "Teams", value: "teams" },
    { name: "Other", value: "other" },
  ];

  const availableMembers = [
    "John Smith",
    "Sarah Johnson",
    "Mike Chen",
    "Lisa Brown",
    "David Wilson",
    "Emma Davis",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
  };

  const toggleMember = (member: string) => {
    setSelectedMembers((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        toast.error("Meeting title is required!");
        setLoading(false);
        return;
      }

      if (!formData.dueDate) {
        toast.error("Meeting date is required!");
        setLoading(false);
        return;
      }

      if (!formData.startTime || !formData.endTime) {
        toast.error("Start time and end time are required!");
        setLoading(false);
        return;
      }

      if (!selectedPlatform) {
        toast.error("Please select a platform!");
        setLoading(false);
        return;
      }

      // Prepare meeting data for backend
      const meetingData = {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        conversationType: selectedConversationType,
        platform: selectedPlatform,
        meetingLink: formData.meetingLink,
        members: selectedMembers, // Array of selected member names/IDs
      };

      // Call backend API to create meeting
      const { data } = await API.post("/meeting/schedule", meetingData);

      if (data.success) {
        toast.success("Meeting scheduled successfully! 🎉");

        // Reset form
        setFormData({
          title: "",
          name: "",
          members: "",
          description: "",
          dueDate: "",
          startTime: "",
          endTime: "",
          meetingLink: "",
        });
        setSelectedConversationType("video");
        setSelectedPlatform("");
        setSelectedMembers([]);

        // Call the onBook callback
        onBook(data.meeting);

        // Close modal
        onClose();
      } else {
        toast.error(data.message || "Failed to schedule meeting");
      }
    } catch (error: any) {
      console.log("Meeting scheduling error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while scheduling the meeting!"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h1 className="text-2xl font-bold text-gray-800">Schedule Meeting</h1>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dash line */}
        <div className="border-b border-dashed border-gray-300"></div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Meeting Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meeting Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter meeting title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
              required
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Meeting description..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none disabled:opacity-50"
              disabled={loading}
            />
          </div>

          {/* Add Members */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Members
            </label>
            <div className="space-y-3">
              {/* Member Selection */}
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none disabled:opacity-50"
                  onChange={(e) => {
                    if (e.target.value) {
                      toggleMember(e.target.value);
                      e.target.value = ""; // Reset select
                    }
                  }}
                  disabled={loading}
                >
                  <option value="">Select members to add</option>
                  {availableMembers.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Members */}
              {selectedMembers.length > 0 && (
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex flex-wrap gap-2">
                    {selectedMembers.map((member) => (
                      <div
                        key={member}
                        className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {member}
                        <button
                          type="button"
                          onClick={() => toggleMember(member)}
                          disabled={loading}
                          className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Conversation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Conversation Type
            </label>
            <div className="flex justify-between gap-3">
              {conversationTypes.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setSelectedConversationType(item.type)}
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 py-3 px-4 flex-1 rounded-lg border transition-colors ${
                      selectedConversationType === item.type
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    } disabled:opacity-50`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Platform *
            </label>

            {/* Platform Options */}
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((platform) => (
                <button
                  key={platform.value}
                  type="button"
                  onClick={() => handlePlatformSelect(platform.value)}
                  disabled={loading}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    selectedPlatform === platform.value
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  } disabled:opacity-50`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 border rounded flex items-center justify-center ${
                        selectedPlatform === platform.value
                          ? "bg-indigo-600 border-indigo-600"
                          : "border-gray-400"
                      }`}
                    >
                      {selectedPlatform === platform.value && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{platform.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Meeting Link (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meeting Link (Optional)
            </label>
            <input
              type="url"
              name="meetingLink"
              value={formData.meetingLink}
              onChange={handleChange}
              placeholder="https://meet.google.com/xxx-xxxx-xxx"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
              disabled={loading}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-indigo-950 text-white rounded-full hover:bg-indigo-800 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? "Scheduling..." : "Schedule Meeting"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;
