// DiscordLoginButton.js

import React from 'react';
import DiscordLogo from '../images/discord-logo.png'
import './DiscordLoginButton.css'

const DiscordLoginButton = () => {
  const handleLoginClick = async () => {
    try {
      // Redirect the user to the response URL (Discord OAuth2 flow)
      window.location.href = "http://localhost:3001/api/users/auth/discord"; // Assuming your backend sends the Discord OAuth2 authorization URL
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <button className="discord-button" onClick={handleLoginClick}>
      <img src={DiscordLogo} alt="Discord Logo" className="discord-logo" />
      Login with Discord
    </button>
  );
};

export default DiscordLoginButton;
