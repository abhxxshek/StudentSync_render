import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInterceptor";
import dayjs from "dayjs";

const StaffHome = () => {
  const [announcementData, setAnnouncementData] = useState([]);

  useEffect(() => {
    fetch_data();
  }, []);

  function fetch_data() {
    axiosInstance
      .get("http://localhost:7000/announcement/admin/display-announcements")
      .then((res) => {
        setAnnouncementData(res.data);
      })
      .catch((error) => {
        alert("Cannot fetch the announcements !");
        console.log("ERROR !", error);
      });
  }

  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    axiosInstance
      .get("http://localhost:7000/student/assignedClass-count-student")
      .then((res) => {
        setStudentCount(res.data.studentCount);
      })
      .catch((error) => {
        alert("Cannot fetch the count of student!");
        console.log("ERROR !", error);
      });
  }, []);

  const [userdata, setUserData] = useState({});

  useEffect(() => {
    axiosInstance
      .get("http://localhost:7000/profile/display-user")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        alert("user fetching failed !");
        console.log("ERROR fetching!", error);
      });
  }, []);

  //---------fee pending status---------------
  function send_pending_remainder() {
    axiosInstance
      .put("http://localhost:7000/student/fee-status-pending")
      .then((res) => {
        alert(res.data.message);
        fetch_studentData();
      })
      .catch((error) => {
        alert("ERROR !Fee remainder send failed !");
        console.log("remainder failed !", error);
      });
  }

  
  //---------fee paid status---------------
  function send_paid_status() {
    axiosInstance
      .put("http://localhost:7000/student/fee-status-paid")
      .then((res) => {
        alert(res.data.message);
        fetch_studentData()
      })
      .catch((error) => {
        alert("ERROR !Fee remainder unsend failed !");
        console.log("unsend remainder failed !", error);
      });
  }

  //---------------student data---------------
  const[studentData,setStudentData]=useState({});

  useEffect(()=>{
   fetch_studentData()
  },[])

  function fetch_studentData(){
    axiosInstance.get('http://localhost:7000/student/staff-students-fee-status').then((res)=>{
        setStudentData(res.data);
    }).catch((error)=>{
        alert("Student fee status fetching failed !");
        console.log("ERROR !Fetching fee status",error)
    })
  }
  return (
    <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "2%",
    gap: "2%", 
  }}
  className="container"
