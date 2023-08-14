const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../models/User');
const jwtSecret = "mynameisranchodlal17andiamfromho@#";

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

        let userEnteredEmail = await req.body.email;
        let userEnteredPassword = await req.body.password;
        try {
            let userSavedData = await user.findOne({ email: userEnteredEmail });
            const checkPassword = await bcrypt.compare(userEnteredPassword, userSavedData.password)

            if (!userSavedData || !checkPassword) {
                return res.status(401).json({ error: "Please Enter Valid Credentials" });
            }
            const data = {
                user: {
                    id: userSavedData._id
                }
            };

            const authToken = jwt.sign(data, jwtSecret)
            return res.status(200).json({
                authToken: authToken,
                location: userSavedData.location,
                _id: userSavedData._id
            });
        } catch (error) {
            console.error(error);
            if(error instanceof TypeError){
                res.status(500).json({ error: "Please Enter Valid Credentials" });
            }
            else{
                res.status(500).json({ error: "An internal server error occurred. Please try again later." });
            }
        }

    })


module.exports = router;