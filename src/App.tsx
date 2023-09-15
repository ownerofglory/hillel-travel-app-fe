import React, {createContext, useContext, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LandingPage} from "./pages/LandingPage";
import {LoginPage} from "./pages/LoginPage";
import {SignupPage} from "./pages/SignupPage";
import {UserDashboardPage} from "./pages/UserDashboardPage";
import {CreateTravelEntryPage} from "./pages/CreateTravelEntryPage";
import {ExplorePage} from "./pages/ExplorePage";
import {AuthModel} from "./models/authModel";
import {GenericProps} from "./props/genericProps";
import AuthContext from './context/authContext';
import {TravelEntryPage} from "./pages/TravelEntryPage";
import {LogoutPage} from "./pages/LogoutPage";
import {ErrorPage} from "./pages/ErrorPage";

export const AuthProvider: React.FC<GenericProps> = ({ children }) => {
    const [auth, setAuth] = useState<AuthModel | undefined>(undefined);

    useEffect(() => {
        if (!auth) {
            const localAuth =  localStorage.getItem('auth')
            if (localAuth) {
                const presentAuth = JSON.parse(localAuth)
                setAuth(presentAuth)
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

function App() {
  return (
   <AuthProvider>
       <div className="App">
           <BrowserRouter>
               <Routes>
                   <Route path="/" element={ <LandingPage /> } />
                   <Route path="/login" element={ <LoginPage/> } />
                   <Route path="/logout" element={ <LogoutPage/> } />
                   <Route path="/signup" element={ <SignupPage /> } />
                   <Route path="/error" element={ <ErrorPage /> } />
                   <Route path="/dashboard" element={ <UserDashboardPage  /> } />
                   <Route path="/create-trip" element={ <CreateTravelEntryPage  /> } />
                   <Route path="/explore" element={ <ExplorePage  /> } />
                   <Route path="/trip/:id" element={ <TravelEntryPage  /> } />
               </Routes>
           </BrowserRouter>
       </div>
   </AuthProvider>
  );
}

export default App;
