import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';
import App from './App.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import ResetPassword from './pages/Auth/ResetPassword.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CourseList from './pages/CourseList.jsx';
import CoursePage from './pages/CoursePage.jsx';
import CourseDetailPage from './pages/CourseDetailPage.jsx';
import ProgressDashboard from './pages/ProgressDashboard.jsx';
import AIChat from './pages/AIChat.jsx';
import OfflineManager from './pages/OfflineManager.jsx';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './hooks/useAuth';
import { UserProvider } from './context/UserContext';
import { OfflineProvider } from './context/OfflineContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password/:token', element: <ResetPassword /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'courses', element: <CourseList /> },
      { path: 'courses/:id', element: <CourseDetailPage /> },
      { path: 'courses-demo/:id', element: <CoursePage /> },
      { path: 'progress', element: <ProgressDashboard /> },
      { path: 'ai', element: <AIChat /> },
      { path: 'offline', element: <OfflineManager /> }
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <OfflineProvider>
            <RouterProvider router={router} />
          </OfflineProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);