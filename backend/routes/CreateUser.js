const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const user = require('../models/User');

const specialCharRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.@#]/;

router.post('/createuser',
    body('email').isEmail().withMessage('UserID should be mail id'),
    body('password').isLength({ min: 5 }).withMessage('Incorrect password, password length should be >=5'),
    body('password').matches(specialCharRegex).withMessage('password should contain special characters'),
    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let salt = await bcrypt.genSalt(10);
        let securedPassword = await bcrypt.hash(req.body.password, salt) ;//hashed password
        try {
            await user.create({
                name: req.body.name,
                email: req.body.email,
                password: securedPassword,
                location: req.body.location
            })
            await res.status(200).json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(401).json({ success: false });
        }
    });

    module.exports = router;