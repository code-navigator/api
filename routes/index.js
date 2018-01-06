const express = require('express');
const router = express.Router();
const async = require('async')

const aircraft = require('./../models/aircraft')
const customer = require('./../models/customer')
const dpasRating = require('./../models/dpasRating')
const poNote = require('./../models/poNote')
const poType = require('./../models/poType')
const prime = require('./../models/prime')
const shipMethod = require('./../models/shipMethod')

const filters = require('./../classes/filters')


let session = new filters()


/* GET list of PO Filters */
router.get('/filterlists', (req, res) => {
  async.parallel ({

    aircrafts: function(callback) {
      aircraft.findAll({ attributes: ['name'] })
        .then(aircrafts => callback(null, aircrafts))
    },
    customers: function(callback) {
      customer.findAll({ attributes: ['name'] })
        .then(customers => callback(null, customers))
    },
    dpasRatings: function(callback) {
      dpasRating.findAll({ attributes: ['name'] })
        .then(dpasRatings => callback(null, dpasRatings))
    },
    poTypes: function(callback) {
      poType.findAll({ attributes: ['name'] })
        .then(poTypes => callback(null, poTypes))
    },
    primes: function(callback) {
      prime.findAll({ attributes: ['name'] })
        .then(primes => callback(null, primes))
    },
    shipMethods: function(callback) {
      shipMethod.findAll({ attributes: ['name'] })
        .then(shipMethods => callback(null, shipMethods))
    }
  },
  function (err, results) {
    res.send({
      aircrafts: results.aircrafts,
      customers: results.customers,
      dpasRatings: results.dpasRatings,
      primes: results.primes,
      shipMethods: results.shipMethods,
      poTypes: results.poTypes,
    })
  })
})

router.post('/poNotes', (req, res) => {
  session.copyFrom(req.body)
  var obj = {}
  session.copyTo(obj)
  console.log(obj)
  res.send('test')
})

module.exports = router;


// poNotes: function (callback) {
//   poNote.findAll({order: [['IndexNo', 'ASC']]})
//   .then(poNotes =>
//     callback(null, poNotes
//       .filter((poNote, index, array) => {
//         return poNote.type &&
//           session.poType &&
//           (poNote.type.trim() === '' ||
//             (poNote.type.includes(session.getPoTypeFilter()) &&
//               session.parseFilter(poNote.filter)))
//       })
//       .filter((poNote, index, array) => {
//         return (poNote.type.trim() !== '') || (poNote.type.trim() === '' && array[index + 1].type.trim() !== '')
//       })
//       .map(poNote => {
//         poNote.text = session.filterText(poNote.text) + '\n\n'
//         return poNote
//       })
//     )
//   )
// }