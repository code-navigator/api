const express = require("express"),
  router = express.Router(),
  async = require("async") 

const aircraft = require("./../data/models/aircraft"),
  customer = require("./../data/models/customer"),
  dpasRating = require("./../data/models/dpasRating"),
  filters = require("./../classes/filters"),
  poNote = require("./../data/models/poNote"),
  poType = require("./../data/models/poType"),
  prime = require("./../data/models/prime"),
  shipMethod = require("./../data/models/shipMethod")

const session = new filters() 

/* GET list of PO Filters */
router.get("/filterlists", (req, res) => {
  async.parallel(
    {
      aircrafts: function(callback) {
        aircraft
          .listOfNames()
          .then(aircrafts => callback(null, aircrafts)) 
      },
      customers: function(callback) {
        customer
          .listOfNames()
          .then(customers => callback(null, customers)) 
      },
      dpasRatings: function(callback) {
        dpasRating
          .listOfNames()
          .then(dpasRatings => callback(null, dpasRatings)) 
      },
      poTypes: function(callback) {
        poType
          .listOfNames()
          .then(poTypes => callback(null, poTypes)) 
      },
      primes: function(callback) {
        prime
          .listOfNames()
          .then(primes => callback(null, primes)) 
      },
      shipMethods: function(callback) {
        shipMethod
          .listOfNames()
          .then(shipMethods => callback(null, shipMethods)) 
      }
    },
    
    function(err, results) {
      res.send({
        aircrafts: results.aircrafts,
        customers: results.customers,
        dpasRatings: results.dpasRatings,
        primes: results.primes,
        shipMethods: results.shipMethods,
        poTypes: results.poTypes
      }) 
    }
  ) 
}) 

router.get("/ponotes", (req, res) => {
  poNote
    .findAll({ order: [["IndexNo", "ASC"]] })
    .then(poNotes =>
      poNotes
        .filter((poNote, index, array) => {
          return (
            poNote.type &&
            session.poType &&
            (poNote.type.trim() === "" ||
              (poNote.type.includes(session.getPoTypeFilter()) &&
                session.parseFilter(poNote.filter)))
          ) 
        })
        .filter((poNote, index, array) => {
          return (
            poNote.type.trim() !== "" ||
            (poNote.type.trim() === "" && array[index + 1].type.trim() !== "")
          ) 
        })
        .map(poNote => {
          poNote.text = session.filterText(poNote.text) + "\r\n\r\n" 
          return poNote 
        })
    )
    .then(poNotes => {
      res.send(
        poNotes
          .map(poNote => {
            return poNote.text 
          })
          .join("")
      ) 
    }) 
}) 

router.post("/ponotes", (req, res) => {
  session.copyFrom(req.body)
  res.send() 
}) 

module.exports = router 
