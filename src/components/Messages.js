import React, { useState, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';

const theme = createTheme();

const Messages = ( ) => {
  const userId = localStorage.getItem("_id");
  const {id}= useParams();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [once, setOnce] = useState(true);
  const [user, setUser] = useState();

  const fetchMsgs = async()=>{
    const response = await fetch("http://localhost:9000/api/messages/"+userId+"/"+id);

    const data = await response.json();

    //console.log(data);
    setMessages(data);
  }
  


  const fetchUser = async()=>{
    const response = await fetch("http://localhost:9000/api/getuserbyid/"+id);

    const data = await response.json();

    setUser(data);
}

if(once){
    fetchUser();
    fetchMsgs();
    setOnce(false);
}


  useEffect(()=>{
    setTimeout(()=>{
      fetchMsgs();
    }, 1000);
  })



  const handleSendMessage = async() => {
    if (inputMessage.trim() === '') return;
    const options = {
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          text:inputMessage, receiverId:id,
        })
    };

    const response = fetch("http://localhost:9000/api/messages/"+userId, options);

    const data = (await response).json();

    console.log(data);

    setInputMessage('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Container  sx={{m:0, p:0}}  >
        <Paper elevation={3} style={{ padding: '16px', marginTop: '0px' }}>
          {user && <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt={user.name} src={user.name} style={{ marginRight: '12px' }} />
            <Typography variant="h6">{user.name}</Typography>
          </div>}
          
          
        </Paper>
      </Container>
      <List>
            {user && messages.map((message) => (
              <div key={message._id}
                style={{
                  width:"100%",
                  textAlign:userId===message.sender && 'right' || 'left',
                  color:'gray',
                 
                  
                }}
              >
                <span
                  style={{
                    border:'1px solid gray',
                    padding: '5px',
                    margin:'10px',
                    borderRadius:'10px',
                    borderBottomRightRadius:"2px",
                    backgroundColor:userId===message.sender && '#E5F2FF' || '#F4F4F4',
                  }}
                >{message.text}</span></div>
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
