import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { fetchpairedBatch } from "../DippingParameters/batchSlice";
import { makeStyles } from "@material-ui/core/styles";
// import { visuallyHidden } from '@mui/utils';
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import { images } from "../../config/images";
import { ToastContainer, toast } from "react-toastify";

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

export const DC = (props) => {
  // Initialize state variables
  const [DC, setDC] = useState(true);
  const [RTR, setRTR] = useState(true);
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setLoading] = useState(false);
  const [fileUrl, setFileurl] = useState(null);
  const initiallValue = {
    Date: "",
    UID: "",
    Class: "",
    Size: "",
    Scre: "",
    LotNumber: "",
    Length: "",
    GlovesType: "",
    Order_No: "",
  };
  const [searchText, setSearchText] = useState(initiallValue);
  const dispatch = useDispatch();

  //pairedData stored in redux
  const { pairedData } = useSelector((state) => state.batchState);
  const { userPermission } = useSelector((state) => state.userState);

  // fetching data from an API
  useEffect(
    (searchParams) => {
      getpairedBatch(searchParams);
    },
    [page, rowsPerPage]
  );

  useEffect(
    (searchParams) => {
      if (searchText) {
        setPage(0);
        getpairedBatch(searchParams);
      }
    },
    [searchText]
  );

  //fetchpairedBatch data dispatch from an API
  const getpairedBatch = () => {
    const searchParams = {
      search: searchText,
      page: page,
      rowsPerPage: rowsPerPage,
    };
    dispatch(fetchpairedBatch(searchParams));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = pairedData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pairedData.length) : 0;

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
    console.log("newPage", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEyeClick = (row) => {
    setLoading(false);
    props.handleDcClick();
    setDC(false);
    setRTR(false);
    setFileurl(row.declaration_of_conformity_report);
  };

  const handleRTRTabClick = (row) => {
    props.handleRTRClick();
    setRTR(false);
    setDC(false);
    setFileurl(row.routine_test_report);
  };

  const handleSearchData = async (e) => {
    const { name, value } = e.target;
    setSearchText({ ...searchText, [name]: value });
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
      {props.DC && props.RTR ? (
        <div>
          <ToastContainer />
          <div className="table-responsive pt-2">
            <Table
              aria-label="Dipping parameter"
              className="dipping-parameter-table"
            >
              <TableHead>
                <TableRow>
                  {userPermission.find(
                    (permission) => permission.module === "Customer Reports"
                  ).is_editor == true &&
                  userPermission.find(
                    (permission) => permission.module === "Customer Reports"
                  ).is_viewer == true ? (
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
                        <div className="datepairing-checkbox">
                          Date of Pairing
                        </div>
                      </div>
                    </TableCell>
                  ) : (
                    <TableCell colSpan={2}>
                      <div className="d-flex">
                        <div>
                          <Checkbox
                            color="primary"
                            onClick={handleToastMsg}
                            checked={false}
                          />
                        </div>
                        <div className="datepairing-checkbox">
                          Date of Pairing
                        </div>
                      </div>
                    </TableCell>
                  )}
                  <TableCell>Lot No.</TableCell>
                  <TableCell>UID</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>SC/RE</TableCell>
                  <TableCell>Type of Gloves</TableCell>
                  <TableCell>Order No</TableCell>
                  <TableCell>DC</TableCell>
                  <TableCell>RTR</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input
                      type="search"
                      placeholder="Date of Pairing"
                      name="Date"
                      value={searchText.Date}
                      onChange={handleSearchData}
                    />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input
                      type="search"
                      placeholder="Lot No."
                      name="LotNumber"
                      value={searchText.LotNumber}
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
                      placeholder="Length"
                      name="Length"
                      value={searchText.Length}
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
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input
                      type="search"
                      placeholder="Type of Gloves"
                      name="GlovesType"
                      value={searchText.GlovesType}
                      onChange={handleSearchData}
                    />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input
                      type="search"
                      placeholder="Order No"
                      name="Order_No"
                      value={searchText.Order_No}
                      onChange={handleSearchData}
                    />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input type="search" placeholder="DC" name="DC" />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input type="search" placeholder="RTR" name="RTR" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="reports-table">
                {pairedData
                  ? stableSort(
                      pairedData.results,
                      getComparator(order, orderBy)
                    ).map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${row.batchid}`;

                      return (
                        <TableRow className="main-table-reports">
                          <TableCell padding="checkbox" key={row}>
                            {userPermission.find(
                              (permission) =>
                                permission.module === "Customer Reports"
                            ).is_editor == true &&
                            userPermission.find(
                              (permission) =>
                                permission.module === "Customer Reports"
                            ).is_viewer == true ? (
                              <Checkbox
                                color="primary"
                                onClick={() => handleClick(row.id)}
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            ) : (
                              <Checkbox
                                color="primary"
                                onClick={() => handleToastMsg()}
                                checked={false}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {dayjs(row.created_at).format("YYYY-MM-DD")}
                          </TableCell>
                          <TableCell id={labelId} scope="row" padding="none">
                            {row.lot_number}
                          </TableCell>
                          <TableCell>
                            {row.first_uid} - {row.second_uid}
                          </TableCell>
                          <TableCell>{row.class_id}</TableCell>
                          <TableCell>{row.size}</TableCell>
                          <TableCell>{row.length}</TableCell>
                          <TableCell>{row.cuff}</TableCell>
                          <TableCell>{row.types_of_gloves}</TableCell>
                          {row.order_id ? (
                            <TableCell>{row.order_id}</TableCell>
                          ) : (
                            <TableCell style={{ textAlign: "center" }}>
                              -
                            </TableCell>
                          )}

                          {userPermission.find(
                            (permission) =>
                              permission.module === "Customer Reports"
                          ).is_editor == true &&
                          userPermission.find(
                            (permission) =>
                              permission.module === "Customer Reports"
                          ).is_viewer == true ? (
                            <>
                              <TableCell>
                                {" "}
                                <button
                                  className={
                                    row.declaration_of_conformity_report
                                      ? "eyeicon-img"
                                      : "eyeicon-img-disabled"
                                  }
                                  onClick={() => handleEyeClick(row)}
                                >
                                  <img src={images.viewIcon} />
                                </button>
                              </TableCell>
                              <TableCell>
                                {" "}
                                <button
                                  className={
                                    row.routine_test_report
                                      ? "eyeicon-img"
                                      : "eyeicon-img-disabled"
                                  }
                                  onClick={() => handleRTRTabClick(row)}
                                >
                                  <img src={images.viewIcon} />
                                </button>
                              </TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell>
                                {" "}
                                <button
                                  className={
                                    row.declaration_of_conformity_report
                                      ? "eyeicon-img"
                                      : "eyeicon-img-disabled"
                                  }
                                  onClick={() => handleToastMsg()}
                                >
                                  <img src={images.viewIcon} />
                                </button>
                              </TableCell>
                              <TableCell>
                                {" "}
                                <button
                                  className={
                                    row.routine_test_report
                                      ? "eyeicon-img"
                                      : "eyeicon-img-disabled"
                                  }
                                  onClick={() => handleToastMsg()}
                                >
                                  <img src={images.viewIcon} />
                                </button>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      );
                    })
                  : null}
              </TableBody>
            </Table>
            {isLoading && <Loader />}
          </div>
          <TablePagination
            className="table-pagination"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={pairedData ? pairedData.count : 0}
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
};
