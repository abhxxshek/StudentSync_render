import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInterceptor";
import { useLocation, useNavigate } from "react-router-dom";

const AddClassForm = () => {
  const [form, setForm] = useState({
    class_name: "",
    section: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState({});

  function validate() {
    let valid = true;
    const newErrors = {};

    //CLASS NAME VALIATION
    const classNameRegex = /^\d{1,2}$/;

    if (String(form.class_name).trim() == "") {
      newErrors.class_name = "Class name is required !";
      valid = false;
    } else if (!classNameRegex.test(form.class_name)) {
      newErrors.class_name = "Class name must be valid !";
      valid = false;
    }

    //SECTION VALIDATION
    const sectionRegex = /^[A-Z]$/;
    if (form.section.trim() == "") {
      newErrors.section = "Section is required !";
      valid = false;
    } else if (!sectionRegex.test(form.section)) {
      newErrors.section = "Section must be a valid capital Alphabet !";
      valid=false
    }

    setErrors(newErrors);
    return valid;
  }
 

  function capvalue() {
    
    if (validate()) {
      
    
      if (location.state != null) {
        axiosInstance
          .put(
            `http://localhost:7000/classes/update-class/${location.state.classItem._id}`,
            form
          )
          .then((res) => {
            alert(res.data.message);
            
            navigate("/class");
            window.location.reload();
            
          })
          .catch((error) => {
            alert("ERROR updation failed !");
            console.log("ERROR !", error);
          });
      } else {
        axiosInstance
          .post("http://localhost:7000/classes/add-class", form)
          .then((res) => {
            alert(res.data.message);
            
            navigate('/class')
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error adding class:", error);
            alert("Failed to add class.");
          });
      }
    }
  }

  useEffect(() => {
    if (location.state != null) {
      setForm({
        ...form,
        class_name: location.state.classItem.class_name,
        section: location.state.classItem.section,
      });
    } else {
      setForm({ ...form, class_name: "", section: "" });
    }
  }, [location.state]);

  return (
    <Grid container justifyContent="center" sx={{ mt: 5 }}>
      <Grid item xs={12} sm={12} md={12}>
      <Typography
            variant="h5"
            sx={{ marginBottom: 2, fontWeight: "bold", textAlign: "center" }}
          >
            {location.state != null ? "UPDATE CLASS" : "ADD NEW CLASS"}
          </Typography>

        <Paper
          elevation={3}
          sx={{
            padding: 3,
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            backgroundColor: "rgba(255, 255, 255, 0.39)",
          }}
        >
          
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Class Name"
                  name="class_name"
                  sx={{
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
                  value={form.class_name}
                  error={!!errors.class_name}
                  helperText={errors.class_name}
                  onChange={(e) => setForm({ ...form, class_name: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Section"
                  name="section"
                  sx={{
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
                  value={form.section}
                  error={!!errors.section}
                  helperText={errors.section}
                  onChange={(e) => setForm({ ...form, section: e.target.value })}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "rgb(68, 2, 78)" ,
                    color: "white",
                    "&:hover": { backgroundColor:" rgba(194, 145, 198, 0.5)",color:"black" },
                  }}
                  onClick={capvalue}
                >
                  {location.state != null ? "Update Class" : "Add Class"}
                </Button>
              </Grid>
            </Grid>
         
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddClassForm;
