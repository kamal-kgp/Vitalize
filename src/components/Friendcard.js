import React, {useState} from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa'; // Import the desired icon from react-icons/fa
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@mui/material";


const FriendCard = ({ id }) => {
  const [once, setOnce] = useState(true);
  const [user, setUser] = useState();

  const userId = localStorage.getItem("_id");


  const fetchUser = async()=>{
    const response = await fetch("http://localhost:9000/api/getuserbyid/"+id);

    const data = await response.json();

    setUser(data);
}

if(once){
    fetchUser();
    setOnce(false);
}

return(<div>
  {user && <ListItem>
      <ListItemAvatar>
          <Avatar alt={user.name} src={user.name}/>
      </ListItemAvatar>
      <ListItemText primary={user.name}/>
      
      </ListItem>}
</div>)
};

export default FriendCard;
