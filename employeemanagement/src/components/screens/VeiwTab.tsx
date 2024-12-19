// import React, { useState } from "react";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { Label } from "../ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// // Define the Employee interface
// interface Employee {
//   employee_id: string;
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

// function FindEmployee() {
//   const [employeeId, setEmployeeId] = useState<string>("");
//   const [employeeDetails, setEmployeeDetails] = useState<Employee | null>(null);
//   const [error, setError] = useState<string>("");

//   // Handle the search button click to fetch employee details
//   const handleSearch = () => {
//     if (employeeId.trim() === "") {
//       setError("Please enter an Employee ID");
//       return;
//     }

//     fetch(`http://localhost:5010/api/employees/${employeeId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.error) {
//           setError("Employee not found");
//           setEmployeeDetails(null);
//         } else {
//           setEmployeeDetails(data);
//           setError("");
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching employee:", err);
//         setError("An error occurred while fetching employee details");
//       });
//   };

//   // Handle form field change
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     if (employeeDetails) {
//       setEmployeeDetails((prev) => ({
//         ...prev!,
//         [name]: value,
//       }));
//     }
//   };

//   return (
//     <div>
//       <Card className="max-w-5xl mx-auto h-auto shadow-lg bg-[--sidebar-body] text-white">
//         <CardHeader>
//           <CardTitle className="text-2xl font-semibold">
//             Employee Details
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-row">
//             <Input
//               type="text" // Change to "text" to allow entering employee ID as a string
//               placeholder="Enter Employee ID"
//               className="text-black"
//               value={employeeId}
//               onChange={(e) => setEmployeeId(e.target.value)} // Directly set the employee ID as a string
//             />
//             <Button
//               onClick={handleSearch}
//               variant="outline"
//               className="ml-3 text-black"
//             >
//               Find Employee
//             </Button>
//           </div>

//           {error && <p style={{ color: "red" }}>{error}</p>}

//           {employeeDetails && (
//             <form>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
//                 <div>
//                   <Label htmlFor="employeeId">Employee ID</Label>
//                   <Input
//                     type="text" // Keep the input for employee_id as "text" (disabled)
//                     name="employee_id"
//                     id="employeeId"
//                     className="text-black m-1 p-2 rounded"
//                     value={employeeDetails.employee_id}
//                     onChange={handleChange}
//                     placeholder="Employee ID"
//                     disabled
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="first_name">First Name</Label>
//                   <Input
//                     type="text"
//                     id="first_name"
//                     name="first_name"
//                     className="text-black m-1 p-2 rounded"
//                     value={employeeDetails.first_name}
//                     onChange={handleChange}
//                     placeholder="First Name"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="last_name">Last name</Label>
//                   <Input
//                     type="text"
//                     name="last_name"
//                     id="last_name"
//                     className="text-black m-1 p-2 rounded"
//                     value={employeeDetails.last_name}
//                     onChange={handleChange}
//                     placeholder="First Name"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     type="email"
//                     name="email"
//                     id="email"
//                     className="text-black m-1 p-2 rounded"
//                     value={employeeDetails.email}
//                     onChange={handleChange}
//                     placeholder="Email"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="phone_number">Phone_number</Label>
//                   <Input
//                     type="text"
//                     id="phone_number"
//                     name="phone_number"
//                     className="text-black m-1 p-2 rounded"
//                     value={employeeDetails.phone_number}
//                     onChange={handleChange}
//                     placeholder="Phone Number"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="position">Position</Label>
//                   <Input
//                     type="text"
//                     id="position"
//                     name="position"
//                     className="text-black m-1 p-2 rounded"
//                     value={employeeDetails.position}
//                     onChange={handleChange}
//                     placeholder="Position"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="department">Department</Label>
//                   <Input
//                     type="text"
//                     name="department"
//                     id="department"
//                     className="text-black m-1 p-2 rounded"
//                     value={employeeDetails.department}
//                     onChange={handleChange}
//                     placeholder="Department"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="start_date">Start_date</Label>
//                   <Input
//                     type="date"
//                     name="start_date"
//                     id="start_date"
//                     className="text-black m-1 p-2 rounded"
//                     value={employeeDetails.start_date}
//                     onChange={handleChange}
//                     placeholder="Start Date"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="salary">salary</Label>
//                   <Input
//                     type="number"
//                     name="salary"
//                     id="salary"
//                     className="text-black m-1 p-2 rounded"
//                     value={employeeDetails.salary}
//                     onChange={handleChange}
//                     placeholder="Salary"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="status">Status</Label>
//                   <Input
//                     type="text"
//                     name="status"
//                     id="status"
//                     className="text-black m-1 p-2 rounded"
//                     value={employeeDetails.status}
//                     onChange={handleChange}
//                     placeholder="Status"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="address">Address</Label>
//                   <Input
//                     type="text"
//                     name="address"
//                     id="address"
//                     className="text-black m-1 p-2 rounded"
//                     value={employeeDetails.address}
//                     onChange={handleChange}
//                     placeholder="Address"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="econtact">Emergency contact</Label>
//                   <Input
//                     type="text"
//                     id="econtact"
//                     name="emergency_contact"
//                     className="text-black m-1 p-2 rounded"
//                     value={employeeDetails.emergency_contact}
//                     onChange={handleChange}
//                     placeholder="Emergency Contact"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="Profile">Profile</Label>
//                   <Input
//                     type="text"
//                     id="Profile"
//                     name="profile_picture"
//                     className="text-black m-1 p-2 rounded"
//                     value={employeeDetails.profile_picture}
//                     onChange={handleChange}
//                     placeholder="Profile Picture URL"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="gender">Gender</Label>
//                   <Input
//                     type="text"
//                     id="gender"
//                     name="gender"
//                     className="text-black m-1 p-2 rounded"
//                     value={employeeDetails.gender}
//                     onChange={handleChange}
//                     placeholder="Gender"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="employeeId">Employee ID</Label>
//                   <Input
//                     type="date"
//                     id="first_name"
//                     name="date_of_birth"
//                     className="text-black m-1 p-2 rounded"
//                     value={employeeDetails.date_of_birth}
//                     onChange={handleChange}
//                     placeholder="Date of Birth"
//                   />
//                 </div>
//               </div>
//             </form>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default FindEmployee;
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FilePenLine } from "lucide-react";
import { Save } from "lucide-react";
// Define the Employee interface
interface Employee {
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  position: string;
  department: string;
  start_date: string;
  salary: number | string;
  status: string;
  address: string;
  emergency_contact: string;
  profile_picture: string;
  gender: string;
  date_of_birth: string;
}

