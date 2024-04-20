import React from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import "../../containers/GlovesTracking/ElectricTestModal/ElectricTestModal.css";
import StatusList from "../GlovesTracking/ElectricTestModal/StatusList";
import dayjs from "dayjs";
import Loader from "../../components/Loader/Loader";
import { images } from "../../config/images";

function FinalVisualModal({
  finalVisualReportData,
  setOpenModal,
  finalVisualRow,
}) {
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <div className="visualmodal-container">
        <div className="modal-header">
          <div className="modal-title-uid">
            <b>UID : </b>
            {finalVisualReportData.uid_type}
          </div>
          <div className="visual-title">Final Visual Inspection</div>

          <div
            onClick={() => setOpenModal(false)}
            style={{ cursor: "pointer" }}
          >
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
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Mfg Date :
                      </TableCell>
                      <TableCell>
                        {dayjs(finalVisualReportData.mfg_date).format(
                          "YYYY-MM-DD"
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Batch No :
                      </TableCell>
                      <TableCell>
                        {finalVisualReportData.batch_id_type}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Lot No :
                      </TableCell>
                      <TableCell>{finalVisualReportData.lot_number}</TableCell>
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
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Test Date :
                      </TableCell>
                      <TableCell>
                        {dayjs(finalVisualRow.fvi_date).format("YYYY-MM-DD")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Inspector Name :
                      </TableCell>
                      <TableCell>
                        {finalVisualReportData.inspector_name
                          ? finalVisualReportData.inspector_name
                          : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Shift :</TableCell>
                      <TableCell>
                        {finalVisualRow.fvi_test_tested_shift}
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
                      <TableCell sx={{ fontWeight: "bold" }}>Class :</TableCell>
                      <TableCell>{finalVisualRow.class_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Thickness :
                      </TableCell>
                      <TableCell>{finalVisualRow.thickness}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Size :</TableCell>
                      <TableCell>{finalVisualRow.size}</TableCell>
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
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Rack No :
                      </TableCell>
                      <TableCell>{finalVisualReportData.rack_no}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>R/L :</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Cuff :</TableCell>
                      <TableCell>{finalVisualReportData.cuff}</TableCell>
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
                  status={finalVisualReportData.bubbles_between_fingers}
                />
                <StatusList
                  title="Bubbles at fingertips"
                  status={finalVisualReportData.bubbles_at_fingertips}
                />
                <StatusList
                  title="Other position bubbles"
                  status={finalVisualReportData.other_position_bubbles}
                />
                <StatusList
                  title="Thin patch fingers"
                  status={finalVisualReportData.thin_patch_fingers}
                />
                <StatusList
                  title="Inclution (black spot)"
                  status={finalVisualReportData.inclusion_black_spot}
                />
                <StatusList
                  title="Thin patch between finger"
                  status={finalVisualReportData.thin_patch_between_fing}
                />
                <StatusList
                  title="Inside Crack"
                  status={finalVisualReportData.inside_crack}
                />
                <StatusList
                  title="Crease"
                  status={finalVisualReportData.crease}
                />
                <StatusList
                  title="Pinholes"
                  status={finalVisualReportData.pinholes}
                />
                <StatusList
                  title="Crack On Side"
                  status={finalVisualReportData.crack_on_side}
                />
                <StatusList
                  title="Air Pockets Impressions"
                  status={finalVisualReportData.air_pockets_impressions}
                />
                <StatusList
                  title="Particles"
                  status={finalVisualReportData.particles}
                />
                <StatusList
                  title="Crack defects between fingers"
                  status={finalVisualReportData.crack_defects_between_f}
                />
                <StatusList
                  title="Ripples"
                  status={finalVisualReportData.ripples}
                />
                <StatusList
                  title="Inner/Between(coat) split line"
                  status={finalVisualReportData.inside_between_coat_spl}
                />
                <StatusList
                  title="Drops of coagulant"
                  status={finalVisualReportData.drops_of_coagulant}
                />
                <StatusList
                  title="Bad gelation"
                  status={finalVisualReportData.bad_gelation}
                />
                <StatusList
                  title="Delamination"
                  status={finalVisualReportData.delamination}
                />
                <StatusList
                  title="Lack of coagulant"
                  status={finalVisualReportData.lack_of_coagulant}
                />
                <StatusList
                  title="Bad rolled edge"
                  status={finalVisualReportData.bad_rolled_edge}
                />
                <StatusList
                  title="Water Patch/Rod Patch"
                  status={finalVisualReportData.water_patch_rod_patch}
                />
                <StatusList
                  title="Inner side impression mark"
                  status={finalVisualReportData.inner_side_impression_m}
                />
                <StatusList
                  title="Pit mark"
                  status={finalVisualReportData.pit_mark}
                />
                <StatusList
                  title="Cissing"
                  status={finalVisualReportData.cissing}
                />
                <StatusList
                  title="Crack Defect ON Finger"
                  status={finalVisualReportData.crack_defect_on_finger}
                />
                <StatusList
                  title="Peel of fingertips"
                  status={finalVisualReportData.peel_of_fingertips}
                />
                <StatusList
                  title="Blister"
                  status={finalVisualReportData.blister}
                />
                <StatusList title="Line" status={finalVisualReportData.line} />
                <StatusList
                  title="Split Line"
                  status={finalVisualReportData.split_line}
                />
                <StatusList
                  title="Inside bubbles at finger tips"
                  status={finalVisualReportData.inside_bubbles_at_fing}
                />
                <StatusList
                  title="Inside bubbles at other position"
                  status={finalVisualReportData.inside_bubbles_at_oth}
                />
                <StatusList
                  title="Webline bubbles"
                  status={finalVisualReportData.webline_bubbles}
                />
                <StatusList
                  title="Chlorination Patch"
                  status={finalVisualReportData.chlorination_patch}
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
                  {" "}
                  {finalVisualReportData.othere_defect}
                </h6>
              </div>
            </div>
            {/* <Box className="footer-btn-section">
            <button className="download-button">
                <img src={images.downloadPdf} />
                <span>Download</span>
              </button>
            </Box> */}
          </div>
          {isLoading && <Loader />}
        </div>
      </div>
      <div className="modal-overlay" onClick={() => setOpenModal(false)}></div>
    </>
  );
}

export default FinalVisualModal;
