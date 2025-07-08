import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../apiConfig";
import {
  Box,
  Typography,
  Button,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const InventoryManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    price: "",
    supplier: "",
    location: "",
    expiryDate: "",
    threshold: "",
    traceable: true, // <-- Add this line
  });

  const [errorMessage, setErrorMessage] = useState(""); // Add error message state

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
  const units = ["gm", "ml", "piece", "packets", "bottles", "cans"];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/ingredients`);
      setItems(res.data);
    } catch (err) {
      toast.error("Failed to fetch ingredients");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item = null) => {
    setEditingItem(item);
    setFormData(
      item
        ? {
            name: item.name,
            category: item.category,
            quantity: item.quantity.toString(),
            unit: item.unit,
            price: item.price.toString(),
            supplier: item.supplier,
            location: item.location,
            expiryDate: item.expiryDate,
            threshold: item.threshold,
            traceable: item.traceable !== undefined ? item.traceable : true, // <-- Add this
          }
        : {
            name: "",
            category: "",
            quantity: "",
            unit: "",
            price: "",
            supplier: "",
            location: "",
            expiryDate: "",
            threshold: "",
            traceable: true, // <-- Add this
          }
    );
    setErrorMessage(""); // Reset error message when dialog opens
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      category: "",
      quantity: "",
      unit: "",
      price: "",
      supplier: "",
      location: "",
      expiryDate: "",
      threshold: "",
      traceable: true, // <-- Add this
    });
    setErrorMessage(""); // Reset error message when dialog closes
    setOpenDialog(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.category ||
      !formData.quantity ||
      !formData.price
    ) {
      setErrorMessage("Please fill in all required fields");
      toast.error("Please fill in all required fields");
      return;
    }

    const payload = {
      ...formData,
      quantity: parseFloat(formData.quantity),
      price: parseFloat(formData.price),
    };

    try {
      if (editingItem) {
        const res = await axios.put(
          `${API_URL}/ingredients/${editingItem.id}`,
          payload
        );
        setItems((prev) =>
          prev.map((item) => (item.id === editingItem.id ? res.data : item))
        );
        toast.success("Ingredient updated");
        handleCloseDialog();
      } else {
        const res = await axios.post(`${API_URL}/ingredients`, payload);
        setItems((prev) => [...prev, res.data]);
        toast.success("Ingredient added");
        handleCloseDialog();
      }
    } catch (err) {
      // Check for duplicate entry error from backend
      if (
        err.response &&
        err.response.data &&
        err.response.data.error &&
        (err.response.data.error.code === "ER_DUP_ENTRY" ||
          (err.response.data.error.message &&
            err.response.data.error.message.includes("Duplicate entry")))
      ) {
        setErrorMessage(
          "Ingredient name already exists. Please use a different name."
        );
      } else {
        setErrorMessage("Failed to save ingredient");
      }
      toast.error(errorMessage || "Failed to save ingredient");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ingredient?")) {
      try {
        await axios.delete(`${API_URL}/ingredients/${id}`);
        setItems((prev) => prev.filter((item) => item.id !== id));
        toast.success("Ingredient deleted");
      } catch (err) {
        toast.error("Delete failed");
        console.error(err);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "success";
      case "Low Stock":
        return "warning";
      case "Out of Stock":
        return "error";
      default:
        return "default";
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
    inStock: items.filter((i) => i.status === "In Stock").length,
    lowStock: items.filter((i) => i.status === "Low Stock").length,
    outOfStock: items.filter((i) => i.status === "Out of Stock").length,
  };

  if (loading) return <Typography>Loading inventory...</Typography>;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Kitchen Inventory Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Ingredient
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[
          ["Total Ingredients", stats.totalItems],
          ["In Stock", stats.inStock, "success.main"],
          ["Low Stock", stats.lowStock, "warning.main"],
          ["Out of Stock", stats.outOfStock, "error.main"],
        ].map(([label, value, color], i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card>
              <CardContent>
                <Typography color="textSecondary">{label}</Typography>
                <Typography variant="h4" color={color || "textPrimary"}>
                  {value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Search / Filter */}
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
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ingredient</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Supplier</TableCell>
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
                  <TableCell>₹{Number(item.price).toFixed(2)}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.expiryDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={getStatusColor(item.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(item)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(item.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {item.traceable ? (
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

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingItem ? "Edit Ingredient" : "Add New Ingredient"}
        </DialogTitle>
        <DialogContent>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ingredient Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Unit</InputLabel>
                <Select
                  value={formData.unit}
                  label="Unit"
                  onChange={(e) => handleInputChange("unit", e.target.value)}
                >
                  {units.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Price per Unit"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Supplier"
                value={formData.supplier}
                onChange={(e) => handleInputChange("supplier", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Storage Location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </Grid>
            {/* Expiry Date and Threshold side by side */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  handleInputChange("expiryDate", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
                inputProps={{ style: { fontSize: 14 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Low Stock Threshold"
                type="number"
                value={formData.threshold || ""}
                onChange={(e) => handleInputChange("threshold", e.target.value)}
                inputProps={{ min: 0, style: { fontSize: 14 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!formData.traceable}
                    onChange={(e) =>
                      handleInputChange("traceable", e.target.checked)
                    }
                  />
                }
                label="Traceable (deduct from inventory after order)"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingItem ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryManagement;
