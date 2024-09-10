import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Hotels from "./pages/Hotels";
import Navbar from "./components/Navbar";
import UserRoutes from "./protectedRoutes/UserRoutes";
import AdminRoutes from "./protectedRoutes/AdminRoutes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HotelDetails from "./pages/hotelDetails";
import BookingForm from "./pages/BookingForm";
import UserProfile from "./pages/UserProfile";
import ResetPasswordForm from "./pages/ResetPasswordForm";
import RequestOtpForm from "./pages/ResetPasswordOTP";
import MyBookings from "./pages/MyBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminEditHotel from "./pages/admin/AdminEdit";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.isAdmin) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <Router>
      <Navbar isAdmin={isAdmin} />
      <ToastContainer />
      <Routes>

  
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/bookings" element={<BookingForm />} />
        <Route path="/hotel-details/:hotelId" element={<HotelDetails />} />
        <Route path="/reset-password" element = {<ResetPasswordForm/>}/>
        <Route path="/forgot-password" element = {<RequestOtpForm/>}/>
        <Route path="/my-bookings" element={<MyBookings/>} />


        <Route path="/profile" element={<UserProfile />} />

        <Route element={<UserRoutes />}>
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Route>

        {isAdmin && (
          <Route element={<AdminRoutes />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers/>} />
            <Route path="/admin/bookings" element={<AdminBookings/>} />
            <Route path='/admin/edit/:id' element={<AdminEditHotel/>} />
          </Route>
        )}

      </Routes>
    </Router>
  );
}

export default App;
