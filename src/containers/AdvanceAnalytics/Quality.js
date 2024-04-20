import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../AdvanceAnalytics/Analytics.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "../AdvanceAnalytics/Quality.css";
import { getClasses, getSizes } from "../AddBatch/services";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { images } from "../../config/images";
import { cubejsApi } from "../../cubejs/CubeJsApi";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Replace "en" with your desired locale
import {
  qualityReport,
  ETandVIQualityElectricTest,
  advanceAnalyticsQualityElectricTest,
} from "./services";
import { Card, CardContent } from "@material-ui/core";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";

const dateFormat = "YYYY-MM-DD"; // Replace with your desired date format

const Quality = () => {
  const [quality, setQuality] = useState(true);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectClass] = useState();
  const [size, setSize] = useState([]);
  const [selectSize, setSelectSize] = useState();
  const [qualityAnalytics, setQualityAnalytics] = useState(false);
  const [percentageChart, setPercentageChart] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [successPopup, setSuccessPopup] = useState(false);
  const [isPopup, setisPopup] = useState(false);

  const [pPercentage, setpPercentage] = useState({
    pPercentage1: 0,
    pPercentage2: 0,
    pPercentage3: 0,
    pPercentage4: 0,
    pPercentage5: 0,
    pPercentage6: 0,
    pPercentage7: 0,
    pPercentage8: 0,
    pPercentage9: 0,
    pPercentage10: 0,
    pPercentage11: 0,
    pPercentage12: 0,
    pPercentage13: 0,
    pPercentage14: 0,
    pPercentage15: 0,
    pPercentage16: 0,
  });

  const [vPercentage, setVpercentage] = useState({
    vPercentage1: 0,
    vPercentage2: 0,
    vPercentage3: 0,
    vPercentage4: 0,
    vPercentage5: 0,
    vPercentage6: 0,
    vPercentage7: 0,
    vPercentage8: 0,
    vPercentage9: 0,
    vPercentage10: 0,
    vPercentage11: 0,
    vPercentage12: 0,
    vPercentage13: 0,
    vPercentage14: 0,
    vPercentage15: 0,
  });
  const [ErrorStatus,setErrorStatus] = useState(false);
  const { userPermission } = useSelector((state) => state.userState);
  const formatStartDate = startDate ? dayjs(startDate).format(dateFormat) : "";
  const formatEndDate = endDate ? dayjs(endDate).format(dateFormat) : "";


  useEffect(() => {
    if (selectedClass && selectSize && formatStartDate && formatEndDate) {
      handleElectricTestapi();
      handleVisualInspectionapi();
    }
  }, [formatStartDate, formatEndDate]);

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const handleElectricTestapi = async () => {
    const params = {
      start_date: formatStartDate,
      end_date: formatEndDate,
    };
    if (selectSize != "all") {
      params["size"] = selectSize;
    }
    if (selectedClass != "all") {
      params["class_id"] = selectedClass;
    }
    try {
      const VI_api = await advanceAnalyticsQualityElectricTest(params);
      const VI_data = VI_api.data.payload;

      setpPercentage({
        pPercentage1: VI_data.percentages.P1,
        pPercentage2: VI_data.percentages.P2,
        pPercentage3: VI_data.percentages.P3,
        pPercentage4: VI_data.percentages.P4,
        pPercentage5: VI_data.percentages.P5,
        pPercentage6: VI_data.percentages.P6,
        pPercentage7: VI_data.percentages.P7,
        pPercentage8: VI_data.percentages.P8,
        pPercentage9: VI_data.percentages.P9,
        pPercentage10: VI_data.percentages.P10,
        pPercentage11: VI_data.percentages.P11,
        pPercentage12: VI_data.percentages.P12,
        pPercentage13: VI_data.percentages.P13,
        pPercentage14: VI_data.percentages.P14,
        pPercentage15: VI_data.percentages.P15,
      });
    } catch (e) {
      console.log("Error in handleVisualInspectionapi", e);
    }
  };
  const handleVisualInspectionapi = async () => {
    const params = {
      start_date: formatStartDate,
      end_date: formatEndDate,
    };

    if (selectSize != "all") {
      params["size"] = selectSize;
    }
    if (selectedClass != "all") {
      params["class_id"] = selectedClass;
    }
    try {
      const ET_api = await ETandVIQualityElectricTest(params);
      const data = ET_api.data.payload;

      const Structure_data = {};
      setErrorStatus(false);
      data.map(
        (data, index) =>
          (Structure_data[`vPercentage${index + 1}`] = data.percentage)
      );
      setVpercentage(Structure_data);
      // console.log("Structure_data", Structure_data);
    } catch (e) {
      setErrorStatus(true);
      console.log("Error in handleVisualInspectionapi", e);
    }
  };

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

  const handleBack = () => {
    setQuality(true);
    setQualityAnalytics(false);
    setPercentageChart(false);
  };

  const handleQualityExcel = async () => {
    setisPopup(false);
    setSuccessPopup(true);
    const params = {
      position1: [
        "P1",
        isNaN(pPercentage.pPercentage1) ? "0%" : `${pPercentage.pPercentage1}%`,
        isNaN(vPercentage.vPercentage1) ? "0%" : `${vPercentage.vPercentage1}%`,
      ],
      position2: [
        "P2",
        isNaN(pPercentage.pPercentage2) ? "0%" : `${pPercentage.pPercentage2}%`,
        isNaN(vPercentage.vPercentage2) ? "0%" : `${vPercentage.vPercentage2}%`,
      ],
      position3: [
        "P3",
        isNaN(pPercentage.pPercentage3) ? "0%" : `${pPercentage.pPercentage3}%`,
        isNaN(vPercentage.vPercentage3) ? "0%" : `${vPercentage.vPercentage3}%`,
      ],
      position4: [
        "P4",
        isNaN(pPercentage.pPercentage4) ? "0%" : `${pPercentage.pPercentage4}%`,
        isNaN(vPercentage.vPercentage4) ? "0%" : `${vPercentage.vPercentage4}%`,
      ],
      position5: [
        "P5",
        isNaN(pPercentage.pPercentage5) ? "0%" : `${pPercentage.pPercentage5}%`,
        isNaN(vPercentage.vPercentage5) ? "0%" : `${vPercentage.vPercentage5}%`,
      ],
      position6: [
        "P6",
        isNaN(pPercentage.pPercentage6) ? "0%" : `${pPercentage.pPercentage6}%`,
        isNaN(vPercentage.vPercentage6) ? "0%" : `${vPercentage.vPercentage6}%`,
      ],
      position7: [
        "P7",
        isNaN(pPercentage.pPercentage7) ? "0%" : `${pPercentage.pPercentage7}%`,
        isNaN(vPercentage.vPercentage7) ? "0%" : `${vPercentage.vPercentage7}%`,
      ],
      position8: [
        "P8",
        isNaN(pPercentage.pPercentage8) ? "0%" : `${pPercentage.pPercentage8}%`,
        isNaN(vPercentage.vPercentage8) ? "0%" : `${vPercentage.vPercentage8}%`,
      ],
      position9: [
        "P9",
        isNaN(pPercentage.pPercentage9) ? "0%" : `${pPercentage.pPercentage9}%`,
        isNaN(vPercentage.vPercentage9) ? "0%" : `${vPercentage.vPercentage9}%`,
      ],
      position10: [
        "P10",
        isNaN(pPercentage.pPercentage10)
          ? "0%"
          : `${pPercentage.pPercentage10}%`,
        isNaN(vPercentage.vPercentage10)
          ? "0%"
          : `${vPercentage.vPercentage10}%`,
      ],
      position11: [
        "P11",
        isNaN(pPercentage.pPercentage11)
          ? "0%"
          : `${pPercentage.pPercentage11}%`,
        isNaN(vPercentage.vPercentage11)
          ? "0%"
          : `${vPercentage.vPercentage11}%`,
      ],
      position12: [
        "P12",
        isNaN(pPercentage.pPercentage12)
          ? "0%"
          : `${pPercentage.pPercentage12}%`,
        isNaN(vPercentage.vPercentage12)
          ? "0%"
          : `${vPercentage.vPercentage12}%`,
      ],
      position13: [
        "P13",
        isNaN(pPercentage.pPercentage13)
          ? "0%"
          : `${pPercentage.pPercentage13}%`,
        isNaN(vPercentage.vPercentage13)
          ? "0%"
          : `${vPercentage.vPercentage13}%`,
      ],
      position14: [
        "P14",
        isNaN(pPercentage.pPercentage14)
          ? "0%"
          : `${pPercentage.pPercentage14}%`,
        isNaN(vPercentage.vPercentage14)
          ? "0%"
          : `${vPercentage.vPercentage14}%`,
      ],
      position15: [
        "P15",
        isNaN(pPercentage.pPercentage15)
          ? "0%"
          : `${pPercentage.pPercentage15}%`,
        isNaN(vPercentage.vPercentage15)
          ? "0%"
          : `${vPercentage.vPercentage15}%`,
      ],
      size_id: selectSize,
      class_id: selectedClass,
      start_date: formatStartDate,
      end_date: formatEndDate,
    };
    console.log("paramsparamsparams", params);
    try {
      const resp = await qualityReport(params);
      if (resp.data.success == true) {
        setSuccessPopup(false);
      }
    } catch (error) {
      setSuccessPopup(false);
      console.log("error");
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
    if (endDate) {
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
    if (
      dayjs(date).isAfter(dayjs(startDate).add(1, "year").subtract(1, "day"))
    ) {
      return true; // Disable dates more than one year after start date.
    }

    return false;
  };
  return (
    <div className="page-wraper">
      <ToastContainer />
      <>
        <div className="page-header">
          <Link to="/analytics" className="page-back-btn" onClick={handleBack}>
            <ArrowBackIcon />
            <span>Summary : Quality</span>
          </Link>
          <div className="header-btn-group">
            <Link
              to="/quality-analytics"
              className="page-header-btn quality-analytics"
            >
              Quality Analytics
            </Link>
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
                  className="Quailty-DatePicker"
                  label="Start Date"
                  value={startDate}
                  inputFormat="YYYY-MM-DD"
                  format="YYYY-MM-DD"
                  disableFuture
                  shouldDisableDate={disableStartDate}
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
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="Quailty-DatePicker"
                  label="End Date"
                  value={endDate}
                  inputFormat="YYYY-MM-DD"
                  format="YYYY-MM-DD"
                  disableFuture
                  shouldDisableDate={disableEndDate}
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
        <div className="d-flex position-relative">
          <div style={{ width: "25%" }} className="d-flex ">
            <div style={{ width: "50%" }} className="quality-column">
              <div className="quality-tooltip">
                <div className="d-flex">
                  <div className="tooltip-head ">P2</div>
                  <p className="tooltip-text">
                    ET -{" "}
                    {isNaN(pPercentage.pPercentage2)
                      ? "0%"
                      : `${pPercentage.pPercentage2}%`}
                  </p>
                </div>
                <p className="toottip-title">
                  VI -{" "}
                  {isNaN(vPercentage.vPercentage2)
                    ? "0%"
                    : `${vPercentage.vPercentage2}%`}
                </p>
                <div className="analytics-tooltip"></div>
                <div className="anlytics-border-p2"></div>
              </div>

              <div className="quality-tooltip">
                <div className="d-flex">
                  <div className="tooltip-head ">P1</div>
                  <p className="tooltip-text">
                    ET -{" "}
                    {isNaN(pPercentage.pPercentage1)
                      ? "0%"
                      : `${pPercentage.pPercentage1}%`}
                  </p>
                </div>
                <p className="toottip-title">
                  VI -{" "}
                  {isNaN(vPercentage.vPercentage1)
                    ? "0%"
                    : `${vPercentage.vPercentage1}%`}
                </p>
                <div className="analytics-tooltip"></div>
                <div className="anlytics-border-p1"></div>
              </div>

              <div className="quality-tooltip">
                <div className="d-flex">
                  <div className="tooltip-head ">P10</div>
                  <p className="tooltip-text">
                    ET -{" "}
                    {isNaN(pPercentage.pPercentage10)
                      ? "0%"
                      : `${pPercentage.pPercentage10}%`}
                  </p>
                </div>
                <p className="toottip-title">
                  VI -{" "}
                  {isNaN(vPercentage.vPercentage10)
                    ? "0%"
                    : `${vPercentage.vPercentage10}%`}
                </p>
                <div className="analytics-tooltip"></div>
                <div className="anlytics-border-p10"></div>
              </div>

              <div className="quality-tooltip">
                <div className="d-flex">
                  <div className="tooltip-head ">P13</div>
                  <p className="tooltip-text">
                    ET -{" "}
                    {isNaN(pPercentage.pPercentage13)
                      ? "0%"
                      : `${pPercentage.pPercentage13}%`}
                  </p>
                </div>
                <p className="toottip-title">
                  VI -{" "}
                  {isNaN(vPercentage.vPercentage13)
                    ? "0%"
                    : `${vPercentage.vPercentage13}%`}
                </p>
                <div className="analytics-tooltip"></div>
                <div className="anlytics-border-p13"></div>
              </div>
            </div>

            <div style={{ width: "50%" }} className="quality-column1">
              <div className="quality-tooltip">
                <div className="d-flex">
                  <div className="tooltip-head ">P5</div>
                  <p className="tooltip-text">
                    ET -
                    {isNaN(pPercentage.pPercentage5)
                      ? "0%"
                      : `${pPercentage.pPercentage5}%`}
                  </p>
                </div>
                <p className="toottip-title">
                  VI -{" "}
                  {isNaN(vPercentage.vPercentage5)
                    ? "0%"
                    : `${vPercentage.vPercentage5}%`}
                </p>
                <div className="analytics-tooltip"></div>
                <div className="analytics-border"></div>
              </div>

              <div className="quality-tooltip">
                <div className="d-flex">
                  <div className="tooltip-head ">P3</div>
                  <p className="tooltip-text">
                    ET -{" "}
                    {isNaN(pPercentage.pPercentage3)
                      ? "0%"
                      : `${pPercentage.pPercentage3}%`}
                  </p>
                </div>
                <p className="toottip-title">
                  VI -{" "}
                  {isNaN(vPercentage.vPercentage3)
                    ? "0%"
                    : `${vPercentage.vPercentage3}%`}
                </p>
                <div className="analytics-tooltip"></div>
                <div className="anlytics-border-p3"></div>
              </div>

              <div className="quality-tooltip">
                <div className="d-flex">
                  <div className="tooltip-head ">P4</div>
                  <p className="tooltip-text">
                    ET -{" "}
                    {isNaN(pPercentage.pPercentage4)
                      ? "0%"
                      : `${pPercentage.pPercentage4}%`}
                  </p>
                </div>
                <p className="toottip-title">
                  VI -{" "}
                  {isNaN(vPercentage.vPercentage4)
                    ? "0%"
                    : `${vPercentage.vPercentage4}%`}
                </p>
                <div className="analytics-tooltip"></div>
                <div className="anlytics-border-p4"></div>
              </div>

              <div className="quality-tooltip">
                <div className="d-flex">
                  <div className="tooltip-head ">P12</div>
                  <p className="tooltip-text">
                    ET -{" "}
                    {isNaN(pPercentage.pPercentage12)
                      ? "0%"
                      : `${pPercentage.pPercentage12}%`}
                  </p>
                </div>
                <p className="toottip-title">
                  VI -{" "}
                  {isNaN(vPercentage.vPercentage12)
                    ? "0%"
                    : `${vPercentage.vPercentage12}%`}
                </p>
                <div className="analytics-tooltip"></div>
                <div className="anlytics-border-p12"></div>
              </div>
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div className="Quality-img">
              <img
                src={images.qualityGloves}
                className="Quality-img-analytics"
                alt="qualityGloves-img"
              />
            </div>
          </div>
          <div style={{ width: "25%" }} className="d-flex">
            <div style={{ width: "50%" }} className="quality-column1">
              <div className="quality-tooltip ">
                <div className="d-flex">
                  <div className="tooltip-head1">P9</div>
                  <p className="tooltip-text tooltip-text1 ">
                    ET -{" "}
                    {isNaN(pPercentage.pPercentage9)
                      ? "0%"
                      : `${pPercentage.pPercentage9}%`}
                  </p>
                </div>
                <p className="toottip-title">
                  VI -{" "}
                  {isNaN(vPercentage.vPercentage9)
                    ? "0%"
                    : `${vPercentage.vPercentage9}%`}
                </p>
                <div className="quality-analytics-tooltip"></div>
                <div className="anlytics-border-p9"></div>
              </div>

              <div className="quality-tooltip">
                <div className="d-flex">
                  <div className="tooltip-head1">P7</div>
                  <p className="tooltip-text tooltip-text1 ">
                    ET -{" "}
                    {isNaN(pPercentage.pPercentage7)
                      ? "0%"
                      : `${pPercentage.pPercentage7}%`}
                  </p>
                </div>
                <p className="toottip-title">
                  VI -{" "}
                  {isNaN(vPercentage.vPercentage7)
                    ? "0%"
                    : `${vPercentage.vPercentage7}%`}
                </p>
                <div className="quality-analytics-tooltip"></div>
                <div className="anlytics-border-p7"></div>
              </div>

              <div className="quality-tooltip">
                <div className="d-flex">
                  <div className="tooltip-head1">P11</div>
                  <p className="tooltip-text tooltip-text1 ">
                    ET -{" "}
                    {isNaN(pPercentage.pPercentage11)
                      ? "0%"
                      : `${pPercentage.pPercentage11}%`}
                  </p>
                </div>
                <p className="toottip-title">
                  VI -{" "}
                  {isNaN(vPercentage.vPercentage11)
                    ? "0%"
                    : `${vPercentage.vPercentage11}%`}
                </p>
                <div className="quality-analytics-tooltip"></div>
                <div className="anlytics-border-p11"></div>
              </div>

              <div className="quality-tooltip">
                <div className="d-flex">
                  <div className="tooltip-head1">P15</div>
                  <p className="tooltip-text tooltip-text1 ">
                    ET -{" "}
                    {isNaN(pPercentage.pPercentage15)
                      ? "0%"
                      : `${pPercentage.pPercentage15}%`}
                  </p>
                </div>
                <p className="toottip-title">
                  VI -{" "}
                  {isNaN(vPercentage.vPercentage15)
                    ? "0%"
                    : `${vPercentage.vPercentage15}%`}
                </p>
                <div className="quality-analytics-tooltip"></div>
                <div className="anlytics-border-p15"></div>
              </div>
            </div>
            <div style={{ width: "50%" }} className="quality-column">
              <div className="quality-tooltip ">
                <div className="d-flex">
                  <div className="tooltip-head1">P8</div>
                  <p className="tooltip-text tooltip-text1 ">
                    ET -{" "}
                    {isNaN(pPercentage.pPercentage8)
                      ? "0%"
                      : `${pPercentage.pPercentage8}%`}
                  </p>
                </div>
                <p className="toottip-title">
                  VI -{" "}
                  {isNaN(vPercentage.vPercentage8)
                    ? "0%"
                    : `${vPercentage.vPercentage8}%`}
                </p>
                <div className="quality-analytics-tooltip"></div>
                <div className="anlytics-border-p8"></div>
              </div>

              <div className="quality-tooltip">
                <div className="d-flex">
                  <div className="tooltip-head1">P6</div>
                  <p className="tooltip-text tooltip-text1 ">
                    ET -{" "}
                    {isNaN(pPercentage.pPercentage6)
                      ? "0%"
                      : `${pPercentage.pPercentage6}%`}
                  </p>
                </div>
                <p className="toottip-title">
                  VI -{" "}
                  {isNaN(vPercentage.vPercentage6)
                    ? "0%"
                    : `${vPercentage.vPercentage6}%`}
                </p>
                <div className="quality-analytics-tooltip"></div>
                <div className="anlytics-border-p6"></div>
              </div>

              <div className="quality-tooltip">
                <div className="d-flex">
                  <div className="tooltip-head1">P14</div>
                  <p className="tooltip-text tooltip-text1 ">
                    ET -{" "}
                    {isNaN(pPercentage.pPercentage14)
                      ? "0%"
                      : `${pPercentage.pPercentage14}%`}
                  </p>
                </div>
                <p className="toottip-title">
                  VI -{" "}
                  {isNaN(vPercentage.vPercentage14)
                    ? "0%"
                    : `${vPercentage.vPercentage14}%`}
                </p>
                <div className="quality-analytics-tooltip"></div>
                <div className="anlytics-border-p14"></div>
              </div>
            </div>
          </div>
        </div>

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
                  onClick={() => handleQualityExcel()}
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
            Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
            Rights Reserved
          </p>
        </div>
      </>
    </div>
  );
};

export default Quality;
