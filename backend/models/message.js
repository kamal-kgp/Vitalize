const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  // Other message-related fields
});
messageSchema.index({ sender: 1, receiver: 1 });


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
