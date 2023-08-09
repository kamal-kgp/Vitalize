const PORT = 9000
const express = require('express')
const cors = require('cors')
const app = express()


app.use(express.json())
app.use(cors())      

app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/LogInUser"));
app.use('/api', require("./routes/ChatBotBackend"));
app.use('/api', require("./routes/findGymsNearMe"));

app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT))