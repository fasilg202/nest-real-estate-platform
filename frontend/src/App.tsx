import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PropertyListPage from './pages/PropertyListPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SellPage from './pages/SellPage';
import MortgagePage from './pages/MortgagePage';
import AgentsPage from './pages/AgentsPage';
import ManageRentalsPage from './pages/ManageRentalsPage';
import AdvertisePage from './pages/AdvertisePage';
import HelpPage from './pages/HelpPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-surface-soft">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertyListPage />} />
              <Route path="/properties/:id" element={<PropertyDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/sell" element={<SellPage />} />
              <Route path="/mortgage" element={<MortgagePage />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/manage-rentals" element={<ManageRentalsPage />} />
              <Route path="/advertise" element={<AdvertisePage />} />
              <Route path="/help" element={<HelpPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
