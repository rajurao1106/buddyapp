const Task = require("../models/schema.cjs"); // Import the Message model

// Controller to create a new message
const allTasks = async (req, res) => {
  try {
    const data = await Task.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
};

module.exports = { allTasks };
