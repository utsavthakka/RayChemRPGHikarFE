import React, { useEffect, useRef, useState } from "react";
import "./GlovesPairing.css";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Card, CardContent, Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import SettingsIcon from "@mui/icons-material/Settings";
import Checkbox from "@mui/material/Checkbox";

import GloverIcon from "../../assets/images/gloves-icon.png";
import PairingTable from "./PairingTable/PairingTable";
import PrintHistoryTable from "./PairingTable/PrintHistory";
import AnalyticsData from "./AnalyticsData/AnalyticsData";
import GlovesLeftHand from "./GlovesScan/GlovesLeftHandScan";
import GlovesRightHand from "./GlovesScan/GlovesRightHandScan";
import {
  checkParringStatus,
  createPairing,
  getcuff,
  getCustomerName,
  getLotNumber,
  getOrderId,
  getOrderIdParring,
  getPairingGlovesType,
  getParingLength,
} from "./services";
import Loader from "../../components/Loader/Loader";
// import { images } from "../../config/images";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../components/Button/Button";
import { PrintAgain } from "./services";
import { getLastpairingData } from "./services";

function GlovesPairing(props) {
  //Initial state variables
  const [pairedTable, setPairedTable] = useState(false);
  const [PrintHistoryStatus, setPrintHistoryStatus] = useState(false);

  const [glovesPairingPage, setGlovesPairingPage] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [orderNo, setOrderNo] = React.useState("");
  const [customer, setCustomer] = React.useState("");
  const [glovesLeftUid, setGlovesLeft] = useState(null);
  const [glovesRightUid, setGlovesRight] = useState(null);
  const [cuff, setCuff] = useState([]);
  const [selectCuff, setSelectCuff] = useState();
  const [glovesType, setGlovesType] = useState([]);
  const [selectGlovesType, setSelectGlovesType] = useState();
  const [GlovesLength, setGlovesLength] = useState([]);
  const [selectGlovesLength, setSelectGlovesLength] = useState();
  const [glovesColor, setGlovesColor] = useState(false);
  const [lotNumber, setLotNumber] = useState("");
  const [glovesLeftClass, setGlovesLeftClass] = useState();
  const [glovesRightClass, setGlovesRightClass] = useState();
  const [glovesLeftSize, setGlovesLeftSize] = useState();
  const [glovesRightSize, setGlovesRightSize] = useState();
  const [failGlovesColor, setFailGlovesColor] = useState(false);
  const [openPairingModal, setOpenPairingModal] = useState(false);
  const [msgPopup, setMsgPopup] = useState("");
  const [openscanModal, setOpenScanModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [glovesLeftRol, setGlovesLeftRol] = useState(null);
  const [glovesRighttRol, setGlovesRightRol] = useState(null);
  const [customerName, setCustomerName] = useState([]);
  const [selectCustomerName, setSelectCustomerName] = useState();
  const [orderId, setOrderId] = useState([]);
  const [selectOrderId, setSelectOrderId] = useState();
  const [orderItem, setOrderItem] = useState("");
  const [ParringStatuserror, setParringStatuserror] = useState(false);
  const [Parringerror, setParringerror] = useState(false);
  const [Settingstatus, setSettingstatus] = useState(false);

  const [printer1Checked, setPrinter1Checked] = useState(true);
  const [printer2Checked, setPrinter2Checked] = useState(false);
  const [isPrinting, setisPrinting] = useState(false);

  const [isPrinted, setisPrinted] = useState(false);
  const [isPrintagain, setisPrintagain] = useState(false);
  const [PairId, setPairId] = useState("");

  const popupRef = useRef(null);

  // Function to handle clicks outside of the popup
  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setSettingstatus(false);
    }
  };

  useEffect(() => {
    // Attach the click event listener when the popup is open
    if (Settingstatus) {
      window.addEventListener("click", handleOutsideClick);
    } else {
      // Remove the click event listener when the popup is closed
      window.removeEventListener("click", handleOutsideClick);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [Settingstatus]);

  useEffect(() => {
    GetPrinterData();
  }, []);

  const GetPrinterData = () => {
    if (localStorage.getItem("G_Pairing_Printer")) {
      const Printers = JSON.parse(localStorage.getItem("G_Pairing_Printer"))
        .Printer;
      if (Printers == 1) {
        setPrinter1Checked(true);
        setPrinter2Checked(false);
      }
      if (Printers == 2) {
        setPrinter1Checked(false);
        setPrinter2Checked(true);
      }
      console.log("Printers", Printers);
    }
  };

  const handlePrinter1Change = (event) => {
    localStorage.setItem("G_Pairing_Printer", JSON.stringify({ Printer: 1 }));
    setPrinter1Checked(true);
    setPrinter2Checked(false);
  };

  const handlePrinter2Change = (event) => {
    localStorage.setItem("G_Pairing_Printer", JSON.stringify({ Printer: 2 }));
    setPrinter1Checked(false);
    setPrinter2Checked(true);
  };
  // setLoading(true)
  // setLoading(true)
  console.log("orderId.....................", selectOrderId);

  // useEffect(() => {
  //   const handleKeyPress = (event) => {
  //     if (event.key === 'Enter') {
  //       window.location.reload();
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyPress);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, [ ParringStatuserror , openscanModal]);

  // useEffect(() => {
  //   const handleKeyPress = (event) => {
  //     if (event.key === 'Enter') {
  //       ClosePopup();
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyPress);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, [Parringerror]);

  const navigate = useNavigate();

  const { userPermission } = useSelector((state) => state.userState);

  useEffect(() => {
    // Call the getData function when the component mounts
    getData();
    GetLastpairingData();
    console.log("orderId", orderId);
    return () => {};
  }, []);

  useEffect(() => {
    handlegetOrderIdParring();
  }, [
    selectGlovesType,
    glovesLeftClass,
    glovesLeftSize,
    selectCuff,
    selectGlovesLength,
  ]);

  useEffect(() => {
    if (orderItem) {
      handleorderId();
    }
  }, [selectCustomerName, orderItem]);

  useEffect(() => {
    if (orderItem) {
      handleCustomerName();
    }
  }, [orderItem]);

  const GetLastpairingData = async () => {
    const Api = await getLastpairingData();
    console.log("Api.Response:", Api.data.payload);
    setSelectGlovesType(Api.data.payload.types_of_gloves);
    setSelectCuff(Api.data.payload.cuff);
    setSelectOrderId(Api.data.payload.order_no);
    setSelectCustomerName(Api.data.payload.customer_name);
    setLotNumber(Api.data.payload.lot_number);
    setOrderItem(Api.data.payload.order_item);
    setSelectGlovesLength(Api.data.payload.length);
  };

  // GetLastpairingData()

  // Define a function to get data from the API
  const getData = async () => {
    try {
      // Call the getcuff API endpoint and set the cuff state
      const resp = await getcuff();
      setCuff(resp.data);
      // Call the getPairingGlovesType API endpoint and set the glovesType state
      const resp1 = await getPairingGlovesType();
      setGlovesType(resp1.data);
      // Call the getParingLength API endpoint and set the glovesLength state
      const resp2 = await getParingLength();
      setGlovesLength(resp2.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCustomerName = async () => {
    const params = {
      order_item: orderItem,
    };
    try {
      const resp = await getCustomerName(params);
      if (resp.status === 200 || resp.status === 201) {
        setCustomerName(resp.data.payload);
        // setSelectCustomerName(resp.data.payload[0].customer_name)
        console.log("SelectCustomerName", selectCustomerName);
      }
    } catch (error) {
      console.log("handleSubmit", error);
    }
  };

  // This function handles the 'Back' button click event.
  // const handleBack = () => {
  //   setGlovesPairingPage(true);
  //   setPairedTable(false);
  //   setAnalytics(false);
  // };

  // This function handles the 'Paired Table' button click event.
  const handlePairedTable = () => {
    setSettingstatus(false);
    setGlovesPairingPage(false);
    setPairedTable(true);
    setAnalytics(false);
  };

  // This useEffect hook runs whenever the values of glovesLeftClass, glovesRightClass, glovesColor, or selectGlovesType change.
  // useEffect(() => {
  //   if (glovesColor) {
  //     if (selectGlovesType) {
  //       if (glovesLeftClass === glovesRightClass) {
  //         handleChange();
  //       }
  //     }
  //   }
  // }, [glovesLeftClass, glovesRightClass, glovesColor, selectGlovesType]);
  useEffect(() => {
    handleChange();
  }, [selectGlovesType, glovesLeftClass]);

  const handleChange = async () => {
    // Set the parameters for the API call based on the selected gloves type and left class
    const params = {
      gloves_type: selectGlovesType,
      class_name: glovesLeftClass,
    };
    try {
      // Call the API to get the lot number for the selected gloves type and left class
      const resp = await getLotNumber(params);
      if (resp.status == 200 || resp.status == 201) {
        // If the API call is successful, set the lot number in the state
        setLotNumber(resp.data.payload);
      }
    } catch (error) {
      console.log("handleSubmit", error);
    }
  };
  const changeCustomer = (event) => {
    setCustomer(event.target.value);
  };

  useEffect(() => {
    if (glovesLeftUid && glovesRightUid) {
      // Call the handleGlovesType function if both the left and right gloves UID have been selected
      handleGlovesType();
    }
  }, [glovesLeftUid, glovesRightUid]);

  const changeOrderNo = (event) => {
    setOrderNo(event.target.value);
  };

  // This function handles the check pairing status of gloves
  const handleGlovesType = async () => {
    const params = {
      first_uid: glovesLeftUid,
      second_uid: glovesRightUid,
    };
    try {
      const resp = await checkParringStatus(params);
      if (resp.data.success == true) {
        setGlovesColor(true);
        setFailGlovesColor(false);
        // setMsgPopup(resp.data.message);
      }

      // if (resp.data.success == true) {
      //   setGlovesColor(true);
      //   setFailGlovesColor(false);
      //   // setMsgPopup(resp.data.message);
      // }
    } catch (error) {
      setFailGlovesColor(true);
      setMsgPopup(error.response.data.message);
      setParringStatuserror(true);
      console.log("checkParringStatus", error);
      console.log("checkParringStatus.message", error.response.data.message);
    }
  };

  const PrintAgainHandle = async (id) => {
    setisPrintagain(false);
    console.log("row.id........1", id);
    setisPrinting(true);
    console.log("row.id........2", id);
    setPairId(id);
    console.log("row.id........3", id);
    const params = {
      pair_id: id,
      printer: printer2Checked
        ? "Printer 2"
        : null ?? printer1Checked
        ? "Printer 1"
        : null,
    };
    try {
      const Api = await PrintAgain(params);

      if (Api.data.success == true) {
        setisPrinting(false);
        setisPrinted(true);
        // setisPrintingDone(true)

        // setmessage(Api.data.message)
        console.log("Apicall sucessfully", Api.data);
      }
    } catch (e) {
      // setisPrintingDone(true)
      // setisPrinting(false)

      console.log("Error from PrintAgain....");
    }
  };

  const handleCreatePairing = async () => {
    setLoading(true);

    console.log("first_uid...............", glovesLeftUid);
    console.log("second_uid...............", glovesRightUid);

    const printerdata = printer1Checked
      ? "Printer 1"
      : printer2Checked
      ? "Printer 2"
      : null;

    const params = {
      types_of_gloves: selectGlovesType,
      first_uid: glovesLeftUid,
      second_uid: glovesRightUid,
      length: selectGlovesLength,
      lot_number: lotNumber,
      cuff: selectCuff,
      class_name: glovesLeftClass,
      size: glovesLeftSize,
      customer_name: selectCustomerName,
      order_id: selectOrderId,
      order_items: orderItem,
      printer: printerdata,
    };
    console.log("request payload", params);

    // setOpenPairingModal(true);
    // setOpenScanModal(true);
    try {
      const resp = await createPairing(params);

      if (resp.data.success === true) {
        // setTimeout(() => {
        //   setOpenPairingModal(false);
        setLoading(false);
        setOpenScanModal(true);
        console.log(".....resp.data.message", resp.data.message);
        setMsgPopup(resp.data.message);
        const UidpairedID = resp.data.payload.id;
        setPairId(UidpairedID);
        setOpenScanModal(false);
        setisPrinting(true);
        PrintAgainHandle(UidpairedID);

        // setTimeout(()=>{
        //   setOpenScanModal(false);
        //   setisPrinting(true);
        //   PrintAgainHandle(UidpairedID)
        //   setPairId(UidpairedID)

        // }, 5000);

        // }, 4000);
        //   setTimeout(() => {
        //     window.location.reload(false);
        //  }, 2000);
      }
    } catch (error) {
      setLoading(false);
      //   setLoading(false);
      //   setTimeout(() => {
      //     setOpenScanModal(false)
      //   }, 4000);
      //   setTimeout(() => {
      //     window.location.reload(false);
      //  }, 2000);
      // setParringStatuserror(true)
      // setOpenScanModal(true)
      setParringerror(true);
      setMsgPopup(error.response.data.message);
      console.log("handleSubmit", error);
    }
  };
  const handlegetOrderIdParring = async () => {
    const params = {
      gloves_type: selectGlovesType,
      class_name: glovesLeftClass,
      size: glovesLeftSize,
      cuff: selectCuff,
      length: selectGlovesLength + "mm",
    };
    try {
      const resp = await getOrderIdParring(params);
      setLoading(false);
      if (resp.status == 200 || resp.status == 201) {
        setOrderItem(resp.data.payload);
        console.log("orderItem successfully");
      }
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit", error);
    }
  };

  const handleorderId = async () => {
    const params = {
      customer_name: selectCustomerName,
      order_item: orderItem,
    };
    console.log("parms", params);
    try {
      const resp = await getOrderId(params);
      setLoading(false);
      if (
        resp.status === 200 ||
        (resp.status === 201 && resp.data.payload.length)
      ) {
        setOrderId(resp.data.payload);

        // setSelectOrderId(resp.data.payload[0].order_id);
        let O_id = resp.data.payload;
        const orderIds = O_id.map((order) => order.order_id);
        const isOrderFound = orderIds.some((order) => order === selectOrderId);

        if (isOrderFound) {
          orderIds.map((data) => {
            if (selectOrderId === data) {
              setSelectOrderId(data);
            }
          });
        } else {
          setSelectOrderId(resp.data.payload[0].order_id || null);
        }
      }
    } catch (error) {
      setOrderId("");
      setSelectOrderId("");
      setLoading(false);
      console.log("handleSubmit", error);
    }
  };
  const GlovesLeftHandUid = (uid, leftHandClass) => {
    setGlovesLeft(uid);
  };

  const GlovesRightHandUid = (uid, rightHandClass) => {
    setGlovesRight(uid);
  };

  const GlovesLefttHandClass = (leftHandClass, leftHandSize, leftHandRol) => {
    setGlovesLeftClass(leftHandClass);
    setGlovesLeftSize(leftHandSize);
    setGlovesLeftRol(leftHandRol);
  };

  const GlovesRightHandClass = (
    rightHandClass,
    rightHandSize,
    rightHandRol
  ) => {
    setGlovesRightClass(rightHandClass);
    setGlovesRightSize(rightHandSize);
    setGlovesRightRol(rightHandRol);
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

  const ClosePopup = () => {
    setOpenPairingModal(false);
    setParringStatuserror(false);

    setOpenScanModal(false);
    setParringerror(false);
  };

  const PrintHistoryhandle = () => {
    setPairedTable(false);
    setPrintHistoryStatus(true);
  };

  return (
    <div
      className={`page-wraper ${
        ParringStatuserror ? "gloves-page-overlay" : ""
      }`}
    >
      <ToastContainer />
      <div className="page-header">
        {glovesPairingPage ? (
          <Link to="/dashboard" className="page-back-btn">
            <ArrowBackIcon />
            <span>Gloves Pairing</span>
          </Link>
        ) : null}

        {pairedTable ? (
          <Link
            to="/gloves-pairing"
            className="page-back-btn"
            onClick={() => {
              setPairedTable(false);
              setPrintHistoryStatus(false);
              setGlovesPairingPage(true);
            }}
          >
            <ArrowBackIcon />
            <span>Gloves Pairing</span>
          </Link>
        ) : null}

        {PrintHistoryStatus ? (
          <>
            <Link
              to="/gloves-pairing"
              className="page-back-btn"
              onClick={() => {
                setPairedTable(true);
                setPrintHistoryStatus(false);
                setGlovesPairingPage(false);
              }}
            >
              <ArrowBackIcon />
              <span>Print History:</span>
              <span style={{ fontWeight: "normal" }}>Gloves Label</span>
            </Link>
          </>
        ) : null}

        {/* {glovesPairingPage ? (
          <Link to="/dashboard" className="page-back-btn">
            <ArrowBackIcon />
            <span>Gloves Pairing</span>
          </Link>
        ) : null} */}

        {/* (
          <Link to="" className="page-back-btn" onClick={handleBack}>
            <ArrowBackIcon />
            <span>Gloves Pairing</span>
          </Link>
        ) */}

        <div className="header-btn-group">
          {pairedTable ? (
            <>
              {/* // <button className="page-header-btn">
            //   <img src={images.filterIcon} style={{ marginRight: "8px" }} />
            //   Filter
            // </button> */}

              {printer1Checked ? (
                <button className="page-header-btn">P1</button>
              ) : printer2Checked ? (
                <button className="page-header-btn">P2</button>
              ) : (
                ""
              )}

              <button
                className="page-header-btn"
                onClick={() => PrintHistoryhandle()}
              >
                Print History
              </button>
            </>
          ) : null}

          {!pairedTable && !PrintHistoryStatus ? (
            <>
              <button
                className={`page-header-btn ${pairedTable ? "filled" : ""}`}
                onClick={handlePairedTable}
              >
                Paired List
              </button>
              {printer1Checked ? (
                <button
                  className={`page-header-btn ${pairedTable ? "filled" : ""}`}
                >
                  P1
                </button>
              ) : printer2Checked ? (
                <button
                  className={`page-header-btn ${pairedTable ? "filled" : ""}`}
                >
                  P2
                </button>
              ) : (
                ""
              )}

              <button
                className="SettingsIcon-btn"
                onClick={() => setSettingstatus(!Settingstatus)}
              >
                <SettingsIcon className="SettingsIcon" />
              </button>
            </>
          ) : null}

          {/* <button
            className={`page-header-btn ${analytics ? "filled" : ""}`}
            // onClick={handleAnalytics}
          >
            Analytics
          </button> */}
        </div>
      </div>
      {/* <div>
              <div class="message-box">
                <div class="arrow"></div>
                <span className="Select-Printer" >Select Printer</span>
                <br />
                
                
                <div className="Printer-container">
                  <span>Printer - 1</span>
                  <Checkbox
                  name="Printer1"
                  className="Printer-checkbox"
                  checked={null}

                />
                </div>
               
 
                <div className="Printer-container">
                <span>Printer - 2</span>
                     <Checkbox
                  name="Printer2"
                  className="Printer-checkbox"
                  checked={null}
                  

                />
                </div>
               
                
              </div>
      </div> */}
      {Settingstatus ? (
        <div>
          <div className="message-box" ref={popupRef}>
            <div className="arrow"></div>
            <span className="Select-Printer">Select Printer</span>
            <br />

            <div className="Printer-container">
              <span>Printer - 1</span>
              <Checkbox
                name="Printer1"
                className="Printer-checkbox custom-checkbox"
                checked={printer1Checked}
                onChange={() => handlePrinter1Change()}
                onClick={() => handlePrinter1Change()}
              />
            </div>

            <div className="Printer-container">
              <span>Printer - 2</span>
              <Checkbox
                name="Printer2"
                className="Printer-checkbox custom-checkbox"
                checked={printer2Checked}
                onChange={() => handlePrinter2Change()}
                onClick={() => handlePrinter2Change()}
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className={`${glovesPairingPage ? "d-block" : "d-none"}`}>
        <Grid container spacing={2}>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <GlovesLeftHand
              GlovesLeftHandUid={GlovesLeftHandUid}
              GlovesLefttHandClass={GlovesLefttHandClass}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <GlovesRightHand
              GlovesRightHandUid={GlovesRightHandUid}
              GlovesRightHandClass={GlovesRightHandClass}
            />
          </Grid>
          <Grid
            item
            lg={4}
            md={12}
            sm={12}
            xs={12}
            className="action-wrapper-main"
          >
            <div className="action-wrapper">
              <div
                className={`pair-button ${
                  glovesColor
                    ? "pair-button success"
                    : failGlovesColor
                    ? "pair-button failed"
                    : "pair-button"
                }`}
              >
                {userPermission.find(
                  (permission) => permission.module === "Pairing"
                ).is_editor == true &&
                userPermission.find(
                  (permission) => permission.module === "Pairing"
                ).is_viewer == true ? (
                  <div onClick={handleCreatePairing}>
                    <img src={GloverIcon} />
                  </div>
                ) : (
                  <div onClick={handleToastMsg}>
                    <img src={GloverIcon} />
                  </div>
                )}
              </div>
              <div className="gloves-form">
                <label className="input-label">Type of Gloves :</label>
                {userPermission.find(
                  (permission) => permission.module === "Pairing"
                ).is_editor == true &&
                userPermission.find(
                  (permission) => permission.module === "Pairing"
                ).is_viewer == true ? (
                  <FormControl fullWidth className="select-input">
                    <select
                      className="form-input"
                      value={selectGlovesType}
                      onChange={(event) =>
                        setSelectGlovesType(event.target.value)
                      }
                      placeholder="Select Type of Gloves"
                      required
                    >
                      <option value="none" selected disabled hidden>
                        Select Type of Gloves
                      </option>
                      {glovesType?.map((element) => (
                        <option value={element.pairing_gloves_type_name}>
                          {element.pairing_gloves_type_name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                ) : (
                  <FormControl fullWidth className="select-input">
                    <select
                      className="form-input"
                      value={selectGlovesType}
                      onChange={(event) => handleToastMsg()}
                      placeholder="Select Type of Gloves"
                      required
                    >
                      <option value="none" selected disabled hidden>
                        Select Type of Gloves
                      </option>
                    </select>
                  </FormControl>
                )}
              </div>
              <div className="gloves-form">
                <label className="input-label">Lot Number :</label>
                <FormControl fullWidth className="select-input">
                  <input
                    id="outlined-basic"
                    value={lotNumber}
                    variant="outlined"
                    className="form-input"
                    required
                  />
                </FormControl>
              </div>
              <div className="gloves-form">
                <label className="input-label">Length :</label>
                {userPermission.find(
                  (permission) => permission.module === "Pairing"
                ).is_editor == true &&
                userPermission.find(
                  (permission) => permission.module === "Pairing"
                ).is_viewer == true ? (
                  <FormControl fullWidth className="select-input">
                    <select
                      className="form-input"
                      value={selectGlovesLength}
                      onChange={(event) =>
                        setSelectGlovesLength(event.target.value)
                      }
                      required
                    >
                      <option value="none" selected disabled hidden>
                        Select Length
                      </option>
                      {GlovesLength ? (
                        GlovesLength.map((element) => (
                          <option value={element.length}>
                            {element.length}
                          </option>
                        ))
                      ) : (
                        <option>{"No Data Found"}</option>
                      )}
                    </select>
                  </FormControl>
                ) : (
                  <FormControl fullWidth className="select-input">
                    <select
                      className="form-input"
                      value={selectGlovesLength}
                      onChange={() => handleToastMsg()}
                      required
                    >
                      <option value="none" selected disabled hidden>
                        Select Length
                      </option>
                    </select>
                  </FormControl>
                )}
              </div>
              <div className="gloves-form">
                <label className="input-label">Cuff :</label>
                {userPermission.find(
                  (permission) => permission.module === "Pairing"
                ).is_editor == true &&
                userPermission.find(
                  (permission) => permission.module === "Pairing"
                ).is_viewer == true ? (
                  <FormControl fullWidth className="select-input">
                    <select
                      className="form-input"
                      value={selectCuff}
                      onChange={(event) => setSelectCuff(event.target.value)}
                      required
                    >
                      <option value="none" selected disabled hidden>
                        Select Cuff
                      </option>
                      {cuff ? (
                        cuff.map((element) => (
                          <option value={element.cuff_name}>
                            {element.cuff_name}
                          </option>
                        ))
                      ) : (
                        <option>{"No Data Found"}</option>
                      )}
                    </select>
                  </FormControl>
                ) : (
                  <FormControl fullWidth className="select-input">
                    <select
                      className="form-input"
                      value={selectCuff}
                      onChange={() => handleToastMsg()}
                      required
                    >
                      <option value="none" selected disabled hidden>
                        Select Cuff
                      </option>
                    </select>
                  </FormControl>
                )}
              </div>

              <div className="gloves-form">
                <label className="input-label">Order Item :</label>
                {userPermission.find(
                  (permission) => permission.module === "Pairing"
                ).is_editor == true &&
                userPermission.find(
                  (permission) => permission.module === "Pairing"
                ).is_viewer == true ? (
                  <FormControl fullWidth className="select-input">
                    <input
                      id="outlined-basic"
                      value={orderItem}
                      variant="outlined"
                      className="form-input"
                      required
                    />
                  </FormControl>
                ) : (
                  <FormControl fullWidth className="select-input">
                    <input
                      id="outlined-basic"
                      value={orderItem}
                      variant="outlined"
                      className="form-input"
                      required
                    />
                  </FormControl>
                )}
              </div>

              <div className="gloves-form">
                <label className="input-label">Customer Name :</label>
                {userPermission.find(
                  (permission) => permission.module === "Pairing"
                ).is_editor == true &&
                userPermission.find(
                  (permission) => permission.module === "Pairing"
                ).is_viewer == true ? (
                  <FormControl fullWidth className="select-input">
                    <select
                      className="form-input"
                      value={selectCustomerName}
                      onChange={(e) => setSelectCustomerName(e.target.value)}
                      required
                    >
                      <option value="none" selected disabled hidden>
                        Select Customer Name
                      </option>
                      <option>Select Customer</option>
                      {customerName ? (
                        customerName.map((element) => (
                          <option value={element.customer_name}>
                            {element.customer_name}
                          </option>
                        ))
                      ) : (
                        <option>{"No Data Found"}</option>
                      )}
                    </select>
                  </FormControl>
                ) : (
                  <FormControl fullWidth className="select-input">
                    <select
                      className="form-input"
                      value={selectCustomerName}
                      onChange={() => handleToastMsg()}
                      required
                    >
                      <option value="none" selected disabled hidden>
                        Select Customer Name
                      </option>
                    </select>
                  </FormControl>
                )}
              </div>

              <div className="gloves-form">
                <label className="input-label">Order No :</label>
                <FormControl fullWidth className="select-input">
                  <select
                    className="form-input"
                    value={selectOrderId}
                    onChange={(e) => setSelectOrderId(e.target.value)}
                    required
                  >
                    {/* <option value="none" selected>
                      Select Order No
                    </option> */}
                    {orderId ? (
                      orderId.map((element) => (
                        <option value={element.order_id}>
                          {element.order_id}
                        </option>
                      ))
                    ) : (
                      <option>{"No Data Found"}</option>
                    )}
                  </select>
                </FormControl>
              </div>
            </div>
          </Grid>
        </Grid>

        {/* {openPairingModal && (
          <>
            <div className="sendingdataaaa1">
              <Card className="pairingcard-Approved">
                <CardContent className="p-0 pairing-status">
                  <h4>{msgPopup}</h4>
                </CardContent>
                <Button className='pairingcard-btn' title='Ok' onClick={ClosePopup}/>
              </Card>
            </div>
          </>
        )} */}

        {openscanModal && (
          <>
            <div className="sendingdataaaa1">
              <Card className="pairingcard-Approved">
                <CardContent className="p-0 pairing-status">
                  <h4>{msgPopup ? msgPopup : "You Enter Wrong Input!"}</h4>
                </CardContent>
                <Button
                  className="pairingcard-btn"
                  title="Ok"
                  onClick={() => {
                    window.location.reload();
                  }}
                />
              </Card>
            </div>
          </>
        )}

        {Parringerror && (
          <>
            <div className="sendingdataaaa1">
              <Card className="pairingcard-Approved">
                <CardContent className="p-0 pairing-status">
                  <h4>
                    {msgPopup
                      ? msgPopup
                      : "Parring Error Something Enter Wrong!"}
                  </h4>
                </CardContent>
                <Button
                  className="pairingcard-btn"
                  title="Ok"
                  onClick={ClosePopup}
                />
              </Card>
            </div>
          </>
        )}

        {/* onClick={()=>{window.location.reload();}}  */}
        {/* window.location.reload(); */}

        {ParringStatuserror && (
          <>
            <div className="sendingdataaaa1">
              <Card className="pairingcard-Approved">
                <CardContent className="p-0 pairing-status">
                  <h4>{msgPopup ? msgPopup : "You Enter Wrong Input!"}</h4>
                </CardContent>
                <Button
                  className="pairingcard-btn"
                  title="Ok"
                  onClick={() => {
                    window.location.reload();
                  }}
                />
              </Card>
            </div>
          </>
        )}

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
                    window.location.reload();
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

        {/* onClick={()=>{setPrintAgainstatus(true);
                setisPrintingDone(false);}} */}

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
                    PrintAgainHandle(PairId);
                  }}
                />
                <Button
                  className="pairingcard-btn"
                  title="No"
                  onClick={() => {
                    window.location.reload();
                  }}
                />
              </Card>
            </div>
          </>
        ) : null}

        {/* onClick={()=>{PrintAgainHandle(PairId);
                setPrintAgainstatus(false);}} */}

        {isLoading ? <Loader /> : null}
      </div>

      <div className={`${pairedTable ? "d-block" : "d-none"}`}>
        <PairingTable
          Printer={
            printer2Checked
              ? "Printer 2"
              : null ?? printer1Checked
              ? "Printer 1"
              : null
          }
        />
      </div>
      <div className={`${PrintHistoryStatus ? "d-block" : "d-none"}`}>
        <PrintHistoryTable />
      </div>

      <div className={`${analytics ? "d-block" : "d-none"}`}>
        <AnalyticsData />
      </div>
      <div className="d-flex justify-content-end aborted">
        <p style={{ margin: 0, marginBottom: 0 }}>
          Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
          Rights Reserved
        </p>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}

export default GlovesPairing;
