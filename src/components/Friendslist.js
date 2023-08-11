import React, {useState} from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Grid } from '@mui/material';
import FriendCard from './Friendcard';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const FriendsList = () => {
    const userId = localStorage.getItem("_id");
    const navigate = useNavigate();
    const [once, setOnce] = useState(true);
    const [friends, setFriends] = useState([]);

    const getFriends = async()=>{
        try{
            const response = await fetch('http://localhost:9000/api/friends/'+userId);

            
            const data = await response.json();
            console.log(data);
        }catch(error){
            console.error("Error while getting friend list : ", error);
        }
    };

    if(once){
        getFriends();
        setOnce(false);
    }

  const friends1 = [
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
          {friends1.map((friend) => (
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
