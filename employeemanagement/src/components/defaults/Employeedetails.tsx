import React from "react";
import "@/components/screens/Home.css";
import Sidebar from "./SidebarDefault";
import Header from "./Header";
import AddTab from "../screens/AddTab";
import AddEmployeeTab from "../screens/AddTab";

const Employeedetails: React.FC = () => {
  return (
    <div className="home-container">
      <div className="flex-l">
        <Sidebar />
      </div>
      <div className="flex-r">
        <div className="flex-r-t">
          <Header />
        </div>
        <div className="flex-r-btm p-3">
          <AddEmployeeTab />
        </div>
      </div>
    </div>
  );
};

export default Employeedetails;
