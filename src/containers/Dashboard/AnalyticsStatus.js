import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExcelIcon from "../../assets/images/excel-icon.svg";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";

const AnalyticsStatus = () => {
  return (
    <>
      <div className="dashboard-wrapper page-wraper">
        <div className="page-header">
          <Link to="/productionStatus" className="page-back-btn">
            <ArrowBackIcon />
            <span>Analytics</span>
          </Link>
          <div className="header-btn-group">
            <select
              className="page-header-btn-params"
              id="selectedClass"
              required
              style={{ fontSize: "17px", fontWeight: 500 }}
            >
              <option value="none" selected disabled hidden>
                Select Station
              </option>
              <option value="all">All</option>
            </select>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                className="date-picker-production"
                                label="Select Date"
                                value={startDate}
                                onChange={(newValue) => {
                                    setStartDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} style={{width:"30%", background: "#ffff" }} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                className="date-picker-production"
                                label="Select Date"
                                value={endDate}
                                onChange={(newValue) => {
                                    setEndDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} style={{width:"30%", background: "#ffff" }} />}
                            />
                        </LocalizationProvider> */}
            <button className="page-header-btn">
              <img src={ExcelIcon} alt="" />
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <Table
            aria-label="Dipping parameter"
            className="productionstatus-table"
          >
            <TableBody>
              <TableRow>
                <TableCell
                  rowSpan={2}
                  style={{
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  {" "}
                  Dipping Parameters
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 6
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 7
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 8
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 9
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 10
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 11
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 00</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 0</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 1</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 2</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 3</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 4</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="table-responsive mt-4">
          <Table
            aria-label="Dipping parameter"
            className="productionstatus-table"
          >
            <TableBody>
              <TableRow>
                <TableCell
                  rowSpan={2}
                  style={{
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  UID Printing
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 6
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 7
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 8
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 9
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 10
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 11
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 00</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 0</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 1</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 2</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 3</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 4</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="table-responsive mt-4">
          <Table
            aria-label="Dipping parameter"
            className="productionstatus-table"
          >
            <TableBody>
              <TableRow>
                <TableCell
                  rowSpan={2}
                  style={{
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Visual Inspection
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 6
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 7
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 8
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 9
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 10
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 11
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 00</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 0</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 1</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 2</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 3</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 4</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="table-responsive mt-4">
          <Table
            aria-label="Dipping parameter"
            className="productionstatus-table"
          >
            <TableBody>
              <TableRow>
                <TableCell
                  rowSpan={2}
                  style={{
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Electric Test
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 6
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 7
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 8
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 9
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 10
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 11
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 00</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 0</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 1</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 2</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 3</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 4</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="table-responsive mt-4">
          <Table
            aria-label="Dipping parameter"
            className="productionstatus-table"
          >
            <TableBody>
              <TableRow>
                <TableCell
                  rowSpan={2}
                  style={{
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Final Visual Inspection
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 6
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 7
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 8
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 9
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 10
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 11
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 00</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 0</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 1</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 2</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 3</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 4</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="table-responsive mt-4">
          <Table
            aria-label="Dipping parameter"
            className="productionstatus-table"
          >
            <TableBody>
              <TableRow>
                <TableCell
                  rowSpan={2}
                  style={{
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  QR Printing
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 6
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 7
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 8
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 9
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 10
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    backgroundColor: "#ffff",
                  }}
                >
                  Size 11
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
                <TableCell>Left</TableCell>
                <TableCell>Right</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 00</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 0</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 1</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 2</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 3</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "left" }}>Class 4</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
                <TableCell>4520</TableCell>
                <TableCell>8596</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default AnalyticsStatus;
