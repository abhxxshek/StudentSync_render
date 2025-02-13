import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../axiosInterceptor";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const AddStudent = () => {
  const [classData, setClassData] = useState({});
  const [form, setForm] = useState({
    name: "",
    dob: null,
    email: "",
    password: "",
    fathers_name: "",
    mothers_name: "",
    address: "",
    gender: "",
    contact: "",
    class_assigned: "",
  });

  useEffect(() => {
    axiosInstance
      .get("https://studentsync-render-backend.onrender.com/classes/staff/class")
      .then((res) => {
        setClassData(res.data);
      })
      .catch((error) => {
        alert("Error fetching the class details !", error);
      });
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  function capvalue() {
    const updatedForm = { ...form, class_assigned: classData._id };
    if(validate()){
    if (location.state != null) {
      axiosInstance
        .put(
          `https://studentsync-render-backend.onrender.com/student/update-student/${location.state.item._id}`,
          updatedForm
        )
        .then((res) => {
          alert(res.data.message);
          navigate("/viewStudent");
        })
        .catch((error) => {
          alert("Student update failed !");
        });
    } else {
      axiosInstance
        .post("https://studentsync-render-backend.onrender.com/student/add-student", updatedForm)
        .then((res) => {
          alert(res.data.message);
          navigate("/viewStudent");
        })
        .catch((error) => {
          alert("Error student registration failed !");
        });
    }
  }
}

  useEffect(() => {
    if (location.state != null) {
      setForm({
        ...form,
        name: location.state.item.name,
        email: location.state.item.email,
        dob: dayjs(location.state.item.dob),
        contact: location.state.item.contact,
        fathers_name: location.state.item.fathers_name,
        mothers_name: location.state.item.mothers_name,
        class_assigned: location.state.item.class_assigned,
        address: location.state.item.address,
        gender: location.state.item.gender,
      });
    } else {
      setForm({
        ...form,
        name: "",
        dob: null,
        email: "",
        password: "",
        fathers_name: "",
        mothers_name: "",
        address: "",
        gender: "",
        contact: "",
        class_assigned: "",
      });
    }
  }, [location.state]);

  //validation
  const[errors,setErrors]=useState({});
  function validate(){
    let valid=true;
    const newErrors={};

    //name validation
    const nameRegex = /^[A-Z][a-z]+(?: [A-Z][a-zA-Z]*)?$/;
    if(form.name.trim()==""){
      newErrors.name="Name is required !"
      valid=false;
    }else if (!nameRegex.test(form.name)){
      newErrors.name="First letter of the firstname and lastname should be uppercase !"
    }

    //dob validation
    if (!form.dob || !dayjs(form.dob).isValid()) {
      newErrors.dob = "Date Of Birth is required!";
      valid = false;
    }
    
    //email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (form.email.trim() == "") {
      newErrors.email = "Email is required !";
      valid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email Id !";
      valid = false;
    }

    //password validation 
    if (!location.state && form.password.trim() == "") {
      newErrors.password = "Password is required!";
      valid=false;
    }

    //fathers_name validation
    const fathers_nameRegex = /^[A-Z][a-z]+(?: [A-Z][a-zA-Z]*)?$/;
    if(form.fathers_name.trim()==""){
      newErrors.fathers_name="Name is required !"
      valid=false;
    }else if (!fathers_nameRegex.test(form.fathers_name)){
      newErrors.fathers_name="First letter of the firstname and lastname must be uppercase !"
    }

    //mothers_name validation
    const mothers_nameRegex = /^[A-Z][a-z]+(?: [A-Z][a-zA-Z]*)?$/;
    if(form.mothers_name.trim()==""){
      newErrors.mothers_name="Name is required !"
      valid=false;
    }else if (!mothers_nameRegex.test(form.mothers_name)){
      newErrors.mothers_name="First letter of the firstname and lastname must be uppercase !"
    }

    //address validation 
    if(form.address.trim()==""){
      newErrors.address="Address is required";
      valid=false;
    }

    

    //contact validation
    const phoneRegex = /^(?:\+91[-\s]?)?[6-9]\d{9}$/;
    if(String(form.contact).trim()==""){
      newErrors.contact="Phone number is required !";
      valid=false;
    }else if(!phoneRegex.test(form.contact)){
      newErrors.contact="Phone number must be valid !"
      valid=false;
    }

    setErrors(newErrors);
    return valid;

   }

  return (
    <div className="addStudent_frm">
      <Typography
        variant="h3"
        style={{
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          paddingBottom: "30px",
        }}
      >
        {location.state != null ? "UPDATE STUDENT" : "ADD STUDENT"}
      </Typography>
      <br />
      <Grid container spacing={2} alignItems={"center"}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={form.name}
            error={!!errors.name}
            helperText ={errors.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
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
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box components={["DatePicker"]}>
              <DatePicker
                label="Date Of Birth"
                name="dob"
                value={form.dob}
                error={!!errors.dob}
                helperText={errors.dob}
                onChange={(date) => {
                  setForm({ ...form, dob: date });
                }}
                format="DD/MM/YYYY"
                sx={{
                  width: "100%",
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
            </Box>
          </LocalizationProvider>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={form.email}
            error={!!errors.email}
            helperText={errors.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
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
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            error={!!errors.password}
            helperText={errors.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
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
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Father's Name"
            variant="outlined"
            name="fathers_name"
            value={form.fathers_name}
            error={!!errors.fathers_name}
            helperText={errors.fathers_name}
            onChange={(e) => {
              setForm({ ...form, fathers_name: e.target.value });
            }}
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
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Mother's Name"
            variant="outlined"
            name="mothers_name"
            value={form.mothers_name}
            error={!!errors.mothers_name}
            helperText={errors.mothers_name}
            onChange={(e) => {
              setForm({ ...form, mothers_name: e.target.value });
            }}
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
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Address"
            variant="outlined"
            name="address"
            value={form.address}
            error={!!errors.address}
            helperText={errors.address}
            onChange={(e) => {
              setForm({ ...form, address: e.target.value });
            }}
            sx={{
              "& label": {
                color: "white", // Default label color
              },
              "& label.Mui-focused": {
                color: "rgb(0, 255, 170)", // Label color on focus
              },
              "& label.Mui-error": {
                color: "rgb(255, 157, 0)", // Label color in error state
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
                "& input, & .MuiInputBase-inputMultiline": {
                  color: "white", // Text color inside input and multiline textarea
                },
              },
              "& .MuiFormHelperText-root": {
                color: "rgb(253, 156, 0) !important", // Helper text color
              },
            }}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ padding: "3%" }}>
          <FormControl error={Boolean(errors.gender)}>
            <FormLabel id="gender" style={{ color: "white" }}>
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              value={form.gender}
              
              
              onChange={(e) => {
                setForm({ ...form, gender: e.target.value });
              }}
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: "white", // Default label color
                },
                "& .MuiRadio-root": {
                  color: "white", // Default radio button color
                },
                "& .Mui-checked": {
                  color: "rgb(0, 255, 170) !important", // Color when selected
                },
                "& .MuiFormControlLabel-root:hover": {
                  color: "rgb(0, 255, 170)", // Hover effect on label
                },
              }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                style={{ color: "rgba(4, 3, 3, 0.72)" }}
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                style={{ color: "rgba(4, 3, 3, 0.72)" }}
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
                style={{ color: "rgba(4, 3, 3, 0.72)" }}
              />
            </RadioGroup>
            
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Contact"
            variant="outlined"
            name="contact"
            value={form.contact}
            error={!!errors.contact}
            helperText={errors.contact}
            onChange={(e) => {
              setForm({ ...form, contact: e.target.value });
            }}
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
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Class"
            variant="outlined"
            name="class_assigned"
            value={`${classData.class_name}${classData.section}`}
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
            readOnly
            fullWidth
          />
        </Grid>

        <br />
      </Grid>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <Button
          variant="contained"
          className="login_btn"
          style={{ backgroundColor: "rgb(68, 2, 78)" }}
          onClick={capvalue}
        >
          {location.state != null ? "Update student" : "Register Student"}
        </Button>
      </div>
    </div>
  );
};

export default AddStudent;
