import { Box, TextField } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  DateTimePicker,
} from "@mui/x-date-pickers";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import "./DateTimePicker.css";
import dayjs from "dayjs";

const COCDatePicker = ({
  time,
  startDateReFormat,
  endDateReFormat,
  handleStartDate,
  handleEndDate,
  Start_Date_lable,
  end_Date_lable,
  Time_lable,
}) => {
  const disableStartDate = (date) => {
    if (!endDateReFormat) return false; // If no end date is selected, don't disable any dates.
    // if (dayjs(date).isSame(endDateReFormat)) return true;
    if (endDateReFormat) {
      if (
        endDateReFormat &&
        dayjs(date).isAfter(dayjs(endDateReFormat).subtract(1, "year"))
      ) {
        return false; // 'date' is less than one year before 'endDate', not valid as per your requirement
      } else {
        return true; // 'date' is more than one year before 'endDate', valid as per your requirement
      }
    }
    if (dayjs(date).isAfter(endDateReFormat)) return true;
    return false;
  };

  const disableEndDate = (date) => {
    if (!startDateReFormat) return false; // If no start date is selected, don't disable any dates.
    // if (dayjs(date).isSame(startDateReFormat)) return true; // Disable the same date as start date.
    if (dayjs(date).isBefore(startDateReFormat)) return true; // Disable dates that are before start date.
    if (
      dayjs(date).isAfter(
        dayjs(startDateReFormat).add(1, "year").subtract(1, "day")
      )
    ) {
      return true; // Disable dates more than one year after start date.
    }

    return false;
  };
  return (
    <>
      {time ? (
        <>
          <Box
            style={{ width: "40%", marginRight: "8px" }}
            className="box-datepicker"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                className="date-picker-production"
                label={Start_Date_lable}
                value={startDateReFormat}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                inputFormat="YYYY-MM-DD hh:mm A"
                format="YYYY-MM-DD hh:mm A"
                disableFuture
                onChange={(newValue) => handleStartDate(newValue)}
                shouldDisableDate={disableStartDate}
              />
            </LocalizationProvider>
          </Box>
          <Box className="header-btn-month" style={{ width: "40%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                className="date-picker-production"
                label={end_Date_lable}
                value={endDateReFormat}
                onChange={(newValue) => handleEndDate(newValue)}
                disableFuture
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                inputFormat="YYYY-MM-DD hh:mm A"
                format="YYYY-MM-DD hh:mm A"
                shouldDisableDate={disableEndDate}
              />
            </LocalizationProvider>
          </Box>
        </>
      ) : (
        <>
          <Box
            style={{ width: "40%", marginRight: "10px" }}
            className="box-datepicker"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="date-picker-production"
                label={Start_Date_lable}
                value={startDateReFormat}
                onChange={(newValue) => handleStartDate(newValue)}
                disableFuture
                inputFormat="YYYY-MM-DD"
                format="YYYY-MM-DD"
                shouldDisableDate={disableStartDate}
                renderInput={(params) => (
                  <TextField {...params} style={{ background: "#ffff" }} />
                )}
                
              />
            </LocalizationProvider>
          </Box>
          <Box className="header-btn-month" style={{ width: "40%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="date-picker-production"
                label={end_Date_lable}
                shouldDisableDate={disableEndDate}
                value={endDateReFormat}
                onChange={(newValue) => handleEndDate(newValue)}
                disableFuture
                inputFormat="YYYY-MM-DD"
                format="YYYY-MM-DD"
                renderInput={(params) => (
                  <TextField {...params} style={{ background: "#ffff" }} />
                )}
                
              />
            </LocalizationProvider>
          </Box>
        </>
      )}
    </>
  );
};

export default COCDatePicker;
