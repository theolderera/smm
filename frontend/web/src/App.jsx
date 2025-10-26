// frontend/web/src/App.jsx

import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load screens for better performance
const OnboardingScreen = lazy(() => import('./screens/OnboardingScreen'));
const DashboardScreen = lazy(() => import('./screens/DashboardScreen'));
const BrandingScreen = lazy(() => import('./screens/BrandingScreen'));
const StrategyScreen = lazy(() => import('./screens/StrategyScreen'));
const AnalyticsScreen = lazy(() => import('./screens/AnalyticsScreen'));
const AcademyScreen = lazy(() => import('./screens/AcademyScreen'));

const App = () => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<OnboardingScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/branding" element={<BrandingScreen />} />
        <Route path="/strategy" element={<StrategyScreen />} />
        <Route path="/analytics" element={<AnalyticsScreen />} />
        <Route path="/academy" element={<AcademyScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </ErrorBoundary>
);

export default App;