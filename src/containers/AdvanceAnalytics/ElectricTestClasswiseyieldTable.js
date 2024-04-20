import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

import { images } from "../../config/images";
import { cubejsApi } from "../../cubejs/CubeJsApi";
import ClasswiseyieldChart from "./ClasswiseyieldChart";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Replace "en" with your desired locale
import {
  visualInspectionClassWiseSummaryReport,
  ETQualityClassWiseYieldCount,
  generateETQualityClassWiseYieldReport,
} from "./services";
import { Card, CardContent } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getClasses, getSizes } from "../AddBatch/services";
import Button from "../../components/Button/Button";

const dateFormat = "YYYY-MM-DD"; // Replace with your desired date format

function ElectricClassWiseChart() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [successPopup, setSuccessPopup] = useState(false);
  const [Class_id, setClass_id] = useState([]);
  const [isPopup, setisPopup] = useState(false);
  const [isErrorPopup, setisErrorPopup] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [ErrorStatus,setErrorStatus] = useState(false);

  const [qualityResult, setQualityResult] = useState({
    Testedv1: 0,
    Testedv2: 0,
    Testedv3: 0,
    Testedv4: 0,
    Testedv5: 0,
    Testedv6: 0,
    Acceptedv1: 0,
    Acceptedv2: 0,
    Acceptedv3: 0,
    Acceptedv4: 0,
    Acceptedv5: 0,
    Acceptedv6: 0,
    Rejectedv1: 0,
    Rejectedv2: 0,
    Rejectedv3: 0,
    Rejectedv4: 0,
    Rejectedv5: 0,
    Rejectedv6: 0,
  });

  const { userPermission } = useSelector((state) => state.userState);

  useEffect(async () => {
    const GetclassApi = await getClasses();
    const api_data = GetclassApi.data.payload;
    if (api_data) {
      const classIds = api_data.map((item) => item.class_id);
      setClass_id(...Class_id, classIds);
    }
  }, []);
  useEffect(() => {
    handleClasswise();
  }, [startDate, endDate]);

  const formatStartDate = startDate ? dayjs(startDate).format(dateFormat) : "";
  const formatEndDate = endDate ? dayjs(endDate).format(dateFormat) : "";

  const handleToastMsgDateTimeValidation = (message) => {
    toast.error(message, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleClasswise = async () => {
    if (formatStartDate && formatEndDate) {
      const params = {
        class_id: Class_id,
        start_date: formatStartDate,
        end_date: formatEndDate,
      };
      try {
        const api = await ETQualityClassWiseYieldCount(params);
        if (api.status == 200 || api.status == 201) {
          console.log("api", api.data.payload);
          const data = api.data.payload;
          setErrorStatus(false);
          setQualityResult({
            Testedv1: data.class_1.tested,
            Testedv2: data.class_2.tested,
            Testedv3: data.class_3.tested,
            Testedv4: data.class_4.tested,
            Testedv5: data.class_5.tested,
            Testedv6: data.class_6.tested,
            Acceptedv1: data.class_1.accepted,
            Acceptedv2: data.class_2.accepted,
            Acceptedv3: data.class_3.accepted,
            Acceptedv4: data.class_4.accepted,
            Acceptedv5: data.class_5.accepted,
            Acceptedv6: data.class_6.accepted,
            Rejectedv1: data.class_1.rejected,
            Rejectedv2: data.class_2.rejected,
            Rejectedv3: data.class_3.rejected,
            Rejectedv4: data.class_4.rejected,
            Rejectedv5: data.class_5.rejected,
            Rejectedv6: data.class_6.rejected,
          });
        }
      } catch (e) {
        console.log("Error from finalVisualClassWiseYieldCount", e);
        console.log("e.data", e.response.data.message);
        handleToastMsgDateTimeValidation(e.response.data.message);
        setErrorStatus(true);
        setQualityResult({
          Testedv1: 0,
          Testedv2: 0,
          Testedv3: 0,
          Testedv4: 0,
          Testedv5: 0,
          Testedv6: 0,
          Acceptedv1: 0,
          Acceptedv2: 0,
          Acceptedv3: 0,
          Acceptedv4: 0,
          Acceptedv5: 0,
          Acceptedv6: 0,
          Rejectedv1: 0,
          Rejectedv2: 0,
          Rejectedv3: 0,
          Rejectedv4: 0,
          Rejectedv5: 0,
          Rejectedv6: 0,
        });
      }
    }
  };

  const handleClassWiseYield = async () => {
    setSuccessPopup(true);
    setisPopup(false);
    const params = {
      tested_class00: isNaN(qualityResult.Testedv1)
        ? 0
        : qualityResult.Testedv1,
      accepted_class00: isNaN(qualityResult.Acceptedv1)
        ? 0
        : qualityResult.Acceptedv1,
      rejected_class00: isNaN(qualityResult.Rejectedv1)
        ? 0
        : qualityResult.Rejectedv1,
      tested_class0: isNaN(qualityResult.Testedv2) ? 0 : qualityResult.Testedv2,
      accepted_class0: isNaN(qualityResult.Acceptedv2)
        ? 0
        : qualityResult.Acceptedv2,
      rejected_class0: isNaN(qualityResult.Rejectedv2)
        ? 0
        : qualityResult.Rejectedv2,
      tested_class1: isNaN(qualityResult.Testedv3) ? 0 : qualityResult.Testedv3,
      accepted_class1: isNaN(qualityResult.Acceptedv3)
        ? 0
        : qualityResult.Acceptedv3,
      rejected_class1: isNaN(qualityResult.Rejectedv3)
        ? 0
        : qualityResult.Rejectedv3,
      tested_class2: isNaN(qualityResult.Testedv4) ? 0 : qualityResult.Testedv4,
      accepted_class2: isNaN(qualityResult.Acceptedv4)
        ? 0
        : qualityResult.Acceptedv4,
      rejected_class2: isNaN(qualityResult.Rejectedv4)
        ? 0
        : qualityResult.Rejectedv4,
      tested_class3: isNaN(qualityResult.Testedv5) ? 0 : qualityResult.Testedv5,
      accepted_class3: isNaN(qualityResult.Acceptedv5)
        ? 0
        : qualityResult.Acceptedv5,
      rejected_class3: isNaN(qualityResult.Rejectedv5)
        ? 0
        : qualityResult.Rejectedv5,
      tested_class4: isNaN(qualityResult.Testedv6) ? 0 : qualityResult.Testedv6,
      accepted_class4: isNaN(qualityResult.Acceptedv6)
        ? 0
        : qualityResult.Acceptedv6,
      rejected_class4: isNaN(qualityResult.Rejectedv6)
        ? 0
        : qualityResult.Rejectedv6,
      start_date: formatStartDate,
      end_date: formatEndDate,
    };
    try {
      const resp = await generateETQualityClassWiseYieldReport(params);
      if (resp.data.success == true) {
        setSuccessPopup(false);
      }
    } catch (error) {
      setSuccessPopup(false);
      console.log("error", error.response.data.message);
      setErrorMessage(error.response.data.message);
      setisErrorPopup(true);
    }
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
      <div className="page-wraper">
        <ToastContainer />
        <div className="page-header">
          <Link to="/quality-analytics" className="page-back-btn">
            <ArrowBackIcon />
            <span>Electrical Test</span>
          </Link>
          <div className="header-btn-group">
            <Box className="header-btn-date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  inputFormat="YYYY-MM-DD"
                  format="YYYY-MM-DD"
                  disableFuture
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  shouldDisableDate={disableStartDate}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ width: "70%", background: "#ffff" }}
                    />
                  )}
                  className="DatePicker"
                />
              </LocalizationProvider>
            </Box>
            <Box className="header-btn-month">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  inputFormat="YYYY-MM-DD"
                  format="YYYY-MM-DD"
                  disableFuture
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  shouldDisableDate={disableEndDate}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ width: "70%", background: "#ffff" }}
                    />
                  )}
                  className="DatePicker"
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
                className={`page-header-btn-excel`}
                onClick={() => setisPopup(true)}
                disabled={!startDate || !endDate || ErrorStatus}
                style={{
                  pointerEvents: !startDate || !endDate || ErrorStatus ? "none" : "auto",
                  opacity: !startDate || !endDate || ErrorStatus ? 0.5 : 1,
                }}
              >
                <img src={images.pdfIcon} alt="" />
              </button>
            ) : (
              <button
                className={`page-header-btn-excel`}
                onClick={handleToastMsg}
              >
                <img src={images.pdfIcon} alt="" />
              </button>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between batchNo p-card">
          <h4>
            <b>Class Wise Yield</b>
          </h4>
        </div>
        <div className="production-qty">
          <ClasswiseyieldChart
            startDate={formatStartDate}
            endDate={formatEndDate}
            qualityResult={qualityResult}
          />
        </div>
        <div className="table-responsive production-table">
          <Table aria-label="Analytics">
            <TableHead>
              <TableRow>
                <TableCell>Parameters</TableCell>
                <TableCell>Class 00</TableCell>
                <TableCell>Class 0</TableCell>
                <TableCell>Class 1</TableCell>
                <TableCell>Class 2</TableCell>
                <TableCell>Class 3</TableCell>
                <TableCell>Class 4</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="production-tablebody">
              <TableRow>
                <TableCell>
                  <div
                    style={{ color: "black", marginRight: "25px" }}
                    className="d-flex align-items-center"
                  >
                    <span className="export-btn m-1"></span>Tested
                  </div>
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Testedv1) ? 0 : qualityResult.Testedv1}
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Testedv2) ? 0 : qualityResult.Testedv2}
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Testedv3) ? 0 : qualityResult.Testedv3}
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Testedv4) ? 0 : qualityResult.Testedv4}
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Testedv5) ? 0 : qualityResult.Testedv5}
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Testedv6) ? 0 : qualityResult.Testedv6}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div
                    style={{ color: "black", marginRight: "25px" }}
                    className="d-flex align-items-center"
                  >
                    <span className="acceptedparam-btn m-1"></span>Accepted
                  </div>
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Acceptedv1)
                    ? 0
                    : qualityResult.Acceptedv1}
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Acceptedv2)
                    ? 0
                    : qualityResult.Acceptedv2}
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Acceptedv3)
                    ? 0
                    : qualityResult.Acceptedv3}
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Acceptedv4)
                    ? 0
                    : qualityResult.Acceptedv4}
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Acceptedv5)
                    ? 0
                    : qualityResult.Acceptedv5}
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Acceptedv6)
                    ? 0
                    : qualityResult.Acceptedv6}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div
                    style={{ color: "black", marginRight: "25px" }}
                    className="d-flex align-items-center"
                  >
                    <span className="rejectedparam-btn m-1"></span>Rejected
                  </div>
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Rejectedv1)
                    ? 0
                    : qualityResult.Rejectedv1}
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Rejectedv2)
                    ? 0
                    : qualityResult.Rejectedv2}
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Rejectedv3)
                    ? 0
                    : qualityResult.Rejectedv3}
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Rejectedv4)
                    ? 0
                    : qualityResult.Rejectedv4}
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Rejectedv5)
                    ? 0
                    : qualityResult.Rejectedv5}
                </TableCell>
                <TableCell>
                  {isNaN(qualityResult.Rejectedv6)
                    ? 0
                    : qualityResult.Rejectedv6}
                </TableCell>
              </TableRow>

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
                  onClick={() => handleClassWiseYield()}
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

        {isErrorPopup ? (
          <>
            <div className="sendingdataaaa1">
              <Card className="pairingcard-Approved">
                <CardContent className="p-0 pairing-status">
                  <h4>{ErrorMessage}</h4>
                </CardContent>

                <Button
                  className="pairingcard-btn"
                  title="Close"
                  onClick={() => setisErrorPopup(false)}
                />
              </Card>
            </div>
          </>
        ) : null}

        <div className="d-flex justify-content-end aborted">
          <p style={{ margin: 0, marginBottom: 0 }}>
            Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
            Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
}
export default ElectricClassWiseChart;
