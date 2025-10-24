import Sidebar from "../sidebar";
import { Outlet } from "react-router-dom";
import Header from "../header";

const Layout = () => {
  return (
    <>
      <div className="w-dvw h-dvh  bg-white flex">
        <Sidebar />
        <div className="w-full overflow-x-hidden ">
          <Header />
          <div className="overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
