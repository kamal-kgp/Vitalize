const PORT = 9000
const express = require('express') ;
const cors = require('cors') ;
const app = express() ;
const mongoDB = require("./db") ;
const createUserRoutes = require("./routes/CreateUser") ;
const LogInUserRoutes = require("./routes/LogInUser") ;
const chatBotRoutes = require("./routes/ChatBotBackend") ;
const findGymNearMeRoutes = require("./routes/findGymsNearMe") ;
const todoRoutes = require('./routes/todos');
const chatRoutes = require('./routes/chat');
const friendRequestRoutes = require('./routes/friendRequest')


app.use(express.json())
app.use(cors())      

app.use('/api', createUserRoutes) ;
app.use('/api', LogInUserRoutes) ;
app.use('/api', chatBotRoutes) ;
app.use('/api', findGymNearMeRoutes) ;
app.use('/api', todoRoutes) ;
app.use('/api', chatRoutes) ;
app.use('/api', friendRequestRoutes) ;




app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT))