const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.API_KEY_chatGPT ;

router.post("/chatbotbackend", 
    async (req,res) => {
        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: req.body.message}],
                max_tokens: 100
            })
        }

        try {
           const response = await fetch('https://api.openai.com/v1/chat/completions', options)
           const data = await response.json()
           res.send(data)
        } catch (error) {
            console.error(error)
        }
    })


module.exports = router;