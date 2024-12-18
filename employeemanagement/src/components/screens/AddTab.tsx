import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Predefined employee data
const predefinedEmployees = [
  {
    employeeId: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "1234567890",
    position: "Software Engineer",
    department: "Engineering",
    startDate: "2018-05-12",
    salary: "80000",
    status: "Active",
    address: "123 Maple street",
    emergencyContact: "9876543210",
    profilePicture: "https://via.placeholder.com/150",
    gender: "Male",
    dateOfBirth: "1990-06-15",
  },
  {
    employeeId: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phoneNumber: "2345678901",
    position: "HR Specialist",
    department: "Human Resources",
    startDate: "2020-08-20",
    salary: "60000",
    status: "Active",
    address: "456 Oak street",
    emergencyContact: "9876543210",
    profilePicture: "https://via.placeholder.com/150",
    gender: "Female",
    dateOfBirth: "1990-03-25",
  },
  {
    employeeId: "3",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    phoneNumber: "3456789012",
    position: "Product Manager",
    department: "Product",
    startDate: "2019-06-10",
    salary: "85000",
    status: "Active",
    address: "789 Pine St",
    emergencyContact: "2345678901",
    profilePicture: "https://via.placeholder.com/150",
    gender: "Male",
    dateOfBirth: "1987-11-12",
  },
  {
    employeeId: "4",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    phoneNumber: "4567890123",
    position: "Marketing Coordinator",
    department: "Marketing",
    startDate: "2022-02-28",
    salary: "55000",
    status: "Active",
    address: "321 Maple Ave",
    emergencyContact: "3456789012",
    profilePicture: "https://via.placeholder.com/150",
    gender: "Female",
    dateOfBirth: "1992-07-15",
  },
  {
    employeeId: "5",
    firstName: "Daniel",
    lastName: "Brown",
    email: "daniel.brown@example.com",
    phoneNumber: "5678901234",
    position: "Sales Executive",
    department: "Sales",
    startDate: "2021-11-05",
    salary: "65000",
    status: "Active",
    address: "654 Birch Rd",
    emergencyContact: "4567890123",
    profilePicture: "https://via.placeholder.com/150",
    gender: "Male",
    dateOfBirth: "1988-09-23",
  },
  {
    employeeId: "6",
    firstName: "Sophia",
    lastName: "Taylor",
    email: "sophia.taylor@example.com",
    phoneNumber: "6789012345",
    position: "Data Analyst",
    department: "Data Science",
    startDate: "2020-04-11",
    salary: "75000",
    status: "Active",
    address: "987 Cedar Ln",
    emergencyContact: "5678901234",
    profilePicture: "https://via.placeholder.com/150",
    gender: "Female",
    dateOfBirth: "1993-02-18",
  },
];

const AddEmployeeTab = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    position: "",
    department: "",
    startDate: "",
    salary: "",
    status: "",
    address: "",
    emergencyContact: "",
    profilePicture: "",
    gender: "",
    dateOfBirth: "",
  });

  const [employeeIdInput, setEmployeeIdInput] = useState("");
  const [error, setError] = useState<any>({});
  const [editMode, setEditMode] = useState(false); // Toggle edit mode
  const [isEmployeeFound, setIsEmployeeFound] = useState(false);

  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeIdInput(e.target.value);
  };

  const handleFindEmployee = () => {
    const employee = predefinedEmployees.find(
      (emp) => emp.employeeId === employeeIdInput
    );

    if (employee) {
      setFormData(employee);
      setError({});
      setIsEmployeeFound(true);
      setEditMode(false);
    } else {
      setError({ employeeId: "Employee not found" });
      setFormData({
        employeeId: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        position: "",
        department: "",
        startDate: "",
        salary: "",
        status: "",
        address: "",
        emergencyContact: "",
        profilePicture: "",
        gender: "",
        dateOfBirth: "",
      });
      setIsEmployeeFound(false);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    validateField(id, value);
  };

  const validateField = (field: string, value: string) => {
    let errorMessage = "";

    switch (field) {
      case "firstName":
      case "lastName":
      case "position":
      case "department":
      case "status":
      case "gender":
        if (value && !/^[A-Za-z\s]+$/.test(value)) {
          errorMessage = `${field} should contain alphabets only.`;
        }
        break;

      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = "Invalid email format.";
        }
        break;

      case "phoneNumber":
      case "salary":
        if (value && !/^\d+$/.test(value)) {
          errorMessage = `${field} should contain numbers only.`;
        }
        break;

      case "startDate":
      case "dateOfBirth":
        if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          errorMessage = `${field} should be in YYYY-MM-DD format.`;
        }
        break;

      case "profilePicture":
        if (value && !/^https?:\/\/.+/.test(value)) {
          errorMessage = "Profile Picture must be a valid URL.";
        }
        break;

      default:
        break;
    }

    setError((prevError: any) => ({
      ...prevError,
      [field]: errorMessage,
    }));
  };

  const handleUpdateEmployee = () => {
    if (Object.values(error).some((err) => err)) {
      alert("Please fix validation errors before updating.");
      return;
    }

    const updatedEmployees = predefinedEmployees.map((employee) =>
      employee.employeeId === formData.employeeId
        ? { ...employee, ...formData }
        : employee
    );

    console.log("Updated Employee Data:", updatedEmployees);
    setEditMode(false); // Exit edit mode after updating
    setIsEmployeeFound(true);
  };

  return (
    <div className="p-0">
      <Card className="max-w-5xl mx-auto h-auto shadow-lg bg-[--sidebar-body] text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Employee Details
          </CardTitle>
          <CardDescription className="text-gray-400">
            View and edit employee details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {/* Employee ID Input */}
              <div>
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={employeeIdInput}
                  onChange={handleEmployeeIdChange}
                  disabled={isEmployeeFound}
                  className="bg-gray-700 text-white"
                />
                <Button
                  onClick={handleFindEmployee}
                  type="button"
                  disabled={isEmployeeFound}
                  className="mt-2 bg-blue-500 text-white"
                >
                  Find Employee
                </Button>
                {error.employeeId && (
                  <p className="text-red-500">{error.employeeId}</p>
                )}
              </div>

              {/* Editable Fields */}
              {Object.keys(formData).map((key) =>
                key !== "employeeId" ? (
                  <div key={key}>
                    <Label htmlFor={key}>
                      {key.replace(/([A-Z])/g, " $1")}
                    </Label>
                    <Input
                      id={key}
                      value={(formData as any)[key]}
                      onChange={handleEditChange}
                      disabled={!editMode}
                      className="bg-gray-700 text-white"
                    />
                    {error[key] && <p className="text-red-500">{error[key]}</p>}
                  </div>
                ) : null
              )}
            </div>

            {/* Action Buttons */}
            {isEmployeeFound && (
              <div className="flex space-x-4 mt-4">
                <Button
                  onClick={() => setEditMode(true)}
                  className="bg-yellow-500 text-white"
                  type="button"
                >
                  Edit
                </Button>
                <Button
                  onClick={handleUpdateEmployee}
                  className="bg-green-500 text-white"
                  type="button"
                >
                  Update
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEmployeeTab;
