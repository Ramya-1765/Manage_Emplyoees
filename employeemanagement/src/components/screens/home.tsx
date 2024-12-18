import React from "react";
import "./Home.css";
import Sidebar from "../defaults/SidebarDefault";
import Header from "../defaults/Header";

const Home: React.FC = () => {
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
          <h1>Hello</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
