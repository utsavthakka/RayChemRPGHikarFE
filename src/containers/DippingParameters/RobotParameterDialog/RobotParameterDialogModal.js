import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "../../../components/Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import "../../DippingParameters/DippingParameters.css"
import TextField from "@material-ui/core/TextField";
import "../../DippingParameters/DippingParameters.css"
import { useState } from "react";
import { images } from "../../../config/images";


function RobotParameterDialogModal({
  closeModal,
  robotHistoryData,
  handleChange,
  handleSubmit,
  isData,
  batchType,
  isDisabled
}) {
  const [robotModal, setRobotModal] = useState({});

  const handleOpenModal = (i) => {
    // Set the `robotModal` state with the index `i`
    setRobotModal({ [i]: true });
  };
  
  return (
    <>
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title">Robot Parameter ({batchType})</div>
          <div onClick={() => closeModal(false)}>
            <CloseIcon />
          </div>
        </div>
        {isData ? (
          <>
            <div className="modal-table-wrapper">
              <TableContainer component={Paper} className="data-table">
                <Table className="modal-table modal-table-custom">
                  <TableHead className="robot-paramter-title">
                    <TableRow >
                      <TableCell rowSpan={2}><b>Date</b></TableCell>
                      <TableCell rowSpan={2}><b>Robot</b></TableCell>
                      <TableCell rowSpan={2}><b>Start Time</b></TableCell>
                      <TableCell rowSpan={2}><b>Stop Time</b></TableCell>
                      <TableCell rowSpan={2}><b>Shift</b></TableCell>
                      <TableCell rowSpan={2}><b>Temp</b></TableCell>
                      <TableCell rowSpan={2}><b>Humidity</b></TableCell>
                      <TableCell rowSpan={2}><b>Tank</b></TableCell>
                      <TableCell rowSpan={2}><b>Immerse speed<br />(mm/s)</b></TableCell>
                      <TableCell rowSpan={2}>
                        <b>Beading dwell time (sec)</b>
                      </TableCell>
                      <TableCell rowSpan={2}><b>Dwell time (sec)</b></TableCell>
                      <TableCell colSpan={4} width={1600}><b>Withdraw speed (mm/s)</b></TableCell>
                      <TableCell rowSpan={2}><b>Hold <br />Time <br /> (s)</b></TableCell>
                      <TableCell rowSpan={2}><b>Rot.<br /> speed<br />(%)</b></TableCell>
                      <TableCell rowSpan={2}><b>Rot.<br /> time <br />(s)</b></TableCell>
                      <TableCell rowSpan={2}>
                        <b> 1st Rot.<br /> hold time <br />(s)</b>
                      </TableCell>
                      <TableCell rowSpan={2}>
                        <b>Rot.<br /> uphold time <br />(s)</b>
                      </TableCell>
                      <TableCell colSpan={4}><b>Depth (mm)</b></TableCell>
                      <TableCell rowSpan={2}><b>Beading<br /> Length<br /> (mm)</b></TableCell>
                      <TableCell rowSpan={2}><b>Remarks</b></TableCell>
                      <TableCell rowSpan={2}><b>Supervisor</b></TableCell>
                    </TableRow>
                    <TableRow className="tableRow">
                      <TableCell width={500}>Z1</TableCell>
                      <TableCell width={500}>Z2</TableCell>
                      <TableCell width={500}>Z3</TableCell>
                      <TableCell width={500}>Z4</TableCell>
                      <TableCell width={500}>Z1</TableCell>
                      <TableCell width={500}>Z2</TableCell>
                      <TableCell width={500}>Z3</TableCell>
                      <TableCell width={500}>Z4</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {robotHistoryData.map((colum, i, robot) => (

                      <>
                        <TableRow>
                          <TableCell rowSpan={2}>
                            {dayjs(colum.created_at).format("YYYY-MM-DD")}
                          </TableCell>
                          <TableCell rowSpan={2}>{colum.robot_type}</TableCell>
                          <TableCell rowSpan={2}>
                            {(dayjs(colum.start_time).format("hh:mm:ss") !== "Invalid Date") ? dayjs(colum.start_time).format("hh:mm:ss") : "-"}
                            {/* <TextField
                              style={{ width: "85px" }}
                              // value={handleTimeValue(colum.start_time)}
                              value={(dayjs(colum.start_time).format("hh:mm:ss") !== "Invalid Date") ? dayjs(colum.start_time).format("hh:mm:ss") : "-"}
                              name="start_time"
                              type="text"
                              autoComplete="off"
                            /> */}
                          </TableCell>
                          <TableCell rowSpan={2}>
                            {(dayjs(colum.stop_time).format("hh:mm:ss") !== "Invalid Date") ? dayjs(colum.stop_time).format("hh:mm:ss") : "-"}
                            {/* <TextField
                              style={{ width: "85px" }}
                              value={(dayjs(colum.stop_time).format("hh:mm:ss") !== "Invalid Date") ? dayjs(colum.stop_time).format("hh:mm:ss") : "-"}
                              // value={ colum.stop_time ? handleTimeValue(colum.stop_time) : "-"}
                              name="stop_time"
                              type="text"
                              autoComplete="off"
                            /> */}
                          </TableCell>
                          <TableCell rowSpan={2}>{colum.robot_shift}</TableCell>
                          <TableCell rowSpan={2}>
                            <TextField
                              value={colum.robot_parameter.temperature}
                              name="temperature"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "temperature")
                              }
                              autoComplete="off"
                            /></TableCell>
                          <TableCell rowSpan={2}>
                            <TextField
                              value={colum.robot_parameter.humidity}
                              name="humidity"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "humidity")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0].tank
                              }
                              autoComplete="off"
                              name="tank"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0].immerse_speed
                              }
                              name="immerse_speed"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0]
                                  .beadingdwell_time
                              }
                              name="beadingdwell_time"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0].dwell_time
                              }
                              name="dwell_time"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              style={{ width: "50px" }}
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0].w_zone_1
                              }
                              name="w_zone_1"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              style={{ width: "50px" }}
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0].w_zone_2
                              }
                              name="w_zone_2"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              style={{ width: "50px" }}
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0].w_zone_3
                              }
                              name="w_zone_3"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              style={{ width: "50px" }}
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0].w_zone_4
                              }
                              name="w_zone_4"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0].hold_time
                              }
                              name="hold_time"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0].rotation_speed
                              }
                              name="rotation_speed"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0].rotation_time
                              }
                              name="rotation_time"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0]
                                  .first_rotation_hold_time
                              }
                              name="first_rotation_hold_time"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0]
                                  .rotations_uphold_time
                              }
                              name="rotations_uphold_time"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              style={{ width: "50px" }}
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0].d_zone_1
                              }
                              name="d_zone_1"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              style={{ width: "50px" }}
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0].d_zone_2
                              }
                              name="d_zone_2"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              style={{ width: "50px" }}
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0].d_zone_3
                              }
                              name="d_zone_3"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              style={{ width: "50px" }}
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0].d_zone_4
                              }
                              name="d_zone_4"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_first[0].beading_length
                              }
                              name="beading_length"
                              type="text"
                              onChange={(e) =>
                                handleChange(e, i, "robot_default_values_first")
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell rowSpan={2}>
                            <div onClick={() => handleOpenModal(i)}>
                              <img src={images.remarks} style={{ cursor: "pointer" }} />
                            </div>
                            {robotModal[i] &&
                              <div className="remarksModal">
                                <CloseIcon style={{ position: "absolute", zIndex: 99, right: 0, top: 0 }} onClick={() => setRobotModal({ ...robotModal, [i]: false })} />
                                <textarea name="remarks" style={{ padding: "22px", border: "none" }} rows="6" cols="30" value={colum.robot_parameter.remarks} onChange={(e) => handleChange(e, i, "remarks")
                                }>
                                </textarea>
                              </div>
                            }
                          </TableCell>
                          <TableCell rowSpan={2}>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .supervisor
                              }
                              name="supervisor"
                              type="text"
                              autoComplete="off"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0].tank
                              }
                              name="tank"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0].immerse_speed
                              }
                              name="immerse_speed"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0]
                                  .beadingdwell_time
                              }
                              name="beadingdwell_time"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0].dwell_time
                              }
                              name="dwell_time"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0]
                                  .w_zone_1
                              }
                              name="w_zone_1"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0]
                                  .w_zone_2
                              }
                              name="w_zone_2"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0]
                                  .w_zone_3
                              }
                              name="w_zone_3"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0]
                                  .w_zone_4
                              }
                              name="w_zone_4"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0].hold_time
                              }
                              name="hold_time"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0].rotation_speed
                              }
                              name="rotation_speed"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0].rotation_time
                              }
                              name="rotation_time"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0]
                                  .first_rotation_hold_time
                              }
                              name="first_rotation_hold_time"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0]
                                  .rotations_uphold_time
                              }
                              name="rotations_uphold_time"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0].d_zone_1
                              }
                              name="d_zone_1"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0].d_zone_2
                              }
                              name="d_zone_2"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0].d_zone_3
                              }
                              name="d_zone_3"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0].d_zone_4
                              }
                              name="d_zone_4"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={
                                colum.robot_parameter
                                  .robot_default_values_second[0].beading_length
                              }
                              name="beading_length"
                              type="text"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  i,
                                  "robot_default_values_second"
                                )
                              }
                              autoComplete="off"
                            />
                          </TableCell>
                        </TableRow>
                      </>

                    ))}

                  </TableBody>
                </Table>
              </TableContainer>
              <div aria-disabled={isDisabled} className="modal-submit-button common-button" >
                <Button title="Submit" onClick={handleSubmit} className={`${isDisabled ? "disabledd-btn" : "modal-submit-button common-button"}`} />
              </div>
            </div>
          </>
        ) : (

          <img src={images.notFoundImage} className="notfound-image" />

        )}
      </div>
      <div className="modal-overlay" onClick={() => closeModal(false)}></div>
    </>
  );
}

export default RobotParameterDialogModal;
