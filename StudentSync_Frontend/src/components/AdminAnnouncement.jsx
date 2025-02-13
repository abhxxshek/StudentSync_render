import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInterceptor";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const AdminAnnouncement = () => {
  const [announcement, setAnnouncement] = useState({
    announcement: "",
    staff_id: null,
    class_id: null,
    admin_id: null,
  });

  //---------------------------decode Token-------------------------
  const token = sessionStorage.getItem("logintoken");
  let adminId = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      adminId = decodedToken.id;
    } catch (error) {
      console.log("Invalid Token ", error);
    }
  }

  
  function sendAnnouncement() {
    if (validate()) {
      const updatedAnnouncement = { ...announcement, admin_id: adminId };

      axiosInstance
        .post(
          "https://studentsync-render-backend.onrender.com/announcement/add-announcements",
          updatedAnnouncement
        )
        .then((res) => {
          alert(res.data.message);
          setAnnouncement({ ...announcement, announcement: "" });
          fetch_data();
        })
        .catch((error) => {
          alert("Announcement send failed !");
          console.log("Send error!", error);
        });
    }
  }
  const [announcementData, setAnnouncementData] = useState([]);

  useEffect(() => {
    fetch_data();
  }, []);

  function fetch_data() {
    axiosInstance
      .get("https://studentsync-render-backend.onrender.com/announcement/admin/display-announcements")
      .then((res) => {
        setAnnouncementData(res.data);
      })
      .catch((error) => {
        alert("Cannot fetch the announcements !");
        console.log("ERROR !", error);
      });
  }

  //validation
  const [errors, setErrors] = useState({});
  function validate() {
    let valid = true;
    const newErrors = {};

    //anouncement validation
    if (announcement.announcement.trim() == "") {
      newErrors.announcement = "This field is required !";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  function delete_announcement(item){
    axiosInstance.delete(`https://studentsync-render-backend.onrender.com/announcement/delete-announcement/${item._id}`).then((res)=>{
        alert(res.data.message);
        fetch_data()
    })
  }
  return (
    <div>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          fontWeight: "bold",

          marginTop: 15,
        }}
      >
        Announcements
      </Typography>
      <div
        style={{
          
          maxWidth: "50%",
          margin: "100px  auto",
          marginBottom: "30px",
        }}
      >
        <Grid container spacing={1}>
          <Grid size={{ xs: 10, md: 10 }}>
            <TextField
              fullWidth
              
              placeholder="New announcement"
              name="announcement"
              value={announcement.announcement}
              error={!!errors.announcement}
              helperText={errors.announcement}
              onChange={(e) =>
                setAnnouncement({
                  ...announcement,
                  announcement: e.target.value,
                })
              }
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: "5px",
                "& label": {
                  color: "white", // Default label color
                },
                "& label.Mui-focused": {
                  color: "rgb(0, 255, 170)", // Label color on focus
                },
                "& label.Mui-error": {
                  color: "rgb(255, 157, 0)", // Ensure label stays white in error state
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "rgb(0, 255, 170)", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(0, 255, 170)", // Border color on focus
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "rgb(253, 156, 0) !important", // Border color in error state
                  },
                  "& input": {
                    color: "white", // Input text color
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "rgb(253, 156, 0) !important", // Set the helper text color to white
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 2, md: 2 }} sx={{ textAlign: "right " }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgba(5, 125, 5, 0.75)",
                color: "black",
                width: "100px",
                margin: "3px auto",
                height: "50px",
                borderRadius: "10px",
              }}
              onClick={sendAnnouncement}
            >
              <SendIcon />
            </Button>
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          
          maxWidth: "50%",
          margin: "40px auto",
          marginBottom: "20px",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 280,
            overflowY: "auto",
            border: "0px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(1, 0, 0, 0.5)",
            backgroundColor: "rgba(78, 42, 123, 0.93)",
            scrollbarWidth: "none", // Hides scrollbar in Firefox
            "&::-webkit-scrollbar": {
              display: "none", // Hides scrollbar in Chrome, Safari, Edge
            },
          }}
        >
          <Table stickyHeader>
            <TableBody>
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
                      
                      color: "rgb(12, 204, 229)",
                      border: "none",
                      
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
                          {dayjs(item.createdAt).format("DD-MM-YYYY")}<br/>
                           {dayjs(item.createdAt).format("hh:mm A")}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell sx={{width:"50px",textAlign:"center",border:"none"}}>
                    <Button sx={{color:"white"}} onClick={()=>{delete_announcement(item)}}><DeleteOutlineTwoToneIcon/></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AdminAnnouncement;
