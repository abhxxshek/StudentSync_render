import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInterceptor';
import { useNavigate } from 'react-router-dom';

const Marks = () => {
     const [studentData, setStudentData] = useState([]);
     const navigate=useNavigate();

     useEffect(() => {
        axiosInstance
          .get("https://studentsync-render-backend.onrender.com/student/staff-students")
          .then((res) => {
            setStudentData(res.data);
          })
          .catch((error) => {
            alert("Student data fetch failed!");
            console.log(error);
          });
      }, []);

      function addMarks(studentItem){
        navigate('/addMarks',{state:{studentItem}});
      }

      function viewMarks(studentItem){
        navigate('/viewMarks',{state:{studentItem}});
      }
  return (
    <div>
         <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 13,
          marginTop: 6,
        }}
      >
        Grades
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
                Add Marks
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
                View Marks
              </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData.map((studentItem) => (
              <TableRow key={studentItem._id}>
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
                      backgroundColor:"rgba(255, 199, 86, 0.77)",
                      color:"rgb(112, 52, 2)"
                        
                    }}
                    variant="outlined"
                    onClick={() => {
                      addMarks(studentItem)
                    }}
                  >
                    Add marks
                  </Button>
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", color: "white", border: "none" }}
                >
                  <Button
                    style={{
                      border: "0px solid white",
                      borderRadius: "50px",
                      backgroundColor:" rgb(135, 177, 236)",
                      color:"rgb(2, 26, 92)"
                        
                    }}
                    variant="outlined"
                    onClick={() => {
                      viewMarks(studentItem)
                    }}
                  >
                    View marks
                  </Button>
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Marks