import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import axiosInstance from "../../axiosInterceptor";
import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const StudentChat = () => {
  const [question, setQuestion] = useState({
    student_id: "",
    staff_id: "",
    class_id: "",
    question: "",
    answer: "",
  });
  const [data, setData] = useState({});
  const [chat, setChat] = useState([]);

  useEffect(() => {
    fetch_data()
  }, []);

  function fetch_data(){
    axiosInstance
      .get("http://localhost:7000/chat/student/display-chat")
      .then((res) => {
        setChat(res.data);
      })
      .catch((error) => {
        alert("Chat fetch failed !");
        console.log("ERROR! fetch chat failed", error);
      });
  }
  useEffect(() => {
    axiosInstance
      .get("http://localhost:7000/student/student-chat")
      .then((res) => {
        // console.log("Fetched student data:", res.data);
        setData(res.data);
      })
      .catch((error) => {
        alert("classId and staffId fetch failed !");
      });
  }, []);

  function sendQuestion() {
    const updatedQuestion = {
      ...question,
      student_id: data.studentId,
      class_id: data.classId,
      staff_id: data.staffId,
    };
    if(validate()){

    axiosInstance
      .post("http://localhost:7000/chat/new-chat", updatedQuestion)
      .then((res) => {
        
        setQuestion((prev) => ({
          ...prev,
          question: "", // Empty string, NOT a space
        }));
        fetch_data()
        
      })
      .catch((error) => {
        alert("ERROR! cannot send the message");
        console.log("ERROR!", error);
      });
  }
}

  //validation
  const[errors,setErrors]=useState({});
  function validate(){
    let valid=true;
    const newErrors={};

    //chat validation
    if(question.question.trim()==""){
      newErrors.question="Question field is required !";
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

          marginTop: 15,
        }}
      >
        Chat with Teacher
      </Typography>
      <div
        style={{
          
          maxWidth: "50%",
          margin: "100px  auto",
          marginBottom: "30px",
        }}
      >
        <Grid container spacing={1}>
          <Grid size={{ xs: 10, md: 10 }}>
            <TextField
              fullWidth
              
              placeholder="Ask a question..."
              name="question"
              value={question.question}
              error={!!errors.question}
              helperText={errors.question}
              onChange={(e) =>
                setQuestion({ ...question, question: e.target.value })
              }
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: "5px",
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
          <Grid size={{ xs: 2, md: 2 }} sx={{ textAlign: "right " }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgba(5, 125, 5, 0.75)",
                color: "black",
                width: "100px",
                margin: "3px auto",
                height: "50px",
                borderRadius: "10px",
              }}
              onClick={sendQuestion}
            >
              <SendIcon />
            </Button>
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          
          maxWidth: "50%",
          margin: "40px auto",
          marginBottom: "20px",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 280,
            overflowY: "auto",
            border: "0px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(1, 0, 0, 0.5)",
            backgroundColor: "rgba(78, 42, 123, 0.93)",
            scrollbarWidth: "none", // Hides scrollbar in Firefox
            "&::-webkit-scrollbar": {
              display: "none", // Hides scrollbar in Chrome, Safari, Edge
            },
          }}
        >
          <Table stickyHeader>
            <TableBody>
              {chat.map((item, index) => (
                <TableRow
                  key={item._id}
                  sx={{
                    backgroundColor:
                      index % 2 == 0
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0)",
                  }}
                >
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      
                      color: "rgb(12, 204, 229)",
                      border: "none",
                      
                    }}
                  >
                    <div >
                    <strong>You:</strong>&nbsp;{"  "}
                    <span style={{ color: "white" }}>{item.question}</span>

                    {item.answer && (
                      <p>
                        <strong>Teacher:</strong>
                        <span style={{ color: "white" }}> {item.answer}</span>
                      </p>
                    )}
                    </div>
                    <div>
                    {item.createdAt && (
                      <span
                        style={{
                          fontSize: "12px",
                           color: "rgb(145, 222, 232)",
                          textAlign: "left",
                        }}
                      >
                        {dayjs(item.createdAt).format("hh:mm A")}
                      </span>
                    )}
                    </div>
                    
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default StudentChat;
