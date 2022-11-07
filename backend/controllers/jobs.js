const getAllJobs = async (req, res) => {
  res.send("Get all Jobs");
};

const getJob = async (req, res) => {
  res.send("Get one by one Job by id");
};

const createJob = async (req, res) => {
  res.send("Login User");
};
const updateJob = async (req, res) => {
  res.send("Login User");
};
const deleteJob = async (req, res) => {
  res.send("Login User");
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
