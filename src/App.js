import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box, Snackbar, Alert } from '@mui/material';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import './App.css';

// Create a Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'dashboard'
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  // Handle admin login with specific credentials
  const handleLogin = async (credentials) => {
    setLoading(true);
    setError('');
    
    // Check for admin credentials
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      setTimeout(() => {
        setUser({
          username: 'admin',
          email: 'admin@example.com',
          role: 'administrator'
        });
        setCurrentView('dashboard');
        setLoading(false);
        showNotification('Successfully logged in!', 'success');
      }, 1000);
      return;
    }
    
    // If not admin, show error
    setError('Invalid username or password. Use "admin" for both username and password.');
    setLoading(false);
  };

  // Simulate API call to backend server
  const handleRegister = async (userData) => {
    setLoading(true);
    setError('');
    
    try {
      // Replace this with your actual backend API call
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUser(newUser);
        setCurrentView('dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      }
    } catch (err) {
      // For demo purposes, we'll simulate a successful registration
      console.log('Registration attempted with:', userData);
      
      // Simulate successful registration for demo
      setTimeout(() => {
        setUser({
          username: userData.username,
          email: userData.email,
        });
        setCurrentView('dashboard');
        setLoading(false);
      }, 1000);
      return;
    }
    
    setLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
    setError('');
  };

  const switchToRegister = () => {
    setCurrentView('register');
    setError('');
  };

  const switchToLogin = () => {
    setCurrentView('login');
    setError('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            minHeight: '100vh', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4 
          }}
        >
          {currentView === 'login' && (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToRegister={switchToRegister}
              loading={loading}
              error={error}
            />
          )}
          
          {currentView === 'register' && (
            <RegisterForm
              onRegister={handleRegister}
              onSwitchToLogin={switchToLogin}
              loading={loading}
              error={error}
            />
          )}
          
          {currentView === 'dashboard' && user && (
            <Dashboard
              user={user}
              onLogout={handleLogout}
            />
          )}
        </Box>
        
        {/* Notification Snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={hideNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={hideNotification} 
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;
