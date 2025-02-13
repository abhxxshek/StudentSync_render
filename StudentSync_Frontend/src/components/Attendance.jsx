import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInterceptor";
import { style } from "framer-motion/client";
import { green } from "@mui/material/colors";
import navigate from "navigate";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Attendance = () => {
  const [studentData, setStudentData] = useState([]);
  const [attendance, setAttendance] = useState({});
  const navigate = useNavigate();
  const currentDate = new Date().toISOString().split("T")[0];
  const dateParts = currentDate.split("-");
  const dateFormat = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

  useEffect(() => {
    axiosInstance
      .get("http://localhost:7000/student/staff-students")
      .then((res) => {
        setStudentData(res.data);
      })
      .catch((error) => {
        alert("Student data fetch failed!");
        console.log(error);
      });
  }, []);
  //---------------------------decode Token-------------------------
    const token = sessionStorage.getItem("logintoken");
    let staffId = null;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        staffId = decodedToken.id;
      } catch (error) {
        console.log("Invalid Token ", error);
      }
    }

  const markAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === status ? null : status,
    }));
  };

  function submitAttendance() {
    const attendanceData = Object.entries(attendance).map(
      ([studentId, status]) => ({ studentId, status, date: currentDate,staff:staffId })
    );

    axiosInstance
      .post("http://localhost:7000/attendance/mark-attendance", {
        attendance: attendanceData,
      })
      .then((res) => {
        alert(res.data.message);
        navigate("/markAttendance");
      })
      .catch((error) => {
        console.error("Error submitting attendance:", error);
        alert("Failed to submit attendance");
      });
  }

  return (
    <div>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 4,
          marginTop: 6,
        }}
      >
        ATTENDANCE
      </Typography>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        {`Mark the attendance for ${dateFormat}`}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          // maxHeight: 800,
          // overflowY: "scroll",
          border: "0px solid #ddd",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          maxWidth: "80%",
          margin: "auto",
          backgroundColor: "rgba(50, 17, 88, 0.93)",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgba(36, 5, 71, 0.93)" }}>
              <TableCell
                sx={{
                  borderBottom: "2px solid white",
                  fontWeight: "bold",
                  width: "30%",
                  textAlign: "center",
                  color: "white",
                  backgroundColor: "rgba(36, 5, 71, 0.93)",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "2px solid white",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                  backgroundColor: "rgba(36, 5, 71, 0.93)",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "2px solid white",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                  backgroundColor: "rgba(36, 5, 71, 0.93)",
                }}
              >
                Present
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "2px solid white",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                  backgroundColor: "rgba(36, 5, 71, 0.93)",
                }}
              >
                Absent
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData.map((studentItem) => (
              <TableRow>
                <TableCell
                  sx={{ textAlign: "center", color: "white", border: "none" }}
                >
                  {studentItem.name}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", color: "white", border: "none" }}
                >
                  {studentItem.email}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", color: "white", border: "none" }}
                >
                  <Button
                    style={{
                      border: "0px solid white",
                      borderRadius: "50px",
                      backgroundColor:
                        attendance[studentItem._id] === 1
                          ? "rgb(181, 241, 181)"
                          : "transparent",
                      color:
                        attendance[studentItem._id] === 1
                          ? "rgb(1, 63, 1)"
                          : "white",
                    }}
                    variant="outlined"
                    onClick={() => {
                      markAttendance(studentItem._id, 1);
                    }}
                  >
                    Present
                  </Button>
                </TableCell>
                <TableCell sx={{ textAlign: "center", border: "none" }}>
                  <Button
                    style={{
                      borderRadius: "50px",
                      border: "0px solid white",
                      backgroundColor:
                        attendance[studentItem._id] === 0
                          ? "rgb(239, 123, 123)"
                          : "transparent",
                      color:
                        attendance[studentItem._id] === 0
                          ? "rgb(198, 2, 2)"
                          : "white",
                    }}
                    variant="outlined"
                    onClick={() => {
                      markAttendance(studentItem._id, 0);
                    }}
                  >
                    Absent
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "rgb(47, 2, 54)",
            "&:hover": {
              backgroundColor: " rgba(194, 145, 198, 0.5)",
              color: "black",
            },
            marginTop: "20px",
            height: "50px",
          }}
          onClick={submitAttendance}
        >
          Submit Attendance
        </Button>
      </div>
    </div>
  );
};

export default Attendance;
