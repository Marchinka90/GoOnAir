const express = require('express');

const router = express.Router();

const Flight = require('../models/flight');
const User = require('../models/user');

router.get('', (req, res, next) => {
    Flight.find().then(data => {
        res.status(200).json({
            message: 'Flights fetched successfully!',
            flights: data
        });
    });
});

router.post('', (req, res, next) => {
    const flight = new Flight({
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
        creator: req.body.creator ? req.body.creator : '1',
    });

    flight.save().then(newFlight => {
        res.status(201).json({
            message: 'Flight added successfully!',
            flightId: newFlight._id
        });
    });
});

// router.put('/:id', (req, res, next) => {
//     const post = new Post({
//         title: req.body.title,
//         content: req.body.content
//     });
//     console.log(post);

//     Post.updateOne({_id: req.params.id}, post).then(result => {
//         res.status(200).json({
//             message: 'Updated successfully!',
//             postId: result._id
//         });
//     })
    

//     post.save().then(createdPost => {
//         res.status(201).json({
//             message: 'Post added successfully!',
//             postId: createdPost._id
//         });
//     });
// });



// router.get('/:id',  (req, res, next) => {
//     Post.findById(req.params.id).then(post => {
//         if (post) {
//             res.status(200).json(post);
//         } else {
//             res.status(404).json({ message: 'Post not found!' });
//         }
//     });
// });

// router.delete('/:id', (req, res, next) => {
//     Post.findById(req.params.id)
//         .then(post => { 
//             post.delete()
//                 .then(result => {
//                     res.status(200).json({ message: 'Post deleted!' });
//                 })
//                 .catch(err => {
//                     res.status(200).json({ message: 'Post was not deleted!' });
//                 });
//         });
// });

module.exports = router;