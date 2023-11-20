import React from 'react';
import './HoverableHeader.css'; // Import the CSS file for styling
import TransparentLogo from "../images/fuse-logo-trans.png"

const HoverableHeader = () => {
  return (
    <div className="hoverable-header">
      <img src={TransparentLogo} alt="Logo" className="logo" />
      <div className="dropdown">
        <label>Filter by:</label>
        <select>
          <option value="all">All</option>
          <option value="designer">Designer</option>
          <option value="developer">Developer</option>
          <option value="project-manager">Project Manager</option>
          <option value="presenter">Presenter</option>
          <option value="interests">Interests</option>
        </select>
      </div>
      <div className="matches-button">
        <a href="http://localhost:3000/matches">
          <button>Your Matches!</button>
        </a>
      </div>
    </div>
  );
};

export default HoverableHeader;
