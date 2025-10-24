"use client";

import { Bell, AlertCircle, Info, CheckCircle } from "lucide-react";

const alertsData = [
  {
    icon: Bell,
    title: "Budget Overrun Alert",
    severity: "Critical",
    description: "Project spending has exceeded the allocated budget.",
    time: "2 hours ago",
  },
  {
    icon: AlertCircle,
    title: "Server Downtime",
    severity: "Warning",
    description: "Main server is down, affecting all users.",
    time: "3 hours ago",
  },
  {
    icon: Info,
    title: "New Policy Update",
    severity: "Alert",
    description: "HR has updated the leave policy.",
    time: "5 hours ago",
  },
  {
    icon: CheckCircle,
    title: "Task Completed",
    severity: "Approved",
    description: "Frontend module implementation completed.",
    time: "1 day ago",
  },
];

const AlertsNotification = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-purple-300 text-purple";
      case "warning":
        return "bg-red-300 text-red";
      case "alert":
        return "bg-orange-300 text-orange";
      case "approved":
        return "bg-green-300 text-green";
      default:
        return "bg-gray-300 text-gray";
    }
  };

  return (
    <div className="px-5 py-10">
      <h1 className="font-semibold text-2xl mb-6">Alerts & Notification</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {alertsData.map((alert, idx) => {
          const Icon = alert.icon;
          return (
            <div
              key={idx}
              className="bg-white hover:shadow-lg border shadow rounded-xl p-4 flex justify-between items-center gap-4"
            >
              {/* Icon */}
              <div className="bg-gray-100 p-3 rounded-full flex items-center justify-center">
                <Icon className="text-gray-600 w-5 h-5" />
              </div>

              {/* Text content */}
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-black">{alert.title}</h2>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(
                      alert.severity
                    )}`}
                  >
                    {alert.severity}
                  </span>
                </div>
                <p className="text-black/60 text-sm">{alert.description}</p>
              </div>

              {/* Time and small button */}
              <div className="flex flex-col items-end gap-2">
                <span className="font-bold bg-gray-100 p-1 px-3 rounded-full  text-black/60">
                  {alert.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsNotification;
