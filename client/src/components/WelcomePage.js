import React from 'react';
import './WelcomePage.css'; // Import the CSS file for styling
import Logo from '../images/logo.png'
import DiscordLoginButton from './DiscordLoginButton';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <img src={Logo} alt="Logo" className="logo" />
      <DiscordLoginButton className="discord-button"/>
    </div>
  );
};

export default WelcomePage;
