import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { LoginPage, ProtectedRoute } from './auth';
import { Header, MobileHeader } from './headers';

import HomePage from '../pages/home';
import SeasonsPage from '../pages/seasons';

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 720px)' });
  return (
    <>
      {isMobile ? <MobileHeader /> : <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="seasons/*"
          element={
            <ProtectedRoute>
              <SeasonsPage />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
