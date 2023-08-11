const PORT = 9000
const express = require('express') ;
const cors = require('cors') ;
const app = express() ;
const mongoDB = require("./db") ;
const todoRoutes = require('./routes/todos');
const chatRoutes = require('./routes/chat');


app.use(express.json())
app.use(cors())      

app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/LogInUser"));
app.use('/api', require("./routes/ChatBotBackend"));
app.use('/api', require("./routes/findGymsNearMe"));
app.use('/api', todoRoutes )
app.use('/api', chatRoutes);




app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT))