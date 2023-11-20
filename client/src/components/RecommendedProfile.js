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
    // const user = req.user.username; // Replace this with the actual way you access req.user on the frontend
  
    fetch('http://localhost:3001/api/users/getAllUsers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        const users = data.users[0];
        name = users.name;
        pronouns = users.pronoun;
        skillLevel = users.skillLevel;
        interests = users.interests; 
        preferredRole = users.preferredRole;
        lookingForTeammates = users.lookingForTeammates;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSwipeLeft = () => {
    // // Perform actions when swiped left
    // console.log('Swiped left on card:', profileData.name);
    // // Move to the next card
    // axios.get('http://localhost:3001/api/users/swipe', {
    //   params: {
    //     user: profileData // Replace 'discordName' with the actual parameter name for Discord name
    //   }
    // })
    //   .then(response => {
    //     // Handle the response if needed
    //   })
    //   .catch(error => {
    //     console.error('Error swiping left:', error);
    //   });

    setCurrentCardIndex(prevIndex => (prevIndex + 1) % 3); // Assuming 3 cards for example
  };

  const handleSwipeRight = () => {
    // // Perform actions when swiped right
    // console.log('Swiped right on card:', profileData.name);
    // // Move to the next card
    // axios.get('http://localhost:3001/api/users/swipe', {
    //   params: {
    //     user: profileData // Replace 'discordName' with the actual parameter name for Discord name
    //   }
    // })
    //   .then(response => {
    //     // Handle the response if needed
    //   })
    //   .catch(error => {
    //     console.error('Error swiping left:', error);
    //   });
    setCurrentCardIndex(prevIndex => (prevIndex + 1) % 3); // Assuming 3 cards for example
  };

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
