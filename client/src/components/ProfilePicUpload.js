import React, { useState, useRef } from 'react';
import './ProfilePicUpload.css'; // Import the CSS file for styling

const ProfilePicUpload = ({ onFileChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    onFileChange(file);

    // Display the selected image
    const reader = new FileReader();
    reader.onload = (e) => {
      imgRef.current.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-pic-upload">
      <label htmlFor="profilePicInput">
        <div className="upload-button">
          {selectedFile ? (
            <img
              ref={imgRef}
              alt="Uploaded Profile Pic"
              className="uploaded-pic"
            />
          ) : (
            'Upload Photo'
          )}
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
