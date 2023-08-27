import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LandingPage} from "./pages/LandingPage";
import {LoginPage} from "./pages/LoginPage";
import {SignupPage} from "./pages/SignupPage";
import {UserDashboardPage} from "./pages/UserDashboardPage";
import {CreateTravelEntryPage} from "./pages/CreateTravelEntryPage";
import {ExplorePage} from "./pages/ExplorePage";

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
              <Route path="/explore" element={ <ExplorePage /> } />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
