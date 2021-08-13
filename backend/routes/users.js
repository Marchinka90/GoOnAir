const express = require('express');

const router = express.Router();

const Flight = require('../models/flight');
const User = require('../models/user');

router.post('/register', (req, res, next) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: 'user',
        status: 'active'
    });
    
    user.save().then(user => {
        res.status(201).json(user);
    });
    
});


module.exports = router;