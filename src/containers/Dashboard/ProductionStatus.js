import {
  Box,
  Card,
  CardContent,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { TableBody } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductionExpand from "./ProductionExpand";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExcelIcon from "../../assets/images/excel-icon.svg";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import PropTypes from "prop-types";
import {
  filterOrderDetail,
  getOrderbyType,
  getOrderYear,
  yearsOrder,
  exportProduction,
  getColorFilter,
  getOrderbyFilter,
} from "./services";
import Loader from "../../components/Loader/Loader";
import { images } from "../../config/images";
import {
  getcuff,
  getPairingGlovesType,
  getParingLength,
} from "../GlovesPairing/services";
import { getClasses, getSizes } from "../AddBatch/services";
import { fetchOrderDetailData } from "../DippingParameters/batchSlice";

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
  const { onRequestSort } = props;

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

const ProductionStatus = () => {
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [financialYear, setFinancialYear] = useState([]);
  const [selectYear, setSelectYear] = useState(null);
  const [year, setYear] = useState([]);
  const [count, setCount] = useState("");
  const [selectedOrderType, setSelectedOrderType] = useState();
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderIdExcel, setOrderIdExcel] = useState("");
  const [orderId, setOrderId] = useState("");
  const [openPopup, setOpenPopUp] = useState(false);
  const [glovesType, setGlovesType] = useState([]);
  const [selectGlovesType, setSelectGlovesType] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectClass] = useState(null);
  const [GlovesLength, setGlovesLength] = useState([]);
  const [selectGlovesLength, setSelectGlovesLength] = useState(null);
  const [size, setSize] = useState([]);
  const [selectSize, setSelectSize] = useState(null);
  const [cuff, setCuff] = useState([]);
  const [selectCuff, setSelectCuff] = useState(null);
  const [color, setColor] = useState([]);
  const [selectColor, setSelectColor] = useState(null);

  const { getOrderDetailData1 } = useSelector((state) => state.batchState);
  const { userPermission } = useSelector((state) => state.userState);

  const initiallValue = {
    Status: "",
    Days_Left: "",
    Order_ID: "",
    Customer_Name: "",
    Order_Qty: "",
    Paired_Qty: "",
    Packed_Qty: "",
  };

  const [searchText, setSearchText] = useState(initiallValue);

  useEffect(() => {
    const params = {
      page: page,
      rowsPerPage: rowsPerPage,
      searchText: searchText,
    };
    fetchOrderDetailTypeData(params);
  }, [searchText, page, rowsPerPage]);

  const fetchOrderDetailTypeData = (params) => {
    dispatch(fetchOrderDetailData(params));
  };

  useEffect(() => {
    getAPIData();
  }, []);

  const getAPIData = async () => {
    try {
      const resp = await getClasses();
      setClasses(resp.data.payload);
      const resp1 = await getPairingGlovesType();
      setGlovesType(resp1.data);
      const resp2 = await getParingLength();
      setGlovesLength(resp2.data);
      const resp3 = await getSizes();
      setSize(resp3.data.payload);
      const resp4 = await getcuff();
      setCuff(resp4.data);
      const resp5 = await getColorFilter();
      setColor(resp5.data);
      const resp6 = await getOrderYear();
      setFinancialYear(resp6.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedOrderType !== "all") {
      handleOrderTypeChange();
    } else {
      const params = {
        page: page,
        rowsPerPage: rowsPerPage,
        searchText: searchText,
      };
      fetchOrderDetailTypeData(params);
    }
  }, [selectedOrderType]);

  const handleDataSubmit = async () => {
    const params = {
      class_id__class_name: selectedClass == "all" ? null : selectedClass,
      size__size_name: selectSize == "all" ? null : selectSize,
      type__gloves_type_name:
        selectGlovesType == "all" ? null : selectGlovesType,
      cuff__cuff_name: selectCuff == "all" ? null : selectCuff,
      length:
        selectGlovesLength === "all"
          ? null
          : selectGlovesLength + (selectGlovesLength ? "mm" : ""),
      color: selectColor == "all" ? null : selectColor,
      year: selectYear == "all" ? null : selectYear,
      order_type: selectedOrderType == "all" ? null : selectedOrderType,
    };

    console.log("params", params.order_type);

    try {
      const resp = await getOrderbyFilter(params);
      if (resp.status === 200 || resp.status === 201) {
        setOrderDetail(resp.data.results);
        setOpenPopUp(false);
        setSelectClass(null);
        setSelectSize(null);
        setSelectGlovesType(null);
        setSelectCuff(null);
        setSelectGlovesLength(null);
        setSelectColor(null);
        setSelectYear(null);
        setSelectedOrderType(null);
      }
    } catch (error) {
      console.log("handleSubmit", error);
    }
  };

  const handleExport = async () => {
    setLoading(true);
    const params = await getOrderDetailData1.results.map((e) => e.order_id);

    try {
      const resp = await exportProduction({ order_id: params });
      if (resp.status === 200 || resp.status === 201) {
        setOrderIdExcel(resp.data.payload.production_report);
        setOrderId(",".join(params));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit", error);
    }
  };

  const handleOrderTypeChange = async (event) => {
    if (!selectedOrderType) {
      return true;
    }

    const params = {
      order_type: selectedOrderType,
    };
    try {
      const resp = await getOrderbyType(params);
      if (resp.status === 200 || resp.status === 201) {
        setOrderDetail(resp.data.results);
      }
    } catch (error) {
      console.log("handleSubmit", error);
    }
  };

  const handleSearchData = async (e) => {
    // Destructure the name and value of the input field that triggered the change
    const { name, value } = e.target;

    // Update the searchText state object with the new value for the specified input field
    setSearchText({ ...searchText, [name]: value });
  };

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilter = () => {
    setOpenPopUp(true);
  };

  const handleCancle = () => {
    setOpenPopUp(false);
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
          <Link to="/dashboard" className="page-back-btn">
            <ArrowBackIcon />
            <span>Production</span>
          </Link>
          <div className="header-btn-group">
            <button className="page-header-btn" onClick={handleFilter}>
              <FilterAltIcon /> Filter
            </button>

            {openPopup && (
              <>
                <div className="sendingdataaaa-report" style={{ top: "12%" }}>
                  <Card className="card-reportdata">
                    <CardContent className="p-0">
                      <div
                        className="d-flex justify-content-end"
                        onClick={handleCancle}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={images.closeIcon} />
                      </div>
                      <div>
                        <h4 className="sendingdata-title">
                          <b>Select Parameters to Filter</b>
                        </h4>
                      </div>
                      <div>
                        <h6 className="d-flex m-0">
                          Year{" "}
                          <p style={{ color: "red", marginLeft: "2px" }}> *</p>
                        </h6>
                        <Box component="form" noValidate autoComplete="off">
                          <select
                            className="form-input form-input-report"
                            value={selectYear}
                            onChange={(event) =>
                              setSelectYear(event.target.value)
                            }
                            required
                          >
                            <option value="none" selected disabled hidden>
                              Select Year
                            </option>

                            {financialYear.map((event, index) => (
                              <option key={index} value={event}>
                                {event}
                              </option>
                            ))}

                            <option value="all">All</option>
                          </select>
                        </Box>
                      </div>
                      <div>
                        <h6 className="d-flex m-0">
                          Order Type{" "}
                          <p style={{ color: "red", marginLeft: "2px" }}> *</p>
                        </h6>
                        <Box component="form" noValidate autoComplete="off">
                          <select
                            className="form-input form-input-report"
                            value={selectedOrderType}
                            onChange={(event) =>
                              // console.log("event.target.value",event.target.value)
                              setSelectedOrderType(event.target.value)
                            }
                            required
                          >
                            <option value="none" selected disabled hidden>
                              Select Order Type
                            </option>
                            <option value="Export">Export</option>
                            <option value="Domestic">Domestic</option>
                            <option value="all">All</option>
                          </select>
                        </Box>
                      </div>
                      <div>
                        <h6 className="d-flex m-0">
                          Type{" "}
                          <p style={{ color: "red", marginLeft: "2px" }}> *</p>
                        </h6>
                        <Box component="form" noValidate autoComplete="off">
                          <select
                            className="form-input"
                            // defaultValue="all"
                            value={selectGlovesType}
                            onChange={(event) =>
                              setSelectGlovesType(event.target.value)
                            }
                            // onChange={(event) => setSelectClass(event.target.value)}
                            required
                          >
                            <option value="none" selected disabled hidden>
                              Select Type
                            </option>
                            {glovesType?.map((element) => (
                              <option value={element.pairing_gloves_type_name}>
                                {element.pairing_gloves_type_name}
                              </option>
                            ))}
                            <option value="all">All</option>
                          </select>
                        </Box>
                      </div>
                      <div>
                        <h6 className="d-flex m-0">
                          Class{" "}
                          <p style={{ color: "red", marginLeft: "2px" }}> *</p>
                        </h6>
                        <Box component="form" noValidate autoComplete="off">
                          <select
                            className="form-input form-input-report"
                            value={selectedClass}
                            onChange={(event) =>
                              setSelectClass(event.target.value)
                            }
                            // onChange={(event) => setSelectSize(event.target.value)}
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
                            <option value="all">All</option>
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
                            value={selectGlovesLength}
                            onChange={(event) =>
                              setSelectGlovesLength(event.target.value)
                            }
                            required
                          >
                            <option value="none" selected disabled hidden>
                              Select Length
                            </option>
                            {GlovesLength.map((element) => (
                              <option value={element.length}>
                                {element.length}
                              </option>
                            ))}
                            <option value="all">All</option>
                          </select>
                        </Box>
                      </div>
                      <div>
                        <h6 className="d-flex m-0">
                          Size{" "}
                          <p style={{ color: "red", marginLeft: "2px" }}> *</p>
                        </h6>
                        <Box component="form" noValidate autoComplete="off">
                          <select
                            className="form-input form-input-report"
                            value={selectSize}
                            onChange={(event) =>
                              setSelectSize(event.target.value)
                            }
                            required
                          >
                            <option value="none" selected disabled hidden>
                              Select Size
                            </option>
                            {size.map((element) => (
                              <option value={element.size_name}>
                                {element.size_name}
                              </option>
                            ))}
                            <option value="all">All</option>
                          </select>
                        </Box>
                      </div>

                      <div>
                        <h6 className="d-flex m-0">
                          Cuff{" "}
                          <p style={{ color: "red", marginLeft: "2px" }}> *</p>
                        </h6>
                        <Box component="form" noValidate autoComplete="off">
                          <select
                            className="form-input form-input-report"
                            value={selectCuff}
                            onChange={(event) =>
                              setSelectCuff(event.target.value)
                            }
                            required
                          >
                            <option value="none" selected disabled hidden>
                              Select Cuff
                            </option>
                            {cuff.map((element) => (
                              <option value={element.cuff_name}>
                                {element.cuff_name}
                              </option>
                            ))}
                            <option value="all">All</option>
                          </select>
                        </Box>
                      </div>
                      <div>
                        <h6 className="d-flex m-0">
                          Color{" "}
                          <p style={{ color: "red", marginLeft: "2px" }}> *</p>
                        </h6>
                        <Box component="form" noValidate autoComplete="off">
                          <select
                            className="form-input form-input-report"
                            value={selectColor}
                            onChange={(event) =>
                              setSelectColor(event.target.value)
                            }
                            required
                          >
                            <option value="none" selected disabled hidden>
                              Select Color
                            </option>
                            {color.map((event) => (
                              <option value={event.color}>{event.color}</option>
                            ))}
                            <option value="all">All</option>
                          </select>
                        </Box>

                        <button
                          style={{ width: "160px", marginTop: "10px" }}
                          onClick={handleDataSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            <Link to="/csv-report">
              <button
                className="page-header-btn-params"
                style={{ fontSize: "17px" }}
              >
                Upload CSV{" "}
                <img
                  src={require("../../assets/images/CSV icon.png")}
                  style={{ marginLeft: "5px" }}
                />
              </button>
            </Link>

            <Link to="">
              <button
                className="page-header-btn-params"
                style={{ fontSize: "17px" }}
              >
                Analytics
              </button>
            </Link>
            {userPermission.find(
              (permission) => permission.module === "Production Analytics"
            ).is_editor == true &&
            userPermission.find(
              (permission) => permission.module === "Production Analytics"
            ).is_viewer == true ? (
              <button className="page-header-btn" onClick={handleExport}>
                <img src={ExcelIcon} alt="" />
              </button>
            ) : (
              <button className="page-header-btn" onClick={handleToastMsg}>
                <img src={ExcelIcon} alt="" />
              </button>
            )}
          </div>

          <div className="table-responsive">
            <Table className="productionTable mt-3">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>Status</TableCell>
                  <TableCell>Days Left</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Order Quantity</TableCell>
                  <TableCell>Paired Quantity</TableCell>
                  <TableCell>Packed Quantity</TableCell>
                  <TableCell colSpan={2}>Dispatched Quantity</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input
                      type="search"
                      placeholder="Status"
                      name="Status"
                      value={searchText.Status}
                      onChange={handleSearchData}
                    />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input
                      type="search"
                      placeholder="Days Left"
                      name="Days_Left"
                      value={searchText.Days_Left}
                      onChange={handleSearchData}
                    />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input
                      type="search"
                      placeholder="Order ID"
                      name="Order_ID"
                      value={searchText.Order_ID}
                      onChange={handleSearchData}
                    />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input
                      type="search"
                      placeholder="Customer Name"
                      name="Customer_Name"
                      value={searchText.Customer_Name}
                      onChange={handleSearchData}
                    />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input
                      type="search"
                      placeholder="Order Qty"
                      name="Order_Qty"
                      value={searchText.Order_Qty}
                      onChange={handleSearchData}
                    />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input
                      type="search"
                      placeholder="Paired Qty"
                      name="Paired_Qty"
                      value={searchText.Paired_Qty}
                      onChange={handleSearchData}
                    />
                  </TableCell>
                  <TableCell className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input
                      type="search"
                      placeholder="Packed Qty"
                      name="Packed_Qty"
                      value={searchText.Packed_Qty}
                      onChange={handleSearchData}
                    />
                  </TableCell>
                  <TableCell colSpan={2} className="search-table-row">
                    <SearchIcon className="search-icon" />
                    <input
                      type="search"
                      placeholder="Dispatched Quantity"
                      name="DispatchedQuantity"
                      value={searchText.DispatchedQuantity}
                      onChange={handleSearchData}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetail.length
                  ? stableSort(orderDetail, getComparator(order, orderBy)).map(
                      (row, index) => {
                        return <ProductionExpand row={row} />;
                      }
                    )
                  : getOrderDetailData1
                  ? stableSort(
                      getOrderDetailData1.results,
                      getComparator(order, orderBy)
                    ).map((row, index) => {
                      return <ProductionExpand row={row} />;
                    })
                  : null}
              </TableBody>
            </Table>

            <TablePagination
              className="table-pagination"
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={getOrderDetailData1 ? getOrderDetailData1.count : null}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between aborted">
        <div className="d-flex align-items-center">
          <div
            style={{ color: "", marginRight: "25px" }}
            className="d-flex align-items-center"
          >
            <span className="rejected-btn1  m-1"></span>High
          </div>
          <div
            style={{ color: "", marginRight: "25px" }}
            className="d-flex align-items-center"
          >
            <span className="medium-btn m-1"></span>Medium
          </div>
          <div
            style={{ color: "#333333" }}
            className="d-flex align-items-center"
          >
            <span className="low-btn m-1"></span>Low
          </div>
        </div>
        <p style={{ margin: 0, marginBottom: 0 }} className="Hikar-title">
          Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
          Rights Reserved
        </p>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default ProductionStatus;
