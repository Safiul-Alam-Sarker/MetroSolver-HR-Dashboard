"use client";

import { useState } from "react";
import CreateAccountModal from "../createAccountModel";
import OrgChart from "./OrgChart";
import {
  Download,
  Plus,
  ChartNetwork,
  PieChart,
  User,
  Clock,
  Calendar,
  DollarSign,
  FileText,
  Award,
  Heart,
} from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  password: string;
  confirmPassword: string;
}

const Employee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Org Chart");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (formData: FormData) => {
    console.log("Account data:", formData);
    alert("Account created successfully!");
    handleCloseModal();
  };

  const menuItems = [
    { icon: ChartNetwork, label: "Org Chart" },
    { icon: User, label: "Profile" },
    { icon: Clock, label: "Attendance" },
    { icon: PieChart, label: "Time Tracking" },
    { icon: Calendar, label: "Leave Management" },
    { icon: FileText, label: "Requests" },
    { icon: DollarSign, label: "Payment" },
    { icon: FileText, label: "Document" },
    { icon: Award, label: "Skills" },
    { icon: Heart, label: "Wellness" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Background content that gets blurred when modal opens */}
      <div
        className={`transition-all duration-300 ${
          isModalOpen ? "blur-sm" : "blur-0"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Row 1: Header with buttons */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              People Directory
            </h1>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors font-medium">
                <Download className="w-5 h-5" />
                Export
              </button>
              <button
                onClick={handleOpenModal}
                className="flex items-center gap-2 bg-indigo-950 text-white px-6 py-3 rounded-full hover:bg-indigo-900 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Create New Account
              </button>
            </div>
          </div>

          {/* Row 2: Navigation Menu */}
          <div className="border border-gray-200 rounded-xl bg-white shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between overflow-x-auto">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeTab === item.label;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 min-w-[100px] px-4 py-2 transition-colors cursor-pointer group relative"
                    onClick={() => setActiveTab(item.label)}
                  >
                    <div
                      className={`flex items-center gap-2 text-sm font-medium whitespace-nowrap p-3 rounded-lg transition-colors ${
                        isActive
                          ? "text-blue-700 bg-indigo-50"
                          : "text-gray-600 hover:text-indigo-950 hover:bg-indigo-50"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors ${
                          isActive
                            ? "text-blue-700"
                            : "text-gray-600 group-hover:text-indigo-950"
                        }`}
                      />
                      {item.label}
                    </div>

                    {/* Active underline - only show for active tab */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content area that changes based on active tab */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {activeTab === "Org Chart" && <OrgChart />}

            {activeTab !== "Org Chart" && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg">
                  {activeTab} content will be displayed here
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  This section is for demonstration purposes only
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <CreateAccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default Employee;
