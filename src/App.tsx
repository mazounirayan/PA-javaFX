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
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
     
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
   
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />

   
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
             <Route
          path="/apiTest"
          element={
            <>
             < EmployeeComponent/>
            </>
          }
        />
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
