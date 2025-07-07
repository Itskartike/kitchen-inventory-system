import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Storefront as StorefrontIcon,
  BarChart as BarChartIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useCloudKitchen } from '../../contexts/CloudKitchenContext';
import CloudKitchenManager from '../admin/CloudKitchenManager';
import GlobalDashboard from './GlobalDashboard';
import toast from 'react-hot-toast';
import AverageReport from './AverageReport';

const drawerWidth = 240;

// Placeholder component for the super admin panel
const SuperAdminReports = () => (
  <Box>
    <Typography variant="h4">Global Reports</Typography>
    <Typography>Consolidated reports from all kitchens will be available here.</Typography>
  </Box>
);

const SuperAdminPanel = () => {
  const { currentSuperAdmin, logout } = useCloudKitchen();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
    toast.success('Logged out successfully');
  };

  const menuItems = [
    { text: 'Global Dashboard', icon: <DashboardIcon />, path: '/super-admin/dashboard' },
    { text: 'Kitchen Management', icon: <StorefrontIcon />, path: '/super-admin/kitchens' },
    { text: 'Global Reports', icon: <BarChartIcon />, path: '/super-admin/reports' },
    { text: 'Average Report', icon: <BarChartIcon />, path: '/super-admin/average-report' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Platform Super Admin
          </Typography>
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              {currentSuperAdmin?.name?.charAt(0)}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Routes>
          <Route path="dashboard" element={<GlobalDashboard />} />
          <Route path="kitchens" element={<CloudKitchenManager />} />
          <Route path="reports" element={<SuperAdminReports />} />
          <Route path="average-report" element={<AverageReport />} />
          <Route path="/" element={<Navigate to="dashboard" />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default SuperAdminPanel; 