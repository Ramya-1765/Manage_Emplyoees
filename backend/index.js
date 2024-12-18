import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;

// Create Express app
const app = express();
const port = 5010;

// Enable CORS
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Create PostgreSQL pool
const pool = new Pool({
  user: "postgres", // replace with your PostgreSQL username
  host: "localhost",
  database: "EmployeeManagement", // replace with your PostgreSQL database name
  password: "1765",
  port: 5432,
});

pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database:", err);
  });

// API route to fetch all employees from the database
app.get("/api/employees", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employeesManage");
    res.json(result.rows); // send employee data as JSON response
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// API route to fetch a single employee by employee_id
app.get("/api/employees/:employee_id", async (req, res) => {
  const { employee_id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM employeesManage WHERE employee_id = $1",
      [employee_id]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]); // send employee data as JSON response
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (err) {
    console.error("Error fetching employee data:", err);
    res.status(500).json({ error: "Error fetching employee data" });
  }
});

// API route to update employee details
app.put("/api/employees/:employee_id", async (req, res) => {
  const { employee_id } = req.params;
  const {
    first_name,
    last_name,
    email,
    phone_number,
    position,
    department,
    start_date,
    salary,
    status,
    address,
    emergency_contact,
    profile_picture,
    gender,
    date_of_birth,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE employeesManage
       SET first_name = $1, last_name = $2, email = $3, phone_number = $4, position = $5, department = $6, start_date = $7,
           salary = $8, status = $9, address = $10, emergency_contact = $11, profile_picture = $12, gender = $13, date_of_birth = $14
       WHERE employee_id = $15
       RETURNING *`,
      [
        first_name,
        last_name,
        email,
        phone_number,
        position,
        department,
        start_date,
        salary,
        status,
        address,
        emergency_contact,
        profile_picture,
        gender,
        date_of_birth,
        employee_id,
      ]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Error updating employee data" });
  }
});

// API route to delete an employee
app.delete("/api/employees/:employee_id", async (req, res) => {
  const { employee_id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM employeesManage WHERE employee_id = $1 RETURNING *",
      [employee_id]
    );

    if (result.rows.length > 0) {
      res.json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: "Error deleting employee data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
