import {
  LogOut,
  LayoutDashboard,
  TimerIcon,
  Contact,
  UsersIcon,
  Building2,
  UserSearchIcon,
  SlidersVertical,
  MessageCircleMore,
  ClipboardList,
  CalendarDays,
  Network,
  ReceiptJapaneseYenIcon,
  Newspaper,
  GraduationCap,
  Scale,
  CircleQuestionMark,
} from "lucide-react";
import Logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `w-full flex gap-3 items-center p-2 rounded-xl transition-colors duration-200 pl-4 overflow-hidden relative
    ${
      isActive
        ? "text-purple-800 bg-purple-100 border border-purple-200"
        : "text-gray-700 hover:text-purple-800 hover:bg-purple-50"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="h-full max-w-xs flex flex-col bg-white border-r border-gray-200">
      <div className="py-1">
        <NavLink to={"/"} className="flex items-center justify-center ">
          <img src={Logo} alt="company logo" className="w-[70%]" />
        </NavLink>
      </div>
      {/* Navigation Links */}
      <div className="flex-1 p-5 overflow-y-auto py-2">
        <nav className="space-y-2">
          <NavLink to="/" className={navLinkClasses} end>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <LayoutDashboard size={20} />
                <span className="font-medium">Dashboard</span>
              </>
            )}
          </NavLink>
          <NavLink to="/time" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <TimerIcon size={20} />
                <span className="font-medium">Time Tracking</span>
              </>
            )}
          </NavLink>
          <NavLink to="/meeting" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <Contact size={20} />
                <span className="font-medium">Meeting</span>
              </>
            )}
          </NavLink>
          <NavLink to="/employee" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <UsersIcon size={20} />
                <span className="font-medium">Employees</span>
              </>
            )}
          </NavLink>
          <NavLink to="/company-statistic" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <Building2 size={20} />
                <span className="font-medium">Company Statistic</span>
              </>
            )}
          </NavLink>
          <NavLink to="/recruitment" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <UserSearchIcon size={20} />
                <span className="font-medium">Recruitment</span>
              </>
            )}
          </NavLink>
          <NavLink to="/messages" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <MessageCircleMore size={20} />
                <span className="font-medium">Messages</span>
              </>
            )}
          </NavLink>
          <NavLink to="/task" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <ClipboardList size={20} />
                <span className="font-medium">Task</span>
              </>
            )}
          </NavLink>
          <NavLink to="/calendar" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <CalendarDays size={20} />
                <span className="font-medium">Calendar</span>
              </>
            )}
          </NavLink>
          <NavLink to="/project-collaboration" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <Network size={20} />
                <span className="font-medium">Project Collaboration</span>
              </>
            )}
          </NavLink>
          <NavLink to="/hmrc" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <ReceiptJapaneseYenIcon size={20} />
                <span className="font-medium">HMRC</span>
              </>
            )}
          </NavLink>
          <NavLink to="/newsfeed" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <Newspaper size={20} />
                <span className="font-medium">NewsFeed</span>
              </>
            )}
          </NavLink>
          <NavLink to="/course" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <GraduationCap size={20} />
                <span className="font-medium">Course</span>
              </>
            )}
          </NavLink>
          <NavLink to="/policies" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <Scale size={20} />
                <span className="font-medium">Policies</span>
              </>
            )}
          </NavLink>
          <NavLink to="/metro-assistant" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <CircleQuestionMark size={20} />
                <span className="font-medium">Metro Assistant</span>
              </>
            )}
          </NavLink>
          <NavLink to="/setting" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute w-2.5 h-7 -left-1 bg-purple-700 rounded-sm"></div>
                )}
                <SlidersVertical size={20} />
                <span className="font-medium">Setting</span>
              </>
            )}
          </NavLink>
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="p-4 w-full">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-2 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
          aria-label="Logout"
        >
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
