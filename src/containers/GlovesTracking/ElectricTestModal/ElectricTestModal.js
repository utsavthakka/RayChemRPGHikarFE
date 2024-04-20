import React, { useState, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import "./ElectricTestModal.css";
import { useCubeQuery } from "@cubejs-client/react";
import dayjs from "dayjs";
import { electricTestReport } from "../services";
import { useEffect } from "react";
import Loader from "../../../components/Loader/Loader";
import { images } from "../../../config/images";
import { Card, CardContent } from "@material-ui/core";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function ElectricTestModal({
  closeModal,
  uidType,
  electric,
  rorl,
  thicknessvalue,
}) {
  // Initialize state variables
  const [result, setResult] = useState(null);
  const [visualResult, setVisualResult] = useState(null);
  const [downloadPdf, setDownloadPdf] = useState("");
  const [downloadModal, setDownloadModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const { userPermission } = useSelector((state) => state.userState);

  // useEffect(() => {
  //   // Use useEffect hook to download the PDF when the downloadPdf state variable changes
  //   if (downloadPdf) {
  //     fetch(downloadPdf)
  //       .then((response) => response.blob())
  //       .then((blob) => {
  //         const url = URL.createObjectURL(blob);
  //         const a = document.createElement("a");
  //         a.href = url;
  //         a.download = "Electric_Test_" + uidType + ".pdf";
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
      const resp = await electricTestReport(params);
      setDownloadModal(true);
      if (resp.data.success == true) {
        setTimeout(() => {
          setSuccessPopup(false)
        }, 5000);
        setLoading(false);
        setDownloadPdf(resp.data.payload.electric_test_report); // Set downloadPdf state variable to the URL of the report
      }
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit", error);
    }
  };

  // This is a comment explaining the purpose of the GlovesTrackingElectricTest variable
  const GlovesTrackingElectricTest = useCubeQuery({
    dimensions: [
      // These are the dimensions used in the query
      "HomeUid.uidIdType",
      "HomeBatch.batchType",
      "HomeShift.shiftName",
      "GlovesTrackingElectrictest.inspectorName",
      "HomeBatch.scre",
      "HomeBatch.lotNumber",
      "HomeClass.className",
      "HomeSize.sizeName",
      "HomeBatch.createdAt",
      "GlovesTrackingElectrictest.machineSettingKv",
      "GlovesTrackingElectrictest.timer",
      "GlovesTrackingElectrictest.maxLeakMa",
      "GlovesTrackingElectrictest.std",
      "GlovesTrackingElectrictest.temp",
      "GlovesTrackingElectrictest.humidity",
      "GlovesTrackingElectrictest.conductivity",
      "GlovesTrackingElectrictest.testDataKv",
      "GlovesTrackingElectrictest.peakValue",
      "GlovesTrackingElectrictest.modifiedAt",
      "GlovesTrackingElectrictest.slot",
    ],

    filters: [
      {
        // This is the filter used in the query
        member: "HomeUid.uidIdType",
        operator: "equals",
        values: [`${uidType}`],
      },
    ],
  });

  // Define a Cube.js query for GlovesTrackingVisualizationResult
  const GlovesTrackingVisualizationResult = useCubeQuery({
    // Specify the dimensions to retrieve from the cube
    dimensions: [
      "HomeUid.uidIdType",
      "GlovesTrackingVisualinspection.bubblesBetweenFingers",
      "GlovesTrackingVisualinspection.rOrL",
      "GlovesTrackingVisualinspection.thickness",
    ],
    // Specify the filters to apply to the query
    filters: [
      {
        member: "HomeUid.uidIdType",
        operator: "equals",
        values: [`${uidType}`],
      },
    ],
  });
  useMemo(() => {
    if (GlovesTrackingElectricTest.resultSet) {
      const data = GlovesTrackingElectricTest.resultSet.tablePivot();
      const array = {
        uidIdType: data[0]["HomeUid.uidIdType"],
        inspectorName: data[0]["GlovesTrackingElectrictest.inspectorName"],
        batchType: data[0]["HomeBatch.batchType"],
        scre: data[0]["HomeBatch.scre"],
        lotNumber: data[0]["HomeBatch.lotNumber"],
        className: data[0]["HomeClass.className"],
        sizeName: data[0]["HomeSize.sizeName"],
        createdAt: data[0]["HomeBatch.createdAt"],
        shiftName: data[0]["HomeShift.shiftName"],
        machineSettingKv:
          data[0]["GlovesTrackingElectrictest.machineSettingKv"],
        timer: data[0]["GlovesTrackingElectrictest.timer"],
        maxLeakMa: data[0]["GlovesTrackingElectrictest.maxLeakMa"],
        std: data[0]["GlovesTrackingElectrictest.std"],
        temp: data[0]["GlovesTrackingElectrictest.temp"],
        humidity: data[0]["GlovesTrackingElectrictest.humidity"],
        conductivity: data[0]["GlovesTrackingElectrictest.conductivity"],
        testDatakv: data[0]["GlovesTrackingElectrictest.testDataKv"],
        peakValue: data[0]["GlovesTrackingElectrictest.peakValue"],
        modifiedAt: data[0]["GlovesTrackingElectrictest.modifiedAt"],
        scre: data[0]["HomeBatch.scre"],
        slot: data[0]["GlovesTrackingElectrictest.slot"],
      };
      setResult(array);
    }
  }, [GlovesTrackingElectricTest.resultSet]);

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
            {result ? result.uidIdType : null}
            {electric ? (
              <button className="passed-button">Passed</button>
            ) : (
              <button className="rejected-button">Rejected</button>
            )}
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
                        <TableCell
                          sx={{ fontWeight: "bold" }}
                          className="machinekv"
                        >
                          kV :
                        </TableCell>
                        <TableCell>
                          {result ? result.machineSettingKv : null} kVAC
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
                          Timer :
                        </TableCell>
                        <TableCell>
                          {result ? result.timer : null} Sec
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
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Max Leak mA :
                        </TableCell>
                        <TableCell>
                          {result ? result.maxLeakMa : null} mA
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
                        <TableCell sx={{ fontWeight: "bold" }}>STD :</TableCell>
                        <TableCell>{result ? result.std : null}</TableCell>
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
                          Slot :
                        </TableCell>
                        <TableCell>{result ? result.slot : null}</TableCell>
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
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Temp :
                        </TableCell>
                        <TableCell>{result ? result.temp : null} °C</TableCell>
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
                          Humidity :
                        </TableCell>
                        <TableCell>
                          {result ? result.humidity : null}%
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
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Conductivity :
                        </TableCell>
                        <TableCell>
                          {result ? result.conductivity : null} µS/cm
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
                        <TableCell sx={{ fontWeight: "bold" }}>kV :</TableCell>
                        <TableCell>
                          {result ? result.testDatakv : null} kVAC
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
                          Peak value :
                        </TableCell>
                        <TableCell>
                          {result ? result.peakValue : null} mA
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </div>
          </Box>
          <hr />
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
      <div className="modal-overlay" onClick={() => closeModal(false)}></div>
    </>
  );
}

export default ElectricTestModal;
