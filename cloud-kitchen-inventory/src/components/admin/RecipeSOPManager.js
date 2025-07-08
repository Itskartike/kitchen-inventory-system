import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { fetchSOPsFromGoogleSheet } from "../../services/sopSheetService";
import axios from "axios";
import { API_URL } from "../../apiConfig";

const emptySOP = { steps: [], ingredients: [], notes: "", pdf_url: "" };

const RecipeSOPManager = () => {
  const [menuItemId, setMenuItemId] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [units, setUnits] = useState([]);
  const [sop, setSop] = useState(emptySOP);
  const [stepInput, setStepInput] = useState("");
  const [ingredientInput, setIngredientInput] = useState({
    name: "",
    quantity: "",
    unit: "",
  });
  const [editing, setEditing] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [sheetSOPs, setSheetSOPs] = useState([]);
  const [sheetUrl, setSheetUrl] = useState(""); // Added state for sheet URL

  // Fetch menu items and units from backend
  useEffect(() => {
    axios
      .get(`${API_URL}/menu-items`)
      .then((res) => setMenuItems(res.data))
      .catch(() => setMenuItems([]));
    axios
      .get(`${API_URL}/units`)
      .then((res) => setUnits(res.data))
      .catch(() => setUnits([]));
  }, []);

  // Fetch SOP when menu item changes
  useEffect(() => {
    if (!menuItemId) {
      setSop(emptySOP);
      setPdfFile(null);
      setEditing(false);
      return;
    }
    axios
      .get(`${API_URL}/recipesop/${menuItemId}`)
      .then((res) => {
        if (res.data) {
          setSop({
            steps: res.data.steps || [],
            ingredients: (res.data.ingredients || []).map((ing) => ({
              name: ing.ingredient_name || ing.name,
              quantity: ing.quantity,
              unit: ing.unit,
            })),
            notes: res.data.notes || "",
            pdf_url: res.data.pdf_url || "",
          });
          setPdfFile(null); // You can fetch and show the PDF if needed
        } else {
          setSop(emptySOP);
          setPdfFile(null);
        }
        setEditing(true);
      })
      .catch(() => {
        setSop(emptySOP);
        setPdfFile(null);
        setEditing(true);
      });
  }, [menuItemId]);

  const handleMenuItemChange = (e) => {
    setMenuItemId(e.target.value);
  };

  const handleStepAdd = () => {
    if (stepInput.trim()) {
      setSop((prev) => ({ ...prev, steps: [...prev.steps, stepInput.trim()] }));
      setStepInput("");
    }
  };

  const handleStepDelete = (idx) => {
    setSop((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== idx),
    }));
  };

  const handleIngredientAdd = () => {
    if (
      ingredientInput.name &&
      ingredientInput.quantity &&
      ingredientInput.unit
    ) {
      setSop((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, { ...ingredientInput }],
      }));
      setIngredientInput({ name: "", quantity: "", unit: "" });
    }
  };

  const handleIngredientDelete = (idx) => {
    setSop((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== idx),
    }));
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      toast.error("Please upload a valid PDF file.");
    }
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
  };

  const handleSave = async () => {
    console.log("Save SOP clicked");
    if (!menuItemId) return toast.error("Select a menu item");
    try {
      let pdf_url = sop.pdf_url;
      if (pdfFile) {
        pdf_url = pdfFile.name;
      }
      console.log("About to POST", {
        notes: sop.notes,
        pdf_url,
        steps: sop.steps,
        ingredients: sop.ingredients,
      });
      const response = await axios.post(`${API_URL}/recipesop/${menuItemId}`, {
        notes: sop.notes,
        pdf_url,
        steps: sop.steps,
        ingredients: sop.ingredients.map((ing) => ({
          ingredient_name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit,
        })),
      });
      console.log("POST response", response);
      toast.success("Recipe SOP saved!");
      setEditing(false);
    } catch (err) {
      console.error("POST error", err);
      toast.error("Failed to save SOP");
    }
  };

  const handleImportFromSheet = async () => {
    if (!sheetUrl) {
      toast.error("Please enter a Google Sheet URL or ID.");
      return;
    }
    const sops = await fetchSOPsFromGoogleSheet(sheetUrl);
    setSheetSOPs(sops);

    // Group by menu item name
    const grouped = {};
    sops.forEach((row) => {
      const menuItem =
        row["menu_items"] || row["A"] || row[Object.keys(row)[0]];
      if (!menuItem) return;
      if (!grouped[menuItem]) grouped[menuItem] = [];
      grouped[menuItem].push(row);
    });

    // Forward fill menu_items for all rows
    let lastMenuItem = "";
    sops.forEach((row) => {
      if (row["menu_items"]) {
        lastMenuItem = row["menu_items"];
      } else {
        row["menu_items"] = lastMenuItem;
      }
    });

    // For each menu item, send SOP to backend
    for (const menuItemName in grouped) {
      const menuItem = menuItems.find((item) => item.name === menuItemName);
      if (!menuItem) {
        toast.error(`Menu item not found: ${menuItemName}`);
        continue;
      }
      const ingredients = grouped[menuItemName]
        .filter(
          (row) => row["ingredient_name"] && row["quantity"] && row["unit"]
        )
        .map((row) => ({
          ingredient_name: row["ingredient_name"],
          quantity: row["quantity"],
          unit: row["unit"],
        }));

      try {
        await axios.post(`${API_URL}/recipesop/${menuItem.id}`, {
          notes: "",
          pdf_url: "",
          steps: [], // You can parse steps if you add them to your sheet
          ingredients,
        });
        toast.success(`Imported SOP for ${menuItemName}`);
      } catch (err) {
        toast.error(`Failed to import SOP for ${menuItemName}`);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Recipe SOPs
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 800 }}>
        <TextField
          select
          label="Select Menu Item"
          value={menuItemId}
          onChange={handleMenuItemChange}
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
        {editing && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Steps
            </Typography>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={10} sm={11}>
                <TextField
                  label="Add Step"
                  value={stepInput}
                  onChange={(e) => setStepInput(e.target.value)}
                  fullWidth
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleStepAdd();
                    }
                  }}
                />
              </Grid>
              <Grid item xs={2} sm={1}>
                <IconButton color="primary" onClick={handleStepAdd}>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
            <List dense>
              {sop.steps.map((step, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={`Step ${idx + 1}: ${step}`} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleStepDelete(idx)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Ingredients
            </Typography>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={4}>
                <TextField
                  label="Ingredient Name"
                  value={ingredientInput.name}
                  onChange={(e) =>
                    setIngredientInput((i) => ({ ...i, name: e.target.value }))
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Quantity"
                  value={ingredientInput.quantity}
                  onChange={(e) =>
                    setIngredientInput((i) => ({
                      ...i,
                      quantity: e.target.value,
                    }))
                  }
                  type="number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  select
                  label="Unit"
                  value={ingredientInput.unit}
                  onChange={(e) =>
                    setIngredientInput((i) => ({ ...i, unit: e.target.value }))
                  }
                  fullWidth
                >
                  {units.map((u) => (
                    <MenuItem key={u.id || u.name} value={u.name}>
                      {u.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <IconButton color="primary" onClick={handleIngredientAdd}>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
            <List dense>
              {sop.ingredients.map((ing, idx) => (
                <ListItem key={idx}>
                  <ListItemText
                    primary={`${ing.name} - ${ing.quantity} ${ing.unit}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleIngredientDelete(idx)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Notes
            </Typography>
            <TextField
              label="Notes"
              value={sop.notes}
              onChange={(e) =>
                setSop((prev) => ({ ...prev, notes: e.target.value }))
              }
              fullWidth
              multiline
              minRows={2}
              sx={{ mb: 2 }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              SOP PDF (optional)
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<InsertDriveFileIcon />}
              >
                {pdfFile ? "Replace PDF" : "Upload PDF"}
                <input
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={handlePdfChange}
                />
              </Button>
              {pdfFile && (
                <>
                  <Typography variant="body2">
                    {pdfFile.name || "SOP.pdf"}
                  </Typography>
                  <Button size="small" color="error" onClick={handleRemovePdf}>
                    Remove
                  </Button>
                  {/* Optionally, add a view button if you want to preview the PDF */}
                  {/* <Button size="small" color="primary" onClick={() => window.open(URL.createObjectURL(pdfFile))}>View</Button> */}
                </>
              )}
            </Box>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save SOP
            </Button>
          </>
        )}
        <TextField
          label="Google Sheet URL or ID"
          value={sheetUrl}
          onChange={(e) => setSheetUrl(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="outlined"
          onClick={handleImportFromSheet}
          sx={{ mb: 2 }}
        >
          Import SOPs from Google Sheet
        </Button>
        {sheetSOPs.length > 0 && (
          <Paper sx={{ mt: 2, p: 2 }}>
            <Typography variant="h6">Imported SOPs</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {Object.keys(sheetSOPs[0]).map((col) => (
                      <TableCell key={col}>{col}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sheetSOPs.map((row, idx) => (
                    <TableRow key={idx}>
                      {Object.values(row).map((val, i) => (
                        <TableCell key={i}>{val}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default RecipeSOPManager;
