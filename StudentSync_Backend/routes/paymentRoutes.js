const Razorpay=require('razorpay');
const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));

//ORDER ID GENERATION
router.post('/orders',async(req,res)=>{
    const razorpay=new Razorpay({
        key_id:"rzp_test_GYgXLevf7Fb2hM",
        key_secret:"0l1KIkMmOtOltwecjWW5T1kP"
    })

    const options={
        amount:req.body.amount,
        currency:req.body.currency,
        reciept:"receipt#1",
        payment_capture:1
    }

    try{
        const response=await razorpay.orders.create(options)
        res.send({
            order_id:response.id,
            currency:response.currency,
            amount:response.amount
        })
    }catch(error){
        res.send({message:"Internal server error !"})
    }
})

//get payment ID
router.get('/paymentId/:id',async(req,res)=>{
    const paymentId = req.params.id;
    const razorpay=new Razorpay({
        key_id:process.env.keyId,
        key_secret:process.env.secretKey
    })

    try{
        const payment=await razorpay.payments.fetch(paymentId);
        if(!payment){
            return res.send({message:"Error at razorpay loading !"})
        }
        res.send({
            status:payment.status,
            method:payment.method,
            amount:payment.amount,
            currency:payment.currency
        })
    }catch(error){
        res.send({message:"failed to fetch payment details !"})
    }
})


module.exports=router