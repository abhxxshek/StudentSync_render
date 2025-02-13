import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";
import PersonAddAltSharpIcon from "@mui/icons-material/PersonAddAltSharp";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import axiosInstance from "../../axiosInterceptor";
import CampaignIcon from '@mui/icons-material/Campaign';
import LogoutIcon from "@mui/icons-material/Logout";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [anchorElStaff, setAnchorElStaff] = React.useState(null);
  const [anchorElStudent, setAnchorElStudent] = React.useState(null);
  const [anchorElVideo, setAnchorElVideo] = React.useState(null);
  const [anchorElAttendance, setAnchorElAttendance] = React.useState(null);
  const [anchorElLogout, setAnchorElLogout] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for Drawer toggle
  const navigate = useNavigate();

  //------------------Staff Menu------------------
  const handleOpenStaffMenu = (event) => {
    setAnchorElStaff(event.currentTarget);
  };

  const handleCloseStaffMenu = () => {
    setAnchorElStaff(null);
  };

  const addStaff = () => {
    navigate("/addStaff");
    setAnchorElStaff(null);
  };

  const viewStaff = () => {
    navigate("/viewStaff");
    setAnchorElStaff(null);
  };

  //------------------Student Menu------------------
  const handleOpenStudentMenu = (event) => {
    setAnchorElStudent(event.currentTarget);
  };

  const handleCloseStudentMenu = () => {
    setAnchorElStudent(null);
  };

  const addStudent = () => {
    navigate("/addStudent");
    setAnchorElStudent(null);
  };

  const viewStudent = () => {
    navigate("/viewStudent");
    setAnchorElStudent(null);
  };

  //------------------Video Menu-----------------
  const handleOpenVideoMenu = (event) => {
    setAnchorElVideo(event.currentTarget);
  };

  const handleCloseVideoMenu = () => {
    setAnchorElVideo(null);
  };

  const addVideos = () => {
    navigate("/addVideos");
    setAnchorElVideo(null);
  };

  const viewVideos = () => {
    navigate("/viewVideos");
    setAnchorElVideo(null);
  };

  //------------------Video Menu-----------------

  const handleOpenAttendanceMenu = (event) => {
    setAnchorElAttendance(event.currentTarget);
  };

  const handleCloseAttendanceMenu = () => {
    setAnchorElAttendance(null);
  };

  const addAttendance = () => {
    navigate("/markAttendance");
    setAnchorElAttendance(null);
  };

  const viewAttendance = () => {
    navigate("/viewAttendance");
    setAnchorElAttendance(null);
  };

  //-----------------------logout menu-------------------------
  const handleOpenLogoutMenu = (event) => {
    setAnchorElLogout(event.currentTarget);
  };

  const handleCloseLogoutMenu = () => {
    setAnchorElLogout(null);
  };

  //----------------------Individual username data fetch------------------
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axiosInstance
      .get("https://studentsync-render-backend.onrender.com/login/username")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        alert("cannot fetch the user data");
      });
  }, []);

  //---------------------------decode Token-------------------------
  const token = sessionStorage.getItem("logintoken");
  let role = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role;
    } catch (error) {
      console.log("Invalid Token ", error);
    }
  }

  //---------------------logout -------------------------
  function logoutToken() {
    sessionStorage.removeItem("logintoken");
    navigate("/");
    setAnchorElAttendance(null);
  }

  //-------------------------- Toggle Drawer-----------------------
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerItems = (
    <Box
      sx={{ width: 250, backgroundColor: "#2f0743", color: "white" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
       
        {role === "admin" && (
          <>
          <ListItem>
              <Link
                to={"/adminHome"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton>
                <HomeIcon/> &nbsp;
                  <ListItemText primary="Home" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={addStaff}>
                <PersonAddAltSharpIcon /> &nbsp;
                <ListItemText primary="Add Staff" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={viewStaff}>
                <RemoveRedEyeSharpIcon /> &nbsp;
                <ListItemText primary="View Staff" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <Link
                to={"/adminAnnouncements"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton>
                <CampaignIcon />&nbsp;
                  <ListItemText primary="Announcements" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={"/class"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton>
                  <ListItemText primary="Class" />
                </ListItemButton>
              </Link>
            </ListItem>
          </>
        )}
        {role == "staff" && (
          <>
           <ListItem>
              <Link
                to={"/staffHome"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton>
                 <HomeIcon/> &nbsp;
                  <ListItemText primary="Home" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={addStudent}>
                <PersonAddAltSharpIcon />&nbsp;
                <ListItemText primary="Add student" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={viewStudent}>
                <RemoveRedEyeSharpIcon />&nbsp;
                <ListItemText primary="View student" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <Link
                to={"/staffAnnouncements"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton>
                  <CampaignIcon />&nbsp;
                  <ListItemText primary="Announcements" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={"/staffChat"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton>
                <ChatOutlinedIcon/>&nbsp;
                  <ListItemText primary="Chat" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={"/addVideos"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton>
                <PersonAddAltSharpIcon />&nbsp;
                  <ListItemText primary="Add Videos" />
                </ListItemButton>
              </Link>
            </ListItem>
            
            <ListItem>
              <Link
                to={"/viewVideos"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton>
                <RemoveRedEyeSharpIcon />&nbsp;
                  <ListItemText primary="View Videos" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={"/marks"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton>
                  <GradingOutlinedIcon/> &nbsp;
                  <ListItemText primary="Grades" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={addAttendance}>
                <ChecklistIcon />&nbsp;
                <ListItemText primary="Mark Attendance" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={viewAttendance}>
                <RemoveRedEyeSharpIcon />&nbsp;
                <ListItemText primary="View Attendance" />
              </ListItemButton>
            </ListItem>
            
          </>
        )}
        {role == "student" && (
          
          <>
          <ListItem>
              <Link
                to={"/studentHome"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton>
                <HomeIcon/> &nbsp;
                  <ListItemText primary="Home" />
                </ListItemButton>
              </Link>
              </ListItem>
              <ListItem>
              <Link
                to={"/studentChat"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton>
                <ChatOutlinedIcon/>&nbsp;
                  <ListItemText primary="Chat" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={"/viewVideos"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton>
                <RemoveRedEyeSharpIcon />&nbsp;
                  <ListItemText primary="View Videos" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={"/viewStudentAttendance"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton>
                <RemoveRedEyeSharpIcon />&nbsp;
                  <ListItemText primary="View Attendance" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={"/viewMarksStudent"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton>
                <RemoveRedEyeSharpIcon />&nbsp;
                  <ListItemText primary="View Grades" />
                </ListItemButton>
              </Link>
            </ListItem>
          </>
        )}

        <ListItem>
          <ListItemButton onClick={logoutToken}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          style={{
            background: "linear-gradient(to right,rgb(97, 62, 134), #2f0743)",
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              StudentSync
            </Typography>
            {/* Toggle Button for Mobile */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            {/* Desktop Menu */}
            <Box sx={{ display: { xs: "none", md: "flex" }, flexWrap: "wrap" }}>
              {role == "admin" && (
                <>
                  <Link to={"/adminHome"}>
                    <Button sx={{ color: "white" }}>Home</Button>
                  </Link>
                  <Box>
                    <Button
                      sx={{ color: "white" }}
                      aria-controls="staff-menu"
                      aria-haspopup="true"
                      onClick={handleOpenStaffMenu}
                    >
                      Staff
                    </Button>
                    <Menu
                      id="staff-menu"
                      anchorEl={anchorElStaff}
                      open={Boolean(anchorElStaff)}
                      onClose={handleCloseStaffMenu}
                    >
                      <MenuItem onClick={addStaff}>
                        <PersonAddAltSharpIcon />
                        &nbsp;Add Staff
                      </MenuItem>
                      <MenuItem onClick={viewStaff}>
                        <RemoveRedEyeSharpIcon />
                        &nbsp;View Staff
                      </MenuItem>
                    </Menu>
                  </Box>
                </>
              )}

              {role == "staff" && (
                <>
                 <Link to={"/staffHome"}>
                    <Button sx={{ color: "white" }}>Home</Button>
                  </Link>
                  <Box>
                    <Button
                      sx={{ color: "white" }}
                      aria-controls="student-menu"
                      aria-haspopup="true"
                      onClick={handleOpenStudentMenu}
                    >
                      student
                    </Button>
                    <Menu
                      id="student-menu"
                      anchorEl={anchorElStudent}
                      open={Boolean(anchorElStudent)}
                      onClose={handleCloseStudentMenu}
                    >
                      <MenuItem onClick={addStudent}>
                        <PersonAddAltSharpIcon />
                        &nbsp;Add student
                      </MenuItem>
                      <MenuItem onClick={viewStudent}>
                        <RemoveRedEyeSharpIcon />
                        &nbsp;View student
                      </MenuItem>
                    </Menu>
                  </Box>

                  <Link to={"/staffAnnouncements"}>
                    <Button sx={{ color: "white" }}>Announcements</Button>
                  </Link>

                  <Box>
                    <Button
                      sx={{ color: "white" }}
                      aria-controls="video-menu"
                      aria-haspopup="true"
                      onClick={handleOpenVideoMenu}
                    >
                      Videos
                    </Button>
                    <Menu
                      id="video-menu"
                      anchorEl={anchorElVideo}
                      open={Boolean(anchorElVideo)}
                      onClose={handleCloseVideoMenu}
                    >
                      <MenuItem onClick={addVideos}>
                        <PersonAddAltSharpIcon />
                        &nbsp;Add Videos
                      </MenuItem>
                      <MenuItem onClick={viewVideos}>
                        <RemoveRedEyeSharpIcon />
                        &nbsp;View Videos
                      </MenuItem>
                    </Menu>
                  </Box>
                  <Link to={"/staffChat"}>
                    <Button sx={{ color: "white" }}>Chat</Button>
                  </Link>

                  <Link to={"/marks"}>
                    <Button sx={{ color: "white" }}>Grades</Button>
                  </Link>

                  <Box>
                    <Button
                      sx={{ color: "white" }}
                      aria-controls="attendance-menu"
                      aria-haspopup="true"
                      onClick={handleOpenAttendanceMenu}
                    >
                      Attendance
                    </Button>
                    <Menu
                      id="attendance-menu"
                      anchorEl={anchorElAttendance}
                      open={Boolean(anchorElAttendance)}
                      onClose={handleCloseAttendanceMenu}
                    >
                      <MenuItem onClick={addAttendance}>
                        <ChecklistIcon />
                        &nbsp;Mark Attendance
                      </MenuItem>
                      <MenuItem onClick={viewAttendance}>
                        <RemoveRedEyeSharpIcon />
                        &nbsp;View Attendance
                      </MenuItem>
                    </Menu>
                  </Box>
                </>
              )}
              {role == "student" && (
                <>
                 <Link to={"/studentHome"}>
                    <Button sx={{ color: "white" }}>Home</Button>
                  </Link>
                  <Link to={"/studentChat"}>
                    <Button sx={{ color: "white" }}>Chat</Button>
                  </Link>
                  <Link to={"/viewVideos"}>
                    <Button sx={{ color: "white" }}>Videos</Button>
                  </Link>

                  <Link to={"/viewStudentAttendance"}>
                    <Button sx={{ color: "white" }}>Attendance</Button>
                  </Link>

                  <Link to={"/viewMarksStudent"}>
                    <Button sx={{ color: "white" }}>Grades</Button>
                  </Link>
                </>
              )}
              {role == "admin" && (
                <>
                  <Link to={"/adminAnnouncements"}>
                    <Button sx={{ color: "white" }}>Announcements</Button>
                  </Link>

                  <Link to={"/class"}>
                    <Button sx={{ color: "white" }}>Class</Button>
                  </Link>
                </>
              )}

              {/* <Button sx={{ color: "rgb(252, 76, 0)" }} onClick={logoutToken}>
                Logout
              </Button> */}

              <Box>
                <Button
                  sx={{ color: "rgb(0, 255, 251)" }}
                  aria-controls="logout-menu"
                  aria-haspopup="true"
                  onClick={handleOpenLogoutMenu}
                >
                  {userData.name}
                </Button>
                <Menu
                  id="logout-menu"
                  anchorEl={anchorElLogout}
                  open={Boolean(anchorElLogout)}
                  onClose={handleCloseLogoutMenu}
                >
                  <MenuItem onClick={logoutToken}>
                    <LogoutIcon />
                    &nbsp;Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        {/* Drawer for Mobile Menu */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerItems}
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
