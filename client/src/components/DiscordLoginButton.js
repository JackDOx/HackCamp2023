// DiscordLoginButton.js

import React from 'react';
import axios from 'axios';

const DiscordLoginButton = () => {
  const handleLoginClick = async () => {
    try {
      // Make a request to your backend's /login route
      const response = await axios.get('/auth/discord'); // Update with your backend server URL

      // Redirect the user to the response URL (Discord OAuth2 flow)
      window.location.href = response.data.url; // Assuming your backend sends the Discord OAuth2 authorization URL
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <button onClick={handleLoginClick}>
      Login with Discord
    </button>
  );
};

export default DiscordLoginButton;
