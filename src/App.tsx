// import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CityBikesProvider } from './context/CityBikesContext';
import { Layout } from './components/Layout';
import MapComponent from './components/Map/MapComponent';
import { NetworkSearch } from './components/NetworkSearch';
import { LandingPage } from './components/LandingPage';

const AppLayout = () => {
  return (
    <CityBikesProvider>
      <Layout>
        <NetworkSearch />
        <MapComponent />
      </Layout>
    </CityBikesProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppLayout />} />
        {/* Catch all redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
