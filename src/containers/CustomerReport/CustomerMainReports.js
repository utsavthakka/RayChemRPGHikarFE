import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomerReportsTabs from "./Tabs";

function CustomerMainReport() {
  const [DC, setDC] = useState(true);
  const [RTR, setRTR] = useState(true);
  const [viewReport, setViewReport] = useState(true);
  const [testReport, setTestReport] = useState(true);

  // Handle click event for back button
  const handleBack = () => {
    setDC(true);
    setRTR(true);
    setViewReport(true);
    setTestReport(true);
  };

  // Handle click event for DC button
  const handleDcClick = () => {
    setDC(false);
    setTestReport(false);
  };

  // Handle click event for RTR button
  const handleRTRClick = () => {
    setRTR(false);
    setDC(false);
    setTestReport(false);
  };

  // Handle click event for View Batch Report button
  const handleViewBatchReport = () => {
    setViewReport(false);
    setTestReport(false);
  };

  return (
    <>
      <div className="dashboard-wrapper page-wraper">
        <div className="page-header">
          {DC && RTR && viewReport ? (
            <>
              <Link to="/dashboard" className="page-back-btn">
                <ArrowBackIcon />
                <span>Customer Reports</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="" className="page-back-btn" onClick={handleBack}>
                <ArrowBackIcon />
                <span>Customer Reports</span>
              </Link>
            </>
          )}
        </div>
        <CustomerReportsTabs
          DC={DC}
          handleDcClick={handleDcClick}
          RTR={RTR}
          handleRTRClick={handleRTRClick}
          handleViewBatchReport={handleViewBatchReport}
          viewReport={viewReport}
          testReport={testReport}
        />
      </div>
    </>
  );
}
export default CustomerMainReport;
