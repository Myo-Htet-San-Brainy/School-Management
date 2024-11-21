const db = require("../db/db");

const getSchools = (req, res) => {
  res.send("schools");
};

const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Convert latitude and longitude to numbers, ensuring they are of correct type
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  // Input validation
  if (!name || !address || isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({
      error: "All fields are required and latitude/longitude must be numbers",
    });
  }

  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

  try {
    const [result] = await db.query(query, [name, address, lat, lon]);
    return res.status(201).json({
      message: "School added successfully",
      schoolId: result.insertId,
    });
  } catch (err) {
    console.log("Error when inserting a school:", err);
    return res.status(500).json({ error: "Error inserting data" });
  }
};

module.exports = {
  getSchools,
  addSchool,
};
