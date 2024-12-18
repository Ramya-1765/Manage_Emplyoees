import React, { useEffect, useState } from "react";

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

  // Handle form submission for updating employee
  const handleSubmitUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingEmployee) return;

    fetch(
      `http://localhost:5010/api/employees/${editingEmployee.employee_id}`,
      {
        method: "PUT",
        body: JSON.stringify(editingEmployee),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Employee updated", data);
        setEmployees(
          employees.map((emp) =>
            emp.employee_id === editingEmployee.employee_id ? data : emp
          )
        );
        setEditingEmployee(null);
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Employee Details</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">First Name</th>
              <th className="border px-4 py-2">Last Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Position</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.employee_id} className="text-center">
                <td className="border px-4 py-2">{emp.employee_id}</td>
                <td className="border px-4 py-2">{emp.first_name}</td>
                <td className="border px-4 py-2">{emp.last_name}</td>
                <td className="border px-4 py-2">{emp.email}</td>
                <td className="border px-4 py-2">{emp.position}</td>
                <td className="border px-4 py-2">
                  {/* <button
                    onClick={() => handleUpdateEmployee(emp.employee_id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button> */}
                  <button
                    onClick={() => handleDeleteEmployee(emp.employee_id)}
                    className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingEmployee && (
        <div className="mt-8 p-4 bg-white shadow-lg rounded">
          <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
          <form onSubmit={handleSubmitUpdate}>
            {/* Form fields to edit employee details */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">First Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={editingEmployee.first_name}
                onChange={(e) =>
                  setEditingEmployee({
                    ...editingEmployee,
                    first_name: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Last Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={editingEmployee.last_name}
                onChange={(e) =>
                  setEditingEmployee({
                    ...editingEmployee,
                    last_name: e.target.value,
                  })
                }
              />
            </div>
            {/* Add other fields similarly */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded mt-4"
            >
              Update Employee
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
