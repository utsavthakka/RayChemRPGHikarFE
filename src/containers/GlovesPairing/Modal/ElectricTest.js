import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import dayjs from "dayjs";
import { images } from "../../../config/images";

const ElectricTest = ({ uidType, closeModal, reportStatus }) => {
  return (
    <>
      <div className="visualmodal-container">
        <div className="modal-header">
          <div className="modal-title-uid">
            <b>UID : </b>
            {reportStatus
              ? reportStatus[0]
                ? reportStatus[0].uid_type
                : null
              : null}
            {reportStatus ? (
              reportStatus[0] ? (
                reportStatus[0].electric_test ? (
                  <button className="passed-button">Passed</button>
                ) : (
                  <button className="rejected-button">Rejected</button>
                )
              ) : null
            ) : null}
          </div>
          <div className="visual-title">Electric Test</div>

          <div onClick={() => closeModal(false)}>
            <CloseIcon />
          </div>
        </div>
        <div>
          <Box className="header-data">
            <Grid container>
              <Grid
                lg={3}
                md={6}
                sm={6}
                xs={12}
                sx={{ P: 0 }}
                className="single-data-item"
              >
                <Table className="no-border-table transparent-table common-table">
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Mfg Date:
                      </TableCell>
                      <TableCell>
                        {reportStatus
                          ? dayjs(
                              reportStatus[0]
                                ? reportStatus[0].electric_test_details
                                  ? reportStatus[0].electric_test_details
                                      .modified_at
                                  : null
                                : null
                            ).format("YYYY-MM-DD")
                          : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Batch No:
                      </TableCell>
                      <TableCell>
                        {reportStatus
                          ? reportStatus[0]
                            ? reportStatus[0].electric_test_details
                              ? reportStatus[0].electric_test_details
                                  .batch_id_type
                              : null
                            : null
                          : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Lot No:
                      </TableCell>
                      <TableCell>
                        {reportStatus
                          ? reportStatus[0]
                            ? reportStatus[0].lot_number
                            : null
                          : null}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid
                lg={3}
                md={6}
                sm={6}
                xs={12}
                sx={{ P: 0 }}
                className="single-data-item"
              >
                <Table className="no-border-table transparent-table common-table">
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Test Date:
                      </TableCell>
                      <TableCell>
                        {reportStatus
                          ? dayjs(
                              reportStatus[0]
                                ? reportStatus[0].electric_test_details
                                  ? reportStatus[0].electric_test_details
                                      .created_at
                                  : null
                                : null
                            ).format("YYYY-MM-DD")
                          : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Inspector Name:
                      </TableCell>
                      <TableCell>
                        {reportStatus
                          ? reportStatus[0]
                            ? reportStatus[0].electric_test_details
                              ? reportStatus[0].electric_test_details
                                  .inspector_name
                              : null
                            : null
                          : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Shift:
                      </TableCell>
                      <TableCell>
                        {reportStatus
                          ? reportStatus[0]
                            ? reportStatus[0].electric_test_details
                              ? reportStatus[0].electric_test_details.shift
                              : null
                            : null
                          : null}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid
                lg={3}
                md={6}
                sm={6}
                xs={12}
                sx={{ P: 0 }}
                className="single-data-item"
              >
                <Table className="no-border-table transparent-table common-table">
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Class:
                      </TableCell>
                      <TableCell>
                        {reportStatus
                          ? reportStatus[0]
                            ? reportStatus[0].class_name
                            : null
                          : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Thickness:
                      </TableCell>
                      <TableCell>
                        {reportStatus
                          ? reportStatus[0]
                            ? reportStatus[0].thickness
                            : null
                          : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Size:
                      </TableCell>
                      <TableCell>
                        {reportStatus
                          ? reportStatus[0]
                            ? reportStatus[0].size_name
                            : null
                          : null}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid
                lg={3}
                md={6}
                sm={6}
                xs={12}
                sx={{ P: 0 }}
                className="single-data-item"
              >
                <Table className="no-border-table transparent-table common-table">
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Rack No:
                      </TableCell>
                      <TableCell>
                        {reportStatus
                          ? reportStatus[0]
                            ? reportStatus[0].rack_no
                            : null
                          : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>R/L:</TableCell>
                      <TableCell>
                        {reportStatus
                          ? reportStatus[0]
                            ? reportStatus[0].r_or_l
                            : null
                          : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Cuff:
                      </TableCell>
                      <TableCell>
                        {reportStatus
                          ? reportStatus[0]
                            ? reportStatus[0].cuff
                            : null
                          : null}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Box>
          <hr />
          <Box className="matching-data-section">
            <div>
              <p className="modal-section-title">
                <b>Machine Setting</b>
              </p>
              <Grid container>
                <Grid
                  lg={2}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ P: 0 }}
                  className="single-data-item"
                >
                  <Table className="no-border-table transparent-table common-table machineSettingKv ">
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>
                          kV :
                        </TableCell>
                        <TableCell>
                          {reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].electric_test_details
                                ? reportStatus[0].electric_test_details
                                    .machine_setting_kv
                                : null
                              : null
                            : null}{" "}
                          kVAC
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
                        <TableCell style={{ fontWeight: "bold" }}>
                          Timer :
                        </TableCell>
                        <TableCell>
                          {reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].electric_test_details
                                ? reportStatus[0].electric_test_details.timer
                                : null
                              : null
                            : null}{" "}
                          Sec
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid
                  lg={3}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ P: 0 }}
                  className="single-data-item"
                >
                  <Table className="no-border-table transparent-table common-table">
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Max Leak mA :
                        </TableCell>
                        <TableCell>
                          {reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].electric_test_details
                                ? reportStatus[0].electric_test_details
                                    .max_leak_ma
                                : null
                              : null
                            : null}
                          mA
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
                        <TableCell style={{ fontWeight: "bold" }}>
                          STD :
                        </TableCell>
                        <TableCell>
                          {reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].electric_test_details
                                ? reportStatus[0].electric_test_details.std
                                : null
                              : null
                            : null}
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
                        <TableCell style={{ fontWeight: "bold" }}>
                          Slot :
                        </TableCell>
                        <TableCell>
                          {reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].electric_test_details
                                ? reportStatus[0].electric_test_details.slot
                                : null
                              : null
                            : null}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
              <hr className="my-3" />
              <p className="modal-section-title">
                <b>Test Data</b>
              </p>
              <Grid container>
                <Grid
                  lg={2}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ P: 0 }}
                  className="single-data-item"
                >
                  <Table className="no-border-table transparent-table common-table machineSettingKv">
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Temp :
                        </TableCell>
                        <TableCell>
                          {reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].electric_test_details
                                ? reportStatus[0].electric_test_details.temp
                                : null
                              : null
                            : null}
                          °C
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
                        <TableCell style={{ fontWeight: "bold" }}>
                          Humidity :
                        </TableCell>
                        <TableCell>
                          {reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].electric_test_details
                                ? reportStatus[0].electric_test_details.humidity
                                : null
                              : null
                            : null}
                          %
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid
                  lg={3}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ P: 0 }}
                  className="single-data-item"
                >
                  <Table className="no-border-table transparent-table common-table">
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Conductivity :
                        </TableCell>
                        <TableCell>
                          {reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].electric_test_details
                                ? reportStatus[0].electric_test_details
                                    .conductivity
                                : null
                              : null
                            : null}
                          µS/cm
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
                        <TableCell style={{ fontWeight: "bold" }}>
                          kV :
                        </TableCell>
                        <TableCell>
                          {reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].electric_test_details
                                ? reportStatus[0].electric_test_details
                                    .test_data_kv
                                : null
                              : null
                            : null}
                          kVAC
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
                        <TableCell style={{ fontWeight: "bold" }}>
                          Peak value :
                        </TableCell>
                        <TableCell>
                          {reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].electric_test_details
                                ? reportStatus[0].electric_test_details
                                    .peak_value
                                : null
                              : null
                            : null}
                          mA
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </div>
          </Box>
          <hr />
          <Box className="footer-btn-section">
            <button className="download-button">
              <img src={images.downloadPdf} />
              <span>Download</span>
            </button>
          </Box>
        </div>
      </div>
      <div className="modal-overlay" onClick={() => closeModal(false)}></div>
    </>
  );
};
export default ElectricTest;
