import React, { useState } from "react";
import {
  Card,
  CardContent,
  Checkbox,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import "../Reports & Approvals/Reports.css";
import {
  getReport,
  getVisualInspectionData,
  updateReportStatus,
} from "./services";
import { useEffect } from "react";
import {
  fetchAllBatchData,
  fetchVisualInspectionData,
} from "../DippingParameters/batchSlice";
import Loader from "../../components/Loader/Loader";
import { filterUid } from "../DippingParameters/Services";
import { images } from "../../config/images";
import { ToastContainer, toast } from "react-toastify";
import ShiftDrpdown from "../../common/Drpdown/Shift";
import RorLdropdown from "../../common/Drpdown/RorL";
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Typography className="selected-data-count">
      {numSelected} selected
    </Typography>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function Reports(props) {
  const [mobileFilter, setMobileFilter] = useState(true);
  const [glovesTable, setGlovesTable] = useState(true);
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setLoading] = useState(false);
  const [sendingID, setSendingId] = useState(false);
  const [sendingmsg, setSendingMsg] = useState(false);
  const [batchType, setBatchType] = useState();
  const [reportStatus, setReportStatus] = useState([]);
  const [reportPayload, setReportPayload] = useState([]);
  const [status1, setStatus1] = useState(null);
  const [comment, setComment] = useState("");
  const [approveStatus, setApproveStatus] = useState("");
  const [rejectedButton, setRejectedButton] = useState(false);
  const { row, selectRorL } = props;
  const [Report_Payload_Data, setReport_Payload_Data] = useState();

  const initiallValue = {
    Date: "",
    B_No: "",
    UID: "",
    Test_date: "",
    Test_Time: "",
    Shift: "",
    Lot_No: "",
    Class: "",
    Size: "",
    Thickness: "",
    Print_Result: "",
    RorL: "",
    Approve_status: "",
  };

  const [searchText, setSearchText] = useState(initiallValue);
  const [searchUID, setSearchUID] = useState("");
  const [searchUIDData, setSearchUIDData] = useState([]);
  const [visualInspectionData, setVisualInspectionData] = useState([]);
  const dispatch = useDispatch();

  const { startDateReFormat, endDateReFormat } = props;
  const [startDateTime, setstartDateTime] = useState();
  const [endDateTime, setendDateTime] = useState();

  useEffect(() => {
    console.log("startDateReFormat in report", startDateReFormat);
    console.log(
      "endDateReFormat in report",
      dayjs(endDateReFormat).format("YYYY-MM-DD" + " " + "HH:mm:ss")
    );

    setendDateTime(
      dayjs(endDateReFormat).format("YYYY-MM-DD" + " " + "HH:mm:ss")
    );
    setstartDateTime(
      dayjs(startDateReFormat).format("YYYY-MM-DD" + " " + "HH:mm:ss")
    );
  }, [startDateReFormat, endDateReFormat]);

  useEffect(() => {
    if (searchText) {
      props.VisualSearchsendtoPerent(searchText);
    }
  }, [searchText]);

  const { userPermission } = useSelector((state) => state.userState);

  const { batch } = useSelector((state) => state.batchState);

  useEffect(() => {
    const params = {
      page: page,
      rowsPerPage: rowsPerPage,
      searchText: searchText,
      selectRorL: selectRorL,
    };
    // handleVisualInspectionData(params);
    // handleSearchData(searchText);
    // getData();
    return () => {};
  }, [page, rowsPerPage, searchText, selectRorL]);

  useEffect(() => {
    if (startDateTime && endDateTime) {
      const params = {
        page: page,
        rowsPerPage: rowsPerPage,
        searchText: searchText,
        selectRorL: selectRorL,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
      };
      handleVisualInspectionData(params);
      // handleSearchData(searchText);
      // getData();
      return () => {};
    }
  }, [startDateTime, endDateTime, page, rowsPerPage, selectRorL, searchText]);

  const handleVisualInspectionData = async (search) => {
    if (searchText === "") {
      const resp = await getVisualInspectionData(search);
      setVisualInspectionData(resp.data);
    } else {
      const resp = await getVisualInspectionData(search);
      setVisualInspectionData(resp.data);
    }
  };

  // useEffect(() => {
  //   getVisualData(searchText);
  // }, [page, rowsPerPage, searchText, selectRorL]);

  // const getVisualData = (searchText) => {
  //   const params = {
  //     page: page,
  //     rowsPerPage: rowsPerPage,
  //     searchText: searchText,
  //     selectRorL: selectRorL,
  //   };
  //   dispatch(fetchVisualInspectionData(params));
  // };

  const handleFilter = () => {
    setMobileFilter(!mobileFilter);
  };

  const closeFilter = () => {
    setMobileFilter(!mobileFilter);
  };

  const handleApprovedStatus = async (row, status) => {
    console.log("statusstatusstatus", status);
    setLoading(true);
    const params = {
      batch_id: row.batch_id,
    };
    setBatchType(row);
    try {
      const resp = await getReport(params);
      setLoading(false);
      if (resp.status == 200 || resp.status == 201) {
        setReportStatus(resp.data.payload.payload);
        setReportPayload({
          Accepted_Qty: resp.data.payload.accepted,
          Rejected_Qty: resp.data.payload.rejected,
        });
        setReport_Payload_Data(resp.data.payload.payload);
        setApproveStatus(status);
      }
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit", error);
    }
    props.handleVisualDetail();
    setGlovesTable(false);
    props.handleVisualInspectionExcel(row.batch_id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = visualInspectionData.results.map((n) => n.uid_type);
      setSelected(newSelected);
      props.handleVisualExcel(newSelected);
      return;
    }
    setSelected([]);
    props.handleVisualExcel([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - batch.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const approvedModal = () => {
    setSendingId(true);
    setStatus1(1);
  };

  const rejectedModal = () => {
    setSendingMsg(true);
    setStatus1(0);
    setRejectedButton(!rejectedButton);
  };

  const handleSubmit = async () => {
    const params = {
      batch_id: batchType.batch_id,
      status: status1,
      station: props.valueStation,
      comment: comment,
    };
    try {
      const resp = await updateReportStatus(params);
      setLoading(false);
      if (resp.status == 200 || resp.status == 201) {
        window.location.reload(false);
        setSendingMsg(false);
        setSendingId(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit", error);
    }
  };

  const handleClick = (event, name, rowId) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    props.handleVisualExcel(newSelected);
  };

  const handleCancle = () => {
    setSendingId(false);
  };
  const handleClose = () => {
    setSendingMsg(false);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handelSearchApi = async () => {
    const params = {
      uid_type: searchUID,
    };
    try {
      const resp = await filterUid(params);
      setLoading(false);
      if (resp.status == 200 || resp.status == 201) {
        setSearchUIDData(resp.data.payload);
      }
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit", error);
    }
  };

  useEffect(() => {
    if (searchUID) {
      handelSearchApi();
    }
  }, [searchUID]);

  const handleSearchData = async (e) => {
    const { name, value } = e.target;
    setSearchText({ ...searchText, [name]: value });
    if (name == "Test_date") {
      props.handleTestDateSearch(value);
    }
    if (name == "Test_Time") {
      props.handleTestTimeSearch(value);
    }
  };

  const handleUIDSearch = async (e) => {
    setSearchUID(e.target.value);
  };

  const tableHeadStyle = {
    position: "sticky",
    top: "-7px",
    zIndex: isLoading ? "auto" : 9,
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
  // const checkData = reportStatus.find((f) => f.visual_inspection_details !== null)
  return (
    <>
      <div
        onClick={closeFilter}
        className={`filter-overlay ${
          mobileFilter ? "mobile-d-none" : "mobile-d-flex"
        }`}
      ></div>
      {props.glovesTable ? (
        <>
          <div className="dipping-parameter-table-data">
            <div className="table-responsive">
              <Table
                aria-label="Dipping parameter"
                className="dipping-parameter-table"
              >
                <TableHead>
                  <TableRow>
                    {userPermission.find(
                      (permission) =>
                        permission.module === "Reports & Approvals"
                    ).is_editor == true &&
                    userPermission.find(
                      (permission) =>
                        permission.module === "Reports & Approvals"
                    ).is_viewer == true ? (
                      <TableCell colSpan={2}>
                        <div className="d-flex">
                          <div>
                            <Checkbox
                              onClick={(event) =>
                                handleSelectAllClick(
                                  event,
                                  visualInspectionData.results.uid_type
                                )
                              }
                            />
                          </div>
                          <div className="date-checkbox">Date</div>
                        </div>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <div className="date-checkbox">Date</div>
                      </TableCell>
                    )}
                    <TableCell>Batch No</TableCell>
                    <TableCell>UID</TableCell>
                    <TableCell>Test Date</TableCell>
                    <TableCell>Test Time</TableCell>
                    <TableCell>Shift</TableCell>
                    <TableCell>LOT No</TableCell>
                    <TableCell>L/R</TableCell>
                    <TableCell>Class</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Thickness</TableCell>
                    <TableCell>Test Result</TableCell>
                    <TableCell>Approval Status</TableCell>
                  </TableRow>
                  <TableRow>
                    {userPermission.find(
                      (permission) =>
                        permission.module === "Reports & Approvals"
                    ).is_editor == true &&
                    userPermission.find(
                      (permission) =>
                        permission.module === "Reports & Approvals"
                    ).is_viewer == true ? (
                      <TableCell colSpan={2} className="search-table-row">
                        <SearchIcon className="search-icon" />
                        <input
                          type="search"
                          placeholder="Date"
                          name="Date"
                          value={searchText.Date}
                          onChange={handleSearchData}
                        />
                      </TableCell>
                    ) : (
                      <TableCell className="search-table-row">
                        <SearchIcon className="search-icon" />
                        <input
                          type="search"
                          placeholder="Date"
                          name="Date"
                          value={searchText.Date}
                          onChange={handleSearchData}
                        />
                      </TableCell>
                    )}
                    <TableCell className="search-table-row">
                      <SearchIcon className="search-icon" />
                      <input
                        type="search"
                        placeholder="B.No"
                        name="B_No"
                        value={searchText.B_No}
                        onChange={handleSearchData}
                      />
                    </TableCell>
                    <TableCell className="search-table-row">
                      <SearchIcon className="search-icon" />
                      <input
                        type="search"
                        placeholder="UID"
                        name="UID"
                        value={searchText.UID}
                        onChange={handleSearchData}
                      />
                    </TableCell>
                    <TableCell className="search-table-row">
                      <SearchIcon className="search-icon" />
                      <input
                        type="search"
                        placeholder="Test Date"
                        name="Test_date"
                        value={searchText.Test_date}
                        onChange={handleSearchData}
                      />
                    </TableCell>
                    <TableCell className="search-table-row">
                      <SearchIcon className="search-icon" />
                      <input
                        type="search"
                        placeholder="Test Time"
                        name="Test_Time"
                        value={searchText.Test_Time}
                        onChange={handleSearchData}
                      />
                    </TableCell>

                    <TableCell className="search-table-row">
                      <SearchIcon className="search-icon" />
                      <ShiftDrpdown
                  searchText={searchText}
                  HandleSearch={handleSearchData}
                />
                    </TableCell>
                    <TableCell className="search-table-row">
                      <SearchIcon className="search-icon" />
                      <input
                        type="search"
                        placeholder="LOT No"
                        name="Lot_No"
                        value={searchText.Lot_No}
                        onChange={handleSearchData}
                      />
                    </TableCell>
                    <TableCell className="search-table-row">
                      <SearchIcon className="search-icon" />
                      <RorLdropdown
                        searchText={searchText}
                        handleSearchData={handleSearchData}
                      />
                    </TableCell>
                    <TableCell className="search-table-row">
                      <SearchIcon className="search-icon" />
                      <input
                        type="search"
                        placeholder="Class"
                        name="Class"
                        value={searchText.Class}
                        onChange={handleSearchData}
                      />
                    </TableCell>
                    <TableCell className="search-table-row">
                      <SearchIcon className="search-icon" />
                      <input
                        type="search"
                        placeholder="Size"
                        name="Size"
                        value={searchText.Size}
                        onChange={handleSearchData}
                      />
                    </TableCell>
                    <TableCell className="search-table-row">
                      <SearchIcon className="search-icon" />
                      <input
                        type="search"
                        placeholder="Thickness"
                        name="Thickness"
                        value={searchText.Thickness}
                        onChange={handleSearchData}
                      />
                    </TableCell>
                    <TableCell className="search-table-row">
                      <SearchIcon className="search-icon" />
                      <select
                        name="Print_Result"
                        className="select_print_result"
                        value={searchText.Print_Result}
                        onChange={handleSearchData}
                      >
                        <option value="" className="mb-2">Test Result</option>
                        <option value="pass" className="select-option">Pass</option>
                        <option value="fail" className="select-option">Fail</option>
                      </select>
                    </TableCell>

                    <TableCell className="search-table-row">
                      <SearchIcon className="search-icon" />
                      <input
                        type="search"
                        placeholder="Approval Status"
                        name="Approve_status"
                        value={searchText.Approve_status}
                        onChange={handleSearchData}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="reports-table">
                  {visualInspectionData?.results?.map((row, index) => {
                    const isItemSelected = isSelected(row.uid_type);
                    const labelId = `enhanced-table-checkbox-${row.uid_type}`;
                    return (
                      <TableRow className="main-table-reports">
                        {userPermission.find(
                          (permission) =>
                            permission.module === "Reports & Approvals"
                        ).is_editor == true &&
                        userPermission.find(
                          (permission) =>
                            permission.module === "Reports & Approvals"
                        ).is_viewer == true ? (
                          <TableCell padding="checkbox">
                            <Checkbox
                              onClick={(event) =>
                                handleClick(event, row.uid_type, row.batch_id)
                              }
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                        ) : (
                          ""
                        )}
                        <TableCell>
                          {dayjs(row.created_at).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell id={labelId} scope="row" padding="none">
                          {row.batch_id_type}
                        </TableCell>
                        <TableCell>{row.uid_type}</TableCell>
                        <TableCell>
                          {row.tested_date
                            ? dayjs(row.tested_date).format("YYYY-MM-DD")
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {row.tested_date
                            ? dayjs(row.tested_date).format("HH:mm:ss")
                            : "-"}
                        </TableCell>
                        <TableCell>{row.tested_shift || "-"}</TableCell>
                        <TableCell>{row.lot_number || "-"}</TableCell>
                        <TableCell>{row.r_or_l || "-"}</TableCell>
                        <TableCell>{row.class_name}</TableCell>
                        <TableCell>{row.size}</TableCell>
                        <TableCell>
                          {row ? (row.thickness ? row.thickness : "-") : ""}
                        </TableCell>
                        <TableCell>
                          <div
                            className={`status-icon ${
                              row
                                ? row.visual_inspection != null
                                  ? row.visual_inspection == true
                                    ? "pass"
                                    : "falied"
                                  : "status-icon-disabled"
                                : null
                            }`}
                          >
                            {row
                              ? row.visual_inspection != null
                                ? row.visual_inspection == true
                                  ? "P"
                                  : "F"
                                : "status-icon-disabled"
                              : null}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="d-flex justify-content-between">
                            <div style={{ marginTop: "10px" }}>
                              {row.status}
                            </div>

                            <button
                              className="approvalstatus-button"
                              onClick={() =>
                                handleApprovedStatus(row, row.status)
                              }
                            >
                              <img src={images.viewIcon} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {isLoading && <Loader />}
            </div>

            <TablePagination
              className="table-pagination pagination-div"
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={visualInspectionData ? visualInspectionData.count : null}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
          <div className="d-flex justify-content-end aborted">
            <p style={{ margin: 0, marginBottom: 0 }}>
              Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169;
              All Rights Reserved
            </p>
          </div>
        </>
      ) : (
        <div className="mt-5" >
          <div className="header-approval-data electricTest-data">
            <Grid container>
              <Grid
                lg={3}
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
                        Mfg Date:
                      </TableCell>
                      <TableCell>
                        {dayjs(batchType ? batchType.created_at : "").format(
                          "YYYY-MM-DD"
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Batch No:
                      </TableCell>
                      <TableCell>
                        {batchType ? batchType.batch_id_type : ""}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid
                lg={2}
                md={6}
                sm={6}
                xs={12}
                sx={{ P: 0 }}
                className="single-data-item"
              >
                <Table className="no-border-table transparent-table common-table">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Lot No:</TableCell>
                      <TableCell>
                        {batchType ? batchType.lot_number : ""}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Thickness:
                      </TableCell>
                      <TableCell>
                        {Report_Payload_Data
                          ? Report_Payload_Data[0].thickness
                          : "-"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid
                lg={2}
                md={6}
                sm={6}
                xs={12}
                sx={{ P: 0 }}
                className="single-data-item"
              >
                <Table className="no-border-table transparent-table common-table">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Class:</TableCell>
                      <TableCell>
                        {batchType ? batchType.class_name : ""}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Size:</TableCell>
                      <TableCell>{batchType ? batchType.size : ""}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid
                lg={2}
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
                        Accepted Qty:
                      </TableCell>
                      <TableCell>{reportPayload.Accepted_Qty}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Rejected Qty:
                      </TableCell>
                      <TableCell>{reportPayload.Rejected_Qty}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid
                lg={3}
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
                        Inspector Name:
                      </TableCell>
                      <TableCell>
                        {batchType
                          ? batchType.inspector_name
                            ? batchType.inspector_name
                            : "-"
                          : ""}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Revision
                      </TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </div>

          <div className="table-responsive">
            <TableContainer
              style={{
                border: "1px solid #a9b0bd",
                maxHeight: "60vh",
                background: "#ffff",
              }}
              className="reportTable"
            >
              <Table
                aria-label="reports"
                className="statusflow"
                style={{ width: "fit-content" }}
              >
                <TableHead style={tableHeadStyle}>
                  <TableRow>
                    <TableCell className="statusflow-defects">
                      <div className="p-3">Defects</div>
                    </TableCell>
                    {reportStatus && reportStatus && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          return (
                            <TableCell
                              className={
                                status1.visual_inspection != null
                                  ? !status1.visual_inspection
                                    ? "defects-head"
                                    : ""
                                  : ""
                              }
                            >
                              <div className="defects">
                                UID:{status1.uid_type}
                                <br />
                                Date:
                                {dayjs(status1.created_at).format("YYYY-MM-DD")}
                                <br />
                                Shift:{" "}
                                {status1.visual_inspection_details
                                  ? status1.visual_inspection_details.shift
                                  : ""}
                              </div>
                            </TableCell>
                          );
                        })
                      : ""}
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">01</b> Bubbles between fingers{" "}
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }

                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .bubbles_between_fingers
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .bubbles_between_fingers
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">02</b> Bubbles at fingertips
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .bubbles_at_fingertips
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .bubbles_at_fingertips
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">03</b> Other position bubbles
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .other_position_bubbles
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .other_position_bubbles
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">04</b> Thin patch fingers
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .thin_patch_fingers
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .thin_patch_fingers
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">05</b> Thin patch crutch
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .thin_patch_crutch
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .thin_patch_crutch
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">06</b> Thin patch between finger
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .thin_patch_between_finger
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .thin_patch_between_finger
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">07</b> Inside crack defect
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .inside_crack_defect
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .inside_crack_defect
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">08</b> Crease
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details.crease
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details.crease
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">09</b> Pinholes fingertips
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .pinholes_fingertips
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .pinholes_fingertips
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">10</b> Pinholes other positions
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .pinholes_other_positions
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .pinholes_other_positions
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">11</b> Wet coagulant fingertips
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .wet_coagulant_fingertips
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .wet_coagulant_fingertips
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">12</b> Particles
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .particles
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .particles
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">13</b> Crack defects between
                      fingers
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .crack_defects_between_fingers
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .crack_defects_between_fingers
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">14</b> Ripples on fingers
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .ripples_on_fingers
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .ripples_on_fingers
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">15</b> Ripples on other positions
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .ripples_on_other_positions
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .ripples_on_other_positions
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">16</b> Inner/Between(coat) split
                      line
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .inner_between_coat_split_line
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .inner_between_coat_split_line
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">17</b> Drops of coagulant
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .drops_of_coagulant
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .drops_of_coagulant
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">18</b> Bad gelation
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .bad_gelation
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .bad_gelation
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">19</b> Bad gelation of finger
                      side
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .bad_gelation_of_finger_side
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .bad_gelation_of_finger_side
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">20</b> Delamination
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .delamination
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .delamination
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">21</b> Lack of coagulant
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .lack_of_coagulant
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .lack_of_coagulant
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">22</b> Bad rolled edge
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .bad_rolled_edge
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .bad_rolled_edge
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">23</b> Crack defects ON fingers
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .crack_defects_on_fingers
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .crack_defects_on_fingers
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">24</b> Inner side impression mark
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .inner_side_impression_mark
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .inner_side_impression_mark
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">25</b> Pit mark
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .pit_mark
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details.pit_mark
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">26</b> Cissing
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .cissing
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details.cissing
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">27</b> Latex runs at fingertips
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .latex_runs_at_fingertips
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .latex_runs_at_fingertips
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">28</b> Coagulant foam
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .coagulant_foam
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .coagulant_foam
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">29</b> Peel of fingertips
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .peel_of_fingertips
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .peel_of_fingertips
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">30</b> Blister
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .blister
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details.blister
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">31</b> Line
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details.line
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details.line
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">32</b> Split Line
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }

                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .split_line
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .split_line
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">33</b> Inside bubbles at finger
                      tips
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .inside_bubbles_at_finger_tips
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .inside_bubbles_at_finger_tips
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">34</b> Inside bubbles at other
                      position
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .inside_bubbles_at_other_posi
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .inside_bubbles_at_other_posi
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">35</b> Inside bubbles between
                      finger
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .inside_bubbles_between_finger
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .inside_bubbles_between_finger
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">36</b> Webline bubbles
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div
                                  className={`status-icon ${
                                    status1.visual_inspection_details
                                      ? status1.visual_inspection_details
                                          .webline_bubbles
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                  }`}
                                >
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .webline_bubbles
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">37</b>Other defects(Hold/No
                      Hold/Minor Fault)
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div>
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details.defects
                                    : ""}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                  <TableRow className="historyTitle mt-2 text-center">
                    <TableCell className="statusflow-defects">
                      <b className="font-bold">38</b> Defects
                    </TableCell>
                    {reportStatus.length && Array.isArray(reportStatus)
                      ? reportStatus.map((status1) => {
                          if (
                            status1.visual_inspection_details
                              ? status1.visual_inspection_details
                                  .bubbles_between_fingers
                                ? true
                                : true
                              : false
                          ) {
                            if (!props.checkUidData) {
                              props.handleCheckUidData(
                                status1.visual_inspection_details
                                  ? status1.visual_inspection_details
                                      .bubbles_between_fingers
                                    ? true
                                    : true
                                  : false
                              );
                            }
                          }
                          return (
                            <>
                              <TableCell>
                                <div className="text-center">
                                  {status1.visual_inspection_details
                                    ? status1.visual_inspection_details
                                        .othere_defect
                                    : ""}
                                </div>
                              </TableCell>
                            </>
                          );
                        })
                      : ""}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {isLoading && <Loader />}
          </div>

          {sendingID && (
            <>
              <div className="sendingdataaaa">
                <Card className="card-Approved">
                  <CardContent className="p-0">
                    <div className="d-flex justify-content-between">
                      <h4 className="card-content-Approved">
                        <b>Approved..</b>
                      </h4>
                      <div onClick={handleCancle}>
                        <img src={images.closeIcon} />
                      </div>
                    </div>
                    <textarea
                      id="Approved"
                      name="Approved"
                      rows="4"
                      cols="30"
                      placeholder="Remarks"
                      className="approved-textarea"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                      className="card-approved-btn"
                      onClick={() => handleSubmit()}
                    >
                      Submit
                    </button>
                  </CardContent>
                </Card>
              </div>
              <div className="sending-uid-overlay"></div>
            </>
          )}
          {sendingmsg && (
            <>
              <div className="sendingdataaaa">
                <Card className="card-Approved">
                  <CardContent className="p-0">
                    <div className="d-flex justify-content-between">
                      <h4 className="card-content-Approved">
                        <b>Rejected..!</b>
                      </h4>
                      <div onClick={handleClose}>
                        <img src={images.closeIcon} />
                      </div>
                    </div>
                    <textarea
                      id="Approved"
                      name="Approved"
                      rows="4"
                      cols="30"
                      placeholder="Remarks"
                      className="approved-textarea"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                      className="card-approved-btn"
                      onClick={() => handleSubmit()}
                    >
                      Submit
                    </button>
                  </CardContent>
                </Card>
              </div>
              <div className="sending-uid-overlay"></div>
            </>
          )}
          {userPermission.find(
            (permission) => permission.module === "Reports & Approvals"
          ).is_editor == true &&
          userPermission.find(
            (permission) => permission.module === "Reports & Approvals"
          ).is_viewer == true ? (
            <>
              <div
                className="d-flex justify-content-end  ARButton_VI"
                width="50%"
              >
                {/* <button className={`rejected-btn ${checkData ? (reportStatus.find((f) => f.visual_inspection_details != null) ? (batchType ? (batchType.approval_status_visual_inspection == "Rejected" || batchType.approval_status_visual_inspection == "Approved" ? 'disable-button' : '') : "disable-button") : '') : ''}`} onClick={rejectedModal}>Reject</button> */}

                {/* <button className={`rejected-btn ${checkData ? (batchType ? (batchType.approval_status_visual_inspection == 'Rejected' ? 'disable-button' : 'disable-button') : '') : 'disable-button'}`} onClick={rejectedModal}>Reject</button> */}

                <button
                  className={`rejected-btn ${
                    approveStatus == "Pending" ||
                    approveStatus == "Approved" ||
                    approveStatus == "Rejected"
                      ? props.checkUidData
                        ? approveStatus == "Approved"
                          ? "disable-button"
                          : approveStatus == "Pending"
                          ? ""
                          : "disable-button"
                        : "disable-button"
                      : ""
                  }`}
                  onClick={rejectedModal}
                >
                  Reject
                </button>
                <button
                  className={`Approved-btn ${
                    approveStatus == "Pending" || approveStatus == "Approved"
                      ? props.checkUidData
                        ? approveStatus == "Approved"
                          ? "disable-button"
                          : approveStatus == "Pending"
                          ? ""
                          : "disable-button"
                        : "disable-button"
                      : ""
                  }`}
                  onClick={approvedModal}
                >
                  Approve
                </button>
                {/* <button className={`Approved-btn ${checkData ? (batchType ? (batchType.approval_status_visual_inspection == 'Approved' ? 'disable-button' : 'disable-button') : '') : 'disable-button'}`} onClick={approvedModal}>Approve</button> */}

                {/* <button className={`Approved-btn ${reportStatus ? (reportStatus.find((f) => f.visual_inspection_details != null) ? (batchType ? (batchType.approval_status_visual_inspection == "Approved" ? 'disable-button' : '') : 'disable-button') : '' ) : ''}`} onClick={approvedModal}>Approved</button> */}
              </div>
            </>
          ) : (
            <div
              className="d-flex justify-content-end  ARButton_VI"
              width="50%"
            >
              {/* <button className={`rejected-btn ${checkData ? (reportStatus.find((f) => f.visual_inspection_details != null) ? (batchType ? (batchType.approval_status_visual_inspection == "Rejected" || batchType.approval_status_visual_inspection == "Approved" ? 'disable-button' : '') : "disable-button") : '') : ''}`} onClick={rejectedModal}>Reject</button> */}

              {/* <button className={`rejected-btn ${checkData ? (batchType ? (batchType.approval_status_visual_inspection == 'Rejected' ? 'disable-button' : 'disable-button') : '') : 'disable-button'}`} onClick={rejectedModal}>Reject</button> */}

              <button
                className={`rejected-btn ${
                  approveStatus == "Pending" ||
                  approveStatus == "Approved" ||
                  approveStatus == "Rejected"
                    ? props.checkUidData
                      ? approveStatus == "Approved"
                        ? "disable-button"
                        : approveStatus == "Pending"
                        ? ""
                        : "disable-button"
                      : "disable-button"
                    : ""
                }`}
                onClick={handleToastMsg}
              >
                Reject
              </button>
              <button
                className={`Approved-btn ${
                  approveStatus == "Pending" || approveStatus == "Approved"
                    ? props.checkUidData
                      ? approveStatus == "Approved"
                        ? "disable-button"
                        : approveStatus == "Pending"
                        ? ""
                        : "disable-button"
                      : "disable-button"
                    : ""
                }`}
                onClick={handleToastMsg}
              >
                Approve
              </button>
              {/* <button className={`Approved-btn ${checkData ? (batchType ? (batchType.approval_status_visual_inspection == 'Approved' ? 'disable-button' : 'disable-button') : '') : 'disable-button'}`} onClick={approvedModal}>Approve</button> */}

              {/* <button className={`Approved-btn ${reportStatus ? (reportStatus.find((f) => f.visual_inspection_details != null) ? (batchType ? (batchType.approval_status_visual_inspection == "Approved" ? 'disable-button' : '') : 'disable-button') : '' ) : ''}`} onClick={approvedModal}>Approved</button> */}
            </div>
          )}
          <div className="d-flex justify-content-end aborted">
            <p style={{ margin: 0, marginBottom: 0 }}>
              Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169;
              All Rights Reserved
            </p>
          </div>
        </div>
      )}

      {/* </div> */}
    </>
  );
}

export default Reports;
