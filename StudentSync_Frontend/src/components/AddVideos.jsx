import { Button, Paper, TextField, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInterceptor";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalizationContext } from "@mui/x-date-pickers/internals";

const AddVideos = () => {
  const [classData, setClassData] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    video_url: "",
    class_id: "",
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

  function add_video() {
    if(validate()){
    const updatedForm = { ...form, class_id: classData._id };
    if (location.state != null) {
      axiosInstance
        .put(
          `https://studentsync-render-backend.onrender.com/videos/update-videos/${location.state.item._id}`,
          updatedForm
        )
        .then((res) => {
          alert(res.data.message);
          navigate("/viewVideos");
        })
        .catch((error) => {
          alert("Video updation failed !");
          console.log("ERROR !", error);
        });
    } else {
      axiosInstance
        .post("https://studentsync-render-backend.onrender.com/videos/add-videos", updatedForm)
        .then((res) => {
          alert(res.data.message);
          navigate("/viewVideos");
        })
        .catch((error) => {
          alert("ERROR! video add failed ");
          console.log("ERROR!", error);
        });
    }
  }
}

  useEffect(() => {
    if (location.state != null) {
      setForm({
        ...form,
        title: location.state.item.title,
        description: location.state.item.description,
        video_url: location.state.item.video_url,
      });
    } else {
      setForm({
        ...form,
        title: "",
        description: "",
        video_url: "",
        class_id: "",
      });
    }
  }, [location.state]);

  //validation 
  const[errors,setErrors]=useState({});

  function validate(){
    let valid=true;
    const newErrors={};

    //video title validation
    if(form.title.trim()==""){
      newErrors.title="Title is required !";
      valid=false;
    }

    //video description validation 
    if(form.description.trim()==""){
      newErrors.description="Video description is required !";
      valid=false;
    }

    //video URL validation
    if(form.video_url.trim()==""){
      newErrors.video_url="Video URL is required !"
    }

    setErrors(newErrors);
    return valid;
  }

  const correctUrl = (url) => {
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    } else if (url.includes("m.youtube.com/watch?v=")) {
      return url.replace("m.youtube.com/watch?v=", "www.youtube.com/embed/");
    } else if (url.includes("youtube.com/watch?v=")) {
      return url.replace("youtube.com/watch?v=", "www.youtube.com/embed/");
    }
    return url;
  };

  return (
    <>
      <div style={{ margin: "6% auto", maxWidth: "800px" }}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            backgroundColor: "rgba(255, 255, 255, 0.21)",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              marginBottom: 6,
              marginTop: "20px",
              fontWeight: "bold",
              textAlign: "center",
              color:"white"
            }}
          >
            {location.state!=null?"Edit Video":"Upload Video"}
            
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Video Name"
              name="title"
              value={form.title}
              error={!!errors.title}
              helperText={errors.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value });
              }}
              required
              sx={{
                marginBottom: 4,
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
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={form.description}
              error={!!errors.description}
              helperText={errors.description}
              onChange={(e) => {
                setForm({ ...form, description: e.target.value });
              }}
              required
              sx={{ marginBottom: 4,
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

            <TextField
              fullWidth
              label="Video URL(youtube only)"
              name="video_url"
              value={form.video_url}
              error={!!errors.video_url}
              helperText={errors.video_url}
              onChange={(e) => {
                setForm({ ...form, video_url: correctUrl(e.target.value) });
              }}
              required
              sx={{ marginBottom: 2 ,
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
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <Button
                variant="contained"
                className="login_btn"
                style={{ backgroundColor: "rgb(68, 2, 78)" }}
                onClick={add_video}
              >
                {location.state!=null?"EDIT VIDEO":"ADD VIDEO"}
                
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default AddVideos;
