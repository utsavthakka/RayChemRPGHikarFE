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
import FinalVisualInspectionProgressBar from "./FinalVisualInspectionProgressbar";
import { images } from "../../config/images";
import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Replace "en" with your desired locale
import { getClasses, getSizes } from "../AddBatch/services";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Card, CardContent } from "@material-ui/core";
import {
  finalVisualInspectionQualityAnalyticsReport,
  getAdvanceAnalyticsQualityFinal,
} from "./services";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";

const dateFormat = "YYYY-MM-DD";

function FinalVisualInspectionTabs() {
  const [qualityFinalVisual, setQualityFinalVisual] = useState([]);
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
  });
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
  });

  const [isPopup, setisPopup] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectClass] = useState();
  const [size, setSize] = useState([]);
  const [selectSize, setSelectSize] = useState();
  const [successPopup, setSuccessPopup] = useState(false);

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
    if (qualityFinalVisual.length > 0) {
      const testNames = qualityFinalVisual.map((item, index) => item.key);
      setName(testNames);

      testNames.map((data, index) => {
        fieldCount[index] = qualityFinalVisual[index].keyValue.field_count;
        percentCount[index] = `${qualityFinalVisual[
          index
        ].keyValue.percent_count.toFixed(2)}%`;
      });
    }
  }, [qualityFinalVisual]);

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

  const handleFinalVisualClick = async () => {
    setSuccessPopup(true);
    setisPopup(false);

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
      const resp = await finalVisualInspectionQualityAnalyticsReport(params);
      if (resp.data.success == true) {
        setTimeout(() => {
          setSuccessPopup(false);
        }, 3000);
       
      }
    } catch (error) {
      setSuccessPopup(false);
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
      const resp = await getAdvanceAnalyticsQualityFinal(params);
      if (resp.status == 200 || resp.status == 201) {
        setErrorStatus(false);
        const changeStructureData = Object.keys(resp.data.payload).map(
          (key) => ({
            key: key,
            keyValue: resp.data.payload[key],
          })
        );
        setQualityFinalVisual(changeStructureData);
      }
    } catch (error) {
      setErrorStatus(true);
      console.log("handleSubmit", error);
    }
  };

  const TestName = [
    { name: "Bubbles between fingers", key: "bubbles_between_fingers" },
    { name: "Bubbles at fingertips", key: "bubbles_at_fingertips" },
    { name: "Other position bubbles", key: "other_position_bubbles" },
    { name: "Thin patch fingers", key: "thin_patch_fingers" },
    { name: "Inclusion (black spot)", key: "inclusion_black_spot" },
    { name: "Thin patch between finger", key: "thin_patch_between_fing" },
    { name: "Inside crack defect", key: "inside_crack" },
    { name: "Crease", key: "crease" },
    { name: "Pinholes fingertips", key: "pinholes" },
    { name: "Crack on Side", key: "crack_on_side" },
    { name: "Air Pockets impressions", key: "air_pockets_impressions" },
    { name: "Particles", key: "particles" },
    {
      name: "Crack defects between fingers",
      key: "crack_defects_between_f",
    },
    { name: "Ripples", key: "ripples" },

    {
      name: "Inner/Between(coat)split line",
      key: "inside_between_coat_spl",
    },
    { name: "Drops of coagulant", key: "drops_of_coagulant" },
    { name: "Bad gelation", key: "bad_gelation" },
    { name: "Delamination", key: "delamination" },
    { name: "Lack of coagulant", key: "lack_of_coagulant" },
    { name: "Bad rolled edge", key: "bad_rolled_edge" },
    { name: "Water patch/Rod patch", key: "water_patch_rod_patch" },

    { name: "Inner side impression mark", key: "inner_side_impression_m" },
    { name: "Pit mark", key: "pit_mark" },
    { name: "Cissing", key: "cissing" },
    { name: "Crack defects ON fingers", key: "crack_defect_on_finger" },
    { name: "Peel of fingertips", key: "peel_of_fingertips" },
    { name: "Blister", key: "blister" },
    { name: "Line", key: "line" },
    { name: "Split Line", key: "split_line" },

    {
      name: "Inside bubbles at finger tips",
      key: "inside_bubbles_at_fing",
    },
    {
      name: "Inside bubbles at other position",
      key: "inside_bubbles_at_oth",
    },
    {
      name: "Webline bubbles",
      key: "webline_bubbles",
    },
    {
      name: "Chlorination Patch",
      key: "chlorination_patch",
    },
  ];

  const getNameByKey = (searchKey) => {
    const test = TestName.find((test) => test.key === searchKey);
    return test ? test.name : null;
  };

  var dataToRender =
    qualityFinalVisual.length > 0 ? qualityFinalVisual : TestName;

  const renderTableRow = (data, index) => {
    let pPresentTotal_data = 0;
    let pPercentage_data = 0;
    if (
      qualityFinalVisual[index] &&
      qualityFinalVisual[index].keyValue &&
      qualityFinalVisual[index].keyValue.field_count
    ) {
      pPresentTotal_data = qualityFinalVisual[index].keyValue.field_count;
      pPercentage_data = qualityFinalVisual[
        index
      ].keyValue.percent_count.toFixed(2);
    }
    console.log("data.key", data.key);
    return (
      <TableRow>
        <TableCell>
          <b>{index < 9 ? `0${index + 1}` : `${index + 1}`}</b>{" "}
          {data.name || getNameByKey(data.key)}
        </TableCell>
        <TableCell colSpan={14}>
          <FinalVisualInspectionProgressBar
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
                  shouldDisableDate={disableEndDate}
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
                  !startDate || !endDate || !selectedClass || !selectSize || ErrorStatus 
                }
                style={{
                  pointerEvents:
                    !startDate || !endDate || !selectedClass || !selectSize || ErrorStatus 
                      ? "none"
                      : "auto",
                  opacity:
                    !startDate || !endDate || !selectedClass || !selectSize || ErrorStatus 
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
              to="/finalvisual-chart"
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
                    onClick={() => handleFinalVisualClick()}
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
}
export default FinalVisualInspectionTabs;
