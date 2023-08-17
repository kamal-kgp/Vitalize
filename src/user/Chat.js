import FriendsList from "../components/Friendslist";
import {Button} from '@mui/material';
import { useNavigate } from "react-router";
function Chat (){
    const navigate = useNavigate();
    return(<div> 
        <FriendsList/>
        <Button variant="contained" color="primary" onClick={e=>navigate("/chat/requests")}>Requests</Button>
        <Button variant="contained" color="primary" onClick={e=>navigate("/chat/others")}>Others</Button>
    </div>);
}

export default Chat;