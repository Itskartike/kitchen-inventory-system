import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../../apiConfig";

const RecipeSOPView = () => {
  const [menuItemId, setMenuItemId] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [sop, setSop] = useState(null);

  // Fetch menu items from backend
  useEffect(() => {
    axios
      .get(`${API_URL}/menu-items`)
      .then((res) => setMenuItems(res.data))
      .catch(() => setMenuItems([]));
  }, []);

  // Fetch SOP from backend when menuItemId changes
  useEffect(() => {
    if (!menuItemId) {
      setSop(null);
      return;
    }
    axios
      .get(`${API_URL}/recipesop/${menuItemId}`)
      .then((res) => setSop(res.data))
      .catch(() => setSop(null));
  }, [menuItemId]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        View Recipe SOP
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 800 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Select a menu item to view its Standard Operating Procedure.
        </Typography>
        <TextField
          select
          label="Select Menu Item"
          value={menuItemId}
          onChange={(e) => setMenuItemId(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        >
          <MenuItem value="">-- Select --</MenuItem>
          {menuItems.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>

        {sop && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Steps
            </Typography>
            <List dense>
              {!sop.steps || sop.steps.length === 0 ? (
                <ListItem>
                  <ListItemText primary="No steps defined." />
                </ListItem>
              ) : (
                sop.steps.map((step, idx) => (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={`Step ${step.step_number || idx + 1}: ${
                        step.description || step
                      }`}
                    />
                  </ListItem>
                ))
              )}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Ingredients</Typography>
            <List dense>
              {!sop.ingredients || sop.ingredients.length === 0 ? (
                <ListItem>
                  <ListItemText primary="No ingredients defined." />
                </ListItem>
              ) : (
                sop.ingredients.map((ing, idx) => (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={`${ing.ingredient_name || ing.name} - ${
                        ing.quantity
                      } ${ing.unit}`}
                    />
                  </ListItem>
                ))
              )}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Notes</Typography>
            <Typography variant="body2">{sop.notes || "No notes."}</Typography>

            {sop.pdf_url && (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  href={sop.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View SOP PDF
                </Button>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default RecipeSOPView;
