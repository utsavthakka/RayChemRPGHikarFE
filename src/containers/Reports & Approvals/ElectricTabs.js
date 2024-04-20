import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import TableBody from "@mui/material/TableBody";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import "../Reports & Approvals/Reports.css";
import {
  exportElectricExcel,
  getElectricRevision,
  getReport,
  getelectricdata,
  updateReportStatus,
} from "./services";
import Loader from "../../components/Loader/Loader";
import {
  fetchElectricBatchData,
  fetchgetelectricdata,
} from "../DippingParameters/batchSlice";
import ElectricTestReport from "./ElectricTestReport";
import { filterUid } from "../DippingParameters/Services";
import { images } from "../../config/images";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExcelIcon from "../../assets/images/excel-icon.svg";
import { ToastContainer, toast } from "react-toastify";
import ShiftDrpdown from "../../common/Drpdown/Shift";
import RorLdropdown from "../../common/Drpdown/RorL";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
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
  const [batchType, setBatchType] = useState();
  const [electricTestTable, setElectricTestTable] = useState(true);
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [electricStatus, setElectricStatus] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [electricRow, setElectricRow] = useState("");
  const [electricReportData, setElectricReportData] = useState([]);

  const { row, selectRorL } = props;
  const { userPermission } = useSelector((state) => state.userState);

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
    RorL: "",
    Test_Result: "",
    electric_test_count: "",
  };
  const [searchText, setSearchText] = useState(initiallValue);
  const [searchUID, setSearchUID] = useState("");
  const [searchUIDData, setSearchUIDData] = useState([]);
  const [electricTestData, setElectricTestData] = useState([]);
  const dispatch = useDispatch();

  const { startDateReFormat, endDateReFormat } = props;
  const [startDateTime, setstartDateTime] = useState();
  const [endDateTime, setendDateTime] = useState();

  useEffect(() => {
    console.log("startDateReFormat in Electric test", startDateReFormat);
    console.log(
      "endDateReFormat in Electric test",
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
      props.ElectricSearchsendtoPerent(searchText);
    }
  }, [searchText]);

  useEffect(() => {
    const params = {
      page: page,
      rowsPerPage: rowsPerPage,
      searchText: searchText,
      selectRorL: selectRorL,
    };
    // handleElectricData(params);
    handleSearchData(searchText);
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
      handleElectricData(params);
      handleSearchData(searchText);
      // getData();
      return () => {};
    }
  }, [startDateTime, endDateTime, page, rowsPerPage, selectRorL, searchText]);

  const handleElectricData = async (search) => {
    if (searchText === "") {
      const resp = await getelectricdata(search);
      setElectricTestData(resp.data);
    } else {
      const resp = await getelectricdata(search);
      setElectricTestData(resp.data);
    }
  };

  // const { getelectricdata } = useSelector((state) => state.batchState);

  // useEffect(() => {
  //   handleElectricData(searchText);
  // }, [page, rowsPerPage, searchText, selectRorL]);

  // const handleElectricData = (searchText) => {
  //   const params = {
  //     page: page,
  //     rowsPerPage: rowsPerPage,
  //     searchText: searchText,
  //     selectRorL: selectRorL,
  //   };
  //   dispatch(fetchgetelectricdata(params));
  // };

  const closeFilter = () => {
    setMobileFilter(!mobileFilter);
  };

  const handleApprovedStatus = async (row) => {
    // setOpenModal(true);
    const params = {
      uid_type: row.uid_type,
    };
    try {
      const resp = await getElectricRevision(params);
      if (resp.status == 200 || resp.status == 201) {
        if (resp.data.payload.length) {
          setOpenModal(true);
          setElectricRow(row);
        }
        setElectricReportData(resp.data.payload);
      }
    } catch (error) {
      console.log("handleSubmit", error);
    }

    setElectricTestTable(false);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = electricTestData.results.map((n) => n.uid_type);
      setSelected(newSelected);
      props.handleElectricTestExcel(newSelected);
      return;
    }
    setSelected([]);
    props.handleElectricTestExcel([]);
  };

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

  const handleCloseModal = () => {
    setOpenModal(false);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    props.handleElectricTestExcel(newSelected);
    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const checkData = electricStatus.find(
    (f) => f.electric_test_details !== null
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
      <ToastContainer />

      <div
        onClick={closeFilter}
        className={`filter-overlay ${
          mobileFilter ? "mobile-d-none" : "mobile-d-flex"
        }`}
      ></div>
      {props.electricTestTable && (
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
                    )?.is_editor === true &&
                    userPermission.find(
                      (permission) =>
                        permission.module === "Reports & Approvals"
                    )?.is_viewer === true ? (
                      <TableCell colSpan={2}>
                        <div className="d-flex">
                          <div>
                            <Checkbox
                              onClick={(event) =>
                                handleSelectAllClick(
                                  event,
                                  electricTestData.results.uid_type
                                )
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
                        name="electric_test_count"
                        value={searchText.electric_test_count}
                        onChange={handleSearchData}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="reports-table">
                  {electricTestData?.results?.map((row, index) => {
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
                              onClick={(event) => handleToastMsg()}
                              checked={false}
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
                          {row.tested_date
                            ? dayjs(row.tested_date).format("YYYY-MM-DD")
                            : "-"}
                        </TableCell>

                        <TableCell>
                          {row.tested_date
                            ? dayjs(row.tested_date).format("HH:mm:ss")
                            : "-"}
                        </TableCell>
                        <TableCell>{row.electric_test_tested_shift}</TableCell>
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
                                ? row.electric_test != null
                                  ? row.electric_test == true
                                    ? "pass"
                                    : "falied"
                                  : "status-icon-disabled"
                                : null
                            }`}
                          >
                            {row
                              ? row.electric_test != null
                                ? row.electric_test == true
                                  ? "P"
                                  : "F"
                                : "status-icon-disabled"
                              : null}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="d-flex justify-content-between">
                            <div style={{ marginTop: "10px" }}>
                              {row.electric_test_count}
                            </div>

                            <button
                              className="approvalstatus"
                              onClick={() => handleApprovedStatus(row)}
                            >
                              <img src={images.viewIcon} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {openModal && (
                    <>
                      <div className="ElectricTestReport-Modal">
                        <div className="modal-header">
                          <div className="electricReport-Title">
                            Electric Test Reports
                          </div>
                          <div onClick={() => handleCloseModal()}>
                            <CloseIcon />
                          </div>
                        </div>
                        <div>
                          <div className="header-approval-data Electric-data">
                            <Grid container>
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
                                        Mfg Date:
                                      </TableCell>
                                      <TableCell>
                                        {dayjs(
                                          electricRow
                                            ? electricRow.created_at
                                            : ""
                                        ).format("YYYY-MM-DD")}
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
                                      <TableCell sx={{ fontWeight: "bold" }}>
                                        Batch No:
                                      </TableCell>
                                      <TableCell>
                                        {electricRow
                                          ? electricRow.batch_id_type
                                          : ""}
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
                                      <TableCell sx={{ fontWeight: "bold" }}>
                                        Lot No:
                                      </TableCell>
                                      <TableCell>
                                        {electricRow
                                          ? electricRow.lot_number
                                          : ""}
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
                                      <TableCell sx={{ fontWeight: "bold" }}>
                                        Thickness:
                                      </TableCell>
                                      <TableCell>
                                        {electricRow
                                          ? electricRow.thickness
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
                                      <TableCell sx={{ fontWeight: "bold" }}>
                                        Class:
                                      </TableCell>
                                      <TableCell>
                                        {electricRow
                                          ? electricRow.class_name
                                          : ""}
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
                                      <TableCell sx={{ fontWeight: "bold" }}>
                                        Size:
                                      </TableCell>
                                      <TableCell>
                                        {electricRow ? electricRow.size : ""}
                                      </TableCell>
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
                            >
                              <Table
                                aria-label="reports"
                                className="electric-test-table"
                              >
                                <TableHead
                                  style={{
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 9,
                                  }}
                                >
                                  <TableRow>
                                    <TableCell rowSpan={2}>UID</TableCell>
                                    <TableCell
                                      colSpan={4}
                                      className="text-center"
                                    >
                                      Machine Setting
                                    </TableCell>
                                    <TableCell
                                      colSpan={5}
                                      className="text-center"
                                    >
                                      Test Data
                                    </TableCell>
                                    <TableCell rowSpan={2}>Test Date</TableCell>
                                    <TableCell rowSpan={2}>Shift</TableCell>
                                    <TableCell rowSpan={2}>
                                      Inspector Name
                                    </TableCell>
                                    <TableCell rowSpan={2}>
                                      Test Result
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>KV</TableCell>
                                    <TableCell>Timer</TableCell>
                                    <TableCell>Max leak MA</TableCell>
                                    <TableCell>STD</TableCell>
                                    <TableCell>Temp</TableCell>
                                    <TableCell>Humidity</TableCell>
                                    <TableCell>Conductivity</TableCell>
                                    <TableCell>KV</TableCell>
                                    <TableCell>Peak value</TableCell>
                                  </TableRow>
                                </TableHead>

                                <TableBody>
                                  {electricReportData.map((test) => (
                                    <>
                                      <TableRow className="electricTest-table">
                                        <TableCell>{test.uid_type}</TableCell>
                                        <TableCell>
                                          {test.machine_setting_kv}
                                        </TableCell>
                                        <TableCell>{test.timer}</TableCell>
                                        <TableCell>
                                          {test.max_leak_ma}
                                        </TableCell>
                                        <TableCell>{test.std}</TableCell>
                                        <TableCell>{test.temp}</TableCell>
                                        <TableCell>{test.humidity}</TableCell>
                                        <TableCell>
                                          {test.conductivity}
                                        </TableCell>
                                        <TableCell>
                                          {test.test_data_kv}
                                        </TableCell>
                                        <TableCell>{test.peak_value}</TableCell>
                                        <TableCell>
                                          {dayjs(test.modified_at).format(
                                            "YYYY-MM-DD"
                                          )}
                                        </TableCell>
                                        <TableCell>{test.shift}</TableCell>
                                        <TableCell>
                                          {test.inspector_name}
                                        </TableCell>
                                        <TableCell>
                                          <div
                                            className={`status-icon ${
                                              test
                                                ? test.is_passed
                                                  ? test.is_passed
                                                    ? "pass"
                                                    : "falied"
                                                  : "falied"
                                                : null
                                            }`}
                                          >
                                            {test
                                              ? test.is_passed
                                                ? test.is_passed
                                                  ? "P"
                                                  : "F"
                                                : "F"
                                              : null}
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    </>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>

                            {/* <Box className="footer-btn-section">
                              <button className="download-button">
                                <img src={images.downloadPdf} />
                                <span>Download</span>
                              </button>
                            </Box> */}
                          </div>
                        </div>
                        <div className="d-flex justify-content-end aborted">
                          <p style={{ margin: 0, marginBottom: 0 }}>
                            Powered by <b>Hikar&#174;Technomation</b> Private
                            Limited &#169; All Rights Reserved
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </TableBody>
              </Table>
              {isLoading && <Loader />}
            </div>

            <TablePagination
              className="table-pagination pagination-div "
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={electricTestData ? electricTestData.count : 0}
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
    </>
  );
}

export default Reports;
