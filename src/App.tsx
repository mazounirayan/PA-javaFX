import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import SessionList from './components/session/sessionList';
import CreateSession from './components/session/Creation';
import EmployeeForm from './pages/Dashboard/Employee';
import { AuthProvider } from './pages/Authentication/AuthContext';
import ProtectedRoute from './pages/Authentication/ProtectedRoute';
import SignIn from './pages/Authentication/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateTheme from './components/session/theme';
import { ThemeProvider, useTheme } from './components/Header/ThemeContext'; // Vérifiez le chemin d'importation
import './App.css';

const ThemedApp: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute
              element={
                <>
                  <PageTitle title="Dashboard" />
                  <Dashboard />
                </>
              }
            />
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <PageTitle title="Sign In" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/sessions"
          element={
            <ProtectedRoute
              element={
                <>
                  <PageTitle title="Sessions d'Escape Game" />
                  <SessionList />
                </>
              }
            />
          }
        />
        <Route
          path="/create-session"
          element={
            <ProtectedRoute
              element={
                <>
                  <PageTitle title="Créer une nouvelle session" />
                  <CreateSession />
                </>
              }
            />
          }
        />
        <Route
          path="/employeeForm"
          element={
            <ProtectedRoute
              element={
                <>
                  <PageTitle title="Profile" />
                  <EmployeeForm />
                </>
              }
            />
          }
        />
        <Route
          path="/themeCreation"
          element={
            <ProtectedRoute
              element={
                <>
                  <PageTitle title="Theme creation" />
                  <CreateTheme />
                </>
              }
            />
          }
        />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </DefaultLayout>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ThemedApp />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
