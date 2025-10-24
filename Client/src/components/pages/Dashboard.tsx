import AlertsNotification from "../alerts";
import EmployeeManagement from "../employeeManagement";
import FinancialStatistics from "../financialStatistics";
import RecruitmentEngagement from "../recruitmentEngagement";

const Dashboard = () => {
  return (
    <>
      <div className="bg-white">
        <EmployeeManagement />

        <div className="flex flex-col md:flex-row justify-between px-4 sm:px-5 gap-4 lg:gap-6">
          <RecruitmentEngagement />
          <FinancialStatistics />
        </div>
        <AlertsNotification />
      </div>
    </>
  );
};

export default Dashboard;
