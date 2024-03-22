import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { client } from "../client";
import shareVideo from "./../assets/share.mp4";
import logo from "./../assets/logowhite.png";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  // login
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  // logout
  const logout = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
    localStorage.removeItem("user");
  };

  // const handleSuccessResponse = (response) => {
  //   localStorage.setItem('user', response)
  // };
  // const handleErrorResponse = (error) => {
  //   console.log("🚀 ~ handleErrorResponse ~ error:", error);
  // };

  useEffect(() => {
    if (user) {
      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            console.error("Error in network response");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          setProfile(data);
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((error) =>
          console.error(`Error processing the request , ${error}`)
        );
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      const { id, name, picture } = profile;

      const doc = {
        _id: id,
        _type: "user",
        userName: name,
        image: picture,
      };

      client
        .createIfNotExists(doc)
        .then(() => navigate("/", { replace: true }));
    }
  }, [navigate, profile]);

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
          {profile ? (
            <div className=" bg-mainColor p-3">
              {/*<img src={profile.picture} alt="user image" />
                  <h3>User Logged in</h3>
                  <p>Name: {profile.name}</p>
                  <p>Email Address: {profile.email}</p>
                  <button onClick={logout}>Log out</button>*/}
            </div>
          ) : (
            <button
              className=" bg-mainColor flex justify-center items-center px-3 py-2 rounded-lg cursor-pointer outline-none"
              onClick={login}
            >
              <FcGoogle className=" mr-4" /> Sign in with Google
            </button>
          )}

          {/* <GoogleLogin
            onSuccess={handleSuccessResponse}
            onError={handleErrorResponse}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
