const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const calculateRewards = require('./jobs/calculateRewards');
const updateUserStats = require('./jobs/updateUserStats');
const User = require('./models/user');
const cors = require('cors');

const app = express();
const PORT = 5003;
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  credentials: true,
}));
mongoose.connect('mongodb://admin:admin@localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.json());

app.post('/api/click', async (req, res) => {
  const { userId } = req.body;

  try {
    const rewards = calculateRewards();
    const updatedUser = await updateUserStats(userId, rewards);

    res.json({
      message: 'Click processed successfully',
      updatedUser,
      rewards,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/user', async (req, res) => {
  const user = new User();
  await user.save();
  res.json(user);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));