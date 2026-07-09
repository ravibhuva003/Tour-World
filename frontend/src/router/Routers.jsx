import React from "react";
import {Routes,Route,Navigate} from "react-router-dom";
import Home from './../pages/Home';
import Tours from './../pages/Tours';
import TourDetails from './../pages/TourDetails';
import About from './../pages/About';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from './../pages/SearchResultList';
import ThankYou from "../pages/ThankYou";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import Invoice from "../pages/Invoice";



const Routers = () => {
  return (
   <Routes>
    <Route path="/" element={<Navigate to="/home"/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/tours" element={<Tours/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/tours/search" element={<SearchResultList/>}/>
    <Route path="/tours/:id" element={<TourDetails/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/thank-you" element={<ThankYou/>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/reset-password/:token" element={<ResetPassword/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/invoice" element={<Invoice/>}/>
   </Routes>
  )
}

export default Routers