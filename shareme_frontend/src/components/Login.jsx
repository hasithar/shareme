import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";
import shareVideo from "./../assets/share.mp4";
import logo from "./../assets/logowhite.png";

const Login = () => {
  const handleSuccessResponse = (response) => {
    console.log("🚀 ~ handleSuccessResponse ~ response:", response);
  };

  const handleErrorResponse = (error) => {
    console.log("🚀 ~ handleErrorResponse ~ error:", error);
  };

  return (
    <div className="bg-indigo-500 flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          controls={false}
          loop
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute flex flex-col justify-center items-center inset-0 bg-blackOverlay">
        <div className="p-5">
          <img src={logo} alt="logo" width="130px" />
        </div>

        <div className="shadow-2xl">
          {/* <button className=" bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none">
            <FcGoogle className=" mr-4" /> Sign in with Google
          </button> */}
          <GoogleLogin
            onSuccess={handleSuccessResponse}
            onError={handleErrorResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
