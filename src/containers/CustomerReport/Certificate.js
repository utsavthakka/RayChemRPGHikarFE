import {
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../CustomerReport/CustomerReport.css";
import { generateBatchReport } from "./services";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ToastContainer, toast } from "react-toastify";
import { images } from "../../config/images";

function CertificateofAccorance() {
  const [isLoading, setLoading] = useState(false);

  //redux getdata stored
  const { batchTest } = useSelector((state) => state.batchState);
  const navigate = useNavigate();

  // Define initial values for state variables related to different types of tests
  const initialValueInMechanicalCharacteristics = {
    Tensile_Strength_spec: "",
    Tensile_Strength_results: "",
    Elongation_At_Break_spec: "",
    Elongation_At_Break_results: "",
    Mechanical_Puncture_spec: "",
    Mechanical_Puncture_results: "",
  };
  const [mechanicalCharacteristics, setMechanicalCharacteristics] = useState(
    initialValueInMechanicalCharacteristics
  );

  const initialValueInageing_test_conditioning = {
    Tensile_Strength_spec: "",
    Tensile_Strength_results: "",
    Elongation_At_Break_spec: "",
    Elongation_At_Break_results: "",
    Conservation_Strength_spec: "",
    Conservation_Strength_results: "",
    Conservation_Elongation_spec: "",
    Conservation_Elongation_results: "",
  };
  const [ageing_test_conditioning, setAgeing_test_conditioning] = useState(
    initialValueInageing_test_conditioning
  );

  const initialElectrical_test_conditioning = {
    Initial_RESULT_1: "",
    Initial_RESULT_2: "",
    Initial_RESULT_3: "",
    H_At_70c_RESULT_1: "",
    H_At_70c_RESULT_2: "",
    H_At_70c_RESULT_3: "",
    electrical_Withstand_RESULT_1: "",
    electrical_Withstand_RESULT_2: "",
    electrical_Withstand_RESULT_3: "",
  };
  const [electrical_test_conditioning, setElectrical_test_conditioning] =
    useState(initialElectrical_test_conditioning);

  const initialElectricalTestConditioningByImmersion = {
    Initial_RESULT_1: "",
    Initial_RESULT_2: "",
    Initial_RESULT_3: "",
    H_At_70c_RESULT_1: "",
    H_At_70c_RESULT_2: "",
    H_At_70c_RESULT_3: "",
    electrical_Withstand_RESULT_1: "",
    electrical_Withstand_RESULT_2: "",
    electrical_Withstand_RESULT_3: "",
  };
  const [
    electricalTestConditioningByImmersion,
    setElectricalTestConditioningByImmersion,
  ] = useState(initialElectricalTestConditioningByImmersion);

  const handleChangeTable1 = (e) => {
    const { name, value } = e.target;
    const filteredValue = value.replace(/[^A-Za-z0-9\s.]/g, ''); // Remove special characters
    setMechanicalCharacteristics({
      ...mechanicalCharacteristics,
      [name]: filteredValue,
    });
  };

  const handleChangeTable2 = (e) => {
    const { name, value } = e.target;
    const filteredValue = value.replace(/[^A-Za-z0-9\s.]/g, ''); // Remove special characters
    setAgeing_test_conditioning({ ...ageing_test_conditioning, [name]: filteredValue });
  };

  const handleChangeTable3 = (e) => {
    const { name, value } = e.target;
    const filteredValue = value.replace(/[^A-Za-z0-9\s.]/g, ''); // Remove special characters
    setElectrical_test_conditioning({
      ...electrical_test_conditioning,
      [name]: filteredValue,
    });
  };

  const handleChangeTable4 = (e) => {
    const { name, value } = e.target;
    const filteredValue = value.replace(/[^A-Za-z0-9\s.]/g, ''); // Remove special characters
    setElectricalTestConditioningByImmersion({
      ...electricalTestConditioningByImmersion,
      [name]: filteredValue,
    });
  };
  const handleSubmit = async () => {
    setLoading(true);
    const params = {
      types_of_gloves: batchTest.gloves_type,
      length: batchTest.length,
      cuff: batchTest.cuff,
      class_name: batchTest.class_name,
      size: batchTest.size,
      lot_number: batchTest.lot_number,
      series_number: batchTest.series_no,
      mgf_date: batchTest.mgf_date,
      ARLim: batchTest.ARLim,
      gloves_classification: batchTest.class_name,
      maximum_use_voltage_v: batchTest.maximum_use_voltage_v,
      proof_test_voltage_v: batchTest.proof_test_voltage_v,
      leakage_current_ma: batchTest.leakage_current_ma,
      withstand_voltage_v: batchTest.withstand_voltage_v,
      mechanical_characteristics: {
        tensile_strength: [
          `${
            mechanicalCharacteristics.Tensile_Strength_spec
              ? mechanicalCharacteristics.Tensile_Strength_spec
              : "--"
          }`,
          `${
            mechanicalCharacteristics.Tensile_Strength_results
              ? mechanicalCharacteristics.Tensile_Strength_results
              : "--"
          }`,
        ],
        elongation_at_break: [
          `${
            mechanicalCharacteristics.Elongation_At_Break_spec
              ? mechanicalCharacteristics.Elongation_At_Break_spec
              : "--"
          }`,
          `${
            mechanicalCharacteristics.Elongation_At_Break_results
              ? mechanicalCharacteristics.Elongation_At_Break_results
              : "--"
          }`,
        ],
        mechanical_puncture: [
          `${
            mechanicalCharacteristics.Mechanical_Puncture_spec
              ? mechanicalCharacteristics.Mechanical_Puncture_spec
              : "--"
          }`,
          `${
            mechanicalCharacteristics.Mechanical_Puncture_results
              ? mechanicalCharacteristics.Mechanical_Puncture_results
              : "--"
          }`,
        ],
      },
      ageing_tests: {
        tensile_strength: [
          `${
            ageing_test_conditioning.Tensile_Strength_spec
              ? ageing_test_conditioning.Tensile_Strength_spec
              : "--"
          }`,
          `${
            ageing_test_conditioning.Tensile_Strength_results
              ? ageing_test_conditioning.Tensile_Strength_results
              : "--"
          }`,
        ],
        elongation_at_break: [
          `${
            ageing_test_conditioning.Elongation_At_Break_spec
              ? ageing_test_conditioning.Elongation_At_Break_spec
              : "--"
          }`,
          `${
            ageing_test_conditioning.Elongation_At_Break_results
              ? ageing_test_conditioning.Elongation_At_Break_results
              : "--"
          }`,
        ],
        mechanical_puncture: [
          `${
            ageing_test_conditioning.Conservation_Strength_spec
              ? ageing_test_conditioning.Conservation_Strength_spec
              : "--"
          }`,
          `${
            ageing_test_conditioning.Conservation_Strength_results
              ? ageing_test_conditioning.Conservation_Strength_results
              : "--"
          }`,
        ],
        conservation_elongation: [
          `${
            ageing_test_conditioning.Conservation_Elongation_spec
              ? ageing_test_conditioning.Conservation_Elongation_spec
              : "--"
          }`,
          `${
            ageing_test_conditioning.Conservation_Elongation_results
              ? ageing_test_conditioning.Conservation_Elongation_results
              : "--"
          }`,
        ],
      },
      electrical_test: {
        result_one: [
          `${
            electrical_test_conditioning.Initial_RESULT_1
              ? electrical_test_conditioning.Initial_RESULT_1
              : "--"
          }`,
          `${
            electrical_test_conditioning.H_At_70c_RESULT_1
              ? electrical_test_conditioning.H_At_70c_RESULT_1
              : "--"
          }`,
          `${
            electrical_test_conditioning.electrical_Withstand_RESULT_1
              ? electrical_test_conditioning.electrical_Withstand_RESULT_1
              : "--"
          }`,
        ],
        result_two: [
          `${
            electrical_test_conditioning.Initial_RESULT_2
              ? electrical_test_conditioning.Initial_RESULT_2
              : "--"
          }`,
          `${
            electrical_test_conditioning.H_At_70c_RESULT_2
              ? electrical_test_conditioning.H_At_70c_RESULT_2
              : "--"
          }`,
          `${
            electrical_test_conditioning.electrical_Withstand_RESULT_2
              ? electrical_test_conditioning.electrical_Withstand_RESULT_2
              : "--"
          }`,
        ],
        result_three: [
          `${
            electrical_test_conditioning.Initial_RESULT_3
              ? electrical_test_conditioning.Initial_RESULT_3
              : "--"
          }`,
          `${
            electrical_test_conditioning.H_At_70c_RESULT_3
              ? electrical_test_conditioning.H_At_70c_RESULT_3
              : "--"
          }`,
          `${
            electrical_test_conditioning.electrical_Withstand_RESULT_3
              ? electrical_test_conditioning.electrical_Withstand_RESULT_3
              : "--"
          }`,
        ],
      },
      electrical_test_immersion: {
        result_one: [
          `${
            electricalTestConditioningByImmersion.Initial_RESULT_1
              ? electricalTestConditioningByImmersion.Initial_RESULT_1
              : ""
          }`,
          `${
            electricalTestConditioningByImmersion.H_At_70c_RESULT_1
              ? electricalTestConditioningByImmersion.H_At_70c_RESULT_1
              : "--"
          }`,
          `${
            electricalTestConditioningByImmersion.electrical_Withstand_RESULT_1
              ? electricalTestConditioningByImmersion.electrical_Withstand_RESULT_1
              : "--"
          }`,
        ],
        result_two: [
          `${
            electricalTestConditioningByImmersion.Initial_RESULT_2
              ? electricalTestConditioningByImmersion.Initial_RESULT_2
              : "--"
          }`,
          `${
            electricalTestConditioningByImmersion.H_At_70c_RESULT_2
              ? electricalTestConditioningByImmersion.H_At_70c_RESULT_2
              : "--"
          }`,
          `${
            electricalTestConditioningByImmersion.electrical_Withstand_RESULT_2
              ? electricalTestConditioningByImmersion.electrical_Withstand_RESULT_2
              : "--"
          }`,
        ],
        result_three: [
          `${
            electricalTestConditioningByImmersion.Initial_RESULT_3
              ? electricalTestConditioningByImmersion.Initial_RESULT_3
              : "--"
          }`,
          `${
            electricalTestConditioningByImmersion.H_At_70c_RESULT_3
              ? electricalTestConditioningByImmersion.H_At_70c_RESULT_3
              : "--"
          }`,
          `${
            electricalTestConditioningByImmersion.electrical_Withstand_RESULT_3
              ? electricalTestConditioningByImmersion.electrical_Withstand_RESULT_3
              : "--"
          }`,
        ],
      },
    };
    try {
      const resp = await generateBatchReport(params);
      if (resp.data.success == true) {
        navigate("/customer-report");
      } else {
        toast.error("Something was wrong, try again", {
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
      // Display an error message if the response is not successful
      toast.error("Something was wrong, try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("handleSubmit", error);
    }
  };

  return (
    <>
      <div>
        <ToastContainer />
        <div className="dashboard-wrap">
          <div className="page-header">
            <Link to="/customer-report" className="page-back-btn">
              <ArrowBackIcon />
              <span>Customer Reports</span>
            </Link>
          </div>
        </div>
        <div style={{ background: "#ffff" }} className="kamfet-certificate">
          <div>
            <img src={images.kamfetImage} className="certificate-img" />
          </div>

          <div>
            <h3 className="certificate-title">CERTIFICATE OF ACCORDANCE</h3>
            <h4 className="certificate-electrical-title">
              ELECTRICAL SAFETY GLOVES AS PER IEC 60903:2014
            </h4>
          </div>
          <div>
            <Table className="certificate-table mt-4">
              <TableHead>
                <TableRow style={{ background: "#9CC2E6" }}>
                  <TableCell>
                    <h5>Lot No.</h5>
                  </TableCell>
                  <TableCell>
                    <h5>Mfg. Date</h5>
                  </TableCell>
                  <TableCell>
                    <h5>Series No.</h5>
                  </TableCell>
                  <TableCell>
                    <h5>ARLim/ATPV - Value</h5>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{batchTest.lot_number}</TableCell>
                  <TableCell>{batchTest.mgf_date}</TableCell>
                  <TableCell>{batchTest.series_no}</TableCell>
                  <TableCell>{batchTest.ARLim}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <Table className="certificate-table mt-4">
              <TableHead>
                <TableRow style={{ background: "#B2DEF7" }}>
                  <TableCell colSpan={5}>
                    <h5>DIELECTRIC TESTS</h5>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <h5>Gloves Classification</h5>
                  </TableCell>
                  <TableCell>
                    <h5>Maximum Use Voltage V</h5>
                  </TableCell>
                  <TableCell>
                    <h5>Proof-test Voltage V</h5>
                  </TableCell>
                  <TableCell>
                    <h5>Leakage current mA</h5>
                  </TableCell>
                  <TableCell>
                    <h5>Withstand Voltage V</h5>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{batchTest.class_name}</TableCell>
                  <TableCell>{batchTest.maximum_use_voltage_v}</TableCell>
                  <TableCell>{batchTest.proof_test_voltage_v}</TableCell>
                  <TableCell>{batchTest.leakage_current_ma}</TableCell>
                  <TableCell>{batchTest.withstand_voltage_v}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div>
            <Table className="certificate-table mt-4">
              <TableHead>
                <TableRow style={{ background: "#DEEAF6" }}>
                  <TableCell colSpan={3}>
                    <h5>MECHANICAL CHARACTERISTICS</h5>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <h5>PHYSICAL PROPERTIES</h5>
                  </TableCell>
                  <TableCell>
                    <h5>SPEC</h5>
                  </TableCell>
                  <TableCell>
                    <h5>RESULTS</h5>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell width="20%">Tensile Strength</TableCell>
                  <TableCell width="20%" style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Tensile_Strength_spec"
                      value={mechanicalCharacteristics.Tensile_Strength_spec}
                      onChange={handleChangeTable1}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                  <TableCell width="20%" style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Tensile_Strength_results"
                      value={mechanicalCharacteristics.Tensile_Strength_results}
                      onChange={handleChangeTable1}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="20%">Elongation At Break</TableCell>
                  <TableCell width="20%" style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Elongation_At_Break_spec"
                      value={mechanicalCharacteristics.Elongation_At_Break_spec}
                      onChange={handleChangeTable1}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                  <TableCell width="20%" style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Elongation_At_Break_results"
                      value={
                        mechanicalCharacteristics.Elongation_At_Break_results
                      }
                      onChange={handleChangeTable1}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="20%">Mechanical Puncture</TableCell>
                  <TableCell width="20%" style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Mechanical_Puncture_spec"
                      value={mechanicalCharacteristics.Mechanical_Puncture_spec}
                      onChange={handleChangeTable1}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                  <TableCell width="20%" style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Mechanical_Puncture_results"
                      value={
                        mechanicalCharacteristics.Mechanical_Puncture_results
                      }
                      onChange={handleChangeTable1}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div>
            <Table className="certificate-table mt-0">
              <TableHead>
                <TableRow style={{ background: "#FED966" }}>
                  <TableCell colSpan={3}>
                    <h5>AGEING TEST CONDITIONING 168 HOURS AT 70°C</h5>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell width="20%">Tensile Strength</TableCell>
                  <TableCell width="20%" style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Tensile_Strength_spec"
                      value={ageing_test_conditioning.Tensile_Strength_spec}
                      onChange={handleChangeTable2}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />{" "}
                    %
                  </TableCell>
                  <TableCell width="20%" style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Tensile_Strength_results"
                      value={ageing_test_conditioning.Tensile_Strength_results}
                      onChange={handleChangeTable2}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />{" "}
                    %
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="20%">Elongation At Break</TableCell>
                  <TableCell width="20%" style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Elongation_At_Break_spec"
                      value={ageing_test_conditioning.Elongation_At_Break_spec}
                      onChange={handleChangeTable2}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />{" "}
                    %
                  </TableCell>
                  <TableCell width="20%" style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Elongation_At_Break_results"
                      value={
                        ageing_test_conditioning.Elongation_At_Break_results
                      }
                      onChange={handleChangeTable2}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />{" "}
                    %
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="20%">Conservation Strength</TableCell>
                  <TableCell width="20%" style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Conservation_Strength_spec"
                      value={
                        ageing_test_conditioning.Conservation_Strength_spec
                      }
                      onChange={handleChangeTable2}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />{" "}
                    %
                  </TableCell>
                  <TableCell width="20%" style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Conservation_Strength_results"
                      value={
                        ageing_test_conditioning.Conservation_Strength_results
                      }
                      onChange={handleChangeTable2}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />{" "}
                    %
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="20%">Conservation Elongation</TableCell>
                  <TableCell width="20%" style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Conservation_Elongation_spec"
                      value={
                        ageing_test_conditioning.Conservation_Elongation_spec
                      }
                      onChange={handleChangeTable2}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />{" "}
                    %
                  </TableCell>
                  <TableCell width="20%" style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Conservation_Elongation_results"
                      value={
                        ageing_test_conditioning.Conservation_Elongation_results
                      }
                      onChange={handleChangeTable2}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />{" "}
                    %
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <Table className="certificate-table mt-4">
              <TableHead>
                <TableRow style={{ background: "#FED966" }}>
                  <TableCell colSpan={5}>
                    <h5>ELECTRICAL TEST CONDITIONING 168 HOURS AT 70°C</h5>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <h5>RESULT NO. 1</h5>
                  </TableCell>
                  <TableCell>
                    <h5>RESULT NO. 2</h5>
                  </TableCell>
                  <TableCell>
                    <h5>RESULT NO. 3</h5>
                  </TableCell>
                  <TableCell>
                    <h5>STANDARD</h5>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Initial (mA)</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Initial_RESULT_1"
                      value={electrical_test_conditioning.Initial_RESULT_1}
                      onChange={handleChangeTable3}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Initial_RESULT_2"
                      value={electrical_test_conditioning.Initial_RESULT_2}
                      onChange={handleChangeTable3}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Initial_RESULT_3"
                      value={electrical_test_conditioning.Initial_RESULT_3}
                      onChange={handleChangeTable3}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                  <TableCell>14 mA</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>168H At 70c (Ma)</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="H_At_70c_RESULT_1"
                      value={electrical_test_conditioning.H_At_70c_RESULT_1}
                      onChange={handleChangeTable3}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="H_At_70c_RESULT_2"
                      value={electrical_test_conditioning.H_At_70c_RESULT_2}
                      onChange={handleChangeTable3}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="H_At_70c_RESULT_3"
                      value={electrical_test_conditioning.H_At_70c_RESULT_3}
                      onChange={handleChangeTable3}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                  <TableCell>14 mA</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Electrical Withstand (V)</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                      className="select-menu"
                    >
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        className="certificate-test1"
                        label="Age"
                        name="electrical_Withstand_RESULT_1"
                        value={
                          electrical_test_conditioning.electrical_Withstand_RESULT_1
                        }
                        onChange={handleChangeTable3}
                      >
                        <MenuItem></MenuItem>
                        <MenuItem value="Pass">Pass</MenuItem>
                        <MenuItem value="Fail">Fail</MenuItem>
                      </Select>
                    </FormControl>
                    {/* <TextField id="standard-basic" variant="standard" className="certificate-test" name="electrical_Withstand_RESULT_1" value={electrical_test_conditioning.electrical_Withstand_RESULT_1} onChange={handleChangeTable3} />
                                        <img src={images.editIcon} className="certificate-edit-text" /> */}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                      className="select-menu"
                    >
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        className="certificate-test1"
                        label="Age"
                        name="electrical_Withstand_RESULT_2"
                        value={
                          electrical_test_conditioning.electrical_Withstand_RESULT_2
                        }
                        onChange={handleChangeTable3}
                      >
                        <MenuItem></MenuItem>
                        <MenuItem value="Pass">Pass</MenuItem>
                        <MenuItem value="Fail">Fail</MenuItem>
                      </Select>
                    </FormControl>
                    {/* <TextField id="standard-basic" variant="standard" className="certificate-test" name="electrical_Withstand_RESULT_2" value={electrical_test_conditioning.electrical_Withstand_RESULT_2} onChange={handleChangeTable3} />
                                        <img src={images.editIcon} className="certificate-edit-text" /> */}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                      className="select-menu"
                    >
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        className="certificate-test1"
                        label="Age"
                        name="electrical_Withstand_RESULT_3"
                        value={
                          electrical_test_conditioning.electrical_Withstand_RESULT_3
                        }
                        onChange={handleChangeTable3}
                      >
                        <MenuItem></MenuItem>
                        <MenuItem value="Pass">Pass</MenuItem>
                        <MenuItem value="Fail">Fail</MenuItem>
                      </Select>
                    </FormControl>
                    {/* <TextField id="standard-basic" variant="standard" className="certificate-test" name="electrical_Withstand_RESULT_3" value={electrical_test_conditioning.electrical_Withstand_RESULT_3} onChange={handleChangeTable3} />
                                        <img src={images.editIcon} className="certificate-edit-text" /> */}
                  </TableCell>
                  <TableCell>No puncture at 5kV</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div>
            <Table className="certificate-table mt-4">
              <TableHead>
                <TableRow style={{ background: "#FED966" }}>
                  <TableCell colSpan={5}>
                    <h5>
                      ELECTRICAL TEST CONDITIONING BY IMMERSION FOR A PERIOD OF
                      16 HOURS
                    </h5>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <h5>RESULT NO. 1</h5>
                  </TableCell>
                  <TableCell>
                    <h5>RESULT NO. 2</h5>
                  </TableCell>
                  <TableCell>
                    <h5>RESULT NO. 3</h5>
                  </TableCell>
                  <TableCell>
                    <h5>STANDARD</h5>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Initial (mA)</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Initial_RESULT_1"
                      value={
                        electricalTestConditioningByImmersion.Initial_RESULT_1
                      }
                      onChange={handleChangeTable4}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Initial_RESULT_2"
                      value={
                        electricalTestConditioningByImmersion.Initial_RESULT_2
                      }
                      onChange={handleChangeTable4}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="Initial_RESULT_3"
                      value={
                        electricalTestConditioningByImmersion.Initial_RESULT_3
                      }
                      onChange={handleChangeTable4}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                  <TableCell>14 mA</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>168H At 70c (Ma)</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="H_At_70c_RESULT_1"
                      value={
                        electricalTestConditioningByImmersion.H_At_70c_RESULT_1
                      }
                      onChange={handleChangeTable4}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="H_At_70c_RESULT_2"
                      value={
                        electricalTestConditioningByImmersion.H_At_70c_RESULT_2
                      }
                      onChange={handleChangeTable4}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="certificate-test"
                      name="H_At_70c_RESULT_3"
                      value={
                        electricalTestConditioningByImmersion.H_At_70c_RESULT_3
                      }
                      onChange={handleChangeTable4}
                    />
                    <img
                      src={images.editIcon}
                      className="certificate-edit-text"
                    />
                  </TableCell>
                  <TableCell>14 mA</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Electrical Withstand (V)</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                      className="select-menu"
                    >
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        className="certificate-test1"
                        label="Age"
                        name="electrical_Withstand_RESULT_1"
                        onChange={handleChangeTable4}
                        value={
                          electricalTestConditioningByImmersion.electrical_Withstand_RESULT_1
                        }
                      >
                        <MenuItem></MenuItem>
                        <MenuItem value="Pass">Pass</MenuItem>
                        <MenuItem value="Fail">Fail</MenuItem>
                      </Select>
                    </FormControl>
                    {/* <TextField id="standard-basic" variant="standard" className="certificate-test" name="electrical_Withstand_RESULT_1" value={electricalTestConditioningByImmersion.electrical_Withstand_RESULT_1} onChange={handleChangeTable4} />
                                        <img src={images.editIcon} className="certificate-edit-text" /> */}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                      className="select-menu"
                    >
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        className="certificate-test1"
                        label="Age"
                        name="electrical_Withstand_RESULT_2"
                        onChange={handleChangeTable4}
                        value={
                          electricalTestConditioningByImmersion.electrical_Withstand_RESULT_2
                        }
                      >
                        <MenuItem></MenuItem>
                        <MenuItem value="Pass">Pass</MenuItem>
                        <MenuItem value="Fail">Fail</MenuItem>
                      </Select>
                    </FormControl>
                    {/* <TextField id="standard-basic" variant="standard" className="certificate-test" name="electrical_Withstand_RESULT_2" value={electricalTestConditioningByImmersion.electrical_Withstand_RESULT_2} onChange={handleChangeTable4} />
                                        <img src={images.editIcon} className="certificate-edit-text" /> */}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                      className="select-menu"
                    >
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        className="certificate-test1"
                        label="Age"
                        name="electrical_Withstand_RESULT_3"
                        onChange={handleChangeTable4}
                        value={
                          electricalTestConditioningByImmersion.electrical_Withstand_RESULT_3
                        }
                      >
                        <MenuItem></MenuItem>
                        <MenuItem value="Pass">Pass</MenuItem>
                        <MenuItem value="Fail">Fail</MenuItem>
                      </Select>
                    </FormControl>
                    {/* <TextField id="standard-basic" variant="standard" className="certificate-test" name="electrical_Withstand_RESULT_3" value={electricalTestConditioningByImmersion.electrical_Withstand_RESULT_3} onChange={handleChangeTable4} />
                                        <img src={images.editIcon} className="certificate-edit-text" /> */}
                  </TableCell>
                  <TableCell>No puncture at 5kV</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="d-flex justify-content-between mt-5 certificate-table certificate-address">
            <h5>Mumbai,INDIA</h5>
            <h5>
              Quality Assurance Dept. <br /> Vasai Manufacturing Facility
            </h5>
          </div>
          <div className="mt-4">
            <img src={images.footerImage} className="footer-img" />
          </div>
          <div className="mt-4 mb-5 pb-4">
            <button className="certificate-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-end aborted">
          <p style={{ margin: 0, marginBottom: 0 }}>
            Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
            Rights Reserved
          </p>
        </div>
      </div>
      {/* {isLoading && <Loader />} */}
    </>
  );
}
export default CertificateofAccorance;
