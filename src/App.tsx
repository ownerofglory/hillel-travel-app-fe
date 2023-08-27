import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LandingPage} from "./pages/LandingPage";
import {LoginPage} from "./pages/LoginPage";
import {SignupPage} from "./pages/SignupPage";
import {UserDashboardPage} from "./pages/UserDashboardPage";
import {CreateTravelEntryPage} from "./pages/CreateTravelEntryPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/" element={ <LandingPage /> } />
              <Route path="/login" element={ <LoginPage /> } />
              <Route path="/signup" element={ <SignupPage /> } />
              <Route path="/dashboard" element={ <UserDashboardPage /> } />
              <Route path="/create-trip" element={ <CreateTravelEntryPage /> } />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
