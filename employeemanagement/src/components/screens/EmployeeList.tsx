import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch employee data from the backend
    axios
      .get("http://localhost:5010/employees") // Backend API URL
      .then((response) => {
        setEmployees(response.data); // Update state with employee data
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
        setLoading(false); // Handle error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.employeeId}>
            {employee.firstName} {employee.lastName} - {employee.position}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
