import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import Chatbot from './screens/Chatbot'
import GymNearMe from './screens/GymNearMe';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css' ;
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js' ;
import NotFound from './screens/NotFound';
import About from './screens/About';
import Contact from './screens/Contact';


import Header from './components/Header';
import Messages from './components/Messages';

import Profile from './user/Profile';
import Chat from './user/Chat';

import Purchase from './purchase/Purchase';


import Todo from './deb/Todo';


function App() {
  return (
   <Router>
    <div >
      <Header/>
       {/* <Navbar/> */}
      <Routes>
        <Route exact path = "/" element = {<Home/>} />
        <Route exact path = "/login" element = {<LogIn/>} />
        <Route exact path = "/signup" element = {<SignUp/>} />
        <Route exact path = "/chatbot" element = {<Chatbot/>} />
        <Route exact path = "/gym-near-me" element = {<GymNearMe/>} />
        <Route exact path = "*" element = {<NotFound/>} />
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/chat" element={<Chat/>}/>
        <Route exact path="/chat/*" element={<Messages/>}/>
        <Route exact path="/purchase" element={<Purchase/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/about" element={<About/>}/>

        <Route exact path="/todo" element={<Todo/>}/>
       </Routes>
    </div>
    </Router>
  );
}

export default App;
