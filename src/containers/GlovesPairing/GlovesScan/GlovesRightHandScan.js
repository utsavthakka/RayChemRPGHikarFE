import React, { useState } from "react";
import "./GlovesScan.css";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import IphoneModal from "../IphoneModal";
import VisualInspection from "../Modal/VisualInspectionModal";
import ElectricTest from "../Modal/ElectricTest";
import FinalVisualInspection from "../Modal/FinalVisualInspection";
import { pairingdata } from "../services";
import { useEffect } from "react";
import dayjs from "dayjs";
import { images } from "../../../config/images";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { scanUrl, UrlLength } from "../../../config/urls";

function GlovesRightHand(props) {
  //Initial state variables
  const [isLoading, setLoading] = useState(false);
  const [reportStatus, setReportStatus] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openVisualModal, setOpenVisualModal] = useState(false);
  const [openElectricModal, setOpenElectricModal] = useState(false);
  const [openFinalVisualModal, setOpenFinalVisualModal] = useState(false);
  const [uidTypeData, setUidTypeData] = useState("");
  const [electric, setElectric] = useState(null);
  const [finalVisual, setFinalVisual] = useState(null);
  const [rorl, setRorl] = useState(null);
  const [thicknessvalue, setThiknessvalue] = useState(null);
  const [uid, setUid] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [mfgDate, setMfgDate] = useState("");
  const [roRl, setRoRl] = useState("");
  const [classValue, setClassValue] = useState("");
  const [size, setSize] = useState("");
  const [scanUID, setScanUID] = useState("");
  const { row } = props;
  const { userPermission } = useSelector((state) => state.userState);
  const [tempScanUID, settempScanUID] = useState("");

  const handleChange = (event) => {
    const input = event.target.value;
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    if (alphanumericRegex.test(input)) {
      setBatchNo(input.slice(0, 6));
    }
  };
  const handleRorLChange = (event) => {
    const input = event.target.value;
    const alphabeticRegex = /^[a-zA-Z]*$/;
    if (alphabeticRegex.test(input)) {
      setRoRl(input.slice(0, 5));
    }
  };

  const handleSizeChange = (event) => {
    const input = event.target.value;
    const numericRegex = /^\d*$/;
    if (numericRegex.test(input)) {
      setSize(input.slice(0, 4));
    }
  };

  const handleClassValue = (event) => {
    const input = event.target.value;
    const numericRegex = /^\d*$/;
    if (numericRegex.test(input)) {
      setClassValue(input);
    }
  };

  const handleMfgDateValue = (event) => {
    const input = event.target.value;
    const numericRegex = /^\d*$/;
    if (numericRegex.test(input)) {

      setMfgDate(input.slice(0, 10));

      if (mfgDate.length < 8) {
      } else {
        const stringValue = mfgDate.toString(); // Convert the numeric value to a string
        const formattedDate = `${stringValue.slice(0, 2)}/${stringValue.slice(
          2,
          4
        )}/${stringValue.slice(4)}`;
        setMfgDate(formattedDate);
        console.log(formattedDate); // Output: 65/65/4444
      }

    }
  };

  // Define a variable to store a sliced version of the uidTypeData array starting from index 33
  const uidType1 = uid;
  const uidValidation = uidType1.split("/").pop();
  console.log("uidValidation", uidType1);
  const scanUidType1 = uidValidation.length <= 8 ? uidValidation : "";


  // Define a function to handle a button click event that sets the state of the modal dialog to open
  const handleClick = () => {
    setOpenModal(true);
  };

  // Define a function to handle a data scan event that retrieves data from an API and sets the report status in the component state based on the API response
  const handleScanData = async () => {
    const params = {
      uid: scanUidType1 ? scanUidType1 : uid,
    };
    try {
      const resp = await pairingdata(params);
      setLoading(false);
      if (resp.status == 200 || resp.status == 201) {
        setReportStatus(resp.data.payload);
      }
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit", error);
    }
  };

  // Define a function to handle a visual click event that opens a modal dialog if uidTypeData and visual are both true
  const handleVisualClick = async (visual) => {
    if (visual) {
      setOpenVisualModal(true);
    }
  };

  // Define a useEffect hook that calls the handleScanData function when the uidTypeData state changes
  useEffect(() => {
    if (scanUidType1.length === 8) {
      handleScanData();
    }
  }, [scanUidType1]);

 

  // Define a useEffect hook that sets the GlovesRightHandUid prop in the component's parent based on the scanUidType or uid state
  useEffect(() => {
    if (reportStatus) {
      props.GlovesRightHandClass(
        reportStatus[0].class_name,
        reportStatus[0].size_name,
        reportStatus[0].r_or_l
      );
    }
  }, [reportStatus]);

  useEffect(() => {
    if (scanUidType1) {
      props.GlovesRightHandUid(scanUidType1);
    } else if (uid.length === 8) {
      props.GlovesRightHandUid(uid);
    }
  }, [scanUidType1, uid]);

  useEffect(() => {
    console.log("useEffect...........openElectricModal", openElectricModal);
  }, [openElectricModal]);

  const handleElectricClick = (e) => {
    console.log("e", e);

    if (e) {
      console.log("openElectricModal", openElectricModal);

      setOpenElectricModal(true);
    }
  };

  // This function handles the final visual click
  const handleFinalVisualClick = (e) => {
    if (e) {
      setOpenFinalVisualModal(true);
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
  return (
    <>
      <div className="gloves-scan-card">
        <ToastContainer />
        {userPermission.find((permission) => permission.module === "Pairing")
          .is_editor == true &&
        userPermission.find((permission) => permission.module === "Pairing")
          .is_viewer == true ? (
          <div className="gloves-img-wrraper">
            {!reportStatus ? (
              <img src={images.rightHand} onClick={handleClick} />
            ) : (
              <img src={images.scanRightHand} />
            )}
          </div>
        ) : (
          <div className="gloves-img-wrraper">
            {!reportStatus ? (
              <img src={images.rightHand} />
            ) : (
              <img src={images.scanRightHand} />
            )}
          </div>
        )}

        {userPermission.find((permission) => permission.module === "Pairing")
          .is_editor == true &&
        userPermission.find((permission) => permission.module === "Pairing")
          .is_viewer == true ? (
          <div className="gloves-detail-wrraper">
            <Grid container spacing={2}>
              <Grid item md={6} sm={6} xs={12} className="table-grid">
                <table>
                  <tr>
                    <td>UID :</td>
                    <td>
                      <TextField
                        id="outlined-basic"
                        onChange={(e) => setUid(e.target.value)}
                        value={
                          reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].uid_type
                              : null
                            : scanUidType1
                        }
                        variant="outlined"
                        className="table-input"
                        style={{ background: "#F4F7FE" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Batch No :</td>
                    <td>
                      <TextField
                        id="outlined-basic"
                        onChange={handleChange}
                        value={
                          reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].batch_id_type
                              : null
                            : null || batchNo
                        }
                        variant="outlined"
                        className="table-input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>R/L :</td>
                    <td>
                      <TextField
                        id="outlined-basic"
                        onChange={handleRorLChange}
                        value={
                          reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].r_or_l
                              : null
                            : null || roRl
                        }
                        variant="outlined"
                        className="table-input"
                      />
                    </td>
                  </tr>
                </table>
              </Grid>
              <Grid item md={6} sm={6} xs={12} className="table-grid">
                <table>
                  <tr>
                    <td>Class :</td>
                    <td>
                      <TextField
                        id="outlined-basic"
                        onChange={handleClassValue}
                        value={
                          reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].class_name
                              : null
                            : null || classValue
                        }
                        variant="outlined"
                        className="table-input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Mfg Date :</td>
                    <td>
                      <TextField
                        id="outlined-basic"
                        onChange={handleMfgDateValue}
                        value={
                          reportStatus
                            ? dayjs(
                                reportStatus[0]
                                  ? reportStatus[0].mfg_date
                                  : null
                              ).format("YYYY-MM-DD")
                            : null || mfgDate
                            ? mfgDate
                            : null
                        }
                        variant="outlined"
                        className="table-input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Size :</td>
                    <td>
                      <TextField
                        id="outlined-basic"
                        onChange={handleSizeChange}
                        value={
                          reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].size_name
                              : null
                            : null || size
                        }
                        variant="outlined"
                        className="table-input"
                      />
                    </td>
                  </tr>
                </table>
              </Grid>
            </Grid>
            <div className="button-wrapper status-flow-wrap">
              {/* <div
              className={`status ${
                reportStatus
                  ? reportStatus[0]
                    ? reportStatus[0].visual_inspection
                    : null
                  : null
              } table-tag-btn`}
              onClick={() =>
                handleVisualClick(reportStatus[0].visual_inspection)
              }
            >
              Visual Inspection
            </div> */}
              <div
                className={`status ${
                  reportStatus
                    ? reportStatus[0]
                      ? reportStatus[0].electric_test
                      : null
                    : null
                } table-tag-btn`}
                onClick={() => {
                  handleElectricClick(reportStatus[0].electric_test);
                }}
              >
                Electric Test
              </div>
              <div
                className={`status ${
                  reportStatus
                    ? reportStatus[0]
                      ? reportStatus[0].final_visual_inspection
                      : null
                    : null
                } table-tag-btn`}
                onClick={() =>
                  handleFinalVisualClick(
                    reportStatus[0].final_visual_inspection
                  )
                }
              >
                Final Visual Inspection
              </div>
            </div>
            <div className="d-flex justify-content-end aborted">
              <p style={{ margin: 0, marginBottom: 0 }}>
                Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169;
                All Rights Reserved
              </p>
            </div>
          </div>
        ) : (
          <div className="gloves-detail-wrraper">
            <Grid container spacing={2}>
              <Grid item md={6} sm={6} xs={12} className="table-grid">
                <table>
                  <tr>
                    <td>UID :</td>
                    <td>
                      <TextField
                        id="outlined-basic"
                        onChange={handleToastMsg}
                        value={
                          reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].uid_type
                              : null
                            : scanUidType1
                        }
                        variant="outlined"
                        className="table-input"
                        style={{ background: "#F4F7FE" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Batch No :</td>
                    <td>
                      <TextField
                        id="outlined-basic"
                        onChange={handleToastMsg}
                        value={
                          reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].batch_id_type
                              : null
                            : null
                        }
                        variant="outlined"
                        className="table-input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>R/L :</td>
                    <td>
                      <TextField
                        id="outlined-basic"
                        onChange={handleToastMsg}
                        value={
                          reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].r_or_l
                              : null
                            : null
                        }
                        variant="outlined"
                        className="table-input"
                      />
                    </td>
                  </tr>
                </table>
              </Grid>
              <Grid item md={6} sm={6} xs={12} className="table-grid">
                <table>
                  <tr>
                    <td>Class :</td>
                    <td>
                      <TextField
                        id="outlined-basic"
                        onChange={handleToastMsg}
                        value={
                          reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].class_name
                              : null
                            : null
                        }
                        variant="outlined"
                        className="table-input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Mfg Date :</td>
                    <td>
                      <TextField
                        id="outlined-basic"
                        onChange={handleMfgDateValue}
                        value={
                          reportStatus
                            ? dayjs(
                                reportStatus[0]
                                  ? reportStatus[0].mfg_date
                                  : null
                              ).format("YYYY-MM-DD")
                            : null || mfgDate
                            ? mfgDate
                            : null
                        }
                        variant="outlined"
                        className="table-input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Size :</td>
                    <td>
                      <TextField
                        id="outlined-basic"
                        onChange={handleToastMsg}
                        value={
                          reportStatus
                            ? reportStatus[0]
                              ? reportStatus[0].size_name
                              : null
                            : null
                        }
                        variant="outlined"
                        className="table-input"
                      />
                    </td>
                  </tr>
                </table>
              </Grid>
            </Grid>
            <div className="button-wrapper status-flow-wrap">
              {/* <div
            className={`status ${
              reportStatus
                ? reportStatus[0]
                  ? reportStatus[0].visual_inspection
                  : null
                : null
            } table-tag-btn`}
            onClick={() =>
             handleToastMsg()
            }
          >
            Visual Inspection
          </div> */}
              <div
                className={`status ${
                  reportStatus
                    ? reportStatus[0]
                      ? reportStatus[0].electric_test
                      : null
                    : null
                } table-tag-btn`}
                onClick={() => handleToastMsg()}
              >
                Electric Test
              </div>
              <div
                className={`status ${
                  reportStatus
                    ? reportStatus[0]
                      ? reportStatus[0].final_visual_inspection
                      : null
                    : null
                } table-tag-btn`}
                onClick={() => handleToastMsg()}
              >
                Final Visual Inspection
              </div>
            </div>
            <div className="d-flex justify-content-end aborted">
              <p style={{ margin: 0, marginBottom: 0 }}>
                Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169;
                All Rights Reserved
              </p>
            </div>
          </div>
        )}
      </div>

      {openVisualModal && (
        <>
          <VisualInspection
            closeModal={setOpenVisualModal}
            reportStatus={reportStatus}
          />
        </>
      )}
      {openElectricModal && (
        <ElectricTest
          closeModal={setOpenElectricModal}
          electric={electric}
          rorl={rorl}
          thicknessvalue={thicknessvalue}
          reportStatus={reportStatus}
        />
      )}
      {openFinalVisualModal && (
        <FinalVisualInspection
          closeModal={setOpenFinalVisualModal}
          reportStatus={reportStatus}
        />
      )}
    </>
  );
}

export default GlovesRightHand;
