import React, { useState, useEffect } from "react";
import axios from "axios";
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Edit as EditIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";

const InventoryView = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [updateQuantity, setUpdateQuantity] = useState("");
  const [dialogMode, setDialogMode] = useState("view"); // "view" or "edit"

  const categories = [
    "Vegetables",
    "Meat",
    "Herbs",
    "Dry Goods",
    "Oils & Sauces",
    "Dairy",
    "Seafood",
    "Fruits",
  ];
  const API_URL = "http://localhost:5000/ingredients";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(API_URL);
        // Normalize traceable to boolean for all items
        const normalized = res.data.map((item) => ({
          ...item,
          traceable:
            item.traceable === true || item.traceable === 1 || item.traceable === "1",
        }));
        setItems(normalized);
      } catch (err) {
        toast.error("Failed to fetch ingredients");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleViewItem = (item) => {
    // Ensure traceable is boolean when setting selectedItem
    setSelectedItem({ ...item, traceable: item.traceable === true || item.traceable === 1 || item.traceable === "1" });
    setUpdateQuantity("");
    setDialogMode("view");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
    setUpdateQuantity("");
  };

  const handleEditItem = (item) => {
    // Ensure traceable is boolean when setting selectedItem
    setSelectedItem({ ...item, traceable: item.traceable === true || item.traceable === 1 || item.traceable === "1" });
    setUpdateQuantity(item.quantity); // Pre-fill with current quantity
    setDialogMode("edit");
    setOpenDialog(true);
  };

  const handleUpdateQuantity = async () => {
    if (updateQuantity === "" || isNaN(updateQuantity)) {
      toast.error("Please enter a valid quantity");
      return;
    }
    const newQuantity = parseFloat(updateQuantity);
    if (newQuantity < selectedItem.quantity) {
      toast.error("You are not allowed to decrease the quantity");
      return;
    }
    if (newQuantity === selectedItem.quantity) {
      toast.error("Quantity is unchanged");
      return;
    }

    try {
      const payload = {
        ...selectedItem,
        quantity: newQuantity,
      };
      const res = await axios.put(`${API_URL}/${selectedItem.id}`, payload);
      setItems((prev) =>
        prev.map((item) => (item.id === selectedItem.id ? res.data : item))
      );
      toast.success(`Quantity updated for ${selectedItem.name}`);
      handleCloseDialog();
    } catch (err) {
      toast.error("Failed to update quantity");
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "#43a047"; // green
      case "Low Stock":
        return "#FFFF00"; // yellow/orange
      case "Out of Stock":
        return "#e53935"; // red
      default:
        return "#bdbdbd"; // grey
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalItems: items.length,
    inStock: items.filter((item) => item.status === "In Stock").length,
    lowStock: items.filter((item) => item.status === "Low Stock").length,
    outOfStock: items.filter((item) => item.status === "Out of Stock").length,
  };

  if (loading) return <Typography>Loading inventory...</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Kitchen Inventory View
      </Typography>

      {/* Stats Cards */}
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

      {/* Search and Filter */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Filter by Category</InputLabel>
              <Select
                value={filterCategory}
                label="Filter by Category"
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Add color description legend here */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label=""
            size="small"
            sx={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              minWidth: 0,
              p: 0,
              backgroundColor: "#43a047",
            }}
          />
          <Typography variant="body2">In Stock</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label=""
            size="small"
            sx={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              minWidth: 0,
              p: 0,
              backgroundColor: "#FFFF00",
            }}
          />
          <Typography variant="body2">Low Stock</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label=""
            size="small"
            sx={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              minWidth: 0,
              p: 0,
              backgroundColor: "#e53935",
            }}
          />
          <Typography variant="body2">Out of Stock</Typography>
        </Box>
      </Box>

      {/* Items Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ingredient</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell>Traceable</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.expiryDate}</TableCell>
                  <TableCell>
                    <Chip
                      label=""
                      size="small"
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        minWidth: 0,
                        p: 0,
                        backgroundColor: getStatusColor(item.status),
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleViewItem(item)}
                      color="primary"
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEditItem(item)}
                      color="secondary"
                      sx={{ ml: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {item && item.traceable ? (
                      <Chip label="Yes" color="success" size="small" />
                    ) : (
                      <Chip label="No" color="default" size="small" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* View/Update Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedItem
            ? dialogMode === "edit"
              ? `Edit ${selectedItem.name}`
              : `Ingredient Details`
            : ""}
        </DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                {/* Show all details in view mode */}
                {dialogMode === "view" && (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        {selectedItem.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Category
                      </Typography>
                      <Typography variant="body1">
                        {selectedItem.category}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Supplier
                      </Typography>
                      <Typography variant="body1">
                        {selectedItem.supplier}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Location
                      </Typography>
                      <Typography variant="body1">
                        {selectedItem.location}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Expiry Date
                      </Typography>
                      <Typography variant="body1">
                        {selectedItem.expiryDate}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        Previous Quantity
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {selectedItem.quantity} {selectedItem.unit}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Price per Unit
                      </Typography>
                      <Typography variant="body1">
                        ${selectedItem.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Traceable
                      </Typography>
                      <Typography variant="body1">
                        {selectedItem && selectedItem.traceable ? "Yes" : "No"}
                      </Typography>
                    </Grid>
                  </>
                )}
                {/* Only show the quantity update field in edit mode */}
                {dialogMode === "edit" && (
                  <>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        Edit Quantity
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        value={updateQuantity}
                        onChange={(e) => setUpdateQuantity(e.target.value)}
                        placeholder={`Enter new quantity in ${selectedItem.unit}`}
                        inputProps={{ min: selectedItem.quantity }}
                        disabled={!selectedItem || !selectedItem.traceable}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        Expiry Date
                      </Typography>
                      <TextField
                        fullWidth
                        type="date"
                        value={
                          selectedItem.expiryDate
                            ? selectedItem.expiryDate.substring(0, 10)
                            : ""
                        }
                        onChange={(e) =>
                          setSelectedItem((prev) => ({
                            ...prev,
                            expiryDate: e.target.value,
                          }))
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    {!selectedItem.traceable && (
                      <Grid item xs={12}>
                        <Typography color="error" sx={{ mt: 2 }}>
                          This ingredient is not traceable. Quantity cannot be updated here.
                        </Typography>
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {/* Only show Update button in edit mode */}
          {dialogMode === "edit" && (
            <Button
              onClick={handleUpdateQuantity}
              variant="contained"
              disabled={!selectedItem || !selectedItem.traceable}
            >
              Update Quantity
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryView;
