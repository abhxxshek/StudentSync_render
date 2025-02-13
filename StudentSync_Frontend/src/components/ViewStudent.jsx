import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
import axiosInstance from "../../axiosInterceptor";
import { motion } from "framer-motion";

const ViewStudent = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetch_data()
  }, []);

  function fetch_data(){
    axiosInstance
      .get("http://localhost:7000/student/staff-students")
      .then((res) => {
        setCardData(res.data);
      })
      .catch((error) => {
        alert("Student data fetch failed!");
        console.log(error);
      });
  }

  const navigate = useNavigate();

  function update_student(item) {
    navigate("/addStudent", { state: { item } });
  }

  function delete_student(item) {
    axiosInstance
      .delete(`http://localhost:7000/student/delete-student/${item._id}`)
      .then((res) => {
        
        fetch_data()
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.error("Error during deletion!", error);
      });
  }

  const cardTransition = {
    hidden: { opacity: 0, x: 50 }, // Start from  the right
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }, // Slide to position
  };

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        STUDENT DETAILS
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
        {cardData.map((item) => (
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
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{ marginTop: "10px", overflowWrap: "break-word" }}
                >
                  Email: {item.email}
                </Typography>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{ overflowWrap: "break-word" }}
                >
                  Phone: {item.contact}
                </Typography>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{ overflowWrap: "break-word" }}
                >
                  Date of Birth: {dayjs(item.dob).format("DD-MM-YYYY")}
                </Typography>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  Address: {item.address}
                </Typography>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{ overflowWrap: "break-word" }}
                >
                  Father's name: {item.fathers_name}
                </Typography>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{ overflowWrap: "break-word" }}
                >
                  Mother's name: {item.mothers_name}
                </Typography>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  Gender: {item.gender}
                </Typography>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  Class: {item.class_assigned.class_name}{item.class_assigned.section}
                </Typography>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  Fee status: <span style={{color:item.fee_status=="paid"?"rgb(143, 246, 69)":"rgb(250, 177, 98)"}}>{item.fee_status}</span>
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    color: "black",
                    border: "1px solid black",
                    width: "48%",
                    "&:hover": { backgroundColor: 'rgba(192, 133, 198, 0.5)',color:"black" },
                  }}
                  onClick={() => update_student(item)}
                >
                  <ModeEditOutlineSharpIcon sx={{ marginRight: "5px" }} />
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "rgb(68, 2, 78)" ,
                    color: "white",
                    border: "0px solid black",
                    width: "48%",
                   "&:hover": { backgroundColor: 'rgba(194, 145, 198, 0.5)',color:"black" },
                  }}
                  onClick={() => delete_student(item)}
                >
                  <DeleteOutlineTwoToneIcon sx={{ marginRight: "5px" }} />
                  Delete
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        ))}
      </Box>
    </>
  );
};

export default ViewStudent;
