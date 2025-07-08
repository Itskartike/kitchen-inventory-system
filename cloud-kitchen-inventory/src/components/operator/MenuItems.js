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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Chip,
  InputBase,
  Checkbox,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { API_URL } from "../../apiConfig";

const statuses = ["Active", "Inactive", "Completed"];

const MenuItems = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({}); // Track quantity for each item
  const [selectedItems, setSelectedItems] = useState([]); // Track selected items
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/menu-items`)
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Failed to fetch menu items", err));
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/menu-categories`)
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  // Initialize quantities when items change
  useEffect(() => {
    const initialQuantities = {};
    items.forEach((item) => {
      initialQuantities[item.id] = 1;
    });
    setQuantities(initialQuantities);
  }, [items]);

  const handleOpen = (item) => {
    if (item) {
      setForm(item);
      setEditId(item.id);
    } else {
      setForm({ name: "", category: "", price: "", status: "Active" });
      setEditId(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = () => {
    if (!form.name || !form.category || !form.price) return;
    if (editId) {
      axios.put(`${API_URL}/menu-items/${editId}`, form).then((res) => {
        setItems(items.map((i) => (i.id === editId ? res.data : i)));
        setOpen(false);
      });
    } else {
      axios.post(`${API_URL}/menu-items`, form).then((res) => {
        setItems([...items, res.data]);
        setOpen(false);
      });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/menu-items/${id}`)
      .then(() => setItems(items.filter((item) => item.id !== id)))
      .catch((err) => console.error("Delete failed", err));
  };

  const getStatusColor = (status) => {
    if (status === "Active") return "success";
    if (status === "Completed") return "primary";
    return "default";
  };

  // Filter items by search term
  const filteredItems = items
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  // Quantity handlers
  const handleIncrease = (id) => {
    setQuantities((q) => ({ ...q, [id]: (q[id] || 1) + 1 }));
  };
  const handleDecrease = (id) => {
    setQuantities((q) => ({ ...q, [id]: Math.max(1, (q[id] || 1) - 1) }));
  };

  // Select handlers
  const handleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Complete Order handler
  const handleCompleteOrder = async () => {
    try {
      // Send selected items and their quantities to backend
      const orderItems = selectedItems.map((id) => ({
        id,
        quantity: quantities[id] || 1,
      }));
      await axios.post(`${API_URL}/complete-order`, {
        items: orderItems,
      });
      alert("Order completed and ingredients deducted!");
      setSelectedItems([]);
      // Optionally, refresh inventory here
    } catch (err) {
      alert("Failed to complete order");
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Menu Items
      </Typography>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          mb: 3,
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Menu Items"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
        onClick={() => handleOpen()}
      >
        Add Menu Item
      </Button>
      <Button
        variant="contained"
        color="success"
        sx={{ mb: 2, ml: 2 }}
        disabled={selectedItems.length === 0}
        onClick={handleCompleteOrder}
      >
        Complete Order
      </Button>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelect(item.id)}
                      color="primary"
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} // makes checkbox bigger
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>₹{Number(item.price || 0).toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={getStatusColor(item.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{
                          minWidth: 32,
                          fontWeight: "bold",
                          fontSize: 18,
                          px: 0,
                        }}
                        onClick={() => handleDecrease(item.id)}
                        disabled={quantities[item.id] <= 1}
                      >
                        –
                      </Button>
                      <span
                        style={{
                          margin: "0 8px",
                          minWidth: 24,
                          textAlign: "center",
                          fontWeight: 500,
                        }}
                      >
                        {quantities[item.id] || 1}
                      </span>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{
                          minWidth: 32,
                          fontWeight: "bold",
                          fontSize: 18,
                          px: 0,
                        }}
                        onClick={() => handleIncrease(item.id)}
                      >
                        +
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(item.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            fullWidth
          >
            {statuses.map((st) => (
              <MenuItem key={st} value={st}>
                {st}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuItems;
