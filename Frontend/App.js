import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import HomeScreen from './Homescreen';
import RegisterScreen from './Registerscreen';
import StartScreen from './StartScreen';
import Countdowntimer from './Countdowntimer';
import Leaderboard from './Leaderboard';

//Handles navigation between screens
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/startpage" element={<StartScreen />} />
        <Route path="/Countdown" element={<Countdowntimer />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}