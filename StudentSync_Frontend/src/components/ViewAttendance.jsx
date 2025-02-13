import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInterceptor";




const ViewAttendance = () => {
    const[attendanceData,setAttendanceData]=useState([]);
   


   
      //------------------date picker-------------------
      const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]         // setting todays date as default value 
      );
      const currentDate = `${selectedDate}`;
    const dateParts = currentDate.split("-");                    
    const dateFormat = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;



    useEffect(()=>{
      
        axiosInstance.get(`http://localhost:7000/attendance/display-attendance/${selectedDate}`).then((res)=>{
             
            setAttendanceData(res.data);
        }).catch((error)=>{
            alert("Cannot fetch the attendance details")
            console.log("Error!,Fetching attendance",error)
        })
    },[selectedDate])
    
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
              {`View attendance of ${dateFormat}` }
            </Typography>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <TextField
          type="date"
          value={selectedDate}
          onChange={(e) => {
            const date=e.target.value;
            setSelectedDate(date);
          }}
          variant="outlined"
          sx={{
            width: "250px",
            "& .MuiInputBase-input": { color: "white" }, 
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" }, 
              "&:hover fieldset": { borderColor: "white" }, 
              "&.Mui-focused fieldset": { borderColor: "white" }, 
            }
          }}
          
        />
      </div>
    
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
                  borderBottom:'2px solid white',
                  fontWeight: "bold",
                  width: "30%",
                  textAlign: "center",
                  color:"white",
                  backgroundColor: "rgba(36, 5, 71, 0.93)",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  borderBottom:'2px solid white',
                  fontWeight: "bold",
                  textAlign: "center",
                  color:"white",
                  backgroundColor: "rgba(36, 5, 71, 0.93)",
                  width:"450px"  
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  borderBottom:'2px solid white',
                  fontWeight: "bold",
                  textAlign: "center",
                  color:"white",
                  width:'',
                  backgroundColor: "rgba(36, 5, 71, 0.93)",
                  
                }}
              >
                Status
              </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((attendanceItem) => (
              <TableRow sx={{border:'none'}}>
                <TableCell sx={{ textAlign: "center",color:"white",border:'none' }}>
                  {attendanceItem.student_id.name}
                </TableCell>
                <TableCell sx={{ textAlign: "center",color:"white",border:'none' }}>
                  {attendanceItem.student_id.email}
                </TableCell>
                <TableCell sx={{ textAlign: "center",color:"white",border:'none' }}>
                  <div style={{borderRadius: "50px",padding: "10px 20px 10px 20px", width: "fit-content",backgroundColor:attendanceItem.status==1?"rgb(181, 241, 181)":"rgb(239, 123, 123)", color:attendanceItem.status==1?"rgb(1, 63, 1)":"rgb(198, 2, 2)",margin:'auto 100px'}}>

                  {attendanceItem.status==1?'Present':'Absent'}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewAttendance;
