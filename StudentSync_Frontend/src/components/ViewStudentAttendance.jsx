import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axiosInstance from '../../axiosInterceptor';

const ViewStudentAttendance = () => {

    const[attendanceData,setAttendanceData]=useState([]);

    useEffect(()=>{
        axiosInstance.get('https://studentsync-render-backend.onrender.com/attendance/display-student-attendance').then((res)=>{
            setAttendanceData(res.data);

        }).catch((error)=>{
            alert("cannot fetch your attendance !")
        })
    },[])

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
      
      
    
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 800,
          overflowY: "auto",
          border: "0px solid #ddd",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          maxWidth: "60%",
          margin: "100px auto",
          backgroundColor: "rgba(58, 12, 110, 0.93)",
          scrollbarWidth: "none", // Hides scrollbar in Firefox
    "&::-webkit-scrollbar": {
      display: "none", // Hides scrollbar in Chrome, Safari, Edge
    },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgba(12, 74, 139, 0.26)" }}>
              
              <TableCell
                sx={{
                  borderBottom:'2px solid white',
                  fontWeight: "bold",
                  textAlign: "center",
                  width:"100px",
                  color:"white",
                  backgroundColor: "rgba(36, 5, 71, 0.93)",
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  borderBottom:'2px solid white',
                  fontWeight: "bold",
                  textAlign: "center",
                  width:"",
                  color:"white",
                  backgroundColor: "rgba(36, 5, 71, 0.93)",
                }}
              >
                Status
              </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((attendanceItem) => (
              <TableRow >
                <TableCell sx={{ textAlign: "center",color:"white",border:'none' }}>
                  {(attendanceItem.date).split("T")[0]}
                </TableCell>
            
                <TableCell sx={{ textAlign: "center",border:'none',color:"white"}}>
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
  )
}

export default ViewStudentAttendance