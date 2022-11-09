const getAllJobs = async (req, res) => {
  res.send("Get all Jobs");
};

const getJob = async (req, res) => {
  res.send("Get one by one Job by id");
};

const createJob = async (req, res) => {
  res.json(req.user);
};
const updateJob = async (req, res) => {
  res.send("Update Job");
};
const deleteJob = async (req, res) => {
  res.send("Delete Job");
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
