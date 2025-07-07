import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Button,
  MenuItem,
  Select
} from '@mui/material';
import { useNotifications } from '../../contexts/NotificationContext';
import DoneIcon from '@mui/icons-material/Done';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const typeLabels = {
  'low_stock': 'Low Stock',
  'expiry': 'Expiry',
  'order': 'Order',
  'alert': 'Alert',
  'info': 'Info',
  'success': 'Success',
  'error': 'Error',
};

const NotificationPage = () => {
  const { notifications, markAsRead, clearAll } = useNotifications();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? notifications : notifications.filter(n => n.type === filter);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <Paper sx={{ p: 2, maxWidth: 700, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Select value={filter} onChange={e => setFilter(e.target.value)} size="small">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="low_stock">Low Stock</MenuItem>
            <MenuItem value="expiry">Expiry</MenuItem>
            <MenuItem value="order">Order</MenuItem>
            <MenuItem value="alert">Alert</MenuItem>
            <MenuItem value="info">Info</MenuItem>
            <MenuItem value="success">Success</MenuItem>
            <MenuItem value="error">Error</MenuItem>
          </Select>
          <Button onClick={clearAll} color="error" size="small">Clear All</Button>
        </Box>
        <List>
          {filtered.length === 0 ? (
            <ListItem>
              <ListItemText primary="No notifications." />
            </ListItem>
          ) : (
            filtered.map(n => (
              <ListItem key={n.id} sx={{ bgcolor: n.read ? 'grey.100' : 'primary.light', mb: 1, borderRadius: 1 }}>
                <ListItemText
                  primary={n.message}
                  secondary={new Date(n.timestamp).toLocaleString()}
                />
                <Chip
                  label={typeLabels[n.type] || n.type}
                  color={n.type === 'low_stock' ? 'warning' : n.type === 'expiry' ? 'error' : n.type === 'order' ? 'info' : 'default'}
                  size="small"
                  icon={<NotificationsActiveIcon />}
                  sx={{ mr: 2 }}
                />
                <ListItemSecondaryAction>
                  {!n.read && (
                    <IconButton edge="end" color="success" onClick={() => markAsRead(n.id)}>
                      <DoneIcon />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default NotificationPage; 