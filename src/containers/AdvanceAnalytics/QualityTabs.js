import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../Reports & Approvals/Reports.css";
import { QualityAnalytics } from "./QualityVisualInspection";
import { QualityElectricTest } from "./QualityElectricTest";
import FinalVisualInspectionTabs from "./QualityFinalVisualInspection";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function QualityTabs({
  startDate,
  endDate,
  selectedClass,
  selectSize,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box className="Box-Tabs boxes" style={{marginTop:"163px", marginLeft:"28px"}}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="box-tabs-table box-visual-table boxes-table-tabs"
          >
            <Tab label="Visual Inspection" className="visual-tabs" />
            <Tab label="Electric Test" className="ElectricTest-tabs  electric-tabs" />
            <Tab
              label="Final Visual Inspection"
              className="final-tabs"
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <QualityAnalytics
            startDate={startDate}
            endDate={endDate}
            selectSize={selectSize}
            selectedClass={selectedClass}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <QualityElectricTest
            startDate={startDate}
            endDate={endDate}
            selectSize={selectSize}
            selectedClass={selectedClass}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <FinalVisualInspectionTabs
            startDate={startDate}
            endDate={endDate}
            selectSize={selectSize}
            selectedClass={selectedClass}
          />
        </TabPanel>
      </Box>
    </>
  );
}
