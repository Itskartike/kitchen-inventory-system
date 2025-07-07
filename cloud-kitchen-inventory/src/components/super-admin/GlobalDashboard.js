import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import {
  Storefront as StorefrontIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  CurrencyRupee as CurrencyRupeeIcon,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  cloudKitchenRegistry,
  cloudKitchenUsers,
  cloudKitchenInventory,
} from "../../data/cloudKitchenDB";

const GlobalDashboard = () => {
  const [stats, setStats] = useState({
    totalKitchens: 0,
    totalUsers: 0,
    totalInventoryItems: 0,
    subscriptionData: [],
    statusData: [],
  });

  useEffect(() => {
    // --- Data Aggregation ---
    const totalKitchens = cloudKitchenRegistry.length;

    const totalUsers = Object.values(cloudKitchenUsers).reduce(
      (sum, users) => sum + users.length,
      0
    );

    const totalInventoryItems = Object.values(cloudKitchenInventory).reduce(
      (sum, inventory) => sum + inventory.ingredients.length,
      0
    );

    const subscriptionCounts = cloudKitchenRegistry.reduce((acc, kitchen) => {
      acc[kitchen.subscription] = (acc[kitchen.subscription] || 0) + 1;
      return acc;
    }, {});
    const subscriptionData = Object.entries(subscriptionCounts).map(
      ([name, value]) => ({ name, value })
    );

    const statusCounts = cloudKitchenRegistry.reduce((acc, kitchen) => {
      acc[kitchen.status] = (acc[kitchen.status] || 0) + 1;
      return acc;
    }, {});
    const statusData = Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));

    setStats({
      totalKitchens,
      totalUsers,
      totalInventoryItems,
      subscriptionData,
      statusData,
    });
  }, []);

  const COLORS = {
    premium: "#0088FE",
    basic: "#00C49F",
    active: "#00C49F",
    inactive: "#FF8042",
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Global Dashboard
      </Typography>

      {/* --- Stat Cards --- */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <StorefrontIcon
                color="primary"
                sx={{ fontSize: 40, float: "right" }}
              />
              <Typography color="textSecondary">Total Kitchens</Typography>
              <Typography variant="h4">{stats.totalKitchens}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <PeopleIcon
                color="secondary"
                sx={{ fontSize: 40, float: "right" }}
              />
              <Typography color="textSecondary">Total Users</Typography>
              <Typography variant="h4">{stats.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <InventoryIcon
                color="success"
                sx={{ fontSize: 40, float: "right" }}
              />
              <Typography color="textSecondary">
                Total Inventory Items
              </Typography>
              <Typography variant="h4">{stats.totalInventoryItems}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* --- Charts --- */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Kitchens by Subscription
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={stats.subscriptionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {stats.subscriptionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Kitchens by Status
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={stats.statusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                dataKey="value"
                label
              >
                {stats.statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GlobalDashboard;
