import React, { useState, useEffect } from "react";

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

function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [form, setForm] = useState<Employee>({
    employee_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    position: "",
    department: "",
    start_date: "",
    salary: 0,
    status: "",
    address: "",
    emergency_contact: "",
    profile_picture: "",
    gender: "",
    date_of_birth: "",
  });

  // Fetch employees from the backend
  useEffect(() => {
    fetch("http://localhost:5010/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  // Handle update employee
  const handleUpdateEmployee = (employeeId: number) => {
    const updatedEmployee = employees.find(
      (emp) => emp.employee_id === employeeId
    );
    if (updatedEmployee) {
      setEditingEmployee(updatedEmployee);
      setForm(updatedEmployee); // Set form to current employee data for editing
    }
  };

  // Handle delete employee
  const handleDeleteEmployee = (employeeId: number) => {
    fetch(`http://localhost:5010/api/employees/${employeeId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setEmployees(employees.filter((emp) => emp.employee_id !== employeeId));
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  // Handle form submission for adding or updating employee
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const method = editingEmployee ? "PUT" : "POST";
    const url = editingEmployee
      ? `http://localhost:5010/api/employees/${editingEmployee.employee_id}`
      : "http://localhost:5010/api/employees";

    const response = await fetch(url, {
      method,
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data) {
      setEmployees((prev) =>
        editingEmployee
          ? prev.map((emp) =>
              emp.employee_id === editingEmployee.employee_id ? data : emp
            )
          : [...prev, data]
      );
      setEditingEmployee(null);
      setForm({
        employee_id: 0,
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        position: "",
        department: "",
        start_date: "",
        salary: 0,
        status: "",
        address: "",
        emergency_contact: "",
        profile_picture: "",
        gender: "",
        date_of_birth: "",
      });
    }
  };

  // Handle form field change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          className="text-white m-1 p-2 rounded"
          name="employee_id"
          value={form.employee_id}
          onChange={handleChange}
          placeholder="Employee ID"
        />
        <input
          type="text"
          className="text-white m-1 p-2 rounded"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          className="text-white m-1 p-2 rounded"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          className="text-white m-1 p-2 rounded"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          className="text-white m-1 p-2 rounded"
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          type="text"
          className="text-white m-1 p-2 rounded"
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Position"
        />
        <input
          type="text"
          className="text-white m-1 p-2 rounded"
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department"
        />
        <input
          type="date"
          className="text-white m-1 p-2 rounded"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          placeholder="Start Date"
        />
        <input
          type="number"
          className="text-white m-1 p-2 rounded"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
        />
        <input
          type="text"
          className="text-white m-1 p-2 rounded"
          name="status"
          value={form.status}
          onChange={handleChange}
          placeholder="Status"
        />
        <input
          type="text"
          className="text-white m-1 p-2 rounded"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          className="text-white m-1 p-2 rounded"
          name="emergency_contact"
          value={form.emergency_contact}
          onChange={handleChange}
          placeholder="Emergency Contact"
        />
        <input
          type="text"
          className="text-white m-1 p-2 rounded"
          name="profile_picture"
          value={form.profile_picture}
          onChange={handleChange}
          placeholder="Profile Picture URL"
        />
        <input
          type="text"
          className="text-white m-1 p-2 rounded"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          placeholder="Gender"
        />
        <input
          type="date"
          className="text-white m-1 p-2 rounded"
          name="date_of_birth"
          value={form.date_of_birth}
          onChange={handleChange}
          placeholder="Date of Birth"
        />
        <br />
        <button type="submit" className="text-white">
          {editingEmployee ? "Update" : "Add"} Employee
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.employee_id}>
              <td>{emp.employee_id}</td>
              <td>{emp.first_name}</td>
              <td>{emp.last_name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone_number}</td>
              <td>{emp.position}</td>
              <td>
                <button
                  onClick={() => handleUpdateEmployee(emp.employee_id)}
                  className="text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEmployee(emp.employee_id)}
                  className="text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
