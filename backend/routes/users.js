const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const { isAuth, isAdmin, isUser } = require('../middleware/auth');

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
            throw new Error(message);
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
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: "Invalid credentials!",
                        });
                    });
            });        
});

router.post('/login', 
    body('email', 'Invalid email').isEmail(),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 charachters long'),
    (req, res, next) => {

        const { errors } = validationResult(req);

        if (errors.length > 0) {
            const message = errors.map(e => e.msg).join('\n');
            throw new Error(message);
        }

        let fetchedUser;
        User.findOne({email: req.body.email})
            .then(user => {
                fetchedUser = user;
                if(!user) {
                    return res.status(401).json({
                        message: 'Auth failed',
                        user: ''
                    });
                }
                return bcrypt.compare(req.body.password, user.password);  
            })
            .then(result => {
                if (!result) {
                    return res.status(401).json({
                        message: 'Auth failed',
                        user: ''
                    });
                }
                const token = jwt.sign({ 
                    role: fetchedUser.email, 
                    userId: fetchedUser._id 
                }, 'secret_this_should_be_longer');
                
                res.status(201).json({
                    message: 'User Logged!',
                    token: token,
                    role: fetchedUser.role, 
                    userId: fetchedUser._id 
                });
            })
            .catch(err => {
                return res.status(500).json({
                    message: "Invalid authentication credentials!",
                });
            });   
});

router.get('/profile', isAuth, isUser, (req, res, next) => {
    User.findById(req.userData.userId)
        .then(user => {    
            res.status(201).json({
                message: 'User fetched successfuly!',
                user: {
                    email: user.email,
                    username: user.username,
                    created_at: user.created_at
                }
            });
        })
        .catch(err => {
            return res.status(500).json({ message: "Invalid authentication credentials!", });
        });  
});

router.put('/profile/edit', 
    isAuth, 
    isUser, 
    body('username').isLength({min: 3}).withMessage('Username must be at least 3 charachters long'),
    body('newPassword').isLength({min: 6}).withMessage('Password must be at least 6 charachters long'),
    body('rePassword').custom((value, { req }) => {
        if (value != req.body.newPassword) {
            throw new Error('Passwords don\'t match');
        }
        return true;
    }),
    (req, res, next) => {

        const { errors } = validationResult(req);

        if (errors.length > 0) {
            const message = errors.map(e => e.msg).join('\n');
            throw new Error(message);
        }
        let fetchedUser;
        
        User.findById(req.userData.userId)
            .then(user => {   
                fetchedUser = user;
                
                if(!user) {
                    return res.status(401).json({
                        message: 'Wrong Credentials!',
                        user: ''
                    });
                }
                
                return bcrypt.compare(req.body.oldPassword, user.password);  
            })
            .then(result => {
                bcrypt.hash(req.body.newPassword, 10)
                .then(hash => {
                    fetchedUser.username = req.body.username;
                    fetchedUser.password = hash;
    
                    fetchedUser.save()
                    .then(updatedUser => {
                        res.status(201).json({
                            message: 'User Updated!',
                            user: {
                                email: fetchedUser.email,
                                username: fetchedUser.username,
                                created_at: fetchedUser.created_at
                            }
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: "Invalid authentication credentials!",
                        });
                    }); 
                });
            }); 
});

module.exports = router;