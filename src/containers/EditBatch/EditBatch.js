import React, { useState, useEffect } from "react";
import "../../index.css";
import { ValidatorForm } from "react-material-ui-form-validator";
import FormControl from "@mui/material/FormControl";
import { ToastContainer, toast } from 'react-toastify';
import { getClasses, postBatch, getSizes, uidPostBatch, getGlovesTypes, editBatch } from "../AddBatch/services";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../../components/Button/Button";
import { getcuff } from "../GlovesPairing/services";
import { images } from "../../config/images";

// Initialize state variables
const EditBatch = ({ onCloseClick,selected,editData }) => {
  const [glowsType, setGlowsType] = useState(1);
  const [batchNo, setBatchNo] = useState("");
  const [totalGloves, setTotalGloves] = useState("");
  const [uidStart, setUidStart] = useState("");
  const [uidEnd, setUidEnd] = useState("");
  const [lotNo, setLotNo] = useState(editData.lot_number);
  const [classes, setClasses] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [size, setSize] = useState([]);
  const [selectedClass, setSelectClass] = useState(editData.class_id);
  const [selectSize, setSelectSize] = useState(editData.size);
  const [SERE, setSERE] = useState(1);
  const [disable, setDisable] = useState(false);
  const [editHandle, setEditHandle] = useState(true);
  const [handGlovesType, setHandGlovesType] = useState('');
  const [cuff, setCuff] = useState('');
console.log("editDataeditDataeditData",editData)
  // fetching data from an API
  useEffect(() => {
    getData();
    setSERE(editData.scre == "S.C." ? 1 : 2)
    return () => { };
  }, []);

  useEffect(() => {
    if ((typeof totalGloves !== "number" || totalGloves < 0) && uidEnd !== "") {
      setUidEnd("");
    }
    return () => { };
  }, [totalGloves, uidStart, glowsType, handGlovesType]);

  useEffect(() => {
    uidTypeData()
  }, [glowsType, totalGloves, handGlovesType, editHandle]);

  useEffect(() => {
    handleEdit()
  }, [totalGloves, uidStart, glowsType, handGlovesType])

  // Define an async function to fetch data from API and set the state variables
  const getData = async () => {
    try {
      // Call API to get classes and set the state variable for classes
      const resp = await getClasses();
      setClasses(resp.data.payload);

      // Call API to get sizes and set the state variable for size
      const resp1 = await getSizes();
      setSize(resp1.data.payload);

      // Call API to get glove types and set the state variable for hand gloves type
      const resp2 = await getGlovesTypes();
      setHandGlovesType(resp2.data)

      // Call API to get cuff types and set the state variable for cuff
      const resp3 = await getcuff();
      setCuff(resp3.data);
    } catch (error) {
      console.log(error);
    }
  };

  const uidTypeData = async () => {
      // Define parameter for uidPostBatch API call
    const param1 = {

      ui_type: selectedGlovesType,
      total_number_of_gloves: totalGloves || 1,
    };
    try {
       // Make uidPostBatch API call
      const resp = await uidPostBatch(param1);
      setLoading(false);
      if (resp.data.success == true) {
         // Update state with uid values
        if (editHandle) {
          setUidStart(resp.data.payload.start_uid);
        }
        if (editHandle) {
          if (totalGloves > 0) {
            setUidEnd(resp.data.payload.end_uid);
          }
        }
        setBatchNo(resp.data.payload.start_batch);
      }
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit", error);
    }
  }

  const selectedGlovesType = handGlovesType ? handGlovesType.find((e) => e.id == glowsType).gloves_type_name : '';
  const selectedType = cuff ? cuff.find((e) => e.id == SERE).cuff_name : '';

  const navigate = useNavigate();
  
    const handleSubmit = async () => {
      setLoading(true);

      const params = {
        lot_number: lotNo,
        class_id: selectedClass,
        size: selectSize,
        scre: selectedType
      }
      try {
        const resp = await editBatch(selected[0],params);
        setLoading(false);
        if (resp.status == 200 || resp.status == 201) {
            onCloseClick();
       window.location.reload(false);
        } 
      } catch (error) {
        setLoading(false);
        console.log("handleSubmit", error);
      }
    };

  const handleEdit = async () => {
    const param1 = {
      auto: editHandle,
      ui_type: selectedGlovesType,
      total_number_of_gloves: totalGloves || 1,
      start_uid: uidStart,
    };
    try {
      const resp = await uidPostBatch(param1);
      setLoading(false);
      if (resp.data.success == true) {
        if (totalGloves > 0) {
          setUidEnd(resp.data.payload.end_uid);
        }
        setBatchNo(resp.data.payload.start_batch);
      } else {
        toast.error('Please Fill the data', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("Something was wrong, try again");
      }
    } catch (error) {
      setLoading(false);
    }
  }

  const handleEditClick = async () => {
    const param1 = {
      auto: !editHandle,
      ui_type: selectedGlovesType,
      total_number_of_gloves: totalGloves || 1,
      start_uid: !editHandle ? uidStart : "00000001"
    };
    try {
      const resp = await uidPostBatch(param1);
      setLoading(false);
      if (resp.data.success == true) {
        setEditHandle(!editHandle)
        // setUidStart("");
        // setBatchNo(resp.data.payload.start_batch);
      } else {
        toast.error('uid already exists', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit", error);
    }
  }


  const handleUidStart = (e) => {
    if (!editHandle) {
      setUidStart(e.target.value)
    }

  }


  

  return (
    <div >
      <ToastContainer />
      <div className="modal-header">
        <div className="modal-title">Edit Batch</div>
        <div onClick={onCloseClick}>
          <CloseIcon />
        </div>
      </div>
      <div className="modal-wrapper add-batch-modal">
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container spacing={2} className="radio-btn">
            <Grid item md={5} sm={12} xs={12} className="radio-btn-section">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={glowsType}
                  onChange={(e) => setGlowsType(e.target.value)}
                  className="radio-button"
                  
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label={handGlovesType ? handGlovesType[0] ? handGlovesType[0].gloves_type_name : '' : ''}
                    className="radio-button-color radio-label"
                    disabled
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label={handGlovesType ? handGlovesType[1] ? handGlovesType[1].gloves_type_name : '' : ''}
                    className="radio-button-color radio-label"
                    disabled
                  />
                  <FormControlLabel
                    value={3}
                    control={<Radio />}
                    label={handGlovesType ? handGlovesType[2] ? handGlovesType[2].gloves_type_name : '' : ''}
                    className="radio-button-color radio-label"
                    disabled
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={7} sm={12} xs={12} className="batch">
              <div className="d-flex justify-content-between batchNo" >
                <h6>Batch No.</h6>
              </div>
              <input
                id="outlined-basic"
                // onChange={(event) => setBatchNo(event.target.value)}
                value={editData.batch_type}
                variant="outlined"
                className="form-input"
                style={{ background: "#F4F7FE" }}
                autoComplete="off"
                disabled

              />
              <h6 className="d-flex m-0">Total No. of Gloves<p style={{ color: "red", marginLeft: "2px" }}>*</p></h6>
              <input
                id="outlined-basic"
                value={editData.total_number_of_gloves}
                variant="outlined"
                className="form-input"
                onChange={(event) => setTotalGloves(event.target.value)}
                type="number"
                min='1'
                max="40"
                required
                autoComplete="off"
                disabled
              />

              <div className="d-flex justify-content-between batchNo" >
                <h6>UID</h6>
                <div onClick={() => handleEditClick()}>
                  <button className="edit-btn"><img src={images.editIcon} style={{ cursor: "pointer" }} /></button>
                </div>
              </div>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                className="uid-box"
              >
                <input
                  id="outlined-basic"
                  variant="outlined"
                  className="form-input"
                  value={editData.batch_id[0].uid_id_type}
                  onChange={handleUidStart}
                  style={{ flex: 1, margin: 0, background: "#F4F7FE" }}
                  autoComplete="off"
                  disabled

                />
                <input
                  id="outlined-basic"
                  variant="outlined"
                  className="form-input"
                  value={editData.batch_id[editData.batch_id.length - 1].uid_id_type}
                  style={{ flex: 1, margin: 0, background: "#F4F7FE" }}
                  autoComplete="off"
                  disabled

                />
              </Box>
              <h6 className="d-flex m-0">LOT No.<p style={{ color: "red" }}>*</p></h6>
              <input
                id="outlined-basic"
                onChange={(event) => setLotNo(event.target.value)}
                name="Lot no."
                value={lotNo}
                variant="outlined"
                className="form-input"
                required
                autoComplete="off"
              />
              <div className="d-flex">
                <div className="tableclass" >
                  <h6 className="d-flex m-0">Class <p style={{ color: "red", marginLeft: "2px" }}> *</p></h6>
                </div>
                <div className="tableclass" >
                  <h6 className="d-flex m-0">Size <p style={{ color: "red", marginLeft: "2px" }}>*</p></h6>
                </div>
              </div>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                className="uid-box"
              >

                <select className="form-input" value={selectedClass}
                  onChange={(event) => setSelectClass(event.target.value)}
                  required >
                  <option value="none" selected disabled hidden>
                    Select Class
                  </option>
                  {classes.map((event) => (
                    <option value={event.class_id}>
                      {event.class_name}
                    </option>
                  ))}
                </select>


                <select className="form-input" value={selectSize}
                  onChange={(event) => setSelectSize(event.target.value)} required>
                  <option value="none" selected disabled hidden>
                    Select Size
                  </option>
                  {size.map((element) => (
                    <option value={element.size_id}>
                      {element.size_name}
                    </option>
                  ))}
                </select>

              </Box>


              <FormControl className="add-batch-form">
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  required
                  value={SERE}
                  onChange={(e) => setSERE(e.target.value)}
                  className="radio-button"
                >
                  <FormControlLabel value={1} control={<Radio required={true} />} label={cuff ? cuff[0] ? cuff[0].cuff_name : "" : ""} className="radio-label-scre" />
                  <FormControlLabel value={2} control={<Radio required={true} />} label={cuff ? cuff[1] ? cuff[1].cuff_name : "" : ""} className="radio-label-scre" />
                </RadioGroup>
              </FormControl>
              <br />
              <br />
            </Grid>
          </Grid>
          <Button title="Submit" className="submit-button common-button" disabled={disable}></Button>

        </ValidatorForm>
      </div>
    </div>
  );
};
export default EditBatch;
