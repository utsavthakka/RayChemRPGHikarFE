import "./Dashboard.css";
import { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import { Link } from "react-router-dom";

import React from "react";
import DippingParameters from "../../assets/images/dipping-parameters.png";
import GlovesTracking from "../../assets/images/gloves-tracking.png";
import Pairing from "../../assets/images/pairing.png";
import ReportsApprovals from "../../assets/images/report-approvals.png";
import AdvanceAnalytics from "../../assets/images/advance-analytics.png";
import Pending from "../../assets/images/pending.png";
import InProgress from "../../assets/images/in-progress.png";
import Completed from "../../assets/images/completed.png";
import Dispatched from "../../assets/images/dispatched.png";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { getClasses, getSizes } from "../AddBatch/services";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { getOrderYear } from "./services";
import { cubejsApi } from "../../cubejs/CubeJsApi";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function Dashboard() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectClass] = useState();
  const [size, setSize] = useState([]);
  const [selectSize, setSelectSize] = useState();
  const [dashboard, setDashboard] = useState(true);
  const [financialYear, setFinancialYear] = useState([]);
  const [selectYear, setSelectYear] = useState();
  const [ProductionDetail, setProductionDetail] = useState("");

  const { userPermission } = useSelector((state) => state.userState);

  useEffect(() => {
    handleCubejs();
  }, [selectedClass, selectSize, selectYear]);

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

  const handleCubejs = async () => {
    if (selectedClass && selectSize && selectYear) {
      const Productiondata = await cubejsApi.load({
        measures: ["HomeOpenorders.count"],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: [selectedClass],
          },
          {
            member: "HomeProductionorderitem.size",
            operator: "equals",
            values: [selectSize],
          },
          {
            member: "HomeOpenorders.status",
            operator: "equals",
            values: ["Open"],
          },
        ],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.orderDate",
            granularity: "year",
            dateRange: [`${selectYear}-01-01`, `${selectYear}-12-31`],
          },
        ],
      });
      const Productiondata1 = await cubejsApi.load({
        measures: ["HomeOpenorders.count"],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: [selectedClass],
          },
          {
            member: "HomeProductionorderitem.size",
            operator: "equals",
            values: [selectSize],
          },
          {
            member: "HomeOpenorders.status",
            operator: "equals",
            values: ["Work In Progress"],
          },
        ],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.orderDate",
            granularity: "year",
            dateRange: [`${selectYear}-01-01`, `${selectYear}-12-31`],
          },
        ],
      });

      const Productiondata2 = await cubejsApi.load({
        measures: ["HomeOpenorders.count"],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: [selectedClass],
          },
          {
            member: "HomeProductionorderitem.size",
            operator: "equals",
            values: [selectSize],
          },
          {
            member: "HomeOpenorders.status",
            operator: "equals",
            values: ["Packed"],
          },
        ],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.orderDate",
            granularity: "year",
            dateRange: [`${selectYear}-01-01`, `${selectYear}-12-31`],
          },
        ],
      });
      const Productiondata3 = await cubejsApi.load({
        measures: ["HomeOpenorders.count"],
        filters: [
          {
            member: "HomeProductionorderitem.class",
            operator: "equals",
            values: [selectedClass],
          },
          {
            member: "HomeProductionorderitem.size",
            operator: "equals",
            values: [selectSize],
          },
          {
            member: "HomeOpenorders.status",
            operator: "equals",
            values: ["Dispatched"],
          },
        ],
        timeDimensions: [
          {
            dimension: "HomeOpenorders.orderDate",
            granularity: "year",
            dateRange: [`${selectYear}-01-01`, `${selectYear}-12-31`],
          },
        ],
      });
      setProductionDetail({ Productiondata, Productiondata1, Productiondata2,Productiondata3 });
    } else {
      const Productiondata = await cubejsApi.load({
        measures: ["HomeOpenorders.count"],

        order: {
          "HomeOpenorders.createdAt": "asc",
        },
        filters: [
          {
            member: "HomeOpenorders.status",
            operator: "equals",
            values: ["Open"],
          },
        ],
      });
      const Productiondata1 = await cubejsApi.load({
        measures: ["HomeOpenorders.count"],

        order: {
          "HomeOpenorders.createdAt": "asc",
        },
        filters: [
          {
            member: "HomeOpenorders.status",
            operator: "equals",
            values: ["Work In Progress"],
          },
        ],
      });
      const Productiondata2 = await cubejsApi.load({
        measures: ["HomeOpenorders.count"],

        order: {
          "HomeOpenorders.createdAt": "asc",
        },
        filters: [
          {
            member: "HomeOpenorders.status",
            operator: "equals",
            values: ["Packed"],
          },
        ],
      });
      const Productiondata3 = await cubejsApi.load({
        measures: ["HomeOpenorders.count"],

        order: {
          "HomeOpenorders.createdAt": "asc",
        },
        filters: [
          {
            member: "HomeOpenorders.status",
            operator: "equals",
            values: ["Dispatched"],
          },
        ],
      });
      setProductionDetail({ Productiondata, Productiondata1, Productiondata2,Productiondata3});
    }
  };

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    getData();
    getAPIData();
    return () => {};
  }, []);

  const getAPIData = async () => {
    const resp = await getOrderYear();
    setFinancialYear(resp.data.payload);
  };

  // asynchronous function to fetch class data API
  const getData = async () => {
    try {
      const resp = await getClasses();
      setClasses(resp.data.payload);
      const resp3 = await getSizes();
      setSize(resp3.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const homeOpenOrdersCount = ProductionDetail
    ? ProductionDetail.Productiondata.loadResponses[0].data[0]
      ? ProductionDetail.Productiondata.loadResponses[0].data[0][
          "HomeOpenorders.count"
        ]
      : "0"
    : "0";

  const homeInProgressCount = ProductionDetail
    ? ProductionDetail.Productiondata1.loadResponses[0].data[0]
      ? ProductionDetail.Productiondata1.loadResponses[0].data[0][
          "HomeOpenorders.count"
        ]
      : "0"
    : "0";

  const homePacked = ProductionDetail
    ? ProductionDetail.Productiondata2.loadResponses[0].data[0]
      ? ProductionDetail.Productiondata2.loadResponses[0].data[0][
          "HomeOpenorders.count"
        ]
      : "0"
    : "0";

    const homeDispatch = ProductionDetail
    ? ProductionDetail.Productiondata3.loadResponses[0].data[0]
      ? ProductionDetail.Productiondata3.loadResponses[0].data[0][
          "HomeOpenorders.count"
        ]
      : "0"
    : "0";

  return (
    <div className="dashboard-wrapper page-wraper">
      <ToastContainer />
      <div className={`${dashboard ? "d-block" : "d-none"}`}>
        <div style={{ marginBottom: "32px" }}>
          <Card className="production-card">
            <div className="d-flex align-items-center title-block">
              {userPermission &&
              userPermission.length &&
              userPermission.find(
                (permission) => permission.module === "Production Analytics"
              ) ? (
                <>
                  {userPermission.find(
                    (permission) => permission.module === "Production Analytics"
                  ).is_editor == true &&
                  userPermission.find(
                    (permission) => permission.module === "Production Analytics"
                  ).is_viewer == true ? (
                    <Link to="/productionStatus">
                      <SectionTitle title={"PRODUCTION"} />
                    </Link>
                  ) : userPermission.find(
                      (permission) =>
                        permission.module === "Production Analytics"
                    ).is_editor == false &&
                    userPermission.find(
                      (permission) =>
                        permission.module === "Production Analytics"
                    ).is_viewer == false ? (
                    <div onClick={handleToastMsg}>
                      <SectionTitle title={"PRODUCTION"} />
                    </div>
                  ) : userPermission.find(
                      (permission) =>
                        permission.module === "Production Analytics"
                    ).is_editor == true &&
                    userPermission.find(
                      (permission) =>
                        permission.module === "Production Analytics"
                    ).is_viewer == false ? (
                    <div onClick={handleToastMsg}>
                      <SectionTitle title={"PRODUCTION"} />
                    </div>
                  ) : userPermission.find(
                      (permission) =>
                        permission.module === "Production Analytics"
                    ).is_editor == false &&
                    userPermission.find(
                      (permission) =>
                        permission.module === "Production Analytics"
                    ).is_viewer == true ? (
                    <Link to="/productionStatus">
                      <SectionTitle title={"PRODUCTION"} />
                    </Link>
                  ) : (
                    <div onClick={handleToastMsg}>
                      <SectionTitle title={"PRODUCTION"} />
                    </div>
                  )}
                </>
              ) : (
                <div onClick={handleToastMsg}>
                  <SectionTitle title={"PRODUCTION"} />
                </div>
              )}

              <Box
                sx={{ minWidth: 200 }}
                style={{ marginLeft: "-23px", marginBottom: "0" }}
              >
                <select
                  className="form-input-class"
                  id="selectedClass"
                  // defaultValue="all"
                  value={selectedClass}
                  onChange={(event) => setSelectClass(event.target.value)}
                  required
                >
                  <option value="none" selected disabled hidden>
                    Class
                  </option>
                  {classes ?classes.map((event) => (
                    <option value={event.class_id}>{event.class_name}</option>
                  )):<option >{"No Data Found"}</option>}
                  <option
                    value="all"
                    // className={
                    //   selectedClass == "all" ? "selectedactiveClass" : ""
                    // }
                  >
                    All
                  </option>
                </select>
              </Box>
              <Box
                sx={{ minWidth: 200 }}
                style={{ marginBottom: "0", marginLeft: "-68px" }}
              >
                <select
                  className="form-input-class"
                  id="selectedClass"
                  // defaultValue="all"
                  value={selectSize}
                  onChange={(event) => setSelectSize(event.target.value)}
                  required
                >
                  <option value="none" selected disabled hidden>
                    Size
                  </option>
                  {size ? size.map((event) => (
                    <option value={event.size_id}>{event.size_name}</option>
                  )): <option >{"No Data Found"}</option>}
                  <option
                    value="all"
                    // className={
                    //   selectedClass == "all" ? "selectedactiveClass" : ""
                    // }
                  >
                    All
                  </option>
                </select>
              </Box>
            </div>
            <Box
              sx={{ minWidth: 200 }}
              style={{ float: "right", marginTop: "-70px" }}
            >
              <select
                className="form-input-class"
                id="selectedClass"
                // defaultValue="all"
                value={selectYear}
                onChange={(event) => setSelectYear(event.target.value)}
                required
              >
                <option value="none" selected disabled hidden>
                  Select Year
                </option>
                {financialYear ? financialYear.map((event, index) => (
                  <option key={index} value={event}>
                    {event}
                  </option>
                )):null}
                <option
                  value="all"
                  // className={selectYear == "all" ? "selectedactiveClass" : ""}
                >
                  All
                </option>
              </select>
            </Box>
            <div className="d-flex product">
              <div className="production-item">
                <div className="production-icon">
                  <img src={Pending} alt="" />
                </div>
                <div className="production-name">
                  <p>Open Order</p>
                  <h2>{homeOpenOrdersCount}</h2>
                </div>
              </div>
              <div className="production-item">
                <div className="production-icon">
                  <img src={InProgress} alt="" />
                </div>
                <div className="production-name">
                  <p>In Progress</p>
                  <h2>{homeInProgressCount}</h2>
                </div>
              </div>
              <div className="production-item">
                <div className="production-icon">
                  <img src={Completed} alt="" />
                </div>
                <div className="production-name">
                  <p>Packed</p>
                  <h2>{homePacked}</h2>
                </div>
              </div>


                  {/* <Link to="/productionStatus"> */}
                  
                  <div className="production-item">
                <div className="production-icon">
                  <img src={Dispatched} alt="" />
                </div>
               
                <Link to="/PackDispatch">
                <div className="production-name">
                  <p>Dispatched</p>
                  <h2>{homeDispatch}</h2>
                </div>
               
                </Link>
              </div>
                  {/* </Link> */}
              




            </div>
          </Card>
        </div>
        <div>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card className="dashbord-card">
                {userPermission &&
                userPermission.length &&
                userPermission.find(
                  (permission) => permission.module === "Dipping Parameters"
                ) ? (
                  <>
                    {userPermission.find(
                      (permission) => permission.module === "Dipping Parameters"
                    ).is_editor &&
                    userPermission.find(
                      (permission) => permission.module === "Dipping Parameters"
                    ).is_viewer ? (
                      <Link to="/dipping-parameters">
                        <div className="module-item">
                          <div className="module-icon">
                            <img src={DippingParameters} alt="" />
                          </div>
                          <div className="module-name">
                            <h2>
                              Dipping
                              <br />
                              Parameters
                            </h2>
                          </div>
                        </div>
                      </Link>
                    ) : userPermission.find(
                        (permission) =>
                          permission.module === "Dipping Parameters"
                      ).is_editor === false &&
                      userPermission.find(
                        (permission) =>
                          permission.module === "Dipping Parameters"
                      ).is_viewer === false ? (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img src={DippingParameters} alt="" />
                        </div>
                        <div className="module-name">
                          <h2>
                            Dipping
                            <br />
                            Parameters
                          </h2>
                        </div>
                      </div>
                    ) : userPermission.find(
                        (permission) =>
                          permission.module === "Dipping Parameters"
                      ).is_editor &&
                      userPermission.find(
                        (permission) =>
                          permission.module === "Dipping Parameters"
                      ).is_viewer === false ? (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img src={DippingParameters} alt="" />
                        </div>
                        <div className="module-name">
                          <h2>
                            Dipping
                            <br />
                            Parameters
                          </h2>
                        </div>
                      </div>
                    ) : userPermission.find(
                        (permission) =>
                          permission.module === "Dipping Parameters"
                      ).is_editor === false &&
                      userPermission.find(
                        (permission) =>
                          permission.module === "Dipping Parameters"
                      ).is_viewer === true ? (
                      <Link to="/dipping-parameters">
                        <div className="module-item">
                          <div className="module-icon">
                            <img src={DippingParameters} alt="" />
                          </div>
                          <div className="module-name">
                            <h2>
                              Dipping
                              <br />
                              Parameters
                            </h2>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img src={DippingParameters} alt="" />
                        </div>
                        <div className="module-name">
                          <h2>
                            Dipping
                            <br />
                            Parameters
                          </h2>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="module-item" onClick={handleToastMsg}>
                    <div className="module-icon">
                      <img src={DippingParameters} alt="" />
                    </div>
                    <div className="module-name">
                      <h2>
                        Dipping
                        <br />
                        Parameters
                      </h2>
                    </div>
                  </div>
                )}
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card className="dashbord-card">
                {userPermission &&
                userPermission.length &&
                userPermission.find(
                  (permission) => permission.module === "Gloves Tracking"
                ) ? (
                  <>
                    {userPermission.find(
                      (permission) => permission.module === "Gloves Tracking"
                    ).is_editor == true &&
                    userPermission.find(
                      (permission) => permission.module === "Gloves Tracking"
                    ).is_viewer == true ? (
                      <Link to="/gloves-tracking">
                        <div className="module-item">
                          <div className="module-icon">
                            <img src={GlovesTracking} alt="" />
                          </div>
                          <div className="module-name">
                            <h2>
                              Gloves
                              <br />
                              Tracking
                            </h2>
                          </div>
                        </div>
                      </Link>
                    ) : userPermission.find(
                        (permission) => permission.module === "Gloves Tracking"
                      ).is_editor == false &&
                      userPermission.find(
                        (permission) => permission.module === "Gloves Tracking"
                      ).is_viewer == false ? (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img src={GlovesTracking} alt="" />
                        </div>
                        <div className="module-name">
                          <h2>
                            Gloves
                            <br />
                            Tracking
                          </h2>
                        </div>
                      </div>
                    ) : userPermission.find(
                        (permission) => permission.module === "Gloves Tracking"
                      ).is_editor == true &&
                      userPermission.find(
                        (permission) => permission.module === "Gloves Tracking"
                      ).is_viewer == false ? (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img src={GlovesTracking} alt="" />
                        </div>
                        <div className="module-name">
                          <h2>
                            Gloves
                            <br />
                            Tracking
                          </h2>
                        </div>
                      </div>
                    ) : userPermission.find(
                        (permission) => permission.module === "Gloves Tracking"
                      ).is_editor == false &&
                      userPermission.find(
                        (permission) => permission.module === "Gloves Tracking"
                      ).is_viewer == true ? (
                      <Link to="/gloves-tracking">
                        <div className="module-item">
                          <div className="module-icon">
                            <img src={GlovesTracking} alt="" />
                          </div>
                          <div className="module-name">
                            <h2>
                              Gloves
                              <br />
                              Tracking
                            </h2>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img src={GlovesTracking} alt="" />
                        </div>
                        <div className="module-name">
                          <h2>
                            Gloves
                            <br />
                            Tracking
                          </h2>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="module-item" onClick={handleToastMsg}>
                      <div className="module-icon">
                        <img src={GlovesTracking} alt="" />
                      </div>
                      <div className="module-name">
                        <h2>
                          Gloves
                          <br />
                          Tracking
                        </h2>
                      </div>
                    </div>
                  </>
                )}
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card className="dashbord-card">
                {userPermission &&
                userPermission.length &&
                userPermission.find(
                  (permission) => permission.module === "Pairing"
                ) ? (
                  <>
                    {userPermission.find(
                      (permission) => permission.module === "Pairing"
                    ).is_editor == true &&
                    userPermission.find(
                      (permission) => permission.module === "Pairing"
                    ).is_viewer == true ? (
                      <Link to="/gloves-pairing">
                        <div className="module-item">
                          <div className="module-icon">
                            <img src={Pairing} alt="" />
                          </div>
                          <div className="module-name">
                            <h2>Pairing</h2>
                          </div>
                        </div>
                      </Link>
                    ) : userPermission.find(
                        (permission) => permission.module === "Pairing"
                      ).is_editor == false &&
                      userPermission.find(
                        (permission) => permission.module === "Pairing"
                      ).is_viewer == false ? (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img src={Pairing} alt="" />
                        </div>
                        <div className="module-name">
                          <h2>Pairing</h2>
                        </div>
                      </div>
                    ) : userPermission.find(
                        (permission) => permission.module === "Pairing"
                      ).is_editor == true &&
                      userPermission.find(
                        (permission) => permission.module === "Pairing"
                      ).is_viewer == false ? (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img src={Pairing} alt="" />
                        </div>
                        <div className="module-name">
                          <h2>Pairing</h2>
                        </div>
                      </div>
                    ) : userPermission.find(
                        (permission) => permission.module === "Pairing"
                      ).is_editor == false &&
                      userPermission.find(
                        (permission) => permission.module === "Pairing"
                      ).is_viewer == true ? (
                      <Link to="/gloves-pairing">
                        <div className="module-item">
                          <div className="module-icon">
                            <img src={Pairing} alt="" />
                          </div>
                          <div className="module-name">
                            <h2>Pairing</h2>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img src={Pairing} alt="" />
                        </div>
                        <div className="module-name">
                          <h2>Pairing</h2>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="module-item" onClick={handleToastMsg}>
                    <div className="module-icon">
                      <img src={Pairing} alt="" />
                    </div>
                    <div className="module-name">
                      <h2>Pairing</h2>
                    </div>
                  </div>
                )}
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card className="dashbord-card">
                {userPermission &&
                userPermission.length &&
                userPermission.find(
                  (permission) => permission.module === "Reports & Approvals"
                ) ? (
                  <>
                    {userPermission.find(
                      (permission) =>
                        permission.module === "Reports & Approvals"
                    ).is_editor == true &&
                    userPermission.find(
                      (permission) =>
                        permission.module === "Reports & Approvals"
                    ).is_viewer == true ? (
                      <Link to="/reports">
                        <div className="module-item">
                          <div className="module-icon">
                            <img src={ReportsApprovals} alt="" />
                          </div>
                          <div className="module-name">
                            <h2>
                              Reports &#38;
                              <br />
                              Approvals
                            </h2>
                          </div>
                        </div>
                      </Link>
                    ) : userPermission.find(
                        (permission) =>
                          permission.module === "Reports & Approvals"
                      ).is_editor == false &&
                      userPermission.find(
                        (permission) =>
                          permission.module === "Reports & Approvals"
                      ).is_viewer == false ? (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img src={ReportsApprovals} alt="" />
                        </div>
                        <div className="module-name">
                          <h2>
                            Reports &#38;
                            <br />
                            Approvals
                          </h2>
                        </div>
                      </div>
                    ) : userPermission.find(
                        (permission) =>
                          permission.module === "Reports & Approvals"
                      ).is_editor == true &&
                      userPermission.find(
                        (permission) =>
                          permission.module === "Reports & Approvals"
                      ).is_viewer == false ? (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img src={ReportsApprovals} alt="" />
                        </div>
                        <div className="module-name">
                          <h2>
                            Reports &#38;
                            <br />
                            Approvals
                          </h2>
                        </div>
                      </div>
                    ) : userPermission.find(
                        (permission) =>
                          permission.module === "Reports & Approvals"
                      ).is_editor == false &&
                      userPermission.find(
                        (permission) =>
                          permission.module === "Reports & Approvals"
                      ).is_viewer == true ? (
                      <Link to="/reports">
                        <div className="module-item">
                          <div className="module-icon">
                            <img src={ReportsApprovals} alt="" />
                          </div>
                          <div className="module-name">
                            <h2>
                              Reports &#38;
                              <br />
                              Approvals
                            </h2>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img src={ReportsApprovals} alt="" />
                        </div>
                        <div className="module-name">
                          <h2>
                            Reports &#38;
                            <br />
                            Approvals
                          </h2>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="module-item" onClick={handleToastMsg}>
                    <div className="module-icon">
                      <img src={ReportsApprovals} alt="" />
                    </div>
                    <div className="module-name">
                      <h2>
                        Reports &#38;
                        <br />
                        Approvals
                      </h2>
                    </div>
                  </div>
                )}
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card className="dashbord-card">
                {userPermission &&
                userPermission.length &&
                userPermission.find(
                  (permission) => permission.module === "Advanced Analytics"
                ) ? (
                  <>
                    {userPermission.find(
                      (permission) => permission.module === "Advanced Analytics"
                    ).is_editor == true &&
                    userPermission.find(
                      (permission) => permission.module === "Advanced Analytics"
                    ).is_viewer == true ? (
                      <Link to="/analytics">
                        <div className="module-item">
                          <div className="module-icon">
                            <img src={AdvanceAnalytics} alt="" />
                          </div>
                          <div className="module-name">
                            <h2>
                              Advance
                              <br />
                              Analytics
                            </h2>
                          </div>
                        </div>
                      </Link>
                    ) : userPermission.find(
                        (permission) =>
                          permission.module === "Advanced Analytics"
                      ).is_editor == false &&
                      userPermission.find(
                        (permission) =>
                          permission.module === "Advanced Analytics"
                      ).is_viewer == false ? (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img src={AdvanceAnalytics} alt="" />
                        </div>
                        <div className="module-name">
                          <h2>
                            Advance
                            <br />
                            Analytics
                          </h2>
                        </div>
                      </div>
                    ) : userPermission.find(
                        (permission) =>
                          permission.module === "Advanced Analytics"
                      ).is_editor == true &&
                      userPermission.find(
                        (permission) =>
                          permission.module === "Advanced Analytics"
                      ).is_viewer == false ? (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img src={AdvanceAnalytics} alt="" />
                        </div>
                        <div className="module-name">
                          <h2>
                            Advance
                            <br />
                            Analytics
                          </h2>
                        </div>
                      </div>
                    ) : userPermission.find(
                        (permission) =>
                          permission.module === "Advanced Analytics"
                      ).is_editor == false &&
                      userPermission.find(
                        (permission) =>
                          permission.module === "Advanced Analytics"
                      ).is_viewer == true ? (
                      <Link to="/analytics">
                        <div className="module-item">
                          <div className="module-icon">
                            <img src={AdvanceAnalytics} alt="" />
                          </div>
                          <div className="module-name">
                            <h2>
                              Advance
                              <br />
                              Analytics
                            </h2>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img src={AdvanceAnalytics} alt="" />
                        </div>
                        <div className="module-name">
                          <h2>
                            Advance
                            <br />
                            Analytics
                          </h2>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="module-item" onClick={handleToastMsg}>
                    <div className="module-icon">
                      <img src={AdvanceAnalytics} alt="" />
                    </div>
                    <div className="module-name">
                      <h2>
                        Advance
                        <br />
                        Analytics
                      </h2>
                    </div>
                  </div>
                )}
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card className="dashbord-card">
                {userPermission &&
                userPermission.length &&
                userPermission.find(
                  (permission) => permission.module === "Customer Reports"
                ) ? (
                  <>
                    {userPermission.find(
                      (permission) => permission.module === "Customer Reports"
                    ).is_editor == true &&
                    userPermission.find(
                      (permission) => permission.module === "Customer Reports"
                    ).is_viewer == true ? (
                      <Link to="/customer-report">
                        <div className="module-item">
                          <div className="module-icon">
                            <img
                              src={require("../../assets/images/report.png")}
                              alt=""
                            />
                          </div>
                          <div className="module-name">
                            <h2>
                              Customer
                              <br />
                              Reports
                            </h2>
                          </div>
                        </div>
                      </Link>
                    ) : userPermission.find(
                        (permission) => permission.module === "Customer Reports"
                      ).is_editor == false &&
                      userPermission.find(
                        (permission) => permission.module === "Customer Reports"
                      ).is_viewer == false ? (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img
                            src={require("../../assets/images/report.png")}
                            alt=""
                          />
                        </div>
                        <div className="module-name">
                          <h2>
                            Customer
                            <br />
                            Reports
                          </h2>
                        </div>
                      </div>
                    ) : userPermission.find(
                        (permission) => permission.module === "Customer Reports"
                      ).is_editor == true &&
                      userPermission.find(
                        (permission) => permission.module === "Customer Reports"
                      ).is_viewer == false ? (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img
                            src={require("../../assets/images/report.png")}
                            alt=""
                          />
                        </div>
                        <div className="module-name">
                          <h2>
                            Customer
                            <br />
                            Reports
                          </h2>
                        </div>
                      </div>
                    ) : userPermission.find(
                        (permission) => permission.module === "Customer Reports"
                      ).is_editor == false &&
                      userPermission.find(
                        (permission) => permission.module === "Customer Reports"
                      ).is_viewer == true ? (
                      <Link to="/customer-report">
                        <div className="module-item">
                          <div className="module-icon">
                            <img
                              src={require("../../assets/images/report.png")}
                              alt=""
                            />
                          </div>
                          <div className="module-name">
                            <h2>
                              Customer
                              <br />
                              Reports
                            </h2>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="module-item" onClick={handleToastMsg}>
                        <div className="module-icon">
                          <img
                            src={require("../../assets/images/report.png")}
                            alt=""
                          />
                        </div>
                        <div className="module-name">
                          <h2>
                            Customer
                            <br />
                            Reports
                          </h2>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="module-item" onClick={handleToastMsg}>
                    <div className="module-icon">
                      <img
                        src={require("../../assets/images/report.png")}
                        alt=""
                      />
                    </div>
                    <div className="module-name">
                      <h2>
                        Customer
                        <br />
                        Reports
                      </h2>
                    </div>
                  </div>
                )}
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>

      <div className="d-flex justify-content-end title">
        <p style={{ margin: 0, marginBottom: 0 }}>
          Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
          Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
