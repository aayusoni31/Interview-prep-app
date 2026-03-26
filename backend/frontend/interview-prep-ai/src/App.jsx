import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import Login from "./pages/Auth/Login";
// import SignUp from "./pages/Auth/SignUp";
import LandingPage from "./pages/LandingPage";
import DashBoard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* default route  */}
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </div>
  );
};

export default App;
