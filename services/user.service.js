const User = require('../models/User');

async function getAllUsers() {
  const users = await User.find();
  return users.map(user => ({
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  }));
}

async function createUser(name, email) {
  const user = await User.create({ name, email });
  return user;
}

async function getUserById(id) { 
  const user = await User.findById(id);
  console.log("user", user);
  if (!user) {
    throw new Error('User not found');
  }
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    score: user.score,
    createdAt: user.createdAt
  };
}

async function updateUserScore(id, score) {
  try {
    const user = await User.findById(id);
    if (!user) {
      console.warn(`User not found with id: ${id}`);
      return;
    }

    // Initialize score if undefined or null
    if (typeof user.score !== "number") {
      user.score = 0;
    }

    // Update only if the new score is higher
    if (score > user.score) {
      user.score = score;
      await user.save();
      console.log(`✅ Score updated to ${score} for user ${id}`);
    } else {
      console.log(`ℹ️ Score not updated. Current: ${user.score}, New: ${score}`);
    }
  } catch (error) {
    console.error("🛑 Error updating user score:", error);
  }
}


module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserScore
};
