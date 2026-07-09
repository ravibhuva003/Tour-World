import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import { motion } from "framer-motion";

export const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };



  const handleClick = async (e) => {
    e.preventDefault();


    // Auto-generate username from email if not provided
    const payload = { ...credentials };
    if (!payload.username && payload.email) {
      payload.username = payload.email.split('@')[0];
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }
      
      alert(result.message || "Registration successful!");
      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };


  return (
    <div className="login__page">
      <motion.div 
        className="login__wrapper"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side: Illustration and stylized layout */}
        <div className="login__left">

          
          <motion.div 
            className="login__illustration"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <img src={registerImg} alt="register illustration" />
          </motion.div>




        </div>

        {/* Right Side: The White Form Card */}
        <div className="login__right flex items-center justify-center p-8 w-full md:w-[400px]">
          <motion.div 
            className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 w-full flex flex-col justify-center"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-[1.8rem] font-bold text-heading mb-1">Join Us...</h2>
                <p className="text-bodytext text-[0.9rem] mb-6">Please fill details to create an account</p>

                <form onSubmit={handleClick} className="flex flex-col gap-4">

                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      placeholder="user@gmail.com"
                      required
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-primary transition-colors text-[0.95rem]"
                    />
                    <i className="ri-at-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[1.1rem]"></i>
                  </div>

                  <div className="relative">
                    <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                      placeholder="Password"
                      required
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-primary transition-colors text-[0.95rem]"
                    />
                    <i 
                  className={`ri-eye${showPassword ? '-line' : '-off-line'} absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[1.1rem] cursor-pointer`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
                  </div>





                  <div className="flex justify-center mt-2">
                    <motion.button 
                      whileHover={{ scale: 1.03, y: -2 }} 
                      whileTap={{ scale: 0.97 }}
                      className="w-full justify-center bg-gradient-to-r from-primary to-secondary text-white font-medium px-6 py-3 rounded-xl flex items-center gap-2 shadow-[0_4px_15px_rgba(247,92,3,0.3)] hover:shadow-[0_6px_20px_rgba(247,92,3,0.4)] transition-all" 
                      type="submit"
                    >
                      Create Account <i className="ri-arrow-right-line text-lg"></i>
                    </motion.button>
                  </div>
                </form>
                
                <div className="text-center text-[0.85rem] text-gray-500 mt-8">
                  Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
                </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;