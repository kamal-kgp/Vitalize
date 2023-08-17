import SearchBar from "../components/Searchbar";
import React, {useState} from 'react';
import { Avatar, IconButton } from "@mui/material";
import { BiUserPlus } from 'react-icons/bi';
function Others(){
    const [query, setQuery] = useState('');
    const [res, setRes] = useState([]);
    const userId = localStorage.getItem("_id");
    const handleSearch = async()=>{
        const res = await fetch("http://localhost:9000/api/getuser/"+query);
        const data = await res.json();
        setRes(data);
    }

    const sendRequest = async(recipientId)=>{
        const options = {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                recipientId:recipientId,
            }),
        };

        try{
                const response = await fetch("http://localhost:9000/api/sendFriendRequest/"+userId, options);

                if(response.status===200){
                    alert("sent");
                    const reply = await response.json();
                    console.log(reply);
                }
        }catch(error){
            console.error(error);
        }
    }

    return(
        <div> 
            <SearchBar searchQuery={query} setSearchQuery={setQuery} onSearch={handleSearch}/>
            send friend requets here...
            render results
            {
                res.map((r, i)=>(<div key={i} style={{border:"1px solid gray", padding:"10px", margin:"10px", display:"flex", flexDirection:"row", borderRadius:"10px"}}>
                    <Avatar alt={r.name} src={r.name}/> 
                    <span style={{margin:"5px", }}>{r.name}</span>
                    <div style={{width:"100%", border:"0px solid gray", display:"flex", flexDirection:"row-reverse"}}>
                        <IconButton onClick={e=>sendRequest(r._id)}>
                            <BiUserPlus color="green"/>
                        </IconButton>
                    </div>
                    </div>))
            }
            </div>
    )
}

export default Others;