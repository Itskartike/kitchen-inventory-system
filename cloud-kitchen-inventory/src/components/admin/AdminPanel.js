import React, { useState } from "react";
import { Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
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
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Storefront as StorefrontIcon,
  MenuBook as MenuBookIcon,
  Assignment as AssignmentIcon,
  BarChart as BarChartIcon,
} from "@mui/icons-material";
import { useCloudKitchen } from "../../contexts/CloudKitchenContext";
import Dashboard from "./Dashboard";
import InventoryManagement from "./InventoryManagement";
import UserManagement from "./UserManagement";
import Reports from "./Reports";
import RecipeSOPManager from "./RecipeSOPManager";
import MenuItems from "./MenuItems";
import CloudKitchenManager from "./CloudKitchenManager";
import toast from "react-hot-toast";

const drawerWidth = 240;

const AdminPanel = () => {
  const { currentUser, logout } = useCloudKitchen();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

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
    navigate("/");
    toast.success("Logged out successfully");
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { text: "Inventory", icon: <InventoryIcon />, path: "/admin/inventory" },
    { text: "Menu Items", icon: <MenuBookIcon />, path: "/admin/menu-items" },
    { text: "Users", icon: <PeopleIcon />, path: "/admin/users" },
    { text: "Recipe SOPs", icon: <AssignmentIcon />, path: "/admin/recipes" },
    { text: "Reports", icon: <BarChartIcon />, path: "/admin/reports" },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
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
            Admin Panel / Brand Dashboard
          </Typography>

          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
              {currentUser?.name?.charAt(0)}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
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
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="menu-items" element={<MenuItems />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="recipes" element={<RecipeSOPManager />} />
          <Route path="reports" element={<Reports />} />
          <Route path="/" element={<Navigate to="dashboard" />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminPanel;
