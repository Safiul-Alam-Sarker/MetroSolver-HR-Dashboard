"use client";

import {
  X,
  User,
  Target,
  Calendar,
  Clock,
  Check,
  CloudUpload,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "./api/axios";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

const CreateTaskModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateTaskModalProps) => {
  const [formData, setFormData] = useState({
    taskTitle: "",
    description: "",
    dueDate: "",
    time: "",
    assignee: "",
    label: "",
    group: "",
    priority: "",
    status: "",
    urgency: "",
    file: null as File | null,
  });

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("");
  const [loading, setLoading] = useState(false);

  const members = ["John Smith", "Sarah Johnson", "Mike Chen", "Lisa Brown"];
  const labels = ["Design", "Development", "Marketing", "Research"];
  const groups = ["Engineering", "Product", "Design", "Marketing"];
  const priorities = ["urgent", "high", "normal", "low"];
  const statuses = ["todo", "in-progress", "need-review", "done"];
  const urgencies = ["urgent", "high", "normal", "low"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        file: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.taskTitle.trim()) {
        toast.error("Task title is required!");
        setLoading(false);
        return;
      }

      if (!formData.dueDate) {
        toast.error("Due date is required!");
        setLoading(false);
        return;
      }

      // Prepare task data for backend
      const taskData = new FormData();
      taskData.append("title", formData.taskTitle);
      taskData.append("description", formData.description);
      taskData.append("dueDate", formData.dueDate);
      taskData.append("dueTime", formData.time);
      taskData.append("group", selectedGroup);
      taskData.append("priority", selectedPriority);
      taskData.append("status", selectedStatus || "pending");

      // Append arrays as JSON strings
      taskData.append("members", JSON.stringify(selectedMembers));
      taskData.append("labels", JSON.stringify(selectedLabels));

      // Append file if exists
      if (formData.file) {
        taskData.append("files", formData.file);
      }

      // Call backend API to create task
      const { data } = await API.post("/task/create", taskData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success("Task created successfully! 🎉");

        // Reset form
        setFormData({
          taskTitle: "",
          description: "",
          dueDate: "",
          time: "",
          assignee: "",
          label: "",
          group: "",
          priority: "",
          status: "",
          urgency: "",
          file: null,
        });
        setSelectedMembers([]);
        setSelectedLabels([]);
        setSelectedGroup("");
        setSelectedPriority("");
        setSelectedStatus("");
        setSelectedUrgency("");

        // Call the onCreate callback
        onCreate(data.task);

        // Close modal
        onClose();
      } else {
        toast.error(data.message || "Failed to create task");
      }
    } catch (error: any) {
      console.log("Task creation error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while creating task!"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleMember = (member: string) => {
    setSelectedMembers((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member]
    );
  };

  const toggleLabel = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h1 className="text-2xl font-bold text-gray-800">Create New Task</h1>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Dashed Line */}
          <div className="border-b border-dashed border-gray-300"></div>

          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              name="taskTitle"
              value={formData.taskTitle}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
              required
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Write Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task description..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none disabled:opacity-50"
              disabled={loading}
            />
          </div>

          {/* Add Member and Add Label */}
          <div className="grid grid-cols-2 gap-6">
            {/* Add Member */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Member
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none disabled:opacity-50"
                  onChange={(e) => {
                    if (e.target.value) {
                      toggleMember(e.target.value);
                      e.target.value = ""; // Reset select
                    }
                  }}
                  disabled={loading}
                >
                  <option value="">Select members</option>
                  {members.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black/60 w-5 h-5" />
              </div>

              {/* Selected Members */}
              {selectedMembers.length > 0 && (
                <div className="mt-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex flex-wrap gap-2">
                    {selectedMembers.map((member) => (
                      <div
                        key={member}
                        className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
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

            {/* Add Label */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Label
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none disabled:opacity-50"
                  onChange={(e) => {
                    if (e.target.value) {
                      toggleLabel(e.target.value);
                      e.target.value = ""; // Reset select
                    }
                  }}
                  disabled={loading}
                >
                  <option value="">Select labels</option>
                  {labels.map((label) => (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  ))}
                </select>
                <Target className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              {/* Selected Labels */}
              {selectedLabels.length > 0 && (
                <div className="mt-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex flex-wrap gap-2">
                    {selectedLabels.map((label) => (
                      <div
                        key={label}
                        className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
                      >
                        {label}
                        <button
                          type="button"
                          onClick={() => toggleLabel(label)}
                          disabled={loading}
                          className="text-green-600 hover:text-green-800 disabled:opacity-50"
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

          {/* Due Date and Time */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
                  required
                  disabled={loading}
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
                  disabled={loading}
                />
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Add Group and Set Priority */}
          <div className="grid grid-cols-2 gap-6">
            {/* Add Group */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Add Group
              </label>
              <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="grid grid-cols-2 gap-2">
                  {groups.map((group) => (
                    <button
                      key={group}
                      type="button"
                      onClick={() => setSelectedGroup(group)}
                      disabled={loading}
                      className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
                        selectedGroup === group
                          ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      } disabled:opacity-50`}
                    >
                      <span className="text-sm">{group}</span>
                      {selectedGroup === group && (
                        <Check className="w-4 h-4 text-indigo-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Set Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Set Priority
              </label>
              <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="grid grid-cols-2 gap-2">
                  {priorities.map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => setSelectedPriority(priority)}
                      disabled={loading}
                      className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
                        selectedPriority === priority
                          ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      } disabled:opacity-50`}
                    >
                      <span className="text-sm capitalize">{priority}</span>
                      {selectedPriority === priority && (
                        <Check className="w-4 h-4 text-indigo-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Status and Urgency */}
          <div className="grid grid-cols-2 gap-6">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Status
              </label>
              <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="grid grid-cols-2 gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setSelectedStatus(status)}
                      disabled={loading}
                      className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
                        selectedStatus === status
                          ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      } disabled:opacity-50`}
                    >
                      <span className="text-sm capitalize">
                        {status.replace("-", " ")}
                      </span>
                      {selectedStatus === status && (
                        <Check className="w-4 h-4 text-indigo-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Urgency
              </label>
              <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="grid grid-cols-2 gap-2">
                  {urgencies.map((urgency) => (
                    <button
                      key={urgency}
                      type="button"
                      onClick={() => setSelectedUrgency(urgency)}
                      disabled={loading}
                      className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
                        selectedUrgency === urgency
                          ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      } disabled:opacity-50`}
                    >
                      <span className="text-sm capitalize">{urgency}</span>
                      {selectedUrgency === urgency && (
                        <Check className="w-4 h-4 text-indigo-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Upload File
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors disabled:opacity-50"
              onDragOver={(e) => {
                if (!loading) {
                  e.preventDefault();
                  e.currentTarget.classList.add(
                    "border-indigo-400",
                    "bg-indigo-50"
                  );
                }
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove(
                  "border-indigo-400",
                  "bg-indigo-50"
                );
              }}
              onDrop={(e) => {
                if (!loading) {
                  e.preventDefault();
                  e.currentTarget.classList.remove(
                    "border-indigo-400",
                    "bg-indigo-50"
                  );

                  const files = e.dataTransfer.files;
                  if (files && files[0]) {
                    const file = files[0];
                    const allowedTypes = [
                      ".svg",
                      ".png",
                      ".jpg",
                      ".jpeg",
                      ".fig",
                    ];
                    const fileExtension =
                      "." + file.name.split(".").pop()?.toLowerCase();

                    if (allowedTypes.includes(fileExtension)) {
                      setFormData((prev) => ({
                        ...prev,
                        file: file,
                      }));
                    } else {
                      toast.error(
                        "Please upload only SVG, PNG, JPG, or FIG files."
                      );
                    }
                  }
                }
              }}
            >
              <CloudUpload className="w-12 h-12 text-black/80 mx-auto mb-4 border p-3 rounded-lg" />
              <p className="text-gray-600 mb-2">
                <span className="text-blue-700">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-gray-500 text-sm mb-4">
                SVG, PNG, JPG or FIG (max. 800×400px)
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".svg,.png,.jpg,.jpeg,.fig"
                className="hidden"
                id="file-upload"
                disabled={loading}
              />
              <label
                htmlFor="file-upload"
                className={`inline-block px-6 py-2 rounded-lg transition-colors cursor-pointer ${
                  loading
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {loading ? "Uploading..." : "Choose File"}
              </label>
              {formData.file && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm">
                    <strong>Selected:</strong> {formData.file.name}
                  </p>
                  <p className="text-green-600 text-xs mt-1">
                    Size: {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
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
              {loading ? "Creating Task..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
