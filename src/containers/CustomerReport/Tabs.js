import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "../CustomerReport/CustomerReport.css"
import { DC } from './DC';
import BatchTestReport from './BatchTestReports';

// Define the TabPanel component and its props
function TabPanel(props) {
  const { children, value, index, ...other } = props;


  // Render the tab panel
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

// Define the main component that renders the customer reports tabs
export default function CustomerReportsTabs(props) {
  const [value, setValue] = React.useState(0);


  // Handle a change in the selected tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Render the tabs and their corresponding panels
  return (
    <>
      <Box sx={{ width: '100%' }}>

        <Box className="DcBox-Tabs">
          {props.DC && props.RTR && props.viewReport &&
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='box-tabs-table'>

              <Tab label="DC/RTR" className='DC-tabs' />
              <Tab label="Batch Test Report" className='BatchTest-tabs' />

            </Tabs>
          }
        </Box>
        <TabPanel value={value} index={0}>
          <DC DC={props.DC} handleDcClick={props.handleDcClick} RTR={props.RTR} handleRTRClick={props.handleRTRClick} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BatchTestReport viewReport={props.viewReport} handleViewBatchReport={props.handleViewBatchReport} testReport={props.testReport} />
        </TabPanel>
      </Box>
    </>
  );
}
