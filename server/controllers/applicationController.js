// database
const pool = require("../database/database");

// add application
exports.addApplication = async (req, res) => {
  try {
    const { company_name, job_title, date_applied, status, notes } = req.body;

    // Convert date_applied to a correct format if needed
    let formattedDate = new Date(date_applied).toISOString().split("T")[0];

    const newApplication = await pool.query(
      "INSERT INTO applications (company_name, job_title, date_applied, status, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [company_name, job_title, formattedDate, status, notes]
    );
    res.json(newApplication.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

// get all application
exports.getAllplication = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM applications");
    res.json(response.rows);
  } catch (err) {
    console.error(err.message);
  }
};

// update an application
exports.updateApplication = async (req, res) => {
  const { id } = req.params;
  const updates = [];
  const values = [];

  // Build the SQL query dynamically
  let query = "UPDATE applications SET ";

  if (req.body.company_name) {
    updates.push(`company_name = $${updates.length + 1}`);
    values.push(req.body.company_name);
  }
  if (req.body.job_title) {
    updates.push(`job_title = $${updates.length + 1}`);
    values.push(req.body.job_title);
  }
  if (req.body.date_applied) {
    updates.push(`date_applied = $${updates.length + 1}`);
    values.push(req.body.date_applied);
  }
  if (req.body.status) {
    updates.push(`status = $${updates.length + 1}`);
    values.push(req.body.status);
  }
  if (req.body.notes) {
    updates.push(`notes = $${updates.length + 1}`);
    values.push(req.body.notes);
  }

  if (updates.length === 0) {
    return res.status(400).send("No fields to update.");
  }

  // Join the updates into a single string
  query += updates.join(", ") + ` WHERE id = $${values.length + 1}`;
  values.push(id); // Add the id as the last value for the WHERE clause

  try {
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).send("Application not found.");
    }
    res.send({ message: "Updated successfully", updates });
  } catch (err) {
    console.error(err.message);
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteApplication = await pool.query(
      "DELETE FROM applications WHERE id = $1",
      [id]
    );
    res.json("Application Deleted!");
  } catch (err) {
    console.error(err.message);
  }
};
