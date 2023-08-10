import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Paper,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  IconButton,
} from '@mui/material';
import { FaPaperPlane } from 'react-icons/fa'; // Import send icon from react-icons/fa

const theme = createTheme();

const Messages = ( ) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const otherUser = {
    name: 'Bob', // Replace with other user's name
    avatar: 'avatar-url-1.jpg', // Replace with other user's avatar image URL
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: new Date().getTime(),
      text: inputMessage,
      sender: 'self', // You can set the sender to 'other' for received messages
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  return (
    <ThemeProvider theme={theme}>
        
      <CssBaseline />
      
      <Container  sx={{m:0, p:0}}  >
        <Paper elevation={3} style={{ padding: '16px', marginTop: '0px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt={otherUser.name} src={otherUser.avatar} style={{ marginRight: '12px' }} />
            <Typography variant="h6">{otherUser.name}</Typography>
          </div>
          
          
        </Paper>
      </Container>
      <List>
            {messages.map((message) => (
              <ListItem key={message.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={otherUser.name} src={otherUser.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={message.sender === 'self' ? 'You' : otherUser.name}
                  secondary={message.text}
                />
              </ListItem>
            ))}
          </List>
      <div style={{ display: 'flex', marginTop: '16px', position:"fixed", bottom:"5px", width:"100%", padding:"15px" }}>
            <TextField
              variant="outlined"
              fullWidth
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <IconButton color="primary" onClick={handleSendMessage}>
              <FaPaperPlane />
            </IconButton>
          </div>
    </ThemeProvider>
  );
};

export default Messages;
