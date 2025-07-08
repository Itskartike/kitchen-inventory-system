import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
  LabelList,
} from "recharts";
import { API_URL } from "../../apiConfig";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API_URL}/ingredients`);
        setItems(res.data);
      } catch (err) {
        // Optionally handle error
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

  // Prepare data for the chart
  const chartData = [
    { name: "In Stock", value: stats.inStock },
    { name: "Low Stock", value: stats.lowStock },
    { name: "Out of Stock", value: stats.outOfStock },
  ];

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Kitchen Dashboard
        </Typography>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Kitchen Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
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

      {/* Add the chart below the summary cards */}
      <Box
        sx={{
          width: "100%",
          height: 350,
          mt: 4,
          p: 2,
          bgcolor: "#f5f7fa",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          Ingredient Stock Status Overview
        </Typography>
        <ResponsiveContainer>
          <BarChart data={chartData} barCategoryGap={40}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 14 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 14 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Count" radius={[8, 8, 0, 0]}>
              <Cell fill="#43a047" /> {/* In Stock */}
              <Cell fill="#ffa726" /> {/* Low Stock */}
              <Cell fill="#e53935" /> {/* Out of Stock */}
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === 0
                      ? "#43a047"
                      : index === 1
                      ? "#ffa726"
                      : "#e53935"
                  }
                />
              ))}
              {/* Value labels on top of bars */}
              <LabelList dataKey="value" position="top" fontSize={16} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
