import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage'; // new import
import Dashboard from '../pages/Dashboard';
import Exams from '../pages/Exams';
import Classrooms from '../pages/Classrooms';
import HallAllotment from '../pages/HallAllotment';
import Students from '../pages/Students';
import Timetable from '../pages/Timetable';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} /> {/* new route */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/exams"
        element={
          <PrivateRoute>
            <Exams />
          </PrivateRoute>
        }
      />
      <Route
        path="/classrooms"
        element={
          <PrivateRoute>
            <Classrooms />
          </PrivateRoute>
        }
      />
      <Route
        path="/hallallotment"
        element={
          <PrivateRoute>
            <HallAllotment />
          </PrivateRoute>
        }
      />
      <Route
        path="/students"
        element={
          <PrivateRoute>
            <Students />
          </PrivateRoute>
        }
      />
      <Route
        path="/timetable"
        element={
          <PrivateRoute>
            <Timetable />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;