>
  {/* Left Side Profile */}
  <div
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.12)",
      height: "auto", 
      maxHeight: "75vh",
      width: "30%",
      minWidth: "280px", 
      padding: "2%",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflowY: "auto",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }}
    className="profile-container"
  >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: "550",
            paddingBottom: "60px",
            paddingTop: "30px",
            
          }}
        >
          PROFILE
        </Typography>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={0}
          
        >
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Typography
              variant="h6"
              sx={{
                paddingBottom: "30px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <span>Name </span> <span>:</span>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ paddingBottom: "30px" }}>
              {userdata.name}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Typography
              variant="h6"
              sx={{
                paddingBottom: "30px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <span>Email </span> <span>:</span>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ paddingBottom: "30px", wordBreak: "break-word" }}
            >
              {userdata.email}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Typography
              variant="h6"
              sx={{
                paddingBottom: "30px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <span>Date of Birth </span> <span>:</span>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ paddingBottom: "30px" }}>
              {dayjs(userdata.dob).format("DD-MM-YYYY")}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Typography
              variant="h6"
              sx={{
                paddingBottom: "30px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <span>Phone </span> <span>:</span>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ paddingBottom: "30px" }}>
              {userdata.contact}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Typography
              variant="h6"
              sx={{
                paddingBottom: "30px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <span>Address </span> <span>:</span>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ paddingBottom: "30px", wordBreak: "break-word" }}
            >
              {userdata.address}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Typography
              variant="h6"
              sx={{
                paddingBottom: "30px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <span>Class Assigned </span> <span>:</span>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ paddingBottom: "30px" }}>
              {userdata.class_assigned?.class_name || "N/A"}{" "}
              {userdata.class_assigned?.section || ""}
            </Typography>
          </Grid>
        </Grid>
      </div>
      {/* --------right side Other information---------- */}
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          marginLeft: "2%",
          marginRight: "0px",
          marginTop: "0px",
        }}
      >
        {/* ----------school Informations----------- */}
        <div style={{ margin: "2%" }}>
          <Grid container rowSpacing={2} columnSpacing={3}>
            
            <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "5px 4px 4px  rgba(11, 150, 175, 0.5)",
                  borderRadius: "15px",
                  paddingTop: "30px",
                  minHeight: "150px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" sx={{ paddingBottom: "30px" }}>
                  TOTAL STUDENTS
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ paddingBottom: "20px", color: "rgb(0, 255, 213)" }}
                >
                  {studentCount}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "5px 4px 4px  rgba(11, 150, 175, 0.5)",
                  borderRadius: "15px",
                  paddingTop: "30px",
                  minHeight: "150px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" sx={{ paddingBottom: "10px" }}>
                  FEE REMAINDER
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ paddingBottom: "20px", color: "rgb(0, 255, 213)" }}
                >
                  <Button
                    sx={{
                      backgroundColor: "rgba(157, 243, 144, 0.54)",
                      color: "rgb(13, 75, 3)",
                      width:"100px",
                      borderRadius:"10px",
                      padding:"3px",
                      margin:"5px",
                      marginRight:"10px",
                      height:"40px"
                    }}
                    onClick={() => {
                      send_pending_remainder();
                    }}
                  >
                    Send 
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "rgba(243, 144, 144, 0.54)",
                      color: "rgb(75, 3, 3)",
                      width:"100px",
                      borderRadius:"10px",
                      padding:"3px",
                      height:"40px"
                    }}
                    onClick={() => {
                      send_paid_status();
                    }}
                  >
                    Cancel 
                  </Button>
                </Typography>
                <Typography>{studentData.fee_status == "pending" ? "Remainder Status: Active" : "Remainder Status: Inactive"}</Typography>
              </Box>
            </Grid>
          </Grid>
        </div>

        {/* ------------Recent Announcements ---------------- */}

        <div style={{ padding: "2%", borderRadius: "20px" }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "500" }}
          >
            RECENT ANNOUNCEMENTS
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 280,
              maxWidth: 900,
              overflowY: "auto",
              border: "0px solid #ddd",
              borderRadius: "10px",
              margin: "20px auto",
              marginBottom: "5px",
              //   boxShadow: "0px 4px 10px rgba(1, 0, 0, 0.5)",
              backgroundColor: "rgba(78, 42, 123, 0.93)",
              scrollbarWidth: "none", // Hides scrollbar in Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Hides scrollbar in Chrome, Safari, Edge
              },
            }}
          >
            <Table stickyHeader>
              <TableBody className="scrolling-content">
                {announcementData.map((item, index) => (
                  <TableRow
                    key={item._id}
                    sx={{
                      backgroundColor:
                        index % 2 == 0
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0)",
                    }}
                  >
                    <TableCell
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        // textAlign: "left",
                        color: "rgb(12, 204, 229)",
                        border: "none",
                        // borderColor: "rgb(63, 4, 85)",
                      }}
                    >
                      <div>
                        <span style={{ color: "white" }}>
                          {item.announcement}
                        </span>
                      </div>
                      <div>
                        {item.createdAt && (
                          <span
                            style={{
                              fontSize: "12px",
                              color: "rgb(145, 222, 232)",
                              textAlign: "left",
                            }}
                          >
                            {dayjs(item.createdAt).format("DD-MM-YYYY")}
                            <br />
                            {dayjs(item.createdAt).format("hh:mm A")}
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default StaffHome;
