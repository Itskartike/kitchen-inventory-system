import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper } from '@mui/material';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cloudKitchenRegistry, cloudKitchenMenus, cloudKitchenInventory, cloudKitchenUsers } from '../../data/cloudKitchenDB';

// Aggregate real data from all kitchens
const kitchenIds = cloudKitchenRegistry.map(k => k.id);
const kitchenNames = cloudKitchenRegistry.map(k => k.name);

const getMenuStats = (kitchenId) => {
  const menu = cloudKitchenMenus[kitchenId] || [];
  const totalMenuItems = menu.length;
  const totalMenuPrice = menu.reduce((sum, item) => sum + (item.price || 0), 0);
  const avgMenuPrice = totalMenuItems ? totalMenuPrice / totalMenuItems : 0;
  return { totalMenuItems, totalMenuPrice, avgMenuPrice };
};

const getInventoryValue = (kitchenId) => {
  const inventory = cloudKitchenInventory[kitchenId]?.ingredients || [];
  return inventory.reduce((sum, item) => sum + (item.price || 0), 0);
};

const getUserCount = (kitchenId) => {
  return (cloudKitchenUsers[kitchenId] || []).length;
};

const menuStats = kitchenIds.map(getMenuStats);
const inventoryValues = kitchenIds.map(getInventoryValue);
const userCounts = kitchenIds.map(getUserCount);

const avg = arr => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

// Prepare data for charts
const avgMenuPriceData = kitchenIds.map((id, i) => ({
  name: kitchenNames[i],
  avgMenuPrice: menuStats[i].avgMenuPrice
}));

const inventoryValueData = kitchenIds.map((id, i) => ({
  name: kitchenNames[i],
  inventoryValue: inventoryValues[i]
}));

const userDistributionData = kitchenIds.map((id, i) => ({
  name: kitchenNames[i],
  users: userCounts[i]
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF69B4'];

const AverageReport = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Average Report (All Cloud Kitchens, Real Data)</Typography>
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Avg Menu Item Price</Typography>
            <Typography variant="h4">₹{avg(menuStats.map(s => s.avgMenuPrice)).toFixed(2)}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Avg Inventory Value</Typography>
            <Typography variant="h4">₹{avg(inventoryValues).toFixed(2)}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Avg Users per Kitchen</Typography>
            <Typography variant="h4">{avg(userCounts).toFixed(1)}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Total Kitchens</Typography>
            <Typography variant="h4">{kitchenIds.length}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Avg Menu Price per Kitchen</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={avgMenuPriceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgMenuPrice" fill="#1976d2" name="Avg Menu Price (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Inventory Value per Kitchen</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryValueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="inventoryValue" fill="#2e7d32" name="Inventory Value (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>User Distribution</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userDistributionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="users"
                label
              >
                {userDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
    <Typography variant="body1" color="textSecondary" sx={{ mt: 4 }}>
      This page shows the average of key metrics from all cloud kitchens using real data from the database, with graphical insights.
    </Typography>
  </Box>
);

export default AverageReport; 