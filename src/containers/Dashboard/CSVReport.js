import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { images } from "../../config/images";
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { uploadFileExcel } from "./services";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetUploadFile } from "../DippingParameters/batchSlice";
import dayjs from "dayjs";
import Loader from "../../components/Loader/Loader";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "./Dashboard.css";
import Button from "../../components/Button/Button";

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
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
}

const CSVReport = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilename, setSelectedFilename] = useState("");

  const [exportFile, setExportFile] = useState("none");
  const [isLoading, setLoading] = useState(false);
  const [successmsg, setSuccessmsg] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();

  const dispatch = useDispatch();

  const { getUploadFile } = useSelector((state) => state.batchState);
  const { userPermission } = useSelector((state) => state.userState);
  const [UploadfileStatus, setUploadfileStatus] = useState(false);
  const [popupmessage, setpopupmessage] = useState("");

  const getUploadOrderDetailData = () => {
    dispatch(fetchgetUploadFile());
  };

  useEffect(() => {
    getUploadOrderDetailData();
  }, []);

  const handleUploadFile = () => {
    setSuccessmsg(false);
    setOpenPopup(!openPopup);
  };
  const handleCancle = () => {
    setOpenPopup(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFileChange = (event) => {
    setUploadfileStatus(true);
    setSelectedFile(event.target.files[0]);
    setSelectedFilename(event.target.files[0].name);
  };

  const TosterHandle = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleUploadpdf = async () => {
    if (UploadfileStatus && exportFile != "none") {
      setLoading(true);
      const formData = new FormData();
      formData.append("upload_file", selectedFile);
      formData.append("order_type", exportFile);

      try {
        const resp = await uploadFileExcel(formData);
        if (resp.status == 200 || resp.status == 201) {
          // console.log("resp", resp.data.message);
          setSelectedFile(null);
          setExportFile("none");
          setpopupmessage(resp.data.message);
          setSelectedFilename("");
          setUploadfileStatus(false);
          setLoading(false);
          getUploadOrderDetailData();
          setOpenPopup(false);
          setSuccessmsg(true);
        }
      } catch (error) {
        setSelectedFile(null);
        setExportFile("none");
        setUploadfileStatus(false);
        setpopupmessage(error.response.data.message);
        setSuccessmsg(true);
        setLoading(false);
        setSelectedFilename("");
        getUploadOrderDetailData();
        setOpenPopup(false);
      }
    } else {
      if (!UploadfileStatus && exportFile == "none") {
        TosterHandle("Both field are required");
      } else {
        if (!UploadfileStatus) {
          TosterHandle("Please upload file[.xlsx]");
        }
        if (exportFile == "none") {
          TosterHandle("Please select data type ");
        }
      }

      setLoading(false);
    }
  };

  const Closehandle = () => {
    setSuccessmsg(false);
    setpopupmessage("");
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
    <>
      <div className="dashboard-wrapper page-wraper">
        <ToastContainer />
        <div className="page-header">
          <Link to="/productionStatus" className="page-back-btn">
            <ArrowBackIcon />
            <span>Production</span>
          </Link>

          <div className="header-btn-group">
            {userPermission.find(
              (permission) => permission.module === "Production Analytics"
            ).is_editor == true &&
            userPermission.find(
              (permission) => permission.module === "Production Analytics"
            ).is_viewer == true ? (
              <div onClick={handleUploadFile}>
                <img
                  src={images.downloadbtn}
                  alt=""
                  style={{ height: "50px", cursor: "pointer" }}
                />
              </div>
            ) : (
              <div onClick={handleToastMsg}>
                <img
                  src={images.downloadbtn}
                  alt=""
                  style={{ height: "50px", cursor: "pointer" }}
                />
              </div>
            )}
            <button className="page-header-btn">
              <img src={images.filterIcon} style={{ marginRight: "8px" }} />
              Filter
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <Table className="csvReport">
            <TableHead>
              <TableRow>
                <TableCell>SL. No.</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Document</TableCell>
                <TableCell>User</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="search-table-row">
                  <SearchIcon className="search-icon" />
                  <input type="search" placeholder="SL. No." name="SL. No." />
                </TableCell>
                <TableCell className="search-table-row">
                  <SearchIcon className="search-icon" />
                  <input type="search" placeholder="Date" name="Date" />
                </TableCell>
                <TableCell className="search-table-row">
                  <SearchIcon className="search-icon" />
                  <input type="search" placeholder="Time" name="Time" />
                </TableCell>
                <TableCell className="search-table-row">
                  <SearchIcon className="search-icon" />
                  <input type="search" placeholder="Document" name="Document" />
                </TableCell>
                <TableCell className="search-table-row">
                  <SearchIcon className="search-icon" />
                  <input type="search" placeholder="User" name="User" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getUploadFile
                ? stableSort(getUploadFile, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((row) => {
                      if (JSON.stringify() === JSON.stringify()) {
                        return row;
                      }
                      {
                        return row;
                      }
                    })

                    .map((row, index) => {
                      return (
                        <>
                          <TableRow>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>
                              {dayjs(row.created_at).format("YYYY-MM-DD")}
                            </TableCell>
                            <TableCell>
                              {dayjs(row.created_at).format("HH:mm")}
                            </TableCell>
                            <TableCell>
                              {" "}
                              <a href={row.file} download>
                                {row.file.split("/").pop()}
                              </a>
                            </TableCell>
                            <TableCell>{row.uploded_by}</TableCell>
                          </TableRow>
                        </>
                      );
                    })
                : ""}
            </TableBody>
          </Table>
          <TablePagination
            className="table-pagination"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={getUploadFile ? getUploadFile.length : null}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>

        {openPopup && (
          <div className="sendingData csvReport-data csvReport-popup-box">
            <Card
              style={{ padding: "10px", boxShadow: "0px 20px 40px #34343454" }}
            >
              <CardContent>
                <div className="d-flex justify-content-between" required>
                  <h6 style={{ textAlign: "left" }}>Select data upload type</h6>
                  <span className="required-asterisk" style={{ color: "red" }}>
                    *
                  </span>
                  <div onClick={handleCancle}>
                    <img
                      src={images.closeIcon}
                      className="cancleButton"
                      style={{ marginLeft: "42px" }}
                    />
                  </div>
                </div>
                <Box>
                  <select
                    className="form-input-class input-data-type-csv"
                    required
                    style={{ width: "100%", marginLeft: 0 }}
                    onChange={(e) => setExportFile(e.target.value)}
                    value={exportFile}
                  >
                    <option value="none" disabled hidden>
                      Select Data Type
                    </option>
                    <option value="Export">Export</option>
                    <option value="Domestic">Domestic</option>
                  </select>
                </Box>
                <div>
                  <div className="file-logo-container">
                    <label
                      htmlFor="fileInput"
                      className="uploadFile uploadFile-button"
                    >
                      <div className="ufile">
                        <span> </span>
                        {selectedFilename ? selectedFilename : "Upload file"}
                      </div>
                    </label>
                    <img className="file-upload-icon" src={images.uploadIcon} />
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    required
                  />

                  <p
                    style={{
                      fontSize: "11px",
                      textAlign: "left",
                      marginTop: "5px",
                    }}
                  >
                    <b>Note:</b> Upload file .CSV file only.
                  </p>
                </div>
              </CardContent>
              <button
                style={{
                  width: "250px",
                  marginBottom: "20px",
                  marginTop: "-27px",
                }}
                onClick={handleUploadpdf}
              >
                Upload
              </button>
            </Card>
          </div>
        )}

        {successmsg ? (
          <>
            <div className="sendingdataaaa1">
              <Card className="pairingcard-Approved">
                <CardContent className="p-0 pairing-status">
                  <h4>{popupmessage ? popupmessage : "message not get..."}</h4>
                </CardContent>
                <Button
                  className="pairingcard-btn"
                  title="Close"
                  onClick={() => {
                    Closehandle();
                  }}
                />
              </Card>
            </div>
          </>
        ) : (
          ""
        )}
        {isLoading && <Loader />}
      </div>
      <div className="d-flex justify-content-end aborted">
        <p style={{ margin: 0, marginBottom: 0 }}>
          Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
          Rights Reserved
        </p>
      </div>
    </>
  );
};
export default CSVReport;
