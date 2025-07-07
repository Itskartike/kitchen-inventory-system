import React from 'react';
import {
  Box,
  Chip,
  Typography,
  IconButton,
  Tooltip,
  Badge,
  CircularProgress
} from '@mui/material';
import {
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
  Sync as SyncIcon,
  Notifications as NotificationsIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useRealtime } from '../../contexts/RealtimeContext';

const RealtimeStatus = () => {
  const { isConnected, lastUpdate, realTimeData, connectWebSocket } = useRealtime();

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  const getConnectionColor = () => {
    return isConnected ? 'success' : 'error';
  };

  const getConnectionIcon = () => {
    return isConnected ? <WifiIcon /> : <WifiOffIcon />;
  };

  const handleReconnect = () => {
    connectWebSocket();
  };

  const getUpdateCount = () => {
    return Object.values(realTimeData).reduce((total, items) => {
      return total + (Array.isArray(items) ? items.length : 0);
    }, 0);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
      {/* Connection Status */}
      <Tooltip title={isConnected ? 'Connected' : 'Disconnected'}>
        <Chip
          icon={getConnectionIcon()}
          label={isConnected ? 'Live' : 'Offline'}
          color={getConnectionColor()}
          size="small"
          variant="outlined"
        />
      </Tooltip>

      {/* Last Update */}
      <Tooltip title={`Last update: ${formatTime(lastUpdate)}`}>
        <Typography variant="caption" color="textSecondary">
          Updated: {formatTime(lastUpdate)}
        </Typography>
      </Tooltip>

      {/* Real-time Updates Badge */}
      <Tooltip title="Real-time updates">
        <Badge badgeContent={getUpdateCount()} color="primary">
          <IconButton size="small">
            <NotificationsIcon fontSize="small" />
          </IconButton>
        </Badge>
      </Tooltip>

      {/* Reconnect Button */}
      {!isConnected && (
        <Tooltip title="Reconnect">
          <IconButton size="small" onClick={handleReconnect}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {/* Sync Indicator */}
      {isConnected && (
        <Tooltip title="Syncing data">
          <CircularProgress size={16} thickness={4} />
        </Tooltip>
      )}
    </Box>
  );
};

export default RealtimeStatus; 