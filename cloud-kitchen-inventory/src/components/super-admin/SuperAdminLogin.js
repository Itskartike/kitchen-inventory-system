import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Avatar
} from '@mui/material';
import { SupervisorAccount as SupervisorAccountIcon } from '@mui/icons-material';
import { useCloudKitchen } from '../../contexts/CloudKitchenContext';
import toast from 'react-hot-toast';

const SuperAdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { authenticateSuperAdmin } = useCloudKitchen();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = authenticateSuperAdmin(username, password);
    
    if (result.success) {
      toast.success('Super admin login successful!');
      navigate('/super-admin');
    } else {
      setError(result.error || 'Login failed');
      toast.error(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <Paper sx={{ p: 4, maxWidth: 450, width: '100%' }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: 'secondary.main', mx: 'auto', mb: 2 }}>
            <SupervisorAccountIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Platform Super Admin
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter credentials to access the global dashboard.
          </Typography>
        </Box>

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
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Login as Super Admin'}
          </Button>
        </form>
        
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            <strong>Demo Credentials:</strong><br />
            Username: superadmin<br />
            Password: super_password
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SuperAdminLogin; 