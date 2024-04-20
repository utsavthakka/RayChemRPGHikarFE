import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DispatchTabs from "./DispatchTabs";
import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { images } from "../../config/images";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Replace "en" with your desired locale

const dateFormat = "YYYY-MM-DD"; // Replace with your desired date format
function SalesSummary(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const formatStartDate = startDate ? dayjs(startDate).format(dateFormat) : "";
  const formatEndDate = endDate ? dayjs(endDate).format(dateFormat) : "";

// props.handleExcelSalesSummary()

const handleGetPDF = () => {

}

  return (
    <>
      <div>
        {/* <div className="page-header">
          <Link to="/analytics" className="page-back-btn">
            <ArrowBackIcon />
            <span>Dispatch & Sales</span>
          </Link>
          <div className="header-btn-group">
            <Box className="header-btn-date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={startDate}
                  inputFormat="DD/MM/YYYY"
                  views={["day"]}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ width: "70%", background: "#ffff" }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box className="header-btn-month">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  inputFormat="DD/MM/YYYY"
                  views={["day"]}
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ width: "70%", background: "#ffff" }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <button
              className={`page-header-btn-excel`}
              onClick={() => handleGetPDF()}
            >
              <img src={images.pdfIcon} alt="" />
            </button>
          </div>
        </div> */}

        <DispatchTabs
          startDate={formatStartDate}
          endDate={formatEndDate}
          handleGetPDF={handleGetPDF}
        />
      </div>
    </>
  );
}
export default SalesSummary;
