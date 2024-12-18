import React from "react";
import "@/components/screens/Home.css";
import Sidebar from "./SidebarDefault";
import Header from "./Header";
import FindEmployee from "../screens/VeiwTab";

const Dashboard: React.FC = () => {
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
          <FindEmployee />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
