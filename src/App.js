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
import Navbar from './components/Navbar';


function App() {
  return (
   <Router>
    <div >
       <Navbar/>
      <Routes>
        <Route exact path = "/" element = {<Home/>} />
        <Route exact path = "/login" element = {<LogIn/>} />
        <Route exact path = "/signup" element = {<SignUp/>} />
        <Route exact path = "/chatbot" element = {<Chatbot/>} />
        <Route exact path = "/gymnearme" element = {<GymNearMe/>} />
        <Route exact path = "*" element = {<NotFound/>} />
       </Routes>
    </div>
    </Router>
  );
}

export default App;
