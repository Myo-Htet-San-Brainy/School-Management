const db = require("../db/db");
const calculateDistance = require("../utils/calculateDistance");

const getSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  // Convert latitude and longitude to numbers, ensuring they are of correct type
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  // Input validation
  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({
      error: "All fields are required and latitude/longitude must be numbers",
    });
  }

  try {
    // Fetch all schools from the database
    const query = "SELECT * FROM schools";
    const [results] = await db.query(query);

    // Calculate distance from the user to each school and sort by proximity
    const schoolsWithDistance = results.map((school) => {
      const distance = calculateDistance(
        lat,
        lon,
        school.latitude,
        school.longitude
      );
      return { ...school, distance };
    });

    // Sort by distance (ascending)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json(schoolsWithDistance);
  } catch (err) {
    console.error("Error fetching schools:", err);
    res.status(500).json({ error: "Error fetching schools" });
  }
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
