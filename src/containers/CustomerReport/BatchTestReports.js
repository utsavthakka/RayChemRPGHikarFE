import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getBatchTestAutoPullData,
  getBatchTestReport,
} from "../DippingParameters/batchSlice";
import { pdfjs } from "react-pdf";
import { getClasses, getSizes } from "../AddBatch/services";
import {
  getcuff,
  getPairingGlovesType,
  getParingLength,
} from "../GlovesPairing/services";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { images } from "../../config/images";

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

function stableSort(array, comparator) {
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
function BatchTestReport(props) {
  // Initialize state variables
  const [testReport, setTestReport] = useState(true);
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setLoading] = useState(false);
  const [fileUrl, setFileurl] = useState(null);
  const [viewReport, setViewReport] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [classes, setClasses] = useState([]);
  const [size, setSize] = useState([]);
  const [selectedClass, setSelectClass] = useState();
  const [selectSize, setSelectSize] = useState();
  const [length, setLength] = useState([]);
  const [selectLength, setSelectLength] = useState();
  const [cuff, setCuff] = useState([]);
  const [selectCuff, setSelectCuff] = useState();
  const [glove, setGlove] = useState([]);
  const [selectGlove, setSelectGlove] = useState();
  // Extract the 'getBatchTest' function from the 'batchState' slice of the Redux store using 'useSelector' hook
  const { getBatchTest } = useSelector((state) => state.batchState);
  const { userPermission } = useSelector((state) => state.userState);

  // Use Navigate hook to change the route
  const navigate = useNavigate();

  // fetching data from an API
  useEffect(() => {
    getData();
    return () => {};
  }, []);

  // Define an async function to fetch data from API and set the state variables
  const getData = async () => {
    try {
      // Call API to get classes and set the state variable for classes
      const resp = await getClasses();
      setClasses(resp.data.payload);

      // Call API to get sizes and set the state variable for size
      const resp1 = await getSizes();
      setSize(resp1.data.payload);

      // Call API to get ParingLength and set the state variable for ParingLength
      const resp2 = await getParingLength();
      setLength(resp2.data);

      // Call API to get cuff types and set the state variable for cuff
      const resp3 = await getcuff();
      setCuff(resp3.data);

      // Call API to get PairingGlovesType and set the state variable for PairingGlovesType
      const resp4 = await getPairingGlovesType();
      setGlove(resp4.data);
    } catch (error) {
      console.log(error);
    }
  };

  //open popup
  const handleAddReport = () => {
    setOpenPopup(true);
  };

  //close popup
  const handleCancle = () => {
    setOpenPopup(false);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const params = {
      types_of_gloves: selectGlove,
      // length: selectLength,
      // cuff: selectCuff,
      class_name: selectedClass,
      // size: selectSize,
    };
    // Dispatches an action to fetch test batch data and updates robot status based on the results.
    const updateRobotStatusAction = await dispatch(
      getBatchTestAutoPullData(params)
    );

    // If the action is fulfilled, it navigates to the certificate page.
    if (getBatchTestAutoPullData.fulfilled.match(updateRobotStatusAction)) {
      setLoading(false);
      navigate("/certificate");
    }
    // If the action is rejected, it displays an error toast asking to select all fields
    else if (getBatchTestAutoPullData.rejected.match(updateRobotStatusAction)) {
      setLoading(false);
      toast.error("Please Select All Fields", {
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

  const dispatch = useDispatch();

  // Fetch batch test report data once after component mount
  useEffect(() => {
    const searchParams = {
      page: page,
      rowsPerPage: rowsPerPage
    }
    dispatch(getBatchTestReport(searchParams));
  }, [page,rowsPerPage]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = getBatchTest.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getBatchTest.length) : 0;

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewReport = (row) => {
    props.handleViewBatchReport();
    setViewReport(false);
    setTestReport(false);
    setFileurl(row.report);
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

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const url = fileUrl;
  return (
    <>
      <ToastContainer />
      {props.testReport ? (
        <div>
           {userPermission.find(
                        (permission) => permission.module === "Customer Reports"
                      ).is_editor == true && userPermission.find(
          (permission) => permission.module === "Customer Reports"
        ) .is_viewer == true ? 
          <div>
            <button className="add-report" onClick={() => handleAddReport()}>
              +Add Report
            </button>
          </div>
          :
          <div>
          <button className="add-report" onClick={() => handleToastMsg()}>
            +Add Report
          </button>
        </div>
          }

          {openPopup && (
            <>
              <div className="sendingdataaaa-report">
                <Card className="card-reportdata">
                  <CardContent className="p-0">
                    <div
                      className="d-flex justify-content-end"
                      onClick={handleCancle}
                    >
                      <img src={images.closeIcon} />
                    </div>
                    <div>
                      <h4 className="sendingdata-title">
                        <b>Certificate Of Accordance</b>
                      </h4>
                    </div>
                    <div>
                      <h6 className="d-flex m-0">
                        Class{" "}
                        <p style={{ color: "red", marginLeft: "2px" }}> *</p>
                      </h6>
                      <Box component="form" noValidate autoComplete="off">
                        <select
                          className="form-input"
                          onChange={(event) =>
                            setSelectClass(event.target.value)
                          }
                          required
                        >
                          <option value="none" selected disabled hidden>
                            Select Class
                          </option>
                          {classes.map((event) => (
                            <option value={event.class_name}>
                              {event.class_name}
                            </option>
                          ))}
                        </select>
                      </Box>
                    </div>
                    {/* <div>
                      <h6 className="d-flex m-0">
                        Size{" "}
                        <p style={{ color: "red", marginLeft: "2px" }}> *</p>
                      </h6>
                      <Box component="form" noValidate autoComplete="off">
                        <select
                          className="form-input form-input-report"
                          onChange={(event) =>
                            setSelectSize(event.target.value)
                          }
                          required
                        >
                          <option value="none" selected disabled hidden>
                            Select Size
                          </option>
                          {size.map((event) => (
                            <option value={event.size_name}>
                              {event.size_name}
                            </option>
                          ))}
                        </select>
                      </Box>
                    </div>
                    <div>
                      <h6 className="d-flex m-0">
                        Length{" "}
                        <p style={{ color: "red", marginLeft: "2px" }}> *</p>
                      </h6>
                      <Box component="form" noValidate autoComplete="off">
                        <select
                          className="form-input form-input-report"
                          onChange={(event) =>
                            setSelectLength(event.target.value)
                          }
                          required
                        >
                          <option value="none" selected disabled hidden>
                            Select Length
                          </option>
                          {length.map((event) => (
                            <option value={event.length}>{event.length}</option>
                          ))}
                        </select>
                      </Box>
                    </div>
                    <div>
                      <h6 className="d-flex m-0">
                        SC/RE{" "}
                        <p style={{ color: "red", marginLeft: "2px" }}> *</p>
                      </h6>
                      <Box component="form" noValidate autoComplete="off">
                        <select
                          className="form-input form-input-report"
                          onChange={(event) =>
                            setSelectCuff(event.target.value)
                          }
                          required
                        >
                          <option value="none" selected disabled hidden>
                            Select Cuff
                          </option>
                          {cuff.map((event) => (
                            <option value={event.cuff_name}>
                              {event.cuff_name}
                            </option>
                          ))}
                        </select>
                      </Box>
                    </div> */}
                    <div>
                      <h6 className="d-flex m-0">
                        Type Of Glove{" "}
                        <p style={{ color: "red", marginLeft: "2px" }}> *</p>
                      </h6>
                      <Box component="form" noValidate autoComplete="off">
                        <select
                          className="form-input form-input-report"
                          onChange={(event) =>
                            setSelectGlove(event.target.value)
                          }
                          required
                        >
                          <option value="none" selected disabled hidden>
                            Select Type Of Glove
                          </option>
                          {glove.map((event) => (
                            <option value={event.pairing_gloves_type_name}>
                              {event.pairing_gloves_type_name}
                            </option>
                          ))}
                        </select>
                      </Box>

                      <button
                        style={{ width: "160px", marginTop: "10px" }}
                        onClick={() => handleSubmit()}
                      >
                        Proceed
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          <div className="table-responsive pt-2">
            <Table
              aria-label="Dipping parameter"
              className="dipping-parameter-table"
            >
              <TableHead>
                <TableRow>
                {userPermission.find(
                        (permission) => permission.module === "Customer Reports"
                      ).is_editor == true && userPermission.find(
          (permission) => permission.module === "Customer Reports"
        ) .is_viewer == true ? 
                  <TableCell colSpan={2}>
                    <div className="d-flex">
                      <div>
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleSelectAllClick(event)}
                          inputProps={{
                            "aria-label": "select all desserts",
                          }}
                        />
                      </div>
                      <div className="date-checkbox">Class</div>
                    </div>
                  </TableCell>
                  :
                  <TableCell colSpan={2}>
                  <div className="d-flex">
                    <div>
                      <Checkbox
                        color="primary"
                        onClick={() => handleToastMsg()}
                        checked={false}
                      />
                    </div>
                    <div className="date-checkbox">Class</div>
                  </div>
                </TableCell>}
                  <TableCell>Mfg. Date</TableCell>
                  <TableCell>Lot No</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>Cuff</TableCell>
                  <TableCell>Type of Glove</TableCell>
                  <TableCell>View Report</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input type="search" placeholder="Class" name="Date" />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input type="search" placeholder=" Mfg. Date" name="B_No" />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input type="search" placeholder="Lot No" name="UID" />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input type="search" placeholder=" Size" name="Lot_No" />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input type="search" placeholder="length" name="Lot_No" />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input type="search" placeholder="Cuff" name="Lot_No" />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input
                      type="search"
                      placeholder="Type of Glove"
                      name="Class"
                    />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input
                      type="search"
                      placeholder="View Report"
                      name="Size"
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="reports-table">
                {getBatchTest
                  ? stableSort(getBatchTest.results, getComparator(order, orderBy))
                      // .slice(
                      //   page * rowsPerPage,
                      //   page * rowsPerPage + rowsPerPage
                      // )
                      // .filter((row) => {
                      //   if (JSON.stringify() === JSON.stringify()) {
                      //     return row;
                      //   }
                      //   {
                      //     return row;
                      //   }
                      // }
                      // )
                      .map((row) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${row.batchid}`;

                        return (
                          <TableRow className="main-table-reports">
                            <TableCell padding="checkbox" key={row}>
                            {userPermission.find(
                        (permission) => permission.module === "Customer Reports"
                      ).is_editor == true && userPermission.find(
          (permission) => permission.module === "Customer Reports"
        ) .is_viewer == true ? 
                              <Checkbox
                                color="primary"
                                onClick={() => handleClick(row.id)}
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />:
                              <Checkbox
                              color="primary"
                              onClick={() => handleToastMsg()}
                             checked={false}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                              
                              }
                            </TableCell>

                            <TableCell>{row.class_id}</TableCell>

                            <TableCell>
                              {dayjs(row.created_at).format("YYYY-MM-DD")}
                            </TableCell>
                            <TableCell>{row.lot_number}</TableCell>
                            <TableCell>{row.size}</TableCell>
                            <TableCell>{row.length}</TableCell>
                            <TableCell>{row.cuff}</TableCell>
                            <TableCell>{row.gloves_type}</TableCell>
                            <TableCell>
                            {userPermission.find(
                        (permission) => permission.module === "Customer Reports"
                      ).is_editor == true && userPermission.find(
          (permission) => permission.module === "Customer Reports"
        ) .is_viewer == true ? 
                              <button
                                className={
                                  row.report
                                    ? "eyeicon-img"
                                    : "eyeicon-img-disabled"
                                }
                                onClick={() => handleViewReport(row)}
                              >
                                <img src={images.viewIcon} />
                              </button>
                             :
                             <button
                             className={
                               row.report
                                 ? "eyeicon-img"
                                 : "eyeicon-img-disabled"
                             }
                             onClick={() => handleToastMsg()}
                           >
                             <img src={images.viewIcon} />
                           </button>
                             }
                            </TableCell>
                          </TableRow>
                        );
                      }
                      )
                  : null}
              </TableBody>
            </Table>
            {isLoading && <Loader />}
          </div>

          <TablePagination
            className="table-pagination"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={getBatchTest ? getBatchTest.count : null}
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
      ) : (
        <>
          <div>
            <iframe src={url} height="1000px" width="100%" />
          </div>
          <div className="d-flex justify-content-end aborted">
            <p style={{ margin: 0, marginBottom: 0 }}>
              Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169;
              All Rights Reserved
            </p>
          </div>
        </>
      )}
    </>
  );
}
export default BatchTestReport;