function FindEmployee() {
  const [employeeId, setEmployeeId] = useState<string>("");
  const [employeeDetails, setEmployeeDetails] = useState<Employee>({
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    position: "",
    department: "",
    start_date: "",
    salary: "",
    status: "",
    address: "",
    emergency_contact: "",
    profile_picture: "",
    gender: "",
    date_of_birth: "",
  });
  const [error, setError] = useState<string>("");
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  // Handle the search button click to fetch employee details
  const handleSearch = () => {
    if (employeeId.trim() === "") {
      setError("Please enter an Employee ID");
      return;
    }

    fetch(`http://localhost:5010/api/employees/${employeeId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError("Employee not found");
          setEmployeeDetails({
            employee_id: "",
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            position: "",
            department: "",
            start_date: "",
            salary: "",
            status: "",
            address: "",
            emergency_contact: "",
            profile_picture: "",
            gender: "",
            date_of_birth: "",
          });
        } else {
          setEmployeeDetails(data);
          setError("");
          setMsg("");
          setIsEditable(false);
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
    setEmployeeDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save button click to update employee details
  const handleSave = () => {
    fetch(
      `http://localhost:5010/api/employees/${employeeDetails.employee_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeDetails),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError("Error updating employee details");
        } else {
          setEmployeeDetails(data);
          setError("");
          setIsEditable(false);
          console.log("Employee details updated successfully!");
          setMsg("Employee details updated successfully!");
        }
      })
      .catch((err) => {
        console.error("Error updating employee:", err);
        setError("An error occurred while updating employee details");
      });
  };

  return (
    <div>
      <Card className="max-w-5xl mx-auto h-auto shadow-lg bg-[--sidebar-body] text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Add Employee Details
          </CardTitle>
          <CardDescription className="text-gray-400">
            Add employee details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row">
            <Input
              type="text"
              placeholder="Enter Employee ID"
              className="text-black"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              className="ml-3 text-white bg-blue-500"
            >
              Find Employee
            </Button>
            <div className="flex justify-end ml-3">
              {!isEditable ? (
                <Button
                  onClick={() => setIsEditable(true)}
                  className="bg-yellow-500 text-white"
                >
                  <FilePenLine size={50} color="white" className="p-0" /> Edit
                </Button>
              ) : (
                <Button
                  onClick={handleSave}
                  className="bg-green-500 text-white"
                >
                  <Save size={50} color="white" className="p-0" /> Save
                </Button>
              )}
            </div>
          </div>
          {msg && <p className="text-[15px] p-1 text-green-400">{msg}</p>}
          {error && <p className="text-[15px] p-1 text-red-600">{error}</p>}

          <form>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {Object.entries(employeeDetails).map(([key, value]) => (
                <div key={key}>
                  <Label htmlFor={key}>
                    {key
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Label>
                  <Input
                    type={
                      key === "start_date" || key === "date_of_birth"
                        ? "date"
                        : "text"
                    }
                    id={key}
                    name={key}
                    className="bg-gray-900 text-white"
                    value={value}
                    onChange={handleChange}
                    placeholder={key.replace(/_/g, " ")}
                    disabled={!isEditable || key === "employee_id"}
                  />
                </div>
              ))}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default FindEmployee;
