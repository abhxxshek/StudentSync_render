import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInterceptor";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion";

const ViewVideos = () => {
  const [cardData, setCardData] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    fetch_data()
  }, []);

  function fetch_data(){
    axiosInstance
      .get("http://localhost:7000/videos/display-videos")
      .then((res) => {
        setCardData(res.data);
      })
      .catch((error) => {
        alert("Video data fetch failed !");
        console.log("ERROR !", error);
      });
  }

  function update_video(item){
   navigate('/addVideos',{state:{item}});
  }

  function delete_video(item){
    axiosInstance.delete(`http://localhost:7000/videos/delete-videos/${item._id}`).then((res)=>{
        
        fetch_data()
    }).catch((error)=>{
        alert("Video deletion failed !");
        console.log("ERROR !",error)
    })
  }

  const cardTransition = {
    hidden: { opacity: 0, y: 50 }, // Start from  the right
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Slide to position
  };

  return (
    <div style={{ margin: "5%" }}>
      <Typography
        variant="h3"
        sx={{
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        VIDEOS
      </Typography>
      <Box
          sx={{
            width: "100%",
            display: "grid",
            padding: "5%",
            
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 3,
            boxSizing: "border-box",
          }}>
        {cardData.map((item) => (
          <motion.div
          key={item._id}
          variants={cardTransition}
          initial="hidden"
          animate="visible"
        >
          
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: "20px",
                padding: "5%",
                backgroundColor: "rgba(255, 255, 255, 0.27)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              <CardMedia
                component="iframe"
                width="100%"
                height="200"
                src={item.video_url}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                sx={{ borderRadius: "20px" }}
                allowFullScreen
              />
              <CardContent>
                <Typography gutterBottom variant="h5" sx={{color:"white"}}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "black" }}>
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  sx={{
                    color: "black",
                    border: "1px solid black",
                    width: "48%",
                    "&:hover": { backgroundColor: 'rgba(192, 133, 198, 0.5)',color:"black" },
                  }}
                  onClick={()=>{update_video(item)}}
                >
                  <ModeEditOutlineSharpIcon sx={{ marginRight: "5px" }} />
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "rgb(68, 2, 78)",
                    color: "white",
                    border: "0px solid black",
                    width: "48%",
                    "&:hover":  { backgroundColor: 'rgba(194, 145, 198, 0.5)',color:"black" },
                  }}
                  onClick={()=>{delete_video(item)}}
                >
                  <DeleteOutlineTwoToneIcon sx={{ marginRight: "5px" }}/>
                  Delete
                </Button>
              </CardActions>
            </Card>
          
          </motion.div>
        ))}
       </Box> 
      
      
    </div>
  );
};

export default ViewVideos;
