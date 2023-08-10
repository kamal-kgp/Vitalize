import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa'; // Import the desired icon from react-icons/fa

const FriendCard = ({ name, lastMessage }) => {
  return (
    <Card>
      <CardHeader
        avatar={<FaUserCircle size={40} />} 
        title={name}
        subheader={lastMessage}
      />
    </Card>
  );
};

export default FriendCard;
