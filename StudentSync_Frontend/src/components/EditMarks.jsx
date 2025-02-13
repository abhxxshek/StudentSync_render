import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor";
import { jwtDecode } from "jwt-decode";
import navigate from "navigate";


const EditMarks = () => {
    const [marks, setMarks] = useState({
        title: "",
        computer_science: "",
        mathematics: "",
        science: "",
        english: "",
        hindi: "",
      });
      const location = useLocation();
      const navigate = useNavigate();
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
    
      function submitMarks() {
        if(validate()){
    
       
        const updatedMarks = {
          ...marks,
          
          total_percentage: calculatePercentage(),
        };
        axiosInstance
          .put(`https://studentsync-render-backend.onrender.com/marks/edit-marks/${location.state.item._id}`, updatedMarks)
          .then((res) => {
            alert(res.data.message);
            navigate("/marks");
          })
          .catch((error) => {
            alert("ERROR! Marks adding failed !");
            console.log("Adding failed", error);
          });
      }
    }

    useEffect(()=>{
        setMarks({...marks,
            title:location.state.item.title,
            computer_science:location.state.item.computer_science,
            mathematics:location.state.item.mathematics,
            science:location.state.item.science,
            english:location.state.item.english,
            hindi:location.state.item.hindi
    })
    },[])
    
      function calculatePercentage() {
        const totalMarks =
          (Number(marks.computer_science) || 0) +
          (Number(marks.mathematics) || 0) +
          (Number(marks.science) || 0) +
          (Number(marks.english) || 0) +
          (Number(marks.hindi) || 0);
    
        const percentage = (totalMarks / 500) * 100;
        return percentage.toFixed(2); //limited to 2 decimal places
      }
    
    //validation 
      const[errors,setErrors]=useState({});
      function validate(){
        let valid=true;
        const newErrors={}
    
        //mark validation
        var markRegex= /^\d{0,3}(\.\d{0,1})?$/;
    
        //validate exam name 
        if(marks.title.trim()==""){
          newErrors.title="Title is required !";
          valid=false;
        }
        //validate computer science marks 
        if(String(marks.computer_science).trim()==""){
          newErrors.computer_science="Mark is required !"
          valid=false;
        }else if (!markRegex.test(marks.computer_science)){
          newErrors.computer_science="The marks should be atmost two digit !"
          valid=false;
        }
        //validate mathematics marks
        if(String(marks.mathematics).trim()==""){
          newErrors.mathematics="Mark is required !"
          valid=false;
        }else if (!markRegex.test(marks.mathematics)){
          newErrors.mathematics="The marks should be atmost two digit !"
          valid=false;
        }
        // validate science marks 
        if(String(marks.science).trim()==""){
          newErrors.science="Mark is required !"
          valid=false;
        }else if (!markRegex.test(marks.science)){
          newErrors.science="The marks should be atmost two digit !"
          valid=false;
        }
        // validate english marks
        if(String(marks.english).trim()==""){
          newErrors.english="Mark is required !"
          valid=false;
        }else if (!markRegex.test(marks.english)){
          newErrors.english="The marks should be atmost two digit !"
          valid=false;
        }
        //validate hindi marks
        if(String(marks.hindi).trim()==""){
          newErrors.hindi="Mark is required !"
          valid=false;
        }else if (!markRegex.test(marks.hindi)){
          newErrors.hindi="The marks should be atmost two digit !"
          valid=false;
        }
    
        setErrors(newErrors);
        return valid;
      }
    
  return (
    <div>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 15,
          marginTop: 20,
        }}
      >
        Edit Marks 
      </Typography>
      <Box
        sx={{
          margin: "30px auto",
          width: "80%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          paddingTop: "3%",
          paddingLeft: "0%",
          borderRadius: "20px",
          paddingBottom: "1%",
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={20} alignItems={"center"}>
          <Grid
            size={{ xs: 12, md: 12 }}
            sx={{ marginBottom: "20px", textAlign: "center" }}
          >
            <TextField
              variant="outlined"
              name="title"
              placeholder="Enter the name of the exam....."
               value={marks.title}
               error={!!errors.title}
               helperText ={errors.title}
              onChange={(e) => {
                setMarks({ ...marks, title: e.target.value });
              }}
              sx={{
                width: "60%",
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
          <Grid
            size={{ xs: 6, md: 5 }}
            sx={{ textAlign: "right", marginBottom: "20px" }}
          >
            <Typography variant="h5" sx={{ fontWeight: "700" }}>
              Computer Science :
            </Typography>
          </Grid>
          <Grid size={{ xs: 5, md: 3 }} sx={{ marginBottom: "20px" }}>
            <TextField
              variant="outlined"
              name="computer_science"
              type="number"
              error={!!errors.computer_science}
               helperText ={errors.computer_science}
               value={marks.computer_science}
              onChange={(e) => {
                setMarks({ ...marks, computer_science: e.target.value });
              }}
              sx={{
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none", // Hides spinner in Chrome, Safari, Edge, Opera
                    margin: 0,
                  },
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
          <Grid size={{ xs: 6, md: 3 }} sx={{ marginBottom: "20px" }}>
            <Typography variant="h5" sx={{ fontWeight: "500" }}>
              out of 100
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 6, md: 5 }}
            sx={{ textAlign: "right", marginBottom: "20px" }}
          >
            <Typography variant="h5" sx={{ fontWeight: "700" }}>
              Mathematics :
            </Typography>
          </Grid>
          <Grid size={{ xs: 5, md: 3 }} sx={{ marginBottom: "20px" }}>
            <TextField
              variant="outlined"
              name="mathematics"
              type="number"
              value={marks.mathematics}
               error={!!errors.mathematics}
               helperText ={errors.mathematics}
              onChange={(e) => {
                setMarks({ ...marks, mathematics: e.target.value });
              }}
              sx={{"& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none", // Hides spinner in Chrome, Safari, Edge, Opera
                    margin: 0,
                  },
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
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }} sx={{ marginBottom: "20px" }}>
            <Typography variant="h5" sx={{ fontWeight: "500" }}>
              out of 100
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 6, md: 5 }}
            sx={{ textAlign: "right", marginBottom: "20px" }}
          >
            <Typography variant="h5" sx={{ fontWeight: "700" }}>
              Science :
            </Typography>
          </Grid>
          <Grid size={{ xs: 5, md: 3 }} sx={{ marginBottom: "20px" }}>
            <TextField
              variant="outlined"
              name="science"
              type="number"
              value={marks.science}
               error={!!errors.science}
               helperText ={errors.science}
              onChange={(e) => {
                setMarks({ ...marks, science: e.target.value });
              }}
              sx={{"& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none", // Hides spinner in Chrome, Safari, Edge, Opera
                    margin: 0,
                  },
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
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }} sx={{ marginBottom: "20px" }}>
            <Typography variant="h5" sx={{ fontWeight: "500" }}>
              out of 100
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 6, md: 5 }}
            sx={{ textAlign: "right", marginBottom: "20px" }}
          >
            <Typography variant="h5" sx={{ fontWeight: "700" }}>
              English :
            </Typography>
          </Grid>
          <Grid size={{ xs: 5, md: 3 }} sx={{ marginBottom: "20px" }}>
            <TextField
              variant="outlined"
              name="english"
              type="number"
              value={marks.english}
               error={!!errors.english}
               helperText ={errors.english}
              onChange={(e) => {
                setMarks({ ...marks, english: e.target.value });
              }}
              sx={{"& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none", // Hides spinner in Chrome, Safari, Edge, Opera
                    margin: 0,
                  },
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
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }} sx={{ marginBottom: "20px" }}>
            <Typography variant="h5" sx={{ fontWeight: "500" }}>
              out of 100
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 6, md: 5 }}
            sx={{ textAlign: "right", marginBottom: "20px" }}
          >
            <Typography variant="h5" sx={{ fontWeight: "700" }}>
              Hindi :
            </Typography>
          </Grid>
          <Grid size={{ xs: 5, md: 3 }} sx={{ marginBottom: "20px" }}>
            <TextField
              variant="outlined"
              name="hindi"
              type="number"
              value={marks.hindi}
               error={!!errors.hindi}
               helperText ={errors.hindi}
              onChange={(e) => {
                setMarks({ ...marks, hindi: e.target.value });
              }}
              sx={{"& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none", // Hides spinner in Chrome, Safari, Edge, Opera
                    margin: 0,
                  },
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
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }} sx={{ marginBottom: "20px" }}>
            <Typography variant="h5" sx={{ fontWeight: "500" }}>
              out of 100
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 6, md: 5 }}
            sx={{ marginBottom: "20px", textAlign: "right" }}
          >
            <Typography variant="h5" sx={{ fontWeight: "700" }}>
              Total Percentage:
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 5 }} sx={{ marginBottom: "20px" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "700", color: "rgb(238, 255, 0)" }}
            >
              {/*   function to calculate the total percentage */}
              {calculatePercentage()}%
            </Typography>
          </Grid>
        </Grid>
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
              marginTop: "50px",
              height: "50px",
            }}
            onClick={() => {
              submitMarks();
            }}
          >
            Submit Marks
          </Button>
        </div>
      </Box>
    </div>
  )
}

export default EditMarks