import React from 'react';
import { Box, Typography } from '@mui/material';

const Reports = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Operations Reports</Typography>
    <Typography variant="body1" color="textSecondary" sx={{ mt: 4 }}>
      No data available. Please integrate with real data source.
    </Typography>
  </Box>
);

export default Reports; 