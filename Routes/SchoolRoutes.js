const { getSchools, addSchool } = require("../controllers/SchoolController");
const express = require("express");
const router = express.Router();

router.get("/", getSchools);
router.post("/", addSchool);
