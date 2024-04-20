import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../containers/AdvanceAnalytics/Quality.css";
import { cubejsApi } from "../../cubejs/CubeJsApi";
import VisualInspectionProgressBar from "./VisualInspectionProgressbar";
import { ToastContainer, toast } from "react-toastify";
import { images } from "../../config/images";
import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Replace "en" with your desired locale
import { getClasses, getSizes } from "../AddBatch/services";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  getAdvanceAnalyticsQualityVisual,
  visualInspectionQualityAnalyticsReport,
} from "./services";
import { Card, CardContent } from "@material-ui/core";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";

const dateFormat = "YYYY-MM-DD";

export const QualityAnalytics = () => {
  const [qualityVisualProduction, setQualityVisualProduction] = useState([]);
  const [pPresentTotal, setpPresentTotal] = useState({
    pPresentTotal1: 0,
    pPresentTotal2: 0,
    pPresentTotal3: 0,
    pPresentTotal4: 0,
    pPresentTotal5: 0,
    pPresentTotal6: 0,
    pPresentTotal7: 0,
    pPresentTotal8: 0,
    pPresentTotal9: 0,
    pPresentTotal10: 0,
    pPresentTotal11: 0,
    pPresentTotal12: 0,
    pPresentTotal13: 0,
    pPresentTotal14: 0,
    pPresentTotal15: 0,
    pPresentTotal16: 0,
    pPresentTotal17: 0,
    pPresentTotal18: 0,
    pPresentTotal19: 0,
    pPresentTotal20: 0,
    pPresentTotal21: 0,
    pPresentTotal22: 0,
    pPresentTotal23: 0,
    pPresentTotal24: 0,
    pPresentTotal25: 0,
    pPresentTotal26: 0,
    pPresentTotal27: 0,
    pPresentTotal28: 0,
    pPresentTotal29: 0,
    pPresentTotal30: 0,
    pPresentTotal31: 0,
    pPresentTotal32: 0,
    pPresentTotal33: 0,
    pPresentTotal34: 0,
    pPresentTotal35: 0,
    pPresentTotal36: 0,
  });

  console.log("qualityVisualProduction", qualityVisualProduction);
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
    pPercentage17: 0,
    pPercentage18: 0,
    pPercentage19: 0,
    pPercentage20: 0,
    pPercentage21: 0,
    pPercentage22: 0,
    pPercentage23: 0,
    pPercentage24: 0,
    pPercentage25: 0,
    pPercentage26: 0,
    pPercentage27: 0,
    pPercentage28: 0,
    pPercentage29: 0,
    pPercentage30: 0,
    pPercentage31: 0,
    pPercentage32: 0,
    pPercentage33: 0,
    pPercentage34: 0,
    pPercentage35: 0,
    pPercentage36: 0,
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectClass] = useState();
  const [size, setSize] = useState([]);
  const [selectSize, setSelectSize] = useState();
  const [successPopup, setSuccessPopup] = useState(false);
  const [isPopup, setisPopup] = useState(false);

  const formatStartDate = startDate ? dayjs(startDate).format(dateFormat) : "";
  const formatEndDate = endDate ? dayjs(endDate).format(dateFormat) : "";

  const { userPermission } = useSelector((state) => state.userState);
  const [fieldCount, setfieldCount] = useState([]);
  const [percentCount, setpercentCount] = useState([]);
  const [Name, setName] = useState([]);
  const [ErrorStatus,setErrorStatus] = useState(false);

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  useEffect(() => {
    if (qualityVisualProduction.length > 0) {
      console.log("qualityVisualProduction", qualityVisualProduction);
      const testNames = qualityVisualProduction.map(
        (item, index) => item.TestName
      );
      setName(testNames);

      qualityVisualProduction.map((data, index) => {
        fieldCount[index] = qualityVisualProduction[index].keyValue.field_count;
        percentCount[index] = `${qualityVisualProduction[
          index
        ].keyValue.percent_count.toFixed(2)}%`;
      });
    }
  }, [qualityVisualProduction]);

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

  useEffect(() => {
    if (formatStartDate && formatEndDate && selectedClass && selectSize) {
      getQualityVisualProduction();
    }
  }, [formatEndDate, formatStartDate, selectedClass, selectSize]);

  const getQualityVisualProduction = async () => {
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
      const resp = await getAdvanceAnalyticsQualityVisual(params);
      if (resp.status == 200 || resp.status == 201) {
        setErrorStatus(false);
        const changeStructureData = Object.keys(resp.data.payload).map(
          (key) => ({
            TestName: key,
            keyValue: resp.data.payload[key],
          })
        );

        console.log("............", changeStructureData);
        setQualityVisualProduction(changeStructureData);
      }
    } catch (error) {
      setErrorStatus(true);
      console.log("handleSubmit..", error);
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

  const TestName = [
    { name: "Bubbles between fingers", key: "bubbles_between_fingers" },
    { name: "Bubbles at fingertips", key: "bubbles_at_fingertips" },
    { name: "Other position bubbles", key: "other_position_bubbles" },
    { name: "Thin patch fingers", key: "thin_patch_fingers" },
    { name: "Thin patch crutch", key: "thin_patch_crutch" },
    { name: "Thin patch between finger", key: "thin_patch_between_finger" },
    { name: "Inside crack defect", key: "inside_crack_defect" },
    { name: "Crease", key: "crease" },
    { name: "Pinholes fingertips", key: "pinholes_fingertips" },
    { name: "Pinholes other positions", key: "pinholes_other_positions" },
    { name: "Wet coagulant fingertips", key: "wet_coagulant_fingertips" },
    { name: "Particles", key: "particles" },
    {
      name: "Crack defects between fingers",
      key: "crack_defects_between_fingers",
    },
    { name: "Ripples on fingers", key: "ripples_on_fingers" },
    { name: "Ripples on other positions", key: "ripples_on_other_positions" },
    {
      name: "Inner/Between(coat)split line",
      key: "inner_between_coat_split_line",
    },
    { name: "Drops of coagulant", key: "drops_of_coagulant" },
    { name: "Bad gelation", key: "bad_gelation" },
    { name: "Bad gelation of finger side", key: "bad_gelation_of_finger_side" },
    { name: "Delamination", key: "delamination" },
    { name: "Lack of coagulant", key: "lack_of_coagulant" },
    { name: "Bad rolled edge", key: "bad_rolled_edge" },
    { name: "Crack defects ON fingers", key: "crack_defects_on_fingers" },
    { name: "Inner side impression mark", key: "inner_side_impression_mark" },
    { name: "Pit mark", key: "pit_mark" },
    { name: "Cissing", key: "cissing" },
    { name: "Latex runs at fingertips", key: "latex_runs_at_fingertips" },
    { name: "Coagulant foam", key: "coagulant_foam" },
    { name: "Peel of fingertips", key: "peel_of_fingertips" },
    { name: "Blister", key: "blister" },
    { name: "Line", key: "line" },
    { name: "Split Line", key: "split_line" },
    {
      name: "Inside bubbles at finger tips",
      key: "inside_bubbles_at_finger_tips",
    },
    {
      name: "Inside bubbles at other position",
      key: "inside_bubbles_at_other_posi",
    },
    {
      name: "Inside bubbles between finger",
      key: "inside_bubbles_between_finger",
    },
    { name: "Webline bubbles", key: "webline_bubbles" },
  ];

  const getNameByKey = (searchKey) => {
    const test = TestName.find((test) => test.key === searchKey);
    return test ? test.name : null;
  };

  const PresentTotal = [
    isNaN(pPresentTotal.pPresentTotal1) ? 0 : pPresentTotal.pPresentTotal1,
    isNaN(pPresentTotal.pPresentTotal2) ? 0 : pPresentTotal.pPresentTotal2,
    isNaN(pPresentTotal.pPresentTotal3) ? 0 : pPresentTotal.pPresentTotal3,
    isNaN(pPresentTotal.pPresentTotal4) ? 0 : pPresentTotal.pPresentTotal4,
    isNaN(pPresentTotal.pPresentTotal5) ? 0 : pPresentTotal.pPresentTotal5,
    isNaN(pPresentTotal.pPresentTotal6) ? 0 : pPresentTotal.pPresentTotal6,
    isNaN(pPresentTotal.pPresentTotal7) ? 0 : pPresentTotal.pPresentTotal7,
    isNaN(pPresentTotal.pPresentTotal8) ? 0 : pPresentTotal.pPresentTotal8,
    isNaN(pPresentTotal.pPresentTotal9) ? 0 : pPresentTotal.pPresentTotal9,
    isNaN(pPresentTotal.pPresentTotal10) ? 0 : pPresentTotal.pPresentTotal10,
    isNaN(pPresentTotal.pPresentTotal11) ? 0 : pPresentTotal.pPresentTotal11,
    isNaN(pPresentTotal.pPresentTotal12) ? 0 : pPresentTotal.pPresentTotal12,
    isNaN(pPresentTotal.pPresentTotal13) ? 0 : pPresentTotal.pPresentTotal13,
    isNaN(pPresentTotal.pPresentTotal14) ? 0 : pPresentTotal.pPresentTotal14,
    isNaN(pPresentTotal.pPresentTotal15) ? 0 : pPresentTotal.pPresentTotal15,
    isNaN(pPresentTotal.pPresentTotal16) ? 0 : pPresentTotal.pPresentTotal16,
    isNaN(pPresentTotal.pPresentTotal17) ? 0 : pPresentTotal.pPresentTotal17,
    isNaN(pPresentTotal.pPresentTotal18) ? 0 : pPresentTotal.pPresentTotal18,
    isNaN(pPresentTotal.pPresentTotal19) ? 0 : pPresentTotal.pPresentTotal19,
    isNaN(pPresentTotal.pPresentTotal20) ? 0 : pPresentTotal.pPresentTotal20,
    isNaN(pPresentTotal.pPresentTotal21) ? 0 : pPresentTotal.pPresentTotal21,
    isNaN(pPresentTotal.pPresentTotal22) ? 0 : pPresentTotal.pPresentTotal22,
    isNaN(pPresentTotal.pPresentTotal23) ? 0 : pPresentTotal.pPresentTotal23,
    isNaN(pPresentTotal.pPresentTotal24) ? 0 : pPresentTotal.pPresentTotal24,
    isNaN(pPresentTotal.pPresentTotal25) ? 0 : pPresentTotal.pPresentTotal25,
    isNaN(pPresentTotal.pPresentTotal26) ? 0 : pPresentTotal.pPresentTotal26,
    isNaN(pPresentTotal.pPresentTotal27) ? 0 : pPresentTotal.pPresentTotal27,
    isNaN(pPresentTotal.pPresentTotal28) ? 0 : pPresentTotal.pPresentTotal28,
    isNaN(pPresentTotal.pPresentTotal29) ? 0 : pPresentTotal.pPresentTotal29,
    isNaN(pPresentTotal.pPresentTotal30) ? 0 : pPresentTotal.pPresentTotal30,
    isNaN(pPresentTotal.pPresentTotal31) ? 0 : pPresentTotal.pPresentTotal31,
    isNaN(pPresentTotal.pPresentTotal32) ? 0 : pPresentTotal.pPresentTotal32,
    isNaN(pPresentTotal.pPresentTotal33) ? 0 : pPresentTotal.pPresentTotal33,
    isNaN(pPresentTotal.pPresentTotal34) ? 0 : pPresentTotal.pPresentTotal34,
    isNaN(pPresentTotal.pPresentTotal35) ? 0 : pPresentTotal.pPresentTotal35,
    isNaN(pPresentTotal.pPresentTotal36) ? 0 : pPresentTotal.pPresentTotal36,
  ];

  const Percentage = [
    isNaN(pPercentage.pPercentage1) ? "0%" : `${pPercentage.pPercentage1}%`,
    isNaN(pPercentage.pPercentage2) ? "0%" : `${pPercentage.pPercentage2}%`,
    isNaN(pPercentage.pPercentage3) ? "0%" : `${pPercentage.pPercentage3}%`,
    isNaN(pPercentage.pPercentage4) ? "0%" : `${pPercentage.pPercentage4}%`,
    isNaN(pPercentage.pPercentage5) ? "0%" : `${pPercentage.pPercentage5}%`,
    isNaN(pPercentage.pPercentage6) ? "0%" : `${pPercentage.pPercentage6}%`,
    isNaN(pPercentage.pPercentage7) ? "0%" : `${pPercentage.pPercentage7}%`,
    isNaN(pPercentage.pPercentage8) ? "0%" : `${pPercentage.pPercentage8}%`,
    isNaN(pPercentage.pPercentage9) ? "0%" : `${pPercentage.pPercentage9}%`,
    isNaN(pPercentage.pPercentage10) ? "0%" : `${pPercentage.pPercentage10}%`,
    isNaN(pPercentage.pPercentage11) ? "0%" : `${pPercentage.pPercentage11}%`,
    isNaN(pPercentage.pPercentage12) ? "0%" : `${pPercentage.pPercentage12}%`,
    isNaN(pPercentage.pPercentage13) ? "0%" : `${pPercentage.pPercentage13}%`,
    isNaN(pPercentage.pPercentage14) ? "0%" : `${pPercentage.pPercentage14}%`,
    isNaN(pPercentage.pPercentage15) ? "0%" : `${pPercentage.pPercentage15}%`,
    isNaN(pPercentage.pPercentage16) ? "0%" : `${pPercentage.pPercentage16}%`,
    isNaN(pPercentage.pPercentage17) ? "0%" : `${pPercentage.pPercentage17}%`,
    isNaN(pPercentage.pPercentage18) ? "0%" : `${pPercentage.pPercentage18}%`,
    isNaN(pPercentage.pPercentage19) ? "0%" : `${pPercentage.pPercentage19}%`,
    isNaN(pPercentage.pPercentage20) ? "0%" : `${pPercentage.pPercentage20}%`,
    isNaN(pPercentage.pPercentage21) ? "0%" : `${pPercentage.pPercentage21}%`,
    isNaN(pPercentage.pPercentage22) ? "0%" : `${pPercentage.pPercentage22}%`,
    isNaN(pPercentage.pPercentage23) ? "0%" : `${pPercentage.pPercentage23}%`,
    isNaN(pPercentage.pPercentage24) ? "0%" : `${pPercentage.pPercentage24}%`,
    isNaN(pPercentage.pPercentage25) ? "0%" : `${pPercentage.pPercentage25}%`,
    isNaN(pPercentage.pPercentage26) ? "0%" : `${pPercentage.pPercentage26}%`,
    isNaN(pPercentage.pPercentage27) ? "0%" : `${pPercentage.pPercentage27}%`,
    isNaN(pPercentage.pPercentage28) ? "0%" : `${pPercentage.pPercentage28}%`,
    isNaN(pPercentage.pPercentage29) ? "0%" : `${pPercentage.pPercentage29}%`,
    isNaN(pPercentage.pPercentage30) ? "0%" : `${pPercentage.pPercentage30}%`,
    isNaN(pPercentage.pPercentage31) ? "0%" : `${pPercentage.pPercentage31}%`,
    isNaN(pPercentage.pPercentage32) ? "0%" : `${pPercentage.pPercentage32}%`,
    isNaN(pPercentage.pPercentage33) ? "0%" : `${pPercentage.pPercentage33}%`,
    isNaN(pPercentage.pPercentage34) ? "0%" : `${pPercentage.pPercentage34}%`,
    isNaN(pPercentage.pPercentage35) ? "0%" : `${pPercentage.pPercentage35}%`,
    isNaN(pPercentage.pPercentage36) ? "0%" : `${pPercentage.pPercentage36}%`,
  ];

  console.log("PresentTotal", PresentTotal);
  console.log("Percentage", Percentage);

  const handleVisualReport = async () => {
    setSuccessPopup(true);
    setisPopup(false);
    console.log("Name", Name);
    const name_data = Name.map((e) => getNameByKey(e));
    const F_name = name_data.map((e, index) => index + 1 + " " + e);

    const params = {
      name: F_name,
      count: fieldCount,
      percentage: percentCount,
      size_id: selectSize,
      class_id: selectedClass,
      start_date: formatStartDate,
      end_date: formatEndDate,
    };
    try {
      const resp = await visualInspectionQualityAnalyticsReport(params);

      if (resp.data.success == true) {
        setTimeout(() => {
          setSuccessPopup(false);
        }, 3000);
       
      }
    } catch (error) {
      setSuccessPopup(false);
    }
  };

  var dataToRender =
    qualityVisualProduction.length > 0 ? qualityVisualProduction : TestName;

  const renderTableRow = (data, index) => {
    let pPresentTotal_data = 0;
    let pPercentage_data = 0;
    if (
      qualityVisualProduction[index] &&
      qualityVisualProduction[index].keyValue &&
      qualityVisualProduction[index].keyValue.field_count
    ) {
      pPresentTotal_data = qualityVisualProduction[index].keyValue.field_count;
      pPercentage_data = qualityVisualProduction[
        index
      ].keyValue.percent_count.toFixed(2);
    }

    console.log("data.TestName", data.TestName);
    return (
      <TableRow>
        <TableCell>
          <b>{index < 9 ? `0${index + 1}` : `${index + 1}`}</b>{" "}
          {getNameByKey(data.TestName) || data.name}
        </TableCell>
        <TableCell colSpan={14}>
          <VisualInspectionProgressBar
            pPresentTotal={pPresentTotal_data}
            pPercentage={pPercentage_data}
          />
        </TableCell>
        <TableCell className="production-percentage">
          {pPercentage_data}%
        </TableCell>
      </TableRow>
    );
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
                  value={startDate}
                  disableFuture
                  shouldDisableDate={disableStartDate}
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
                  value={endDate}
                  disableFuture
                  onChange={handleEndDateChange}
                  shouldDisableDate={disableEndDate}
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
                  !formatStartDate ||
                  !formatEndDate ||
                  !selectedClass ||
                  !selectSize ||
                  ErrorStatus
                }
                style={{
                  pointerEvents:
                    !formatStartDate ||
                    !formatEndDate ||
                    !selectedClass ||
                    !selectSize ||
                    ErrorStatus
                      ? "none"
                      : "auto",
                  opacity:
                    !formatStartDate ||
                    !formatEndDate ||
                    !selectedClass ||
                    !selectSize ||
                    ErrorStatus
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
          <div className="table-responsive" style={{ position: "relative" }}>
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
                <TableHead style={{ position: "sticky", top: "0", zIndex: 1 }}>
                  <TableRow>
                    <TableCell>Defects</TableCell>
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
                  {dataToRender.map((data, index) =>
                    renderTableRow(data, index)
                  )}

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
            {/* <Link
            to="/percentage-chart"
            style={{ color: "#ffff" }}
            className="quality-btn"
          >
            Percentage Chart
          </Link> */}
            <Link
              to="/classwise-chart"
              style={{ color: "#ffff" }}
              className="quality-btn"
            >
              Class Wise Yield
            </Link>
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
                    onClick={() => handleVisualReport()}
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
