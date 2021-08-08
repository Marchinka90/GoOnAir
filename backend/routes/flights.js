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
        destination: req.body.destination,
        city: req.body.city,
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

router.get('/:id',  (req, res, next) => {
    Flight.findById(req.params.id).then(flight => {
        if (flight) {
            res.status(200).json({
                message: 'Flight fetched successfully!',
                flight
            });
        } else {
            res.status(404).json({
                message: 'Flight not found!',
                flight: ''
            });
        }
    });
});

router.put('/:id', (req, res, next) => {
    
    Flight.findById(req.params.id).then(flight => {
        flight.destination = req.body.destination;
        flight.city = req.body.city;
        flight.date = req.body.date;
        flight.time = req.body.time;
        flight.seats = req.body.seats;
        flight.price = req.body.price;
        flight.description = req.body.description;
        flight.creator = req.body.creator ? req.body.creator : '1';

        flight.save().then(flight => {
            res.status(200).json({ message: 'Updated successfully!', flight });
        }).catch(err => {
            res.status(200).json({ message: 'Flight was not deleted!', flight: '' });
        });
    });
});

router.delete('/:id', (req, res, next) => {
    Flight.findById(req.params.id).then(flight => { 
        flight.delete()
            .then(result => {
                res.status(200).json({ message: 'Flight deleted!' });
            })
            .catch(err => {
                res.status(200).json({ message: 'Flight was not deleted!' });
            });
    });
});

module.exports = router;