import React, { useRef, useState } from "react";
import "./ManulDatabase.css";
import {
  Station_api,
  uploadBatchExcel,
  getdemofile,
  bagLabelDataReport,
  boxLabelDataReport,
} from "./services";
import Loader from "../../components/Loader/Loader";
import { Card, CardContent } from "@mui/material";
import Button from "../../components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import COCDatePicker from "../../components/DateTimePicker/DateTimePicker";
import dayjs from "dayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const ManualDatabase = () => {
  const fileInputRef = useRef(null);
  const [Filename, setFilename] = useState("");
  const [File, setFile] = useState("");
  const [Station, setStation] = useState("");
  const [Addbatch, setAddbatch] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Popupmessage, setPopupmessage] = useState("");
  const [Stationname, setStationname] = useState("");
  const [Addbatchname, setAddbatchname] = useState("");
  const [showTime, setShowTime] = useState(false);
  const [isPopup, setisPopup] = useState(false);
  const [apicall, setapicall] = useState("");

  const [startDateReFormat, setStartDateReFormat] = useState(null);
  const [endDateReFormat, setEndDateReFormat] = useState(null);
  const [Response_message_popup, setResponse_message_popup] = useState("");
  const [message_popup, setmessage_popup] = useState(false);
  const dateFormat = "YYYY-MM-DD HH:mm:ss";
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const formatStartDate = startDateReFormat
    ? dayjs(startDateReFormat).format(dateFormat)
    : "";
  const formatEndDate = endDateReFormat
    ? dayjs(endDateReFormat).format(dateFormat)
    : "";

  const handleEndDate = (newEndDate) => {
    if (showTime) {
      setEndDateReFormat(newEndDate);
    } else {
      setEndDateReFormat(dayjs(newEndDate).hour(23).minute(59).second(0));
    }
  };

  const handleStartDate = (newStartDate) => {
    console.log("newStartDate...........", newStartDate);

    setStartDateReFormat(newStartDate);
  };

  const radioClick = (e) => {
    // console.log('.e',e.target.id);
    setStation(e.target.id);
    console.log(e.target.value);
    setStationname(e.target.value);
    setAddbatch("");
    setAddbatchname("");
    setSelectedCheckbox(e.target.value);
  };

  const addbatchHandle = (e) => {
    setStation("");
    setStationname("");
    setAddbatch(e.target.id);
    console.log(e.target.value);
    setAddbatchname(e.target.value);
  };

  const params = {
    file: File,
    station: Station,
    addbatch: Addbatch,
  };

  const params1 = {
    file: File,
    addbatch: Addbatch,
  };

  const SucessResponse = async (resp, download) => {
    if (resp.data.success === true && resp.status === 200) {
      if (download) {
        const url = resp.data.payload;
        const link = document.createElement("a");
        link.href = url;
        await link.click();
        console.log("link.......", link);
        console.log("link.....1", url);

        // document.body.removeChild(link);
        console.log("link", link);
        console.log("link", url);
        // url.click();
      }
      //  window.location.reload()
      setLoading(false);
      setPopupmessage(resp.data.message);
      console.log("resp..", resp);
    } else {
      setLoading(false);
      setPopupmessage(resp.data.message);
      console.log("resp..", resp);
    }
  };

  const Toster = (msg) => {
    return toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  // const msg_data = 'Pop Up Show Sucessfully Completed'
  //     Toster(msg_data)

  const HandleBagLable = async () => {
    const params = {
      start_date: formatStartDate,
      end_date: formatEndDate,
    };
    try {
      const bagLabelApi = await bagLabelDataReport(params);
      console.log("bagLabelApi", bagLabelApi.data.message);
      setResponse_message_popup(bagLabelApi.data.message);
      setmessage_popup(true);
      setStartDateReFormat("");
      setEndDateReFormat("");
    } catch (e) {
      console.log("error in HandleBagLable", e);
    }
  };

  const HandleBoxLable = async () => {
    const params = {
      start_date: formatStartDate,
      end_date: formatEndDate,
    };
    try {
      const boxLabelApi = await boxLabelDataReport(params);
      setResponse_message_popup(boxLabelApi.data.message);
      setmessage_popup(true);
      setStartDateReFormat("");
      setEndDateReFormat("");
    } catch (e) {
      console.log("error in HandleBoxLable", e.response.data);
    }
  };

  const handleApiCall = () => {
    if (apicall == "Bag Lable Report") {
      HandleBagLable();
    }

    if (apicall == "Box Lable Report") {
      HandleBoxLable();
    }
  };

  const GetDemoFile = async () => {
    if (Station) {
      const params = { endpoint: Stationname };
      console.log("params", params.endpoint);
      const download = "download";
      const resp = await getdemofile(params);

      await SucessResponse(resp, download);
      console.log("station ");
      // window.location.reload()
      console.log("station done");
    }
    if (Addbatch) {
      const params = { endpoint: Addbatchname };
      console.log("params", params.endpoint);
      const download = "download";
      const resp = await getdemofile(params);
      await SucessResponse(resp, download);
      // window.location.reload()
    }
  };

  const onSubmitClick = async (e) => {
    e.preventDefault();
    {
      File && Station && setLoading(true);
    }
    // {!Station && !File && console.log('File null') }

    if (!Station && !File) {
      const msg_data = "Please Select Station , Upload File,add batch";
      Toster(msg_data);
      // toast.error("", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: false,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
    } else {
      const msg_data = "Please Select Station , Upload File,add batch";
      {
        !Station && !Addbatch && Toster(msg_data);
        // toast.error("Please Select Station or add batch", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: false,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      }

      {
        !File && Toster("Please Upload File");

        //   (toast.error("Please Upload File", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: false,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // }))
      }
    }

    // console.log("params",params)
    try {
      if (Station) {
        if (File && Station) {
          setLoading(true);
          const resp = await Station_api(params);

          SucessResponse(resp);
        }
      }

      if (Addbatch) {
        if (File && Addbatch) {
          setLoading(true);
          console.log("params", params1);
          const resp = await uploadBatchExcel(params1);
          SucessResponse(resp);
        }
      }
    } catch (e) {
      setLoading(false);
      if (e.response.data.message) {
        setPopupmessage(e.response.data.message);
      }

      console.log("error Station_api .....", e);
      console.log("error Station_api .....", e.response.data.message);
    }
  };

  const FileUpload = () => {
    console.log("done...filename.....", fileInputRef.current.files[0].name);
    setFilename(fileInputRef.current.files[0].name);
    setFile(fileInputRef.current.files[0]);
  };

  const Closepopup = () => {
    // setFilename('')
    // setFile('')
    // setStation('')
    // setAddbatch('')
    // setLoading(false)
    // setPopupmessage('')
    // setStationname('')
    // setAddbatchname('')
    window.location.reload();
  };

  const HandleDateTimePickerValidation = (e) => {
    e.preventDefault();
    if (startDateReFormat && endDateReFormat) {
      setisPopup(true);
      setapicall(e.target.value);
    }
    if (!startDateReFormat && endDateReFormat) {
      setResponse_message_popup("Start Date field is Required");
      setmessage_popup(true);
    }

    if (!startDateReFormat && !endDateReFormat) {
      setResponse_message_popup(
        "Start Date and End Date both fields are Required"
      );
      setmessage_popup(true);
    }
    if (startDateReFormat && !endDateReFormat) {
      setResponse_message_popup("End Date field is Required");
      setmessage_popup(true);
    }
  };
  return (
    <>
      <div>
        <ToastContainer />

        {/* <ToastContainer /> */}
        <div className="main-manual-database-container">
          <form
            className={`Station-form ${
              Popupmessage ? "Station-form-blure" : ""
            }`}
          >
            <h1 className="Manualdb">Upload Data Files</h1>
            <fieldset>
              <div className="checkbox-upload-flex">
                <div className="station-checkbox">
                  <legend class="label">Select Station </legend>
                  <label for="StationTwoUploadExcel" className="radio">
                    <input
                      id="StationTwoUploadExcel/"
                      type="checkbox"
                      name="radio"
                      className="inline input-field-u1 toggle"
                      onChange={radioClick}
                      value="/downloadStationTwoExcel"
                      checked={selectedCheckbox === "/downloadStationTwoExcel"}
                    />{" "}
                    Station 2
                  </label>
                  <label for="StationThreeUploadExcel" className="radio">
                    <input
                      id="StationThreeUploadExcel/"
                      type="checkbox"
                      name="radio"
                      className="inline input-field-u1"
                      onChange={radioClick}
                      checked={
                        selectedCheckbox === "/downloadStationThreeExcel"
                      }
                      value="/downloadStationThreeExcel"
                    />{" "}
                    Station 3
                  </label>
                  <label for="StationFourUploadExcel" className="radio">
                    <input
                      id="StationFourUploadExcel/"
                      type="checkbox"
                      name="radio"
                      className="inline input-field-u1"
                      onChange={radioClick}
                      checked={selectedCheckbox === "/downloadStationFourExcel"}
                      value="/downloadStationFourExcel"
                    />{" "}
                    Station 4
                  </label>
                  <label for="addbatch" className="radio">
                    <input
                      id="uploadBatchExcel/"
                      type="checkbox"
                      name="radio"
                      className="inline input-field-u1"
                      onChange={(e) => {
                        addbatchHandle(e);
                        radioClick(e);
                      }}
                      value="/downloadBatchExcel"
                      checked={selectedCheckbox === "/downloadBatchExcel"}
                    />{" "}
                    Add Batch
                  </label>
                </div>

                <div className="station-upload">
                  <fieldset className="upload-file station-upload-button">
                    <label for="profile-picture">
                      Upload File <CloudUploadIcon />
                      <input
                        className="file-upload input-field-u1"
                        id="profile-picture"
                        type="file"
                        name="file"
                        ref={fileInputRef}
                        onChange={FileUpload}
                        accept=".xlsx"
                        required
                      />
                    </label>
                  </fieldset>
                  <input
                    className="submit submit-btn  input-field-u1"
                    type="submit"
                    value="Submit"
                    onClick={onSubmitClick}
                  />
                </div>
              </div>
            </fieldset>

            {Filename ? (
              <span className="file-name">
                <b>Uploaded File:</b>
                {Filename}
              </span>
            ) : null}

            <fieldset className="upload-file">
              <label for="submit submit-btn  input-field-u1">
                {" "}
                Get Demo File
                <input
                  className="submit submit-btn  input-field-u1"
                  id="profile-picture"
                  type="submit"
                  name="submit"
                  value="Download"
                  onClick={GetDemoFile}
                />
              </label>
            <b>Please select a station to download the Demo File</b>  
            </fieldset>

            {/* <input
              className="submit submit-btn  input-field-u1"
              type="submit"
              value="Submit"
              onClick={onSubmitClick}
            /> */}
          </form>

          <div
            className={`Station-form ${
              Popupmessage ? "Station-form-blure " : ""
            } Station-for-mmanual-datetimepicker`}
          >
            <h1 className="Manualdb">Download Reports</h1>
            <form>
              <div className="manualdb-datetimepicker">
                <COCDatePicker
                  time={showTime}
                  startDateReFormat={startDateReFormat}
                  endDateReFormat={endDateReFormat}
                  handleStartDate={handleStartDate}
                  handleEndDate={handleEndDate}
                  Start_Date_lable={"Start Date"}
                  end_Date_lable={"End Date"}
                />
              </div>

              <div className="box-bag-button-container">
                <input
                  className="submit submit-btn  input-field-u1"
                  id="profile-picture"
                  type="submit"
                  name="Bag Lable"
                  value="Bag Lable Report"
                  onClick={(e) => {
                    HandleDateTimePickerValidation(e);
                  }}
                />

                <input
                  className="submit submit-btn  input-field-u1"
                  type="submit"
                  value="Box Lable Report"
                  onClick={(e) => {
                    HandleDateTimePickerValidation(e);
                  }}
                />
              </div>
            </form>
          </div>
        </div>

        {Loading && <Loader />}

        {Popupmessage && (
          <>
            <div className="Station-data-popup">
              <Card className="Station-data-msg">
                <CardContent className="p-0 pairing-status">
                  <h4>{Popupmessage}</h4>
                </CardContent>
                <Button
                  className="Station-data-popup-btn"
                  title="Ok"
                  onClick={Closepopup}
                />
              </Card>
            </div>
          </>
        )}

        {isPopup ? (
          <>
            <div className="sendingdataaaa1">
              <Card className="pairingcard-Approved">
                <CardContent className="p-0 pairing-status">
                  <h4>Are you sure you want to {apicall}?</h4>
                </CardContent>
                <Button
                  className="pairingcard-btn"
                  title="Yes"
                  onClick={() => {
                    handleApiCall();
                    setisPopup(false);
                  }}
                />
                <Button
                  className="pairingcard-btn"
                  title="No"
                  onClick={() => setisPopup(false)}
                />
              </Card>
            </div>
          </>
        ) : null}

        {/* {message_popup ? (
        <>
          <div className="sendingdataaaa1">
            <Card className="pairingcard-Approved">
              <CardContent className="p-0 pairing-status">
                <h4>{Response_message_popup}</h4>
              </CardContent>

              <Button
                className="pairingcard-btn"
                title="Close"
                onClick={() => setmessage_popup(false)}
              />
            </Card>
          </div>
        </>
      ) : null} */}
      </div>

      {message_popup ? (
        <>
          <div className="sendingdataaaa1">
            <Card className="pairingcard-Approved">
              <CardContent className="p-0 pairing-status">
                <h4>{Response_message_popup}</h4>
              </CardContent>

              <Button
                className="pairingcard-btn"
                title="Close"
                onClick={() => setmessage_popup(false)}
              />
            </Card>
          </div>
        </>
      ) : null}

      <div className="d-flex justify-content-end aborted">
        <p style={{ margin: 0, marginBottom: 0 }}>
          Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
          Rights Reserved
        </p>
      </div>
    </>
  );
};

// if(resp.data.success=== true && resp.status===200)
// {
//    setLoading(false)
//    setPopupmessage(resp.data.message)

//   console.log('resp..',resp)
// }
// else
// {
//   setLoading(false)
//   setPopupmessage(resp.data.message)
//   console.log('resp..',resp)

// }

// if(resp.data.success=== true && resp.status===200)
// {
//    setLoading(false)
//    setPopupmessage(resp.data.message)

//   console.log('resp..',resp)
// }
// else
// {
//   setLoading(false)
//   setPopupmessage(resp.data.message)
//   console.log('resp..',resp)

// }

// {Popupmessage && setTimeout(()=> window.location.reload(),2000)}

// {Station && toast.error("Invalid Username and Password", {
//   position: "top-right",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: false,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
// });}
