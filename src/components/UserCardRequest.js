import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@mui/material";
import { useState } from "react";

import { MdCheckCircleOutline } from 'react-icons/md';
import {TiCancelOutline} from 'react-icons/ti';

function UserCardRequest({id}){
    const [once, setOnce] = useState(true);
    const [user, setUser] = useState();

    const userId = localStorage.getItem("_id");


    const handleAccept = async(friendId)=>{
        const options = {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                friendId:friendId,
            }),
        };

        try{
            const response = await fetch("http://localhost:9000/api/acceptFriendRequest/"+userId, options);

            if(response.status===200){
                alert("Accepted");
                const reply = await response.json();
                console.log(reply);
            }
        }catch(error){
            console.error(error);
        }
    };

    const handleReject = async(friendRequestId)=>{
        const options = {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                friendRequestId:friendRequestId,
            }),
        };

        try{
            const response = await fetch("http://localhost:9000/api/deleteRequest/"+userId, options);

            if(response.status===200){
                alert("Rejected");
                const reply = await response.json();
                console.log(reply);
            }
        }catch(error){
            console.error(error);
        }

    }

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
            <ListItemSecondaryAction>
                <IconButton onClick={()=>handleAccept(user._id)}>
                    <MdCheckCircleOutline color='green' />
                </IconButton>
                <IconButton onClick={()=>handleReject(user._id)}>
                    <TiCancelOutline color='red' />
                </IconButton>
            </ListItemSecondaryAction>
            </ListItem>}
    </div>)
}

export default UserCardRequest;