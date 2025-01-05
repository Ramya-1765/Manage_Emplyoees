import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";

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

const AddEmployeeTab = () => {
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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string | number) => {
    let error = "";
    switch (name) {
      case "employee_id":
        if (!value || isNaN(Number(value)))
          error = "Employee ID must be a number.";
        break;

      case "address":
        if (!value) error = "Address is required.";
        break;
      case "first_name":
      case "last_name":
      case "gender":
      case "status":
      case "department":
        if (!value || !/^[A-Za-z]+$/.test(value as string))
          error = `${name.replace("_", " ")} must contain only alphabets.`;
        break;
      case "email":
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string))
          error = "Invalid email format.";
        break;
      case "phone_number":
      case "emergency_contact":
        if (!value || !/^\d{10}$/.test(value as string))
          error = `${name.replace("_", " ")} must be a 10-digit number.`;
        break;
      case "position":
        if (!value || !/^[A-Za-z\s-]+$/.test(value as string))
          error = "Position can include alphabets and spaces.";
        break;
      case "profile_picture":
        if (!value) error = "Required field.";
        break;
      case "start_date":
      case "date_of_birth":
        if (!value) error = "Invalid date format (YYYY-MM-DD).";
        break;
      case "salary":
        if (!value || isNaN(Number(value))) error = "Salary must be a number.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Validate all fields before submission
    Object.keys(form).forEach((key) =>
      validateField(key, form[key as keyof Employee])
    );
    if (Object.values(errors).some((err) => err)) return; // Prevent submission if errors exist

    const method = "POST";
    const response = await fetch("http://localhost:5010/api/employees", {
      method,
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data) {
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
      setErrors({});
    }
  };

  return (
    <div className="p-0">
      <Card className="max-w-5xl mx-auto h-auto shadow-lg bg-[--sidebar-body] text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            View Employee Details
          </CardTitle>
          <CardDescription className="text-gray-400">
            View and edit employee details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {Object.keys(form).map((field) => (
                <div key={field}>
                  <Label htmlFor={field}>{field.replace("_", " ")}</Label>
                  <Input
                    type={
                      field === "email"
                        ? "email"
                        : field.includes("date")
                        ? "date"
                        : typeof form[field as keyof Employee] === "number"
                        ? "number"
                        : "text"
                    }
                    id={field}
                    name={field}
                    value={form[field as keyof Employee]}
                    onChange={handleChange}
                    placeholder={field.replace("_", " ")}
                    className="bg-gray-900 text-white"
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-sm">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>
            <br />
            <Button
              type="submit"
              className="text-white bg-blue-500 "
              variant="default"
            >
              Add Employee
            </Button>
            <h1>hello</h1>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEmployeeTab;
