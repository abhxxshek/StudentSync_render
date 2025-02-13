import {
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

const AdminHome = () => {
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

  const[staffCount,setStaffCount]=useState(0);

  useEffect(()=>{
    axiosInstance.get('http://localhost:7000/staff/count-staff').then((res)=>{
        setStaffCount(res.data.staffCount);
    }).catch((error)=>{
        alert("Cannot fetch the count of staffs!");
        console.log("ERROR !",error);
    })
  },[])

  const[studentCount,setStudentCount]=useState(0);

  useEffect(()=>{
    axiosInstance.get('http://localhost:7000/student/count-student').then((res)=>{
        setStudentCount(res.data.studentCount);
    }).catch((error)=>{
        alert("Cannot fetch the count of student!");
        console.log("ERROR !",error);
    })
  },[])

  const[classCount,setClassCount]=useState(0);

  useEffect(()=>{
    axiosInstance.get('http://localhost:7000/classes/count-class').then((res)=>{
        setClassCount(res.data.classCount);
    }).catch((error)=>{
        alert("Cannot fetch the count of class!");
        console.log("ERROR !",error);
    })
  },[])


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
              {userdata.dob}
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
              {userdata.phone}
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
          <Grid
            container
            rowSpacing={2}
            columnSpacing={3}
           
          >
            <Grid size={{ xs: 12, sm: 12, md: 4 }} sx={{ textAlign: "center" }}>
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
                <Typography variant="h5" sx={{paddingBottom:"30px"}}>TOTAL STAFFS</Typography>
                <Typography variant="h3" sx={{paddingBottom:"20px",color:"rgb(0, 255, 213)"}}>{staffCount}</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }} sx={{ textAlign: "center" }}>
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
                <Typography variant="h5" sx={{paddingBottom:"30px"}}>TOTAL STUDENTS</Typography>
                <Typography variant="h3" sx={{paddingBottom:"20px",color:"rgb(0, 255, 213)"}}>{studentCount}</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }} sx={{ textAlign: "center" }}>
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
                <Typography variant="h5" sx={{paddingBottom:"30px"}}>TOTAL CLASSES</Typography>
                <Typography variant="h3" sx={{paddingBottom:"20px",color:"rgb(0, 255, 213)"}}>{classCount}</Typography>
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

export default AdminHome;
