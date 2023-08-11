const mongoose = require('mongoose');
const { Schema } = mongoose ;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true 
    },
    date: {
        type: Date,
        default: Date.now
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    requests:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}) ;

module.exports = mongoose.model('user', userSchema) ;
