import React from 'react';
import { useState } from 'react';
import "./Header.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import StorageIcon from '@mui/icons-material/Storage';

import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from 'react-redux';
import Logo from "../../assets/images/rayChemlogo.png";
import Profile from "../../assets/images/profile.png";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ExpandScreen from "../../assets/images/expand-screen.png";
import Notification from "../../assets/images/notification.png";
import { Divider, ListItemIcon } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from "react-router-dom";
import HeaderTitle from "../Header/HeaderTitle";
import { useLocation } from "react-router-dom";
import { images } from '../../config/images';
import { LogOutApi } from './services';
import { Session } from '../SessionTimeout/Session';


function Header(props) {
  // Get the current location from the React Router DOM
  const location = useLocation();
  // Use Navigate hook to change the route
  const navigate = useNavigate();
  // Get the dispatch function from the redux store
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [fullScreen, setFullScreen] = useState(false)
  const open = Boolean(anchorEl);
  const { login } = useSelector((state) => state.batchState)

  // console.log("login", login)

  // Function to handle click event and open the user
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle close event and close the user 
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to handle logout event
  const logout = async () => {
    const logoutapi = await LogOutApi();



    if (logoutapi.status === 200) {
      // console.log('logged out',logoutapi);
      // console.log('logged out Status',logoutapi.status);
      dispatch({ type: 'USER_LOGOUT' }) // Dispatch an action to the Redux store to log the user out
      navigate("/login"); // Navigate to the login page

    }



    // console.log('logged out',logoutapi);
    // console.log('logged out Status',logoutapi.status);

  }

  var screen = document.documentElement;

  const openFullscreen = () => {
    if (screen.requestFullscreen) {
      screen.requestFullscreen();
      setFullScreen(!fullScreen)
    } else if (screen.webkitRequestFullscreen) { /* Safari */
      screen.webkitRequestFullscreen();
    } else if (screen.msRequestFullscreen) { /* IE11 */
      screen.msRequestFullscreen();
    }

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }


  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }



  const manualdatabase = () => {

    navigate('/manual-database')
  }

  var tempDate = new Date();
  var date1 = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear() + ', ' + ' ' + new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: "numeric",
    minute: "numeric"
  });
  const currDate = date1;
  return (
    <>
      <Session />
      <AppBar position="static" className="header-wrapper">
        <Container maxWidth="none">
          <Toolbar disableGutters className="toolbar-wraper">
            <Typography variant="h6" noWrap component="a" href="/dashboard">
              <img src={Logo} alt="logo" className="header-logo" />
            </Typography>
            <div className="header_title">
              {location.pathname === "/dipping-parameters" ? (
                <HeaderTitle title="Dipping Parameter" />
              ) : (
                ""
              )}
              {location.pathname === "/gloves-tracking" ? (
                <HeaderTitle title="Gloves Tracking" />
              ) : (
                ""
              )}
              {location.pathname === "/gloves-pairing" ? (
                <HeaderTitle title="Gloves Pairing" />
              ) : (
                ""
              )}
              {location.pathname === "/reports" ? (
                <HeaderTitle title="Reports & Approvals" />
              ) : (
                ""
              )}


              {
                location.pathname === "/manual-database" ? (
                  <HeaderTitle title="Manual Database" />
                ) : (
                  ""
                )
              }

              {/* {location.pathname === "/customer-report" ? (
            <HeaderTitle title="Customer Reports" />
          ) : (
            ""
          )} */}
            </div>

            <Box sx={{ flexGrow: 0 }} className="header-toolbar-wrapper">
              <div className="date-time-wrapper">
                <p>
                  {currDate}
                </p>
              </div>

              {/* <div className="notification-btn">
              <img src={Notification} alt="" />
              <span>12</span>
            </div> */}

              <div className="expand-screen-btn" onClick={openFullscreen}>
                {fullScreen ? <img src={images.minimizeScreen} alt="minimizeScreen"/> : <img src={ExpandScreen} alt="" />}
              </div>

              <div
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                className="profile-toggle-menu"
              >
                <Avatar alt="" src={Profile} />
                <p className="profile-name">{login ? login.firstName : null} {login ? login.lastName : null}</p>
                <ArrowForwardIosOutlinedIcon className="down-icon" />
              </div>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem style={{ padding: "8px 15px" }}>
                  <div className="profile-item">
                    <Avatar alt="" src={Profile} className="profile-image" />
                    <div className="profile-detail">
                      <p className="user-name">{login.firstName} {login.lastName}</p>
                      <p className="user-email">{login.email}</p>
                    </div>
                  </div>
                </MenuItem>

                <Divider />

                {login.is_manual_database_access ? <MenuItem className="menu-item" onClick={manualdatabase}>
                  <ListItemIcon>
                    <StorageIcon fontSize="small" href="/manual-database" />
                  </ListItemIcon>
                  Manual Database

                </MenuItem> : null}



                <MenuItem className="menu-item" onClick={logout}>
                  <ListItemIcon>
                    <LoginIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>

  );
}
export default Header;