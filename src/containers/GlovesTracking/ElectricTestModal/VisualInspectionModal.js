import React, { useState, useMemo, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import "./ElectricTestModal.css";
import StatusList from "./StatusList";
import { useCubeQuery } from "@cubejs-client/react";
import dayjs from "dayjs";
import { visualInspectionReport } from "../services";
import { Card, CardContent } from "@material-ui/core";
import Loader from "../../../components/Loader/Loader";
import { images } from "../../../config/images";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function VisualInspectionModal({ closeModal, uidType, visual }) {
  const [downloadPdf, setDownloadPdf] = useState("");
  const [downloadModal, setDownloadModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const { userPermission } = useSelector((state) => state.userState);

  // useEffect(() => {
  //   if (downloadPdf) {
  //     fetch(downloadPdf)
  //       .then((response) => response.blob())
  //       .then((blob) => {
  //         const url = URL.createObjectURL(blob);
  //         const a = document.createElement("a");
  //         a.href = url;
  //         a.download = "Visual_Inspection_" + uidType + ".pdf";
  //         a.click();
  //       });
  //   }
  // }, [downloadPdf]);

  const handleDownload = async () => {
    setSuccessPopup(true);
    const params = {
      uid_type: uidType,
    };
    try {
      const resp = await visualInspectionReport(params);
      if (resp.data.success == true) {
        setTimeout(() => {
          setSuccessPopup(false)
        }, 5000);
        setDownloadPdf(resp.data.payload.visual_inspection_report);
      } else {
        console.log("Something was wrong, try again");
      }
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit", error);
    }
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
  const [result, setResult] = useState(null);

  const GlovesTrackingVisualinspection = useCubeQuery({
    dimensions: [
      "HomeUid.uidIdType",
      "HomeBatch.batchType",
      "HomeBatch.scre",
      "HomeBatch.lotNumber",
      "HomeClass.className",
      "HomeSize.sizeName",
      "HomeBatch.createdAt",
      "GlovesTrackingVisualinspection.bubblesBetweenFingers",
      "GlovesTrackingVisualinspection.bubblesAtFingertips",
      "GlovesTrackingVisualinspection.otherPositionBubbles",
      "GlovesTrackingVisualinspection.thinPatchFingers",
      "GlovesTrackingVisualinspection.thinPatchCrutch",
      "GlovesTrackingVisualinspection.thinPatchBetweenFinger",
      "GlovesTrackingVisualinspection.insideCrackDefect",
      "GlovesTrackingVisualinspection.crease",
      "GlovesTrackingVisualinspection.pinholesFingertips",
      "GlovesTrackingVisualinspection.pinholesOtherPositions",
      "GlovesTrackingVisualinspection.wetCoagulantFingertips",
      "GlovesTrackingVisualinspection.particles",
      "GlovesTrackingVisualinspection.crackDefectsBetweenFingers",
      "GlovesTrackingVisualinspection.ripplesOnFingers",
      "GlovesTrackingVisualinspection.ripplesOnOtherPositions",
      "GlovesTrackingVisualinspection.innerBetweenCoatSplitLine",
      "GlovesTrackingVisualinspection.dropsOfCoagulant",
      "GlovesTrackingVisualinspection.badGelation",
      "GlovesTrackingVisualinspection.badGelationOfFingerSide",
      "GlovesTrackingVisualinspection.delamination",
      "GlovesTrackingVisualinspection.lackOfCoagulant",
      "GlovesTrackingVisualinspection.badRolledEdge",
      "GlovesTrackingVisualinspection.crackDefectsOnFingers",
      "GlovesTrackingVisualinspection.innerSideImpressionMark",
      "GlovesTrackingVisualinspection.pitMark",
      "GlovesTrackingVisualinspection.cissing",
      "GlovesTrackingVisualinspection.latexRunsAtFingertips",
      "GlovesTrackingVisualinspection.coagulantFoam",
      "GlovesTrackingVisualinspection.peelOfFingertips",
      "GlovesTrackingVisualinspection.blister",
      "GlovesTrackingVisualinspection.line",
      "GlovesTrackingVisualinspection.splitLine",
      "GlovesTrackingVisualinspection.insideBubblesAtFingerTips",
      "GlovesTrackingVisualinspection.insideBubblesAtOtherPosi",
      "GlovesTrackingVisualinspection.insideBubblesBetweenFinger",
      "GlovesTrackingVisualinspection.weblineBubbles",
      "GlovesTrackingVisualinspection.otherDefectHoldNohold",
      "GlovesTrackingVisualinspection.rOrL",
      "GlovesTrackingVisualinspection.inspectorName",
      "GlovesTrackingVisualinspection.thickness",
      "GlovesTrackingVisualinspection.rackNo",
      "GlovesTrackingVisualinspection.othereDefect",
      "GlovesTrackingVisualinspection.modifiedAt",
      "HomeShift.shiftName",
      "GlovesTrackingVisualinspection.defects",
    ],
    filters: [
      {
        member: "HomeUid.uidIdType",
        operator: "equals",
        values: [`${uidType}`],
      },
    ],
  });

  useMemo(() => {
    if (GlovesTrackingVisualinspection.resultSet) {
      const data = GlovesTrackingVisualinspection.resultSet.tablePivot();
      const array = {
        bubblesBetweenFingers:
          data[0]["GlovesTrackingVisualinspection.bubblesBetweenFingers"],
        bubblesAtFingertips:
          data[0]["GlovesTrackingVisualinspection.bubblesAtFingertips"],
        otherPositionBubbles:
          data[0]["GlovesTrackingVisualinspection.otherPositionBubbles"],
        thinPatchFingers:
          data[0]["GlovesTrackingVisualinspection.thinPatchFingers"],
        thinPatchCrutch:
          data[0]["GlovesTrackingVisualinspection.thinPatchCrutch"],
        thinPatchBetweenFinger:
          data[0]["GlovesTrackingVisualinspection.thinPatchBetweenFinger"],
        insideCrackDefect:
          data[0]["GlovesTrackingVisualinspection.insideCrackDefect"],
        crease: data[0]["GlovesTrackingVisualinspection.crease"],
        pinholesFingertips:
          data[0]["GlovesTrackingVisualinspection.pinholesFingertips"],
        pinholesOtherPositions:
          data[0]["GlovesTrackingVisualinspection.pinholesOtherPositions"],
        wetCoagulantFingertips:
          data[0]["GlovesTrackingVisualinspection.wetCoagulantFingertips"],
        particles: data[0]["GlovesTrackingVisualinspection.particles"],
        crackDefectsBetweenFingers:
          data[0]["GlovesTrackingVisualinspection.crackDefectsBetweenFingers"],
        innerSideImpressionMark:
          data[0]["GlovesTrackingVisualinspection.innerSideImpressionMark"],
        pitMark: data[0]["GlovesTrackingVisualinspection.pitMark"],
        cissing: data[0]["GlovesTrackingVisualinspection.cissing"],
        latexRunsAtFingertips:
          data[0]["GlovesTrackingVisualinspection.latexRunsAtFingertips"],
        coagulantFoam: data[0]["GlovesTrackingVisualinspection.coagulantFoam"],
        peelOfFingertips:
          data[0]["GlovesTrackingVisualinspection.peelOfFingertips"],
        blister: data[0]["GlovesTrackingVisualinspection.blister"],
        line: data[0]["GlovesTrackingVisualinspection.line"],
        splitLine: data[0]["GlovesTrackingVisualinspection.splitLine"],
        insideBubblesAtFingerTips:
          data[0]["GlovesTrackingVisualinspection.insideBubblesAtFingerTips"],
        weblineBubbles:
          data[0]["GlovesTrackingVisualinspection.weblineBubbles"],
        otherDefectHoldNohold:
          data[0]["GlovesTrackingVisualinspection.otherDefectHoldNohold"],
        rorL: data[0]["GlovesTrackingVisualinspection.rOrL"],
        inspectorName: data[0]["GlovesTrackingVisualinspection.inspectorName"],
        batchType: data[0]["HomeBatch.batchType"],
        thickness: data[0]["GlovesTrackingVisualinspection.thickness"],
        scre: data[0]["HomeBatch.scre"],
        lotNumber: data[0]["HomeBatch.lotNumber"],
        className: data[0]["HomeClass.className"],
        sizeName: data[0]["HomeSize.sizeName"],
        createdAt: data[0]["HomeBatch.createdAt"],
        rackNo: data[0]["GlovesTrackingVisualinspection.rackNo"],
        othereDefect: data[0]["GlovesTrackingVisualinspection.othereDefect"],
        badGelation: data[0]["GlovesTrackingVisualinspection.badGelation"],
        badGelationOfFingerSide:
          data[0]["GlovesTrackingVisualinspection.badGelationOfFingerSide"],
        ripplesOnFingers:
          data[0]["GlovesTrackingVisualinspection.ripplesOnFingers"],
        ripplesOnOtherPositions:
          data[0]["GlovesTrackingVisualinspection.ripplesOnOtherPositions"],
        innerBetweenCoatSplitLine:
          data[0]["GlovesTrackingVisualinspection.innerBetweenCoatSplitLine"],
        dropsOfCoagulant:
          data[0]["GlovesTrackingVisualinspection.dropsOfCoagulant"],
        delamination: data[0]["GlovesTrackingVisualinspection.delamination"],
        lackOfCoagulant:
          data[0]["GlovesTrackingVisualinspection.lackOfCoagulant"],
        badRolledEdge: data[0]["GlovesTrackingVisualinspection.badRolledEdge"],
        crackDefectsOnFingers:
          data[0]["GlovesTrackingVisualinspection.crackDefectsOnFingers"],
        insideBubblesBetweenFinger:
          data[0]["GlovesTrackingVisualinspection.insideBubblesBetweenFinger"],
        insideBubblesAtOtherPosi:
          data[0]["GlovesTrackingVisualinspection.insideBubblesAtOtherPosi"],
        modifiedAt: data[0]["GlovesTrackingVisualinspection.modifiedAt"],
        shiftName: data[0]["HomeShift.shiftName"],
        defects: data[0]["GlovesTrackingVisualinspection.defects"],
      };
      setResult(array);
    }
  }, [GlovesTrackingVisualinspection.resultSet]);

  return (
    <>
      <div className="visualmodal-container">
        <ToastContainer />
        <div className="modal-header">
          <div className="modal-title-uid">
            <b>UID : </b>
            {uidType}
            {visual ? (
              <button className="passed-button">Passed</button>
            ) : (
              <button className="rejected-button">Rejected</button>
            )}
          </div>
          <div className="visual-title">Visual Inspection</div>

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
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Mfg Date:
                      </TableCell>
                      <TableCell>
                        {result
                          ? dayjs(result.createdAt).format("YYYY-MM-DD")
                          : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Batch No:
                      </TableCell>
                      <TableCell>{result ? result.batchType : null}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Lot No:</TableCell>
                      <TableCell>{result ? result.lotNumber : null}</TableCell>
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
                        Test Date:
                      </TableCell>
                      <TableCell>
                        {result
                          ? dayjs(result.modifiedAt).format("YYYY-MM-DD")
                          : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Inspector Name:
                      </TableCell>
                      <TableCell>
                        {result ? result.inspectorName : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Shift:</TableCell>
                      <TableCell>{result ? result.shiftName : null}</TableCell>
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
                      <TableCell sx={{ fontWeight: "bold" }}>Class:</TableCell>
                      <TableCell>{result ? result.className : null}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Thickness:
                      </TableCell>
                      <TableCell>{result ? result.thickness : null}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Size:</TableCell>
                      <TableCell>{result ? result.sizeName : null}</TableCell>
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
                        Rack No:
                      </TableCell>
                      <TableCell>{result ? result.rackNo : null}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>R/L:</TableCell>
                      <TableCell>{result ? result.rorL : null}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Cuff:</TableCell>
                      <TableCell>{result ? result.scre : null}</TableCell>
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
                  status={result ? result.bubblesBetweenFingers : null}
                />
                <StatusList
                  title="Bubbles at fingertips"
                  status={result ? result.bubblesAtFingertips : null}
                />
                <StatusList
                  title="Other position bubbles"
                  status={result ? result.otherPositionBubbles : null}
                />
                <StatusList
                  title="Thin patch fingers"
                  status={result ? result.thinPatchFingers : null}
                />
                <StatusList
                  title="Thin patch crutch"
                  status={result ? result.thinPatchCrutch : null}
                />
                <StatusList
                  title="Thin patch between finger"
                  status={result ? result.thinPatchBetweenFinger : null}
                />
                <StatusList
                  title="Inside crack defect"
                  status={result ? result.insideCrackDefect : null}
                />
                <StatusList
                  title="Crease"
                  status={result ? result.crease : null}
                />
                <StatusList
                  title="Pinholes fingertips"
                  status={result ? result.pinholesFingertips : null}
                />
                <StatusList
                  title="Pinholes other positions"
                  status={result ? result.pinholesOtherPositions : null}
                />
                <StatusList
                  title="Wet coagulant fingertips"
                  status={result ? result.wetCoagulantFingertips : null}
                />
                <StatusList
                  title="Particles"
                  status={result ? result.particles : null}
                />
                <StatusList
                  title="Crack defects between fingers"
                  status={result ? result.crackDefectsBetweenFingers : null}
                />
                <StatusList
                  title="Ripples on fingers"
                  status={result ? result.ripplesOnFingers : null}
                />
                <StatusList
                  title="Ripples on other positions"
                  status={result ? result.ripplesOnOtherPositions : null}
                />
                <StatusList
                  title="Inner/Between(coat) split line"
                  status={result ? result.innerBetweenCoatSplitLine : null}
                />
                <StatusList
                  title="Drops of coagulant"
                  status={result ? result.dropsOfCoagulant : null}
                />
                <StatusList
                  title="Bad gelation"
                  status={result ? result.badGelation : null}
                />
                <StatusList
                  title="Bad gelation of finger side"
                  status={result ? result.badGelationOfFingerSide : null}
                />
                <StatusList
                  title="Delamination"
                  status={result ? result.delamination : null}
                />
                <StatusList
                  title="Lack of coagulant"
                  status={result ? result.lackOfCoagulant : null}
                />
                <StatusList
                  title="Bad rolled edge"
                  status={result ? result.badRolledEdge : null}
                />
                <StatusList
                  title="Crack defects ON fingers"
                  status={result ? result.crackDefectsOnFingers : null}
                />
                <StatusList
                  title="Inner side impression mark"
                  status={result ? result.innerSideImpressionMark : null}
                />
                <StatusList
                  title="Pit mark"
                  status={result ? result.pitMark : null}
                />
                <StatusList
                  title="Cissing"
                  status={result ? result.cissing : null}
                />
                <StatusList
                  title="Latex runs at fingertips"
                  status={result ? result.latexRunsAtFingertips : null}
                />
                <StatusList
                  title="Coagulant foam"
                  status={result ? result.coagulantFoam : null}
                />
                <StatusList
                  title="Peel of fingertips"
                  status={result ? result.peelOfFingertips : null}
                />
                <StatusList
                  title="Blister"
                  status={result ? result.blister : null}
                />
                <StatusList title="Line" status={result ? result.line : null} />
                <StatusList
                  title="Split Line"
                  status={result ? result.splitLine : null}
                />
                <StatusList
                  title="Inside bubbles at finger tips"
                  status={result ? result.insideBubblesAtFingerTips : null}
                />
                <StatusList
                  title="Inside bubbles at other position"
                  status={result ? result.insideBubblesAtOtherPosi : null}
                />
                <StatusList
                  title="Inside bubbles between finger"
                  status={result ? result.insideBubblesBetweenFinger : null}
                />
                <StatusList
                  title="Webline bubbles"
                  status={result ? result.weblineBubbles : null}
                />
              </ol>
            </div>
          </Box>
          <hr />
          <div className="d-flex justify-content-between">
            <div>
              <div className="d-flex" style={{ marginTop: "19px" }}>
                <div
                  className="d-flex align-items-center"
                  style={{ marginLeft: "30px", fontWeight: 500 }}
                >
                  Hold
                  <span
                    className={`${
                      result?.defects == "Hold" ? "Holdbtn" : "pen"
                    } m-1`}
                  ></span>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ marginLeft: "15px", fontWeight: 500 }}
                >
                  Minor Fault
                  <span
                    className={`${
                      result?.defects == "Minor Fault" ? "NoHold" : "pen"
                    } m-1`}
                  ></span>
                </div>
              </div>
              <div className="d-flex">
                <h6 style={{ marginTop: "12px", marginLeft: "30px" }}>
                  Other Defects :{" "}
                </h6>
                <h6 style={{ marginTop: "12px" }}>
                  {result ? result.othereDefect : null}
                </h6>
              </div>
            </div>
            {userPermission.find(
                        (permission) => permission.module === "Gloves Tracking").is_editor == true &&
           userPermission.find(
          (permission) => permission.module === "Gloves Tracking"
        ) .is_viewer == true ?
            <Box className="footer-btn-section">
              <button
                className="download-button"
                onClick={() => handleDownload()}
              >
                <img src={images.downloadPdf} />
                <span>Download</span>
              </button>
            </Box>
            :
            <Box className="footer-btn-section">
            <button
              className="download-button"
              onClick={() => handleToastMsg()}
            >
              <img src={images.downloadPdf} />
              <span>Download</span>
            </button>
          </Box>
            }
          </div>
          {isLoading && <Loader />}
          {successPopup && (
        <>
          <div className="sendingData">
            <Card className="card-printer">
              <CardContent>
                <h4 className="card-content">
                <b>Email Sent to Your Mailbox! <img src={require("../../../assets/images/correctIcon.png")} style={{height:"25px", width:"25px"}}/></b>
                </h4>
              </CardContent>
            </Card>
          </div>
          <div className="sending-uid-overlay" on></div>
        </>
      )}
        </div>
      </div>
      <div className="modal-overlay" onClick={() => closeModal(false)}></div>
      
      {downloadModal && (
        <>
          <div className="sendingData">
            <Card className="card-printer">
              <CardContent>
                <h4 className="card-content">
                  <b>Downloading PDF..</b>
                </h4>
              </CardContent>
            </Card>
          </div>
          <div className="sending-uid-overlay"></div>
        </>
      )}
    </>
  );
}

export default VisualInspectionModal;
