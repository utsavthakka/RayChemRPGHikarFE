import { Box } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../AdvanceAnalytics/Quality.css";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";
import { getClasses, getSizes } from "../AddBatch/services";
import { PieChart } from "./PieChart";
import { images } from "../../config/images";

export const VisualPercentageChart = () => {
  const [value, setValue] = useState(null);
  const [dateValue, setDateValue] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectClass] = useState();
  const [size, setSize] = useState([]);
  const [selectSize, setSelectSize] = useState();

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const getData = async () => {
    try {
      const resp = await getClasses();
      setClasses(resp.data.payload);
      const resp1 = await getSizes();
      setSize(resp1.data.payload);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="page-wraper">
        <div className="page-header">
          <Link to="/quality-analytics" className="page-back-btn">
            <ArrowBackIcon />
            <span>Visual Inspection</span>
          </Link>
          <div className="header-btn-group">
            <Box style={{ marginBottom: "0" }}>
              <select
                className="form-input-analytics"
                value={selectSize}
                onChange={(event) => setSelectSize(event.target.value)}
                required
              >
                <option value="none" selected disabled hidden>
                  Size
                </option>
                {size.map((element) => (
                  <option value={element.size_id}>{element.size_name}</option>
                ))}
              </select>
            </Box>
            <Box style={{ marginBottom: "0", marginRight: "-36px" }}>
              <select
                className="form-input-analytics"
                id="selectedClass"
                value={selectedClass}
                onChange={(event) => setSelectClass(event.target.value)}
                required
              >
                <option value="none" selected disabled hidden>
                  Class
                </option>
                {classes.map((event) => (
                  <option value={event.class_id}>{event.class_name}</option>
                ))}
                <option value="all">All</option>
              </select>
            </Box>
            <Box className="header-btn-date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Month"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ width: "70%", background: "#ffff" }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box className="header-btn-month">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Month"
                  value={dateValue}
                  onChange={(newValue) => {
                    setDateValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ width: "70%", background: "#ffff" }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <button className={`page-header-btn-excel page-header-btn-EX`}>
              <img src={images.pdfIcon} alt="" />
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-between batchNo p-card">
          <h4>
            <b>Percentage Chart Of Defects</b>
          </h4>
        </div>
        <div className="percentage-chart d-flex">
          <div style={{ width: "25%" }}>
            <h6 className="gloves-title">
              <b>01</b> Bubbles between fingers
            </h6>
            <h6 className="gloves-title">
              <b>02</b> Bubbles at fingertips
            </h6>
            <h6 className="gloves-title">
              <b>03</b> Other position bubbles{" "}
            </h6>
            <h6 className="gloves-title">
              <b>04</b> Thin patch fingers
            </h6>
            <h6 className="gloves-title">
              <b>05</b> Thin patch crutch
            </h6>
            <h6 className="gloves-title">
              <b>06</b> Thin patch between finger
            </h6>
            <h6 className="gloves-title">
              <b>07</b> Inside crack defect
            </h6>
            <h6 className="gloves-title">
              <b>08</b> Crease
            </h6>
            <h6 className="gloves-title">
              <b>09</b> Pinholes fingertips
            </h6>
            <h6 className="gloves-title">
              <b>10</b> Pinholes other positions
            </h6>
            <h6 className="gloves-title">
              <b>11</b> Wet coagulant fingertips
            </h6>
            <h6 className="gloves-title">
              <b>12</b> Particles
            </h6>
            <h6 className="gloves-title">
              <b>13</b> Crack defects between fingers
            </h6>
            <h6 className="gloves-title">
              <b>14</b> Ripples on fingers
            </h6>
            <h6 className="gloves-title">
              <b>15</b> Ripples on other positions
            </h6>
            <h6 className="gloves-title">
              <b>16</b> Inner/Between(coat) split line
            </h6>
            <h6 className="gloves-title">
              <b>17</b> Drops of coagulant
            </h6>
            <h6 className="gloves-title">
              <b>18</b> Bad gelation
            </h6>
            <h6 className="gloves-title">
              <b>19</b> Bad gelation of finger side
            </h6>
            <h6 className="gloves-title">
              <b>20</b> Delamination
            </h6>
          </div>
          <div style={{ width: "45%" }}>
            <PieChart />
          </div>
          <div style={{ width: "25%" }}>
            <h6 className="gloves-title">
              <b>21</b> Lack of coagulant
            </h6>
            <h6 className="gloves-title">
              <b>22</b> Bad rolled edge
            </h6>
            <h6 className="gloves-title">
              <b>23</b> Crack defects ON fingers{" "}
            </h6>
            <h6 className="gloves-title">
              <b>24</b> Inner side impression mark
            </h6>
            <h6 className="gloves-title">
              <b>25</b> Pit mark
            </h6>
            <h6 className="gloves-title">
              <b>26</b> Cissing
            </h6>
            <h6 className="gloves-title">
              <b>27</b> Latex runs at fingertips
            </h6>
            <h6 className="gloves-title">
              <b>28</b> Coagulant foam
            </h6>
            <h6 className="gloves-title">
              <b>29</b> Peel of fingertips
            </h6>
            <h6 className="gloves-title">
              <b>30</b> Blister
            </h6>
            <h6 className="gloves-title">
              <b>31</b> Line
            </h6>
            <h6 className="gloves-title">
              <b>32</b> Split Line
            </h6>
            <h6 className="gloves-title">
              <b>33</b> Inside bubbles at finger tips
            </h6>
            <h6 className="gloves-title">
              <b>34</b> Inside bubbles at other position
            </h6>
            <h6 className="gloves-title">
              <b>35</b> Inside bubbles at finger tips
            </h6>
            <h6 className="gloves-title">
              <b>36</b> Inside bubbles between finger
            </h6>
            <h6 className="gloves-title">
              <b>37</b> Webline bubbles
            </h6>
            <h6 className="gloves-title">
              <b>38</b> Unique Id code missing
            </h6>
            <h6 className="gloves-title">
              <b>39</b> Other defect (Hold/No Hold) Accepted Q A (OK)
            </h6>
          </div>
        </div>
        <div className="d-flex justify-content-end aborted">
          <p style={{ margin: 0, marginBottom: 0 }}>
            Powered by <b>Hikar&#174;Technomation</b> Private Limited &#169; All
            Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
};
