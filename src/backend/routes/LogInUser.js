const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../models/User');

const { body, validationResult } = require('express-validator');
const specialCharRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.@#]/;

router.post("/loginuser",
    body('email').isEmail().withMessage('UserID should be mail id'),
    body('password').isLength({ min: 5 }).withMessage('Incorrect password, password length should be >=5'),
    body('password').matches(specialCharRegex).withMessage('password should contain special characters'),
    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let userEnteredEmail = req.body.email;
        let userEnteredPassword = req.body.password;
        try {
            let userSavedData = await user.findOne({ userEnteredEmail });
            const checkPassword = await bcrypt.compare(userEnteredPassword, userSavedData.password)

            if (!userSavedData) {
                return res.status(401).json({ error: "Please Enter Valid User ID" });
            }
            else if (!checkPassword) {
                return res.status(401).json({ error: "Please Enter Valid Password" });
            }
            const data = {
                user: {
                    id: userSavedData.id
                }
            };
            const authToken = jwt.sign(data, jwtSecret)
            return res.status(200).json({
                authToken: authToken,
                location: userSavedData.location
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An internal server error occurred. Please try again later." });
        }

    })


module.exports = router;