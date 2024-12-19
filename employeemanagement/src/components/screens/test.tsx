// import { useState, useEffect } from "react";

// // Define the Employee interface
// interface Employee {
//   employee_id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   position: string;
//   department: string;
//   start_date: string;
//   salary: number;
//   status: string;
//   address: string;
//   emergency_contact: string;
//   profile_picture: string;
//   gender: string;
//   date_of_birth: string;
// }
// import { Trash2 } from "lucide-react";
// import { Button } from "../ui/button";
// function EmployeeList() {
//   const [employees, setEmployees] = useState<Employee[]>([]);

//   // Fetch employees from the backend
//   useEffect(() => {
//     fetch("http://localhost:5010/api/employees")
//       .then((res) => res.json())
//       .then((data) => setEmployees(data))
//       .catch((err) => console.error("Error fetching employees:", err));
//   }, []);

//   // Handle delete employee
//   const handleDeleteEmployee = (employeeId: number) => {
//     fetch(`http://localhost:5010/api/employees/${employeeId}`, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.message);
//         setEmployees(employees.filter((emp) => emp.employee_id !== employeeId));
//       })
//       .catch((error) => console.error("Error deleting employee:", error));
//   };

//   // Handle form submission for adding or updating employee

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Employee ID</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Phone Number</th>
//             <th>Position</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((emp) => (
//             <tr key={emp.employee_id}>
//               <td>{emp.employee_id}</td>
//               <td>{emp.first_name}</td>
//               <td>{emp.last_name}</td>
//               <td>{emp.email}</td>
//               <td>{emp.phone_number}</td>
//               <td>{emp.position}</td>
//               <td>
//                 {/* <button
//                   onClick={() => handleUpdateEmployee(emp.employee_id)}
//                   className="text-white"
//                 >
//                   Edit
//                 </button> */}
//                 <Button
//                   onClick={() => handleDeleteEmployee(emp.employee_id)}
//                   variant="outline"
//                   className="text-white border-none"
//                 >
//                   <Trash2 size={24} color="red" />
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default EmployeeList;
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch employees from the backend
  useEffect(() => {
    fetch("http://localhost:5010/api/employees")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setFilteredEmployees(data);
      })
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  // Handle delete employee
  const handleDeleteEmployee = (employeeId: number) => {
    fetch(`http://localhost:5010/api/employees/${employeeId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        const updatedEmployees = employees.filter(
          (emp) => emp.employee_id !== employeeId
        );
        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees);
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = employees.filter(
      (emp) =>
        emp.first_name.toLowerCase().includes(term) ||
        emp.last_name.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.position.toLowerCase().includes(term)
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle sorting
  const handleSort = (key: keyof Employee) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredEmployees].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredEmployees(sortedData);
  };

  // Calculate pagination details
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const currentData = filteredEmployees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Employee List
      </h1>

      {/* Search Input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="🔎 Search employees..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th
                onClick={() => handleSort("employee_id")}
                className="py-3 px-4 text-left text-gray-700 font-medium cursor-pointer"
              >
                Employee ID{" "}
                {sortConfig?.key === "employee_id" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("first_name")}
                className="py-3 px-4 text-left text-gray-700 font-medium cursor-pointer"
              >
                First Name{" "}
                {sortConfig?.key === "first_name" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("last_name")}
                className="py-3 px-4 text-left text-gray-700 font-medium cursor-pointer"
              >
                Last Name{" "}
                {sortConfig?.key === "last_name" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("email")}
                className="py-3 px-4 text-left text-gray-700 font-medium cursor-pointer"
              >
                Email{" "}
                {sortConfig?.key === "email" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("phone_number")}
                className="py-3 px-4 text-left text-gray-700 font-medium cursor-pointer"
              >
                Phone Number{" "}
                {sortConfig?.key === "phone_number" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("position")}
                className="py-3 px-4 text-left text-gray-700 font-medium cursor-pointer"
              >
                Position{" "}
                {sortConfig?.key === "position" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="py-3 px-4 text-center text-gray-700 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((emp, index) => (
              <tr
                key={emp.employee_id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } border-b hover:bg-gray-200`}
              >
                <td className="py-3 px-4 text-gray-800">{emp.employee_id}</td>
                <td className="py-3 px-4 text-gray-800">{emp.first_name}</td>
                <td className="py-3 px-4 text-gray-800">{emp.last_name}</td>
                <td className="py-3 px-4 text-gray-800">{emp.email}</td>
                <td className="py-3 px-4 text-gray-800">{emp.phone_number}</td>
                <td className="py-3 px-4 text-gray-800">{emp.position}</td>
                <td className="py-3 px-4 text-center">
                  <Button
                    onClick={() => handleDeleteEmployee(emp.employee_id)}
                    variant="outline"
                    className="text-white border-none"
                  >
                    <Trash2 size={20} color="red" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </Button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default EmployeeList;
