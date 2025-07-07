import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  SupervisorAccount as SupervisorAccountIcon
} from '@mui/icons-material';
import { cloudKitchenRegistry } from '../data/cloudKitchenDB';
import { Link as RouterLink } from 'react-router-dom';

const CloudKitchenSelector = ({ onKitchenSelect }) => {
  const [selectedKitchen, setSelectedKitchen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleKitchenSelect = (kitchen) => {
    setSelectedKitchen(kitchen);
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    if (selectedKitchen) {
      onKitchenSelect(selectedKitchen);
      setOpenDialog(false);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedKitchen(null);
  };

  const getSubscriptionColor = (subscription) => {
    return subscription === 'premium' ? 'success' : 'default';
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
        Select Your Cloud Kitchen
      </Typography>
      
      <Grid container spacing={3}>
        {cloudKitchenRegistry.map((kitchen) => (
          <Grid item xs={12} sm={6} md={4} key={kitchen.id}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardActionArea 
                onClick={() => handleKitchenSelect(kitchen)}
                sx={{ height: '100%', p: 2 }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <RestaurantIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" component="div">
                        {kitchen.name}
                      </Typography>
                      <Chip 
                        label={kitchen.subscription} 
                        color={getSubscriptionColor(kitchen.subscription)}
                        size="small"
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                      <Typography variant="body2" color="text.secondary">
                        {kitchen.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PersonIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                      <Typography variant="body2" color="text.secondary">
                        {kitchen.owner}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EmailIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                      <Typography variant="body2" color="text.secondary">
                        {kitchen.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                      <Typography variant="body2" color="text.secondary">
                        {kitchen.phone}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Max Users: {kitchen.maxUsers}
                    </Typography>
                    <Chip 
                      label={kitchen.status} 
                      color={kitchen.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Confirm Kitchen Selection
        </DialogTitle>
        <DialogContent>
          {selectedKitchen && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedKitchen.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                You are about to access the inventory management system for {selectedKitchen.name}.
                Please confirm to proceed to the login page.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                <Typography variant="body2">
                  {selectedKitchen.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PersonIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                <Typography variant="body2">
                  Owner: {selectedKitchen.owner}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip 
                  label={selectedKitchen.subscription} 
                  color={getSubscriptionColor(selectedKitchen.subscription)}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Subscription Plan
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained">
            Continue to Login
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ textAlign: 'center', mt: 4, borderTop: '1px solid #ddd', pt: 3 }}>
        <Button
          component={RouterLink}
          to="/super-admin/login"
          variant="text"
          color="secondary"
          startIcon={<SupervisorAccountIcon />}
        >
          Platform Admin Login
        </Button>
      </Box>
    </Box>
  );
};

export default CloudKitchenSelector; 