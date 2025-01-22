const User = require('../models/user');

const updateUserStats = async (userId, rewards) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.totalScore += rewards.points;
  user.totalPrizes += rewards.prize;
  user.clicks += 1;

  await user.save();
  return user;
};

module.exports = updateUserStats;