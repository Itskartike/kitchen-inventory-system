import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import {
  Inventory as InventoryIcon,
  Search as SearchIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../apiConfig";

const OperatorDashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API_URL}/ingredients`);
        setItems(res.data);
      } catch (err) {
        toast.error("Failed to fetch ingredients");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const stats = {
    totalItems: items.length,
    inStock: items.filter((item) => item.status === "In Stock").length,
    lowStock: items.filter((item) => item.status === "Low Stock").length,
    outOfStock: items.filter((item) => item.status === "Out of Stock").length,
  };

  const chartData = [
    { name: "In Stock", value: stats.inStock },
    { name: "Low Stock", value: stats.lowStock },
    { name: "Out of Stock", value: stats.outOfStock },
  ];

  const recentTransactions = []; // Placeholder for now

  const quickActions = [
    {
      title: "Search Items",
      icon: <SearchIcon />,
      color: "success",
      action: () => navigate("/operator/search"),
    },
    {
      title: "View Inventory",
      icon: <InventoryIcon />,
      color: "info",
      action: () => navigate("/operator/inventory"),
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircleIcon sx={{ color: "success.main", fontSize: 16 }} />;
      case "warning":
        return <WarningIcon sx={{ color: "warning.main", fontSize: 16 }} />;
      default:
        return <CheckCircleIcon sx={{ color: "info.main", fontSize: 16 }} />;
    }
  };

  // Click handlers
  const handleStatCardClick = (stat) => {
    if (stat.onClick) {
      stat.onClick();
    }
  };

  const handleTransactionClick = (transaction) => {
    // No action needed for recent transactions
  };

  const handleChartClick = (data) => {
    // Optionally, navigate or show details based on chart click
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}
      >
        Operator Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Ingredients
              </Typography>
              <Typography variant="h4">{stats.totalItems}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                In Stock
              </Typography>
              <Typography variant="h4" color="success.main">
                {stats.inStock}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Low Stock
              </Typography>
              <Typography variant="h4" color="warning.main">
                {stats.lowStock}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Out of Stock
              </Typography>
              <Typography variant="h4" color="error.main">
                {stats.outOfStock}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Button
                    variant="outlined"
                    startIcon={action.icon}
                    fullWidth
                    sx={{
                      height: 60,
                      borderColor: `${action.color}.main`,
                      color: `${action.color}.main`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: `${action.color}.dark`,
                        backgroundColor: `${action.color}.light`,
                        color: `${action.color}.dark`,
                        transform: "translateY(-2px)",
                        boxShadow: 2,
                      },
                    }}
                    onClick={action.action}
                  >
                    {action.title}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts and Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" gutterBottom>
              Weekly Activity
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1976d2" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <Box sx={{ maxHeight: 300, overflow: "auto" }}>
              {recentTransactions.map((transaction) => (
                <Box
                  key={transaction.id}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(25, 118, 210, 0.04)",
                      borderColor: "primary.main",
                      transform: "translateX(4px)",
                    },
                  }}
                  onClick={() => handleTransactionClick(transaction)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {transaction.action}
                    </Typography>
                    <Chip
                      icon={getStatusIcon(transaction.status)}
                      label={transaction.status}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {transaction.item}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Quantity:{" "}
                    {transaction.quantity > 0
                      ? `+${transaction.quantity}`
                      : transaction.quantity}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {transaction.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OperatorDashboard;
