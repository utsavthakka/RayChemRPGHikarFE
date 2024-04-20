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
import DatePicker from "react-datepicker";
import { useState } from "react";
import { images } from "../../config/images";
import SubProductionChart from "./SubProductionDetailChart";
import { cubejsApi } from "../../cubejs/CubeJsApi";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Replace "en" with your desired locale
import { productionTotalAcceptedPairsReport } from "./services";
import { Card, CardContent } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProductionSummryCount } from "./services";
import Button from "../../components/Button/Button";

const dateFormat = "YYYY-MM-DD"; // Replace with your desired date format

export const SubProduction = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectRange, setSelectedRange] = useState([]);
  const [prodResult, setProdResult] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [successPopup, setSuccessPopup] = useState(false);
  const [Monthlist, setMonthlist] = useState([]);
  const [Popupmessage, setPopupmessage] = useState("");
  const [popupStatus, setpopupStatus] = useState(false);
  const [isPopup, setisPopup] = useState(false);

  const { userPermission } = useSelector((state) => state.userState);

  const formatStartDate = startDate ? dayjs(startDate).format(dateFormat) : "";
  const formatEndDate = endDate
    ? dayjs(endDate).endOf("month").format(dateFormat)
    : "";

  const ref = useRef();

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

  const handlegetProductionSummry = async () => {
    try {
      const params = {
        start_date: formatStartDate,
        end_date: formatEndDate,
      };
      const api = await getProductionSummryCount(params);

      if (api.data.success === true) {
        const data = api.data.payload;
        setMonthlist(Object.keys(data));
        setProdResult(Object.values(data));
      }
    } catch (e) {
      console.log("e.response", e.response.data.message);
      const error_message = e.response.data.message;
      setpopupStatus(true);
      setPopupmessage(error_message);
      setProdResult("");
      setSelectedRange("");
    }
  };

  useEffect(() => {
    if (formatStartDate && formatEndDate) {
      handlegetProductionSummry();
    }
  }, [formatStartDate, formatEndDate]);

  const productionTotalPairsReport = async () => {
    setisPopup(false);
    setSuccessPopup(true);

    console.log("prodResult", prodResult);
    const params = {
      data: {},
      start_month: formatStartDate,
      end_month: formatEndDate,
    };

    if (selectRange) {
      console.log("selectRange", selectRange);
      selectRange.forEach((month, index) => {
        const key = `${month.label}`;
        const countArr = prodResult.map((e) => e.count);
        const sumArry = prodResult.map((value, index) => {
          const prevCounts =
            index === 0
              ? []
              : prodResult.slice(0, index).map((item) => parseInt(item.count));
          const sum = prevCounts.reduce((acc, curr) => acc + curr, 0);
          return sum + parseInt(value.count);
        });

        params.data[key] = [
          prodResult[index].produced_pair_in_nos,
          prodResult[index].cum_prods_till_month_1,
          0,
        ];
      });
    }

    console.log("...params", params);

    try {
      const resp = await productionTotalAcceptedPairsReport(params);
      if (resp.data.success == true) {
        setTimeout(() => {
          setSuccessPopup(false);
        }, 3000);
        setStartDate(null);
        setEndDate(null);
      }
    } catch (error) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, 3000);
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

  const popuphandle = () => {
    setpopupStatus(false);
    setPopupmessage("");
  };

  return (
    <>
      <div className="page-wraper">
        <ToastContainer />
        <div className="page-header">
          <Link to="/production" className="page-back-btn">
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
              <button
                className={`page-header-btn-excel`}
                onClick={() => setisPopup(true)}
                disabled={!startDate || !endDate}
                style={{
                  pointerEvents:
                  !startDate || !endDate ? "none" : "auto",
                  opacity: !startDate || !endDate ? 0.5 : 1,
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
            <b>Total Accepted Pairs After Stripping</b>
          </h4>
        </div>
        <div className="production-qty production-qty-subproduction">
          <SubProductionChart
            selectRange={selectRange}
            prodResult={prodResult}
            startDate={formatStartDate}
            endDate={formatEndDate}
            inputValues={inputValues}
          />
        </div>

        <div className="table-responsive production-table">
          <Table aria-label="Analytics" style={{ backgroundColor: "#FFFF" }}>
            <TableHead>
              <TableRow>
                <TableCell>Parameters</TableCell>
                {selectRange
                  ? selectRange.map((month) => (
                      <TableCell key={month.id}>
                        {month.month}
                        {month.label}
                      </TableCell>
                    ))
                  : ""}
              </TableRow>
            </TableHead>
            <TableBody className="subproduction-tablebody">
              <TableRow>
                <TableCell>
                  <div
                    style={{ color: "black", marginRight: "25px" }}
                    className="d-flex align-items-center"
                  >
                    <span className="rejectedparam-btn m-1"></span>Produced Pair
                    in nos
                  </div>
                </TableCell>
                {prodResult.length
                  ? prodResult.map((e) => (
                      <TableCell>{e.produced_pair_in_nos}</TableCell>
                    ))
                  : null}
              </TableRow>
              <TableRow>
                <TableCell>
                  <div
                    style={{ color: "black", marginRight: "25px" }}
                    className="d-flex align-items-center"
                  >
                    <span className="produced-btn m-1"></span> Cum - Prod Pairs
                    Till Month1
                  </div>
                </TableCell>
                {prodResult.length
                  ? prodResult.map((value, index) => {
                      return (
                        <TableCell>{value.cum_prods_till_month_1}</TableCell>
                      );
                    })
                  : null}
              </TableRow>
              {userPermission.find(
                (permission) => permission.module === "Advanced Analytics"
              ).is_editor == true &&
              userPermission.find(
                (permission) => permission.module === "Advanced Analytics"
              ).is_viewer == true ? (
                <TableRow>
                  <TableCell>
                    {" "}
                    <div
                      style={{ color: "black", marginRight: "25px" }}
                      className="d-flex align-items-center"
                    >
                      <span className="target-btn m-1"></span> Target
                    </div>
                  </TableCell>

                  {prodResult.length
                    ? prodResult.map((e, index) => (
                        <TableCell>
                          <input
                            type="number"
                            className="input-number-production"
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
              ) : (
                <TableRow>
                  <TableCell>
                    {" "}
                    <div
                      style={{ color: "black", marginRight: "25px" }}
                      className="d-flex align-items-center"
                    >
                      <span className="target-btn m-1"></span> Target
                    </div>
                  </TableCell>

                  <TableCell>
                    <input
                      type="number"
                      className="input-number-production"
                      onChange={handleToastMsg}
                    />
                  </TableCell>
                </TableRow>
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

        {popupStatus && (
          <>
            <div className="sendingdataaaa1">
              <Card className="pairingcard-Approved">
                <CardContent className="p-0 pairing-status">
                  <h4>{Popupmessage ? Popupmessage : " Invaild Date..."}</h4>
                </CardContent>
                <Button
                  className="pairingcard-btn"
                  title="Ok"
                  onClick={popuphandle}
                />
              </Card>
            </div>
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
                  onClick={() => productionTotalPairsReport()}
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
      </div>
    </>
  );
};
