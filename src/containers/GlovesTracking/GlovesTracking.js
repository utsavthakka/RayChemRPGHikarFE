import React, { useState, PureComponent, useMemo, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExcelIcon from "../../assets/images/excel-icon.svg";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { Box, Card, Grid } from "@material-ui/core";
import dayjs from "dayjs";
import "./GlovesTracking.css";
import PropTypes from "prop-types";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ElectricTestModal from "./ElectricTestModal/ElectricTestModal";
import VisualInspectionModal from "./ElectricTestModal/VisualInspectionModal";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormGroup from "@mui/material/FormGroup";
import { visuallyHidden } from "@mui/utils";
import {
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableSortLabel,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchAllBatch } from "../DippingParameters/batchSlice";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../AddBatch/services";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import { print } from "./services";
import FinalVisualInspectionModal from "./ElectricTestModal/FinalVisualModal";
import { useCubeQuery } from "@cubejs-client/react";
import { colors } from "../../config/colors";
import Expanded from "./Expand";
import { filterUid } from "../DippingParameters/Services";
import Loader from "../../components/Loader/Loader";
import { images } from "../../config/images";
import { cubejsApi } from "../../cubejs/CubeJsApiWrapper";

const data1 = [
  { name: "Group C", value: 75 },
  { name: "Group D", value: 25 },
];

const COLORS = ["#e8f8f2", "#ffeced"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#1db475"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const data = [
  {
    name: "Shift 1",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Shift 2",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Shift 3",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
];

const headCells = [
  {
    id: "data",
    label: <b>Date</b>,
  },
  {
    id: "bNo",
    label: <b>B.No</b>,
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
    label: <b>SC/RE</b>,
  },
  {
    id: "robot",
    label: <b>Robot</b>,
  },
];

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

function GlovesTracking(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openVisualModal, setOpenVisualModal] = useState(false);
  const [finalVisualModal, setFinalVisualModal] = useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectClass] = useState();
  const [isLoading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [glovesTable, setGlovesTable] = useState(true);
  const [machinStatus, setMachinStatus] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [mobileFilter, setMobileFilter] = useState(true);
  const [tabTitle, setTabTitle] = useState(true);
  const [expandedRowIds, setExpandedRowId] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [sendingID, setSendingId] = useState(false);
  const [printingData, setPrintingData] = useState();
  const [uidType, setUidType] = useState(null);
  const [visual, setVisual] = useState(null);
  const [electric, setElectric] = useState(null);
  const [finalVisual, setFinalVisual] = useState(null);
  const [rorl, setRorl] = useState(null);
  const [thicknessvalue, setThiknessvalue] = useState(null);
  const [checked, setChecked] = useState(false);
  const [uidPrinting, setUidPrinting] = useState(false);
  const [visualInspection, setVisualInspection] = useState(false);
  const [qrPrinting, setQrPrinting] = useState(false);
  const [pairing, setPairing] = useState(false);
  const [uidPrintGreenCheck, setUidPrintGreenCheck] = useState(false);
  const [uidPrintRedCheck, setUidPrintRedCheck] = useState(false);
  const [uidPrintBlackCheck, setUidPrintBlackCheck] = useState(false);
  const [visualGreenCheck, setVisualGreenCheck] = useState(false);
  const [visualRedCheck, setVisualRedCheck] = useState(false);
  const [visualBlackCheck, setVisualBlackCheck] = useState(false);
  const [electricTest, setElectricTest] = useState(false);
  const [electricGreenCheck, setElectricGreenCheck] = useState(false);
  const [electricRedCheck, setElectricRedCheck] = useState(false);
  const [electricBlackCheck, setElectricBlackCheck] = useState(false);
  const [finalVisualInspection, setFinalVisualInspection] = useState(false);
  const [finalVisualGreenCheck, setFinalVisualGreenCheck] = useState(false);
  const [finalVisualRedCheck, setFinalVisualRedCheck] = useState(false);
  const [finalVisualBlackCheck, setFinalVisualBlackCheck] = useState(false);
  const [greenCheck, setGreenCheck] = useState(false);
  const [redCheck, setRedCheck] = useState(false);
  const [blackCheck, setBlackCheck] = useState(false);
  const [filterData, setFilterData] = useState(false);
  const [Pagecount, setPagecount] = useState();

  // useEffect(() => {
  //   print();
  // }, []);

  const dispatch = useDispatch();
  const { batch, serchData } = useSelector((state) => state.batchState);

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

  const { userPermission } = useSelector((state) => state.userState);

  useEffect(() => {
    const searchParams = {
      search: searchText,
      page: page,
      rowsPerPage: rowsPerPage,
    };
    getBatchData(searchParams);
    handleSearchData(searchText);
    getData();
    return () => {};
  }, [searchText, page, rowsPerPage]);

  const getData = async () => {
    try {
      const resp = await getClasses();
      setClasses(resp.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const getBatchData = async (search) => {
    if (searchText === "") {
      dispatch(fetchAllBatch(search));
    } else {
      dispatch(fetchAllBatch(search));
    }
  };
  useEffect(() => {
    if (searchUID && searchUID.length > 3) {
      handelSearchApi();
    }
  }, [searchUID]);

  const handelSearchApi = async () => {
    const params = {
      uid_type: searchUID,
      page: page,
    };
    try {
      const resp = await filterUid(params);
      setLoading(false);
      if (resp.status == 200 || resp.status == 201) {
        setSearchUIDData(resp.data.results);
        setPagecount(resp.data.count);
      }
    } catch (error) {
      setLoading(false);
      setSearchUIDData([]);
    }
  };

  useEffect(() => {
    const searchParams = {
      search: searchText,
      page: page,
      rowsPerPage: rowsPerPage,
    };
    if (searchUID === "") {
      getBatchData(searchParams);
    }
  }, [searchUID, btnDisabled, page, rowsPerPage]);

  const handleSearchData = async (e) => {
    if(e.target){
      const { name, value } = e.target;
      setSearchText({ ...searchText, [name]: value });
    }
    
  };

  const handleUIDSearch = async (e) => {
    setSearchUID(e.target.value);
  };

  const handleClick = (event, name) => {
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
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = batch.map((n) => n.batchid);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - batch.length) : 0;

  const handleClearClick = () => {
    setUidPrinting(false);
    setVisualInspection(false);
    setElectricTest(false);
    setFinalVisualInspection(false);
    setQrPrinting(false);
    setPairing(false);
    setGreenCheck(false);
    setBlackCheck(false);
    setRedCheck(false);
  };

  const handleBack = () => {
    setMachinStatus(false);
    setGlovesTable(true);
    setAnalytics(false);
  };

  const handleMachinData = () => {
    setMachinStatus(true);
    setGlovesTable(false);
    setAnalytics(false);
    setTabTitle(true);
  };

  const handleAnalytics = () => {
    setMachinStatus(false);
    setGlovesTable(false);
    setAnalytics(true);
    setTabTitle(false);
  };

  const handleClickedOpen = (uidType, electric, rorl, thicknessvalue) => {
    setUidType(uidType);
    setElectric(electric);
    setRorl(rorl);
    setThiknessvalue(thicknessvalue);
    setOpenModal(true);
  };

  const handleVisualModalOpen = (uidType, visual) => {
    setUidType(uidType);
    setVisual(visual);
    setOpenVisualModal(true);
  };

  const handleFinalVisualModal = (uidType, finalVisual) => {
    setRorl(rorl);
    setThiknessvalue(thicknessvalue);
    setUidType(uidType);
    setFinalVisual(finalVisual);
    setFinalVisualModal(true);
  };
  const handleFilter = () => {
    setMobileFilter(!mobileFilter);
  };
  const closeFilter = () => {
    setMobileFilter(!mobileFilter);
  };
  const handlecheckbox = () => {
    if (uidPrinting) {
      setUidPrintGreenCheck(!uidPrintGreenCheck);
    } else if (visualInspection) {
      setVisualGreenCheck(!visualGreenCheck);
    } else if (electricTest) {
      setElectricGreenCheck(!electricGreenCheck);
    }
    // else if (finalVisualInspection) {
    //     setFinalVisualGreenCheck(!finalVisualGreenCheck)
    // }
  };

  const handlePendingCheck = () => {
    if (uidPrinting) {
      setUidPrintBlackCheck(!uidPrintBlackCheck);
    } else if (visualInspection) {
      setVisualBlackCheck(!visualBlackCheck);
    } else if (electricTest) {
      setElectricBlackCheck(!electricBlackCheck);
    }
    // else if (finalVisualInspection) {
    //     setFinalVisualBlackCheck(!finalVisualBlackCheck)
    // }
  };

  const handleGreenCheckbox = () => {
    setGreenCheck(!greenCheck);
  };

  const handleRedCheckbox = () => {
    setRedCheck(!redCheck);
  };

  const handleBlackCheckbox = () => {
    setBlackCheck(!blackCheck);
  };

  const handleUpiPrinting = () => {
    setUidPrinting(!uidPrinting);
  };

  const handleVisualInspection = () => {
    setVisualInspection(!visualInspection);
  };

  const handleElectricTest = () => {
    setElectricTest(!electricTest);
  };
  const handleFinalVisual = () => {
    setFinalVisualInspection(!finalVisualInspection);
  };
  const handleQrPrinting = () => {
    setQrPrinting(!qrPrinting);
  };

  const handlePairing = () => {
    setPairing(!pairing);
  };

  const handleExpandClick = () => {
    setFilterData(!filterData);
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
  return (
    <div className="page-wraper">
      <ToastContainer />
      <div className="page-header">
        {glovesTable ? (
          <Link to="/dashboard" className="page-back-btn">
            <ArrowBackIcon />
            <span>Gloves Tracking</span>
          </Link>
        ) : (
          <Link to="" className="page-back-btn" onClick={handleBack}>
            <ArrowBackIcon />
            <span>
              Gloves Tracking <img src={images.arrowIcon} />
              {tabTitle ? "Machine Status" : "Analytics"}
            </span>
          </Link>
        )}

        <div className="header-btn-group">
          {/* <button
            className={`page-header-btn ${machinStatus ? "filled" : ""}`}
            // onClick={handleMachinData}
          >
            Machine Status
          </button>
          <button
            className={`page-header-btn ${analytics ? "filled" : ""}`}
            // onClick={handleAnalytics}
          >
            Analytics
          </button> */}
          <button
            className="page-header-btn mobile-filter-btn"
            onClick={handleFilter}
          >
            <FilterAltIcon /> Filter
          </button>
          {/* <button className="page-header-btn">
            <img src={ExcelIcon} alt="" />
          </button> */}
        </div>
      </div>

      <div
        onClick={closeFilter}
        className={`filter-overlay ${
          mobileFilter ? "mobile-d-none" : "mobile-d-flex"
        }`}
      ></div>
      <div
        className={`header-filter-group ${
          mobileFilter ? " mobile-d-none" : "mobile-d-flex"
        } ${glovesTable ? "d-flex" : "d-none"}`}
      >
        <div className="filter-title">
          Filter <CloseIcon onClick={closeFilter} />
        </div>

        <div className="filter-option-group">
          <FormGroup className="filter-checkbox-group">
            <FormControlLabel
              control={
                <Checkbox
                  name="upiPrinting"
                  className="filter-checkbox"
                  onChange={handleUpiPrinting}
                  checked={uidPrinting}
                  value={uidPrinting}
                />
              }
              label="UID Printing"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="visualInspection"
                  className="filter-checkbox"
                  onChange={handleVisualInspection}
                  value={visualInspection}
                  checked={visualInspection}
                />
              }
              label="Visual Inspection"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="electricTest"
                  className="filter-checkbox"
                  onChange={handleElectricTest}
                  value={electricTest}
                  checked={electricTest}
                />
              }
              label="Electric Test"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="finalVisualInspection"
                  className="filter-checkbox"
                  onChange={handleFinalVisual}
                  value={finalVisualInspection}
                  checked={finalVisualInspection}
                />
              }
              label="Final Visual Inspection"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="qrPrinting"
                  className="filter-checkbox"
                  onChange={handleQrPrinting}
                  value={qrPrinting}
                  checked={qrPrinting}
                />
              }
              label="QR Printing"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="paring"
                  className="filter-checkbox"
                  onChange={handlePairing}
                  value={pairing}
                  checked={pairing}
                />
              }
              label="Pairing"
            />

            <FormControlLabel
              control={<Checkbox name="dispatch" className="filter-checkbox" />}
              label="Dispatch"
            />
          </FormGroup>
          <Divider orientation="vertical" className="filter-divider" />
          <FormGroup className="filter-checkbox-group">
            <FormControlLabel
              className="filter-checkbox-passed"
              control={
                <Checkbox
                  name="passed"
                  className="filter-checkbox-passed"
                  onChange={() => handleGreenCheckbox()}
                  checked={greenCheck}
                />
              }
              label={`${mobileFilter ? "" : "Passed"}`}
            />
            <FormControlLabel
              className="filter-checkbox-rejected"
              control={
                <Checkbox
                  name="rejected"
                  className="filter-checkbox-rejected"
                  onChange={() => handleRedCheckbox()}
                  checked={redCheck}
                />
              }
              label={`${mobileFilter ? "" : "Rejected"}`}
            />
            <FormControlLabel
              className="filter-checkbox-pending"
              control={
                <Checkbox
                  name="pending"
                  className="filter-checkbox-pending"
                  onChange={() => handleBlackCheckbox()}
                  checked={blackCheck}
                />
              }
              label={`${mobileFilter ? "" : "Pending"}`}
            />
          </FormGroup>
          <Divider orientation="vertical" className="filter-divider" />
        </div>

        <div className="filter-btn-group">
          <div className="clearAllBtn" onClick={handleClearClick}>
            Clear All
          </div>
          <div onClick={handleExpandClick}>
            <button
              className={`page-header-btn ${mobileFilter ? "" : "filled"}`}
            >
              <FilterAltIcon className={`${mobileFilter ? "" : "d-none"}`} />{" "}
              {mobileFilter ? "Filter" : "Apply"}
            </button>
          </div>
        </div>
      </div>

      <div className={`${glovesTable ? "d-block" : "d-none"}`}>
        <div className="table-responsive">
          <Table
            aria-label="Dipping parameter"
            className="glovestracking-table"
          >
            <TableHead classes={{ root: classes.thead }}>
              <TableRow>
                {userPermission.find(
                  (permission) => permission.module === "Gloves Tracking"
                ).is_editor == true &&
                userPermission.find(
                  (permission) => permission.module === "Gloves Tracking"
                ).is_viewer == true ? (
                  <TableCell colSpan={2}>
                    <div className="d-flex">
                      <div>
                        <Checkbox
                          onClick={(event) =>
                            handleSelectAllClick(event, batch.batchid)
                          }
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
                <TableCell>B.No</TableCell>
                <TableCell>UID</TableCell>
                <TableCell>LOT No</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Size</TableCell>
                <TableCell colSpan={2}>SC/RE</TableCell>
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
              {batch
                ? stableSort(
                    batch.results,
                    getComparator(order, orderBy),
                    searchUIDData,
                    searchUID
                  ).map((row) => {
                    const isItemSelected = isSelected(row.batchid);

                    const labelId = `enhanced-table-checkbox-${row.batchid}`;
                    const isExpanded = expandedRowIds.some(
                      (element) => element === row.batchid
                    );

                    const printButton = async () => {
                      setSendingId(true);
                      const params = {
                        batch_id: row.batchid,
                      };
                      setSendingId(true);
                      try {
                        const resp = await print(params);
                        // var resp = true;
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

                      const printQuery = {
                        dimensions: [
                          "HomeBatch.isPrinted",
                          "HomeBatch.inPrinting",
                          "HomeBatch.batchType",
                        ],
                        order: {
                          "HomeBatch.isPrinted": "asc",
                        },
                        filters: [
                          {
                            member: "HomeBatch.batchType",
                            operator: "equals",
                            values: [row.batch_type],
                          },
                        ],
                      };

                      // Fetch the initial data
                      const print1 = await cubejsApi.load(printQuery);
                      const isPrinted =
                        print1.loadResponses[0].data[0]["HomeBatch.isPrinted"];
                      if (isPrinted === true) {
                        setSendingId(false);
                        setBtnDisabled(!btnDisabled);
                        return;
                      }

                      const printSubscription = await cubejsApi.subscribe(
                        printQuery,
                        {},
                        (error, result) => {
                          if (error) {
                            console.error("Subscription error:", error);
                          } else {
                            const isPrinted =
                              result.loadResponses[0].data[0][
                                "HomeBatch.isPrinted"
                              ];
                            if (isPrinted === true) {
                              setSendingId(false);
                              setBtnDisabled(!btnDisabled);
                              unsubscribe();
                            }
                          }
                        }
                      );

                      const unsubscribe = () => {
                        printSubscription.unsubscribe();
                      };
                    };

                    return (
                      <Expanded
                        row={row}
                        printingData={printingData}
                        isItemSelected={isItemSelected}
                        label={labelId}
                        ButtonPress={printButton}
                        handleVisualModalOpen={handleVisualModalOpen}
                        handleClickedOpen={handleClickedOpen}
                        handleFinalVisualModal={handleFinalVisualModal}
                        handleClick={handleClick}
                        uidPrintGreenCheck={uidPrintGreenCheck}
                        uidPrinting={uidPrinting}
                        handleUpiPrinting={handleUpiPrinting}
                        uidPrintRedCheck={uidPrintRedCheck}
                        btnDisabled={btnDisabled}
                        uidPrintBlackCheck={uidPrintBlackCheck}
                        visualGreenCheck={visualGreenCheck}
                        visualRedCheck={visualRedCheck}
                        visualBlackCheck={visualBlackCheck}
                        visualInspection={visualInspection}
                        electricTest={electricTest}
                        electricGreenCheck={electricGreenCheck}
                        electricRedCheck={electricRedCheck}
                        electricBlackCheck={electricBlackCheck}
                        finalVisualInspection={finalVisualInspection}
                        qrPrinting={qrPrinting}
                        pairing={pairing}
                        finalVisualGreenCheck={finalVisualGreenCheck}
                        finalVisualBlackCheck={finalVisualBlackCheck}
                        finalVisualRedCheck={finalVisualRedCheck}
                        greenCheck={greenCheck}
                        redCheck={redCheck}
                        blackCheck={blackCheck}
                        page={page}
                        filterData={filterData}
                        setFilterData={setFilterData}
                        userPermission={userPermission}
                        handleToastMsg={handleToastMsg}
                      />
                    );
                  })
                : null}

              {isLoading && <Loader />}
            </TableBody>
          </Table>
        </div>
        {sendingID && (
          <>
            <div className="sendingData">
              <Card className="card-printer">
                <CardContent>
                  <h4 className="card-content">
                    <b>Sending UID To Printer</b>
                  </h4>
                </CardContent>
              </Card>
            </div>
            <div className="sending-uid-overlay" on></div>
          </>
        )}
        <TablePagination
          className="table-pagination"
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          // count={batch ? batch.count : null}
          Pagecount
          count={Pagecount ? Pagecount : batch ? batch.count : null}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      <div className="table-footer"></div>
      <div className={`${analytics ? "d-block" : "d-none"}`}>
        <div className="d-flex justify-content-between align-items-center pb-3">
          <h4 style={{ textAlign: "left", marginBottom: "5px" }}>
            <b>Pending Status</b>
          </h4>
          <Box sx={{ minWidth: 200 }} style={{ marginBottom: "0" }}>
            <FormControl variant="outlined" className="form-input select-menu">
              <InputLabel id="select" className="select-menu-label">
                Class Wise
              </InputLabel>
              <Select
                labelId="select"
                value={selectedClass}
                onChange={(event) => setSelectClass(event.target.value)}
                label="Class Wise"
                className="text select-menu-inside"
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {classes.map((event) => (
                  <MenuItem value={event.class_id}>{event.class_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="individual-data-wrap">
          <div className="single-data-list">
            <Card className="card">
              <div className="header">UID PRINTING</div>
              <div className="main-body">
                <h1 className="count">280</h1>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card">
              <div className="header">VISUAL INSPECTION</div>
              <div className="main-body">
                <h1 className="count">240</h1>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card">
              <div className="header">ELECTRICAL TEST</div>
              <div className="main-body">
                <h1 className="count">230</h1>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card">
              <div className="header">FINAL VISUAL INSPECTION</div>
              <div className="main-body">
                <h1 className="count">120</h1>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card">
              <div className="header">QR PRINTING</div>
              <div className="main-body">
                <h1 className="count">230</h1>
              </div>
            </Card>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center pt-3 pb-3 shift">
          <h4 style={{ textAlign: "left", marginBottom: 0 }}>
            <b>Shift Performance</b>
          </h4>
          <div className="d-flex shift-status" style={{ gap: 10 }}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="datepicker"
            />
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="datepicker"
            />
            <Box sx={{ minWidth: 200 }} style={{ marginBottom: "0" }}>
              <FormControl
                variant="outlined"
                className="form-input select-menu"
              >
                <InputLabel id="select" className="select-menu-label">
                  Class Wise
                </InputLabel>
                <Select
                  labelId="select"
                  value={selectedClass}
                  onChange={(event) => setSelectClass(event.target.value)}
                  label="Class Wise"
                  className="text select-menu-inside"
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {classes.map((event) => (
                    <MenuItem value={event.class_id}>
                      {event.class_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <div className="individual-data-wrap">
          <div className="single-data-list">
            <Card className="card">
              <div className="header">UID PRINTING</div>
              <div className="main-body has-chart">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data}>
                    <XAxis dataKey="name" axisLine={false} />
                    <Bar dataKey="uv" fill="#001323" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card">
              <div className="header">VISUAL INSPECTION</div>
              <div className="main-body has-chart">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data}>
                    <XAxis dataKey="name" axisLine={false} />
                    <Bar dataKey="uv" fill="#001323" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card">
              <div className="header">ELECTRICAL TEST</div>
              <div className="main-body has-chart">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data}>
                    <XAxis dataKey="name" axisLine={false} />
                    <Bar dataKey="uv" fill="#001323" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card">
              <div className="header">FINAL VISUAL INSPECTION</div>
              <div className="main-body has-chart">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data}>
                    <XAxis dataKey="name" axisLine={false} />
                    <Bar dataKey="uv" fill="#001323" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card">
              <div className="header">QR PRINTING</div>
              <div className="main-body has-chart">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data}>
                    <XAxis dataKey="name" axisLine={false} />
                    <Bar dataKey="uv" fill="#001323" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className={`${machinStatus ? "d-block" : "d-none"}`}>
        <div className="d-flex justify-content-between align-items-center pb-3">
          <h4 style={{ textAlign: "left", marginBottom: "5px" }}>
            <b>Real Time Status</b>
          </h4>
        </div>
        <div className="individual-data-wrap">
          <div className="single-data-list">
            <Card className="card machin-status-card">
              <div className="header">UID PRINTING</div>
              <div className="main-body fixed-height">
                <div className="status-list">
                  <div className="status-item">
                    <p className="status-name">Conveyor System</p>
                    <div className="status-sign green">Normal</div>
                  </div>
                  <div className="status-item">
                    <p className="status-name">UID Printer</p>
                    <div className="status-sign red">Alarm</div>
                  </div>
                  <div className="status-item">
                    <p className="status-name">Vision System</p>
                    <div className="status-sign green">Normal</div>
                  </div>
                  <div className="status-item">
                    <p className="status-name">Communication</p>
                    <div className="status-sign green">Normal</div>
                  </div>
                  <div className="status-item">
                    <p className="status-name">Cloud Connectivity</p>
                    <div className="status-sign red">Alarm</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card machin-status-card">
              <div className="header">VISUAL INSPECTION</div>
              <div className="main-body fixed-height">
                <div className="status-list">
                  <div className="status-item">
                    <p className="status-name">Vision System</p>
                    <div className="status-sign green">Normal</div>
                  </div>
                  <div className="status-item">
                    <p className="status-name">Communication</p>
                    <div className="status-sign green">Normal</div>
                  </div>
                  <div className="status-item">
                    <p className="status-name">Cloud Connectivity</p>
                    <div className="status-sign red">Alarm</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card machin-status-card">
              <div className="header">ELECTRICAL TEST</div>
              <div className="main-body fixed-height">
                <div className="status-list">
                  <div className="status-item">
                    <p className="status-name">ELEC. Machine Comm.</p>
                    <div className="status-sign red">Alarm</div>
                  </div>
                  <div className="status-item">
                    <p className="status-name">Vision System</p>
                    <div className="status-sign green">Normal</div>
                  </div>
                  <div className="status-item">
                    <p className="status-name">Communication</p>
                    <div className="status-sign green">Normal</div>
                  </div>
                  <div className="status-item">
                    <p className="status-name">Cloud Connectivity</p>
                    <div className="status-sign red">Alarm</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card machin-status-card">
              <div className="header">FINAL VISUAL INSPECTION</div>
              <div className="main-body fixed-height">
                <div className="status-list">
                  <div className="status-item">
                    <p className="status-name">Vision System</p>
                    <div className="status-sign green">Normal</div>
                  </div>
                  <div className="status-item">
                    <p className="status-name">Communication</p>
                    <div className="status-sign green">Normal</div>
                  </div>
                  <div className="status-item">
                    <p className="status-name">Cloud Connectivity</p>
                    <div className="status-sign red">Alarm</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card machin-status-card">
              <div className="header">QR PRINTING</div>
              <div className="main-body fixed-height">
                <div className="status-list">
                  <div className="status-item">
                    <p className="status-name">Conveyor System</p>
                    <div className="status-sign green">Normal</div>
                  </div>
                  <div className="status-item">
                    <p className="status-name">QR Printer</p>
                    <div className="status-sign red">Alarm</div>
                  </div>
                  <div className="status-item">
                    <p className="status-name">Vision System</p>
                    <div className="status-sign green">Normal</div>
                  </div>
                  <div className="status-item">
                    <p className="status-name">Communication</p>
                    <div className="status-sign green">Normal</div>
                  </div>
                  <div className="status-item">
                    <p className="status-name">Cloud Connectivity</p>
                    <div className="status-sign red">Alarm</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center pt-3 pb-3 Run-Time">
          <h4 style={{ textAlign: "left", marginBottom: 0 }}>
            <b>Run Time Analysis</b>
          </h4>
          <div className="d-flex Run-Time-Status" style={{ gap: 10 }}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="date"
            />
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
        </div>
        <div className="individual-data-wrap">
          <div className="single-data-list">
            <Card className="card machin-status-card">
              <div className="header">UID PRINTING</div>
              <div className="fixed-height">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={data1}
                      stroke="#1db475"
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data1.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ margin: "0px 12px" }}
              >
                <p>
                  <b>Up Time :</b>
                </p>
                <p>MM : DD : HH</p>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ margin: "0px 12px" }}
              >
                <p>
                  <b>Down Time :</b>
                </p>
                <p>MM : DD : HH</p>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card machin-status-card">
              <div className="header">VISUAL INSPECTION</div>
              <div className="fixed-height">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={data1}
                      stroke="#1db475"
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data1.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ margin: "0px 12px" }}
              >
                <p>
                  <b>Up Time :</b>
                </p>
                <p>MM : DD : HH</p>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ margin: "0px 12px" }}
              >
                <p>
                  <b>Down Time :</b>
                </p>
                <p>MM : DD : HH</p>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card machin-status-card">
              <div className="header">ELECTRICAL TEST</div>
              <div className="fixed-height">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={data1}
                      stroke="#1db475"
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data1.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ margin: "0px 12px" }}
              >
                <p>
                  <b>Up Time :</b>
                </p>
                <p>MM : DD : HH</p>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ margin: "0px 12px" }}
              >
                <p>
                  <b>Down Time :</b>
                </p>
                <p>MM : DD : HH</p>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card machin-status-card">
              <div className="header">FINAL VISUAL INSPECTION</div>
              <div className="fixed-height">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={data1}
                      stroke="#1db475"
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data1.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ margin: "0px 12px 0px 12px" }}
              >
                <p>
                  <b>Up Time :</b>
                </p>
                <p>MM : DD : HH</p>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ margin: "0px 12px 0px 12px" }}
              >
                <p>
                  <b>Down Time :</b>
                </p>
                <p>MM : DD : HH</p>
              </div>
            </Card>
          </div>
          <div className="single-data-list">
            <Card className="card machin-status-card">
              <div className="header">QR PRINTING</div>
              <div className="fixed-height">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={data1}
                      stroke="#1db475"
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data1.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ margin: "0px 12px 0px 12px" }}
              >
                <p>
                  <b>Up Time :</b>
                </p>
                <p>MM : DD : HH</p>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ margin: "0px 12px 0px 12px" }}
              >
                <p>
                  <b>Down Time :</b>
                </p>
                <p>MM : DD : HH</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {openModal && (
        <ElectricTestModal
          closeModal={setOpenModal}
          uidType={uidType}
          electric={electric}
          rorl={rorl}
          thicknessvalue={thicknessvalue}
        />
      )}

      {openVisualModal && (
        <VisualInspectionModal
          closeModal={setOpenVisualModal}
          uidType={uidType}
          visual={visual}
        />
      )}
      {finalVisualModal && (
        <FinalVisualInspectionModal
          closeModal={setFinalVisualModal}
          uidType={uidType}
          finalVisual={finalVisual}
        />
      )}

      <div className="d-flex justify-content-between aborted">
        <div className="d-flex align-items-center">
          <div
            style={{ color: "#00AB66", marginRight: "25px" }}
            className="d-flex align-items-center"
          >
            <span className="passed-btn m-1"></span>Passed
          </div>
          <div
            style={{ color: "#E31E32", marginRight: "25px" }}
            className="d-flex align-items-center"
          >
            <span className="rejected-btn1 m-1"></span>Rejected
          </div>
          <div
            style={{ color: "#333333" }}
            className="d-flex align-items-center"
          >
            <span className="pending-btn m-1"></span>Pending
          </div>
        </div>
        <p style={{ margin: 0, marginBottom: 0 }} className="Hikar-title">
          Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
          Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default GlovesTracking;
