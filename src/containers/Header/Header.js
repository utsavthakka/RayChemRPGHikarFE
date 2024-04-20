import * as React from "react";
import "./Header.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../assets/images/rayChemlogo.png";
import Profile from "../../assets/images/profile.png";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ExpandScreen from "../../assets/images/expand-screen.png";
import Notification from "../../assets/images/notification.png";
import { Divider, ListItemIcon } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Navigate, useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="header-wrapper">
      <Container maxWidth="none">
        <Toolbar disableGutters className="toolbar-wraper">
          <Typography variant="h6" noWrap component="a" href="/dashboard">
            <img src={Logo} alt="logo" className="header-logo" />
          </Typography>

          <Box sx={{ flexGrow: 0 }} className="header-toolbar-wrapper">
            <div className="date-time-wrapper">
              <p>15/07/2022, 10:30</p>
            </div>

            {/* <div className="notification-btn">
              <img src={Notification} alt="" />
              <span>12</span>
            </div> */}

            <div className="expand-screen-btn">
              <img src={ExpandScreen} alt="" />
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
              <p className="profile-name">Shreekar Yadav</p>
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
              <MenuItem>
                <div className="profile-item">
                  <Avatar alt="" src={Profile} className="profile-image" />
                  <div className="profile-detail">
                    <p className="user-name">Shreekar Yadav</p>
                    <p className="user-email">harold.harrison@gmail.com</p>
                  </div>
                </div>
              </MenuItem>

              <Divider />
              <MenuItem className="menu-item">
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem className="menu-item">
                <ListItemIcon>
                  <LockIcon fontSize="small" />
                </ListItemIcon>
                Change Password
              </MenuItem>
              <MenuItem className="menu-item" >
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
  );
}

export default Header;
