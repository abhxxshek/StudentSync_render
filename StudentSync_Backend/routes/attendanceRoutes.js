const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const verify = require("./verifyRoute");
const staffModel = require("../model/staffData");
const studentModel = require("../model/studentData");
const attendanceModel = require("../model/attendanceData");

//mark attendance
router.post("/mark-attendance", verify, async (req, res) => {
  try {
    const { attendance } = req.body;
    const date = new Date(attendance[0].date).toISOString().split("T")[0];
    const staffId=attendance[0].staff;
    console.log("staffid:",date);
    const attendanceExist = await attendanceModel.findOne({ date: date,staff:staffId });
    if (attendanceExist) {
      return res.send({
        message: "ATTENDANCE IS ALREADY MARKED FOR THIS DATE !",
      });
    }

    const attendanceData = attendance.map((item) => ({
      student_id: item.studentId,
      status: item.status,
      date: item.date,
      staff:item.staff
    }));
    await attendanceModel.insertMany(attendanceData);
    res.send({ message: "Attendance submitted successfully" });
  } catch (error) {
    res.send({ message: "ERROR! Mark atleast 1 attendance to submit" });
  }
});

// display attendance in teacher interface
router.get("/display-attendance/:date", verify, async (req, res) => {
  try {
    const staff_id = req.user.id;
    const staff = await staffModel.findOne({ _id: staff_id });

    const student = await studentModel.find({
      class_assigned: staff.class_assigned,
    });

    const date = req.params.date;

    const attendance = await attendanceModel
      .find({ student_id: { $in: student.map((s) => s._id) }, date: date })
      .populate("student_id", "name email");

    res.send(attendance);
  } catch (error) {
    res.send({ message: "Cannot fetch the attendance details" });
  }
});

//display attendance in student interface
router.get("/display-student-attendance", verify, async (req, res) => {
  try {
    const studentId = req.user.id;
    console.log("student id:", studentId);
    const attendance = await attendanceModel.find({ student_id: studentId });
    console.log("attendance:", attendance);
    res.send(attendance);
  } catch (error) {
    res.send({ message: "Cannot fetch your attendance !" });
  }
});

//count the number of days that the student is present
router.get("/display-student-attendance-count",verify,async(req,res)=>{
  try{
    const Id=req.user.id;
  const currentDate=new Date();
  const startOfMonth=new Date(currentDate.getFullYear(),currentDate.getMonth(),1);
  const endOfMonth=new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0);
  const present=await attendanceModel.countDocuments({student_id:Id,date:{$gte:startOfMonth,$lte:endOfMonth},status:1})
  const absent=await attendanceModel.countDocuments({student_id:Id,date:{$gte:startOfMonth,$lte:endOfMonth},status:0})
  res.send({present,absent})
  }catch(error){
    res.send({message:"cannot fetch present/absent details !"});
    console.log("ERROR!",error)
  }
})

module.exports = router;
