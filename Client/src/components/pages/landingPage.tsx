import Logo from "../../assets/logo.png";
import { LoginForm } from "@/components/login-form";
import BackgroundImg from "../../assets/bgImage.png";
import { useState, useEffect } from "react";
import { SignupForm } from "@/components/signup-form";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [signInModal, setSignInModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/"); // redirect to feed if logged in
  }, [navigate]);

  return (
    <div
      style={{ backgroundImage: `url(${BackgroundImg})` }}
      className="px-5 2xl:px-[20rem] md:px-[5rem] h-screen flex flex-col"
    >
      <div className="logo py-5">
        <img src={Logo} alt="company logo" className="lg:w-[10rem]" />
      </div>
      <div className="w-full h-full flex flex-col lg:flex-row justify-center lg:justify-between items-center">
        <div className="py-10">
          <div className="flex items-center py-8 "></div>
          <div className="max-w-[350px] md:max-w-[500px] lg:max-w-[700px] bg-gradient-to-r from-blue-950 to-blue-700 text-transparent bg-clip-text">
            <h1 className="font-bold text-3xl md:text-5xl xl:text-7xl ">
              Welcome to HR Management
            </h1>
            <p className=" mt-3 max-w-[300px] md:max-w-[500px] lg:text-2xl tracking-wider">
              DashBoard || Dynamic profile + Profile Edit || All Available
              Meetings & Tasks + Update feature || Dynamic schedule, task &
              Employee addition || Working Calander Scheduler
            </p>
          </div>
        </div>
        <div className="min-w-[300px] md:min-w-[400px]">
          {signInModal ? (
            <LoginForm setSignInModal={setSignInModal} />
          ) : (
            <SignupForm setSignInModal={setSignInModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
