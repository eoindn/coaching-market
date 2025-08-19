import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import CoachProfile from './pages/CoachProfile';
import ClientProfile from './pages/ClientProfile';
import CompanyProfile from './pages/Companies';
import Profile from './pages/Profile';
import Login from './pages/login';
import ClientDashboard from './pages/ClientDashboard';
import CoachDashboard from './pages/CoachDashboard';
import { AuthProvider } from './contexts/authContext';
import CoachProfileUpdate from './pages/UpdatePage';



 // Ensure Tailwind CSS is imported

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/profile/coach" element={<CoachProfile />} />
        <Route path="/profile/coach" element={<CoachProfile />} />
        <Route path="/profile/client" element={<ClientProfile />} />
        <Route path="/profile/company" element={<CompanyProfile/>} />
        <Route path="/profile/account" element={<Profile />} />


        <Route path="/login" element={<Login />} />

        <Route path="/dashboard/client" element={<ClientDashboard />} />
         <Route path="/dashboard/coach" element={<CoachDashboard />} />
        <Route path="/profile/update" element={<CoachProfileUpdate />} />



      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;