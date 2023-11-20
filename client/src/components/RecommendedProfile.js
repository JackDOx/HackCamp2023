import React from 'react';
import './RecommendedProfile.css';
import { useEffect } from 'react';
import DefaultProfilePic from '../images/default-profile-pic.jpeg'
import ProfilePicDisplay from './ProfilePicDisplay';
import HoverableHeader from './HoverableHeader'

function RecommendedProfile() {
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
    <div>
        <HoverableHeader />
        <div className="user-profile-card recommended-profile-card">
            <form>
                {/* Display each piece of information in a similar layout to UserProfile */}
                <ProfilePicDisplay file={DefaultProfilePic} />
                
                <div className="flex-container">
                <label>Name:</label>
                <span>{name} ({pronouns})</span>
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
            </form>
        </div>
      {/* Add heart and X buttons outside the card */}
      <div className="button-container">
        <button type="button" className="cross-button">
          <i className="fa fa-times"></i>
        </button>
        <button type="button" className="heart-button">
          <i className="fa fa-heart"></i>
        </button>
      </div>
    </div>
  );
}

export default RecommendedProfile;
