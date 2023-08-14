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
// router.get('/api/messages/:userId', async (req, res) => {
//     try {
//       const { userId } = req.params;
//       const messages = await Message.find({
//         $or: [
//           { sender: req.userId, receiver: userId },
//           { sender: userId, receiver: req.userId },
//         ],
//       }).sort('timestamp');
//       res.json(messages);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching messages.' });
//     }
//   });
  
//   // Send a message
//   router.post('/api/messages/:userId', async (req, res) => {
//     try {
//       const { userId } = req.params;
//       const { text } = req.body;
//       const message = new Message({ sender: userId, receiver: req.userId, text });
//       await message.save();
//       res.status(201).json({ message: 'Message sent.' });
//     } catch (error) {
//       res.status(500).json({ message: 'Error sending message.' });
//     }
//   });


module.exports = router