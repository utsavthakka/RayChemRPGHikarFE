import React from "react";
import { useState } from "react";
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
import { useMemo } from "react";
import dayjs from "dayjs";
import { finalVisualInspectionReport } from "../services";
import { useEffect } from "react";
import Loader from "../../../components/Loader/Loader";
import { images } from "../../../config/images";
import { Card, CardContent } from "@material-ui/core";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function FinalVisualInspectionModal({
  closeModal,
  uidType,
  finalVisual,
  rorl,
  thicknessvalue,
}) {
  const [result, setResult] = useState(null);
  const [visualResult, setVisualResult] = useState(null);
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
  //         a.download = "Final_Visual_Inspection_" + uidType + ".pdf";
  //         a.click();
  //       });
  //   }
  // }, [downloadPdf]);

  const handleDownload = async () => {
    setSuccessPopup(true)
    const params = {
      uid_type: uidType,
    };
    try {
      const resp = await finalVisualInspectionReport(params);
      setDownloadModal(true);
      if (resp.data.success == true) {
        setTimeout(() => {
          setSuccessPopup(false)
        }, 5000);
        setDownloadPdf(resp.data.payload.final_visual_inspection_report);
      }
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit", error);
    }
  };

  const GlovesTrackingFinalvisualinspection = useCubeQuery({
    dimensions: [
      "HomeUid.uidIdType",
      "HomeBatch.batchType",
      "HomeBatch.scre",
      "HomeBatch.lotNumber",
      "HomeClass.className",
      "HomeSize.sizeName",
      "HomeBatch.createdAt",
      "GlovesTrackingFinalvisualinspection.inspectorName",
      "GlovesTrackingFinalvisualinspection.othereDefect",
      "GlovesTrackingFinalvisualinspection.modifiedAt",
      "HomeShift.shiftName",
      "GlovesTrackingFinalvisualinspection.bubblesBetweenFingers",
      "GlovesTrackingFinalvisualinspection.bubblesAtFingertips",
      "GlovesTrackingFinalvisualinspection.otherPositionBubbles",
      "GlovesTrackingFinalvisualinspection.thinPatchFingers",
      "GlovesTrackingFinalvisualinspection.inclusionBlackSpot",
      "GlovesTrackingFinalvisualinspection.thinPatchBetweenFing",
      "GlovesTrackingFinalvisualinspection.insideCrack",
      "GlovesTrackingFinalvisualinspection.crease",
      "GlovesTrackingFinalvisualinspection.pinholes",
      "GlovesTrackingFinalvisualinspection.crackOnSide",
      "GlovesTrackingFinalvisualinspection.airPocketsImpressions",
      "GlovesTrackingFinalvisualinspection.particles",
      "GlovesTrackingFinalvisualinspection.crackDefectsBetweenF",
      "GlovesTrackingFinalvisualinspection.ripples",
      "GlovesTrackingFinalvisualinspection.insideBetweenCoatSpl",
      "GlovesTrackingFinalvisualinspection.dropsOfCoagulant",
      "GlovesTrackingFinalvisualinspection.badGelation",
      "GlovesTrackingFinalvisualinspection.delamination",
      "GlovesTrackingFinalvisualinspection.lackOfCoagulant",
      "GlovesTrackingFinalvisualinspection.badRolledEdge",
      "GlovesTrackingFinalvisualinspection.waterPatchRodPatch",
      "GlovesTrackingFinalvisualinspection.innerSideImpressionM",
      "GlovesTrackingFinalvisualinspection.pitMark",
      "GlovesTrackingFinalvisualinspection.cissing",
      "GlovesTrackingFinalvisualinspection.crackDefectOnFinger",
      "GlovesTrackingFinalvisualinspection.peelOfFingertips",
      "GlovesTrackingFinalvisualinspection.blister",
      "GlovesTrackingFinalvisualinspection.line",
      "GlovesTrackingFinalvisualinspection.splitLine",
      "GlovesTrackingFinalvisualinspection.insideBubblesAtFing",
      "GlovesTrackingFinalvisualinspection.insideBubblesAtOth",
      "GlovesTrackingFinalvisualinspection.weblineBubbles",
      "GlovesTrackingFinalvisualinspection.chlorinationPatch",
    ],
    filters: [
      {
        member: "HomeUid.uidIdType",
        operator: "equals",
        values: [`${uidType}`],
      },
    ],
  });

  const GlovesTrackingVisualizationResult = useCubeQuery({
    dimensions: [
      "HomeUid.uidIdType",
      "GlovesTrackingVisualinspection.bubblesBetweenFingers",
      "GlovesTrackingVisualinspection.rOrL",
      "GlovesTrackingVisualinspection.thickness",
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
    if (GlovesTrackingFinalvisualinspection.resultSet) {
      const data = GlovesTrackingFinalvisualinspection.resultSet.tablePivot();
      const array = {
        bubblesBetweenFingers:
          data[0]["GlovesTrackingFinalvisualinspection.bubblesBetweenFingers"],
        bubblesAtFingertips:
          data[0]["GlovesTrackingFinalvisualinspection.bubblesAtFingertips"],
        otherPositionBubbles:
          data[0]["GlovesTrackingFinalvisualinspection.otherPositionBubbles"],
        thinPatchFingers:
          data[0]["GlovesTrackingFinalvisualinspection.thinPatchFingers"],
        inclusionBlackSpot:
          data[0]["GlovesTrackingFinalvisualinspection.inclusionBlackSpot"],
        thinPatchBetweenFinger:
          data[0]["GlovesTrackingFinalvisualinspection.thinPatchBetweenFing"],
        insideCrackDefect:
          data[0]["GlovesTrackingFinalvisualinspection.insideCrack"],
        crease: data[0]["GlovesTrackingFinalvisualinspection.crease"],
        pinholes: data[0]["GlovesTrackingFinalvisualinspection.pinholes"],
        crackOnSide: data[0]["GlovesTrackingFinalvisualinspection.crackOnSide"],
        airPocketsImpressions:
          data[0]["GlovesTrackingFinalvisualinspection.airPocketsImpressions"],
        particles: data[0]["GlovesTrackingFinalvisualinspection.particles"],
        crackDefectsBetweenFingers:
          data[0]["GlovesTrackingFinalvisualinspection.crackDefectsBetweenF"],
        ripples: data[0]["GlovesTrackingFinalvisualinspection.ripples"],
        innerSplitLine:
          data[0]["GlovesTrackingFinalvisualinspection.insideBetweenCoatSpl"],
        dropCoagulant:
          data[0]["GlovesTrackingFinalvisualinspection.dropsOfCoagulant"],
        badGelation: data[0]["GlovesTrackingFinalvisualinspection.badGelation"],
        delamination:
          data[0]["GlovesTrackingFinalvisualinspection.delamination"],
        lackCoagulant:
          data[0]["GlovesTrackingFinalvisualinspection.lackOfCoagulant"],
        badrolledEdge:
          data[0]["GlovesTrackingFinalvisualinspection.badRolledEdge"],
        waterPatch:
          data[0]["GlovesTrackingFinalvisualinspection.waterPatchRodPatch"],
        impressionMark:
          data[0]["GlovesTrackingFinalvisualinspection.innerSideImpressionM"],
        pitMark: data[0]["GlovesTrackingFinalvisualinspection.pitMark"],
        cissing: data[0]["GlovesTrackingFinalvisualinspection.cissing"],
        crackDefectFinger:
          data[0]["GlovesTrackingFinalvisualinspection.crackDefectOnFinger"],
        peelFingertips:
          data[0]["GlovesTrackingFinalvisualinspection.peelOfFingertips"],
        blister: data[0]["GlovesTrackingFinalvisualinspection.blister"],
        line: data[0]["GlovesTrackingFinalvisualinspection.line"],
        splitLine: data[0]["GlovesTrackingFinalvisualinspection.splitLine"],
        insideBubblesFingertips:
          data[0]["GlovesTrackingFinalvisualinspection.insideBubblesAtFing"],
        insidebubblesatotherPosition:
          data[0]["GlovesTrackingFinalvisualinspection.insideBubblesAtOth"],
        weblineBubbles:
          data[0]["GlovesTrackingFinalvisualinspection.weblineBubbles"],
        chlorinationPatch:
          data[0]["GlovesTrackingFinalvisualinspection.chlorinationPatch"],
        modifiedAt: data[0]["GlovesTrackingFinalvisualinspection.modifiedAt"],
        shiftName: data[0]["HomeShift.shiftName"],
        inspectorName:
          data[0]["GlovesTrackingFinalvisualinspection.inspectorName"],
        batchType: data[0]["HomeBatch.batchType"],
        scre: data[0]["HomeBatch.scre"],
        lotNumber: data[0]["HomeBatch.lotNumber"],
        className: data[0]["HomeClass.className"],
        sizeName: data[0]["HomeSize.sizeName"],
        createdAt: data[0]["HomeBatch.createdAt"],
        othereDefect:
          data[0]["GlovesTrackingFinalvisualinspection.othereDefect"],
      };
      setResult(array);
    }
  }, [GlovesTrackingFinalvisualinspection.resultSet]);

  useMemo(() => {
    if (GlovesTrackingVisualizationResult.resultSet) {
      const data2 = GlovesTrackingVisualizationResult.resultSet.tablePivot();
      const GloveVisualInpection = data2.map((_element, index) => {
        return {
          uId_type: data2[index]["HomeUid.uidIdType"],
          bubblesBetweenFingers:
            data2[index][
              "GlovesTrackingVisualinspection.bubblesBetweenFingers"
            ],
          rOrL: data2[index]["GlovesTrackingVisualinspection.rOrL"],
          thickness: data2[index]["GlovesTrackingVisualinspection.thickness"],
        };
      });
      setVisualResult(GloveVisualInpection);
    }
  }, [GlovesTrackingVisualizationResult.resultSet]);

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

  return (
    <>
      <div className="visualmodal-container">
        <ToastContainer />
        <div className="modal-header">
          <div className="modal-title-uid">
            <b>UID : </b>
            {uidType}
            {finalVisual ? (
              <button className="passed-button">Passed</button>
            ) : (
              <button className="rejected-button">Rejected</button>
            )}
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
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Mfg Date :
                      </TableCell>
                      <TableCell>
                        {result
                          ? dayjs(result.createdAt).format("YYYY-MM-DD")
                          : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Batch No :
                      </TableCell>
                      <TableCell>{result ? result.batchType : null}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Lot No :
                      </TableCell>
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
                        Test Date :
                      </TableCell>
                      <TableCell>
                        {result
                          ? dayjs(result.modifiedAt).format("YYYY-MM-DD")
                          : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Inspector Name :
                      </TableCell>
                      <TableCell>
                        {result ? result.inspectorName : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Shift :</TableCell>
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
                      <TableCell sx={{ fontWeight: "bold" }}>Class :</TableCell>
                      <TableCell>{result ? result.className : null}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Thickness :
                      </TableCell>
                      <TableCell>
                        {visualResult
                          ? visualResult[0]
                            ? visualResult[0].thickness
                            : "--"
                          : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Size :</TableCell>
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
                        Rack No :
                      </TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>R/L :</TableCell>
                      <TableCell>
                        {visualResult
                          ? visualResult[0]
                            ? visualResult[0].rOrL
                            : "--"
                          : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Cuff :</TableCell>
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
                  title="Inclution (black spot)"
                  status={result ? result.inclusionBlackSpot : null}
                />
                <StatusList
                  title="Thin patch between fingeri"
                  status={result ? result.thinPatchBetweenFinger : null}
                />
                <StatusList
                  title="Inside Crack"
                  status={result ? result.insideCrackDefect : null}
                />
                <StatusList
                  title="Crease"
                  status={result ? result.crease : null}
                />
                <StatusList
                  title="Pinholes"
                  status={result ? result.pinholes : null}
                />
                <StatusList
                  title="Crack On Side"
                  status={result ? result.crackOnSide : null}
                />
                <StatusList
                  title="Air Pockets Impressions"
                  status={result ? result.airPocketsImpressions : null}
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
                  title="Ripples"
                  status={result ? result.ripples : null}
                />
                <StatusList
                  title="Inner/Between(coat) split line"
                  status={result ? result.innerSplitLine : null}
                />
                <StatusList
                  title="Drops of coagulant"
                  status={result ? result.dropCoagulant : null}
                />
                <StatusList
                  title="Bad gelation"
                  status={result ? result.badGelation : null}
                />
                <StatusList
                  title="Delamination"
                  status={result ? result.delamination : null}
                />
                <StatusList
                  title="Lack of coagulant"
                  status={result ? result.lackCoagulant : null}
                />
                <StatusList
                  title="Bad rolled edge"
                  status={result ? result.badrolledEdge : null}
                />
                <StatusList
                  title="Water Patch/Rod Patch"
                  status={result ? result.waterPatch : null}
                />
                <StatusList
                  title="Inner side impression mark"
                  status={result ? result.impressionMark : null}
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
                  title="Crack Defect ON Finger"
                  status={result ? result.crackDefectFinger : null}
                />
                <StatusList
                  title="Peel of fingertips"
                  status={result ? result.peelFingertips : null}
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
                  status={result ? result.insideBubblesFingertips : null}
                />
                <StatusList
                  title="Inside bubbles at other position"
                  status={result ? result.insidebubblesatotherPosition : null}
                />
                <StatusList
                  title="Webline bubbles"
                  status={result ? result.weblineBubbles : null}
                />
                <StatusList
                  title="Chlorination Patch"
                  status={result ? result.chlorinationPatch : null}
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
                  {result ? result.othereDefect : null}
                </h6>
              </div>
            </div>
            <Box className="footer-btn-section">
            {userPermission.find(
                        (permission) => permission.module === "Gloves Tracking").is_editor == true &&
           userPermission.find(
          (permission) => permission.module === "Gloves Tracking"
        ) .is_viewer == true ?
              <button
                className="download-button"
                onClick={() => handleDownload()}
              >
                <img src={images.downloadPdf} />
                <span>Download</span>
              </button>
              :
              <button
              className="download-button"
              onClick={() => handleToastMsg()}
            >
              <img src={images.downloadPdf} />
              <span>Download</span>
            </button>}
            </Box>
          </div>
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
          {isLoading && <Loader />}
        </div>
      </div>
      <div className="modal-overlay" onClick={() => closeModal(false)}></div>
    </>
  );
}

export default FinalVisualInspectionModal;
