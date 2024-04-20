import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import "./DippingParameters.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBatch, updateRobotStatus, getRobotStatus } from "./batchSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExcelIcon from "../../assets/images/excel-icon.svg";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import AddBatch from "../AddBatch/AddBatch";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { colors } from "../../config/colors";
import Loader from "../../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import {
  getRobotHistory,
  updateRobotParametersStatus,
  abortBatch,
  filterUid,
  exportExcel,
  checkbatchstatus,
} from "./Services";
import RobotParameterDialogModal from "./RobotParameterDialog/RobotParameterDialogModal";
import { Card, Collapse, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { images } from "../../config/images";
import EditBatch from "../EditBatch/EditBatch";
import { CardContent } from "@material-ui/core";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import Button from "../../components/Button/Button";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    paddingBottom: "100px",
    minHeight: "85vh",
    minWidth: "95%",
    color: "#3C4856",
    fontSize: "16px",
  },
}));
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
// need to support IE11, you can use Array.prototype.sort() directly[el, index]
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

function createData(name, calories) {
  return {
    name,
    calories,
    history: [
      {
        Title: "Stripping Machine Failure",
        button: <button className="mt-2">START</button>,
        button1: <button className="mt-2">STOP</button>,
        Hours: "00:00",
      },
      {
        Title: "Ultrasonic Machine Failure",
        button: <button className="mt-2">START</button>,
        button1: <button className="mt-2">STOP</button>,
        Hours: "00:00",
      },
      {
        Title: "Gantry Failure",
        button: <button className="mt-2">START</button>,
        button1: <button className="mt-2">STOP</button>,
        Hours: "00:00",
      },
      {
        Title: "Circulation Motor Breakdown (Leaching Tank Circulation )",
        button: <button className="mt-2">START</button>,
        button1: <button className="mt-2">STOP</button>,
        Hours: "00:00",
      },
      {
        Title: "Blower Motor Breakdown ( Tunnel Oven) ",
        button: <button className="mt-2">START</button>,
        button1: <button className="mt-2">STOP</button>,
        Hours: "00:00",
      },
      {
        Title: "Conveyor System Failure",
        button: <button className="mt-2">START</button>,
        button1: <button className="mt-2">STOP</button>,
        Hours: "00:00",
      },
      {
        Title: "Crane Breakdown (Frame Handling Crane )",
        button: <button className="mt-2">START</button>,
        button1: <button className="mt-2">STOP</button>,
        Hours: "00:00",
      },
      {
        Title: "Beading System Failure",
        button: <button className="mt-2">START</button>,
        button1: <button className="mt-2">STOP</button>,
        Hours: "00:00",
      },
      {
        Title: "Robot 1 Breakdown",
        button: <button className="mt-2">START</button>,
        button1: <button className="mt-2">STOP</button>,
        Hours: "00:00",
      },
      {
        Title: "Robot 2 Breakdown",
        button: <button className="mt-2">START</button>,
        button1: <button className="mt-2">STOP</button>,
        Hours: "00:00",
      },

      {
        Title: "Leaching Tank Lifter Break Down",
        button: <button className="mt-2">START</button>,
        button1: <button className="mt-2">STOP</button>,
        Hours: "00:00",
      },
      {
        Title: "Dipping Tank Motor Breakdown",
        button: <button className="mt-2">START</button>,
        button1: <button className="mt-2">STOP</button>,
        Hours: "00:00",
      },
    ],
  };
}
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>
          <div className="d-flex justify-content-between">
            <h6>{row.calories}</h6>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              className="Expand-button"
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </div>
        </TableCell>
      </TableRow>
      <TableRow className="downtime-inner-table">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} className="table-container">
              <TableBody>
                {row.history.map((historyRow) => (
                  <TableRow key={historyRow.date}>
                    <TableCell
                      component="th"
                      scope="row"
                      className="titlehistory"
                    >
                      {historyRow.Title}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className="titlehistory"
                    >
                      <div className="d-flex justify-content-between btn-column">
                        <h6> {historyRow.button}</h6>
                        <h6>{historyRow.button1}</h6>
                        <h6>{historyRow.Hours}</h6>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(1, "Equipment Failure"),
  createData(2, " Set Up & Changeover Loss"),
  createData(3, "Tool Change Loss"),
  createData(4, "Minor Stopage"),
  createData(5, "Speed Loss"),
  createData(6, "Defects & Rework Loss "),
  createData(7, "Shutdown Loss"),
  createData(8, "Management Loss"),
  createData(9, "Operating Motion Loss"),
  createData(10, "Line Organization Loss"),
  createData(11, "Logistic Loss "),
  createData(12, "Measuring & Adjustment Loss"),
  createData(13, "Yield Loss"),
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
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

const DippingParameters = () => {
  // Initialize state variables
  const classes = useStyles();
  const [open, setOpened] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [robotType, setRobotType] = useState();
  const [robotHistoryData, setRobotHistoryData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isData, setIsData] = useState(false);
  const [batchTypeForEditParams, setBatchTypeForEditParams] = useState("");
  const [downTime, setDownTime] = useState(false);
  const [dippingTable, setDippingTable] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const dispatch = useDispatch();
  const { batch, r1r2status } = useSelector((state) => state.batchState);
  const { userPermission } = useSelector((state) => state.userState);

  const initiallValue = {
    Date: "",
    B_No: "",
    UID: "",
    Lot_No: "",
    Class: "",
    Size: "",
    Scre: "",
  };
  const [searchText, setSearchText] = useState(initiallValue);
  const [searchUID, setSearchUID] = useState("");
  const [searchUIDData, setSearchUIDData] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [editData, setEditData] = useState("");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isPopup, setisPopup] = useState(false);

  // fetching data from an API and dispatch getRobotStatus API

  useEffect(() => {
    const searchParams = {
      search: searchText,
      page: page,
      rowsPerPage: rowsPerPage,
    };
    getBatchData(searchParams);
    handleSearchData(searchText);
    dispatch(getRobotStatus());
    return () => {};
  }, [searchText, page, rowsPerPage]);

  const handleModalData = async (row) => {
    const params = {
      batch_id: row.batch_id[0].batch_id,
    };
    try {
      const resp = await getRobotHistory(params);
      setLoading(false);
      if (resp.status == 200 || resp.status == 201) {
        setRobotHistoryData(resp.data.payload);
        setIsData(true);
        setBatchTypeForEditParams(row.batch_type);
      }
    } catch (error) {
      setLoading(false);
      setIsData(false);
      setBatchTypeForEditParams(row.batch_type);
      console.log("handleSubmit", error);
    }
    setOpenModal(true);
  };

  const handleEditClick = (row) => {
    setLoading(true);
    handleModalData(row);
  };

  //fetchdata from getUidData API
  useEffect(() => {
    if (searchUID) {
      getUidData(searchText);
    }
  }, [searchUID]);

  const getUidData = (search) => {
    const searchParams = {
      search: searchText,
      page: page,
      rowsPerPage: rowsPerPage,
    };
    if (searchUID === "") {
      dispatch(fetchAllBatch(searchParams));
    }
  };

  const getBatchData = async (search) => {
    if (searchText === "") {
      dispatch(fetchAllBatch(search));
    } else {
      dispatch(fetchAllBatch(search));
    }
  };

  const handleR1R2Click = async (robot, batch) => {
    setLoading(true);
    const robotStatus =
      robot === "R1" ? r1r2status.r1_status : r1r2status.r2_status;
    const updatedStatus = robotStatus === "Start" ? "Stop" : "Start";

    const params = {
      robot_type: robot,
      robot_status: updatedStatus,
      batch_id: batch.batch_id[0].batch_id,
    };
    // Dispatches an action to fetch test batch data and updates robot status based on the results.
    const updateRobotStatusAction = await dispatch(updateRobotStatus(params));

    // If the action is fulfilled,Dispatch getRobotStatus API
    if (updateRobotStatus.fulfilled.match(updateRobotStatusAction)) {
      setLoading(false);
      dispatch(getRobotStatus());
      if (robotStatus == "Stop") {
        setLoading(true);
        handleModalData(batch);
      }
    }
    // If the action is rejected, it displays an error toast
    else if (updateRobotStatus.rejected.match(updateRobotStatusAction)) {
      setLoading(false);
      toast.error("Something was wrong, try again", {
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
  // const handleDownTime = () => {
  //   setDippingTable(false);
  //   setDownTime(true);
  // }

  // const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [openM, setOpen] = React.useState(false);
  const [editModal, setEditModal] = useState(false);

  console.log("editModaleditModaleditModaleditModal", editModal);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEditClickOpen = () => {
    setEditModal(true);
  };

  const handleCloseM = () => {
    setOpen(false);
    setEditModal(false);
  };
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const handleCheckbox = (batch) => {
    const index = isChecked.findIndex((element) => element === batch.batchid);
    if (index === -1) {
      setIsChecked((s) => {
        return [...s, batch.batchid];
      });
    } else {
      const newArray = [...isChecked];
      newArray.splice(index, 1);
      setIsChecked(newArray);
    }
  };

  const allDelete = async () => {};

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [selected, setSelected] = React.useState([]);

  const [input, setInput] = useState(robotHistoryData);
  const [exportId, setExportId] = useState("");
  const [exportPdf, setExportPdf] = useState("");
  const [checkBatch, setCheckBatch] = useState([]);
  const [Count, setCount] = useState("");

  // if(batch.count){
  //   setCount(batch.count)

  // }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      console.log("");
      const batchdata = batch.results;

      console.log("batchdata......", batchdata);
      const newSelected = batchdata.map((n, index) => n.batchid);
      console.log("newSelected....", newSelected);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleBack = () => {
    setDownTime(false);
    setDippingTable(true);
    setAnalytics(false);
  };

  const handleDownData = () => {
    setDippingTable(false);
    setDownTime(true);
    setAnalytics(false);
  };
  const handleAnaytics = () => {
    setAnalytics(true);
    setDippingTable(false);
    setDownTime(false);
  };

  const handleClick = (event, name, row) => {
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
    setEditData(row);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - batch.length) : 0;

  const isDeleteDisabled = selected.length === 0;
  const isEditDisabled = selected.length === 1;
  const isExcelDisabled = selected.length === 0;

  const handleChange = (e, i, valueForRow) => {
    setIsDisabled(true);
    let newArray = [...robotHistoryData];
    if (
      valueForRow == "robot_default_values_first" ||
      valueForRow == "robot_default_values_second"
    ) {
      newArray[i].robot_parameter[valueForRow][0][e.target.name] =
        e.target.value;
    } else if (
      valueForRow == "temperature" ||
      valueForRow == "humidity" ||
      valueForRow == "remarks"
    ) {
      newArray[i].robot_parameter[e.target.name] = e.target.value;
    } else {
      newArray[i][e.target.name] = e.target.value;
    }
    setIsDisabled(false);
    setInput(newArray);
  };

  useEffect(() => {
    if (selected.length == 1) {
      handleCheckboxAPI();
    } else {
      setCheckBatch(false);
    }
  }, [selected]);

  const handleCheckboxAPI = async () => {
    const params = {
      batch_id: selected[0],
    };
    try {
      const resp = await checkbatchstatus(params);
      if (resp.status == 200 || resp.status == 201) {
        setCheckBatch(resp.data.payload.edit);
      }
    } catch (error) {
      console.log("handleSubmit", error);
    }
  };

  const handleSubmit = async () => {
    try {
      input.forEach(async (element) => {
        const resp = await updateRobotParametersStatus(element);
        if (resp.status == 200 || resp.status == 201) {
          setOpenModal(false);
        }
      });
    } catch (error) {
      setLoading(false);
      toast.error("Something was wrong, try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("handleSubmit", error);
    }
  };

  const handleAbortClick = async () => {
    const params = {
      batch_id: selected,
    };
    try {
      const resp = await abortBatch(params);
      setLoading(false);
      if (resp.status == 200 || resp.status == 201) {
        window.location.reload(false);
        getBatchData();
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something was wrong, try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("handleSubmit", error);
    }
  };
  // This function handles the search API call
  const handelSearchApi = async () => {
    const params = {
      uid_type: searchUID,
      page: page,
      rowsPerPage: rowsPerPage,
    };
    try {
      // Call the filterUid API with the search parameters
      const resp = await filterUid(params);
      setLoading(false);
      // If the API call is successful, update the search results state
      if (resp.status == 200 || resp.status == 201) {
        // console.log("resp.data",resp.data.results)
        setSearchUIDData(resp.data.results);
        setCount(resp.data.count);
      }
    } catch (error) {
      // Set loading state to false and log any errors
      setLoading(false);
      console.log("handleSubmit", error);
    }
  };

  // This effect is triggered whenever the `searchUID` value changes.
  // If `searchUID` has a truthy value, `handelSearchApi` function is called.
  useEffect(() => {
    console.log("......searchUID...length:", searchUID.length);
    if (searchUID.length >= 4) {
      handelSearchApi();
    }
  }, [searchUID]);

  const handleSearchData = async (e) => {
    // Destructure the name and value of the input field that triggered the change
    const { name, value } = e.target;

    console.log(`name:${e.target.name}....values:${e.target.value}`);

    // Update the searchText state object with the new value for the specified input field
    setSearchText({ ...searchText, [name]: value });
  };

  const handleUIDSearch = async (e) => {
    const { name, value } = e.target;
    console.log("value.length::", value.length);

    setSearchUID(e.target.value);
    if (value.length >= 6) {
      console.log(`name:${e.target.name}....values:${e.target.value}`);
    }
  };

  const handleExcelClick = async () => {
    setisPopup(false);
    setSuccessPopup(true);
    const params = {
      batch_id: selected,
    };
    try {
      // Call the filterUid API with the search parameters
      const resp = await exportExcel(params);
      setLoading(false);
      // If the API call is successful, update the search results state
      if (resp.status == 200 || resp.status == 201) {
        setExportPdf(resp.data.payload.dipping_parameter_report);
        setTimeout(() => {
          setSuccessPopup(false);
        }, 5000);
      } else {
        console.log("Something was wrong, try again");
      }
    } catch (error) {
      // Set loading state to false and log any errors
      setLoading(false);
      toast.error("Please select only one batch", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("handleSubmit", error);
    }
  };

  const isCheckboxDisabled = (id) => {
    return selected.length >= 1 && !selected.includes(id);
  };

  return (
    <div className="page-wraper">
      <ToastContainer />
      <>
        {dippingTable ? (
          <div className="page-header">
            <Link
              to="/dashboard"
              className="page-back-btn"
              onClick={handleBack}
            >
              <ArrowBackIcon />
              <span>Dipping Parameters</span>
            </Link>
            {userPermission.find(
              (permission) => permission.module === "Dipping Parameters"
            ).is_editor == true &&
            userPermission.find(
              (permission) => permission.module === "Dipping Parameters"
            ).is_viewer == true ? (
              <div className="header-btn-group">
                {/* <button className="page-header-btn-params" >Down Time</button>
              <button className="page-header-btn-params" >Analytics</button> */}
                <button
                  className={`page-header-btn ${checkBatch ? "" : "disabled"}`}
                  disabled={checkBatch ? false : true}
                  onClick={() => handleAbortClick(batch)}
                >
                  Abort
                </button>
                {/* <button className="page-header-btn" ><img src={images.filterIcon} style={{ marginRight: "8px" }} />Filter</button> */}
                <button
                  className={`page-header-btn ${
                    isExcelDisabled ? "disabled" : ""
                  }`}
                  disabled={isExcelDisabled}
                  onClick={() => setisPopup(true)}
                >
                  <img src={ExcelIcon} alt="" />
                </button>
                <button
                  className={`page-header-btn ${checkBatch ? "" : "disabled"}`}
                  disabled={checkBatch ? false : true}
                  onClick={handleEditClickOpen}
                  // disabled={isEditDisabled}
                >
                  <img src={images.editIcon} />
                </button>
                <button
                  className={`page-header-btn ${checkBatch ? "" : "disabled"}`}
                  onClick={allDelete}
                  disabled={isDeleteDisabled}
                >
                  <DeleteForeverIcon />
                </button>
                <button
                  className="page-header-btn filled"
                  loading={false}
                  onClick={handleClickOpen}
                >
                  <AddIcon />
                </button>
              </div>
            ) : (
              <div className="header-btn-group">
                {/* <button className="page-header-btn-params" >Down Time</button>
              <button className="page-header-btn-params" >Analytics</button> */}
                <button
                  className={`page-header-btn ${checkBatch ? "" : "disabled"}`}
                  onClick={() => handleToastMsg()}
                >
                  Abort
                </button>
                {/* <button className="page-header-btn" ><img src={images.filterIcon} style={{ marginRight: "8px" }} />Filter</button> */}
                <button
                  className={`page-header-btn ${
                    isExcelDisabled ? "disabled" : ""
                  }`}
                  disabled={isExcelDisabled}
                  onClick={() => handleToastMsg()}
                >
                  <img src={ExcelIcon} alt="" />
                </button>
                <button
                  className={`page-header-btn ${checkBatch ? "" : "disabled"}`}
                  onClick={() => handleToastMsg()}
                  // disabled={isEditDisabled}
                >
                  <img src={images.editIcon} />
                </button>
                <button
                  className={`page-header-btn ${checkBatch ? "" : "disabled"}`}
                  onClick={allDelete}
                  disabled={isDeleteDisabled}
                >
                  <DeleteForeverIcon />
                </button>
                <button
                  className="page-header-btn filled"
                  loading={false}
                  onClick={() => handleToastMsg()}
                >
                  <AddIcon />
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {downTime ? (
              <div className="page-header">
                <Link
                  to="/dipping-parameters"
                  className="page-back-btn"
                  onClick={handleBack}
                >
                  <ArrowBackIcon />
                  <span>Down Time Losses</span>
                </Link>
                <div className="header-btn-group">
                  <button className="page-header-btn" onClick={handleBack}>
                    Dipping Parameters
                  </button>
                  <button className="page-header-btn" onClick={handleAnaytics}>
                    Anaytics
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="page-header">
                  <Link
                    to="/dipping-parameters"
                    className="page-back-btn"
                    onClick={handleBack}
                  >
                    <ArrowBackIcon />
                    <span>Anaytics</span>
                  </Link>
                  <div className="header-btn-group">
                    <button className="page-header-btn" onClick={handleBack}>
                      Dipping Parameters
                    </button>
                    <button
                      className="page-header-btn"
                      onClick={handleDownData}
                    >
                      Loss Analysis
                    </button>
                    <button className="page-header-btn">
                      <img
                        src={images.filterIcon}
                        style={{ marginRight: "8px" }}
                      />
                      Filter
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <div className={`${dippingTable ? "d-block" : "d-none"}`}>
          <div className="table-responsive">
            <Table aria-label="Dipping parameter" className="dipping-params">
              <TableHead classes={{ root: classes.thead }}>
                <TableRow>
                  <TableCell colSpan={1}>
                    <Checkbox
                      color="primary"
                      onClick={(event) => handleSelectAllClick(event)}
                    />
                  </TableCell>

                  <TableCell
                    colSpan={1}
                    // style={{
                    //   display: "flex",

                    //   justifyContent: "space-between",

                    // }}
                  >
                    Date
                  </TableCell>
                  <TableCell>B.No</TableCell>
                  <TableCell>UID</TableCell>
                  <TableCell>LOT No</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>SC/RE</TableCell>
                  <TableCell>Robot</TableCell>
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
                      value={searchUID}
                      onChange={handleUIDSearch}
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
                      placeholder="SC/RE"
                      name="Scre"
                      value={searchText.Scre}
                      onChange={handleSearchData}
                    />
                  </TableCell>
                  <TableCell className="search-table-row"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {batch // Check if `batch` is defined
                  ? stableSort(
                      batch.results,
                      getComparator(order, orderBy),
                      searchUIDData,
                      searchUID.length >=4 ? searchUID: ""
                    ) // Sort the `batch` array using a comparator function, `order`, `orderBy`, `searchUIDData`, and `searchUID`
                      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Get a slice of `batch` to display on the current page
                      // .filter((row) => {// Filter the `batch` array based on the `searchText` state
                      //   if (JSON.stringify(searchText) === JSON.stringify(initiallValue)) { // If `searchText` is the same as `initialValue`, return all rows
                      //     return row;
                      //   }
                      //   else // Otherwise, return rows that match the search criteria
                      //   {
                      //     return row;
                      //   }
                      // })

                      .map((row) => {
                        const isItemSelected = isSelected(row.batchid);

                        const labelId = `enhanced-table-checkbox-${row.batchid}`;
                        const r1Disabled =
                          (r1r2status.r1_status === "Start" &&
                            row.batch_type !== r1r2status.r1_running_batch) ||
                          (r1r2status.r2_status === "Start" &&
                            row.batch_type === r1r2status.r2_running_batch);
                        const r1Status =
                          row.batch_type === r1r2status.r1_running_batch &&
                          r1r2status.r1_status === "Start"
                            ? "Stop"
                            : "Start";
                        const r2Disabled =
                          (r1r2status.r2_status === "Start" &&
                            row.batch_type !== r1r2status.r2_running_batch) ||
                          (r1r2status.r1_status === "Start" &&
                            row.batch_type === r1r2status.r1_running_batch);
                        const r2Status =
                          row.batch_type === r1r2status.r2_running_batch &&
                          r1r2status.r2_status === "Start"
                            ? "Stop"
                            : "Start";
                        return (
                          <TableRow
                            className={`${
                              row.is_abort ? "aborded_batch " : ""
                            }`}
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.batchid}
                            selected={isItemSelected}
                          >
                            {userPermission.find(
                              (permission) =>
                                permission.module === "Dipping Parameters"
                            ).is_editor == true &&
                            userPermission.find(
                              (permission) =>
                                permission.module === "Dipping Parameters"
                            ).is_viewer == true ? (
                              <TableCell
                                padding="checkbox"
                                style={{ pointerEvents: "all" }}
                              >
                                <Checkbox
                                  onClick={(event) =>
                                    handleClick(event, row.batchid, row)
                                  }
                                  color="primary"
                                  checked={isItemSelected}
                                  // disabled={isCheckboxDisabled(row.batchid)}
                                  inputProps={{
                                    "aria-labelledby": labelId,
                                  }}
                                />
                              </TableCell>
                            ) : (
                              <TableCell
                                padding="checkbox"
                                style={{ pointerEvents: "all" }}
                              >
                                <Checkbox
                                  onClick={() => handleToastMsg()}
                                  color="primary"
                                  checked={isItemSelected}
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
                              {row.batch_type}
                            </TableCell>
                            <TableCell>
                              {row.batch_id?.length > 0
                                ? `${row.batch_id[0].uid_id_type} - ${
                                    row.batch_id[row.batch_id.length - 1]
                                      .uid_id_type
                                  }`
                                : "-"}
                            </TableCell>
                            <TableCell>{row.lot_number || "-"}</TableCell>
                            <TableCell>{row.class_name}</TableCell>
                            <TableCell>{row.size_name}</TableCell>
                            <TableCell>{row.scre}</TableCell>
                            {userPermission.find(
                              (permission) =>
                                permission.module === "Dipping Parameters"
                            ).is_editor == true &&
                            userPermission.find(
                              (permission) =>
                                permission.module === "Dipping Parameters"
                            ).is_viewer == true ? (
                              <TableCell className="btn-column">
                                {
                                  <button
                                    className="start-button"
                                    onClick={() => {
                                      if (
                                        r1r2status.r1_status === "Start" &&
                                        row.batch_type !==
                                          r1r2status.r1_running_batch
                                      ) {
                                      } else {
                                        handleR1R2Click("R1", row);
                                      }
                                    }}
                                    value={robotType}
                                    disabled={r1Disabled}
                                    style={{
                                      opacity: r1Disabled ? 0.5 : 1,
                                      backgroundColor:
                                        r1Status === "Stop"
                                          ? colors.primary
                                          : "#F4F7FE",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color:
                                          r1Status === "Stop"
                                            ? "#F4F7FE"
                                            : colors.primary,
                                      }}
                                    >
                                      {"R1 " + r1Status || "-"}
                                    </span>
                                  </button>
                                }
                                <button
                                  className="start-button"
                                  onClick={() => {
                                    handleR1R2Click("R2", row);
                                  }}
                                  value={robotType}
                                  disabled={r2Disabled}
                                  style={{
                                    opacity: r2Disabled ? 0.5 : 1,
                                    backgroundColor:
                                      r2Status === "Stop"
                                        ? colors.primary
                                        : "#F4F7FE",
                                  }}
                                >
                                  <span
                                    style={{
                                      color:
                                        r2Status === "Stop"
                                          ? "#F4F7FE"
                                          : colors.primary,
                                    }}
                                  >
                                    {"R2 " + r2Status || "-"}
                                  </span>
                                </button>
                                {userPermission.find(
                                  (permission) =>
                                    permission.module === "Dipping Parameters"
                                ).is_editor == true &&
                                userPermission.find(
                                  (permission) =>
                                    permission.module === "Dipping Parameters"
                                ).is_viewer == true ? (
                                  <img
                                    src={images.editIcon}
                                    onClick={() => handleEditClick(row)}
                                    value={robotHistoryData}
                                    className="edit-btn"
                                  />
                                ) : (
                                  <img
                                    src={images.editIcon}
                                    onClick={handleToastMsg}
                                    value={robotHistoryData}
                                    className="edit-btn"
                                  />
                                )}
                              </TableCell>
                            ) : (
                              <TableCell className="btn-column">
                                {
                                  <button
                                    className="start-button"
                                    value={robotType}
                                    disabled={r1Disabled}
                                    onClick={handleToastMsg}
                                    style={{
                                      opacity: r1Disabled ? 0.5 : 1,
                                      backgroundColor:
                                        r1Status === "Stop"
                                          ? colors.primary
                                          : "#F4F7FE",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color:
                                          r1Status === "Stop"
                                            ? "#F4F7FE"
                                            : colors.primary,
                                      }}
                                    >
                                      {"R1 " + r1Status || "-"}
                                    </span>
                                  </button>
                                }
                                <button
                                  className="start-button"
                                  value={robotType}
                                  disabled={r2Disabled}
                                  onClick={handleToastMsg}
                                  style={{
                                    opacity: r2Disabled ? 0.5 : 1,
                                    backgroundColor:
                                      r2Status === "Stop"
                                        ? colors.primary
                                        : "#F4F7FE",
                                  }}
                                >
                                  <span
                                    style={{
                                      color:
                                        r2Status === "Stop"
                                          ? "#F4F7FE"
                                          : colors.primary,
                                    }}
                                  >
                                    {"R2 " + r2Status || "-"}
                                  </span>
                                </button>
                                {userPermission.find(
                                  (permission) =>
                                    permission.module === "Dipping Parameters"
                                ).is_editor == true &&
                                userPermission.find(
                                  (permission) =>
                                    permission.module === "Dipping Parameters"
                                ).is_viewer == true ? (
                                  <img
                                    src={images.editIcon}
                                    onClick={() => handleEditClick(row)}
                                    value={robotHistoryData}
                                    className="edit-btn"
                                  />
                                ) : (
                                  <img
                                    src={images.editIcon}
                                    onClick={handleToastMsg}
                                    value={robotHistoryData}
                                    className="edit-btn"
                                  />
                                )}
                              </TableCell>
                            )}
                          </TableRow>
                        );
                      })
                  : null}

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
              </TableBody>
            </Table>
          </div>

          <TablePagination
            className="table-pagination"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={Count ? Count : batch.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {/*The RobotParameterDialogModal component is passed several props, including functions for handling change and submit events, as well as data and a boolean value indicating whether the component is currently disabled.*/}

          {openModal && (
            <RobotParameterDialogModal
              closeModal={setOpenModal}
              robotHistoryData={robotHistoryData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isData={isData}
              batchType={batchTypeForEditParams}
              isDisabled={isDisabled}
            />
          )}
          <Dialog open={openM} onClose={handleCloseM}>
            <AddBatch onCloseClick={handleCloseM} />
          </Dialog>

          <Dialog open={editModal} onClose={handleCloseM}>
            <EditBatch
              onCloseClick={handleCloseM}
              selected={selected}
              editData={editData}
            />
          </Dialog>
          <div className="d-flex justify-content-end aborted">
            <p style={{ margin: 0, marginBottom: 0 }}>
              Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169;
              All Rights Reserved
            </p>
          </div>
          {isLoading && <Loader />}
        </div>

        {/* </div> */}

        <div className={`${downTime ? "d-block" : "d-none"}`}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell width={"100px"}>Sr No</TableCell>

                <TableCell>
                  <div className="d-flex justify-content-between">
                    <h6>Losses</h6>
                    <h6>Actions</h6>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="page-header">
          <div className={`${analytics ? "d-block" : "d-none"}`}>
            <div className="table-responsive">
              <Table aria-label="Dipping parameter">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  // onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={batch ? batch.length : null}
                />
                <TableHead classes={{ root: classes.thead }}>
                  <TableRow>
                    <TableCell></TableCell>
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
                        placeholder="LOT No"
                        name="Lot_No"
                        value={searchText.Lot_No}
                        onChange={handleSearchData}
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
                        placeholder="SC/RE"
                        name="Scre"
                        value={searchText.Scre}
                        onChange={handleSearchData}
                      />
                    </TableCell>
                    <TableCell className="search-table-row"></TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </div>
            <TablePagination
              className="table-pagination"
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={batch ? batch.count : null}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </>
    </div>
  );
};
export default DippingParameters;
