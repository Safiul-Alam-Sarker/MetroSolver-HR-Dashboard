"use client";

import { Search, Edit3, MoreVertical, Plus } from "lucide-react";
import { useState } from "react";

interface EmployeeNode {
  id: string;
  name: string;
  designation: string;
  place: string;
  parentId?: string | null;
  hasConnections?: boolean;
}

const OrgChart = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for the org chart
  const orgData: EmployeeNode[] = [
    {
      id: "1",
      name: "John Smith",
      designation: "CEO",
      place: "New York",
      parentId: null,
      hasConnections: true,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      designation: "CTO",
      place: "San Francisco",
      parentId: "1",
      hasConnections: true,
    },
    {
      id: "3",
      name: "Robert Garcia",
      designation: "CFO",
      place: "Chicago",
      parentId: "1",
      hasConnections: true,
    },
    {
      id: "4",
      name: "Mike Chen",
      designation: "Lead Developer",
      place: "San Francisco",
      parentId: "2",
      hasConnections: true,
    },
    {
      id: "5",
      name: "Lisa Brown",
      designation: "Product Manager",
      place: "New York",
      parentId: "2",
      hasConnections: true,
    },
    {
      id: "6",
      name: "Maria Rodriguez",
      designation: "Finance Manager",
      place: "Chicago",
      parentId: "3",
      hasConnections: false,
    },
    {
      id: "7",
      name: "Emily Davis",
      designation: "Frontend Developer",
      place: "Remote",
      parentId: "4",
      hasConnections: false,
    },
    {
      id: "8",
      name: "David Wilson",
      designation: "Backend Developer",
      place: "San Francisco",
      parentId: "4",
      hasConnections: false,
    },
    {
      id: "9",
      name: "Alex Kumar",
      designation: "UX Designer",
      place: "Remote",
      parentId: "5",
      hasConnections: false,
    },
  ];

  // Build tree structure
  const buildTree = (data: EmployeeNode[]) => {
    const map = new Map();
    const roots: any[] = [];

    data.forEach((item) => {
      map.set(item.id, { ...item, children: [] });
    });

    data.forEach((item) => {
      if (item.parentId && map.has(item.parentId)) {
        map.get(item.parentId).children.push(map.get(item.id));
      } else if (!item.parentId) {
        roots.push(map.get(item.id));
      }
    });

    return roots;
  };

  const treeData = buildTree(orgData);

  const EmployeeCard = ({
    employee,
    level = 0,
  }: {
    employee: any;
    level?: number;
  }) => {
    const hasChildren = employee.children && employee.children.length > 0;
    const isCEO = level === 0;

    return (
      <div className="flex flex-col items-center">
        {/* Employee Card */}
        <div
          className={`rounded-xl border p-4 w-64 mx-4 ${
            isCEO
              ? "bg-indigo-950 border-indigo-800 text-white"
              : "bg-white border-gray-200 text-gray-800"
          } shadow-sm`}
        >
          <div className="flex items-start justify-between">
            {/* Profile Image and Info */}
            <div className="flex items-center gap-3 flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isCEO ? "bg-indigo-800" : "bg-gray-100"
                }`}
              >
                <span
                  className={`font-semibold text-sm ${
                    isCEO ? "text-white" : "text-gray-600"
                  }`}
                >
                  {employee.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">
                  {employee.name}
                </h3>
                <p
                  className={`text-xs truncate ${
                    isCEO ? "text-indigo-200" : "text-gray-600"
                  }`}
                >
                  {employee.designation}
                </p>
                <p
                  className={`text-xs truncate ${
                    isCEO ? "text-indigo-300" : "text-gray-500"
                  }`}
                >
                  {employee.place}
                </p>
              </div>
            </div>

            {/* Three dots menu */}
            <button
              className={`p-1 rounded ${
                isCEO
                  ? "text-indigo-300 hover:text-white"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Connector with Plus Icon */}
        {hasChildren && (
          <div className="relative mt-4 mb-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                employee.hasConnections ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <Plus
                className={`w-4 h-4 ${
                  employee.hasConnections ? "text-white" : "text-gray-600"
                }`}
              />
            </div>
            {/* Vertical line connecting to children */}
            <div className="absolute top-8 left-1/2 w-0.5 h-4 bg-blue-600 transform -translate-x-1/2"></div>
          </div>
        )}

        {/* Children */}
        {hasChildren && (
          <div className="flex gap-8 mt-4 relative">
            {/* Horizontal line connecting children */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600 transform -translate-y-4"></div>

            {employee.children.map((child: any, index: number) => (
              <div key={child.id} className="flex flex-col items-center">
                {/* Vertical line from horizontal to child */}
                <div className="w-0.5 h-4 bg-blue-600 mb-2"></div>
                <EmployeeCard employee={child} level={level + 1} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full">
      {/* Header with Search and Edit */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <Edit3 className="w-4 h-4" />
          Edit Org Chart
        </button>
      </div>

      {/* Org Chart Container */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-x-auto">
        <div className="flex justify-center min-w-max">
          {treeData.map((root) => (
            <EmployeeCard key={root.id} employee={root} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrgChart;
