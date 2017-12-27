const express = require('express');
const router = express.Router();

const aircraft = require('./../models/aircraft')
const customer = require('./../models/customer')
const dpasRating = require('./../models/dpasRating')
const poNote = require('./../models/poNote')
const poType = require('./../models/poType')
const prime = require('./../models/prime')
const shipMethod = require('./../models/shipMethod')

/* GET Home page */
router.get('/', function(req, res) {
  res.send('Running Server')
})


/* GET data requests */
router.get('/aircrafts', function(req, res) {
  aircraft.findAll()
    .then(aircrafts => res.send(aircrafts))
})

router.get('/customers', function(req, res) {
  customer.findAll()
    .then(customers => res.send(customers))
})

router.get('/dpasRatings', function(req, res) {
  dpasRating.findAll()
    .then(dpasRatings => res.send(dpasRatings))
})

router.get('/poNotes', function(req, res) {
  poNote.findAll()
    .then(poNotes => res.send(poNotes))
})

router.get('/poTypes', function(req, res) {
  poType.findAll()
    .then(poTypes => res.send(poTypes))
})

router.get('/primes', function(req, res) {
  prime.findAll()
    .then(primes => res.send(primes))
})

router.get('/shipMethods', function(req, res) {
  shipMethod.findAll()
    .then(shipMethods => res.send(shipMethods))
})

module.exports = router;
