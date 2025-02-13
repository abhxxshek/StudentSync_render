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
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor";
import dayjs from "dayjs";

const AddStaff = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    gender: "",
    subject: "",
    dob: null,
    class_assigned: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [classData, setClassData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("http://localhost:7000/classes/display-class")
      .then((res) => {
        setClassData(res.data);
      })
      .catch((error) => {
        alert("Error fetching the class details !", error);
      });
  });

  function capvalue() {
    if(validate()){
    if (location.state != null) {
      axiosInstance
        .put(
          `http://localhost:7000/staff/update-staff/${location.state.item._id}`,
          form
        )
        .then((res) => {
          alert(res.data.message);
          navigate("/viewStaff");
        })
        .catch(() => {
          alert("Error Updation failed !");
        });
    } else {
      axiosInstance
        .post("http://localhost:7000/staff/add-staff", form)
        .then((res) => {
          alert(res.data.message);
          navigate("/viewStaff");
        })
        .catch(() => {
          alert("Staff registration failed !");
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
        password: location.state.item.password,
        contact: location.state.item.contact,
        gender: location.state.item.gender || "",
        address: location.state.item.address,
        subject: location.state.item.subject,
        class_assigned: location.state.item.class_assigned || "",
        dob: dayjs(location.state.item.dob),
      });
    } else {
      setForm({
        ...form,
        name: "",
        email: "",
        password: "",
        contact: "",
        address: "",
        gender: "",
        subject: "",
        dob: null,
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

      //subject validation
      if(form.subject.trim()==""){
        newErrors.subject="Subject is required !"
        valid=false;
      }
  
      setErrors(newErrors);
      return valid;
  
     }

  return (
    <div className="addStaff_frm">
      <Typography
        variant="h3"
        style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
      >
        {location.state != null ? "UPDATE STAFF" : "ADD STAFF"}
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
                value={form.dob || null}
                onChange={(date) => {
                  setForm({ ...form, dob: date });
                }}
                format="DD/MM/YYYY"
                sx={{width:"100%",
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

        <Grid size={{ xs: 12, md: 4 }} sx={{ padding: "3%" }}>
          <FormControl>
            <FormLabel id="gender" style={{ color: "white" }}>
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              value={form.gender || ""}
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
              onChange={(e) => {
                setForm({ ...form, gender: e.target.value });
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

        <Grid size={{ xs: 12, md: 2 }}>
          <Box
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
                "& .MuiSelect-select": {
                  color: "white", // **Make selected text white**
                },
              },
              "& .MuiFormHelperText-root": {
                color: "rgb(253, 156, 0) !important", // Error helper text color
              },
            }}
          >
            <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">
                Class assigned
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={form.class_assigned || ""}
                label="Class_assigned"
                name="class_assigned"
                onChange={(e) => {
                  setForm({ ...form, class_assigned: e.target.value });
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                      overflowY: "auto",
                      
                    },
                  },
                }}
              >
                {classData.map((classItem) => (
                  <MenuItem
                    sx={{ color: "rgb(110, 3, 163)" }}
                    key={classItem._id}
                    value={classItem._id}
                  >
                    {classItem.class_name}
                    {classItem.section}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
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
            label="Subject"
            variant="outlined"
            name="subject"
            value={form.subject}
            error={!!errors.subject}
            helperText={errors.subject}
            onChange={(e) => {
              setForm({ ...form, subject: e.target.value });
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

        <br />
      </Grid>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <Button
          variant="contained"
          className="login_btn"
          style={{ backgroundColor: "rgb(68, 2, 78)" }}
          onClick={capvalue}
        >
           {location.state != null ? "UPDATE STAFF" : "REGISTER STAFF"}
        </Button>
      </div>
    </div>
  );
};

export default AddStaff;
