import {Box,Button,Card,CardActions,CardContent,Typography} from "@mui/material";
  import dayjs from "dayjs";
  import { useNavigate } from "react-router-dom";
  import React, { useEffect, useState } from "react";
  import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
  import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
  import axiosInstance from "../../axiosInterceptor";
  import {motion} from "framer-motion";
  
  const ViewStaff = () => {
    const [cardData, setCardData] = useState([]);
    
    useEffect(() => {
      fetch_data()
    }, []);
  
     function fetch_data(){
      axiosInstance
      .get("https://studentsync-render-backend.onrender.com/staff/display-staff")
      .then((res) => {
        setCardData(res.data);
      })
      .catch((error) => {
        alert("Staff data fetch failed!");
        console.log(error);
      });
  }
     
    const navigate = useNavigate();
  
    function update_staff(item) {
      navigate("/addStaff", { state: { item } });
    }
  
    function delete_staff(item) {
      axiosInstance
        .delete(`https://studentsync-render-backend.onrender.com/staff/delete-staff/${item._id}`)
        .then((res) => {
          setCardData((cardData) => cardData.filter((staff) => staff._id !== item._id));
          
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
          STAFF DETAILS
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
                backgroundColor: "rgba(255, 255, 255, 0.28)",
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
                  color:"black"
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
                  sx={{
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  Subject: {item.subject}
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
                  Class Assigned: {item.class_assigned.class_name}{item.class_assigned.section}
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
                  onClick={() => update_staff(item)}
                >
                  <ModeEditOutlineSharpIcon sx={{ marginRight: "5px" }} />
                  Edit
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "rgb(68, 2, 78)" ,
                    color: "white",
                    width: "48%",
                    "&:hover": { backgroundColor: 'rgba(194, 145, 198, 0.5)',color:"black" },
                  }}
                  onClick={() => delete_staff(item)}
                >
                  <DeleteOutlineTwoToneIcon sx={{ marginRight: "5px", }} />
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
  
  export default ViewStaff;
  