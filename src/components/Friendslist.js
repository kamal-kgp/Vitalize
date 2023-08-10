import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Grid } from '@mui/material';
import FriendCard from './Friendcard';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const FriendsList = () => {

    const navigate = useNavigate();
  const friends = [
    {
      id: 1,
      name: 'Alice',
      lastMessage: 'Hey, how are you?',
    },
    {
      id: 2,
      name: 'Bob',
      lastMessage: 'Sure, let\'s meet up!',
    },
    // Add more friends...
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" style={{marginTop:"10px"}}>
        <Grid container spacing={3}>
          {friends.map((friend) => (
            <Grid item xs={12} sm={6} md={4} key={friend.id} onClick={()=>navigate("/chat/"+friend.id)}>
              <FriendCard
                name={friend.name}
                lastMessage={friend.lastMessage}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default FriendsList;
