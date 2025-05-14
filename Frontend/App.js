import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './Homescreen';
import RegisterScreen from './registerScreen';
import StartScreen from './StartScreen';
import Countdowntimer from './Countdowntimer';
import LoginScreen from './loginScreen';


//Handles navigation between screens
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/startpage" element={<StartScreen />} />
        <Route path="/Countdown" element={<Countdowntimer />} /> 
      </Routes>
    </Router>
  );
}