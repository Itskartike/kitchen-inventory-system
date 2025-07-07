import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  InputAdornment
} from '@mui/material';
import { CloudKitchenDB, DBHelpers } from '../../data';
import toast from 'react-hot-toast';

const initialForm = {
  name: '',
  categoryId: '',
  quantity: '',
  unitId: '',
  expiryDate: '',
  supplierId: '',
  locationId: '',
  minThreshold: '',
  maxThreshold: '',
  description: '',
  barcode: '',
  notes: '',
  price: '',
};

const AddItems = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const categories = CloudKitchenDB.categories;
  const units = CloudKitchenDB.units;
  const suppliers = CloudKitchenDB.suppliers;
  const locations = CloudKitchenDB.locations;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare new ingredient object
    const newIngredient = {
      id: CloudKitchenDB.ingredients.length + 1,
      code: (form.name.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 1000).toString().padStart(3, '0')).replace(/\s/g, ''),
      name: form.name,
      categoryId: Number(form.categoryId),
      category: categories.find(c => c.id === Number(form.categoryId))?.name || '',
      quantity: Number(form.quantity),
      unitId: Number(form.unitId),
      unit: units.find(u => u.id === Number(form.unitId))?.name || '',
      price: Number(form.price) || 0,
      supplierId: Number(form.supplierId),
      supplier: suppliers.find(s => s.id === Number(form.supplierId))?.name || '',
      status: 'In Stock',
      locationId: Number(form.locationId),
      location: locations.find(l => l.id === Number(form.locationId))?.name || '',
      expiryDate: form.expiryDate,
      minThreshold: Number(form.minThreshold) || 0,
      maxThreshold: Number(form.maxThreshold) || 0,
      description: form.description,
      barcode: form.barcode,
      lastUpdated: new Date().toISOString(),
      createdBy: 1, // In real app, use logged-in user
      notes: form.notes,
    };

    // Validate
    const validation = DBHelpers.validateIngredient(newIngredient);
    if (!validation.isValid) {
      toast.error(validation.errors.join(', '));
      setLoading(false);
      return;
    }

    // Add to inventory
    CloudKitchenDB.ingredients.push(newIngredient);
    toast.success('Item added to inventory!');
    setForm(initialForm);
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add New Inventory Item
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, maxWidth: 600 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Item Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Category"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
              fullWidth
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              type="number"
              required
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Unit"
              name="unitId"
              value={form.unitId}
              onChange={handleChange}
              required
              fullWidth
            >
              {units.map((unit) => (
                <MenuItem key={unit.id} value={unit.id}>{unit.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Expiry Date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Supplier"
              name="supplierId"
              value={form.supplierId}
              onChange={handleChange}
              required
              fullWidth
            >
              {suppliers.map((sup) => (
                <MenuItem key={sup.id} value={sup.id}>{sup.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Location"
              name="locationId"
              value={form.locationId}
              onChange={handleChange}
              required
              fullWidth
            >
              {locations.map((loc) => (
                <MenuItem key={loc.id} value={loc.id}>{loc.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              name="price"
              value={form.price}
              onChange={handleChange}
              type="number"
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                min: 0
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Min Threshold"
              name="minThreshold"
              value={form.minThreshold}
              onChange={handleChange}
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Max Threshold"
              name="maxThreshold"
              value={form.maxThreshold}
              onChange={handleChange}
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Barcode"
              name="barcode"
              value={form.barcode}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={2}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Item'}
        </Button>
      </Box>
    </Box>
  );
};

export default AddItems; 