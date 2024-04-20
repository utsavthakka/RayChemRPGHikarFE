import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProgressBarWithPercentage from "./Progressbar";
import { cubejsApi } from "../../cubejs/CubeJsApi";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Replace "en" with your desired locale
import { getClasses, getSizes } from "../AddBatch/services";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { images } from "../../config/images";
import {
  electricTestQualityAnalyticsReport,
  AdvanceAnalyticsQualityElectricTest,
} from "./services";
import { Card, CardContent } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";

const dateFormat = "YYYY-MM-DD";

export const QualityElectricTest = () => {
  const { userPermission } = useSelector((state) => state.userState);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectClass] = useState();
  const [size, setSize] = useState([]);
  const [selectSize, setSelectSize] = useState();
  const [successPopup, setSuccessPopup] = useState(false);
  const [isPopup, setisPopup] = useState(false);
  const [ErrorStatus,setErrorStatus] = useState(false);
  const initialState = [
    { position: "Position 1", presentTotal: 0, percentage: "0%" },
    { position: "Position 2", presentTotal: 0, percentage: "0%" },
    { position: "Position 3", presentTotal: 0, percentage: "0%" },
    { position: "Position 4", presentTotal: 0, percentage: "0%" },
    { position: "Position 5", presentTotal: 0, percentage: "0%" },
    { position: "Position 6", presentTotal: 0, percentage: "0%" },
    { position: "Position 7", presentTotal: 0, percentage: "0%" },
    { position: "Position 8", presentTotal: 0, percentage: "0%" },
    { position: "Position 9", presentTotal: 0, percentage: "0%" },
    { position: "Position 10", presentTotal: 0, percentage: "0%" },
    { position: "Position 11", presentTotal: 0, percentage: "0%" },
    { position: "Position 12", presentTotal: 0, percentage: "0%" },
    { position: "Position 13", presentTotal: 0, percentage: "0%" },
    { position: "Position 14", presentTotal: 0, percentage: "0%" },
    { position: "Position 15", presentTotal: 0, percentage: "0%" },
    { position: "High Leakage", presentTotal: 0, percentage: "0%" },
  ];

  const [PostionData, setPostionData] = useState(initialState);

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const getData = async () => {
    try {
      const resp = await getClasses();
      setClasses(resp.data.payload);
      const resp1 = await getSizes();
      setSize(resp1.data.payload);
    } catch (error) {
      console.log(error);
    }
  };
  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleToastMsg = () => {
    toast.error("You don't have access", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const formatStartDate = startDate ? dayjs(startDate).format(dateFormat) : "";
  const formatEndDate = endDate ? dayjs(endDate).format(dateFormat) : "";

  const PositionName1 = [
    { position: "Position 1" },
    { position: "Position 2" },
    { position: "Position 3" },
    { position: "Position 4" },
    { position: "Position 5" },
    { position: "Position 6" },
    { position: "Position 7" },
    { position: "Position 8" },
    { position: "Position 9" },
    { position: "Position 10" },
    { position: "Position 11" },
    { position: "Position 12" },
    { position: "Position 13" },
    { position: "Position 14" },
    { position: "Position 15" },
    { position: "High Leakage" },
  ];

  const positionMap = {
    P1: "Position 1",
    P2: "Position 2",
    P3: "Position 3",
    P4: "Position 4",
    P5: "Position 5",
    P6: "Position 6",
    P7: "Position 7",
    P8: "Position 8",
    P9: "Position 9",
    P10: "Position 10",
    P11: "Position 11",
    P12: "Position 12",
    P13: "Position 13",
    P14: "Position 14",
    P15: "Position 15",
    P16: "High Leakage",
  };

  //AAQET full form is AdvanceAnalyticsQualityElectricTest
  const AAQET_Handle = async () => {
    const params = {
      start_date: formatStartDate,
      end_date: formatEndDate,
    };
    if (selectedClass != "all") {
      params["class_id"] = selectedClass;
    }

    if (selectSize != "all") {
      params["size"] = selectSize;
    }
    try {
      const AAQET = await AdvanceAnalyticsQualityElectricTest(params);
      if (AAQET.status == 200 || AAQET.status == 201) {
        setErrorStatus(false);
        const result = Object.keys(AAQET.data.payload.percentages).map(
          (e, index) => {
            return {
              position: positionMap[e],
              presentTotal: AAQET.data.payload.false_counts[e],
              percentage: AAQET.data.payload.percentages[e] + "%",
            };
          }
        );
        console.log("Result", result);
        if (result) {
          setPostionData(result);
        }
      }
    } catch (e) {
      setErrorStatus(true);
      console.log("error in AAQET_Handle", e);
    }
  };

  useEffect(() => {
    if (formatStartDate && formatEndDate && selectedClass && selectSize) {
      AAQET_Handle(); // api call for get data AdvanceAnalyticsQualityElectricTest for show in bar chart
    }
  }, [formatStartDate, formatEndDate, selectedClass, selectSize]);

  const handleElectricTestReport = async () => {
    setSuccessPopup(true);
    setisPopup(false);
    const name = PostionData.map((data) => data.position);
    const count = PostionData.map((data) => data.presentTotal);
    const percentage = PostionData.map((data) => data.percentage);

    const params = {
      name: name,
      count: count,
      percentage: percentage,
      size_id: selectSize,
      class_id: selectedClass,
      start_date: formatStartDate,
      end_date: formatEndDate,
    };
    try {
      const resp = await electricTestQualityAnalyticsReport(params); // api call for get pdf electricTestQualityAnalyticsReport
      if (resp.data.success == true) {
        setTimeout(() => {
          setSuccessPopup(false);
        }, 3000);
      }
    } catch (error) {
      setSuccessPopup(false);
    }
  };


  const disableStartDate = (date) => {
    if (!endDate) return false; // If no end date is selected, don't disable any dates.
        if(endDate ){
      if (endDate && dayjs(date).isAfter(dayjs(endDate).subtract(1, "year"))) {
        return false; // 'date' is less than one year before 'endDate', not valid as per your requirement
      } else {
        return true; // 'date' is more than one year before 'endDate', valid as per your requirement
      }
     
    }
    // if (dayjs(date).isSame(endDate)) return true;
    if (dayjs(date).isAfter(endDate)) return true;
    return false;
  };

 const disableEndDate = (date) => {
    if (!startDate) return false; // If no start date is selected, don't disable any dates.
    // if (dayjs(date).isSame(startDate)) return true; // Disable the same date as start date.
    if (dayjs(date).isBefore(startDate)) return true; // Disable dates that are before start date.
    if (dayjs(date).isAfter(dayjs(startDate).add(1, "year").subtract(1, "day"))) {
      return true; // Disable dates more than one year after start date.
    }

    return false;
  };

  return (
    <>
      <div className="page-wraper page-space">
        <ToastContainer />
        <div
          className="page-header quality-analytics-page"
          style={{ marginTop: "-181px" }}
        >
          <Link to="/analytics/quality" className="page-back-btn">
            <ArrowBackIcon />
            <span>Quality Analytics</span>
          </Link>
          <div className="header-btn-group">
            <Box style={{ marginBottom: "0" }}>
              <select
                className="form-input-analytics"
                value={selectSize}
                onChange={(event) => setSelectSize(event.target.value)}
                required
              >
                <option value="none" selected disabled hidden>
                  Size
                </option>
                {size.map((element) => (
                  <option value={element.size_id}>{element.size_name}</option>
                ))}
                <option value="all">All</option>
              </select>
            </Box>
            <Box style={{ marginBottom: "0" }}>
              <select
                className="form-input-analytics"
                id="selectedClass"
                value={selectedClass}
                onChange={(event) => setSelectClass(event.target.value)}
                required
              >
                <option value="none" selected disabled hidden>
                  Class
                </option>
                {classes.map((event) => (
                  <option value={event.class_id}>{event.class_name}</option>
                ))}
                <option value="all">All</option>
              </select>
            </Box>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="date-picker-production"
                  label="Start Date"
                  inputFormat="YYYY-MM-DD"
                  format="YYYY-MM-DD"
                  shouldDisableDate={disableStartDate}
                  value={startDate}
                  disableFuture
                  onChange={handleStartDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ width: "70%", background: "#ffff" }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="date-picker-production"
                  label="End Date"
                  inputFormat="YYYY-MM-DD"
                  format="YYYY-MM-DD"
                  shouldDisableDate={disableEndDate}
                  value={endDate}
                  disableFuture
                  onChange={handleEndDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ width: "70%", background: "#ffff" }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>

            {userPermission.find(
              (permission) => permission.module === "Advanced Analytics"
            ).is_editor == true &&
            userPermission.find(
              (permission) => permission.module === "Advanced Analytics"
            ).is_viewer == true ? (
              <button
                className={`page-header-btn-excel page-header-btn-EX`}
                onClick={() => setisPopup(true)}
                disabled={
                  !startDate || !endDate || !selectedClass || !selectSize  || ErrorStatus 
                }
                style={{
                  pointerEvents:
                    !startDate || !endDate || !selectedClass || !selectSize  || ErrorStatus 
                      ? "none"
                      : "auto",
                  opacity:
                    !startDate || !endDate || !selectedClass || !selectSize  || ErrorStatus 
                      ? 0.5
                      : 1,
                }}
              >
                <img src={images.pdfIcon} alt="pdfIcon" />
              </button>
            ) : (
              <button
                className={`page-header-btn-excel page-header-btn-EX`}
                onClick={handleToastMsg}
              >
                <img src={images.pdfIcon} alt="pdfIcon" />
              </button>
            )}
          </div>
        </div>
        <div className="quality-table">
          <div className="table-responsive">
            <TableContainer
              style={{
                border: "1px solid #a9b0bd",
                maxHeight: "60vh",
                background: "#ffff",
                borderRadius: "8px",
              }}
              className="quality-analytics-table"
            >
              <Table aria-label="reports" className="quality-analytics">
                <TableHead
                  style={{ position: "sticky", top: "-7px", zIndex: 9 }}
                >
                  <TableRow>
                    <TableCell>Positions Of Failure</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell style={{ textAlign: "right" }}>
                      Percentage
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody className="quality-tablebody">
                  {PostionData.map((data, index) => {
                    return (
                      <TableRow>
                        <TableCell>
                          <b>{index < 8 ? `0${index + 1}` : index + 1}</b>{" "}
                          {data.position}
                        </TableCell>
                        <TableCell colSpan={14}>
                          <ProgressBarWithPercentage
                            pPresentTotal={data.presentTotal}
                            pPercentage={data.percentage}
                          />
                        </TableCell>
                        <TableCell className="production-percentage">
                          {data.percentage}
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {successPopup && (
                    <>
                      <div className="sendingData">
                        <Card className="card-printer">
                          <CardContent>
                            <h4 className="card-content">
                              <b>
                                Email Sent to Your Mailbox!{" "}
                                <img
                                  src={require("../../assets/images/correctIcon.png")}
                                  style={{ height: "25px", width: "25px" }}
                                  alt="correctIcon"
                                />
                              </b>
                            </h4>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="sending-uid-overlay" on></div>
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className="d-flex justify-content-end ">
            <Link
              to="/rejection-chart"
              style={{ color: "#ffff" }}
              className="quality-btn"
            >
              Rejection Chart
            </Link>
            <Link
              to="/electric-test-class-wise-yield"
              style={{ color: "#ffff" }}
              className="quality-btn"
            >
              Class Wise Yield
            </Link>
            {/* <button className="quality-btn">Percentage Chart</button>
                    <button className="quality-btn">Class Wise Yield</button> */}
          </div>

          {isPopup ? (
            <>
              <div className="sendingdataaaa1">
                <Card className="pairingcard-Approved">
                  <CardContent className="p-0 pairing-status">
                    <h4>Are you sure you want to get the PDF?</h4>
                  </CardContent>
                  <Button
                    className="pairingcard-btn"
                    title="Yes"
                    onClick={() => handleElectricTestReport()}
                  />
                  <Button
                    className="pairingcard-btn"
                    title="No"
                    onClick={() => setisPopup(false)}
                  />
                </Card>
              </div>
            </>
          ) : null}

          <div className="d-flex justify-content-end aborted">
            <p style={{ margin: 0, marginBottom: 0 }}>
              Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169;
              All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
