import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";
import { fetchpairedBatch } from "../../DippingParameters/batchSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import "../../GlovesPairing/GlovesPairing.css";
import { images } from "../../../config/images";
import {PrintAgain} from "../services";
import Button from "../../../components/Button/Button";
import { Card, CardContent } from "@mui/material";

// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import DeleteIcon from "@mui/icons-material/Delete";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import { visuallyHidden } from "@mui/utils";
// import { getSizes } from "../../AddBatch/services";
// import Toolbar from "@mui/material/Toolbar";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import { alpha } from "@mui/material/styles";
// import Box from "@mui/material/Box";




function createData(
  date,
  pairId,
  uId,
  classNo,
  size,
  scRe,
  customerId,
  orderNo
) {
  return {
    date,
    pairId,
    uId,
    classNo,
    size,
    scRe,
    customerId,
    orderNo,
  };
}

// const rows = [
//   createData(
//     "03/07/2022",
//     "AM10234568",
//     "I0000001 ~ I0000002",
//     "04",
//     "04",
//     "SE",
//     "AM10234568",
//     "2540"
//   ),
//   createData(
//     "04/07/2022",
//     "AM10234569",
//     "I0000003 ~ I0000004",
//     "04",
//     "04",
//     "RE",
//     "AM10234568",
//     "2540"
//   ),
//   createData(
//     "04/07/2022",
//     "AM10234564",
//     "I0000005 ~ I0000006",
//     "04",
//     "04",
//     "SE",
//     "AM10234568",
//     "2540"
//   ),
//   createData(
//     "06/07/2022",
//     "AM10234562",
//     "I0000007 ~ I0000008",
//     "04",
//     "04",
//     "RE",
//     "AM10234568",
//     "2540"
//   ),
//   createData(
//     "07/07/2022",
//     "AM10234563",
//     "I0000009 ~ I0000010",
//     "04",
//     "04",
//     "SE",
//     "AM10234568",
//     "2540"
//   ),
// ];

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

