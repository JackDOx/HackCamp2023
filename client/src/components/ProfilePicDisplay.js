import React from 'react';
import './ProfilePicDisplay.css'; // Import the CSS file for styling

const ProfilePicDisplay = ({ file }) => {
  return (
    <div className="profile-pic-display">
      {file && (
        <img
          src={file}
          alt="Uploaded Profile Pic"
          className="uploaded-pic"
        />
      )}
    </div>
  );
};

export default ProfilePicDisplay;
