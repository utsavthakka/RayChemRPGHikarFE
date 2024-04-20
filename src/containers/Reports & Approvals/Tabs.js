import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Reports from "./Reports";
import ElectricTabs from "./ElectricTabs";
import "../Reports & Approvals/Reports.css";
import FinalVisualInspection from "./FinalVisualInspectionTabs";
import UidPrinting from "./UidPrinting";
import QrPrinting from "./QrPrinting";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExcelIcon from "../../assets/images/excel-icon.svg";
import { images } from "../../config/images";
import dayjs from "dayjs";
import {
  exportElectricExcel,
  exportFinalVisualExcel,
  exportVisualExcel,
  exportVisualInspectionExcel,
  getTopCount,
} from "./services";
import { ToastContainer, toast } from "react-toastify";
import {
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@material-ui/core";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import COCDatePicker from "../../components/DateTimePicker/DateTimePicker";
import Button from "../../components/Button/Button";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const [batchId, setBatchId] = useState([]);
  const [exportExcel, setExportExcel] = useState("");
  const [uid, setUid] = useState([]);
  const [electricExcel, setElectricExcel] = useState("");
  const [visualUid, setVisualUid] = useState([]);
  const [finalUid, setFinalUid] = useState([]);
  const [finalVisualExcel, setFinalVisualExcel] = useState("");
  const [selectRorL, setSelectRorL] = useState("");
  const [checkFilter, setCheckFilter] = useState([]);
  const [checkVisualFilter, setVisualFilter] = useState([]);
  const [checkElectricTestFilter, setElectricTestFilter] = useState([]);
  const [checkFinalVisualFilter, setFinalVisualFilter] = useState([]);
  const [checkQrPrintingFilter, setQrPrintingFilter] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [testData, setTestData] = useState("");
  const [isPopup, setisPopup] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [startDateReFormat, setStartDateReFormat] = useState(null);
  const [endDateReFormat, setEndDateReFormat] = useState(null);
  const [UidSearchData, setUidSearchData] = useState();
  const [VisualSearchData, setVisualSearchData] = useState();
  const [ElectricSearchData, setElectricSearchData] = useState();
  const [FinalVisualSearchData, setFinalVisualSearchData] = useState();
  const [QrPrintingSearchData, setQrPrintingSearchData] = useState();
  const [buttonFunctionName, setButtonFunctionName] = useState("");

  const buttonRef = useRef(null);
  const dateFormat = "YYYY-MM-DD";
  const startDateFormat = dayjs(startDateReFormat).format(dateFormat);
  const endDateFormat = dayjs(endDateReFormat).format(dateFormat);

  const DateTimeFormat = (date) => {
    const Date_Time_Format = "YYYY-MM-DD HH:mm:ss";
    // console.log("YYYY-MM-DD hh:mm:ss",dayjs(date).format(Date_Time_Format))
    return dayjs(date).format(Date_Time_Format);
  };

  const { userPermission } = useSelector((state) => state.userState);

  useEffect(() => {
    console.log("popup ..... value", value);
    setisPopup(false);
  }, [value]);
  const handleStartDate = (newStartDate) => {
    console.log("newStartDate", newStartDate);

    setStartDateReFormat(newStartDate);
  };

  const ButtonClickHandle = (buttonRef) => {
    if (buttonRef.current) {
      setButtonFunctionName(buttonRef.current.name);
      console.log("Button name:", buttonRef.current.name);
    }
  };
  const handleEndDate = (newEndDate) => {
    if (showTime) {
      setEndDateReFormat(newEndDate);
    } else {
      setEndDateReFormat(dayjs(newEndDate).hour(23).minute(59).second(0));
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handleFinalVisualClickIcon(newValue);
  };

  const handleToggleTime = () => {
    setShowTime(!showTime);
  };

  const handleVisualInspectionExcel = (batchid) => {
    setBatchId(batchid);
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

  const handleElectricTestExcel = (uid) => {
    setUid(uid);
  };

  const handleFinalExcel = (finalUid) => {
    setFinalUid(finalUid);
  };
  // useEffect(() => {
  //   if (electricExcel) {
  //     fetch(electricExcel)
  //       .then((response) => response.blob())
  //       .then((blob) => {
  //         const url = URL.createObjectURL(blob);
  //         const a = document.createElement("a");
  //         a.href = url;
  //         a.download = "Electric_Test_Report" + uid + ".xlsx";
  //         a.click();
  //       });
  //   }
  // }, [electricExcel]);

  const handleVisualExcel = (visualUid) => {
    setVisualUid(visualUid);
  };
  const handleElectricTestExportExcel = async () => {
    setSuccessPopup(true);
    const params = {
      uid_id_type: uid,
    };
    try {
      // Call the filterUid API with the search parameters
      const resp = await exportElectricExcel(params);

      // If the API call is successful, update the search results state
      if (resp.status == 200 || resp.status == 201) {
        setElectricExcel(resp.data.payload.electric_test_report);
        setTimeout(() => {
          setSuccessPopup(false);
        }, 5000);
      } else {
        console.log("Something was wrong, try again");
      }
    } catch (error) {
      setLoading(false);
      toast.error("No data available", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Set loading state to false and log any errors
      console.log("handleSubmit", error);
    }
  };

  const handleFinalVisualExportExcel = async () => {
    setSuccessPopup(true);
    const params = {
      uid_id_type: finalUid,
    };
    try {
      // Call the filterUid API with the search parameters
      const resp = await exportFinalVisualExcel(params);

      // If the API call is successful, update the search results state
      if (resp.status == 200 || resp.status == 201) {
        setFinalVisualExcel(resp.data.payload.final_visual_inspection_report);
        setTimeout(() => {
          setSuccessPopup(false);
        }, 5000);
      } else {
        console.log("Something was wrong, try again");
      }
    } catch (error) {
      setLoading(false);
      toast.error("No data available", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Set loading state to false and log any errors
      console.log("handleSubmit", error);
    }
  };

  const handleVisualExcelClick = async () => {
    setSuccessPopup(true);
    const params = {
      uid_id_type: visualUid,
    };
    try {
      // Call the filterUid API with the search parameters
      const resp = await exportVisualInspectionExcel(params);

      // If the API call is successful, update the search results state
      if (resp.status == 200 || resp.status == 201) {
        console.log("export visual inspection report successfully");
        setTimeout(() => {
          setSuccessPopup(false);
        }, 5000);
      } else {
        console.log("Something was wrong, try again");
      }
    } catch (error) {
      setSuccessPopup(false);
      setLoading(false);
      toast.error("No data available", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Set loading state to false and log any errors
      console.log("handleSubmit", error);
    }
  };

  const handleVisualInspectionExportExcel = async () => {
    setLoading(true);
    const params = {
      batch_id: batchId,
    };
    console.log("paramsparams", params);
    try {
      // Call the filterUid API with the search parameters
      const resp = await exportVisualExcel(params);
      // If the API call is successful, update the search results state
      if (resp.status == 200 || resp.status == 201) {
        setLoading(false);
        setExportExcel(resp.data.payload.visual_inspection_report);
      } else {
        console.log("Something was wrong, try again");
      }
    } catch (error) {
      setLoading(false);
      toast.error("No data available", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Set loading state to false and log any errors
      console.log("handleSubmit", error);
    }
  };

  const handleuidprintingSearch = (data) => {
    console.log("handleuidprintingSearch....", data);
    setUidSearchData(data);
  };

  const handleVisualSearch = (data) => {
    setVisualSearchData(data);
  };

  const handleElectricSearch = (data) => {
    setElectricSearchData(data);
  };

  const handleFinalVisualSearch = (data) => {
    setFinalVisualSearchData(data);
  };
  const handleQrPrintingSearch = (data) => {
    setQrPrintingSearchData(data);
  };

  useEffect(() => {
    if (value === 0) {
      handleFilterClick(UidSearchData);
    }
    if (value === 1) {
      handleVisualFilterClick(VisualSearchData);
    }
    if (value === 2) {
      handleElectricFilterClick(ElectricSearchData);
    }
    if (value === 3) {
      handleFinalVisualFilterClick(FinalVisualSearchData);
    }
    if (value === 4) {
      handleQrPrintingFilterClick(QrPrintingSearchData);
    }
  }, [
    testData,
    selectRorL,
    value,
    UidSearchData,
    VisualSearchData,
    ElectricSearchData,
    FinalVisualSearchData,
    QrPrintingSearchData,
    startDateReFormat,
    endDateReFormat,
    showTime,
  ]);

  const filterSearchText = (searchText) => {
    return Object.entries(searchText).reduce((acc, [key, value]) => {
      if (value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});
  };

  const handleFilterClick = async (searchText) => {
    console.log("searchText", searchText);

    let uid_printing_print_result;
    if (searchText.Print_Result.length == 4) {
      const result = searchText.Print_Result.toLowerCase();
      if (result === "pass") {
        uid_printing_print_result = true;
      } else if (result === "fail") {
        uid_printing_print_result = false;
      }
    }

    const params = {
      station: 0, // Assuming you always want the default value to be 0, change if needed
      date: searchText.Date,
      batch_no: searchText.B_No,
      uid: searchText.UID,
      test_date: searchText.Test_Date,
      shift: searchText.Shift,
      lot_no: searchText.Lot_No,
      r_or_l: searchText.RorL,
      class_name: searchText.Class,
      size: searchText.Size,
      thickness: searchText.Thickness,
      test_result: uid_printing_print_result, // Assuming you want to convert the result to a boolean
      approval_status: searchText.Approval_Status,
    };

    if (startDateReFormat && endDateReFormat) {
      if (showTime) {
        const StartDateTime = DateTimeFormat(startDateReFormat);
        const EndDateTime = DateTimeFormat(endDateReFormat);
        params["start_datetime"] = StartDateTime;
        params["end_datetime"] = EndDateTime;
      } else {
        params["start_datetime"] = `${startDateFormat} 00:00:00`;
        params["end_datetime"] = `${endDateFormat} 23:59:59`;
      }
    }

    if (selectRorL && selectRorL !== "all") {
      params["r_or_l"] = selectRorL;
    }
    try {
      const resp = await getTopCount(filterSearchText(params));
      if (resp.status == 200 || resp.status == 201) {
        setCheckFilter(resp.data.payload);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleVisualFilterClick = async (searchText) => {
    console.log("searchText", searchText);

    let visual_filter_print_result;
    if (searchText.Print_Result.length == 4) {
      const result = searchText.Print_Result.toLowerCase();
      if (result === "pass") {
        visual_filter_print_result = true;
      } else if (result === "fail") {
        visual_filter_print_result = false;
      }
    }
    const params = {
      station: 1, // Assuming you always want the default value to be 0, change if needed
      date: searchText.Date,
      batch_no: searchText.B_No,
      uid: searchText.UID,
      test_date: searchText.Test_date,
      shift: searchText.Shift,
      lot_no: searchText.Lot_No,
      r_or_l: searchText.RorL,
      class_name: searchText.Class,
      size: searchText.Size,
      thickness: searchText.Thickness,
      test_result: visual_filter_print_result, // Assuming you want to convert the result to a boolean
      approval_status: searchText.Approve_status,
    };

    if (startDateReFormat && endDateReFormat) {
      if (showTime) {
        const StartDateTime = DateTimeFormat(startDateReFormat);
        const EndDateTime = DateTimeFormat(endDateReFormat);
        params["start_datetime"] = StartDateTime;
        params["end_datetime"] = EndDateTime;
      } else {
        params["start_datetime"] = `${startDateFormat} 00:00:00`;
        params["end_datetime"] = `${endDateFormat} 23:59:59`;
      }
    }

    if (selectRorL && selectRorL !== "all") {
      params["r_or_l"] = selectRorL;
    }
    try {
      const resp = await getTopCount(filterSearchText(params));
      if (resp.status == 200 || resp.status == 201) {
        setVisualFilter(resp.data.payload);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleElectricFilterClick = async (searchText) => {
    console.log("searchText....", searchText);

    let electricfilter_test_result;
    if (searchText.Test_Result.length == 4) {
      const result = searchText.Test_Result.toLowerCase();
      if (result === "pass") {
        electricfilter_test_result = true;
      } else if (result === "fail") {
        electricfilter_test_result = false;
      }
    }
    const params = {
      station: 2, // Assuming you always want the default value to be 0, change if needed
      date: searchText.Date,
      batch_no: searchText.B_No,
      uid: searchText.UID,
      test_date: searchText.Test_date,
      shift: searchText.Shift,
      lot_no: searchText.Lot_No,
      r_or_l: searchText.RorL,
      class_name: searchText.Class,
      size: searchText.Size,
      thickness: searchText.Thickness,
      test_result: electricfilter_test_result, // Assuming you want to convert the result to a boolean
      approval_status: searchText.electric_test_count,
    };

    if (startDateReFormat && endDateReFormat) {
      if (showTime) {
        const StartDateTime = DateTimeFormat(startDateReFormat);
        const EndDateTime = DateTimeFormat(endDateReFormat);
        params["start_datetime"] = StartDateTime;
        params["end_datetime"] = EndDateTime;
      } else {
        params["start_datetime"] = `${startDateFormat} 00:00:00`;
        params["end_datetime"] = `${endDateFormat} 23:59:59`;
      }
    }
    if (selectRorL && selectRorL !== "all") {
      params["r_or_l"] = selectRorL;
    }

    try {
      const resp = await getTopCount(filterSearchText(params));
      if (resp.status === 200 || resp.status === 201) {
        setElectricTestFilter(resp.data.payload);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleTestData = (value) => {
    setTestData(value);
  };

  const handleFinalVisualFilterClick = async (searchText) => {
    console.log("searchText", searchText);

    let finalvisualfilter_test_result;
    if (searchText.Test_Result.length == 4) {
      const result = searchText.Test_Result.toLowerCase();
      if (result === "pass") {
        finalvisualfilter_test_result = true;
      } else if (result === "fail") {
        finalvisualfilter_test_result = false;
      }
    }
    const params = {
      station: 3, // Assuming you always want the default value to be 0, change if needed
      date: searchText.Date,
      batch_no: searchText.B_No,
      uid: searchText.UID,
      test_date: searchText.Test_date,
      shift: searchText.Shift,
      lot_no: searchText.Lot_No,
      r_or_l: searchText.RorL,
      class_name: searchText.Class,
      size: searchText.Size,
      thickness: searchText.Thickness,
      test_result: finalvisualfilter_test_result, // Assuming you want to convert the result to a boolean
      approval_status: searchText.Approval_Status,
    };

    if (startDateReFormat && endDateReFormat) {
      if (showTime) {
        const StartDateTime = DateTimeFormat(startDateReFormat);
        const EndDateTime = DateTimeFormat(endDateReFormat);
        params["start_datetime"] = StartDateTime;
        params["end_datetime"] = EndDateTime;
      } else {
        params["start_datetime"] = `${startDateFormat} 00:00:00`;
        params["end_datetime"] = `${endDateFormat} 23:59:59`;
      }
    }
    if (selectRorL && selectRorL !== "all") {
      params["r_or_l"] = selectRorL;
    }
    try {
      const resp = await getTopCount(filterSearchText(params));
      if (resp.status == 200 || resp.status == 201) {
        setFinalVisualFilter(resp.data.payload);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleQrPrintingFilterClick = async (searchText) => {
    let qrprintingfilter_test_result;
    if (searchText.Print_Result.length == 4) {
      const result = searchText.Print_Result.toLowerCase();
      if (result === "pass") {
        qrprintingfilter_test_result = true;
      } else if (result === "fail") {
        qrprintingfilter_test_result = false;
      }
    }

    const params = {
      station: 4, // Assuming you always want the default value to be 0, change if needed
      date: searchText.Date,
      batch_no: searchText.B_No,
      uid: searchText.UID,
      test_date: searchText.Test_date,
      shift: searchText.Shift,
      lot_no: searchText.Lot_No,
      r_or_l: searchText.RorL,
      class_name: searchText.Class,
      size: searchText.Size,
      thickness: searchText.Thickness,
      test_result: qrprintingfilter_test_result, // Assuming you want to convert the result to a boolean
      approval_status: searchText.Approval_Status,
    };

    if (startDateReFormat && endDateReFormat) {
      if (showTime) {
        const StartDateTime = DateTimeFormat(startDateReFormat);
        const EndDateTime = DateTimeFormat(endDateReFormat);
        params["start_datetime"] = StartDateTime;
        params["end_datetime"] = EndDateTime;
      } else {
        params["start_datetime"] = `${startDateFormat} 00:00:00`;
        params["end_datetime"] = `${endDateFormat} 23:59:59`;
      }
    }

    if (selectRorL && selectRorL !== "all") {
      params["r_or_l"] = selectRorL;
    }
    try {
      const resp = await getTopCount(filterSearchText(params));
      if (resp.status == 200 || resp.status == 201) {
        setQrPrintingFilter(resp.data.payload);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleallExcelClick = async () => {
    console.log("buttonFunctionName", buttonFunctionName);
    setisPopup(false);
    if (buttonFunctionName == "handleVisualExcelClick") {
      handleVisualExcelClick();
    }
    if (buttonFunctionName == "handleVisualInspectionExportExcel") {
      handleVisualInspectionExportExcel();
    }
    if (buttonFunctionName == "handleElectricTestExportExcel") {
      handleElectricTestExportExcel();
    }
    if (buttonFunctionName == "handleFinalVisualExportExcel") {
      console.log("handleFinalVisualExportExcel.........");
      handleFinalVisualExportExcel();
    }
  };
  // Define header content based on currently selected tab
  let headerContent;
  if (value === 0) {
    headerContent = (
      <>
        <Link to="/dashboard" className="page-back-btn">
          <ArrowBackIcon />
          <span>Reports & Approvals</span>
        </Link>
        <div className="header-btn-group">
          <FormGroup className="filter-checkbox-group d-block">
            <FormControlLabel
              className="filter-checkbox-passed"
              style={{ marginTop: "-5px" }}
              // control={
              //   <Checkbox name="passed" className="filter-checkbox-passed" style={{
              //     color: "#A59014"
              // }}/>
              // }
              control={<span></span>}
              label="Not Tested"
            />
            <b
              className="notTested"
              style={{
                borderRight: "1px solid #ccc",
                paddingRight: "10px",
                color: "#A59014",
              }}
            >
              {" "}
              {checkFilter.not_tested}
            </b>
            <FormControlLabel
              className="filter-checkbox-rejected"
              style={{ marginTop: "-5px" }}
              // control={
              //   <Checkbox
              //     name="rejected"
              //     className="filter-checkbox-rejected"
              //     style={{color:"#00AB66"}}
              //   />
              // }
              control={<span></span>}
              label="Passed"
            />
            <b
              className="passFilter"
              style={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}
            >
              {checkFilter.passed}
            </b>
            <FormControlLabel
              className="filter-checkbox-pending"
              style={{ marginTop: "-2px" }}
              // control={
              //   <Checkbox name="pending" className="filter-checkbox-pending" style={{color:"#E31E24"}}/>
              // }
              control={<span></span>}
              label="Failed"
            />
            <b className="failFilter">{checkFilter.failed}</b>
          </FormGroup>
          {/* <button className="page-header-btn">
            <img src={ExcelIcon} alt="" />
          </button> */}
        </div>
      </>
    );
  } else if (value === 1) {
    headerContent = (
      <>
        {props.glovesTable ? (
          <>
            <Link to="/dashboard" className="page-back-btn">
              <ArrowBackIcon />
              <span>Reports & Approvals</span>
            </Link>
            <div className="header-btn-group">
              <FormGroup className="filter-checkbox-group d-block">
                <FormControlLabel
                  className="filter-checkbox-passed"
                  style={{ marginTop: "-3px" }}
                  // control={
                  //   <Checkbox
                  //     name="passed"
                  //     className="filter-checkbox-passed"
                  //     style={{
                  //       color: "#A59014"
                  //   }}
                  //   />
                  // }
                  control={<span></span>}
                  label="Not Tested"
                />
                <b
                  className="notTested"
                  style={{
                    borderRight: "1px solid #ccc",
                    paddingRight: "10px",
                  }}
                >
                  {checkVisualFilter.not_tested}
                </b>
                <FormControlLabel
                  className="filter-checkbox-rejected"
                  style={{ marginTop: "2px" }}
                  // control={
                  //   <Checkbox
                  //     name="rejected"
                  //     className="filter-checkbox-rejected"
                  //     style={{color:"#00AB66"}}
                  //   />
                  // }
                  control={<span></span>}
                  label="Passed"
                />
                <b
                  className="passFilter"
                  style={{
                    borderRight: "1px solid #ccc",
                    paddingRight: "10px",
                  }}
                >
                  {checkVisualFilter.passed}
                </b>
                <FormControlLabel
                  className="filter-checkbox-pending"
                  style={{ marginTop: "-2px" }}
                  // control={
                  //   <Checkbox
                  //     name="pending"
                  //     className="filter-checkbox-pending"
                  //     style={{color:"#E31E24"}}
                  //   />
                  // }
                  control={<span></span>}
                  label="Failed"
                />
                <b
                  className="failFilter"
                  style={{
                    borderRight: "1px solid #ccc",
                    paddingRight: "10px",
                    color: "#A59014",
                  }}
                >
                  {checkVisualFilter.failed}
                </b>
                <FormControlLabel
                  className="filter-checkbox-passed"
                  style={{ marginTop: "-5px" }}
                  // control={
                  //   <Checkbox
                  //     name="passed"
                  //     className="filter-checkbox-passed"
                  //     style={{color:"#A59014"}}

                  //   />
                  // }
                  control={<span></span>}
                  label="Pending"
                />
                <b
                  className="notTested"
                  style={{
                    borderRight: "1px solid #ccc",
                    paddingRight: "10px",
                  }}
                >
                  {checkVisualFilter.pending}
                </b>
                <FormControlLabel
                  className="filter-checkbox-rejected"
                  style={{ marginTop: "-3px" }}
                  // control={
                  //   <Checkbox
                  //     name="rejected"
                  //     className="filter-checkbox-rejected"
                  //     style={{color:"#00AB66"}}
                  //   />
                  // }
                  control={<span></span>}
                  label="Approved"
                />
                <b
                  className="passFilter"
                  style={{
                    borderRight: "1px solid #ccc",
                    paddingRight: "10px",
                  }}
                >
                  {checkVisualFilter.approved}
                </b>
                <FormControlLabel
                  className="filter-checkbox-pending"
                  style={{ marginTop: "-2px" }}
                  // control={
                  //   <Checkbox
                  //     name="pending"
                  //     className="filter-checkbox-pending"
                  //     style={{color:"#E31E24"}}
                  //   />
                  // }
                  control={<span></span>}
                  label="Rejected"
                />
                <b className="failFilter">{checkVisualFilter.rejected}</b>
              </FormGroup>
              <button
                ref={buttonRef}
                className="page-header-btn"
                onClick={(e) => {
                  setisPopup(true);
                  ButtonClickHandle(buttonRef);
                }}
                style={{ cursor: "pointer" }}
                name="handleVisualExcelClick"
              >
                <img src={ExcelIcon} alt="" />
              </button>

              {/* <button className="page-header-btn">
            <img src={images.filterIcon} style={{ marginRight: "8px" }} />
            Filter
          </button> */}
            </div>
          </>
        ) : (
          <>
            {userPermission.find(
              (permission) => permission.module === "Reports & Approvals"
            )?.is_editor === true &&
            userPermission.find(
              (permission) => permission.module === "Reports & Approvals"
            )?.is_viewer === true ? (
              <>
                <Link
                  to=""
                  className="page-back-btn"
                  onClick={props.handleBack}
                >
                  <ArrowBackIcon />
                  <span>
                    Reports & Approvals <img src={images.arrowIcon} /> Visual
                    Inspection
                  </span>
                </Link>
                {props.glovesTable && (
                  <div className="header-btn-group">
                    <button
                      ref={buttonRef}
                      className="page-header-btn"
                      onClick={(e) => {
                        setisPopup(true);
                        ButtonClickHandle(buttonRef);
                      }}
                      name="handleVisualInspectionExportExcel"
                    >
                      <img src={ExcelIcon} alt="" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link
                  to=""
                  className="page-back-btn"
                  onClick={props.handleBack}
                >
                  <ArrowBackIcon />
                  <span>
                    Reports & Approvals <img src={images.arrowIcon} /> Visual
                    Inspection
                  </span>
                </Link>
                <div className="header-btn-group">
                  <button className="page-header-btn" onClick={handleToastMsg}>
                    <img src={ExcelIcon} alt="" />
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </>
    );
  } else if (value === 2) {
    headerContent = (
      <>
        <Link to="/dashboard" className="page-back-btn">
          <ArrowBackIcon />
          <span>Reports & Approvals</span>
        </Link>
        <div className="header-btn-group">
          <FormGroup className="filter-checkbox-group d-block">
            <FormControlLabel
              className="filter-checkbox-rejected"
              // control={
              //   <Checkbox
              //     name="rejected"
              //     className="filter-checkbox-rejected"
              //     style={{color:"#00AB66"}}
              //   />
              // }
              control={<span></span>}
              label="Passed"
            />
            <b
              className="passFilter"
              style={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}
            >
              {checkElectricTestFilter.passed}
            </b>
            <FormControlLabel
              className="filter-checkbox-pending"
              style={{ marginTop: "-2px" }}
              // control={
              //   <Checkbox name="pending" className="filter-checkbox-pending" style={{color:"#E31E24"}}/>
              // }
              control={<span></span>}
              label="Failed"
            />
            <b className="failFilter">{checkElectricTestFilter.failed}</b>
          </FormGroup>

          {userPermission.find(
            (permission) => permission.module === "Reports & Approvals"
          )?.is_editor === true &&
          userPermission.find(
            (permission) => permission.module === "Reports & Approvals"
          )?.is_viewer === true ? (
            <button
              ref={buttonRef}
              className="page-header-btn"
              onClick={(e) => {
                setisPopup(true);
                ButtonClickHandle(buttonRef);
              }}
              name="handleElectricTestExportExcel"
            >
              <img src={ExcelIcon} alt="" />
            </button>
          ) : (
            <button className="page-header-btn" onClick={handleToastMsg}>
              <img src={ExcelIcon} alt="" />
            </button>
          )}
        </div>
      </>
    );
  } else if (value === 3) {
    headerContent = (
      <>
        <Link to="/dashboard" className="page-back-btn">
          <ArrowBackIcon />
          <span>Reports & Approvals</span>
        </Link>

        <div className="header-btn-group">
          <FormGroup className="filter-checkbox-group d-block">
            <FormControlLabel
              className="filter-checkbox-rejected"
              style={{ marginTop: "-2px" }}
              // control={
              //   <Checkbox
              //     name="rejected"
              //     className="filter-checkbox-rejected"
              //     style={{color:"#00AB66"}}
              //   />
              // }
              control={<span></span>}
              label="Passed"
            />
            <b
              className="passFilter"
              style={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}
            >
              {checkFinalVisualFilter.passed}
            </b>
            <FormControlLabel
              className="filter-checkbox-pending"
              style={{ marginTop: "-2px" }}
              // control={
              //   <Checkbox
              //     name="pending"
              //     className="filter-checkbox-pending"
              //     style={{color:"#E31E24"}}
              //   />
              // }
              control={<span></span>}
              label="Failed"
            />
            <b
              className="failFilter"
              style={{
                borderRight: "1px solid #ccc",
                paddingRight: "10px",
                color: "#A59014",
              }}
            >
              {checkFinalVisualFilter.failed}
            </b>
            <FormControlLabel
              className="filter-checkbox-passed"
              style={{ marginTop: "-2px" }}
              // control={
              //   <Checkbox
              //     name="passed"
              //     className="filter-checkbox-passed"

              //   />
              // }
              control={<span></span>}
              label="Pending"
            />
            <b
              className="notTested"
              style={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}
            >
              {checkFinalVisualFilter.pending}
            </b>

            <FormControlLabel
              className="filter-checkbox-rejected"
              style={{ marginTop: "-2px" }}
              // control={
              //   <Checkbox
              //     name="rejected"
              //     className="filter-checkbox-rejected"
              //     style={{color:"#00AB66"}}
              //   />
              // }
              control={<span></span>}
              label="Approved"
            />
            <b
              className="passFilter"
              style={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}
            >
              {checkFinalVisualFilter.approved}
            </b>
            <FormControlLabel
              className="filter-checkbox-pending"
              style={{ marginTop: "-2px" }}
              // control={
              //   <Checkbox
              //     name="pending"
              //     className="filter-checkbox-pending"
              //     style={{color:"#E31E24"}}
              //   />
              // }
              control={<span></span>}
              label="Rejected"
            />
            <b className="failFilter">{checkFinalVisualFilter.rejected}</b>
          </FormGroup>
          {/* <button className="page-header-btn">
            <img src={images.filterIcon} style={{ marginRight: "8px" }} />
            Filter
          </button> */}
          {userPermission.find(
            (permission) => permission.module === "Reports & Approvals"
          )?.is_editor === true &&
          userPermission.find(
            (permission) => permission.module === "Reports & Approvals"
          )?.is_viewer === true ? (
            <button
              ref={buttonRef}
              className="page-header-btn"
              onClick={(e) => {
                setisPopup(true);
                ButtonClickHandle(buttonRef);
              }}
              name="handleFinalVisualExportExcel"
            >
              <img src={ExcelIcon} alt="" />
            </button>
          ) : (
            <button className="page-header-btn" onClick={handleToastMsg}>
              <img src={ExcelIcon} alt="" />
            </button>
          )}
        </div>
      </>
    );
  } else if (value === 4) {
    headerContent = (
      <>
        <Link to="/dashboard" className="page-back-btn">
          <ArrowBackIcon />
          <span>Reports & Approvals</span>
        </Link>
        <div className="header-btn-group">
          <FormGroup className="filter-checkbox-group d-block">
            <FormControlLabel
              className="filter-checkbox-rejected"
              style={{ marginTop: "-2px" }}
              // control={
              //   <Checkbox
              //     name="rejected"
              //     className="filter-checkbox-rejected"
              //     style={{color:"#00AB66"}}
              //   />
              // }
              control={<span></span>}
              label="Passed"
            />
            <b
              className="passFilter"
              style={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}
            >
              {checkQrPrintingFilter.passed}
            </b>
            <FormControlLabel
              className="filter-checkbox-pending"
              style={{ marginTop: "-2px" }}
              // control={
              //   <Checkbox name="pending" className="filter-checkbox-pending" style={{color:"#E31E24"}}/>
              // }
              control={<span></span>}
              label="Failed"
            />
            <b className="failFilter">{checkQrPrintingFilter.failed}</b>
          </FormGroup>

          {/* <button className="page-header-btn">
            <img src={ExcelIcon} alt="" />
          </button> */}
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <Box sx={{ width: "100%" }}>
        <div className="page-header">{headerContent}</div>
        {props.glovesTable &&
          props.electricTestTable &&
          props.finalVisual &&
          props.uidPrinting &&
          props.qrPrinting && (
            <div className="box-and-datepicker">
              <Box className="Box-Tabs" width="85%">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="box-tabs-table "
                >
                  <Tab
                    label="UID Printing"
                    className="uid-printing-tabs tab-button"
                  />
                  <Tab
                    label="Visual Inspection"
                    className="visual-inspection-tabs tab-button"
                  />
                  <Tab
                    label="Electric Test"
                    className="electrictest-tabs tab-button"
                  />
                  <Tab
                    label="Final Visual Inspection"
                    className="Final-visual-inspection-tabs tab-button"
                  />
                  <Tab
                    label="QR Printing"
                    className="qr-printing-tabs tab-button"
                  />
                </Tabs>
              </Box>

              <div className="date-picker">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    className="time-picker"
                    value="top"
                    control={<Switch color="primary" checked={showTime} />}
                    label="Test Time"
                    labelPlacement="top"
                    onChange={handleToggleTime}
                  />
                </FormGroup>

                <COCDatePicker
                  time={showTime}
                  startDateReFormat={startDateReFormat}
                  endDateReFormat={endDateReFormat}
                  handleStartDate={handleStartDate}
                  handleEndDate={handleEndDate}
                  Start_Date_lable={"Test Start Date"}
                  end_Date_lable={"Test End Date"}
                />
              </div>
            </div>
          )}

        <TabPanel value={value} index={0}>
          <UidPrinting
            handleBack={props.handleBack}
            valueStation={value}
            handleUidPrintingDetail={props.handleUidPrintingDetail}
            uidPrinting={props.uidPrinting}
            checkUidData={props.checkUidData}
            handleCheckUidData={props.handleCheckUidData}
            selectRorL={selectRorL}
            handleTestDateSearch={handleTestData}
            {...{ startDateReFormat, endDateReFormat }}
            uidprintingSearchsendtoPerent={handleuidprintingSearch}
          />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Reports
            handleBack={props.handleBack}
            valueStation={value}
            handleVisualDetail={props.handleVisualDetail}
            glovesTable={props.glovesTable}
            checkUidData={props.checkUidData}
            handleCheckUidData={props.handleCheckUidData}
            handleVisualInspectionExcel={handleVisualInspectionExcel}
            handleVisualExcel={handleVisualExcel}
            selectRorL={selectRorL}
            handleTestDateSearch={handleTestData}
            handleTestTimeSearch={handleTestData}
            {...{ startDateReFormat, endDateReFormat }}
            VisualSearchsendtoPerent={handleVisualSearch}
          />
        </TabPanel>
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
        <TabPanel value={value} index={2}>
          <ElectricTabs
            handleBack={props.handleBack}
            handleExportExcel={props.handleExportExcel}
            valueStation={value}
            handleElecticTestDetail={props.handleElecticTestDetail}
            electricTestTable={props.electricTestTable}
            glovesTable={props.glovesTable}
            handleElectricTestExcel={handleElectricTestExcel}
            selectRorL={selectRorL}
            handleTestDateSearch={handleTestData}
            setElectricTestFilter={setElectricTestFilter}
            {...{ startDateReFormat, endDateReFormat }}
            ElectricSearchsendtoPerent={handleElectricSearch}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <FinalVisualInspection
            handleBack={props.handleBack}
            valueStation={value}
            glovesTable={props.glovesTable}
            finalVisual={props.finalVisual}
            handleFinalVisualDetail={props.handleFinalVisualDetail}
            checkUidData={props.checkUidData}
            handleCheckUidData={props.handleCheckUidData}
            handleFinalExcel={handleFinalExcel}
            selectRorL={selectRorL}
            handleTestDateSearch={handleTestData}
            {...{ startDateReFormat, endDateReFormat }}
            FinalVisualSearchsendtoPerent={handleFinalVisualSearch}
          />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <QrPrinting
            handleBack={props.handleBack}
            valueStation={value}
            qrPrinting={props.qrPrinting}
            handleQrPrintingDetail={props.handleQrPrintingDetail}
            checkUidData={props.checkUidData}
            handleCheckUidData={props.handleCheckUidData}
            selectRorL={selectRorL}
            handleTestDateSearch={handleTestData}
            {...{ startDateReFormat, endDateReFormat }}
            QrPrintingSearchsendtoPerent={handleQrPrintingSearch}
          />
        </TabPanel>
        {isLoading && <Loader />}
      </Box>
      {isPopup ? (
        <>
          <div className="sendingdataaaa1">
            <Card className="pairingcard-Approved">
              <CardContent className="p-0 pairing-status">
                <h4>Are you sure you want to get the excel ?</h4>
              </CardContent>
              <Button
                className="pairingcard-btn"
                title="Yes"
                onClick={() => handleallExcelClick()}
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
    </>
  );
}
