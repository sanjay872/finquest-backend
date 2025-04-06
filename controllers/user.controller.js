const User = require("../models/User");
const userService = require("../services/user.service");

async function getUsers(req, res) {

  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to get users" });
  }
}

async function addUser(req, res) {
  const { name, email } = req.body;
  try {
    const newUser = await userService.createUser(name, email);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to add user" });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to get user" });
  }
}

async function updateUserScore(req, res) {
  const { id } = req.params;
  const { score } = req.body;
  console.log("id", id);
  console.log("score", score);
  try {
    await userService.updateUserScore(id, score);
    res.status(200).json({ message: "User score updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user score" });
  }
}

async function getLeaderboard(req, res) {
  try {
    const users = await User.find().sort({ score: -1 }).limit(10);
    res.json(users.map(user => ({
      id: user._id,
      name: user.name,
      score: user.score
    })));
  } catch (err) {
    console.error("Error in getLeaderboard:", err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
}


module.exports = {
  getUsers,
  addUser,
  getUserById,
  updateUserScore,
  getLeaderboard,
};
