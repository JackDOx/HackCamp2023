// ProfilePicUpload.js

import React, { useState } from 'react';
import './ProfilePicUpload.css'; // Import the CSS file for styling

const ProfilePicUpload = ({ onFileChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    onFileChange(file);
  };

  return (
    <div className="profile-pic-upload">
      <label htmlFor="profilePicInput">
        <div className="upload-button">
          Upload Photo
        </div>
        <input
          type="file"
          id="profilePicInput"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ProfilePicUpload;
