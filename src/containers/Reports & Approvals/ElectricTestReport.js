import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { images } from "../../config/images";

const ElectricTestReport = ({
  setOpenModal,
  electricReportData,
  batchType,
}) => {
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="ElectricTestReport-Modal">
        <div className="modal-header">
          <div className="electricReport-Title">Electric Test Reports</div>
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
                        {dayjs(batchType ? batchType.created_at : "").format(
                          "YYYY-MM-DD"
                        )}
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
                        {batchType ? batchType.batch_type : ""}
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
                      <TableCell sx={{ fontWeight: "bold" }}>Lot No:</TableCell>
                      <TableCell>
                        {batchType ? batchType.lot_number : ""}
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
                        {batchType ? batchType.thickness : ""}
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
                      <TableCell sx={{ fontWeight: "bold" }}>Class:</TableCell>
                      <TableCell>
                        {batchType ? batchType.class_name : ""}
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
                      <TableCell sx={{ fontWeight: "bold" }}>Size:</TableCell>
                      <TableCell>
                        {batchType ? batchType.size_name : ""}
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
              <Table aria-label="reports" className="electric-test-table">
                <TableHead style={{ position: "sticky", top: 0, zIndex: 9 }}>
                  <TableRow>
                    <TableCell rowSpan={2}>UID</TableCell>
                    <TableCell colSpan={4} className="text-center">
                      Machine Setting
                    </TableCell>
                    <TableCell colSpan={5} className="text-center">
                      Test Data
                    </TableCell>
                    <TableCell rowSpan={2}>Test Date</TableCell>
                    <TableCell rowSpan={2}>Shift</TableCell>
                    <TableCell rowSpan={2}>Inspector Name</TableCell>
                    <TableCell rowSpan={2}>Test Result</TableCell>
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
                        <TableCell>{test.machine_setting_kv}</TableCell>
                        <TableCell>{test.timer}</TableCell>
                        <TableCell>{test.max_leak_ma}</TableCell>
                        <TableCell>{test.std}</TableCell>
                        <TableCell>{test.temp}</TableCell>
                        <TableCell>{test.humidity}</TableCell>
                        <TableCell>{test.conductivity}</TableCell>
                        <TableCell>{test.test_data_kv}</TableCell>
                        <TableCell>{test.peak_value}</TableCell>
                        <TableCell>
                          {dayjs(test.modified_at).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell>{test.shift}</TableCell>
                        <TableCell>{test.inspector_name}</TableCell>
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
          </div>
        </div>
        <div className="d-flex justify-content-end aborted">
          <p style={{ margin: 0, marginBottom: 0 }}>
            Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
            Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default ElectricTestReport;
