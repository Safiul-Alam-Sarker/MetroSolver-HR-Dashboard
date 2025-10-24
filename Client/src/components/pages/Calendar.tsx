"use client";

import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import ScheduleModal from "../createSchedule";
import CreateTaskModal from "../createTaskModal";
import CalendarScheduler from "../calenderScheduler";
import API from "../api/axios";

const Calendar = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [todayStats, setTodayStats] = useState({
    meetings: 0,
    tasks: 0,
  });
  const [loading, setLoading] = useState(true);

  // Get current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Fetch today's meetings and tasks count
  useEffect(() => {
    fetchTodayStats();
  }, []);

  const fetchTodayStats = async () => {
    try {
      setLoading(true);

      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split("T")[0];

      // Fetch meetings for today
      const meetingsResponse = await API.get(`/meeting/all?date=${today}`);
      const todayMeetings = meetingsResponse.data.success
        ? meetingsResponse.data.meetings.filter(
            (meeting: any) =>
              meeting.dueDate === today && meeting.status !== "cancelled"
          ).length
        : 0;

      // Fetch tasks for today
      const tasksResponse = await API.get(`/task/all?dueDate=${today}`);
      const todayTasks = tasksResponse.data.success
        ? tasksResponse.data.tasks.filter(
            (task: any) => task.dueDate === today && task.status !== "cancelled"
          ).length
        : 0;

      setTodayStats({
        meetings: todayMeetings,
        tasks: todayTasks,
      });
    } catch (error: any) {
      console.error("Error fetching today's stats:", error);
      // Set default values if API fails
      setTodayStats({
        meetings: 0,
        tasks: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = (data: any) => {
    console.log("Schedule data:", data);
    setIsScheduleModalOpen(false);
    // Refresh stats after scheduling a new meeting
    fetchTodayStats();
  };

  const handleCreateTask = (data: any) => {
    console.log("Create task data:", data);
    setIsCreateTaskModalOpen(false);
    // Refresh stats after creating a new task
    fetchTodayStats();
  };

  // Get appropriate message based on counts
  const getStatsMessage = () => {
    if (loading) {
      return "Loading your schedule...";
    }

    const { meetings, tasks } = todayStats;

    if (meetings === 0 && tasks === 0) {
      return "You have no meetings or tasks scheduled for today";
    }

    const meetingText = meetings === 1 ? "1 meeting" : `${meetings} meetings`;
    const taskText = tasks === 1 ? "1 task" : `${tasks} tasks`;

    if (meetings > 0 && tasks > 0) {
      return `You have ${meetingText} and ${taskText} today`;
    } else if (meetings > 0) {
      return `You have ${meetingText} today`;
    } else {
      return `You have ${taskText} today`;
    }
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          {/* Left side - Date and meetings info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {formattedDate}
            </h1>
            <p className="text-gray-600">
              {getStatsMessage()}
              {todayStats.meetings > 0 && (
                <span className="font-semibold text-blue-600">
                  {" "}
                  {todayStats.meetings} meeting
                  {todayStats.meetings !== 1 ? "s" : ""}
                </span>
              )}
              {todayStats.meetings > 0 && todayStats.tasks > 0 && (
                <span> and </span>
              )}
              {todayStats.tasks > 0 && (
                <span className="font-semibold text-green-600">
                  {" "}
                  {todayStats.tasks} task{todayStats.tasks !== 1 ? "s" : ""}
                </span>
              )}
              {todayStats.meetings > 0 || todayStats.tasks > 0 ? " today" : ""}
            </p>
          </div>

          {/* Right side - Buttons */}
          <div className="flex gap-3">
            {/* Schedule Button */}
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="flex items-center gap-2 bg-white text-gray-700 hover:shadow-2xl px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
            >
              <CalendarIcon className="w-4 h-4" />
              Schedule
            </button>

            {/* Create Task Button */}
            <button
              onClick={() => setIsCreateTaskModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-900 text-white px-6 py-3 shadow-xl hover:shadow-2xl rounded-full hover:bg-indigo-800 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Create Task
            </button>
          </div>
        </div>

        {/* Calendar Scheduler Component */}
        <CalendarScheduler onDataUpdate={fetchTodayStats} />

        {/* Modals */}
        <ScheduleModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          onBook={handleSchedule}
        />

        <CreateTaskModal
          isOpen={isCreateTaskModalOpen}
          onClose={() => setIsCreateTaskModalOpen(false)}
          onCreate={handleCreateTask}
        />
      </div>
    </div>
  );
};

export default Calendar;
