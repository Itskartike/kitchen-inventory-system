import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
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
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Storefront as StorefrontIcon,
  BarChart as BarChartIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useCloudKitchen } from "../../contexts/CloudKitchenContext";
import CloudKitchenManager from "../admin/CloudKitchenManager";
import GlobalDashboard from "./GlobalDashboard";
import toast from "react-hot-toast";
import AverageReport from "./AverageReport";

const drawerWidth = 240;

// Placeholder component for the super admin panel
const SuperAdminReports = () => (
  <Box>
    <Typography variant="h4">Global Reports</Typography>
    <Typography>
      Consolidated reports from all kitchens will be available here.
    </Typography>
  </Box>
);

const SuperAdminPanel = () => {
  const { currentSuperAdmin, logout } = useCloudKitchen();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
    toast.success("Logged out successfully");
  };

  const menuItems = [
    {
      text: "Global Dashboard",
      icon: <DashboardIcon />,
      path: "/super-admin/dashboard",
    },
    {
      text: "Kitchen Management",
      icon: <StorefrontIcon />,
      path: "/super-admin/kitchens",
    },
    {
      text: "Global Reports",
      icon: <BarChartIcon />,
      path: "/super-admin/reports",
    },
    {
      text: "Average Report",
      icon: <BarChartIcon />,
      path: "/super-admin/average-report",
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Platform Super Admin
          </Typography>
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <Avatar sx={{ bgcolor: "secondary.main" }}>
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
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 6, sm: 8 },
        }}
      >
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
