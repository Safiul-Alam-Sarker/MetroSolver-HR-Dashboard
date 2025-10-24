"use client";

import { ChevronLeft, ChevronRight, Filter, Download } from "lucide-react";
import { useState, useEffect } from "react";
import CalendarEventCard from "./calenderEventCard";
import API from "./api/axios";
import toast from "react-hot-toast";

interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  type: string;
  participants: string[];
  color: string;
  date: Date;
  description?: string;
  platform?: string;
  meetingLink?: string;
  status?: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
  };
}

interface BackendMeeting {
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
    profileImageUrl?: string;
  };
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  createdAt: string;
}
interface CalendarSchedulerProps {
  onDataUpdate?: () => void;
}
const CalendarScheduler = ({ onDataUpdate }: CalendarSchedulerProps) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [view, setView] = useState<"daily" | "weekly">("weekly");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate time slots from 6 AM to 10 PM
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = i + 6;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  // Generate week days
  const getWeekDays = () => {
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const weekDays = getWeekDays();

  // Fetch meetings from backend
  useEffect(() => {
    fetchMeetings();
  }, [currentWeek]);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/meeting/all");

      if (data.success) {
        const formattedEvents = data.meetings.map(
          (meeting: BackendMeeting) => ({
            id: meeting._id,
            title: meeting.title,
            startTime: meeting.startTime,
            endTime: meeting.endTime,
            type: meeting.conversationType,
            participants: meeting.members,
            color: getEventColor(meeting.conversationType),
            date: new Date(meeting.dueDate),
            description: meeting.description,
            platform: meeting.platform,
            meetingLink: meeting.meetingLink,
            status: meeting.status,
            organizer: meeting.organizer,
          })
        );
        setEvents(formattedEvents);

        // Call the callback if provided
        if (onDataUpdate) {
          onDataUpdate();
        }
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

  const getEventColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-500";
      case "audio":
        return "bg-green-500";
      case "message":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getEventsForDay = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  // Calculate event position and height based on start and end times
  const calculateEventPosition = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    // Calculate start position from 6 AM (0px)
    const startPosition = ((startHours - 6) * 60 + startMinutes) * (80 / 60);
    // Calculate duration in minutes
    const duration =
      endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
    // Calculate height based on duration
    const height = duration * (80 / 60);

    return {
      top: startPosition,
      height: Math.max(height, 20), // Minimum height of 20px
    };
  };

  const formatTimeDisplay = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header Row 1 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Calendar</h2>
        <div className="flex items-center gap-4">
          {/* View Selector */}
          <select
            value={view}
            onChange={(e) => setView(e.target.value as "daily" | "weekly")}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
          </select>

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Header Row 2 - Navigation and Days */}
      <div className="flex items-center justify-between mb-4">
        {/* Week Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateWeek("prev")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigateWeek("next")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <span className="text-lg font-semibold text-gray-800 ml-2">
            {weekDays[0].toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Days Header */}
        <div className="flex-1 grid grid-cols-7 gap-1 ml-8">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`text-center py-2 rounded-lg ${
                isToday(day) ? "bg-indigo-100 text-indigo-700" : "text-gray-600"
              }`}
            >
              <div className="text-sm font-medium">{formatDate(day)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="relative border border-gray-200 rounded-lg overflow-hidden">
        {/* Time Column and Grid */}
        <div className="flex">
          {/* Time Labels */}
          <div className="w-20 flex-shrink-0">
            {timeSlots.map((time, index) => (
              <div
                key={time}
                className="h-20 border-b border-gray-100 flex items-start justify-end pr-3 pt-1"
              >
                <span className="text-xs text-gray-500">
                  {formatTimeDisplay(time)}
                </span>
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="flex-1 grid grid-cols-7">
            {weekDays.map((day, dayIndex) => (
              <div key={dayIndex} className="relative border-l border-gray-100">
                {/* Time Slots Background */}
                {timeSlots.map((time, timeIndex) => (
                  <div
                    key={timeIndex}
                    className="h-20 border-b border-gray-100"
                  />
                ))}

                {/* Events for this day */}
                {getEventsForDay(day).map((event) => {
                  const position = calculateEventPosition(
                    event.startTime,
                    event.endTime
                  );
                  return (
                    <div
                      key={event.id}
                      className="absolute left-1 right-1"
                      style={{
                        top: `${position.top}px`,
                        height: `${position.height}px`,
                      }}
                    >
                      <CalendarEventCard event={event} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarScheduler;
