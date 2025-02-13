import React, { useState, useEffect } from "react";
import {Box,TextField,Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axiosInstance from "../../axiosInterceptor";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
import AddClassForm from "./AddClassForm";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
  const [classData, setClassData] = useState([]);
  
 
  useEffect(() => {
    fetch_data();
    
  }, []);

  function fetch_data(){
    axiosInstance.get("https://studentsync-render-backend.onrender.com/classes/display-class").then((res) =>{
      setClassData(res.data)})
      .catch((error) => {
       console.error("Error fetching classes:", error)});
   }

   const navigate=useNavigate();
   
   function edit_class(classItem){
    navigate('/class',{state:{classItem}});
   }


  function delete_class(classItem){
    axiosInstance.delete(`https://studentsync-render-backend.onrender.com/classes/delete-class/${classItem._id}`).then((res)=>{
      alert(res.data.message);
      fetch_data();
      navigate('/class')
    }).catch((error)=>{
      console.error("ERROR",error)
      alert("Error deletion failed!")
    })
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 8,marginTop:6 }}
      >
        MANAGE CLASSES
      </Typography>
      <Grid container spacing={10}>
        {/* Left Side: Table */}
        <Grid size={{xs:12, md:7}}>
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, fontWeight: "bold",textAlign:'center' }}
          >
            CLASS LIST
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 300,
              overflowY: "auto",
              border: "0px solid #ddd",
              boxShadow: "0px 4px 10px rgba(1, 0, 0, 0.5)",
              backgroundColor: "rgba(58, 12, 110, 0.93)",
              scrollbarWidth: "none", // Hides scrollbar in Firefox
    "&::-webkit-scrollbar": {
      display: "none", // Hides scrollbar in Chrome, Safari, Edge
    },
            }}
          >
            <Table stickyHeader >
              <TableHead >
                <TableRow  sx={{backgroundColor: "rgba(36, 5, 71, 0.93)"}}>
                  <TableCell sx={{ fontWeight: "bold",width: "30%" ,textAlign:"center",backgroundColor: "rgba(36, 5, 71, 0.93)",color:"white",borderBottom:"2px solid white"}}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold",textAlign:"center",backgroundColor: "rgba(36, 5, 71, 0.93)",color:"white",borderBottom:"2px solid white"}}>Section</TableCell>
                  <TableCell sx={{ fontWeight: "bold",textAlign:"center",backgroundColor: "rgba(36, 5, 71, 0.93)",color:"white",borderBottom:"2px solid white"}}>Edit</TableCell>
                  <TableCell sx={{ fontWeight: "bold",textAlign:"center",backgroundColor: "rgba(36, 5, 71, 0.93)",color:"white",borderBottom:"2px solid white"}}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classData.map((classItem) => (
                  <TableRow key={classItem._id}>
                    <TableCell sx={{textAlign:"center",color:"white",border:'none'}}>{classItem.class_name}</TableCell>
                    <TableCell sx={{textAlign:"center",color:"white",border:'none'}}>{classItem.section}</TableCell>
                    <TableCell sx={{textAlign:"center",border:'none'}}><Button style={{color:"white"}} onClick={()=>{edit_class(classItem)}}><ModeEditOutlineSharpIcon/></Button></TableCell>
                    <TableCell sx={{textAlign:"center",border:'none'}}><Button style={{color:"white"}} onClick={()=>{delete_class(classItem)}}><DeleteOutlineTwoToneIcon/></Button></TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Right Side: Form */}
        <Grid size={{xs:12, md:5}}>
            <AddClassForm/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddClass;
