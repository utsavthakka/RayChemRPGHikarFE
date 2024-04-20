import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../AdvanceAnalytics/Analytics.css";
import { Sales } from "./Sales";

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

export default function DispatchTabs({ startDate, endDate, handleGetPDF}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box className="dispatchBox-Tabs dispatch-table-tabs dis-tabs" style={{marginTop:"169px", marginLeft:"25px"}}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="box-tabs-table boxes-table-tabs"
          >
            {/* <Tab label="Dispatch Summary" className='dispatch-tabs' /> */}
            <Tab label="Sales Summary" className="sales-tabs" />
          </Tabs>
        </Box>
        {/* <TabPanel value={value} index={0}>
                    <Dispatch />
                </TabPanel> */}
        <TabPanel value={value} index={0}>
          <Sales startDate={startDate} endDate={endDate}  handleGetPDF={handleGetPDF}/>
          {/* <ElectricTabs valueStation={value} handleElecticTestDetail={props.handleElecticTestDetail} electricTestTable={props.electricTestTable}  glovesTable={props.glovesTable} /> */}
        </TabPanel>
      </Box>
    </>
  );
}
