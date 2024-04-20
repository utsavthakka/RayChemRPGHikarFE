import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { images } from "../../config/images";
import { useCubeQuery } from "@cubejs-client/react";
import { useMemo } from "react";
import SubProductionChart from "./SubProductionDetailChart";
import { cubejsApi } from "../../cubejs/CubeJsApi";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Replace "en" with your desired locale
import ElectricTestLineChart from "./ElectricTestLineChart";
import { electricTestRejectionChartReport } from "./services";
import { Card, CardContent } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";

const dateFormat = "YYYY-MM-DD"; // Replace with your desired date format
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

export const ElectricTestRejectionTable = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectRange, setSelectedRange] = useState([]);
  const [prodResult, setProdResult] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [successPopup, setSuccessPopup] = useState(false);
  const [isPopup,setisPopup] = useState(false);

  const { userPermission } = useSelector((state) => state.userState);
  const formatStartDate = startDate ? dayjs(startDate).format(dateFormat) : "";
  const formatEndDate = endDate
    ? dayjs(endDate).endOf("month").format(dateFormat)
    : "";

  const ref = useRef();

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

  const handelCubeJs = async () => {
    if (startDate && endDate) {
      const cumProd = await cubejsApi.load({
        measures: [
          "GlovesTrackingGlovestracking.ElectricTestTotal",
          "GlovesTrackingGlovestracking.ElectricTestRejected",
        ],
        timeDimensions: [
          {
            dimension: "GlovesTrackingGlovestracking.createdAt",
            granularity:"month",
            dateRange: [`${formatStartDate}`, `${formatEndDate}`],
          },
        ],
      });

      const data = cumProd.loadResponses[0].data;
      console.log("data",data)
      const array = data.map((_element, index) => {
        const rejected =
          data[index]["GlovesTrackingGlovestracking.ElectricTestRejected"];
        const total =
          data[index]["GlovesTrackingGlovestracking.ElectricTestTotal"];
        const ratio =
          isNaN(rejected) || isNaN(total) || total === 0
            ? 0
            : (rejected / total) * 100;
        return {
          month: data[index]["GlovesTrackingGlovestracking.createdAt.month"],
          count: ratio.toFixed(2),
        };
      });

      setProdResult(array);
    }
  };
  useEffect(() => {
    handelCubeJs();
    console.log("formatEndDate",formatEndDate)
    console.log("formatStartDate",formatStartDate)
  }, [formatStartDate, formatEndDate]);

  const handleRejectChartReport = async()=>{
    setisPopup(false);
    setSuccessPopup(true)
    const params = {
      data : {},
      start_month :formatStartDate,
      end_month :formatEndDate
    }
    console.log("prodResult",prodResult)
    selectRange.forEach((month, index) => {
      const key = `${month.label}`;
      const countArr = prodResult.map((e) => e.count);
      params.data[key] = [
        countArr[index],
        inputValues.length
          ? inputValues[index]
            ? inputValues[index]
            : "0"
          : "0",
      ];
    })
    try {
      const resp = await electricTestRejectionChartReport(params);
      if (resp.data.success == true) {
        setSuccessPopup(false)
      }
    } catch (error) {
        setSuccessPopup(false)
    }
  }

  return (
    <>
      <div className="page-wraper">
        <ToastContainer />
        <div className="page-header">
          <Link to="/quality-analytics" className="page-back-btn">
            <ArrowBackIcon />
            <span>Electric Test</span>
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
                ref={ref}
              />
            </div>
            { userPermission.find(
                      (permission) => permission.module === "Advanced Analytics" ).is_editor == true &&
          userPermission.find(
          (permission) => permission.module === "Advanced Analytics"
        ) .is_viewer == true ?
            <button className={`page-header-btn-excel`} onClick={()=>setisPopup(true)} disabled={!startDate || !endDate } 
            style={{
              pointerEvents: (!startDate || !endDate) ? 'none' : 'auto', 
              opacity: (!startDate || !endDate) ? 0.5 : 1
          }}
            >
              <img src={images.pdfIcon} alt="pdfIcon" />
            </button>
            :
            <button className={`page-header-btn-excel`} onClick={handleToastMsg}>
            <img src={images.pdfIcon} alt="pdfIcon" />
          </button>
            
            }
          </div>
        </div>
        <div className="d-flex justify-content-between batchNo p-card">
          <h4>
            <b>Trend for Rejection in Electrical Testing</b>
          </h4>
        </div>
        <div className="production-qty production-qty-subproduction">
          <ElectricTestLineChart selectRange={selectRange} prodResult={prodResult} startDate={formatStartDate} endDate={formatEndDate} inputValues={inputValues} />
        </div>
        <div className="table-responsive production-table">
          <Table aria-label="Analytics" style={{ backgroundColor: "#FFFF" }}>
            <TableHead>
              <TableRow>
                <TableCell>Parameters</TableCell>
                {selectRange.map((month) => (
                  <TableCell key={month.id}>
                    {month.month}
                    {month.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="subproduction-tablebody">
              <TableRow>
                <TableCell>
                  <div
                    style={{ color: "black", marginRight: "25px" }}
                    className="d-flex align-items-center"
                  >
                    <span className="rejectedparam-btn m-1"></span>
                    Actual
                  </div>
                </TableCell>
                {prodResult.length
                  ? prodResult.map((e, index) => (
                      <TableCell>{e.count}</TableCell>
                    ))
                  : null}
              </TableRow>
              { userPermission.find(
                      (permission) => permission.module === "Advanced Analytics" ).is_editor == true &&
          userPermission.find(
          (permission) => permission.module === "Advanced Analytics"
        ) .is_viewer == true ?
              <TableRow>
                <TableCell>
                  {" "}
                  <div
                    style={{ color: "black", marginRight: "25px" }}
                    className="d-flex align-items-center"
                  >
                    <span className="target-btn-test m-1" ></span> Target
                  </div>
                </TableCell>
                {prodResult.length
                  ? prodResult.map((e, index) => (
                      <TableCell>
                        <input
                          type="number"
                         className="input-number"
                          value={inputValues[index] || ""}
                          onChange={(event) => {
                            const newInputValues = [...inputValues];
                            newInputValues[index] = event.target.value;
                            setInputValues(newInputValues);
                          }}
                        />
                      </TableCell>
                    ))
                  : null}
              </TableRow>
              :
              <TableRow>
              <TableCell>
                {" "}
                <div
                  style={{ color: "black", marginRight: "25px" }}
                  className="d-flex align-items-center"
                >
                  <span className="target-btn-test m-1" ></span> Target
                </div>
              </TableCell>
     
                    <TableCell>
                      <input
                        type="number"
                       className="input-number"
                    
                        onChange={handleToastMsg}
                      />
                    </TableCell>
                
            </TableRow>
              
              }
              {successPopup && (
                  <>
                    <div className="sendingData">
                      <Card className="card-printer">
                        <CardContent>
                          <h4 className="card-content">
                            <b>Email Sent to Your Mailbox! <img src={require("../../assets/images/correctIcon.png")} style={{height:"25px", width:"25px"}} alt="correctIcon"/></b>
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

        {isPopup?
      (
          <>
            <div className="sendingdataaaa1">
              <Card className="pairingcard-Approved">
                <CardContent className="p-0 pairing-status">
                  <h4>Are you sure you want to get the PDF?</h4>
                </CardContent>
                <Button className='pairingcard-btn' title='Yes'  onClick={()=>handleRejectChartReport()} />
                <Button className='pairingcard-btn' title='No' onClick={()=>setisPopup(false)}  />

              </Card>
            </div>
          </>
        )
      :null} 
        <div className="d-flex justify-content-end aborted">
          <p style={{ margin: 0, marginBottom: 0 }}>
            Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
            Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
};
