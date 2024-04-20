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
import "./Box_PrintHistory.css";
import { getBoxLabelPrintHistory, printAgainBoxLabel } from "./services";
import { images } from "../../config/images";
import { Card, CardContent, Grid } from "@mui/material";
import Button from "../../components/Button/Button";
import ShiftDrpdown from "../../common/Drpdown/Shift";

export const PrintHistoryTable = ({ sendReverseProps, Printer }) => {
  const [PrintHistorydata, setPrintHistorydata] = useState([]);
  const initiallValue = {
    Date: "",
    Time: "",
    Shift: "",
    CustomerName: "",
    DateofPrinting: "",
    OrderNo: "",
    OrderID: "",
    BoxNo: "",
    NumberofPrints: "",
    User: "",
    PackingStatus: "",
  };
  const [searchText, setSearchText] = useState(initiallValue);
  const [rowsPerPage, setrowsPerPage] = useState(10);
  const [page, setpage] = useState(0);
  const [isPrinting, setisPrinting] = useState(false);
  const [isPrinted, setisPrinted] = useState(false);
  const [isPrintagain, setisPrintagain] = useState(false);
  const [BoxId, setBoxId] = useState("");

  const handlesendReverseProps = (data) => {
    console.log("data", data);
    sendReverseProps(data);
  };
  useEffect(
    (searchParams) => {
      console.log("useEffect running");
      PrintHistoryApiHandle(searchParams);
      console.log("page", page);
      console.log("rowsPerPage", rowsPerPage);
    },
    [searchText, page, rowsPerPage]
  );

  const PrintHistoryApiHandle = async () => {
    try {
      const searchParams = {
        Shift: searchText.Shift,
        OrderID: searchText.OrderID,
        NumberofPrints: searchText.NumberofPrints,
        PackingStatus: searchText.PackingStatus,
        User: searchText.User,
        order_number: searchText.OrderNo,
        BoxNo: searchText.BoxNo,
        CustomerName: searchText.CustomerName,
        Page: page,
        Page_size: rowsPerPage,
        DateofPrinting: searchText.DateofPrinting,
        Time: searchText.Time,
      };

      const Api = await getBoxLabelPrintHistory(searchParams);
      if (Api.data.success === true) {
        console.log("Api Response", Api.data);
        console.log("Api Response", Api.data.payload);
        setPrintHistorydata(Api.data.payload);
      }
    } catch (e) {
      console.log("Error getting from api call of PrintHistoryApiHandle");
    }
  };

  // PrintHistoryApiHandle()

  const HandleSearch = async (e) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);
    setSearchText({ ...searchText, [name]: value });
  };

  const handleChangePage = (event, newPage) => {
    // This function handles change of the current page
    console.log("newPage", newPage);
    setpage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("event.target.value", event.target.value);
    setrowsPerPage(parseInt(event.target.value, 10));
    setpage(0);
  };

  function processTime(inputTime) {
    // Split the input string by ':' to separate hours, minutes, seconds, and milliseconds
    const parts = inputTime.split(":");

    // Extract hours, minutes, and seconds
    const hours = parts[0];
    const minutes = parts[1];
    const secondsAndMilliseconds = parts[2].split(".");

    // Extract seconds and milliseconds separately
    const seconds = secondsAndMilliseconds[0];
    const milliseconds = secondsAndMilliseconds[1];

    // Format the output as "hh.mm,ss"
    return `${hours}:${minutes}:${seconds}`;
  }

  const handlePrintagain = async (e) => {
    setisPrintagain(false);
    setisPrinting(true);
    console.log("Printing again.............box_no", e);
    const boxid = e ?? BoxId;
    setBoxId(e);

    const params = { box_id: boxid, printer: Printer };
    const Api = await printAgainBoxLabel(params);
    if (Api.data.success == true) {
      PrintHistoryApiHandle();
      setisPrinting(false);
      setisPrinted(true);

      console.log("api call done......", Api.data);
    }
  };
  return (
    <>
      <TableContainer className="PrintHistory-table">
        <Table className="pairing-table ">
          <TableHead>
            <TableRow>
              <TableCell>
                <div className="d-flex">
                  <div className="datepairing-checkbox">Date of Printing</div>
                </div>
              </TableCell>
              <TableCell>Time of Printing</TableCell>
              <TableCell>Shift</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Order No</TableCell>
              <TableCell>Customer Name</TableCell>

              <TableCell>Box No</TableCell>
              <TableCell>No. of Prints</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="search-table-row">
                <SearchIcon className="search-icon" />
                <input
                  type="search"
                  placeholder="Date of Printing"
                  name="DateofPrinting"
                  onChange={HandleSearch}
                  value={searchText.DateofPrinting}
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
                  placeholder="Box No"
                  name="BoxNo"
                  onChange={HandleSearch}
                  value={searchText.BoxNo}
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
                  placeholder="User Name"
                  name="User"
                  onChange={HandleSearch}
                  value={searchText.User}
                ></input>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {PrintHistorydata?.results?.map((row, index) => {
              const ProcessTime = processTime(row.time_of_printing);

              return (
                <TableRow hover role="checkbox">
                  <TableCell>
                    {dayjs(row.date_of_printing).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>{ProcessTime}</TableCell>

                  <TableCell>{row.shift}</TableCell>
                  <TableCell>{row.order_id}</TableCell>
                  <TableCell>{row.order_number}</TableCell>
                  <TableCell>{row.customer_name}</TableCell>

                  <TableCell className="box-no-print-status">
                    {row.box_no}
                    <button
                      className={"page-header-button printer-icon"}
                      onClick={() => {
                        handlePrintagain(row.box_id);
                      }}
                    >
                      {" "}
                      <img
                        src={images.printIcon}
                        className={row.is_printed ? "" : ""}
                      />
                    </button>
                  </TableCell>
                  <TableCell>{row.no_of_prints ? row.no_of_prints > 9 ? row.no_of_prints : "0" + row.no_of_prints:''}</TableCell>

                  <TableCell className="user-eye-icon-container">
                    {row.user}
                    <button className={"eyeicon-img"}>
                      <img
                        src={images.viewIcon}
                        onClick={() => handlesendReverseProps(row.box_no)}
                      />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          {/* -disabled */}
        </Table>
      </TableContainer>

      <TablePagination
        className="table-pagination"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        rowsPerPage={rowsPerPage}
        count={PrintHistorydata ? PrintHistorydata.count : null}
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

      {isPrinted ? (
        <>
          <div className="sendingdataaaa1">
            <Card className="pairingcard-Approved">
              <CardContent className="p-0 pairing-status">
                <h4>Printed</h4>
              </CardContent>
              <Button
                className="pairingcard-btn"
                title="Yes"
                onClick={() => {
                  setisPrinted(false);
                }}
              />
              <Button
                className="pairingcard-btn"
                title="No"
                onClick={() => {
                  setisPrinted(false);
                  setisPrintagain(true);
                }}
              />
            </Card>
          </div>
        </>
      ) : null}

      {isPrintagain ? (
        <>
          <div className="sendingdataaaa1">
            <Card className="pairingcard-Approved">
              <CardContent className="p-0 pairing-status">
                <h4>Print Again?</h4>
              </CardContent>
              <Button
                className="pairingcard-btn"
                title="Yes"
                onClick={() => {
                  handlePrintagain(BoxId);
                }}
              />
              <Button
                className="pairingcard-btn"
                title="No"
                onClick={() => {
                  setisPrintagain(false);
                }}
              />
            </Card>
          </div>
        </>
      ) : null}

      {isPrinting ? (
        <>
          <div className="sendingdatasimple-pop-up">
            <Card className="pairingcard-Approved-simple-pop-up">
              <CardContent className="p-0 pairing-status">
                <h4>{"Printing....."}</h4>
              </CardContent>
            </Card>
          </div>
        </>
      ) : null}
    </>
  );
};

export default PrintHistoryTable;
