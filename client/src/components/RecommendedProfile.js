import React from 'react';
import './UserProfile.css'; // Reuse the same CSS if it's suitable
import { useEffect } from 'react';

function RecommendedProfile() {
  // const props = axios.get('http://localhost:3001/api/users/recommendations');
  // // Assume props contain the data received from the backend
  // const { name, pronouns, skillLevel, interests, preferredRole, lookingForTeammates } = props.users;
 
  const name = ""
  const pronouns = "";
  const skillLevel = "";
  const interests = ""; 
  const preferredRole = "";
  const lookingForTeammates = "";

  useEffect(() => {
    fetch('http://localhost:3001/api/users/recommendations')
      .then(response => response.json())
      .then(data => {
        name = data.name;
        pronouns = data.pronoun;
        skillLevel = data.skillLevel;
        interests = data.interests; 
        preferredRole = data.preferredRole;
        lookingForTeammates = data.lookingForTeammates;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

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

        /* Add heart and X buttons */
        <div className="button-container">
          <button className="heart-button">
            <i className="fa fa-heart"></i>
          </button>
          <button className="cross-button">
            <i className="fa fa-times"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecommendedProfile;
