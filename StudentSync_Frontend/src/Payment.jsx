import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInterceptor";
import { Description, Key } from "@mui/icons-material";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import { meta } from "@eslint/js";


const Payment = () => {
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);

//   const[isUpdating,setIsUpdating]=useState()

  const updateFeeStatus = () => {
  if(responseId){
    axiosInstance
    .put("https://studentsync-render-backend.onrender.com/student/fee-paid")
    .then((res) => {
      alert(res.data.message);
    })
    .catch((error) => {
      alert("ERROR !Fee status update failed !");
      console.log("status update failed !", error);
    });
  }
}

useEffect(() => {
    if (responseId) {
      updateFeeStatus();
    }
  }, [responseId]);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  }

  const createRazorpayOrder = (amount) => {
    let data = JSON.stringify({
      amount: amount * 100,
      currency: "INR",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://studentsync-render-backend.onrender.com/payments/orders",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axiosInstance
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        handleRazorpayScreen(response.data.amount);
      })
      .catch((error) => {
        console.log("error at", error);
      });
  };

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Some error at razorpay screen loading !");
      return;
    }

    const options = {
      key: import.meta.env.VITE_KEYID,
      amount: amount,
      currency: "INR",
      name: "Fee Payment",
      description: "Payment to StudentSync",
      image: "/logo/student-logo1.png",
      handler: function (response) {
        setResponseId(response.razorpay_payment_id);
      },
      prefill: {
        name: "StudentSync",
        email: "studentSync@gmail.com",
      },
      theme: {
        color: "rgba(0, 210, 126, 0.95)",
      },
    };

    if (typeof window !== "undefined" && window.Razorpay) {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
  } else {
      console.error("Razorpay SDK failed to load.");
  }
  };

  const paymentFetch = (e) => {
    e.preventDefault(); //to prevent automatic page reload

    const paymentId = e.target.paymentId.value;
    axiosInstance
      .get(`https://studentsync-render-backend.onrender.com/payments/paymentId/${paymentId}`)
      .then((res) => {
        console.log(res.data);
        setResponseState(res.data);
      })
      .catch((error) => {
        console.log("error occurs", error);
      });
  };
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.49)",
          margin: "10% auto",
          width: "80%",
          borderRadius: "20px",
          minHeight: 400,
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{ textAlign: "center", fontWeight: "500" }}
        >
          FEE PAYMENT
        </Typography>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "300", paddingTop: "20px" }}
        >
          Pay Amount of Rs:10000
        </Typography>
        <Button
          sx={{
            backgroundColor: "rgba(64, 173, 42, 0.69)",
            color: "black",
            marginTop: "20px",
            marginBottom: "20px",
          }}
          onClick={() => createRazorpayOrder(10000)}
        >
          Confirm payment
        </Button>
        {responseId && (
          <Typography sx={{ paddingBottom: "10px" }}>
            Payment ID: {responseId}
          </Typography>
        )}
        <Typography variant="h5" sx={{ paddingBottom: "20px" }}>
          Payment Verification
        </Typography>
        <form onSubmit={paymentFetch}>
          <TextField
            label="Payment ID"
            variant="outlined"
            name="paymentId"
            required
            sx={{
              "& label": {
                color: "white", // Default label color
              },
              "& label.Mui-focused": {
                color: "rgb(0, 255, 170)", // Label color on focus
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
                "& input": {
                  color: "white", // Input text color
                },
              },
            }}
          />
          <Button
            variant="conatined"
            type="submit"
            sx={{
              backgroundColor: "rgba(136, 37, 217, 0.59)",
              height: "50px",
              borderRadius: "10px",
              margin:"5px",
              marginLeft:"10px"
            }}
          >
            fetch payment
          </Button>
          {responseState.length !== 0 && (
            <Box sx={{margin:"5px auto",width:"14%"}}>
              <Typography sx={{paddingTop:"10px"}}>Amount: &nbsp;{responseState.amount * 100} </Typography>
              <Typography >currency: &nbsp;{responseState.currency}  </Typography>
              <Typography >Status: &nbsp;{responseState.status}  </Typography>
              <Typography>Method:  &nbsp;{responseState.method}</Typography>
            </Box>
          )}
        </form>
      </Box>
    </div>
  );
};

export default Payment;