function PairingTable(props) {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();


  const initiallValue = { Date: "", UID: "", Class: "", Size: "", Scre: "", LotNumber: "",Order_No:"", GlovesType: "", Length: "" };
  const [searchText, setSearchText] = useState(initiallValue); // state for tracking search input
  const [message, setmessage] = useState("");
  const [isPrinting,setisPrinting] = useState(false);
  const [isPrintingDone,setisPrintingDone] = useState(false);
  const [PrintAgainstatus,setPrintAgainstatus] = useState(false);
  const [PairId,setPairId] = useState("");

  // const []

  const dispatch = useDispatch();

  const { pairedData } = useSelector((state) => state.batchState);

  useEffect((searchParams) => {
    getpairedBatch(searchParams); // fetch paired batch data when search text changes
  }, [searchText, page, rowsPerPage])

  console.log("searchText.....", searchText)

  const getpairedBatch = () => {// fetch paired batch data using Redux
    const searchParams = {
      search: searchText,
      page: page,
      rowsPerPage: rowsPerPage
    }
    dispatch(fetchpairedBatch(searchParams));
  }


  // const isAllSelected =
  //   pairedData.length > 0 && selected.length === pairedData.length;



  const handleClick = (id) => {
    // This function handles click on a row and adds or removes the row's id to/from the selected array
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

  const handleSelectAllClick = (event) => {
    // This function handles click on the "Select All" checkbox and selects or deselects all rows
    if (event.target.checked) {
      const newSelected = pairedData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    // This function handles change of the current page
    // console.log("event",event)
    // console.log("newPage",newPage)
    setPage(newPage);
  };

  const handleSearchData = async (e) => {
    // This function handles change of the search input field and sets the new search text state
    const { name, value } = e.target;
    setSearchText({ ...searchText, [name]: value });
  };

  const handleChangeRowsPerPage = (event) => {
    // console.log("event.target.value",event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pairedData.length) : 0;




  const PrintAgainHandle = async(id)=>{
    console.log("row.id........1",id)
    setisPrinting(true);
    console.log("row.id........2",id)
    setPairId(id)
    console.log("row.id........3",id)
    const params = {
      pair_id:id,
      printer: props.Printer

    }
    try{
      const Api = await PrintAgain(params)

      if(Api.data.success==true){
        setisPrinting(false)
        setisPrintingDone(true)

        setmessage(Api.data.message)
        console.log("Apicall sucessfully",Api.data)
      }

    }catch(e){
      // setisPrintingDone(true)
      // setisPrinting(false)

      console.log("Error from PrintAgain....")

    }
  }



  return (
    <>
      <TableContainer>
        <Table className="pairing-table">
          <TableHead>
            <TableRow>
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
                  <div className="datepairing-checkbox">Date of Pairing</div>
                </div>
              </TableCell>
              <TableCell>Lot No.</TableCell>
              <TableCell>UID</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Length</TableCell>
              <TableCell>SC/RE</TableCell>
              <TableCell>Type Of Gloves</TableCell>
              <TableCell>Order No</TableCell>
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
                ></input>
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Lot No."
                  name="LotNumber"
                  value={searchText.LotNumber}
                  onChange={handleSearchData}
                ></input>
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="UID"
                  name="UID"
                  value={searchText.UID}
                  onChange={handleSearchData}
                ></input>
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Class"
                  name="Class"
                  value={searchText.Class}
                  onChange={handleSearchData}
                ></input>
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Size"
                  name="Size"
                  value={searchText.Size}
                  onChange={handleSearchData}
                ></input>
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Length"
                  name="Length"
                  value={searchText.Length}
                  onChange={handleSearchData}
                ></input>
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Scre"
                  name="Scre"
                  value={searchText.Scre}
                  onChange={handleSearchData}
                ></input>
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Type of Gloves"
                  value={searchText.GlovesType}
                  name="GlovesType"
                  onChange={handleSearchData}
                ></input>
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input type="search" placeholder="Order ID" name="Order_No" value={searchText.Order_No} onChange={handleSearchData}></input>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pairedData ?
              (
                stableSort(pairedData.results, getComparator(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                // .filter((row) => {
                //   if (JSON.stringify(searchText) === JSON.stringify(initiallValue)) {
                //     return row;
                //   }
                //   {
                //     return row;
                //   }
                // }
              )


              // row.is_printed ? "": 
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${row.batchid}`;

                  return (
                    <TableRow hover role="checkbox">
                      <TableCell padding="checkbox" key={row}>
                        <Checkbox
                          color="primary"
                          onClick={() => handleClick(row.id)}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell>{dayjs(row.created_at).format("YYYY-MM-DD")}</TableCell>
                      <TableCell>{row.lot_number}</TableCell>
                      <TableCell className="Container-UID-Printer">

                        {row.first_uid} - {row.second_uid}

                        <button
                          className={
                           "page-header-button printer-icon"
                          }
                          onClick={()=>{PrintAgainHandle(row.id);
                            }}
                        >
                          <img
                            src={images.printIcon}
                            className={row.is_printed ? "" : ""}
                          />
                        </button>
                      </TableCell>
                      <TableCell>{row.class_id}</TableCell>
                      <TableCell>{row.size}</TableCell>
                      <TableCell>{row.length}</TableCell>
                      <TableCell>{row.cuff}</TableCell>
                      <TableCell>{row.types_of_gloves}</TableCell>
                      <TableCell>{row ? row.order_id : null}</TableCell>
                    </TableRow>
                  );
                })
              : null
            }
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        className="table-pagination"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={pairedData ? pairedData.count : null}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div className="d-flex justify-content-end aborted">
        <p style={{ margin: 0, marginBottom: 0 }}>
          Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
          Rights Reserved
        </p>
      </div>

      { isPrinting?(
          <>
            <div className="sendingdatasimple-pop-up">
              <Card className="pairingcard-Approved-simple-pop-up">
                <CardContent className="p-0 pairing-status">
                  <h4>{ "Printing....."}</h4>
                </CardContent>
              </Card>
            </div>
          </>
        ):null} 
        

{ isPrintingDone ?(
          <>
            <div className="sendingdataaaa1">
              <Card className="pairingcard-Approved">
                <CardContent className="p-0 pairing-status">
                  <h4>Printed</h4>
                </CardContent>
                <Button className='pairingcard-btn' title='Yes' onClick={()=>{setisPrintingDone(false)}}  />
                <Button className='pairingcard-btn' title='No' onClick={()=>{setPrintAgainstatus(true);
                setisPrintingDone(false);}}  />

              </Card>
            </div>
          </>
        ):null}



      { PrintAgainstatus ?(
          <>
            <div className="sendingdataaaa1">
              <Card className="pairingcard-Approved">
                <CardContent className="p-0 pairing-status">
                  <h4>Print Again?</h4>
                </CardContent>
                <Button className='pairingcard-btn' title='Yes' onClick={()=>{PrintAgainHandle(PairId);
                setPrintAgainstatus(false);}}  />
                <Button className='pairingcard-btn' title='No' onClick={()=>{window.location.reload();}}  />

              </Card>
            </div>
          </>
        ):null}

    </>
  );
}

export default PairingTable;
