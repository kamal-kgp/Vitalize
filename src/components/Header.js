import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi"; 
import { IoFitnessOutline, IoPersonCircleOutline, IoHomeOutline } from 'react-icons/io5';

import { FaUser, FaRegPaperPlane, FaShoppingCart } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const navigate  = useNavigate();

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <AppBar position="relative">
      <Container maxWidth="lg">
        <Toolbar>
          
          <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={()=>navigate("/")}>
            VITALIZE
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="menu"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <GiHamburgerMenu size={24} /> {/* Replace MenuIcon with your desired icon */}
              </IconButton>
              <Drawer anchor="right" open={openDrawer} onClose={closeDrawer}>
                <List style={{color:"black"}}>
                <ListItem button onClick={()=>{navigate("/"); closeDrawer();}}>
                    <IoHomeOutline/>&nbsp;
                    <ListItemText primary="Home" />
                  </ListItem>
                  
                  <ListItem button onClick={()=>{navigate("/login"); closeDrawer();}}> 
                    <FiLogIn/> &nbsp;
                    <ListItemText primary="Login" />
                  </ListItem>
                  <ListItem button onClick={()=>{navigate("/about"); closeDrawer();}}>
                    <AiOutlineInfoCircle/>&nbsp;
                    <ListItemText primary="About" />
                  </ListItem>
                  <ListItem button onClick={()=>{navigate("/contact"); closeDrawer();}}>
                    <IoPersonCircleOutline/>&nbsp;
                    <ListItemText primary="Contact" />
                  </ListItem>
                  <ListItem button onClick={()=>{navigate("/gym-near-me"); closeDrawer();}}>
                    <IoFitnessOutline/> &nbsp;
                    <ListItemText primary="Gym" />
                  </ListItem>

                  <ListItem button onClick={()=>{navigate("/profile"); closeDrawer();}}>
                    <FaUser/> &nbsp;
                    <ListItemText primary="Profile" />
                  </ListItem>

                  <ListItem button onClick={()=>{navigate("/chat"); closeDrawer();}}>
                    <FaRegPaperPlane/>&nbsp;
                    <ListItemText primary="Messages" />
                  </ListItem>

                  <ListItem button onClick={()=>{navigate("/purchase"); closeDrawer();}}>
                    <FaShoppingCart/>&nbsp;
                    <ListItemText primary="Purchase" />
                  </ListItem>

                  <ListItem button onClick={()=>{navigate("/todo"); closeDrawer();}}>
                    <FaShoppingCart/>&nbsp;
                    <ListItemText primary="Todo" />
                  </ListItem>
                  {/* Add more menu items as needed */}
                </List>
              </Drawer>
            </>
          ) : (
            <>
              <Button color="inherit" sx={{ mr: 2 }} onClick={()=>navigate("/")}><IoHomeOutline/>&nbsp;Home</Button>

              <Button color="inherit" sx={{ mr: 2 }} onClick={()=>{navigate("/login")}}><FiLogIn/> &nbsp;Login</Button>

              <Button color="inherit" sx={{ mr: 2 }} onClick={()=>{navigate("/about")}}><AiOutlineInfoCircle/>&nbsp;
                About
              </Button>
              <Button color="inherit" sx={{ mr: 2 }} onClick={()=>{navigate("/contact")}}><IoPersonCircleOutline/>&nbsp;Contact</Button>
              <Button color="inherit" sx={{ mr: 2 }} onClick={()=>{navigate("/gym-near-me")}}><IoFitnessOutline/> &nbsp;Gym</Button>

              <Button color="inherit" sx={{ mr: 2 }} onClick={()=>navigate("/profile")}><FaUser/>&nbsp;Profile</Button>

              <Button color="inherit" sx={{ mr: 2 }} onClick={()=>navigate("/chat")}><FaRegPaperPlane/>&nbsp;Messages</Button>

              <Button color="inherit" sx={{ mr: 2 }} onClick={()=>navigate("/purchase")}><FaShoppingCart/>&nbsp;Purchase</Button>

              <Button color="inherit" sx={{ mr: 2 }} onClick={()=>navigate("/todo")}><FaShoppingCart/>&nbsp;Todo</Button>
              {/* Add more navigation buttons as needed */}
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
