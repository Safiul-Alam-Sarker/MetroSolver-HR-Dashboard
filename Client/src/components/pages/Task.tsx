"use client";

import { useState, useEffect } from "react";
import {
  Trash2,
  Edit,
  Calendar,
  Clock,
  User,
  Tag,
  AlertCircle,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import API from "../api/axios";
import toast from "react-hot-toast";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  dueTime?: string;
  priority: "low" | "normal" | "high" | "urgent";
  status: "pending" | "in-progress" | "completed" | "cancelled";
  members: string[];
  labels: string[];
  group: string;
  uploadedFiles: Array<{
    fileName: string;
    fileUrl: string;
    fileId: string;
  }>;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
  };
  createdAt: string;
  updatedAt: string;
}

const TaskList = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      // If you have a Redux slice for tasks, use this:
      // const result = await dispatch(getUserTasks()).unwrap();
      // setTasks(result.tasks);

      // For now, using direct API call - replace with your actual API endpoint
      const { data } = await API.get("/task/all");
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error: any) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      setDeletingTaskId(taskId);

      // If you have a Redux slice for tasks, use this:
      // await dispatch(deleteTask(taskId)).unwrap();

      // For now, using direct API call
      const { data } = await API.delete(`/task/delete/${taskId}`);

      if (data.success) {
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
        toast.success("Task deleted successfully!");
      } else {
        toast.error(data.message || "Failed to delete task");
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      toast.error(error.response?.data?.message || "Failed to delete task");
    } finally {
      setDeletingTaskId(null);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white p-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">All Tasks</h2>
        <div className="text-sm text-gray-500">
          {tasks.length} task{tasks.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Tasks Grid */}
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-500">
            Create your first task to get started!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              {/* Task Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 text-lg line-clamp-2">
                    {task.title}
                  </h3>
                  <div className="flex space-x-1 ml-2">
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      disabled={deletingTaskId === task._id}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                      title="Edit task"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                {task.description && (
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {task.description}
                  </p>
                )}

                {/* Priority and Status */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status.replace("-", " ")}
                  </span>
                </div>
              </div>

              {/* Task Details */}
              <div className="p-4 space-y-3">
                {/* Due Date */}
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span
                    className={
                      isOverdue(task.dueDate) ? "text-red-600 font-medium" : ""
                    }
                  >
                    {formatDate(task.dueDate)}
                    {isOverdue(task.dueDate) && " (Overdue)"}
                  </span>
                  {task.dueTime && (
                    <>
                      <Clock className="w-4 h-4 ml-3 mr-2" />
                      <span>{task.dueTime}</span>
                    </>
                  )}
                </div>

                {/* Group */}
                {task.group && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Tag className="w-4 h-4 mr-2" />
                    <span>{task.group}</span>
                  </div>
                )}

                {/* Members */}
                {task.members && task.members.length > 0 && (
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span>
                      {task.members.length} member
                      {task.members.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}

                {/* Labels */}
                {task.labels && task.labels.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {task.labels.slice(0, 3).map((label, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-blue-50 text-blue-700 border border-blue-200"
                      >
                        {label}
                      </span>
                    ))}
                    {task.labels.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-50 text-gray-600 border border-gray-200">
                        +{task.labels.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Files */}
                {task.uploadedFiles && task.uploadedFiles.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs text-gray-500 mb-1">
                      Attachments:
                    </div>
                    <div className="space-y-1">
                      {task.uploadedFiles.slice(0, 2).map((file, index) => (
                        <a
                          key={index}
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          <span className="truncate">{file.fileName}</span>
                        </a>
                      ))}
                      {task.uploadedFiles.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{task.uploadedFiles.length - 2} more files
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Created By */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      Created by {task.createdBy.firstName}{" "}
                      {task.createdBy.lastName}
                    </span>
                    <span>{formatDate(task.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Delete Loading Overlay */}
              {deletingTaskId === task._id && (
                <div className="absolute inset-0 bg-white bg-opacity-75 rounded-xl flex items-center justify-center">
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

export default TaskList;
