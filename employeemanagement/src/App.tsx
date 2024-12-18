import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/screens/login"; // Import your LoginPage component
import HomePage from "./components/screens/home"; // Import your HomePage component
import Dashboard from "./components/defaults/Dashboard";
import Employeedetails from "./components/defaults/Employeedetails";
import AddEmployee from "./components/defaults/AddEmployee";
import Test from "./components/screens/test";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<LoginPage />} /> {/* Home Route */}
        <Route path="/home" element={<HomePage />} /> {/* Home Page Route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/details" element={<Employeedetails />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default App;
