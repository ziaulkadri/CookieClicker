import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClickerButton.css';

const ClickerButton = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const createUser = async () => {
      const response = await axios.post('http://0.0.0.0:5003/api/user');
      setUser(response.data);
    };

    createUser();
  }, []);

  const handleClick = async () => {
    if (!user) return;

    const response = await axios.post('http://0.0.0.0:5003/api/click', { userId: user._id });
    setUser(response.data.updatedUser);
    setMessage(`You gained ${response.data.rewards.points} points${response.data.rewards.prize ? ' and won a prize!' : ''}`);
  };

  return (
    <div className="clicker-container">
      <h1>Cookie Clicker</h1>
      <button onClick={handleClick} className="clicker-button">
        Click Me!
      </button>
      {message && <p className="message">{message}</p>}
      {user && (
        <div className="stats">
          <p>Total Score: {user.totalScore}</p>
          <p>Total Prizes: {user.totalPrizes}</p>
          <p>Total Clicks: {user.clicks}</p>
        </div>
      )}
    </div>
  );
};

export default ClickerButton;