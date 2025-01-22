const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  totalScore: { type: Number, default: 0 },
  totalPrizes: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);