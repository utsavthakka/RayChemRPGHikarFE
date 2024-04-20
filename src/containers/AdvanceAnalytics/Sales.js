import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import "../AdvanceAnalytics/Sales.css";
import React, { useState } from "react";
import { cubejsApi } from "../../cubejs/CubeJsApi";
import { useEffect } from "react";
import SalesChart from "../AdvanceAnalytics/SalesChart";
import { salesSummaryReport } from "./services";
import { Card, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { images } from "../../config/images";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";

const dateFormat = "YYYY-MM-DD"; // Replace with your desired date format

export const Sales = () => {
  const [successPopup, setSuccessPopup] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [isPopup, setisPopup] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [salesData, setSalesData] = useState({
    saleClassValue00: "",
    saleClassValue0: "",
    saleClassValue1: "",
    saleClassValue2: "",
    saleClassValue3: "",
    saleClassValue4: "",
    salesExportClassValue00: "",
    salesExportClassValue0: "",
    salesExportClassValue1: "",
    salesExportClassValue2: "",
    salesExportClassValue3: "",
    salesExportClassValue4: "",
  });
  const { userPermission } = useSelector((state) => state.userState);
  const handleExcelSalesSummary = async () => {
    setisPopup(false);
    setSuccessPopup(true);
    const params = {
      export_class00: ExportClass0,
      domestic_class00: DomesticClass0,
      total_class00: TotalClass0,
      export_class0: ExportClass00,
      domestic_class0: DomesticClass00,
      total_class0: TotalClass00,
      export_class1: ExportClass1,
      domestic_class1: DomesticClass1,
      total_class1: TotalClass1,
      export_class2: ExportClass2,
      domestic_class2: DomesticClass2,
      total_class2: TotalClass2,
      export_class3: ExportClass3,
      domestic_class3: DomesticClass3,
      total_class3: TotalClass3,
      export_class4: ExportClass4,
      domestic_class4: DomesticClass4,
      total_class4: TotalClass4,
      start_date: startDate,
      end_date: endDate,
    };
    try {
      const resp = await salesSummaryReport(params);
      if (resp.data.success == true) {
        setSuccessPopup(false);
      }
    } catch (error) {
      setSuccessPopup(false);
      console.log("error");
    }
  };

  const formatStartDate = startDate ? dayjs(startDate).format(dateFormat) : "";
  const formatEndDate = endDate ? dayjs(endDate).format(dateFormat) : "";
  const handleCubejsData = async () => {
    if (startDate && endDate) {
      const saleClassValue00 = await cubejsApi.load({
        measures: ["HomeOpenorders.totalOrderPriceSum"],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.createdAt",
            dateRange: [`${formatStartDate}`, `${formatEndDate}`],
          },
        ],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: ["1"],
          },
          {
            member: "HomeOpenorders.orderType",
            operator: "contains",
            values: ["Domestic"],
          },
        ],
      });
      const saleClassValue0 = await cubejsApi.load({
        measures: ["HomeOpenorders.totalOrderPriceSum"],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.createdAt",
            dateRange: [`${formatStartDate}`, `${formatEndDate}`],
          },
        ],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: ["2"],
          },
          {
            member: "HomeOpenorders.orderType",
            operator: "contains",
            values: ["Domestic"],
          },
        ],
      });
      const saleClassValue1 = await cubejsApi.load({
        measures: ["HomeOpenorders.totalOrderPriceSum"],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.createdAt",
            dateRange: [`${formatStartDate}`, `${formatEndDate}`],
          },
        ],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: ["3"],
          },
          {
            member: "HomeOpenorders.orderType",
            operator: "contains",
            values: ["Domestic"],
          },
        ],
      });
      const saleClassValue2 = await cubejsApi.load({
        measures: ["HomeOpenorders.totalOrderPriceSum"],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.createdAt",
            dateRange: [`${formatStartDate}`, `${formatEndDate}`],
          },
        ],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: ["4"],
          },
          {
            member: "HomeOpenorders.orderType",
            operator: "contains",
            values: ["Domestic"],
          },
        ],
      });
      const saleClassValue3 = await cubejsApi.load({
        measures: ["HomeOpenorders.totalOrderPriceSum"],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.createdAt",
            dateRange: [`${formatStartDate}`, `${formatEndDate}`],
          },
        ],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: ["5"],
          },
          {
            member: "HomeOpenorders.orderType",
            operator: "contains",
            values: ["Domestic"],
          },
        ],
      });
      const saleClassValue4 = await cubejsApi.load({
        measures: ["HomeOpenorders.totalOrderPriceSum"],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.createdAt",
            dateRange: [`${formatStartDate}`, `${formatEndDate}`],
          },
        ],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: ["6"],
          },
          {
            member: "HomeOpenorders.orderType",
            operator: "contains",
            values: ["Domestic"],
          },
        ],
      });

      const salesExportClassValue00 = await cubejsApi.load({
        measures: ["HomeOpenorders.totalOrderPriceSum"],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.createdAt",
            dateRange: [`${formatStartDate}`, `${formatEndDate}`],
          },
        ],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: ["1"],
          },
          {
            member: "HomeOpenorders.orderType",
            operator: "contains",
            values: ["Export"],
          },
        ],
      });
      const salesExportClassValue0 = await cubejsApi.load({
        measures: ["HomeOpenorders.totalOrderPriceSum"],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.createdAt",
            dateRange: [`${formatStartDate}`, `${formatEndDate}`],
          },
        ],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: ["2"],
          },
          {
            member: "HomeOpenorders.orderType",
            operator: "contains",
            values: ["Export"],
          },
        ],
      });
      const salesExportClassValue1 = await cubejsApi.load({
        measures: ["HomeOpenorders.totalOrderPriceSum"],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.createdAt",
            dateRange: [`${formatStartDate}`, `${formatEndDate}`],
          },
        ],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: ["3"],
          },
          {
            member: "HomeOpenorders.orderType",
            operator: "contains",
            values: ["Export"],
          },
        ],
      });
      const salesExportClassValue2 = await cubejsApi.load({
        measures: ["HomeOpenorders.totalOrderPriceSum"],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.createdAt",
            dateRange: [`${formatStartDate}`, `${formatEndDate}`],
          },
        ],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: ["4"],
          },
          {
            member: "HomeOpenorders.orderType",
            operator: "contains",
            values: ["Export"],
          },
        ],
      });
      const salesExportClassValue3 = await cubejsApi.load({
        measures: ["HomeOpenorders.totalOrderPriceSum"],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.createdAt",
            dateRange: [`${formatStartDate}`, `${formatEndDate}`],
          },
        ],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: ["5"],
          },
          {
            member: "HomeOpenorders.orderType",
            operator: "contains",
            values: ["Export"],
          },
        ],
      });
      const salesExportClassValue4 = await cubejsApi.load({
        measures: ["HomeOpenorders.totalOrderPriceSum"],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.createdAt",
            dateRange: [`${formatStartDate}`, `${formatEndDate}`],
          },
        ],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: ["6"],
          },
          {
            member: "HomeOpenorders.orderType",
            operator: "contains",
            values: ["Export"],
          },
        ],
      });

      setSalesData({
        saleClassValue00: saleClassValue00,
        saleClassValue0: saleClassValue0,
        saleClassValue1: saleClassValue1,
        saleClassValue2: saleClassValue2,
        saleClassValue3: saleClassValue3,
        saleClassValue4: saleClassValue4,

        salesExportClassValue00: salesExportClassValue00,
        salesExportClassValue0: salesExportClassValue0,
        salesExportClassValue1: salesExportClassValue1,
        salesExportClassValue2: salesExportClassValue2,
        salesExportClassValue3: salesExportClassValue3,
        salesExportClassValue4: salesExportClassValue4,
      });
    }
  };

  useEffect(() => {
    handleCubejsData();
  }, [formatStartDate, formatEndDate]);

  const sum = (
    (parseFloat(
      salesData.salesExportClassValue00?.loadResponses?.[0]?.data?.[0]?.[
        "HomeOpenorders.totalOrderPriceSum"
      ] ?? 0
    ) +
      parseFloat(
        salesData.saleClassValue00?.loadResponses?.[0]?.data?.[0]?.[
          "HomeOpenorders.totalOrderPriceSum"
        ] ?? 0
      ) +
      parseFloat(
        salesData.salesExportClassValue0?.loadResponses?.[0]?.data?.[0]?.[
          "HomeOpenorders.totalOrderPriceSum"
        ] ?? 0
      ) +
      parseFloat(
        salesData.saleClassValue0?.loadResponses?.[0]?.data?.[0]?.[
          "HomeOpenorders.totalOrderPriceSum"
        ] ?? 0
      ) +
      parseFloat(
        salesData.salesExportClassValue1?.loadResponses?.[0]?.data?.[0]?.[
          "HomeOpenorders.totalOrderPriceSum"
        ] ?? 0
      ) +
      parseFloat(
        salesData.saleClassValue1?.loadResponses?.[0]?.data?.[0]?.[
          "HomeOpenorders.totalOrderPriceSum"
        ] ?? 0
      ) +
      parseFloat(
        salesData.salesExportClassValue2?.loadResponses?.[0]?.data?.[0]?.[
          "HomeOpenorders.totalOrderPriceSum"
        ] ?? 0
      ) +
      parseFloat(
        salesData.saleClassValue2?.loadResponses?.[0]?.data?.[0]?.[
          "HomeOpenorders.totalOrderPriceSum"
        ] ?? 0
      ) +
      parseFloat(
        salesData.salesExportClassValue3?.loadResponses?.[0]?.data?.[0]?.[
          "HomeOpenorders.totalOrderPriceSum"
        ] ?? 0
      ) +
      parseFloat(
        salesData.saleClassValue3?.loadResponses?.[0]?.data?.[0]?.[
          "HomeOpenorders.totalOrderPriceSum"
        ] ?? 0
      ) +
      parseFloat(
        salesData.salesExportClassValue4?.loadResponses?.[0]?.data?.[0]?.[
          "HomeOpenorders.totalOrderPriceSum"
        ] ?? 0
      ) +
      parseFloat(
        salesData.saleClassValue4?.loadResponses?.[0]?.data?.[0]?.[
          "HomeOpenorders.totalOrderPriceSum"
        ] ?? 0
      )) /
    100000
  )
    .toFixed(2)
    .replace(/(NaN|Infinity)/, "0");

  const ExportClass0 = salesData.salesExportClassValue00
    ? (
        parseFloat(
          salesData.salesExportClassValue00.loadResponses[0].data[0][
            "HomeOpenorders.totalOrderPriceSum"
          ]
        ) / 100000
      )
        .toFixed(2)
        .replace(/(NaN|Infinity)/, "0")
    : null;
  const ExportClass00 = salesData.salesExportClassValue0
    ? (
        parseFloat(
          salesData.salesExportClassValue0.loadResponses[0].data[0][
            "HomeOpenorders.totalOrderPriceSum"
          ]
        ) / 100000
      )
        .toFixed(2)
        .replace(/(NaN|Infinity)/, "0")
    : null;
  const ExportClass1 = salesData.salesExportClassValue1
    ? (
        parseFloat(
          salesData.salesExportClassValue1.loadResponses[0].data[0][
            "HomeOpenorders.totalOrderPriceSum"
          ]
        ) / 100000
      )
        .toFixed(2)
        .replace(/(NaN|Infinity)/, "0")
    : null;
  const ExportClass2 = salesData.salesExportClassValue2
    ? (
        parseFloat(
          salesData.salesExportClassValue2.loadResponses[0].data[0][
            "HomeOpenorders.totalOrderPriceSum"
          ]
        ) / 100000
      )
        .toFixed(2)
        .replace(/(NaN|Infinity)/, "0")
    : null;
  const ExportClass3 = salesData.salesExportClassValue3
    ? (
        parseFloat(
          salesData.salesExportClassValue3.loadResponses[0].data[0][
            "HomeOpenorders.totalOrderPriceSum"
          ]
        ) / 100000
      )
        .toFixed(2)
        .replace(/(NaN|Infinity)/, "0")
    : null;
  const ExportClass4 = salesData.salesExportClassValue4
    ? (
        parseFloat(
          salesData.salesExportClassValue4.loadResponses[0].data[0][
            "HomeOpenorders.totalOrderPriceSum"
          ]
        ) / 100000
      )
        .toFixed(2)
        .replace(/(NaN|Infinity)/, "0")
    : null;

  const DomesticClass0 = salesData.saleClassValue00
    ? (
        parseFloat(
          salesData.saleClassValue00.loadResponses[0].data[0][
            "HomeOpenorders.totalOrderPriceSum"
          ]
        ) / 100000
      )
        .toFixed(2)
        .replace(/(NaN|Infinity)/, "0")
    : null;
  const DomesticClass00 = salesData.saleClassValue0
    ? (
        parseFloat(
          salesData.saleClassValue0.loadResponses[0].data[0][
            "HomeOpenorders.totalOrderPriceSum"
          ]
        ) / 100000
      )
        .toFixed(2)
        .replace(/(NaN|Infinity)/, "0")
    : null;
  const DomesticClass1 = salesData.saleClassValue1
    ? (
        parseFloat(
          salesData.saleClassValue1.loadResponses[0].data[0][
            "HomeOpenorders.totalOrderPriceSum"
          ]
        ) / 100000
      )
        .toFixed(2)
        .replace(/(NaN|Infinity)/, "0")
    : null;
  const DomesticClass2 = salesData.saleClassValue2
    ? (
        parseFloat(
          salesData.saleClassValue2.loadResponses[0].data[0][
            "HomeOpenorders.totalOrderPriceSum"
          ]
        ) / 100000
      )
        .toFixed(2)
        .replace(/(NaN|Infinity)/, "0")
    : null;
  const DomesticClass3 = salesData.saleClassValue3
    ? (
        parseFloat(
          salesData.saleClassValue3.loadResponses[0].data[0][
            "HomeOpenorders.totalOrderPriceSum"
          ]
        ) / 100000
      )
        .toFixed(2)
        .replace(/(NaN|Infinity)/, "0")
    : null;
  const DomesticClass4 = salesData.saleClassValue4
    ? (
        parseFloat(
          salesData.saleClassValue4.loadResponses[0].data[0][
            "HomeOpenorders.totalOrderPriceSum"
          ]
        ) / 100000
      )
        .toFixed(2)
        .replace(/(NaN|Infinity)/, "0")
    : null;

  const TotalClass0 =
    salesData.salesExportClassValue00 && salesData.saleClassValue00
      ? (
          (parseFloat(
            salesData.salesExportClassValue00.loadResponses[0].data[0][
              "HomeOpenorders.totalOrderPriceSum"
            ]
          ) +
            parseFloat(
              salesData.saleClassValue00.loadResponses[0].data[0][
                "HomeOpenorders.totalOrderPriceSum"
              ]
            )) /
          100000
        )
          .toFixed(2)
          .replace(/(NaN|Infinity)/, "0")
      : null;
  const TotalClass00 =
    salesData.salesExportClassValue0 && salesData.saleClassValue0
      ? (
          (parseFloat(
            salesData.salesExportClassValue0.loadResponses[0].data[0][
              "HomeOpenorders.totalOrderPriceSum"
            ]
          ) +
            parseFloat(
              salesData.saleClassValue0.loadResponses[0].data[0][
                "HomeOpenorders.totalOrderPriceSum"
              ]
            )) /
          100000
        )
          .toFixed(2)
          .replace(/(NaN|Infinity)/, "0")
      : null;
  const TotalClass1 =
    salesData.salesExportClassValue1 && salesData.saleClassValue1
      ? (
          (parseFloat(
            salesData.salesExportClassValue1.loadResponses[0].data[0][
              "HomeOpenorders.totalOrderPriceSum"
            ]
          ) +
            parseFloat(
              salesData.saleClassValue1.loadResponses[0].data[0][
                "HomeOpenorders.totalOrderPriceSum"
              ]
            )) /
          100000
        )
          .toFixed(2)
          .replace(/(NaN|Infinity)/, "0")
      : null;
  const TotalClass2 =
    salesData.salesExportClassValue2 && salesData.saleClassValue2
      ? (
          (parseFloat(
            salesData.salesExportClassValue2.loadResponses[0].data[0][
              "HomeOpenorders.totalOrderPriceSum"
            ]
          ) +
            parseFloat(
              salesData.saleClassValue2.loadResponses[0].data[0][
                "HomeOpenorders.totalOrderPriceSum"
              ]
            )) /
          100000
        )
          .toFixed(2)
          .replace(/(NaN|Infinity)/, "0")
      : null;
  const TotalClass3 =
    salesData.salesExportClassValue3 && salesData.saleClassValue3
      ? (
          (parseFloat(
            salesData.salesExportClassValue3.loadResponses[0].data[0][
              "HomeOpenorders.totalOrderPriceSum"
            ]
          ) +
            parseFloat(
              salesData.saleClassValue3.loadResponses[0].data[0][
                "HomeOpenorders.totalOrderPriceSum"
              ]
            )) /
          100000
        )
          .toFixed(2)
          .replace(/(NaN|Infinity)/, "0")
      : null;
  const TotalClass4 =
    salesData.salesExportClassValue4 && salesData.saleClassValue4
      ? (
          (parseFloat(
            salesData.salesExportClassValue4.loadResponses[0].data[0][
              "HomeOpenorders.totalOrderPriceSum"
            ]
          ) +
            parseFloat(
              salesData.saleClassValue4.loadResponses[0].data[0][
                "HomeOpenorders.totalOrderPriceSum"
              ]
            )) /
          100000
        )
          .toFixed(2)
          .replace(/(NaN|Infinity)/, "0")
      : null;

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
    <>
      <div className="page-wraper page-wrap-scope">
        <ToastContainer />
        <div
          className="page-header page-header-table"
          style={{ marginTop: "-268px" }}
        >
          <Link to="/analytics" className="page-back-btn">
            <ArrowBackIcon />
            <span>Dispatch & Sales</span>
          </Link>
          <div className="header-btn-group">
            <Box className="header-btn-date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="Sales-summary-date-picker"
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
                  className="Sales-summary-date-picker"
                  label="End Date"
                  inputFormat="YYYY-MM-DD"
                  format="YYYY-MM-DD"
                  disableFuture
                  shouldDisableDate={disableEndDate}
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
            {userPermission.find(
              (permission) => permission.module === "Advanced Analytics"
            ).is_editor == true &&
            userPermission.find(
              (permission) => permission.module === "Advanced Analytics"
            ).is_viewer == true ? (
              <button
                className={`page-header-btn-excel`}
                onClick={() => setisPopup(true)}
                style={{
                  pointerEvents: !startDate || !endDate ? "none" : "auto",
                  opacity: !startDate || !endDate ? 0.5 : 1,
                }}
              >
                <img src={images.pdfIcon} alt="pdfIcon" />
              </button>
            ) : (
              <button
                className={`page-header-btn-excel`}
                onClick={() => handleToastMsg()}
              >
                <img src={images.pdfIcon} alt="pdfIcon" />
              </button>
            )}
          </div>
        </div>
        <div className="sales-card d-flex" style={{ marginTop: "1px" }}>
          <p>
            Domestic :{" "}
            {(
              (parseFloat(
                salesData.saleClassValue00?.loadResponses?.[0]?.data?.[0]?.[
                  "HomeOpenorders.totalOrderPriceSum"
                ] ?? 0
              ) +
                parseFloat(
                  salesData.saleClassValue0?.loadResponses?.[0]?.data?.[0]?.[
                    "HomeOpenorders.totalOrderPriceSum"
                  ] ?? 0
                ) +
                parseFloat(
                  salesData.saleClassValue1?.loadResponses?.[0]?.data?.[0]?.[
                    "HomeOpenorders.totalOrderPriceSum"
                  ] ?? 0
                ) +
                parseFloat(
                  salesData.saleClassValue2?.loadResponses?.[0]?.data?.[0]?.[
                    "HomeOpenorders.totalOrderPriceSum"
                  ] ?? 0
                ) +
                parseFloat(
                  salesData.saleClassValue3?.loadResponses?.[0]?.data?.[0]?.[
                    "HomeOpenorders.totalOrderPriceSum"
                  ] ?? 0
                ) +
                parseFloat(
                  salesData.saleClassValue4?.loadResponses?.[0]?.data?.[0]?.[
                    "HomeOpenorders.totalOrderPriceSum"
                  ] ?? 0
                )) /
              100000
            ).toFixed(2)}
          </p>
          <p>
            Export :{" "}
            {(
              (parseFloat(
                salesData.salesExportClassValue00?.loadResponses?.[0]
                  ?.data?.[0]?.["HomeOpenorders.totalOrderPriceSum"] ?? 0
              ) +
                parseFloat(
                  salesData.salesExportClassValue0?.loadResponses?.[0]
                    ?.data?.[0]?.["HomeOpenorders.totalOrderPriceSum"] ?? 0
                ) +
                parseFloat(
                  salesData.salesExportClassValue1?.loadResponses?.[0]
                    ?.data?.[0]?.["HomeOpenorders.totalOrderPriceSum"] ?? 0
                ) +
                parseFloat(
                  salesData.salesExportClassValue2?.loadResponses?.[0]
                    ?.data?.[0]?.["HomeOpenorders.totalOrderPriceSum"] ?? 0
                ) +
                parseFloat(
                  salesData.salesExportClassValue3?.loadResponses?.[0]
                    ?.data?.[0]?.["HomeOpenorders.totalOrderPriceSum"] ?? 0
                ) +
                parseFloat(
                  salesData.salesExportClassValue4?.loadResponses?.[0]
                    ?.data?.[0]?.["HomeOpenorders.totalOrderPriceSum"] ?? 0
                )) /
              100000
            ).toFixed(2)}
          </p>
          <p>Total : {sum}</p>
        </div>
        <div className="production-qty" style={{ marginTop: "79px" }}>
          <SalesChart
            salesData={salesData}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div>
          <div className="table-responsive sales-table">
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
                      <span className="export-btn m-1"></span> Export
                    </div>
                  </TableCell>
                  <TableCell>{ExportClass0}</TableCell>
                  <TableCell>{ExportClass00}</TableCell>
                  <TableCell>{ExportClass1}</TableCell>
                  <TableCell>{ExportClass2}</TableCell>
                  <TableCell>{ExportClass3}</TableCell>
                  <TableCell>{ExportClass4}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div
                      style={{ color: "black", marginRight: "25px" }}
                      className="d-flex align-items-center"
                    >
                      <span className="acceptedparam-btn m-1"></span> Domestic
                    </div>
                  </TableCell>
                  <TableCell>{DomesticClass0}</TableCell>
                  <TableCell>{DomesticClass00}</TableCell>
                  <TableCell>{DomesticClass1}</TableCell>
                  <TableCell>{DomesticClass2}</TableCell>
                  <TableCell>{DomesticClass3}</TableCell>
                  <TableCell>{DomesticClass4}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div
                      style={{ color: "black", marginRight: "25px" }}
                      className="d-flex align-items-center"
                    >
                      <span className="produced-btn m-1"></span> Total
                    </div>
                  </TableCell>
                  <TableCell> {TotalClass0}</TableCell>
                  <TableCell>{TotalClass00}</TableCell>
                  <TableCell>{TotalClass1}</TableCell>
                  <TableCell>{TotalClass2}</TableCell>
                  <TableCell>{TotalClass3}</TableCell>
                  <TableCell>{TotalClass4}</TableCell>
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
                    onClick={() => handleExcelSalesSummary()}
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
