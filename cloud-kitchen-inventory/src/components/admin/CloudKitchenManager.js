import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Alert,
  Avatar,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Restaurant as RestaurantIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { cloudKitchenRegistry } from '../../data/cloudKitchenDB';

const CloudKitchenManager = () => {
  const [kitchens, setKitchens] = useState(cloudKitchenRegistry);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingKitchen, setEditingKitchen] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    owner: '',
    email: '',
    phone: '',
    subscription: 'basic',
    maxUsers: 5,
    status: 'active'
  });
  const [error, setError] = useState('');

  const handleOpenDialog = (kitchen = null) => {
    if (kitchen) {
      setEditingKitchen(kitchen);
      setFormData({
        name: kitchen.name,
        location: kitchen.location,
        owner: kitchen.owner,
        email: kitchen.email,
        phone: kitchen.phone,
        subscription: kitchen.subscription,
        maxUsers: kitchen.maxUsers,
        status: kitchen.status
      });
    } else {
      setEditingKitchen(null);
      setFormData({
        name: '',
        location: '',
        owner: '',
        email: '',
        phone: '',
        subscription: 'basic',
        maxUsers: 5,
        status: 'active'
      });
    }
    setOpenDialog(true);
    setError('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingKitchen(null);
    setFormData({
      name: '',
      location: '',
      owner: '',
      email: '',
      phone: '',
      subscription: 'basic',
      maxUsers: 5,
      status: 'active'
    });
    setError('');
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.name || !formData.location || !formData.owner || !formData.email) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      if (editingKitchen) {
        // Update existing kitchen
        const updatedKitchen = {
          ...editingKitchen,
          ...formData,
          updatedAt: new Date().toISOString()
        };
        setKitchens(kitchens.map(k => k.id === editingKitchen.id ? updatedKitchen : k));
      } else {
        // Add new kitchen
        const newKitchen = {
          id: `ck_${Date.now()}`,
          ...formData,
          createdAt: new Date().toISOString()
        };
        setKitchens([...kitchens, newKitchen]);
      }
      handleCloseDialog();
    } catch (err) {
      setError('Failed to save kitchen');
    }
  };

  const handleDeleteKitchen = (kitchenId) => {
    if (window.confirm('Are you sure you want to delete this cloud kitchen? This action cannot be undone.')) {
      setKitchens(kitchens.filter(k => k.id !== kitchenId));
    }
  };

  const getSubscriptionColor = (subscription) => {
    return subscription === 'premium' ? 'success' : 'default';
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'error';
  };

  const stats = {
    totalKitchens: kitchens.length,
    activeKitchens: kitchens.filter(k => k.status === 'active').length,
    premiumKitchens: kitchens.filter(k => k.subscription === 'premium').length,
    totalUsers: kitchens.reduce((sum, k) => sum + k.maxUsers, 0)
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Cloud Kitchen Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Kitchen
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Kitchens
              </Typography>
              <Typography variant="h4">{stats.totalKitchens}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Kitchens
              </Typography>
              <Typography variant="h4" color="success.main">{stats.activeKitchens}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Premium Kitchens
              </Typography>
              <Typography variant="h4" color="primary.main">{stats.premiumKitchens}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h4" color="secondary.main">{stats.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Kitchen</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Subscription</TableCell>
                <TableCell>Users</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kitchens.map((kitchen) => (
                <TableRow key={kitchen.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        <RestaurantIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {kitchen.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {kitchen.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      {kitchen.location}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PersonIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      {kitchen.owner}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <EmailIcon sx={{ mr: 1, fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption">{kitchen.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PhoneIcon sx={{ mr: 1, fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption">{kitchen.phone}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={kitchen.subscription} 
                      color={getSubscriptionColor(kitchen.subscription)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {kitchen.maxUsers} max
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={kitchen.status} 
                      color={getStatusColor(kitchen.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(kitchen.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(kitchen)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteKitchen(kitchen.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Kitchen Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingKitchen ? 'Edit Cloud Kitchen' : 'Add New Cloud Kitchen'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Kitchen Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Owner Name"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Subscription</InputLabel>
                <Select
                  value={formData.subscription}
                  onChange={(e) => setFormData({ ...formData, subscription: e.target.value })}
                  label="Subscription"
                >
                  <MenuItem value="basic">Basic</MenuItem>
                  <MenuItem value="premium">Premium</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Max Users"
                type="number"
                value={formData.maxUsers}
                onChange={(e) => setFormData({ ...formData, maxUsers: parseInt(e.target.value) })}
                margin="normal"
                required
                inputProps={{ min: 1, max: 50 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingKitchen ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CloudKitchenManager; 