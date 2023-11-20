import React, { useState, useEffect } from 'react';
import './RecommendedProfile.css';
import DefaultProfilePic from '../images/default-profile-pic.jpeg'
import ProfilePicDisplay from './ProfilePicDisplay';
import HoverableHeader from './HoverableHeader'

function RecommendedProfile() {
  const [profileData, setProfileData] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  var index = 0;

  useEffect(() => {
    fetch('http://localhost:3001/api/users/getAllUsers')
      .then(response => response.json())
      .then(data => {
        setProfileData(data.users[index]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSwipeLeft = () => {
    // Perform actions when swiped left
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

    // setCurrentCardIndex(prevIndex => (prevIndex + 1) % 3); // Assuming 3 cards for example
    index = index + 1;
  };

  const handleSwipeRight = () => {
    // Perform actions when swiped right
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
    index = index + 1;
    // setCurrentCardIndex(prevIndex => (prevIndex + 1) % 3); // Assuming 3 cards for example
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
            <span>{profileData.name}</span>
          </div>

          <div className="flex-container">
            <label>Pronouns:</label>
            <span>{profileData.pronoun}</span>
          </div>

          <div className="flex-container">
            <label>Skill Level:</label>
            <span>{profileData.skillLevel}</span>
          </div>

          <label>Interests / Project Vision:</label>
          <p>{profileData.interests}</p>

          <div className="flex-container">
            <label>Preferred Role:</label>
            <span>{profileData.preferredRole}</span>
          </div>
        </form>
      </div>
      {/* Add heart and X buttons outside the card */}
      <div className="button-container">
        <button type="button" className="cross-button" onClick={handleSwipeLeft}>
          <i className="fa fa-times"></i>
        </button>
        <button type="button" className="heart-button" onClick={handleSwipeRight}>
          <i className="fa fa-heart"></i>
        </button>
      </div>
    </div>
  );
}

export default RecommendedProfile;
