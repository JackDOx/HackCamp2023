import React from 'react';
import './UserProfile.css'; // Reuse the same CSS if it's suitable

function RecommendedProfile(props) {
  // Assume props contain the data received from the backend
  const { name, pronouns, skillLevel, interests, preferredRole, lookingForTeammates } = props.data;

  return (
    <div className="user-profile-card">
      <form>
        {/* Display each piece of information in a similar layout to UserProfile */}
        <div className="flex-container">
          <label>Name:</label>
          <span>{name}</span>
        </div>

        <div className="flex-container">
          <label>Pronouns:</label>
          <span>{pronouns}</span>
        </div>

        <div className="flex-container">
          <label>Skill Level:</label>
          <span>{skillLevel}</span>
        </div>

        <label>Interests / Project Vision:</label>
        <p>{interests}</p>

        <div className="flex-container">
          <label>Preferred Role:</label>
          <span>{preferredRole}</span>
        </div>

        <div className="flex-container">
          <label>Looking for Teammates?</label>
          <span>{lookingForTeammates ? 'Yes' : 'No'}</span>
        </div>

        {/* You can add more fields as per your requirement */}
      </form>
    </div>
  );
};

export default RecommendedProfile;
