import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DispatchTabs from "./DispatchTabs";
import { Box, TextField } from "@mui/material";
import QualityTabs from "./QualityTabs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getClasses, getSizes } from "../AddBatch/services";
import { images } from "../../config/images";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Replace "en" with your desired locale

const dateFormat = "YYYY-MM-DD"; // Replace with your desired date format

function QualityMain() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const formatStartDate = startDate ? dayjs(startDate).format(dateFormat) : "";
  const formatEndDate = endDate ? dayjs(endDate).format(dateFormat) : "";

  return (
    <>
      <div>
        <QualityTabs
          startDate={formatStartDate}
          endDate={formatEndDate}
          selectedClass={selectedClass}
          selectSize={selectSize}
        />
      </div>
    </>
  );
}
export default QualityMain;
