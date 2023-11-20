// App.js

import React from 'react';
import UserProfile from './components/UserProfile';
import RecommendedProfile from './components/RecommendedProfile';
import Header from './components/HoverableHeader'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage'
import Matches from './components/Matches'

const App = () => {
  // const currentPathname = window.location.pathname;
  // module.exports = currentPathname.split('/').pop();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/myProfile" element={<UserProfile />} />
        <Route path="/home" element={<RecommendedProfile />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
    </Router>
  );
};



export default App;
