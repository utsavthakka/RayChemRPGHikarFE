import React from "react";
import { Routes, Route } from "react-router-dom";
import ViewReport from "../containers/ViewReport";
import SendDocs from "../containers/SendDocs";
import "../App.css";
import Login from "../containers/login/login";
import CustomerPortal from "../containers/CustomerPortal/CustomerPortal";
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";

const UnAuthenticationRoutes = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const isPathAllowed = (path) => {
    const regexPatterns = [
      /^\/uid\/[^/]+$/,  // matches /uid/:id
      /^\/send-docs$/,
      /^\/box\/[^/]+$/, // matches /box/:id
      /^\/login$/,
      /^\/UID\/[^/]+$/,
      /^\/SEND-DOCS$/,
      /^\/BOX\/[^/]+$/,
    ];

    return regexPatterns.some(pattern => pattern.test(path));
  };

  useEffect(()=>{
    if (!isPathAllowed(currentPath)) {
      navigate('/login');
    }
    
  },[currentPath,navigate])
 
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />
      <Route path="/uid/:id" element={<ViewReport />} />
      <Route path="/send-docs" element={<SendDocs />} />
      <Route path="/box/:id" element={<CustomerPortal />}/>
    </Routes>
  );
};
export default UnAuthenticationRoutes;
