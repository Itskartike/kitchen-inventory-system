import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Storage as StorageIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: 'Inventory Management System',
    email: 'admin@company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, City, State 12345',
    lowStockThreshold: 10,
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    requireTwoFactor: false,
    dataRetentionDays: 365
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleSettingChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        companyName: 'Inventory Management System',
        email: 'admin@company.com',
        phone: '+1 (555) 123-4567',
        address: '123 Business St, City, State 12345',
        lowStockThreshold: 10,
        autoBackup: true,
        emailNotifications: true,
        smsNotifications: false,
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        requireTwoFactor: false,
        dataRetentionDays: 365
      });
      toast.success('Settings reset to default');
    }
  };

  const systemStatus = [
    { name: 'Database', status: 'Online', color: 'success' },
    { name: 'Backup Service', status: 'Online', color: 'success' },
    { name: 'Email Service', status: 'Online', color: 'success' },
    { name: 'File Storage', status: 'Online', color: 'success' }
  ];

  const recentActivities = [
    { action: 'Settings updated', time: '2 minutes ago', user: 'Admin User' },
    { action: 'Backup completed', time: '1 hour ago', user: 'System' },
    { action: 'New user registered', time: '3 hours ago', user: 'Admin User' },
    { action: 'Low stock alert sent', time: '5 hours ago', user: 'System' }
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">System Settings</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleResetSettings}
          >
            Reset to Default
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Settings Navigation */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <List>
              <ListItem 
                button 
                selected={activeTab === 'general'}
                onClick={() => setActiveTab('general')}
              >
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="General" />
              </ListItem>
              <ListItem 
                button 
                selected={activeTab === 'notifications'}
                onClick={() => setActiveTab('notifications')}
              >
                <ListItemIcon><NotificationsIcon /></ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem 
                button 
                selected={activeTab === 'security'}
                onClick={() => setActiveTab('security')}
              >
                <ListItemIcon><SecurityIcon /></ListItemIcon>
                <ListItemText primary="Security" />
              </ListItem>
              <ListItem 
                button 
                selected={activeTab === 'system'}
                onClick={() => setActiveTab('system')}
              >
                <ListItemIcon><StorageIcon /></ListItemIcon>
                <ListItemText primary="System" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Settings Content */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3 }}>
            {activeTab === 'general' && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  General Settings
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      value={settings.companyName}
                      onChange={(e) => handleSettingChange('companyName', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Admin Email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleSettingChange('email', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={settings.phone}
                      onChange={(e) => handleSettingChange('phone', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Low Stock Threshold"
                      type="number"
                      value={settings.lowStockThreshold}
                      onChange={(e) => handleSettingChange('lowStockThreshold', parseInt(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Company Address"
                      multiline
                      rows={3}
                      value={settings.address}
                      onChange={(e) => handleSettingChange('address', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeTab === 'notifications' && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Notification Settings
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.emailNotifications}
                          onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                        />
                      }
                      label="Email Notifications"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.smsNotifications}
                          onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                        />
                      }
                      label="SMS Notifications"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.autoBackup}
                          onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                        />
                      }
                      label="Automatic Backup"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeTab === 'security' && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Security Settings
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Session Timeout (minutes)"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Max Login Attempts"
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.requireTwoFactor}
                          onChange={(e) => handleSettingChange('requireTwoFactor', e.target.checked)}
                        />
                      }
                      label="Require Two-Factor Authentication"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeTab === 'system' && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  System Settings
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Data Retention (days)"
                      type="number"
                      value={settings.dataRetentionDays}
                      onChange={(e) => handleSettingChange('dataRetentionDays', parseInt(e.target.value))}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  System Status
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {systemStatus.map((service, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="textSecondary">
                            {service.name}
                          </Typography>
                          <Chip
                            label={service.status}
                            color={service.color}
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Typography variant="h6" gutterBottom>
                  Recent Activities
                </Typography>
                <List>
                  {recentActivities.map((activity, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.action}
                        secondary={`${activity.time} by ${activity.user}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings; 