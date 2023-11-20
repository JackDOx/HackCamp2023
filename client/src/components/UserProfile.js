import React, { useState, useRef } from 'react';
import ProfilePicUpload from './ProfilePicUpload';
import './UserProfile.css';
import Select from './Select';
import Header from './components/Header'
import axios from 'axios';

function UserProfile() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSelectSkill = (value) => {
    setSelectedSkill(value);
  };
  
  const handleSelectRole = (value) => {
    setSelectedRole(value);
  };

  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [pronouns, setPronouns] = useState('');
  const [interests, setInterests] = useState('');
  const [lookingForTeammates, setLookingForTeammates] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  const handleFileChange = (file) => {
    setProfilePic(file);

    const reader = new FileReader();
    reader.onload = () => {
      setProfilePicPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Refs for form elements
  const nameRef = useRef();
  const pronounsRef = useRef();
  const interestsRef = useRef();
  const lookingForTeammatesRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collect values from inputs
    const formData = {
      ProfilePic: profilePic,
      Name: nameRef.current.value,
      Pronouns: pronounsRef.current.value,
      SkillLevel: selectedSkill, // Assuming 'selected' holds the value from the Select component
      InterestsProjectVision: interestsRef.current.value,
      PreferredRole: selectedRole,
      LookingForTeammates: lookingForTeammatesRef.current.checked,
    };

    console.log(formData);

    // URL of your backend endpoint
    const endpoint = 'https://localhost:3000/api/users/updateProfile';

    // Sending a POST request with Axios
    axios.post(endpoint, formData)
      .then(response => {
        console.log('Data successfully sent to the server:', response.data);
        // Handle successful submission here (e.g., showing a success message)
      })
      .catch(error => {
        console.error('There was an error sending the data:', error);
        // Handle errors here (e.g., showing an error message)
      });
  };

  return (
    <div className="user-profile-card">
      <form>
        <ProfilePicUpload onFileChange={handleFileChange} />

        <div className="flex-container">
          <label htmlFor="name">Name</label>
          <input
            ref={nameRef}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex-container">
          <label htmlFor="pronouns">Pronouns</label>
          <input
            ref={pronounsRef}
            type="text"
            id="pronouns"
            value={pronouns}
            onChange={(e) => setPronouns(e.target.value)}
          />
        </div>

        <div className="flex-container">
          <Select
            options={['Beginner', 'Intermediate', 'Advanced']}
            prompt="Skill Level"
            selectedOption={selectedSkill}
            onChange={handleSelectSkill}
          />
        </div>

        <label htmlFor="interests">Interests / Project Vision</label>
        <textarea
          ref={interestsRef}
          id="interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />

        <div className="flex-container">
          <Select
            options={['Project Manager', 'Designer', 'Developer', 'Presenter']}
            prompt="Preferred Role"
            selectedOption={selectedRole}
            onChange={handleSelectRole}
          />
        </div>

        <div className="flex-container">
          <label htmlFor="lookingForTeammates">Looking for Teammates?</label>
          <input
            ref={lookingForTeammatesRef}
            type="checkbox"
            id="lookingForTeammates"
            checked={lookingForTeammates}
            onChange={() => setLookingForTeammates(!lookingForTeammates)}
          />
        </div>

        <button type="button" onClick={handleSubmit}>Save Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
