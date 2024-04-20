import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../AdvanceAnalytics/Analytics.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import { CardContent, Grid } from "@material-ui/core";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Quality from "./Quality";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DatePicker from "react-datepicker";
import { ProductionChart } from "./ProductionChart";
import CloseIcon from "@mui/icons-material/Close";
import { getClasses, getSizes } from "../AddBatch/services";
import "react-datepicker/dist/react-datepicker.css";
import { images } from "../../config/images";
import AnalyticsChart from "./AnalyticsChart";
import { cubejsApi } from "../../cubejs/CubeJsApi";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Replace "en" with your desired locale
import {
  advanceAnalyticsReport,
  getAdvanceAnalyticsSummryCount,
} from "./services";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "0 !important",
  },
  removeElement: {
    display: "none !important",
  },
  header: {
    paddingBottom: "8px",
    background: "white !important",
  },
  month: {
    padding: "8px 0",
  },
  selectedMonth: {
    background: "gray !important",
    padding: "8px 0",
  },
  inputBox: {
    // background: 'white !important',
    border: "none",
  },
}));

const Analytics = () => {
  const [dippingTable, setDippingTable] = useState(true);
  const [production, setProduction] = useState(false);
  const [productionDetail, setProductionDetail] = useState(false);
  const [analyticsModal, setAnalyticsModal] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectClass] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [size, setSize] = useState([]);
  const [selectSize, setSelectSize] = useState();
  const [isLoading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [isPopup, setisPopup] = useState(false);

  const { userPermission } = useSelector((state) => state.userState);
  const Variable_Store = {
    Station_2: "",
    Station_3: "",
    Station_4: "",
    Production: "",
    Sales: "",
    Dispatched_pairs: "",
  };
  const [Vstore, setVstore] = useState(Variable_Store);

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

  const [productionResult, setProductionResult] = useState({
    LvData1: 0,
    HvData1: 0,
    ActualData1: 0,
  });

  const [qualityResult, setQualityResult] = useState({
    Tested: 0,
    Accepted: 0,
    Rejected: 0,
  });

  const [salesResult, setSalesResult] = useState({
    Export: 0,
    Domestic: 0,
  });

  const [selectRange, setSelectedRange] = useState([]);
  const [prodResult, setProdResult] = useState([]);

  const dateFormat = "YYYY-MM-DD"; // Replace with your desired date format
  const formatStartDate = startDate ? dayjs(startDate).format(dateFormat) : "";
  const formatEndDate = endDate
    ? dayjs(endDate).endOf("month").format(dateFormat)
    : "";

  console.log("prodResult.....", prodResult);
  // console.log("formatEndDate.....",formatEndDate)
  const ref = useRef();

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

  const handleBack = () => {
    setDippingTable(true);
    setProduction(false);
    setProductionDetail(false);
  };

  const handleCancleClick = () => {
    setAnalyticsModal(false);
  };

  const handleDownloadClick = async () => {
    setisPopup(false);
    setSuccessPopup(true);
    const params = {
      actual: Vstore.Production.actual ? Vstore.Production.actual : 0,
      lv: Vstore.Production.lv_count
        ? ((Vstore.Production.lv_count * 100) / Vstore.Production.actual)
            .toFixed(2)
            .toString() + "%"
        : 0,
      hv: Vstore.Production.hv_count
        ? ((Vstore.Production.hv_count * 100) / Vstore.Production.actual)
            .toFixed(2)
            .toString() + "%"
        : 0,
      tested1: parseInt(Vstore.Station_2.total ? Vstore.Station_2.total : 0),
      accepted1: parseInt(
        Vstore.Station_2.passed ? Vstore.Station_2.passed : 0
      ),
      rejected1: parseInt(
        Vstore.Station_2.failed ? Vstore.Station_2.failed : 0
      ),
      tested2: parseInt(Vstore.Station_3.total ? Vstore.Station_3.total : 0),
      accepted2: parseInt(
        Vstore.Station_3.passed ? Vstore.Station_3.passed : 0
      ),
      rejected2: parseInt(
        Vstore.Station_3.failed ? Vstore.Station_3.failed : 0
      ),
      tested3: parseInt(Vstore.Station_4.total ? Vstore.Station_4.total : 0),
      accepted3: parseInt(
        Vstore.Station_4.passed ? Vstore.Station_4.passed : 0
      ),
      rejected3: parseInt(
        Vstore.Station_4.failed ? Vstore.Station_4.failed : 0
      ),
      dispatched_domestic: Vstore.Dispatched_pairs.domestic
        ? parseInt(Vstore.Dispatched_pairs.domestic)
        : 0,
      dispatched_export: Vstore.Dispatched_pairs.export
        ? parseInt(Vstore.Dispatched_pairs.export)
        : 0,
      sales_domestic: Vstore.Sales.domestic ? Vstore.Sales.domestic : 0,
      sales_export: Vstore.Sales.export ? Vstore.Sales.export : 0,
      start_month: formatStartDate,
      end_month: formatEndDate,
    };
    try {
      const resp = await advanceAnalyticsReport(params);
      if (resp.data.success == true) {
        setSuccessPopup(false);
      }
    } catch (error) {
      setSuccessPopup(false);
      console.log("error");
    }
  };

  const handleDomesticPairs = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const isNumericOrPeriod = /^\d+$|\.$/.test(keyValue);
    if (!isNumericOrPeriod) {
      event.preventDefault();
    }
  };

  const handleExportClick = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const isNumeric = /^\d+$|\.$/.test(keyValue);
    if (!isNumeric) {
      event.preventDefault();
    }
  };
  const handleSelectDateRange = (start, end) => {
    const months = [];
    let currentMonth = start.getMonth();
    let currentYear = start.getFullYear();
    const endMonth = end.getMonth();
    const endYear = end.getFullYear();

    while (
      currentYear < endYear ||
      (currentYear === endYear && currentMonth <= endMonth)
    ) {
      const date = new Date(currentYear, currentMonth);
      const monthString = date.toLocaleString("default", { month: "short" });
      const yearString = date.toLocaleString("default", { year: "numeric" });
      const label = `${monthString}-${yearString}`;
      months.push({ id: currentMonth, label: label });
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    }
    setSelectedRange(months);
  };

  useEffect(() => {
    handelCubejs();
  }, [formatStartDate, formatEndDate, qualityResult]);

  const handelCubejs = async () => {
    if (formatStartDate && formatEndDate) {
      const cumProd = await cubejsApi.load({
        measures: ["ParringPairing.count"],
        order: {
          "ParringPairing.count": "desc",
        },
        dimensions: ["ParringPairing.createdAtMonth"],
        timeDimensions: [
          {
            dimension: "ParringPairing.createdAtMonth",
            dateRange: [`${formatStartDate}`, `${formatEndDate}`],
          },
        ],
      });

      const data = cumProd.loadResponses[0].data;
      const array = data.map((_element, index) => {
        return {
          month: data[index]["ParringPairing.createdAtMonth"],
          count: data[index]["ParringPairing.count"],
        };
      });
      setProdResult(array);
    }
  };

  useEffect(() => {
    if (formatStartDate && formatEndDate) {
      console.log("formatStartDate....useEffect.", formatStartDate);
      console.log("formatEndDate....useEffect.", formatEndDate);
      getAdvanceAnalyticsSummry_Api();
    }
  }, [formatStartDate, formatEndDate]);

  const getAdvanceAnalyticsSummry_Api = async () => {
    try {
      const params = {
        start_date: formatStartDate,
        end_date: formatEndDate,
      };
      const Api = await getAdvanceAnalyticsSummryCount(params);
      if (Api.status === 200) {
        const Station_2 = Api.data.payload.Station_2;
        const Station_3 = Api.data.payload.Station_3;
        const Station_4 = Api.data.payload.Station_4;
        const Production = Api.data.payload.Production;
        const Sales = Api.data.payload.Sales;
        const Dispatched_pairs = Api.data.payload.Dispatched_pairs
          ? Api.data.payload.Dispatched_pairs
          : 0;
        setVstore({
          ...Vstore,
          ["Station_2"]: Station_2,
          ["Station_3"]: Station_3,
          ["Station_4"]: Station_4,
          ["Production"]: Production,
          ["Sales"]: Sales,
          ["Dispatched_pairs"]: Dispatched_pairs,
        });
      }
    } catch (e) {
      console.log("Error from getAdvanceAnalyticsSummryCount Api", e);
    }
  };

  const Lvresult =
    productionResult.ActualData1 !== 0 && !isNaN(productionResult.LvData1)
      ? (
          (productionResult.LvData1 / productionResult.ActualData1) *
          100
        ).toFixed(2) + "%"
      : "0%";

  const Hvresult =
    productionResult.ActualData1 !== 0 && !isNaN(productionResult.HvData1)
      ? (
          (productionResult.HvData1 / productionResult.ActualData1) *
          100
        ).toFixed(2) + "%"
      : "0%";

  const valueInRupees = salesResult.Domestic
    ? salesResult.Domestic["HomeOpenorders.totalOrderPriceSum"]
    : 0;
  const valueInLakhs = (valueInRupees / 100000).toFixed(2);

  const valueExport = salesResult.Export
    ? salesResult.Export["HomeOpenorders.totalOrderPriceSum"]
    : 0;
  const valueExportLakhs = (valueExport / 100000).toFixed(2);

  const handleDispatchedDomestic = (e) => {
    // console.log("e",e.target.value)
    const update = { ...Vstore };
    update.Dispatched_pairs.domestic = e.target.value;
    setVstore(update);
  };

  const handleDispatchedExport = (e) => {
    // console.log("e",e.target.value)
    const update = { ...Vstore };
    update.Dispatched_pairs.export = e.target.value;
    setVstore(update);
  };

  return (
    <div className="page-wraper">
      <ToastContainer />
      <>
        <div className="page-header">
          <Link to="/dashboard" className="page-back-btn" onClick={handleBack}>
            <ArrowBackIcon />
            <span>Summary</span>
          </Link>

          <div className="header-btn-group d-flex">
            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  if (endDate) {
                    handleSelectDateRange(date, endDate);
                  }
                }}
                dateFormat="MMM y"
                className="analytics-date-picker"
                placeholderText="Start Month"
                showMonthYearPicker
                // inline
                ref={ref}
              />
            </div>
            <div>
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  if (startDate) {
                    handleSelectDateRange(startDate, date);
                  }
                }}
                dateFormat="MMM y"
                className="analytics-date-picker"
                placeholderText="End Month"
                showMonthYearPicker
                // inline
                ref={ref}
              />
            </div>
            {userPermission.find(
              (permission) => permission.module === "Advanced Analytics"
            ).is_editor == true &&
            userPermission.find(
              (permission) => permission.module === "Advanced Analytics"
            ).is_viewer == true ? (
              <div
                onClick={() => {
                  if (startDate && endDate) {
                    setisPopup(true);
                  }
                }}
                style={{
                  pointerEvents: (!startDate || !endDate) ? 'none' : 'auto', 
                  opacity: (!startDate || !endDate) ? 0.5 : 1
              }}
              >
                <img
                  src={images.downloadbtn}
                  alt="downloadbtn"
                  style={{ height: "55px", cursor: "pointer" }}
                />
              </div>
            ) : (
              <div onClick={handleToastMsg}>
                <img
                  src={images.downloadbtn}
                  alt="downloadbtn"
                  style={{ height: "55px", cursor: "pointer" }}
                />
              </div>
            )}
          </div>
        </div>

        <div className={`${dippingTable ? "d-block" : "d-none"}`}>
          <Grid container spacing={3}>
            <Grid item xs={7}>
              <div className="d-flex justify-content-between batchNo p-card">
                <h4>
                  <b>Production</b>
                </h4>
              </div>
              <div className="production-data">
                <Grid container>
                  <Grid
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    sx={{ P: 0 }}
                    className="single-data-item"
                  >
                    <Table className="no-border-table transparent-table common-table">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            <b className="pData">Actual</b>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <input
                              id="outlined-basic"
                              className="form-input-production"
                              value={
                                Vstore.Production.actual
                                  ? Vstore.Production.actual
                                  : 0
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    sx={{ P: 0 }}
                    className="single-data-item"
                  >
                    <Table className="no-border-table transparent-table common-table">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            <b className="pData">LV</b>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <input
                              id="outlined-basic"
                              className="form-input-production"
                              value={
                                Vstore.Production.actual &
                                Vstore.Production.lv_count
                                  ? `${(
                                      (Vstore.Production.lv_count * 100) /
                                      Vstore.Production.actual
                                    ).toFixed(2)}%`
                                  : 0
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    sx={{ P: 0 }}
                    className="single-data-item"
                  >
                    <Table className="no-border-table transparent-table common-table">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            <b className="pData">HV</b>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <input
                              id="outlined-basic"
                              className="form-input-production"
                              value={
                                Vstore.Production.actual &
                                Vstore.Production.hv_count
                                  ? `${(
                                      (Vstore.Production.hv_count * 100) /
                                      Vstore.Production.actual
                                    ).toFixed(2)}%`
                                  : "0%"
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </div>

              <div className="d-flex justify-content-between batchNo p-card mt-4">
                <h4>
                  <b>Quality</b>
                </h4>
              </div>
              <div className="production-data" style={{ padding: "16px 0px" }}>
                <Grid container>
                  <Grid
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    sx={{ P: 0 }}
                    className="single-data-item"
                  >
                    <Table className="no-border-table transparent-table common-table">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            <b className="pData" style={{ marginLeft: "50px" }}>
                              Tested
                            </b>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="d-flex">
                              <h6
                                className="mt-3"
                                style={{ marginRight: "20px" }}
                              >
                                St-2
                              </h6>
                              <input
                                id="outlined-basic"
                                className="form-input-production"
                                value={
                                  Vstore.Station_2.total
                                    ? Vstore.Station_2.total
                                    : 0
                                }
                              />
                            </div>
                            <br />
                            <div className="d-flex">
                              <h6
                                className="mt-3"
                                style={{ marginRight: "20px" }}
                              >
                                St-3
                              </h6>
                              <input
                                id="outlined-basic"
                                className="form-input-production"
                                value={
                                  Vstore.Station_3.total
                                    ? Vstore.Station_3.total
                                    : 0
                                }
                              />
                            </div>
                            <br />
                            <div className="d-flex">
                              <h6
                                className="mt-3"
                                style={{ marginRight: "20px" }}
                              >
                                St-4
                              </h6>
                              <input
                                id="outlined-basic"
                                className="form-input-production"
                                value={
                                  Vstore.Station_4.total
                                    ? Vstore.Station_4.total
                                    : 0
                                }
                              />
                            </div>
                            <br />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    sx={{ P: 0 }}
                    className="single-data-item"
                  >
                    <Table className="no-border-table transparent-table common-table">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            <b className="pData">Accepted</b>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <input
                              id="outlined-basic"
                              className="form-input-production"
                              value={
                                Vstore.Station_2.passed
                                  ? Vstore.Station_2.passed
                                  : 0
                              }
                            />
                            <br />
                            <input
                              id="outlined-basic"
                              className="form-input-production mt-3"
                              value={
                                Vstore.Station_3.passed
                                  ? Vstore.Station_3.passed
                                  : 0
                              }
                            />
                            <br />
                            <input
                              id="outlined-basic"
                              className="form-input-production mt-3"
                              value={
                                Vstore.Station_4.passed
                                  ? Vstore.Station_4.passed
                                  : 0
                              }
                            />
                            <br />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    sx={{ P: 0 }}
                    className="single-data-item"
                  >
                    <Table className="no-border-table transparent-table common-table">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            <b className="pData">Rejected</b>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <input
                              id="outlined-basic"
                              className="form-input-production"
                              value={
                                Vstore.Station_2.failed
                                  ? Vstore.Station_2.failed
                                  : 0
                              }
                            />
                            <br />
                            <input
                              id="outlined-basic"
                              className="form-input-production mt-3"
                              value={
                                Vstore.Station_3.failed
                                  ? Vstore.Station_3.failed
                                  : 0
                              }
                            />
                            <br />
                            <input
                              id="outlined-basic"
                              className="form-input-production mt-3"
                              value={
                                Vstore.Station_4.failed
                                  ? Vstore.Station_4.failed
                                  : 0
                              }
                            />
                            <br />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </div>

              <div
                className="d-flex mt-4 production p-card"
                style={{ width: "100%" }}
              >
                <h4 style={{ width: "50%", textAlign: "left" }}>
                  <b>Dispatched Pairs</b>
                </h4>
                <h4
                  style={{
                    width: "50%",
                    textAlign: "left",
                    marginLeft: "15px",
                  }}
                >
                  <b>Sales</b>
                </h4>
              </div>
              <div className="d-flex dispatch-data" style={{ gap: "20px" }}>
                <div className="production-data-table production-data">
                  <Grid container>
                    <Grid
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      sx={{ P: 0 }}
                      className="single-data-item"
                    >
                      <Table className="no-border-table transparent-table common-table">
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              <b className="pData">Domestic</b>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <input
                                id="outlined-basic"
                                className="form-input-production-pairs"
                                value={
                                  Vstore.Dispatched_pairs.domestic
                                    ? Vstore.Dispatched_pairs.domestic
                                    : 0
                                }
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Grid>
                    <Grid
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      sx={{ P: 0 }}
                      className="single-data-item"
                    >
                      <Table className="no-border-table transparent-table common-table">
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              <b className="pData">Export</b>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <input
                                id="outlined-basic"
                                className="form-input-production-pairs"
                                value={
                                  Vstore.Dispatched_pairs.export
                                    ? Vstore.Dispatched_pairs.export
                                    : 0
                                }
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Grid>
                  </Grid>
                </div>

                <div className="production-data-table production-data">
                  <Grid container>
                    <Grid
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      sx={{ P: 0 }}
                      className="single-data-item"
                    >
                      <Table className="no-border-table transparent-table common-table">
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              <b className="pData">Domestic</b>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <input
                                id="outlined-basic"
                                className="form-input-production-pairs"
                                value={
                                  Vstore.Sales.domestic
                                    ? Vstore.Sales.domestic
                                    : 0
                                }
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Grid>
                    <Grid
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      sx={{ P: 0 }}
                      className="single-data-item"
                    >
                      <Table className="no-border-table transparent-table common-table">
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              <b className="pData">Export</b>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <input
                                id="outlined-basic"
                                className="form-input-production-pairs"
                                value={
                                  Vstore.Sales.export ? Vstore.Sales.export : 0
                                }
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
            <Grid item xs={5}>
              <div className="d-flex justify-content-between batchNo p-card position-relative">
                <h4>
                  <b>After Stripping in Pairs Vs Yield% Trend</b>
                </h4>
              </div>
              <Card className="chart-card">
                <AnalyticsChart
                  startDate={startDate}
                  endDate={endDate}
                  prodResult={prodResult}
                  selectRange={selectRange}
                  qualityResult={qualityResult}
                />
              </Card>
            </Grid>
          </Grid>
          {isLoading && <Loader />}
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

          <div className="pt-4 d-flex gap-3">
            <Link
              to="/production"
              style={{ color: "#ffff" }}
              className="production-btn"
            >
              PRODUCTION
            </Link>
            <Link
              to="/analytics/quality"
              style={{ color: "#ffff" }}
              className="production-btn"
            >
              QUALITY
            </Link>
            <Link
              to="/sales-summary"
              style={{ color: "#ffff" }}
              className="production-btn"
            >
              SALES
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
                  onClick={() => handleDownloadClick()}
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
export default Analytics;
