import React, { useState } from "react";
import { Checkbox, Table, TableCell, TableHead, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import "../Reports & Approvals/Reports.css";
import { useEffect } from "react";
import { fetchgetPrintingData } from "../DippingParameters/batchSlice";
import Loader from "../../components/Loader/Loader";
import { getprintingdata } from "./services";
import ShiftDrpdown from "../../common/Drpdown/Shift";
import RorLdropdown from "../../common/Drpdown/RorL";

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount, onRequestSort } = props;
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

function UidPrinting(props) {
  const [mobileFilter, setMobileFilter] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setLoading] = useState(false);

  const { row, selectRorL } = props;

  console.log("...........uidPrinting", props.valueStation);

  // useEffect(()=>{
  //   const handleFilterClick = async (testDate) => {
  //     const params = {
  //       station: 0,
  //     };
  //     if (testData) {
  //       params["date"] = testData;
  //     }
  //     if (selectRorL && selectRorL !== "all") {
  //       params["r_or_l"] = selectRorL;
  //     }
  //     try {
  //       const resp = await getTopCount(params);
  //       if (resp.status == 200 || resp.status == 201) {
  //         setCheckFilter(resp.data.payload);
  //       }
  //     } catch (error) {
  //       console.log("error");
  //     }
  //   };
  // },[props.valueStation])

  const initiallValue = {
    Date: "",
    B_No: "",
    UID: "",
    Test_Date: "",
    Test_Time: "",
    Shift: "",
    Lot_No: "",
    RorL: "",
    Class: "",
    Size: "",
    Thickness: "",
    Print_Result: "",
    Approval_Status: "",
  };
  const [searchText, setSearchText] = useState(initiallValue);
  const [uidPrintingData, setUidPrintingData] = useState([]);
  const dispatch = useDispatch();
  const { startDateReFormat, endDateReFormat } = props;
  const [startDateTime, setstartDateTime] = useState();
  const [endDateTime, setendDateTime] = useState();

  useEffect(() => {
    setendDateTime(
      dayjs(endDateReFormat).format("YYYY-MM-DD" + " " + "HH:mm:ss")
    );
    setstartDateTime(
      dayjs(startDateReFormat).format("YYYY-MM-DD" + " " + "HH:mm:ss")
    );
  }, [startDateReFormat, endDateReFormat]);

  useEffect(() => {
    if (searchText) {
      props.uidprintingSearchsendtoPerent(searchText);
    }
  }, [searchText]);
  // const { getPrintingData } = useSelector((state) => state.batchState);

  // useEffect(() => {
  //   getPrintingdata1(searchText);
  // }, [page, rowsPerPage, searchText,selectRorL]);

  // const getPrintingdata1 = (searchText) => {
  //   const pageParams = {
  //     page: page,
  //     rowsPerPage: rowsPerPage,
  //     searchText: searchText,
  //     selectRorL:selectRorL
  //   };
  //   dispatch(fetchgetPrintingData(pageParams));
  // };

  useEffect(() => {
    const params = {
      page: page,
      rowsPerPage: rowsPerPage,
      searchText: searchText,
      selectRorL: selectRorL,
    };
    // handleUidPrintingData(params);
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
      handleUidPrintingData(params);
      handleSearchData(searchText);
      // getData();
      return () => {};
    }
  }, [startDateTime, endDateTime, page, rowsPerPage, selectRorL, searchText]);

  const handleUidPrintingData = async (search) => {
    if (searchText === "") {
      const resp = await getprintingdata(search);
      setUidPrintingData(resp.data);
    } else {
      const resp = await getprintingdata(search);
      setUidPrintingData(resp.data);
    }
  };

  const closeFilter = () => {
    setMobileFilter(!mobileFilter);
  };

  // const emptyRows =
  //   page > 0
  //     ? Math.max(0, (1 + page) * rowsPerPage - getPrintingData.results.length)
  //     : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchData = async (e) => {
    const { name, value } = e.target;
    setSearchText({ ...searchText, [name]: value });
    if (name == "Date") {
      props.handleTestDateSearch(value);
    }
  };

  const handlesearch = () => {
    setSearchText(searchText);
  };

  return (
    <>
      <div
        onClick={closeFilter}
        className={`filter-overlay ${
          mobileFilter ? "mobile-d-none" : "mobile-d-flex"
        }`}
      ></div>
      {props.uidPrinting ? (
        <>
          <div className="dipping-parameter-table-data">
            <div className="table-responsive">
              <Table
                aria-label="Dipping parameter"
                className="dipping-parameter-table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <div className="d-flex">
                        <div className="date-checkbox">Date</div>
                      </div>
                    </TableCell>
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
                    <TableCell>Print Result</TableCell>
                  </TableRow>
                  <TableRow>
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
                        name="Test_Date"
                        value={searchText.Test_Date}
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
                        <option value="">Print Result</option>
                        <option value="pass">Pass</option>
                        <option value="fail">Fail</option>
                      </select>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="reports-table">
                  {uidPrintingData
                    ? uidPrintingData?.results?.map((row) => {
                        const labelId = `enhanced-table-checkbox-${row.uid_type}`;
                        return (
                          <TableRow className="main-table-reports">
                            <TableCell>
                              {dayjs(row.created_at__date).format("YYYY-MM-DD")}
                            </TableCell>
                            <TableCell id={labelId} scope="row" padding="none">
                              {row.batch_id_type}
                            </TableCell>
                            <TableCell>{row.uid_type}</TableCell>
                            <TableCell>
                              {row.uid_printing_tested_date
                                ? dayjs(row.uid_printing_tested_date).format(
                                    "YYYY-MM-DD"
                                  )
                                : "-"}
                            </TableCell>

                            <TableCell>
                              {row.uid_printing_tested_date
                                ? dayjs(row.uid_printing_tested_date).format(
                                    "HH:mm:ss"
                                  )
                                : "-"}
                            </TableCell>
                            <TableCell>{row.uid_tested_shift || "-"}</TableCell>
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
                                    ? row.uid_printing != null
                                      ? row.uid_printing == true
                                        ? "pass"
                                        : "falied"
                                      : "status-icon-disabled"
                                    : null
                                }`}
                              >
                                {row
                                  ? row.uid_printing != null
                                    ? row.uid_printing == true
                                      ? "P"
                                      : "F"
                                    : "status-icon-disabled"
                                  : null}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
              {isLoading && <Loader />}
            </div>
          </div>
          <TablePagination
            className="table-pagination"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={uidPrintingData ? uidPrintingData.count : 0}
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
        </>
      ) : null}

      {/* </div> */}
    </>
  );
}

export default UidPrinting;
