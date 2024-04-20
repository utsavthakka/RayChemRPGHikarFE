import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import dayjs from "dayjs";
import "../../GlovesPairing/GlovesPairing.css";
import { getPrintHistory } from "../services";
import ShiftDrpdown from "../../../common/Drpdown/Shift";

function PrintHistoryTable(props) {
  const [PrintHistorydata, setPrintHistorydata] = useState([]);
  const [PrintHistorydatacount, setPrintHistorydatacount] = useState();

  const initiallValue = {
    Date: "",
    Time: "",
    Shift: "",
    OrderNo: "",
    CustomerName: "",
    OrderID: "",
    UID: "",
    NumberofPrints: "",
    User: "",
    PackingStatus: "",
  };
  const [searchText, setSearchText] = useState(initiallValue);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  console.log(
    "PrintHistorydataPrintHistorydataPrintHistorydata",
    PrintHistorydata
  );
  useEffect(
    (searchParams) => {
      console.log("useEffect running");
      PrintHistoryApiHandle(searchParams);
    },
    [searchText, rowsPerPage, page]
  );

  const PrintHistoryApiHandle = async () => {
    try {
      const searchParams = {
        UID: searchText.UID,
        Shift: searchText.Shift,
        CustomerName: searchText.CustomerName,
        OrderID: searchText.OrderID,
        NumberofPrints: searchText.NumberofPrints,
        PackingStatus: searchText.PackingStatus,
        User: searchText.User,
        OrderNo: searchText.OrderNo,
        page: page,
        page_size: rowsPerPage,
        created_at : searchText.Date,
        created_at_time:searchText.Time
     
      
      };

      const Api = await getPrintHistory(searchParams);
      if (Api.data.success == true) {
        console.log("Api Response", Api.data);
        console.log("Api Response", Api.data.payload);
        setPrintHistorydata(Api.data.payload);
        setPrintHistorydatacount(Api.data.count);
      }else{
        setPrintHistorydata([]);
      }
    } catch (e) {
      console.log("Error getting from api call of PrintHistoryApiHandle");
    }
  };

  const HandleSearch = async (e) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);
    setSearchText({ ...searchText, [name]: value });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table className="pairing-table">
          <TableHead>
            <TableRow>
              <TableCell>
                <div className="d-flex">
                  <div>
                    {/* <Checkbox
                      color="primary"
                      onClick={(event) => console.log("data")}
                      inputProps={{
                        "aria-label": "select all desserts",
                      }}
                    /> */}
                  </div>
                  <div className="datepairing-checkbox">Date of Printing</div>
                </div>
              </TableCell>
              <TableCell>Time of Printing</TableCell>
              <TableCell>Shift</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Order No</TableCell>
              <TableCell>UID</TableCell>
              <TableCell>No. of Prints</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Dispatch Status</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Date of Printing"
                  name="Date"
                  onChange={HandleSearch}
                  value={searchText.Date}
                ></input>
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Time of Printing"
                  name="Time"
                  onChange={HandleSearch}
                  value={searchText.Time}
                ></input>
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                 <ShiftDrpdown
                  searchText={searchText}
                  HandleSearch={HandleSearch}
                />
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Customer Name"
                  name="CustomerName"
                  onChange={HandleSearch}
                  value={searchText.CustomerName}
                ></input>
              </TableCell>

              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Order ID"
                  name="OrderID"
                  onChange={HandleSearch}
                  value={searchText.OrderID}
                ></input>
              </TableCell>

              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Order No"
                  name="OrderNo"
                  onChange={HandleSearch}
                  value={searchText.OrderNo}
                ></input>
              </TableCell>

              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="UID"
                  name="UID"
                  onChange={HandleSearch}
                  value={searchText.UID}
                ></input>
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="No. of Prints"
                  name="NumberofPrints"
                  onChange={HandleSearch}
                  value={searchText.NumberofPrints}
                ></input>
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="User"
                  name="User"
                  onChange={HandleSearch}
                  value={searchText.User}
                ></input>
              </TableCell>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Dispatch Status"
                  name="PackingStatus"
                  onChange={HandleSearch}
                  value={searchText.PackingStatus}
                ></input>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {PrintHistorydata?.results?.map((row, index) => {
              return (
                <TableRow hover role="checkbox">
                  <TableCell>
                    {dayjs(row.pairing.created_at).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>
                    {dayjs(row.pairing.created_at).format("HH:mm:ss")}
                  </TableCell>

                  <TableCell>{row.shift}</TableCell>
                  <TableCell>{row.pairing.customer_name}</TableCell>
                  <TableCell>{row.pairing.order_id}</TableCell>
                  <TableCell>{row.pairing.order_number}</TableCell>

                  <TableCell>
                    {row.pairing.first_uid} - {row.pairing.second_uid}
                  </TableCell>
                  <TableCell>{row.no_of_prints ? row.no_of_prints>9 ? row.no_of_prints: "0" + row.no_of_prints:''}</TableCell>
                  <TableCell>{row.user}</TableCell>
                  <TableCell>{row.packing_status ? "YES" : "NO"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        className="table-pagination"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={PrintHistorydata ? PrintHistorydata.count : null}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {PrintHistorydata
        ? console.log("PrintHistorydata", PrintHistorydata)
        : null}
      {PrintHistorydata
        ? console.log("PrintHistorydata.count", PrintHistorydata.length)
        : null}

      <div className="d-flex justify-content-end aborted">
        <p style={{ margin: 0, marginBottom: 0 }}>
          Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
          Rights Reserved
        </p>
      </div>
    </>
  );
}

export default PrintHistoryTable;
