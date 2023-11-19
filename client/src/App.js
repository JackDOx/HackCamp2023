// App.js

import React from 'react';
import UserProfile from './components/UserProfile';
import RecommendedProfile from './components/RecommendedProfile';
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/createProfile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
