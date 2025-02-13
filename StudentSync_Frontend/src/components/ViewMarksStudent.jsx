import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInterceptor';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const ViewMarksStudent = () => {
    const[marks,setMarks]=useState([]);
    const location =useLocation();
//---------------------------decode Token-------------------------
    const token = sessionStorage.getItem("logintoken");
    let studentId = null;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        studentId = decodedToken.id;
      } catch (error) {
        console.log("Invalid Token ", error);
      }
    }


    useEffect(()=>{
        axiosInstance.get(`http://localhost:7000/marks/display-marks/${studentId}`).then((res)=>{
            setMarks(res.data);
        }).catch((error)=>{
            alert("Cannot fetch mark details !");
            console.log("ERROR !",error);
        })
    },[])

    

    const cardTransition = {
        hidden: { opacity: 0, x: 50 }, // Start from  the right
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }, // Slide to position
      };
  return (
    <div>
         <Typography
        variant="h3"
        sx={{
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        Your Grades
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          padding: "5%",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 2,
          boxSizing: "border-box",
        }}
      >
        {marks.map((item) => (
          <motion.div
            key={item._id}
            variants={cardTransition}
            initial="hidden"
            animate="visible"
          >
            <Card
              sx={{
                border: "0px solid white",
                borderRadius: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.27)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "200px",
                maxHeight: "300px",
              }}
            >
              <CardContent
                sx={{
                  padding: "20px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color:"white"
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color:"white"
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{ marginTop: "10px", overflowWrap: "break-word" }}
                >
                  Computer Science: {item.computer_science}
                </Typography>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{ overflowWrap: "break-word" }}
                >
                  Mathematics: {item.mathematics}
                </Typography>
               
                <Typography
                  variant="body2"
                  color="white"
                  sx={{
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  Science: {item.science}
                </Typography>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{ overflowWrap: "break-word" }}
                >
                  English: {item.english}
                </Typography>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{ overflowWrap: "break-word" }}
                >
                  Hindi: {item.hindi}
                </Typography>
                <Typography
                  variant="body2"
                  
                  sx={{ overflowWrap: "break-word" }}
                >
                  Total Percentage: <span style={{color:"rgb(72, 254, 0)",fontWeight:"bold"}}>{item.total_percentage} %</span>
                </Typography>
                
              </CardContent>
              <CardActions
                sx={{
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >            
                  
              </CardActions>
            </Card>
          </motion.div>
        ))}
      </Box>
    </div>
  )
}

export default ViewMarksStudent