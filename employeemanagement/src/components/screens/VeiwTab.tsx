import React, { useState } from "react";

// Define the Employee interface
interface Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  position: string;
  department: string;
  start_date: string;
  salary: number;
  status: string;
  address: string;
  emergency_contact: string;
  profile_picture: string;
  gender: string;
  date_of_birth: string;
}

function FindEmployee() {
  const [employeeId, setEmployeeId] = useState<number>(0);
  const [employeeDetails, setEmployeeDetails] = useState<Employee | null>(null);
  const [error, setError] = useState<string>("");

  // Handle the search button click to fetch employee details
  const handleSearch = () => {
    fetch(`http://localhost:5010/api/employees/${employeeId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError("Employee not found");
          setEmployeeDetails(null);
        } else {
          setEmployeeDetails(data);
          setError("");
        }
      })
      .catch((err) => {
        console.error("Error fetching employee:", err);
        setError("An error occurred while fetching employee details");
      });
  };

  // Handle form field change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (employeeDetails) {
      setEmployeeDetails((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <h1>Find Employee by ID</h1>
      <div>
        <input
          type="number"
          placeholder="Enter Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(Number(e.target.value))}
        />
        <button onClick={handleSearch}>Find Employee</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {employeeDetails && (
        <form>
          <input
            type="number"
            name="employee_id"
            value={employeeDetails.employee_id}
            onChange={handleChange}
            placeholder="Employee ID"
            disabled
          />
          <input
            type="text"
            name="first_name"
            value={employeeDetails.first_name}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="last_name"
            value={employeeDetails.last_name}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            type="email"
            name="email"
            value={employeeDetails.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="phone_number"
            value={employeeDetails.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <input
            type="text"
            name="position"
            value={employeeDetails.position}
            onChange={handleChange}
            placeholder="Position"
          />
          <input
            type="text"
            name="department"
            value={employeeDetails.department}
            onChange={handleChange}
            placeholder="Department"
          />
          <input
            type="date"
            name="start_date"
            value={employeeDetails.start_date}
            onChange={handleChange}
            placeholder="Start Date"
          />
          <input
            type="number"
            name="salary"
            value={employeeDetails.salary}
            onChange={handleChange}
            placeholder="Salary"
          />
          <input
            type="text"
            name="status"
            value={employeeDetails.status}
            onChange={handleChange}
            placeholder="Status"
          />
          <input
            type="text"
            name="address"
            value={employeeDetails.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="emergency_contact"
            value={employeeDetails.emergency_contact}
            onChange={handleChange}
            placeholder="Emergency Contact"
          />
          <input
            type="text"
            name="profile_picture"
            value={employeeDetails.profile_picture}
            onChange={handleChange}
            placeholder="Profile Picture URL"
          />
          <input
            type="text"
            name="gender"
            value={employeeDetails.gender}
            onChange={handleChange}
            placeholder="Gender"
          />
          <input
            type="date"
            name="date_of_birth"
            value={employeeDetails.date_of_birth}
            onChange={handleChange}
            placeholder="Date of Birth"
          />
        </form>
      )}
    </div>
  );
}

export default FindEmployee;
