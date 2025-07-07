import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import { Lock as LockIcon, Restaurant as RestaurantIcon } from '@mui/icons-material';
import { useCloudKitchen } from '../contexts/CloudKitchenContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { selectedKitchen, authenticateUser, isAuthenticated } = useCloudKitchen();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!selectedKitchen) {
      setError('No kitchen selected. Please select a kitchen first.');
      setLoading(false);
      return;
    }

    const result = authenticateUser(username, password);
    
    if (result.success) {
      // Login successful - the context will handle the state
      console.log('Login successful:', result.user);
    } else {
      setError(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  const handleBackToKitchenSelection = () => {
    // This would typically navigate back to kitchen selection
    // For now, we'll just clear the selected kitchen
    window.location.reload();
  };

  if (!selectedKitchen) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}>
        <Paper sx={{ p: 4, maxWidth: 400, width: '100%', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            No Kitchen Selected
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please select a cloud kitchen to continue.
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleBackToKitchenSelection}
            startIcon={<RestaurantIcon />}
          >
            Select Kitchen
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <Paper sx={{ p: 4, maxWidth: 450, width: '100%' }}>
        {/* Kitchen Info Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2 }}>
            <RestaurantIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            {selectedKitchen.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {selectedKitchen.location}
          </Typography>
          <Chip 
            label={selectedKitchen.subscription} 
            color={selectedKitchen.subscription === 'premium' ? 'success' : 'default'}
            size="small"
            sx={{ mb: 2 }}
          />
          <Divider sx={{ my: 2 }} />
        </Box>

        <Typography variant="h6" gutterBottom align="center">
          Sign In
        </Typography>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Enter your credentials to access the inventory management system
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
            autoFocus
            disabled={loading}
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            disabled={loading}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
            startIcon={<LockIcon />}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button 
            variant="text" 
            size="small"
            onClick={handleBackToKitchenSelection}
          >
            Select Different Kitchen
          </Button>
        </Box>

        {/* Demo Credentials Info */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            <strong>Demo Credentials:</strong><br />
            Admin: admin_spice / hashed_password_here<br />
            Operator: chef_spice / hashed_password_here
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login; 