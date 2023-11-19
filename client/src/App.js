// App.js

import React from 'react';
import UserProfile from './components/UserProfile';
import RecommendedProfile from './components/RecommendedProfile';
import Header from './components/Header'
import DiscordLoginButton from './components/DiscordLoginButton';

const App = () => {
  return (
    <div>
      {/* <Header /> */}
      <RecommendedProfile />
      {/* <UserProfile /> */}
      <DiscordLoginButton />
    </div>
  );
};

export default App;
