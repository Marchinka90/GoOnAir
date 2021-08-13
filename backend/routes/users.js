const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const Flight = require('../models/flight');
const User = require('../models/user');

router.post('/register', 
    body('username').isLength({min: 3}).withMessage('Username must be at least 3 charachters long'),
    body('email', 'Invalid email').isEmail(),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 charachters long'),
    body('rePassword').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Passwords don\'t match');
        }
        return true;
    }),
    (req, res, next) => {

        const { errors } = validationResult(req);

        if (errors.length > 0) {
            const message = errors.map(e => e.msg).join('\n');
            throw new Error(message)
        }

        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    role: 'user',
                    status: 'active'
                });
                
                user.save()
                    .then(createdUser => {
                        const token = jwt.sign({ 
                            role: createdUser.email, 
                            userId: createdUser._id 
                        }, 'secret_this_should_be_longer');
                        
                        res.status(201).json({
                            message: 'User Created!',
                            token: token,
                            role: createdUser.role, 
                            userId: createdUser._id 
                        });

                        res.status(201).json({
                            message: 'User Created!'
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            });        
});




module.exports = router;