import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInterceptor";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid2";
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
import dayjs from "dayjs";
import { div } from "framer-motion/client";
import { ErrorSharp } from "@mui/icons-material";

const StaffChat = () => {
  const [chat, setChat] = useState([]);
  const [reply, setReply] = useState({});

  useEffect(() => {
    fetchChats();
  }, []);
  function fetchChats() {
    axiosInstance
      .get("http://localhost:7000/chat/staff/display-chat")
      .then((res) => {
        setChat(res.data);
      })
      .catch((error) => {
        alert("Chat fetch failed !");
        console.log("ERROR! fetching chat failed", error);
      });
  }

  function sendReply(item) {
    
    axiosInstance
      .put(`http://localhost:7000/chat/reply/${item._id}`,{ answer: reply[item._id] })
      .then((res) => {
        
        fetchChats();
      })
      .catch((error) => {
        alert("Reply send failed !");
        console.log("ERROR! Reply failed !", error);
      });
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
        Chat with students
      </Typography>
      <div
        style={{
         
          maxWidth: "50%",
          margin: "100px  auto",
          marginBottom: "30px",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 380,
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
                      <strong>Student ({item.student_id.name}):</strong>&nbsp;{"  "}
                      <span style={{ color: "white" }}>{item.question}</span>
                      {item.answer ? (
                        <p>
                          <strong>You:</strong>
                          <span style={{ color: "white" }}> {item.answer}</span>
                        </p>
                      ) : (
                        <Grid container spacing={1}>
                          <Grid size={{ xs: 9, md: 9 }} >
                            <TextField
                            fullWidth
                              name="reply"
                              value={reply[item._id] || ""}
                              placeholder="Your reply...."
                              
                              onChange={(e) =>
                                setReply({ ...reply, [item._id]: e.target.value })
                              }

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
                              
                              
                              InputProps={{
                                style: {
                                  backgroundColor:"rgba(255, 255, 255, 0.48)",
                                  height: "40px",
                                  borderRadius: "15px",
                                  padding: "5px 10px",
                                  marginTop: "10px",
                                  color:"white"
                                },
                              }}
                            />
                          </Grid>
                          <Grid size={{ xs: 3, md: 3 }}>
                            <Button
                              onClick={() => {
                                sendReply(item);
                              }}
                              sx={{height:"48px",marginTop:"5px",color:"green"}}
                            >
                              <SendIcon />
                            </Button>
                          </Grid>
                        </Grid>
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

export default StaffChat;
