const getSchools = (req, res) => {
  res.send("schools");
};

const addSchool = (req, res) => {
  res.send("school added");
};

module.exports = {
  getSchools,
  addSchool,
};
