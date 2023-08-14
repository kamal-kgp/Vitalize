const express = require('express');
const router = express.Router();
const user = require('../models/User');

router.post('/sendFriendRequest/:userId', async(req,res) => {
    try {
        const {userId} = req.params ;  //sender's userID
        const recipientId = req.body.recipientId ;
        
        const recipientData = await user.findById(recipientId) ;

        if(!recipientData){
            return res.status(404).json({message: "receipent user not found"})
        }

        recipientData.requests.push(userId) ;
        await recipientData.save() ;
        res.status(200).json({ message: "Friend request sent successfully"}) ;
    } catch (error) {
        res.status(500).json({ message: 'Error sending friend request.' });
    }
}) ;


router.get('/getFriendRequests', async(req,res) => {
    try {
        const userId = req.body.userId ;
        
        const userData = await user.findById(userId) ;
        if(!userData){
            return res.status(404).json({message: "user not found"})
        }
        const friendRequests = userData.requests ;
        res.status(200).json(friendRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}) ;



router.post('/acceptFriendRequest/:userId', async(req,res) => {
    try {
        const {userId} = req.params ; 
        const friendId = req.body.friendId ;

        const userData = await user.findById(userId) ;
        const  friendData= await user.findById(friendId) ;
        if(!userData || !friendData){
            return res.status(404).json({ message: "user not found"})
        }
        
        userData.friends.push(friendId) ;
        friendData.friends.push(userId) ;
        const indexToDelete = await userData.requests.indexOf(friendId);
        if (indexToDelete !== -1) {
            userData.requests.splice(indexToDelete, 1);
        }
        await userData.save() ;
        await friendData.save() ;
        res.status(200).json({message: "You are now friends"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}) ;



router.delete('/deleteRequest/:userId', async(req,res) => {
    try {
        const {userId} = req.params ;
        const friendRequestId = req.body.friendRequestId ;

        const userData = await user.findById(userId) ;
        if(!userData){
            return res.status(404).json({message: "user not found"})
        }

        const indexToDelete = userData.requests.indexOf(friendRequestId) ;
        if(indexToDelete !== -1){
            userData.requests.splice(indexToDelete, 1) ;
        }
        await userData.save() ;
        res.status(200).json({message: "Friend Request Deleted"}) ;
    } catch (error) {
        res.status(500).json({message: error.message}) ;
    }
}) ;

router.delete('/removeFriend/:userId', async(req,res) => {
    try {
        const {userId} = req.params ;
    const friendId = req.body.friendId ;

    const userData = await user.findById(userId) ;
    const friendData = await user.findById(friendId) ;

    if(!userData || !friendData){
        return res.status(404).json({message: "user not found"})
    }

    let indexToDelete = userData.friends.indexOf(friendId) ;
    if(indexToDelete !== -1){
        userData.friends.splice(indexToDelete, 1) ;
    }
    await userData.save() ;

    indexToDelete = friendData.friends.indexOf(userId) ;
    if(indexToDelete !== -1){
        friendData.friends.splice(indexToDelete, 1) ;
    }
    await friendData.save() ;
    res.status(200).json({message: "Friend Removed"})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}) ;


module.exports = router;