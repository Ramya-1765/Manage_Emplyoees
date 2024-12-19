import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const menuItems = [
    { name: "Add Employee", path: "/details" },
    { name: "Employee Database", path: "/add" },
    { name: "View/update Employee", path: "/dashboard" },
  ];

  return (
    <div className="sidebar-container">
      {/* Sidebar Header */}
      <div className="sidebar-header text-[#fff] text-[20px]">
        <strong>Employee Management</strong>
      </div>

      {/* Sidebar Content */}
      <div className="sidebar-content">
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="sidebar-item">
              <Link to={item.path} className="sidebar-link">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">&copy; 2024 Employee Management</div>
    </div>
  );
};

export default Sidebar;
