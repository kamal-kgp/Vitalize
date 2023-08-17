const express = require('express');
const router = express.Router();
const Message = require('../models/message');

// Get list of users
router.get('/friends/:userId', async (req, res) => {

    try {
        const { userId } = req.params;
         const user = await Message.findOne({_id: userId});
      res.json(user?.friends);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users.' });                  
    }
  });
                                                                  
// // Get messages between two users
router.get('/messages/:userId/:otherId', async (req, res) => {
    try {
      const { userId, otherId } = req.params;
      const messages = await Message.find({
        $or: [
          { sender: userId, receiver: otherId },
          { sender: otherId, receiver: userId },
        ],
      }).sort('timestamp');
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching messages.' });
    }
  });
  
//   // Send a message
  router.post('/messages/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { text, receiverId } = req.body;
      const message = new Message({ sender: userId, receiver: receiverId, text:text });
      await message.save();
      res.status(201).json({ message: 'Message sent.' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending message.' });
    }
  });


module.exports = router