import { ChevronDown } from "lucide-react";

import EmployeeCard from "./employeeCard";
import { employeeData } from "@/assets/data";

const EmployeeManagement = () => {
  return (
    <>
      <div className="bg-white px-5">
        <div className="flex items-center justify-between  py-10">
          <h1 className="font-medium text-[25px] leading-[26px]">
            Employee Management
          </h1>
          <div className="flex items-center justify-center gap-3">
            <button className="bg-white border shadow-lg hover:shadow-xl font-medium text-2xl rounded-full px-8 py-2 flex items-center gap-3 text-black/60">
              Monthly <ChevronDown />
            </button>
            <button className="bg-indigo-950 border shadow-xl hover:bg-indigo-900 font-medium text-2xl rounded-full px-8 py-2 flex items-center gap-3 text-white">
              View Details
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {employeeData.map((item) => (
            <EmployeeCard
              key={item.id}
              heading={item.heading}
              icon={item.icon}
              improvePercent={item.improvePercent}
              total={item.total ?? 6941} // fallback
              chartData={item.chartData}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default EmployeeManagement;
