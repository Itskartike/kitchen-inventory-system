import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { CloudKitchenProvider, useCloudKitchen } from './contexts/CloudKitchenContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { RealtimeProvider } from './contexts/RealtimeContext';

// Components
import CloudKitchenSelector from './components/CloudKitchenSelector';
import Login from './components/Login';
import AdminPanel from './components/admin/AdminPanel';
import OperatorPanel from './components/operator/OperatorPanel';
import NotificationPage from './components/common/NotificationPage';
import SuperAdminLogin from './components/super-admin/SuperAdminLogin';
import SuperAdminPanel from './components/super-admin/SuperAdminPanel';

// Protected Route for Regular Users
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, currentUser, selectedKitchen } = useCloudKitchen();

  if (!isAuthenticated || !selectedKitchen) {
    return <Navigate to="/" replace />;
  }
  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Protected Route for Super Admins
const SuperAdminProtectedRoute = ({ children }) => {
  const { isSuperAdmin } = useCloudKitchen();
  if (!isSuperAdmin) {
    return <Navigate to="/super-admin/login" replace />;
  }
  return children;
};

// App's main content router
const AppContent = () => {
  const { selectedKitchen, selectKitchen, isAuthenticated, currentUser, isSuperAdmin } = useCloudKitchen();

  return (
    <Routes>
      {/* Super Admin Routes */}
      <Route path="/super-admin/login" element={<SuperAdminLogin />} />
      <Route
        path="/super-admin/*"
        element={
          <SuperAdminProtectedRoute>
            <SuperAdminPanel />
          </SuperAdminProtectedRoute>
        }
      />

      {/* Regular User Routes */}
      <Route
        path="/*"
        element={
          !selectedKitchen ? (
            <CloudKitchenSelector onKitchenSelect={selectKitchen} />
          ) : (
            <Routes>
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to={currentUser.role === 'admin' ? '/admin' : '/operator'} replace />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/operator/*"
                element={
                  <ProtectedRoute requiredRole="operator">
                    <OperatorPanel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <NotificationPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/*" element={<Navigate to="/login" replace />} />
            </Routes>
          )
        }
      />
    </Routes>
  );
};

// Main App Component
const App = () => {
  return (
    <CloudKitchenProvider>
      <NotificationProvider>
        <RealtimeProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppContent />
          </Box>
        </RealtimeProvider>
      </NotificationProvider>
    </CloudKitchenProvider>
  );
};

export default App; 