import React from "react";
import "@/components/screens/Home.css";
import Sidebar from "./SidebarDefault";
import Header from "./Header";
import EmployeeList from "../screens/test";

const AddEmployee: React.FC = () => {
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
          <EmployeeList />
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
