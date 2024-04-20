import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import "./PackDispatchTable.css";
import PackDispatchTable from "./PackDispatchTable";
import PrintedBoxTable from "./PrintedBoxTable";
import {
  getCustomerNameList,
  getDispatchOrderDetail,
  getBoxNo,
  createBoxLabel,
  PrintAgainBoxLabel
} from "./services";
import { PrintHistoryTable } from "./Box_PrintHistory";
import { images } from "../../config/images";
// import { image } from "d3";
import Checkbox from "@mui/material/Checkbox";
import { Card, CardContent } from "@mui/material";
import Button from "../../components/Button/Button";
import QRCode from "qrcode.react";

export const PackDispatch = () => {
  const [PrintPreviewStatus, setPrintPreviewStatus] = useState(false);
  const [PrintHistoryStatus, setPrintHistoryStatus] = useState(false);
  const [PrintOrderStatus, setPrintOrderStatus] = useState(true);
  const [CustomerNameList, setCustomerNameList] = useState([]);
  const [CustomerName, setCustomerName] = useState();
  const [DispatchOrder, setDispatchOrder] = useState([]);
  const [OrderIdButton, setOrderIdButton] = useState([]);
  const [AddStatus, setAddStatus] = useState(false);
  const [Uid, setUid] = useState("");
  const [apicount, setApiCount] = useState(false);
  const [BoxNo, setBoxNo] = useState();
  const [SettingStatus, setSettingStatus] = useState(false);
  const [printerChecked1, setPrinterChecked1] = useState(false);
  const [printerChecked2, setPrinterChecked2] = useState(true);
  const [ProductDescription1, setProductDescription1] = useState("");
  const [ProductDescription2, setProductDescription2] = useState("");
  const [ProductDescription3, setProductDescription3] = useState("");
  const [Qty1, setQty1] = useState("");
  const [Qty2, setQty2] = useState("");
  const [Qty3, setQty3] = useState("");
  const [OrderidPopUp, setOrderidPopUp] = useState(false);
  const [WrongOrderidPopUp, setWrongOrderidPopUp] = useState(false);
  const [WrongOrderidPopUp_message, setWrongOrderidPopUp_message] = useState(
    ""
  );
  const [isPrinting, setisPrinting] = useState(false);
  const [isPrintingDone, setisPrintingDone] = useState(false);
  const [PrintAgainstatus, setPrintAgainstatus] = useState(false);
  const [NewUidCheck, setNewUidCheck] = useState(null);
  const [NoDataStatus, setNoDataStatus] = useState(false);
  const initialState = { LS_fuid_match: false };
  const [appState, setAppState] = useState(initialState);
  const [LocalData_null_Pop_up, setLocalData_null_Pop_up] = useState(false);
  const [RemoveLocalDataPopup, setRemoveLocalDataPopup] = useState(false);
  const [UIDValid, setUIDValid] = useState("");
  const [EyePrintedBox, setEyePrintedBox] = useState(false);
  const [Box_Number, setBox_Number] = useState("");
  const [Printdisable, setPrintdisable] = useState(false);
  const [boxID,setboxID] = useState('');

  useEffect(() => {
    RefreshDispatchOrder();
    GetBoxNo();
    GetLocalData();
    GetPrinterData();
  }, [apicount]);

  useEffect(() => {
    Customer_Name_List();
  }, [OrderIdButton]);

  useEffect(() => {
    if (NewUidCheck !== null) {
      Dispatch_Order_Detail();
    }
  }, [NewUidCheck]);

  const popupRef = useRef(null);

  // Function to handle clicks outside of the popup
  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setAddStatus(false);
      setSettingStatus(false);
    }
  };

  useEffect(() => {
    // Attach the click event listener when the popup is open
    if (SettingStatus) {
      window.addEventListener("click", handleOutsideClick);
    }
    if (AddStatus) {
      window.addEventListener("click", handleOutsideClick);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [SettingStatus, AddStatus]);

  const GetPrinterData = () => {
    if (localStorage.getItem("B_Lable_Printer")) {
      const Printers = JSON.parse(localStorage.getItem("B_Lable_Printer"))
        .Printer;
      if (Printers == 1) {
        setPrinterChecked1(true);
        setPrinterChecked2(false);
      }
      if (Printers == 2) {
        setPrinterChecked1(false);
        setPrinterChecked2(true);
      }
      console.log("Printers", Printers);
    }
  };

  const ClosePopUp = () => {
    setOrderidPopUp(false);
    setWrongOrderidPopUp(false);
  };

  const RefreshDispatchOrder = () => {
    const getlocaldata = localStorage.getItem("DispatchOrderDetailTable");

    const getlocaldata2 = JSON.parse(getlocaldata);
    setDispatchOrder(getlocaldata2);
    const Local_OrderIDList = JSON.parse(localStorage.getItem("OrderIDList"));
    setOrderIdButton(Local_OrderIDList);
  };

  const GetLocalData = () => {
    try {
      const Local_Dispatch_Order_Detail = JSON.parse(
        localStorage.getItem("DispatchOrderDetailTable")
      );

      // console.log("Local_Customer_NameLocal_Customer_Name",Local_Customer_Name)
      // setCustomerName(Local_Customer_Name)
      // setCustomerNameList(Local_Customer_Name)

      const Local_OrderIDList = JSON.parse(localStorage.getItem("OrderIDList"));
      setOrderIdButton(Local_OrderIDList);
      RefreshDispatchOrder();

      // console.log("Local_Customer_Name", Local_Customer_Name);
      // console.log("Local_Dispatch_Order_Detail", Local_Dispatch_Order_Detail);
      // console.log("Local_OrderIDList", Local_OrderIDList);

      if (Local_OrderIDList.length === 1) {
        console.log("Flow Go On .......length 1");
        const filteredData1 = Local_Dispatch_Order_Detail.filter(
          (item) => item.order_id == Local_OrderIDList[0]
        );
        setProductDescription1(filteredData1[0].product_discription);
        setQty1(filteredData1.length);
      }

      if (Local_OrderIDList.length === 2) {
        console.log("Flow Go On .......length 2");
        const filteredData1 = Local_Dispatch_Order_Detail.filter(
          (item) => item.order_id == Local_OrderIDList[0]
        );
        const filteredData2 = Local_Dispatch_Order_Detail.filter(
          (item) => item.order_id == Local_OrderIDList[1]
        );
        setProductDescription1(filteredData1[0].product_discription);
        setQty1(filteredData1.length);
        setProductDescription2(filteredData2[0].product_discription);
        setQty2(filteredData2.length);
      }
      if (Local_OrderIDList.length === 3) {
        console.log("Flow Go On .......length 3");
        const filteredData1 = Local_Dispatch_Order_Detail.filter(
          (item) => item.order_id == Local_OrderIDList[0]
        );
        const filteredData2 = Local_Dispatch_Order_Detail.filter(
          (item) => item.order_id == Local_OrderIDList[1]
        );
        const filteredData3 = Local_Dispatch_Order_Detail.filter(
          (item) => item.order_id == Local_OrderIDList[2]
        );
        setProductDescription1(filteredData1[0].product_discription);
        console.log("filteredData1", filteredData1);
        console.log("typeof(filteredData1)", typeof filteredData1);

        setQty1(filteredData1.length);
        setProductDescription2(filteredData2[0].product_discription);
        setQty2(filteredData2.length);
        setProductDescription3(filteredData3[0].product_discription);
        setQty3(filteredData3.length);
      }
    } catch (e) {
      console.log("error from GetLocalData", e);
    }
  };

  const NoPrintHandle = () => {
    setisPrintingDone(false);
    setPrintAgainstatus(true);
  };

  useEffect(() => {
    if (PrintPreviewStatus) {
      GetLocalData();
    }
  }, [PrintPreviewStatus]);

  const HandlePrintHistoryStatus = () => {
    setLocalData_null_Pop_up(false);
    setAppState((prevState) => ({ ...prevState, LS_fuid_match: false }));
    setisPrintingDone(false);
    setPrintAgainstatus(false);
    setAddStatus(false);
    setPrintHistoryStatus(true);
    setPrintOrderStatus(false);
    setPrintPreviewStatus(false);
  };

  const HandleAddData = () => {
    setAddStatus(!AddStatus);
  };

  const UidHandle = (e) => {
    const Uid_link = e.target.value;
    setUid(Uid_link);
  };

  const uidType1 = Uid;
  const uidValidation = uidType1
    ? uidType1.split("/").pop() == "raychem."
      ? ""
      : uidType1.split("/").pop()
    : "";
  const scanUidType = uidValidation.length <= 8 ? uidValidation : "";

  useEffect(() => {
    if (scanUidType.length == 8) {
      setApiCount(!apicount);
      setNewUidCheck(NewUidCheck + 1);
    }
  }, [scanUidType]);

  const HandleSelectChange = (e) => {
    console.log("Customer_Name", e.target.value);

    setCustomerName(e.target.value);
    if (localStorage.getItem("Customer_Name")) {
      const Current_Customer_Name = e.target.value;
      const Local_Customer_Name = JSON.parse(
        localStorage.getItem("Customer_Name")
      );

      if (Current_Customer_Name == Local_Customer_Name) {
        console.log("match Found.....");
      } else {
        console.log("match Not Found.....");
        localStorage.removeItem("OrderIDList");
        localStorage.removeItem("DispatchOrderDetailTable");
        localStorage.removeItem("Customer_Name");
        localStorage.setItem("Customer_Name", JSON.stringify(e.target.value));
        setCustomerName(Current_Customer_Name);
        RefreshDispatchOrder();
        // window.location.reload();
      }
    }

    if (!localStorage.getItem("Customer_Name")) {
      localStorage.setItem("Customer_Name", JSON.stringify(e.target.value));
      localStorage.removeItem("OrderIDList");
      localStorage.removeItem("DispatchOrderDetailTable");
      GetLocalData();
    }
  };

  const Dispatch_Order_Detail = async () => {
    const Local_Customer_Name = JSON.parse(
      localStorage.getItem("Customer_Name")
    );

    const params = {
      uid: scanUidType,
      customer_name: Local_Customer_Name,
    };
    console.log(
      "localStorage.getItem('Customer_Name')",
      localStorage.getItem("Customer_Name")
    );
    console.log("params", params);
    const isFirstUidExists = (getlocaldata2, DispatchOrderDetail) => {
      getlocaldata2.some((item) => {
        if (item.first_uid === DispatchOrderDetail.data.payload.first_uid) {
          console.log(
            `item.first_uid === DispatchOrderDetail.data.payload.first_uid...${item.first_uid}......${DispatchOrderDetail.data.payload.first_uid}`
          );
        }
      });
      return getlocaldata2.some(
        (item) => item.first_uid === DispatchOrderDetail.data.payload.first_uid
      );
    };

    try {
      const DispatchOrderDetail = await getDispatchOrderDetail(params);

      if (DispatchOrderDetail.status === 200) {
        setUid("");

        const DispatchOrderList = () => {
          const getlocaldata = localStorage.getItem("DispatchOrderDetailTable");
          const getlocaldata2 = JSON.parse(getlocaldata);

          const olddata = [getlocaldata2];

          const uidToCheck = DispatchOrderDetail.data.payload.first_uid;
          const isFirstUidExist = isFirstUidExists(
            getlocaldata2,
            DispatchOrderDetail
          );

          if (!isFirstUidExist) {
            const combinedData = olddata.concat(
              DispatchOrderDetail.data.payload
            );

            const flattenedArray = combinedData.flatMap((item) =>
              Array.isArray(item) ? item : [item]
            );

            // modified null value
            const modifiedData = flattenedArray.map((item) => {
              if (item.product_discription === null) {
                item.product_discription = "-";
              }
              return item;
            });
            setCustomerNameList([
              {
                customer_name: CustomerName,
              },
            ]);
            console.log("modifiedData", modifiedData);

            localStorage.setItem(
              "DispatchOrderDetailTable",
              JSON.stringify(modifiedData)
            );

            const getlocaldata1 = JSON.parse(
              localStorage.getItem("DispatchOrderDetailTable")
            );

            setDispatchOrder(...DispatchOrder, getlocaldata1);
          }
          if (isFirstUidExist) {
            setAppState((prevState) => ({ ...prevState, LS_fuid_match: true }));
            setAddStatus(false);
          }

          return DispatchOrderDetail.data.payload.order_id;
        };

        const OrderIdList = () => {
          const getOrderIdDetail = JSON.parse(
            localStorage.getItem("OrderIDList")
          );
          console.log("getOrderIdDetail.......length", getOrderIdDetail.length);

          const OrderidData = [DispatchOrderDetail.data.payload.order_id];

          const combinedData = getOrderIdDetail.concat(OrderidData);

          const RemoveDuplicate = [...new Set(combinedData)];
          console.log("RemoveDuplicate", RemoveDuplicate);

          localStorage.setItem("OrderIDList", JSON.stringify(RemoveDuplicate));

          const GetOrderIdData = JSON.parse(
            localStorage.getItem("OrderIDList")
          );

          setOrderIdButton(GetOrderIdData);

          return GetOrderIdData;
        };

        if (localStorage.getItem("DispatchOrderDetailTable")) {
          if (JSON.parse(localStorage.getItem("OrderIDList")).length <= 2) {
            const OrderIds = await OrderIdList();

            function checkData(data) {
              return OrderIds.includes(data);
            }

            const isDataPresent = checkData(
              DispatchOrderDetail.data.payload.order_id
            );

            if (isDataPresent) {
              const DispatchList = await DispatchOrderList();
              RefreshDispatchOrder();
            }
            return true;
          }

          if (JSON.parse(localStorage.getItem("OrderIDList")).length === 3) {
            const GetOrderIdData = JSON.parse(
              localStorage.getItem("OrderIDList")
            );
            setOrderIdButton(GetOrderIdData);

            function checkData(data) {
              return GetOrderIdData.includes(data);
            }

            const isDataPresent = checkData(
              DispatchOrderDetail.data.payload.order_id
            );

            if (!isDataPresent) {
              setAddStatus(false);
              console.log("Order id Not  found");
              setOrderidPopUp(true);
            }

            if (isDataPresent) {
              const DispatchList = await DispatchOrderList();
              RefreshDispatchOrder();
            }
          }
        } else {
          if (!localStorage.getItem("DispatchOrderDetailTable")) {
            localStorage.setItem(
              "DispatchOrderDetailTable",
              JSON.stringify([DispatchOrderDetail.data.payload])
            );
          }

          if (!localStorage.getItem("OrderIDList")) {
            localStorage.setItem(
              "OrderIDList",
              JSON.stringify([DispatchOrderDetail.data.payload.order_id])
            );
            RefreshDispatchOrder();
          }
        }
      }
    } catch (e) {
      setUid("");
      if (e.response.status == 400) {
        setAddStatus(false);
        setWrongOrderidPopUp(true);
        setWrongOrderidPopUp_message(e.response.data.message);
      }
    }
  };

  const BoxPrintHistoryBack = () => {
    setAppState((prevState) => ({ ...prevState, LS_fuid_match: false }));
    setPrintHistoryStatus(false);
    setPrintOrderStatus(true);
    window.location.reload();
  };

  const HandlePrintPreviewStatus = () => {
    setAppState((prevState) => ({ ...prevState, LS_fuid_match: false }));
    setAddStatus(false);

    const Local_Dispatch_Order_Detail = JSON.parse(
      localStorage.getItem("DispatchOrderDetailTable")
    );

    if (Local_Dispatch_Order_Detail) {
      setLocalData_null_Pop_up(false);

      setPrintPreviewStatus(true);

      setPrintHistoryStatus(false);
      setPrintOrderStatus(false);
    } else {
      setLocalData_null_Pop_up(true);
    }
  };

  const Print_Preview_Box_Lable = () => {
    setPrintPreviewStatus(false);
    setPrintHistoryStatus(false);
    setPrintOrderStatus(true);
    window.location.reload();
  };

  const SettingStatusHandle = () => {
    setSettingStatus(!SettingStatus);
  };

  const handlePrinter1Change = () => {
    console.log("Click......PrinterChecked1");
    localStorage.setItem("B_Lable_Printer", JSON.stringify({ Printer: 1 }));
    setPrinterChecked1(true);
    setPrinterChecked2(false);
  };

  const handlePrinter2Change = () => {
    console.log("Click......PrinterChecked2");
    localStorage.setItem("B_Lable_Printer", JSON.stringify({ Printer: 2 }));
    setPrinterChecked1(false);
    setPrinterChecked2(true);
  };

  const createBoxLabel_api_handle = async () => {
    console.log("button clicked......");
    const Local_Dispatch_Order_Detail = JSON.parse(
      localStorage.getItem("DispatchOrderDetailTable")
    );

    if (Local_Dispatch_Order_Detail) {
      setisPrinting(true);
      setPrintAgainstatus(false);

      const Local_OrderIDList = JSON.parse(localStorage.getItem("OrderIDList"));

      const scan_uid = [];

      Local_Dispatch_Order_Detail.forEach((item) => {
        scan_uid.push({ uid: item.first_uid });
      });

      console.log("scan_uid", scan_uid);

      const parms = {
        order_id: Local_OrderIDList,
        box_no: BoxNo,
        printer: printerChecked2
          ? "Printer 2"
          : null ?? printerChecked1
          ? "Printer 1"
          : null,
        scan_uid: scan_uid,
      };

      setPrintdisable(true);
      try {
        const PrintBox = await createBoxLabel(parms);
        setisPrinting(false);
        setisPrintingDone(true);

        if (PrintBox.status === 200) {
          setRemoveLocalDataPopup(true);
          RefreshDispatchOrder();
          Customer_Name_List();
          GetLocalData();
          setPrintdisable(true);
          setboxID(PrintBox.data.payload.box_id)

        }
      } catch (e) {
        setPrintdisable(false);
      }
    } else {
      setNoDataStatus(true);
    }
  };


  const PrintAgainBoxLabel_api_handle = async () => {
    console.log("button clicked......");
    const Local_Dispatch_Order_Detail = JSON.parse(
      localStorage.getItem("DispatchOrderDetailTable")
    );

    if (Local_Dispatch_Order_Detail) {
      setisPrinting(true);
      setPrintAgainstatus(false);

      const Local_OrderIDList = JSON.parse(localStorage.getItem("OrderIDList"));

      const scan_uid = [];

      Local_Dispatch_Order_Detail.forEach((item) => {
        scan_uid.push({ uid: item.first_uid });
      });

      console.log("scan_uid", scan_uid);

      const parms = {
        box_id: boxID,
        printer: printerChecked2
          ? "Printer 2"
          : null ?? printerChecked1
          ? "Printer 1"
          : null,
      };


      // setPrintdisable(true);
      try {
        const PrintBox = await PrintAgainBoxLabel(parms);
        setisPrinting(false);
        setisPrintingDone(true);

        if (PrintBox.status === 200) {
          setRemoveLocalDataPopup(true);
          RefreshDispatchOrder();
          Customer_Name_List();
          GetLocalData();
          setPrintdisable(true);
        }
      } catch (e) {
        setPrintdisable(false);
      }
    } else {
      setNoDataStatus(true);
    }
  };

  const HandlePrintButton = async () => {
    if (!Printdisable) {
      createBoxLabel_api_handle();
    }
  };

  const HandlePrintagain = async () => {
    PrintAgainBoxLabel_api_handle();
  };

  const GetBoxNo = async () => {
    const BoxNoApi = await getBoxNo();
    if (BoxNoApi.status === 200) {
      setBoxNo(BoxNoApi.data.payload.box_number);
    }
  };

  const Customer_Name_List = async () => {
    if (localStorage.getItem("Customer_Name")) {
      const Customer_Name_Data = JSON.parse(
        localStorage.getItem("Customer_Name")
      );
      if (localStorage.getItem("DispatchOrderDetailTable")) {
        const Name = {
          customer_name: Customer_Name_Data,
        };
        setCustomerName(Customer_Name_Data);
        setCustomerNameList([Name]);
      } else {
        const CNListApi = await getCustomerNameList();
        if (CNListApi.status === 200 && CNListApi.data.payload.length) {
          setCustomerNameList(CNListApi.data.payload);
          setCustomerName(Customer_Name_Data);
        }
      }
    } else {
      const CNListApi = await getCustomerNameList();
      if (CNListApi.status === 200 && CNListApi.data.payload.length) {
        setCustomerNameList(CNListApi.data.payload);
        localStorage.setItem(
          "Customer_Name",
          JSON.stringify(CNListApi.data.payload[0].customer_name)
        );
      }
    }
  };

  const handleRemoveStorage = async () => {
    localStorage.removeItem("OrderIDList");
    localStorage.removeItem("DispatchOrderDetailTable");
    localStorage.removeItem("Customer_Name");
    setisPrintingDone(false);
    HandlePrintHistoryStatus();
  };

  const handle_Box_Number = (B_Number) => {
    setBox_Number(B_Number);
    setEyePrintedBox(true);
    setPrintHistoryStatus(false);
  };

  const handlePrintedBoxTableBack_Button = (e) => {
    setEyePrintedBox(false);
    setPrintHistoryStatus(true);
  };

  return (
    <>
      {AddStatus ? (
        <div>
          <input
            type="text"
            placeholder="Enter value"
            value={Uid}
            onChange={UidHandle}
            style={{ paddingLeft: "20px", position: "absolute", top: "10px" }}
            autoFocus
          />
        </div>
      ) : null}

      <div className="PackDispatch-Container PackDispatch-container">
        <div className="page-header" style={{ marginBottom: -20 ,marginRight: 19}}>
          {PrintOrderStatus ? (
            <Link to="/dashboard" className="page-back-btn">
              <ArrowBackIcon />
              <span>Box Lable Printing</span>
            </Link>
          ) : null}

          {PrintHistoryStatus ? (
            <>
              <Link
                to="/PackDispatch"
                className="page-back-btn Print-History-header"
                onClick={() => BoxPrintHistoryBack()}
              >
                <ArrowBackIcon />
                <span>Box-Print History</span>
              </Link>
              {printerChecked1 ? (
                <button className={`PackDispatch-page-header-btn`}>P1</button>
              ) : printerChecked2 ? (
                <button className={`PackDispatch-page-header-btn`}>P2</button>
              ) : (
                ""
              )}
            </>
          ) : null}
        </div>

        {PrintOrderStatus ? (
          <div className="PackDispatch-header-btn-group1">
            <div className="PackDispatch-header-btn-group ">
              {/* <button
                className={`PackDispatch-page-header-btn ${
                  PrintPreviewStatus ? "filled" : ""
                }`}
                onClick={() => Handle_Remove_all_Data_Button()}
              >
                Remove All Data
              </button> */}
              <button
                className={`PackDispatch-page-header-btn ${
                  PrintPreviewStatus ? "filled" : ""
                }`}
                onClick={() => HandlePrintPreviewStatus()}
              >
                Print Preview
              </button>

              <button
                className={`PackDispatch-page-header-btn ${
                  PrintHistoryStatus ? "filled" : ""
                }`}
                onClick={() => HandlePrintHistoryStatus()}
              >
                Print History
              </button>

              {printerChecked1 ? (
                <button className={`PackDispatch-page-header-btn`}>P1</button>
              ) : printerChecked2 ? (
                <button className={`PackDispatch-page-header-btn`}>P2</button>
              ) : (
                ""
              )}

              <button
                className="PackDispatch-SettingsIcon-btn "
                onClick={() => {
                  SettingStatusHandle();
                }}
              >
                <SettingsIcon className="SettingsIcon" />
              </button>
              <button
                className="PackDispatch-page-header-btn"
                onClick={() => HandleAddData()}
              >
                <AddIcon />
              </button>
            </div>

            {SettingStatus ? (
              <div className="PrintOrder-message-box" ref={popupRef}>
                <div className="arrow"></div>

                <span className="Select-Printer">Select Printer</span>
                <br />

                <div className="Printer-container">
                  <span>Printer - 1</span>
                  <Checkbox
                    name="Printer1"
                    className="Printer-checkbox"
                    checked={printerChecked1}
                    onChange={() => handlePrinter1Change()}
                    onClick={() => handlePrinter1Change()}
                  />
                </div>

                <div className="Printer-container">
                  <span>Printer - 2</span>
                  <Checkbox
                    name="Printer2"
                    className="Printer-checkbox"
                    checked={printerChecked2}
                    onChange={() => handlePrinter2Change()}
                    onClick={() => handlePrinter2Change()}
                  />
                </div>
              </div>
            ) : null}

            {PrintOrderStatus ? (
              <div className="PackDispatch-header-btn-group-container ">
                <div
                  className="PackDispatch-header-btn-group boxno-customernumber"
                  style={{ gap: "70px" }}
                >
                  <div className="PackDispatch-header-btn-data">
                    <b style={{ margin: "3px" }}>Box No</b>
                    <b style={{ margin: "3px" }}>:</b>
                    {BoxNo}
                  </div>

                  <div className="PackDispatch-header-btn-data">
                    <b style={{ margin: "3px" }}>Customer Name</b>
                    <b style={{ margin: "3px" }}>:</b>
                    <select
                      className="Cname-drop-down"
                      onChange={HandleSelectChange}
                      value={CustomerName}
                    >
                      {CustomerNameList ? (
                        CustomerNameList.map((e) => {
                          return (
                            <>
                              <option
                                className="Cname-option"
                                //  key={e.customer_id}
                                value={e.customer_name}
                              >
                                {e.customer_name}
                              </option>
                            </>
                          );
                        })
                      ) : (
                        <option className="Cname-option">No Data Found</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="PackDispatch-header-btn-group ">
                  <b>Order ID</b>
                  <b style={{ margin: "2px" }}>:</b>

                  {OrderIdButton
                    ? OrderIdButton.map((m) => {
                        return (
                          <>
                            <button
                              className={`PackDispatch-page-header-btn ${
                                PrintPreviewStatus ? "filled" : ""
                              }`}
                            >
                              {m}
                            </button>
                          </>
                        );
                      })
                    : null}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {PrintPreviewStatus ? (
          <>
            <div className="Print-Preview-header">
              <div className="Print-Preview-Box-Lable-Printing">
                <Link
                  to="/PackDispatch"
                  className="page-back-btn"
                  onClick={() => Print_Preview_Box_Lable()}
                >
                  <ArrowBackIcon />
                  <span>Box Lable Printing</span>
                </Link>
              </div>

              <div className="Preview-PrintHistory-button">
                <button
                  className={`Print-Preview-PackDispatch-page-header-btn`}
                  style={{ padding: 0 }}
                >
                  <img
                    src={images.printIcon}
                    className={"Print-Preview-print-btn"}
                    onClick={() => {
                      HandlePrintButton();
                    }}
                  />
                </button>

                <button
                  className={`PackDispatch-page-header-btn  ${
                    PrintHistoryStatus ? "filled" : ""
                  }`}
                  onClick={() => HandlePrintHistoryStatus()}
                >
                  Print History
                </button>
              </div>
            </div>

            <div className="Print-Preview-main-container">
              <div className="PrintPreview-main">
                <div className="PrintPreview-main-left">
                  <QRCode
                    value={"https://www.raychemrpg.com"}
                    className="DemoOR"
                    alt="DemoOR"
                  />

                  <br />
                  <div className="Scanforme">
                    <span>Scan for me material details in box</span>
                  </div>

                  <img
                    src={images.RaychemRPGLogo}
                    className="RaychemRPGLogo"
                    alt="RaychemRPGLogo"
                  />
                </div>

                <div className="PrintPreview-main-right">
                  <div className="PrintPreview-main-right-row-img">
                    <img src={images.Kamfet} className="Kamfet" alt="Kamfet" />
                    <img
                      src={images.ElectricalGloves}
                      className="ElectricalGloves"
                      alt="ElectricalGloves"
                    />
                    <img
                      src={images.ExaminationModule}
                      className="ExaminationModule"
                      alt="ExaminationModule"
                    />
                  </div>

                  <table
                    style={{ width: "100%" }}
                    className="PrintPreview-main-right-table1"
                  >
                    <tr>
                      <th
                        style={{ width: "30%" }}
                        className="Customer-Name PrintPreview-main-right-table1-th"
                      >
                        Customer Name:
                      </th>
                      <td className="Customer-Name PrintPreview-main-right-table1-td">
                        {CustomerName ? CustomerName : ""}
                      </td>
                    </tr>
                  </table>

                  <table
                    style={{ width: "100%" }}
                    className="PrintPreview-main-right-table2"
                  >
                    <tr className="PrintPreview-main-right-table2-tr">
                      <th
                        style={{ width: "80%" }}
                        className="PrintPreview-main-right-table2-th "
                      >
                        Product Description :
                      </th>
                      <th className="PrintPreview-main-right-table1-td ">
                        Qty :
                      </th>
                    </tr>

                    <tr className="PrintPreview-main-right-table2-tr">
                      <td className="tabledata">
                        <span>
                          {ProductDescription1 ? ProductDescription1 : ""}
                        </span>
                      </td>
                      <td className="PrintPreview-main-right-table1-td tabledata">
                        <b>{Qty1 ? Qty1 : ""}</b>
                      </td>
                    </tr>
                    <tr className="PrintPreview-main-right-table2-tr">
                      <td className="tabledata">
                        <span>
                          {ProductDescription2 ? ProductDescription2 : ""}
                        </span>
                      </td>

                      <td className="PrintPreview-main-right-table1-td tabledata">
                        <b>{Qty2 ? Qty2 : ""}</b>
                      </td>
                    </tr>
                    <tr className="PrintPreview-main-right-table2-tr">
                      <td className="tabledata">
                        <span>
                          {ProductDescription3 ? ProductDescription3 : ""}
                        </span>
                      </td>

                      <td className="PrintPreview-main-right-table1-td tabledata">
                        <b>{Qty3 ? Qty3 : ""}</b>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {EyePrintedBox ? (
          <PrintedBoxTable
            box_number={Box_Number}
            backButton={(e) => handlePrintedBoxTableBack_Button(e)}
          />
        ) : null}

        {PrintOrderStatus ? <PackDispatchTable data={DispatchOrder} /> : null}
        {PrintHistoryStatus ? (
          <PrintHistoryTable
            sendReverseProps={(e) => handle_Box_Number(e)}
            Printer={
              printerChecked2
                ? "Printer 2"
                : null ?? printerChecked1
                ? "Printer 1"
                : null
            }
          />
        ) : null}
      </div>

      {AddStatus ? (
        <div className="Phone-image" ref={popupRef}>
          <img
            src={require("../../assets/images/phone.png")}
            alt="Description of the SVG"
            className="Phone-img"
          />
        </div>
      ) : null}

      {OrderidPopUp ? (
        <>
          <div className="sendingdataaaa1">
            <Card className="pairingcard-Approved">
              <CardContent className="p-0 pairing-status">
                <h4>{"You Can Not Scan More Then 3 Order Id Gloves Bag."}</h4>
              </CardContent>
              <Button
                className="pairingcard-btn"
                title="Ok"
                onClick={() => {
                  ClosePopUp();
                  setAddStatus(true);
                }}
              />
            </Card>
          </div>
        </>
      ) : null}

      {WrongOrderidPopUp ? (
        <>
          <div className="sendingdataaaa1">
            <Card className="pairingcard-Approved">
              <CardContent className="p-0 pairing-status">
                <h4>
                  {WrongOrderidPopUp_message ??
                    "UID pair does not belong to the provided customer"}
                </h4>
              </CardContent>
              <Button
                className="pairingcard-btn"
                title="Ok"
                onClick={() => {
                  ClosePopUp();
                  setAddStatus(true);
                }}
              />
            </Card>
          </div>
        </>
      ) : null}

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

      {NoDataStatus ? (
        <>
          <div className="sendingdataaaa1">
            <Card className="pairingcard-Approved">
              <CardContent className="p-0 pairing-status">
                <h4>Data Not Found !</h4>
              </CardContent>
              <Button
                className="pairingcard-btn"
                title="Close"
                onClick={() => {
                  setNoDataStatus(false);
                }}
              />
            </Card>
          </div>
        </>
      ) : null}

      {appState.LS_fuid_match ? (
        <>
          <div className="sendingdataaaa1">
            <Card className="pairingcard-Approved">
              <CardContent className="p-0 pairing-status">
                <h4>This Uid Already Scaned !</h4>
              </CardContent>
              <Button
                className="pairingcard-btn"
                title="Close"
                onClick={() => {
                  setAppState({ ...appState, LS_fuid_match: false });
                }}
              />
            </Card>
          </div>
        </>
      ) : null}

      {LocalData_null_Pop_up ? (
        <>
          <div className="sendingdataaaa1">
            <Card className="pairingcard-Approved">
              <CardContent className="p-0 pairing-status">
                <h4>No Data Found ....Please Scan Gloves</h4>
              </CardContent>
              <Button
                className="pairingcard-btn"
                title="Close"
                onClick={() => {
                  setLocalData_null_Pop_up(false);
                }}
              />
            </Card>
          </div>
        </>
      ) : null}

      {isPrintingDone ? (
        <>
          <div className="sendingdataaaa1">
            <Card className="pairingcard-Approved">
              <CardContent className="p-0 pairing-status">
                <h4>Printed</h4>
              </CardContent>
              <Button
                className="pairingcard-btn"
                title="Yes"
                onClick={() => handleRemoveStorage()}
              />
              <Button
                className="pairingcard-btn"
                title="No"
                onClick={() => {
                  NoPrintHandle();
                }}
              />
            </Card>
          </div>
        </>
      ) : null}

      {PrintAgainstatus ? (
        <>
          <div className="sendingdataaaa1">
            <Card className="pairingcard-Approved">
              <CardContent className="p-0 pairing-status">
                <h4>Print Again?</h4>
              </CardContent>
              <Button
                className="pairingcard-btn"
                title="Yes"
                onClick={() => HandlePrintagain()}
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
    </>
  );
};
