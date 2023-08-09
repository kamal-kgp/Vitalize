const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://kamal-healthifyForUs:yJdjNnlkzfOzxjm2@cluster0.oz3s0sq.mongodb.net/test?retryWrites=true&w=majority";

 mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log('Connected to MongoDB Atlas');
    })
    .catch( error => {
        console.error('Error while connecting to MongoDB Atlas:',error);
    });


