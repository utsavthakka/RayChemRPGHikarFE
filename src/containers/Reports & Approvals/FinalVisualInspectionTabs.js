import React, { useState } from "react";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import TableBody from "@mui/material/TableBody";
import { ToastContainer, toast } from "react-toastify";
import TablePagination from "@mui/material/TablePagination";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import "../Reports & Approvals/Reports.css";
import {
  exportFinalVisualExcel,
  getfvidata,
  getfvidetaildata,
  getReport,
  updateFinalVisualInspectionData,
  updateReportStatus,
} from "./services";
import { useEffect } from "react";
import {
  fetchFinalVisualBatchData,
  fetchgetFviData,
} from "../DippingParameters/batchSlice";
import Loader from "../../components/Loader/Loader";
import { filterUid } from "../DippingParameters/Services";
import { images } from "../../config/images";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExcelIcon from "../../assets/images/excel-icon.svg";
import FinalVisualInspectionModal from "../GlovesTracking/ElectricTestModal/FinalVisualModal";
import FinalVisualModal from "./FinalVisualInspectionModal";
import { getBatchdata } from "../AddBatch/services";
import ShiftDrpdown from "../../common/Drpdown/Shift";
import RorLdropdown from "../../common/Drpdown/RorL";

const headCells = [
  {
    id: "date",
    label: <b>Date</b>,
  },
  {
    id: "bNo",
    label: <b>Batch No</b>,
  },
  {
    id: "uid",
    label: <b>UID</b>,
  },
  {
    id: "lotNo",
    label: <b>LOT No</b>,
  },
  {
    id: "class",
    label: <b>Class</b>,
  },
  {
    id: "size",
    label: <b>Size</b>,
  },
  {
    id: "sc_re",
    label: <b>Thickness</b>,
  },
  {
    id: "robot",
    label: <b>Approval Staus</b>,
  },
];
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator, serchData, search) {
  if (search) {
    const stabilizedThis = serchData.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  } else {
    const stabilizedThis = array.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
}

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
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={{ color: "#3C4856" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
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

function FinalVisualInspection(props) {
  const [mobileFilter, setMobileFilter] = useState(true);
  const [finalVisual, setFinalVisual] = useState(true);
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setLoading] = useState(false);
  const [sendingID, setSendingId] = useState(false);
  const [sendingmsg, setSendingMsg] = useState(false);
  const [printingData, setPrintingData] = useState();
  const [tabTitle, setTabTitle] = useState(true);
  const [batchType, setBatchType] = useState();
  const [reportStatus, setReportStatus] = useState([]);
  const [status1, setStatus1] = useState(null);
  const [approveStatus, setApproveStatus] = useState("");
  const [rejectedButton, setRejectedButton] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [loaderDuration, setLoaderDuration] = useState(0);
  const [comment, setComment] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [finalVisualRow, setFinalVisualRow] = useState("");
  const [finalVisualReportData, setFinalVisualReportData] = useState([]);
  const [fviData, setFviData] = useState([]);
  const { row, selectRorL } = props;

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
    RorL: "",
    Thickness: "",
    Test_Result: "",
    Approval_Status: "",
  };
  const [searchText, setSearchText] = useState(initiallValue);
  const [searchUID, setSearchUID] = useState("");
  const [searchUIDData, setSearchUIDData] = useState([]);
  const dispatch = useDispatch();

  const { startDateReFormat, endDateReFormat } = props;
  const [startDateTime, setstartDateTime] = useState();
  const [endDateTime, setendDateTime] = useState();

  useEffect(() => {
    console.log(
      "startDateReFormat in final visualinspection",
      startDateReFormat
    );
    console.log(
      "endDateReFormat in final visualinspection",
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
      props.FinalVisualSearchsendtoPerent(searchText);
    }
  }, [searchText]);

  const { batch } = useSelector((state) => state.batchState);

  const { userPermission } = useSelector((state) => state.userState);

  // useEffect(() => {
  //   handleFviData(searchText);
  // }, [page,rowsPerPage,searchText,selectRorL]);

  // const handleFviData = (searchText) => {
  //   const params = {
  //     page: page,
  //     rowsPerPage: rowsPerPage,
  //     searchText:searchText,
  //     selectRorL:selectRorL
  //   };
  //   dispatch(fetchgetFviData(params));
  // };
  useEffect(() => {
    if (loaderDuration > 0) {
      const timeout = setTimeout(() => {
        setLoaderDuration(loaderDuration - 1000);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [loaderDuration]);

  useEffect(() => {
    const params = {
      page: page,
      rowsPerPage: rowsPerPage,
      searchText: searchText,
      selectRorL: selectRorL,
    };
    // handleFviData(params);

    getBatchdata(searchText);
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
      handleFviData(params);

      getBatchdata(searchText);
      // handleSearchData(searchText);
      // getData();
      return () => {};
    }
  }, [startDateTime, endDateTime, page, rowsPerPage, selectRorL, searchText]);
  // useEffect(() => {
  //   if (searchUID === "") {
  //     getBatchData();
  //   }
  // }, [searchUID]);

  // const getBatchData = async (search) => {
  //   if (searchText === "") {
  //     dispatch(fetchFinalVisualBatchData(search));
  //   } else {
  //     dispatch(fetchFinalVisualBatchData(search));
  //   }
  // };

  const handleFilter = () => {
    setMobileFilter(!mobileFilter);
  };
  const closeFilter = () => {
    setMobileFilter(!mobileFilter);
  };

  const handleFviData = async (search) => {
    if (searchText === "") {
      const resp = await getfvidata(search);
      setFviData(resp.data);
    } else {
      const resp = await getfvidata(search);
      setFviData(resp.data);
    }
  };
  const handleApprovedStatus = async (row, status) => {
    setOpenModal(true);
    const params = {
      uid_type: row.uid_type,
    };
    try {
      const resp = await getfvidetaildata(params);
      if (resp.status == 200 || resp.status == 201) {
        if (resp.data.payload.length) {
          setOpenModal(true);
        }
        setApproveStatus(status);
        setFinalVisualRow(row);
        setFinalVisualReportData(resp.data.payload);
      }
    } catch (error) {
      console.log("handleSubmit", error);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // const newSelected = getfvidata.results.map((n,index,array) =>{
      //   console.log("index",index);
      //   console.log("array",array);
      //   console.log("n.uid_type",n.length);

      //   return n.uid_type
      //   // n.uid_type

      // } );
      const newSelected = [];
      for (let i = 0; i < fviData.results.length; i++) {
        if (i > 39) {
          break;
        }
        newSelected.push(fviData.results[i].uid_type);
      }
      console.log("datanik", newSelected);
      // const newSelected = getfvidata.results[0].uid_type;
      console.log("newSelected...", newSelected);
      setSelected(newSelected);
      props.handleFinalExcel(newSelected);
      return;
    }
    setSelected([]);
    props.handleFinalExcel([]);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fviData.length) : 0;

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
    setIsLoading(true);
    setLoaderDuration(7000);
    console.log("Approved Uid", selected);
    const params = {
      uid_id_type: selected,
      status: status1,
      comment: comment,
    };
    try {
      const resp = await updateFinalVisualInspectionData(params);
      if (resp.status == 200 || resp.status == 201) {
        setSendingMsg(false);
        setSendingId(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit", error);
    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    console.log("selectedIndex", selectedIndex);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0 && selectedIndex < 40) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    if (selected.length < 40) {
      props.handleFinalExcel(newSelected);
      setBatchType(newSelected);
      console.log("length of the selected check box", selected.length);
      setSelected(newSelected);
    } else {
      toast.error("You cannot select more than 40 entries.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
  };

  const tableHeadStyle = {
    position: "sticky",
    top: "-7px",
    zIndex: isLoading ? "auto" : 9,
  };

  const checkData = reportStatus.find(
    (f) => f.final_visual_inspection_details !== null
  );

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

  return (
    <>
      <div
        onClick={closeFilter}
        className={`filter-overlay ${
          mobileFilter ? "mobile-d-none" : "mobile-d-flex"
        }`}
      ></div>
      {props.finalVisual && (
        <>
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

          <div
            className="d-flex justify-content-end approved-rejected-btn"
            style={{ marginTop: "-85px", padding: "0" }}
          >
            <button
              className={
                selected.length
                  ? "rejected-btn"
                  : `Rejected-status2 ${
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
                    }`
              }
              onClick={rejectedModal}
            >
              Reject
            </button>

            <button
              className={
                selected.length
                  ? "Approved-btn"
                  : `Approved-status1 ${
                      approveStatus == "Pending" || approveStatus == "Approved"
                        ? props.checkUidData
                          ? approveStatus == "Approved"
                            ? "disable-button"
                            : approveStatus == "Pending"
                            ? ""
                            : "disable-button"
                          : "disable-button"
                        : ""
                    }`
              }
              onClick={approvedModal}
            >
              Approve
            </button>
          </div>

          <div style={{ paddingTop: "34px" }}>
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
                    )?.is_editor === true &&
                    userPermission.find(
                      (permission) =>
                        permission.module === "Reports & Approvals"
                    )?.is_viewer === true ? (
                      <TableCell colSpan={2}>
                        <div className="d-flex">
                          <div>
                            <Checkbox
                              onClick={(event) => {
                                console.log(
                                  "getfvidata.results.uid_type",
                                  fviData.results.uid_type
                                );
                                console.log(
                                  "getfvidata.results",
                                  fviData.results[0].uid_type
                                );
                                console.log("getfvidata", getfvidata);
                                console.log("event", event.target.checked);
                                handleSelectAllClick(event, fviData.results);
                              }}
                            />
                          </div>
                          <div className="date-checkbox">Date</div>
                        </div>
                      </TableCell>
                    ) : (
                      <TableCell colSpan={2}>
                        <div className="d-flex">
                          <div>
                            <Checkbox
                              onClick={() => handleToastMsg()}
                              checked={false}
                            />
                          </div>
                          <div className="date-checkbox">Date</div>
                        </div>
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
                       name="Test_Result"
                        className="select_print_result"
                        value={searchText.Test_Result}
                        onChange={handleSearchData}
                      >
                        <option value="">Test Result</option>
                        <option value="pass">Pass</option>
                        <option value="fail">Fail</option>
                      </select>
                    </TableCell>
                    <TableCell className="search-table-row">
                      <SearchIcon className="search-icon" />
                      <input
                        type="search"
                        placeholder="Approval Status"
                        name="Approval_Status"
                        value={searchText.Approval_Status}
                        onChange={handleSearchData}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="reports-table">
                  {fviData?.results?.map((row, index) => {
                    const isItemSelected = isSelected(row.uid_type);
                    const labelId = `enhanced-table-checkbox-${row.uid_type}`;
                    return (
                      <TableRow className="main-table-reports">
                        {userPermission.find(
                          (permission) =>
                            permission.module === "Reports & Approvals"
                        )?.is_editor === true &&
                        userPermission.find(
                          (permission) =>
                            permission.module === "Reports & Approvals"
                        )?.is_viewer === true ? (
                          <TableCell padding="checkbox">
                            <Checkbox
                              onClick={(event) =>
                                handleClick(event, row.uid_type)
                              }
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                        ) : (
                          <TableCell padding="checkbox">
                            <Checkbox
                              onClick={() => handleToastMsg()}
                              color="primary"
                              checked={false}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                        )}
                        <TableCell>
                          {dayjs(row.created_at).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell id={labelId} scope="row" padding="none">
                          {row.batch_id_type}
                        </TableCell>
                        <TableCell>{row.uid_type}</TableCell>
                        <TableCell>
                          {dayjs(row.fvi_date).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell>
                          {dayjs(row.fvi_date).format("HH:mm:ss")}
                        </TableCell>
                        <TableCell>{row.fvi_test_tested_shift}</TableCell>
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
                                ? row.final_visual_inspection
                                  ? row.final_visual_inspection
                                    ? "pass"
                                    : "falied"
                                  : "falied"
                                : null
                            }`}
                          >
                            {row
                              ? row.final_visual_inspection
                                ? row.final_visual_inspection
                                  ? "P"
                                  : "F"
                                : "F"
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
                  {openModal && (
                    <FinalVisualModal
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      finalVisualReportData={finalVisualReportData}
                      finalVisualRow={finalVisualRow}
                    />
                  )}
                </TableBody>
              </Table>
              {isLoading && <Loader />}
            </div>

            <TablePagination
              className="table-pagination pagination-div"
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={fviData ? fviData.count : null}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <div className="d-flex justify-content-end aborted">
              <p style={{ margin: 0, marginBottom: 0 }}>
                Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169;
                All Rights Reserved
              </p>
            </div>
          </div>
        </>
      )}

      {/* </div> */}
    </>
  );
}

export default FinalVisualInspection;
