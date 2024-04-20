import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOutApi } from "../Header/services";

export const Session = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inactivityTimeout = 1000 * 60 * 30;

  let timeoutId;

  const logout = async () => {
    const logoutapi = await LogOutApi();
    if (logoutapi.status === 200) {
      localStorage.clear();
      dispatch({ type: "USER_LOGOUT" }); // Dispatch an action to the Redux store to log the user out
      navigate("/login"); // Navigate to the login page
    }
  };

  const resetLogoutTimer = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(logout, inactivityTimeout);
  };

  useEffect(() => {
    resetLogoutTimer();

    const handleActivity = () => {
      resetLogoutTimer();
    };

    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("click", handleActivity);
    document.addEventListener("keydown", handleActivity);
    document.addEventListener("touchstart", handleActivity);

    return () => {
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("click", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      document.removeEventListener("touchstart", handleActivity);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      {/* Render your data or other components here */}
    </div>
  );
};
