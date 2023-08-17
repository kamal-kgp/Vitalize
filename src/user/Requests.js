import React,{useState} from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { MdCheckCircleOutline } from 'react-icons/md';
import {TiCancelOutline} from 'react-icons/ti';
import UserCardRequest from '../components/UserCardRequest';


function Requests(){
    const [once, setOnce] = useState(true);
    const [requests, setRequests] = useState([]);

    const userId = localStorage.getItem("_id");


    const handleAccept = async()=>{

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

    const fetchRequests = async()=>{
        const response = await fetch("http://localhost:9000/api/getFriendRequests/"+userId);
        const data = await response.json();
        console.log(data);
        setRequests(data);
    }

    if(once){
        fetchRequests();
        setOnce(false);
    }

    return(<div>
        <List>
            {
                requests.map((request, index)=>(
                    <div key={index}>
                        <UserCardRequest id={request}/>
                        
                    </div>
                ))
            }
        </List>
    </div>)
};

export default Requests;