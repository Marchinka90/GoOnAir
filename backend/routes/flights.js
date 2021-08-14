const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const { isAuth, isAdmin, isUser } = require('../middleware/auth');

const Flight = require('../models/flight');
const User = require('../models/user');

router.get('', (req, res, next) => {
    const pageSize = Number(req.query.pagesize);
    const currentPage = Number(req.query.page);
    let fetchedFlights;
    const flightQuery = Flight.find();
    if (pageSize && currentPage) {
        flightQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    
    flightQuery.then(responceData => {
        fetchedFlights = responceData;
        return Flight.count();
    })
    .then(count => {
        res.status(200).json({
            message: 'Flights fetched successfully!',
            flights: fetchedFlights,
            maxFlights: count
        });
    }) 
    .catch(err => {
        res.status(400).json({ message: 'Flights were not fetched successfully!' });
    });;
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

    flight.save()
        .then(newFlight => {
            res.status(201).json({
                message: 'Flight added successfully!',
                flightId: newFlight._id
            });
        })
        .catch(err => {
            res.status(400).json({ message: 'Flight was not added successfully!' });
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

router.post('/book/:id', isAuth, isUser, (req, res, next) => {
    Flight.findById(req.params.id)
        .then(flight => {
            if (!flight) {
                res.status(400).json({ message: 'Flight is not found!' });
            }
            const isUserBooked = flight.passengers.filter(f => f == req.userData.userId);
        
            if(isUserBooked.length > 0) {
                res.status(400).json({ message: 'User is already booked for this Flight!' });
            } 
            
            flight.passengers.push(req.userData.userId);
            flight.save()
                .then(result => {
                    return res.status(200).json({ message: 'User is booked!' });
                })
                .catch(err => {
                    return res.status(400).json({ message: 'Something went wrong!' });
                });
            
        });
});

module.exports = router;