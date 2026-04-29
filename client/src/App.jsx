import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import IDCardGeneration from './pages/IDCardGeneration';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import CardManagement from './pages/CardManagement';
import VerifyCard from './pages/VerifyCard';
import Settings from './pages/Settings';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/generate",
    element: <IDCardGeneration />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/management",
    element: <CardManagement />,
  },
  {
    path: "/verify/:id?",
    element: <VerifyCard />,
  },
  {
    path: "/settings",
    element: <Settings />,
  }
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
