import React from 'react';
import { Box, Typography } from '@mui/material';
import { FaSadTear } from 'react-icons/fa'; // Import the required icon from React Icons

const NotFound = () => {
  return (
    <Box textAlign="center" mt={10}>
      <FaSadTear size={64} color="red" />
      <Typography variant="h4" component="h1" color="textSecondary">
        Page Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary">
        The page you are looking for does not exist.
      </Typography>
    </Box>
  );
};

export default NotFound;
