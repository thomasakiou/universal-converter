import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CurrencyConverter from './pages/CurrencyConverter';
import DistanceConverter from './pages/DistanceConverter';
import WeightConverter from './pages/WeightConverter';
import TemperatureConverter from './pages/TemperatureConverter';
import VolumeConverter from './pages/VolumeConverter';
import AreaConverter from './pages/AreaConverter';
import SpeedConverter from './pages/SpeedConverter';
import TimeConverter from './pages/TimeConverter';
import StorageConverter from './pages/StorageConverter';
import EnergyConverter from './pages/EnergyConverter';
import PowerConverter from './pages/PowerConverter';
import PressureConverter from './pages/PressureConverter';
import SettingsPage from './pages/SettingsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';

const AppContent = () => {
  const location = useLocation();

  // Simple scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/converter/currency" element={<CurrencyConverter />} />
      <Route path="/converter/distance" element={<DistanceConverter />} />
      <Route path="/converter/weight" element={<WeightConverter />} />
      <Route path="/converter/temperature" element={<TemperatureConverter />} />
      <Route path="/converter/volume" element={<VolumeConverter />} />
      <Route path="/converter/area" element={<AreaConverter />} />
      <Route path="/converter/speed" element={<SpeedConverter />} />
      <Route path="/converter/time" element={<TimeConverter />} />
      <Route path="/converter/storage" element={<StorageConverter />} />
      <Route path="/converter/energy" element={<EnergyConverter />} />
      <Route path="/converter/power" element={<PowerConverter />} />
      <Route path="/converter/pressure" element={<PressureConverter />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/contact" element={<Contact />} />
      {/* Fallback for unimplemented converters */}
      <Route path="/converter/*" element={<Dashboard />} />
    </Routes>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <HashRouter>
          <AppContent />
        </HashRouter>
      </SettingsProvider>
    </ThemeProvider>
  );
}
