import React from "react";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import StatusList from "../../GlovesTracking/ElectricTestModal/StatusList";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import dayjs from "dayjs";

const FinalVisualInspection = ({ uidType, closeModal, reportStatus }) => {
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
                reportStatus[0].final_visual_inspection ? (
                  <button className="passed-button">Passed</button>
                ) : (
                  <button className="rejected-button">Rejected</button>
                )
              ) : null
            ) : null}
          </div>
          <div className="visual-title">Final Visual Inspection</div>

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
                                ? reportStatus[0]
                                    .final_visual_inspection_details
                                  ? reportStatus[0]
                                      .final_visual_inspection_details
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
                            ? reportStatus[0].final_visual_inspection_details
                              ? reportStatus[0].final_visual_inspection_details
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
                                ? reportStatus[0]
                                    .final_visual_inspection_details
                                  ? reportStatus[0]
                                      .final_visual_inspection_details
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
                            ? reportStatus[0].final_visual_inspection_details
                              ? reportStatus[0].final_visual_inspection_details
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
                            ? reportStatus[0].final_visual_inspection_details
                              ? reportStatus[0].final_visual_inspection_details
                                  .shift
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
                            ? reportStatus[0].final_visual_inspection_details
                              ? reportStatus[0].final_visual_inspection_details
                                  .rack_no
                              : null
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
              <ol className="status-list">
                <StatusList
                  title="Bubbles between fingers"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .bubbles_between_fingers
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Bubbles at fingertips"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .bubbles_at_fingertips
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Other position bubbles"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .other_position_bubbles
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Thin patch fingers"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .thin_patch_fingers
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Inclution (black spot)"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .inclusion_black_spot
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Thin patch between fingeri"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .thin_patch_between_fing
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Inside Crack"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .inside_crack
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Crease"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .crease
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Pinholes"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .pinholes
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Crack On Side"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .crack_on_side
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Air Pockets Impressions"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .air_pockets_impressions
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Particles"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .particles
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Crack defects between fingers"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .crack_defects_between_f
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Ripples"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .ripples
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Inner/Between(coat) split line"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .inside_between_coat_spl
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Drops of coagulant"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .drops_of_coagulant
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Bad gelation"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .bad_gelation
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Delamination"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .delamination
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Lack of coagulant"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .lack_of_coagulant
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Bad rolled edge"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .bad_rolled_edge
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Water Patch/Rod Patch"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .water_patch_rod_patch
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Inner side impression mark"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .inner_side_impression_m
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Pit mark"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .pit_mark
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Cissing"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .cissing
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Crack Defect ON Finger"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .crack_defect_on_finger
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Peel of fingertips"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .peel_of_fingertips
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Blister"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .blister
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Line"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details.line
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Split Line"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .split_line
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Inside bubbles at finger tips"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .inside_bubbles_at_fing
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Inside bubbles at other position"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .inside_bubbles_at_oth
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Webline bubbles"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .webline_bubbles
                          : null
                        : null
                      : null
                  }
                />
                <StatusList
                  title="Chlorination Patch"
                  status={
                    reportStatus
                      ? reportStatus[0]
                        ? reportStatus[0].final_visual_inspection_details
                          ? reportStatus[0].final_visual_inspection_details
                              .chlorination_patch
                          : null
                        : null
                      : null
                  }
                />
              </ol>
            </div>
          </Box>
          <hr />
          <div className="d-flex justify-content-between">
            <div style={{ marginTop: "19px" }}>
              {/* <div className='d-flex' style={{ marginTop: "19px" }}>
                                <div className="d-flex align-items-center" style={{ marginLeft: "30px" }}>
                                    Hold<span className="Hold m-1"></span>
                                </div>
                                <div className="d-flex align-items-center" style={{ marginLeft: "15px" }}>
                                    No Hold<span className="Hold m-1"></span>
                                </div>
                            </div> */}
              <div className="d-flex">
                <h6 style={{ marginTop: "12px", marginLeft: "30px" }}>
                  Other Defects :{" "}
                </h6>
                <h6 style={{ marginTop: "12px" }}>
                  {reportStatus
                    ? reportStatus[0]
                      ? reportStatus[0].final_visual_inspection_details
                        ? reportStatus[0].final_visual_inspection_details
                            .othere_defect
                        : null
                      : null
                    : null}
                </h6>
              </div>
            </div>
            <Box className="footer-btn-section">
              <button className="download-button">
                <PictureAsPdfIcon /> <span>Download</span>
              </button>
            </Box>
          </div>
        </div>
      </div>
      <div className="modal-overlay" onClick={() => closeModal(false)}></div>
    </>
  );
};

export default FinalVisualInspection;
