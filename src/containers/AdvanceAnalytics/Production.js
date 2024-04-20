import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../AdvanceAnalytics/Analytics.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Replace "en" with your desired locale
import { images } from "../../config/images";
import ProductionChart from "./ProductionChart";
import { cubejsApi } from "../../cubejs/CubeJsApi";
import { advanceAnalyticsProductionReport, productiondata } from "./services";
import Loader from "../../components/Loader/Loader";
import { Card, CardContent } from "@material-ui/core";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../components/Button/Button";

const dateFormat = "YYYY-MM-DD"; // Replace with your desired date format

export const Production = () => {
  const [isLoading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [productionData, setProductionData] = useState([]);
  const [productionData1, setProductionData1] = useState([]);
  const [productionData2, setProductionData2] = useState([]);
  const [productionData3, setProductionData3] = useState([]);
  const [productionData4, setProductionData4] = useState([]);
  const [productionData5, setProductionData5] = useState([]);
  const [isPopup, setisPopup] = useState(false);
  const [message, setmessage] = useState();
  const [ErrorStatus, setErrorStatus] = useState(false);

  const { userPermission } = useSelector((state) => state.userState);
  const [targetData, setTargetData] = useState({
    class_00: "",
    class_0: "",
    class_1: "",
    class_2: "",
    class_3: "",
    class_4: "",
  });
  const [successPopup, setSuccessPopup] = useState(false);
  const [errorPopup, seterrorPopup] = useState(false);

  const handelTargetData = (e) => {
    const { name, value } = e.target;
    setTargetData({ ...targetData, [name]: value });
  };

  const handleExcelClick = async () => {
    setisPopup(false);
    console.log("productionData.length", productionData);
    if (productionData) {
      const params = {
        target_class0: targetData.class_0 ? targetData.class_0 : 0,
        produced_class0: parseInt(productionData1.produce),
        accepted_class0: parseInt(productionData1.passed),
        rejected_class0: parseInt(productionData1.rejected),
        yield_class0: parseInt(YieldClass0),
        target_class00: targetData.class_00 ? targetData.class_00 : 0,
        produced_class00: parseInt(productionData.produce),
        accepted_class00: parseInt(productionData.passed),
        rejected_class00: parseInt(productionData.rejected),
        yield_class00: parseInt(YieldClass00),
        target_class1: targetData.class_1 ? targetData.class_1 : 0,
        produced_class1: parseInt(productionData2.produce),
        accepted_class1: parseInt(productionData2.passed),
        rejected_class1: parseInt(productionData2.rejected),
        yield_class1: parseInt(YieldClass1),
        target_class2: targetData.class_2 ? targetData.class_2 : 0,
        produced_class2: parseInt(productionData3.produce),
        accepted_class2: parseInt(productionData3.passed),
        rejected_class2: parseInt(productionData3.rejected),
        yield_class2: parseInt(YieldClass2),
        target_class3: targetData.class_3 ? targetData.class_3 : 0,
        produced_class3: parseInt(productionData4.produce),
        accepted_class3: parseInt(productionData4.passed),
        rejected_class3: parseInt(productionData4.rejected),
        yield_class3: parseInt(YieldClass3),
        target_class4: targetData.class_4 ? targetData.class_4 : 0,
        produced_class4: parseInt(productionData5.produce),
        accepted_class4: parseInt(productionData5.passed),
        rejected_class4: parseInt(productionData5.rejected),
        yield_class4: parseInt(YieldClass4),
        start_date: formatStartDate,
        end_date: formatEndDate,
      };
      console.log(productionData.length);
      try {
        const resp = await advanceAnalyticsProductionReport(params);
        if (resp.data.success == true) {
          setmessage();
          setSuccessPopup(true);
          setTimeout(() => {
            setSuccessPopup(false);
          }, 3000);
        }
      } catch (error) {
        console.log("error");
      }
    } else {
      seterrorPopup(true);
      setmessage("Data not available!");
      setTimeout(() => {
        seterrorPopup(false);
      }, 3000);
    }
  };

  const formatStartDate = startDate ? dayjs(startDate).format(dateFormat) : "";
  const formatEndDate = endDate ? dayjs(endDate).format(dateFormat) : "";

  useEffect(() => {
    if (formatStartDate && formatEndDate) {
      handleProductionData();
      handleProductionData1();
      handleProductionData2();
      handleProductionData3();
      handleProductionData4();
      handleProductionData5();
    }
  }, [formatStartDate, formatEndDate]);

  const handleProductionData = async () => {
    const params = {
      class_id: 1,
      start_date: formatStartDate,
      end_date: formatEndDate,
    };
    try {
      const resp = await productiondata(params);
      if (resp.status == 200 || resp.status == 201) {
        setProductionData(resp.data.payload);
      }
    } catch (error) {
      console.log("error");
    }
  };
  const handleProductionData1 = async () => {
    const params = {
      class_id: 2,
      start_date: formatStartDate,
      end_date: formatEndDate,
    };
    try {
      const resp = await productiondata(params);
      if (resp.status == 200 || resp.status == 201) {
        setProductionData1(resp.data.payload);
      }
    } catch (error) {}
  };
  const handleProductionData2 = async () => {
    const params = {
      class_id: 3,
      start_date: formatStartDate,
      end_date: formatEndDate,
    };
    try {
      const resp = await productiondata(params);
      if (resp.status == 200 || resp.status == 201) {
        setProductionData2(resp.data.payload);
      }
    } catch (error) {}
  };
  const handleProductionData3 = async () => {
    const params = {
      class_id: 4,
      start_date: formatStartDate,
      end_date: formatEndDate,
    };
    try {
      const resp = await productiondata(params);
      if (resp.status == 200 || resp.status == 201) {
        setProductionData3(resp.data.payload);
      }
    } catch (error) {}
  };
  const handleProductionData4 = async () => {
    const params = {
      class_id: 5,
      start_date: formatStartDate,
      end_date: formatEndDate,
    };
    try {
      const resp = await productiondata(params);
      if (resp.status == 200 || resp.status == 201) {
        setProductionData4(resp.data.payload);
      }
    } catch (error) {}
  };
  const handleProductionData5 = async () => {
    const params = {
      class_id: 6,
      start_date: formatStartDate,
      end_date: formatEndDate,
    };
    try {
      const resp = await productiondata(params);
      if (resp.status == 200 || resp.status == 201) {
        setProductionData5(resp.data.payload);
      }
    } catch (error) {}
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

  const YieldClass0 = isNaN(
    100 *
      (parseFloat(productionData1.passed) / parseFloat(productionData1.produce))
  )
    ? 0
    : (
        100 *
        (parseFloat(productionData1.passed) / parseFloat(productionData1.produce))
      ).toFixed(2) == "Infinity"
    ? 0
    : (
        100 *
        (parseFloat(productionData1.passed) / parseFloat(productionData1.produce))
      ).toFixed(2);
  const YieldClass00 = isNaN(
    100 *
      (parseFloat(productionData.passed) / parseFloat(productionData.produce))
  )
    ? 0
    : (
        100 *
        (parseFloat(productionData.passed) /
          parseFloat(productionData.produce))
      ).toFixed(2) == "Infinity"
    ? 0
    : (
        100 *
        (parseFloat(productionData.passed) /
          parseFloat(productionData.produce))
      ).toFixed(2);
  const YieldClass1 = isNaN(
    100 *
      (parseFloat(productionData2.passed) / parseFloat(productionData2.produce))
  )
    ? 0
    : (
        100 *
        (parseFloat(productionData2.passed) /
          parseFloat(productionData2.produce))
      ).toFixed(2) == "Infinity"
    ? 0
    : (
        100 *
        (parseFloat(productionData2.passed) /
          parseFloat(productionData2.produce))
      ).toFixed(2);
  const YieldClass2 = isNaN(
    100 *
      (parseFloat(productionData3.passed) / parseFloat(productionData3.produce))
  )
    ? 0
    : (
        100 *
        (parseFloat(productionData3.passed) /
          parseFloat(productionData3.produce))
      ).toFixed(2) == "Infinity"
    ? 0
    : (
        100 *
        (parseFloat(productionData3.passed) /
          parseFloat(productionData3.produce))
      ).toFixed(2);
  const YieldClass3 = isNaN(
    100 *
      (parseFloat(productionData4.passed) / parseFloat(productionData4.produce))
  )
    ? 0
    : (
        100 *
        (parseFloat(productionData4.passed) /
          parseFloat(productionData4.produce))
      ).toFixed(2) == "Infinity"
    ? 0
    : (
        100 *
        (parseFloat(productionData4.passed) /
          parseFloat(productionData4.produce))
      ).toFixed(2);
  const YieldClass4 = isNaN(
    100 *
      (parseFloat(productionData5.passed) / parseFloat(productionData5.produce))
  )
    ? 0
    : (
        100 *
        (parseFloat(productionData5.passed) /
          parseFloat(productionData5.produce))
      ).toFixed(2) == "Infinity"
    ? 0
    : (
        100 *
        (parseFloat(productionData5.passed) /
          parseFloat(productionData5.produce))
      ).toFixed(2);

  const handleConfirmationpopup = () => {
    setisPopup(true);
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
      {isLoading && <Loader />}
      <div className="page-wraper">
        <ToastContainer />
        <div className="page-header" style={{ marginBottom: "20px" }}>
          <Link to="/analytics" className="page-back-btn">
            <ArrowBackIcon />
            <span>Summary</span>
          </Link>
          <div className="header-btn-group d-flex">
            <Box className="header-btn-date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="date-picker-production"
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
            <Box className="header-btn-month">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="date-picker-production"
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
                className={`page-header-btn-excel `}
                onClick={handleConfirmationpopup}
                disabled={!formatStartDate || !formatEndDate}
                style={{
                  pointerEvents:
                    !formatStartDate || !formatEndDate ? "none" : "auto",
                  opacity: !formatStartDate || !formatEndDate ? 0.5 : 1,
                }}
              >
                <img src={images.pdfIcon} alt="pdfIcon" />
              </button>
            ) : (
              <button
                className={`page-header-btn-excel`}
                onClick={handleToastMsg}
              >
                <img src={images.pdfIcon} alt="pdfIcon" />
              </button>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between batchNo p-card">
          <h4>
            <b>Production Qty Class Wise</b>
          </h4>
        </div>
        <div className="production-qty">
          {/* <ChartRenderer startDate={startDate} endDate={endDate} /> */}
          <ProductionChart
            productionData={productionData}
            productionData1={productionData1}
            productionData2={productionData2}
            productionData3={productionData3}
            productionData4={productionData4}
            productionData5={productionData5}
            startDate={formatStartDate}
            endDate={formatEndDate}
            targetData={targetData}
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
              {userPermission.find(
                (permission) => permission.module === "Advanced Analytics"
              ).is_editor == true &&
              userPermission.find(
                (permission) => permission.module === "Advanced Analytics"
              ).is_viewer == true ? (
                <TableRow>
                  <TableCell>
                    <div
                      style={{ color: "black", marginRight: "25px" }}
                      className="d-flex align-items-center"
                    >
                      <span className="target-btn m-1"></span>Target
                    </div>
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className="input-number"
                      name="class_0"
                      onChange={handelTargetData}
                      value={targetData.class_0}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className="input-number"
                      name="class_00"
                      onChange={handelTargetData}
                      value={targetData.class_00}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className="input-number"
                      name="class_1"
                      onChange={handelTargetData}
                      value={targetData.class_1}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className="input-number"
                      name="class_2"
                      onChange={handelTargetData}
                      value={targetData.class_2}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className="input-number"
                      name="class_3"
                      onChange={handelTargetData}
                      value={targetData.class_3}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className="input-number"
                      name="class_4"
                      onChange={handelTargetData}
                      value={targetData.class_4}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell>
                    <div
                      style={{ color: "black", marginRight: "25px" }}
                      className="d-flex align-items-center"
                    >
                      <span className="target-btn m-1"></span>Target
                    </div>
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className="input-number"
                      name="class_0"
                      onChange={handleToastMsg}
                      value={targetData.class_0}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className="input-number"
                      name="class_00"
                      onChange={handleToastMsg}
                      value={targetData.class_00}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className="input-number"
                      name="class_1"
                      onChange={handleToastMsg}
                      value={targetData.class_1}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className="input-number"
                      name="class_2"
                      onChange={handleToastMsg}
                      value={targetData.class_2}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className="input-number"
                      name="class_3"
                      onChange={handleToastMsg}
                      value={targetData.class_3}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className="input-number"
                      name="class_4"
                      onChange={handleToastMsg}
                      value={targetData.class_4}
                    />
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>
                  <div
                    style={{ color: "black", marginRight: "25px" }}
                    className="d-flex align-items-center"
                  >
                    <span className="produced-btn m-1"></span>Produced
                  </div>
                </TableCell>
                <TableCell>{productionData.produce}</TableCell>
                <TableCell>{productionData1.produce}</TableCell>
                <TableCell>{productionData2.produce}</TableCell>
                <TableCell>{productionData3.produce}</TableCell>
                <TableCell>{productionData4.produce}</TableCell>
                <TableCell>{productionData5.produce}</TableCell>
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
                <TableCell>{productionData.passed}</TableCell>
                <TableCell>{productionData1.passed}</TableCell>
                <TableCell>{productionData2.passed}</TableCell>
                <TableCell>{productionData3.passed}</TableCell>
                <TableCell>{productionData4.passed}</TableCell>
                <TableCell>{productionData5.passed}</TableCell>
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
                <TableCell>{productionData.rejected}</TableCell>
                <TableCell>{productionData1.rejected}</TableCell>
                <TableCell>{productionData2.rejected}</TableCell>
                <TableCell>{productionData3.rejected}</TableCell>
                <TableCell>{productionData4.rejected}</TableCell>
                <TableCell>{productionData5.rejected}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div
                    style={{ color: "black", marginRight: "25px" }}
                    className="d-flex align-items-center"
                  >
                    <span className="Yieldbtn m-1"></span>Yield
                  </div>
                </TableCell>
                <TableCell>{YieldClass00}</TableCell>
                <TableCell>{YieldClass0}</TableCell>
                <TableCell>{YieldClass1}</TableCell>
                <TableCell>{YieldClass2}</TableCell>
                <TableCell>{YieldClass3}</TableCell>
                <TableCell>{YieldClass4}</TableCell>
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

              {errorPopup && (
                <>
                  <div className="sendingData">
                    <Card className="card-printer">
                      <CardContent>
                        <h4 className="card-content">
                          <b>{message}</b>
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
        <div className="d-flex justify-content-end">
          <Link
            to="/production/production"
            style={{ color: "#ffff" }}
            className="production-button"
          >
            Production
          </Link>
        </div>
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
                onClick={() => handleExcelClick()}
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
  );
};
