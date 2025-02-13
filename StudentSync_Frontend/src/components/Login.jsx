import { Box, Button, Link, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import React, { useState } from "react";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function capvalue() {
    if (validate()) {
      axios
        .post("http://localhost:7000/login/check-user", form)
        .then((res) => {
          alert(res.data.message);
          if (res.data.token) {
            sessionStorage.setItem("logintoken", res.data.token);
            
            const token=sessionStorage.getItem("logintoken");
            const decodeToken=jwtDecode(token);
            let role=decodeToken.role;
            if(role=="admin"){
              navigate('/adminHome')
            }
            if(role=="staff"){
              navigate('/staffHome')
            }
            if(role=="student"){
              navigate('/studentHome')
            }

        }})
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  }
  //validation
  const [errors, setErrors] = useState({});

  function validate() {
    let valid = true;
    const newErrors = {};

    //validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (form.email.trim() == "") {
      newErrors.email = "Email is required !";
      valid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email Id !";
      valid = false;
    }

    //validate password
    if (form.password.trim() == "") {
      newErrors.password = "Password is required !";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, margin: "auto", marginBottom: "8%" }}>
  <Grid container rowSpacing={2} columnSpacing={10} alignItems="center" justifyContent="center">
    
    <Grid item xs={12} sm={6} md={8} sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh", 
    }}>
      <img
        src="/logo/student-logo2.png"
        alt="Logo"
        width="100%"
        style={{ maxWidth: "600px" }}
      />
    </Grid>

    
    <Grid item xs={12} sm={6} md={4} sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center", 
      minHeight: "100vh", 
      
    }}>
      <div className="login_box" style={{ width: "440px", maxWidth: "400px" }}>
        <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
          Login
        </Typography>
        <br />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          error={!!errors.email}
          helperText={errors.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
          sx={{"& label": {
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
                  },}}
          fullWidth
        />
        <br />
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
        <br />
        <Button
          variant="contained"
          className="login_btn"
          style={{
            marginBottom: "20px",
            backgroundColor: "rgb(68, 2, 78)",
          }}
          onClick={capvalue}
        >
          Login
        </Button>
      </div>
    </Grid>
  </Grid>
</Box>
      <Box style={{ backgroundColor: "#260537" }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            
            paddingTop: "80px",
            paddingBottom: "100px",
            marginTop: "50px",
          }}
        >
          Why StudentSync ?
        </Typography>
        <Grid
          container
          spacing={3}
          margin=" auto 5%"
          marginTop="5%"
          paddingBottom="100px"
        >
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Box
              sx={{
                
                color: "white",
                borderRadius: "20px",
                width: "400px",
                padding: "4% 5%",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "30px",
                }}
              >
                <DashboardOutlinedIcon sx={{ width: "80px", height: "80px" }} />
              </Typography>
              <Typography variant="h4" textAlign={"center"}>
                Seperate Dashboards
              </Typography>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 6 }}
            sx={{ display: "flex", justifyContent: "end" }}
          >
            <Box
              sx={{
                
                color: "white",
                borderRadius: "20px",
                width: "400px",
                padding: "4% 5%",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "30px",
                }}
              >
                <CreditScoreOutlinedIcon
                  sx={{ width: "80px", height: "80px" }}
                />
              </Typography>
              <Typography variant="h4" textAlign={"center"}>
                Secure Payments
              </Typography>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 12 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                
                color: "white",
                borderRadius: "20px",
                width: "400px",
                padding: "3% 4%",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "30px",
                }}
              >
                <QuestionAnswerOutlinedIcon
                  sx={{ width: "80px", height: "80px" }}
                />
              </Typography>
              <Typography variant="h4" textAlign={"center"}>
                Live Chat
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Box
              sx={{
                
                color: "white",
                borderRadius: "20px",
                width: "400px",
                padding: "4% 5%",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "30px",
                }}
              >
                <ChecklistOutlinedIcon sx={{ width: "80px", height: "80px" }} />
              </Typography>
              <Typography variant="h4" textAlign={"center"}>
                Attendance
              </Typography>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 6 }}
            sx={{ display: "flex", justifyContent: "end" }}
          >
            <Box
              sx={{
                
                color: "white",
                borderRadius: "20px",
                width: "400px",
                padding: "4% 5%",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "30px",
                }}
              >
                <OndemandVideoOutlinedIcon
                  sx={{ width: "80px", height: "80px" }}
                />
              </Typography>
              <Typography variant="h4" textAlign={"center"}>
                Resource Sharing
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ backgroundColor: "#1F042C" }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            
            paddingTop: "80px",
            paddingBottom: "100px",
          }}
        >
          About Us
        </Typography>
        <Box sx={{ width: "80%", margin: "20px auto", paddingBottom: "5%" }}>
          <Typography variant="h5" sx={{ textAlign: "center",lineHeight:"1.8" }}>
            A comprehensive platform built to simplify the management of
            administrators, students, and staff. It offers seamless attendance
            tracking, real-time live chat, and an efficient system for sharing
            video lectures. The platform enhances communication between students
            and staff while ensuring a structured and organized administration
            process. Additionally, it integrates secure payment processing,
            allowing for hassle-free transactions. With user-friendly navigation
            and robust functionality, it streamlines daily operations, reduces
            manual workload, and improves overall efficiency. Whether managing
            attendance, facilitating discussions, or providing educational
            content, this platform serves as an all-in-one solution for modern
            academic administration and student engagement.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Login;
