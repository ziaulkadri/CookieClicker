const calculateRewards = () => {
  const isTenPoints = Math.random() < 0.5; // 50% chance for 10 points
  const isPrize = Math.random() < 0.25; // 25% chance for a prize
  return {
    points: isTenPoints ? 10 : 1,
    prize: isPrize ? 1 : 0,
  };
};

module.exports = calculateRewards;