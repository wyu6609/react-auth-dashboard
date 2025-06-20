import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Person,
  ExitToApp,
  Home,
  Settings,
  Dashboard as DashboardIcon,
  Notifications,
} from '@mui/icons-material';

const Dashboard = ({ user, onLogout }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 1200 }}>
      {/* Top Navigation Bar */}
      <AppBar position="static" sx={{ mb: 4, borderRadius: 2 }}>
        <Toolbar>
          <DashboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Notifications />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
              <Person />
            </Avatar>
            <Typography variant="body2">
              {user?.username}
            </Typography>
            <Button
              color="inherit"
              startIcon={<ExitToApp />}
              onClick={onLogout}
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Welcome Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 64, height: 64 }}>
            <Person sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome back, {user?.username}!
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              {user?.email}
            </Typography>
            <Chip 
              label={user?.role || 'User'} 
              sx={{ 
                mt: 1, 
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                textTransform: 'capitalize'
              }} 
            />
          </Box>
        </Box>
      </Paper>

      {/* Dashboard Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Home sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Home
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Overview of your dashboard and recent activities.
              </Typography>
              <Button variant="contained" fullWidth>
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Settings sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Settings
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Manage your account settings and preferences.
              </Typography>
              <Button variant="contained" fullWidth>
                Configure
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Person sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Profile
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Update your profile information and security settings.
              </Typography>
              <Button variant="contained" fullWidth>
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Account Information Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person color="primary" />
                Account Information
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Username:</strong> {user?.username}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Email:</strong> {user?.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Role:</strong> {user?.role || 'User'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Status:</strong> <Chip label="Active" color="success" size="small" />
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DashboardIcon color="primary" />
                Quick Stats
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Login Time:</strong> {new Date().toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Session Status:</strong> <Chip label="Active" color="success" size="small" />
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Dashboard Version:</strong> v1.0.0
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }} fullWidth>
                  View Activity Log
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
