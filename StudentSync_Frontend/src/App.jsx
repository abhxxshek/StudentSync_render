import React from 'react'
import './App.css'
import Header from './components/Header'
import Login from './components/Login'
import AddStaff from './components/AddStaff'
import AddStudent from './components/AddStudent'
import { Route, Routes } from 'react-router-dom'
import ViewStaff from './components/ViewStaff'
import ViewStudent from './components/ViewStudent'
import AddClass from './components/AddClass'
import Layout from './components/Layout'
import AddClassForm from './components/AddClassForm'
import AddVideos from './components/AddVideos'
import ViewVideos from './components/ViewVideos'
import Attendance from './components/Attendance'
import ViewAttendance from './components/ViewAttendance'
import ViewStudentAttendance from './components/ViewStudentAttendance'
import StudentChat from './components/StudentChat'
import StaffChat from './components/StaffChat'
import Marks from './components/Marks'
import AddMarks from './components/AddMarks'
import ViewMarks from './components/ViewMarks'
import ViewMarksStudent from './components/ViewMarksStudent'
import EditMarks from './components/EditMarks'
import PrivateRoutes from './components/PrivateRoutes'
import AdminAnnouncement from './components/AdminAnnouncement'
import StaffAnnouncement from './components/StaffAnnouncement'
import AdminHome from './components/AdminHome'
import StaffHome from './components/StaffHome'
import StudentHome from './components/StudentHome'
import Payment from './Payment'



const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route element={<PrivateRoutes/>}>
        <Route path='/addStaff' element={<Layout child={<AddStaff/>}/>}></Route>
        <Route path='/viewStaff' element={<Layout child={<ViewStaff/>}/>}></Route>
        <Route path='/addStudent' element={<Layout child={<AddStudent/>}/>}></Route>
        <Route path='/viewStudent' element={<Layout child={<ViewStudent/>}/>}></Route>
        <Route path='/class' element={<Layout child={<AddClass/>}/>}></Route>
        <Route path='/AddClassform' element={<AddClassForm/>}></Route>
        <Route path='/addVideos' element={<Layout child={<AddVideos/>}/>}></Route>
        <Route path='/viewVideos' element={<Layout child={<ViewVideos/>}/>}></Route>
        <Route path='/markAttendance' element={<Layout child={<Attendance/>}/>}></Route>
        <Route path='/viewAttendance' element={<Layout child={<ViewAttendance/>}/>}></Route>
        <Route path='/viewStudentAttendance' element={<Layout child={<ViewStudentAttendance/>}/>}></Route>
        <Route path='/studentChat' element={<Layout child={<StudentChat/>}/>}></Route>
        <Route path='/staffChat' element={<Layout child={<StaffChat/>}/>}></Route>
        <Route path='/marks' element={<Layout child={<Marks/>}/>}></Route>
        <Route path='/addMarks' element={<Layout child={<AddMarks/>}/>}></Route>\
        <Route path='/viewMarks' element={<Layout child={<ViewMarks/>}/>}></Route>
        <Route path='/viewMarksStudent' element={<Layout child={<ViewMarksStudent/>}/>}></Route>
        <Route path='/editMarks' element={<Layout child={<EditMarks/>}/>}></Route>
        <Route path='/adminAnnouncements' element={<Layout child={<AdminAnnouncement/>}/>}></Route>
        <Route path='/staffAnnouncements' element={<Layout child={<StaffAnnouncement/>}/>}></Route>
        <Route path='/adminHome' element={<Layout child={<AdminHome/>}/>}></Route>
        <Route path='/staffHome' element={<Layout child={<StaffHome/>}/>}></Route>
        <Route path='/studentHome' element={<Layout child={<StudentHome/>}/>}></Route>
        <Route path='/payment' element={<Layout child={<Payment/>}/>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App